export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8081";
export const API_URL_IMAGE = import.meta.env.VITE_IMAGE_URL ?? "/src/static/images/";

const formatPrice = (price: number): string => {
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

  return formattedPrice;
};
export {formatPrice} ;