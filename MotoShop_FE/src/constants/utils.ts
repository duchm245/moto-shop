export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8081";
export const API_URL_IMAGE = import.meta.env.VITE_IMAGE_URL ?? "http://localhost:8081/src/static/images/";

/**
 * Chuẩn hóa URL ảnh sản phẩm:
 * - Nếu đã là URL đầy đủ (http...) thì giữ nguyên
 * - Nếu là tên file không có extension, thử thêm .png
 * - Ghép với API_URL_IMAGE
 */
export const resolveImageUrl = (filename: string): string => {
  if (!filename) return '';
  // Đã là URL đầy đủ
  if (filename.startsWith('http')) return filename;
  // Thêm .png nếu chưa có extension
  const hasExt = /\.[a-zA-Z]{2,5}$/.test(filename);
  const normalizedName = hasExt ? filename : `${filename}.png`;
  return `${API_URL_IMAGE}${normalizedName}`;
};

// ── Thông tin cửa hàng – chỉnh tại đây khi cần thay đổi ──
export const SHOP_INFO = {
  name:         'LT Motor',
  phone:        '0334018518',
  phoneDisplay: '0334 018 518',
  zaloPhone:    '0334018518',
  email:        'quanglinhmoto@gmail.com',
  address:      'Số 34 ngõ 445 Nguyễn Khang, Cầu Giấy, Hà Nội',
  hoursWeekdays: 'Thứ 2 – Thứ 7: 8:00 – 18:00',
  hoursSunday:   'Chủ nhật: 8:00 – 12:00',
} as const;

const formatPrice = (price: number): string => {
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

  return formattedPrice;
};
export {formatPrice} ;