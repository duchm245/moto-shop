const fs = require('fs');
const path = require('path');

const ADMIN_SRC = path.join(__dirname, 'MotoShop_ADMIN', 'src', 'pages');

const CLOUD_NAME = 'dq7k5wv8t';
const UPLOAD_PRESET = 'motoshop_preset';

function replaceInFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Fix API_URL_IMAGE imports to include resolveImageUrl
    if (content.includes('API_URL_IMAGE') && !content.includes('resolveImageUrl')) {
        content = content.replace(/API_URL_IMAGE(?:,\s*formatPrice)?/, 'API_URL_IMAGE, resolveImageUrl$1');
        // If formatPrice was imported, fix it
        content = content.replace(/API_URL_IMAGE, resolveImageUrl,\s*formatPrice/, 'API_URL_IMAGE, resolveImageUrl, formatPrice');
    } else if (!content.includes('resolveImageUrl') && content.includes('import {')) {
        // If API_URL_IMAGE is not imported but we need resolveImageUrl later, we can add it.
        // Actually, let's just replace all `${API_URL_IMAGE}${...}` with `resolveImageUrl(...)`
    }

    // 2. Replace `${API_URL_IMAGE}${var}` with `resolveImageUrl(var)`
    content = content.replace(/\$\{API_URL_IMAGE\}\$\{([^}]+)\}/g, (match, p1) => {
        return `\${resolveImageUrl(${p1})}`;
    });
    // In src attributes, it's often src={`${API_URL_IMAGE}${item.image}`}
    // Which becomes src={`${resolveImageUrl(item.image)}`} which is equivalent to src={resolveImageUrl(item.image)}
    content = content.replace(/src=\{`\$\{resolveImageUrl\(([^)]+)\)\}`\}/g, 'src={resolveImageUrl($1)}');

    // Also replace API_URL_IMAGE + existingImage
    content = content.replace(/API_URL_IMAGE \+ ([a-zA-Z0-9_]+)/g, 'resolveImageUrl($1)');

    // 3. Add import for uploadToCloudinary if we do uploads
    if (content.includes('handleUpload') && !content.includes('uploadToCloudinary')) {
        content = content.replace(/import {([^}]+)} from '~\/constants\/utils';/, "import {$1, uploadToCloudinary} from '~/constants/utils';");
    }

    // 4. Refactor upload logic in Add/Edit Article
    if (filePath.includes('Article')) {
        content = content.replace(/const uploadRes = await fetch\(Api\.uploadArticleImage\(\), \{[\s\S]*?const uploadedFilename: string = uploadJson\.data;/g, 
            `const uploadedFilename = await uploadToCloudinary(fileImg, '${CLOUD_NAME}', '${UPLOAD_PRESET}');`);
        
        content = content.replace(/const uploadRes = await fetch\(Api\.uploadArticleImage\(\), \{[\s\S]*?imageName = uploadJson\.data;/g, 
            `imageName = await uploadToCloudinary(fileImg, '${CLOUD_NAME}', '${UPLOAD_PRESET}');`);
    }

    // 5. Refactor upload logic in Add/Edit Banner
    if (filePath.includes('Banner')) {
        content = content.replace(/const res = await axios\.post\(Api\.uploadBannerImage\(\), formData, \{[\s\S]*?return res\.data\?\.data;[\s\S]*?\} catch \(error\) \{[\s\S]*?return null;\n    \}/g,
            `try { return await uploadToCloudinary(file, '${CLOUD_NAME}', '${UPLOAD_PRESET}'); } catch (error) { toast.error('Lỗi upload ảnh'); return null; }`);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', filePath);
    }
}

const filesToUpdate = [
    'article/addArticle/index.tsx',
    'article/detailArticle/index.tsx',
    'article/editArticle/index.tsx',
    'article/index.tsx',
    'banner/createBanner/index.tsx',
    'banner/editBanner/index.tsx',
    'banner/index.tsx',
    'category/detailCategory/index.tsx',
    'category/editCategory/index.tsx',
    'category/index.tsx',
    'products/detailProduct/index.tsx',
    'products/editProduct/index.tsx',
    'products/index.tsx',
    'sale/addProductSale/index.tsx',
    'sale/detailSale/index.tsx',
    'sale/editSale/index.tsx'
];

filesToUpdate.forEach(f => replaceInFile(path.join(ADMIN_SRC, path.normalize(f))));
