export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8081";
export const API_URL_IMAGE = import.meta.env.VITE_IMAGE_URL ?? "/src/static/images/";

const formatPrice = (price: number): string => {
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

  return formattedPrice;
};

export const resolveImageUrl = (filename: string): string => {
  if (!filename) return '';
  if (filename.startsWith('http')) return filename;
  const hasExt = /\.[a-zA-Z]{2,5}$/.test(filename);
  const normalizedName = hasExt ? filename : `${filename}.png`;
  return `${API_URL_IMAGE}${normalizedName}`;
};

export const uploadToCloudinary = async (file: File, cloudName: string, uploadPreset: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    throw new Error('Upload to Cloudinary failed');
  }
  const data = await res.json();
  return data.secure_url;
};

export { formatPrice };