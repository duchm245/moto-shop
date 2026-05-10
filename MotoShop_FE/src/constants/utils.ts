export const API_URL = "http://localhost:8081";
export const API_URL_IMAGE = "/src/static/images/";

// ── Thông tin cửa hàng – chỉnh tại đây khi cần thay đổi ──
export const SHOP_INFO = {
  name:    'Quang Linh Moto Shop',
  phone:   '0968886668',
  phoneDisplay: '0968 886 668',
  email:   'quanglinhmoto@gmail.com',
  address: 'Quang Minh, Mê Linh, Hà Nội',
} as const;

const formatPrice = (price: number): string => {
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

  return formattedPrice;
};
export {formatPrice} ;