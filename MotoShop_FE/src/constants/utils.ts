export const API_URL = "http://localhost:8081";
export const API_URL_IMAGE = "http://localhost:8081/src/static/images/";

// ── Thông tin cửa hàng – chỉnh tại đây khi cần thay đổi ──
export const SHOP_INFO = {
  name:         'LT Motor',
  phone:        '0334018518',
  phoneDisplay: '0334 018 518',
  zaloPhone:    '0334018518',
  email:        'quanglinhmoto@gmail.com',
  address:      'Quang Minh, Mê Linh, Hà Nội',
} as const;

const formatPrice = (price: number): string => {
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

  return formattedPrice;
};
export {formatPrice} ;