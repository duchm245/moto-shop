const path = {
  home:'/',
  login: "/login",
  register: '/register',
  consult: '/tu-van-mua-ban-xe',

  //profile
  profile: '/profile',
  address: '/profile-address',
  detailOrder: '/detail-order',
  
  //category:
  detailCategory: '/detail-category',

  //sản phẩm
  product: '/product',
  collectionsProduct: '/collections-product',
  collections: '/collections',
  detailProduct: '/detail-product',
  searchProduct: 'search-product',

  //giỏ hàng
  cart: '/cart',
  //checkOut
  checkOut: '/check-out',
  thankYou: '/thank-you',
  //bài viết
  detailArticle: '/detail-article',
  article: '/article',

  //liên hệ
  contact: '/contact',

  //so sánh xe
  compare: '/compare',

  //mua xe trả góp
  installment: '/mua-xe-tra-gop',

  // ── Trang tĩnh footer ──────────────────────────────────────
  // Thông tin
  about: '/pages/gioi-thieu',
  faq: '/pages/cau-hoi-thuong-gap',
  showroom: '/lien-he',
  news: '/tin-tuc',

  // Chính sách
  paymentPolicy: '/pages/chinh-sach-thanh-toan',
  shippingPolicy: '/pages/chinh-sach-van-chuyen',
  returnPolicy: '/pages/chinh-sach-doi-tra',
  privacyPolicy: '/pages/chinh-sach-bao-mat',
  warrantyPolicy: '/pages/chinh-sach-bao-hanh',
} as const;
 export default path;