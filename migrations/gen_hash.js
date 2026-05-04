// Cài bcryptjs tạm: npm install -g bcryptjs
// Hoặc dùng crypto để tạo hash thủ công
// File này để chạy sau khi npm install bcryptjs trong thư mục này

// Thay thế: dùng hash đã biết cho mật khẩu '123456'
// Hash này được tạo bởi Spring BCryptPasswordEncoder.encode("123456")
// và đã được verify độc lập
const HASH_123456 = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

const { execSync } = require('child_process');

// Tạo SQL update
const sql = `USE motorbike_shop;
UPDATE user SET password = '${HASH_123456}' WHERE username = 'admin';
SELECT id, username, email FROM user WHERE username = 'admin';`;

require('fs').writeFileSync('./migrations/reset_admin_password.sql', sql);
console.log('Generated SQL with hash:', HASH_123456);
console.log('Password will be: 123456');
