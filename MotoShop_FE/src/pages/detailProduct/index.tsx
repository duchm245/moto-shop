import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '~/types/user.type';
import { RootState } from '~/redux/reducers';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product, ProductImages, Variant } from '~/types/product.type';
import cartApi from '~/apis/cart.apis';
import CartAction from '~/redux/actions/cartAction';
import { toast } from 'react-toastify';
import productApi from '~/apis/product.apis';
import path from '~/constants/path';
import { API_URL_IMAGE, formatPrice } from '~/constants/utils';
import saleApi from '~/apis/sale.apis';
import { Sale } from '~/types/sale.type';
import ItemProduct from '~/components/product';

import './styles.css';
import ImageMagnifier from '~/components/imageMagnifier';

const DetailProduct = () => {
  const user: User = useSelector((state: RootState) => state.AuthReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const handleThumbsSwiper = (swiper) => {
    setThumbsSwiper(swiper);
  };
  const location = useLocation();
  const id = location.state;
  const [sale, setSale] = React.useState<Sale>();
  const [product, setProduct] = React.useState<Product>();
  const [selectedVariantI, setSelectedVariantI] = React.useState(0);
  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(null);
  const [showInstallment, setShowInstallment] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [productImage, setProductImage] = React.useState<ProductImages[]>([]);
  const [relatedProduct, setRelatedProduct] = React.useState<Product[]>([]);
  const [saleRelated, setSaleRelated] = React.useState<Sale[]>([]);
  const [activeTab, setActiveTab] = React.useState<number>(1);
  const [isShow, setIsShow] = React.useState(false);
  const tabs = [
    { id: 1, label: 'Mô tả sản phẩm' },
    { id: 2, label: 'Bảo hành & Bảo dưỡng' },
    { id: 3, label: 'Điều khoản dịch vụ' },
  ];
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const getProduct = async () => {
    try {
      const res = await productApi.getProduct(id);
      if (res.data.status) {
        const product = res.data.data;
        setProduct(product);
        setProductImage(product.images);
      } else {
        toast.error(`${res.data.data}`, {
          position: 'top-right',
          pauseOnHover: false,
          theme: 'dark',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getRelatedProduct = async () => {
    try {
      const res = await productApi.getRelatedProduct(product?.category);
      if (res.data.status) {
        const product = res.data.data;
        setRelatedProduct(product);
      } else {
        toast.error(`${res.data.data}`, {
          position: 'top-right',
          pauseOnHover: false,
          theme: 'dark',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    getProduct();
  }, []);
  React.useEffect(() => {
    if (product?.category !== 0 && product?.category !== null && product?.category !== undefined) {
      getRelatedProduct();
    }
  }, [product]);
  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };
  const handleVariantChoose = (i: number) => {
    const variants = product?.variants || [];
    if (variants[i]?.stock === 0) return;
    setSelectedVariantI(i);
    setSelectedVariant(variants[i]);
  };

  React.useEffect(() => {
    if (product?.variants?.length > 0) {
      const firstAvailable = product.variants.findIndex((v) => v.stock > 0);
      const idx = firstAvailable >= 0 ? firstAvailable : 0;
      setSelectedVariantI(idx);
      setSelectedVariant(product.variants[idx]);
    }
  }, [product]);
  const addToCart = async () => {
    if (user) {
      try {
        const data = {
          quantity: quantity,
          sellPrice: product?.salePrice,
          productName: product?.name,
          valueColor: selectedVariant?.colorName || '',
          valueSize: selectedVariant?.name || '',
        };
        const res = await cartApi.addToCart(user.id, data);
        if (res.data.status) {
          dispatch(CartAction.addToCart(res.data.data.items));
          toast.success(`Thêm vào giỏ hàng thành công`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        } else {
          toast.error(`${res.data.data}`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate(path.login);
      toast.error(`Vui lòng đăng nhập để mua hàng`, {
        position: 'top-right',
        pauseOnHover: false,
        theme: 'dark',
      });
    }
  };
  const getSale = async (id: number) => {
    try {
      const res = await saleApi.getSale(id);
      if (res.data.status) {
        const sale = res.data.data;
        setSale(sale);
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (product?.sale !== 0 && product?.sale !== null && product?.sale !== undefined) {
      getSale(product?.sale);
    }
  }, [product]);
  const buyNow = async () => {
    await addToCart();
    navigate(path.cart);
  };
  const getSaleRealated = async (id: number) => {
    try {
      const res = await saleApi.getSale(id);
      if (res.data.status) {
        const sale = res.data.data;
        setSaleRelated((prevMapping) => ({
          ...prevMapping,
          [id]: sale.discount,
        }));
      } else {
        toast.error(`${res.data.data}`, {
          position: 'top-right',
          pauseOnHover: false,
          theme: 'dark',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (relatedProduct.length > 0) {
      relatedProduct.forEach(async (item) => {
        if (item.sale != null && item.sale !== 0 && item.sale !== undefined) {
          await getSaleRealated(item.sale);
        }
      });
    }
  }, [relatedProduct]);
  return (
    <div className="mainWrapper--content">
      <div className="layout-productDetail layout-pageProduct">
        <Breadcrum title={'Sản phẩm'} />
        {/* temp 01 */}
        <div className="productDetail-information productDetail_style__01">
          <div className="container">
            <div className="productDetail-main">
              <div className="row">
                {/* ảnh */}
                <div className="col-lg-5 col-md-12 col-12 product-gallery">
                  <div className="product-gallery__inner sticky-gallery">
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      loop={true}
                      thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                      centeredSlides={true}
                      navigation={true}
                      modules={[Navigation, Thumbs, FreeMode]}
                      className="product-gallery__slide"
                    >
                      {!!productImage &&
                        !!productImage.length &&
                        productImage.map((item, i) => {
                          return (
                            <SwiperSlide key={i} className="">
                              <div className="product-gallery__item boxlazy-img">
                                <div className="boxlazy-img__insert lazy-img__prod">
                                  <span className="boxlazy-img__aspect">
                                    <ImageMagnifier src={`${API_URL_IMAGE}${item.url}`} />
                                  </span>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                    <Swiper
                      onSwiper={handleThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView={5}
                      freeMode={true}
                      navigation={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="product-gallery__thumb"
                    >
                      {!!productImage &&
                        !!productImage.length &&
                        productImage.map((item, i) => {
                          return (
                            <SwiperSlide key={i} className="product-thumb">
                              <a className="product-thumb__link boxlazy-img">
                                <div className="boxlazy-img__insert lazy-img__prod">
                                  <span className="boxlazy-img__aspect">
                                    <img className="product-thumb__photo" src={`${API_URL_IMAGE}${item.url}`} />
                                  </span>
                                </div>
                              </a>
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 col-12 product-info">
                  <div className="info-wrapper">
                    <div className="info-header">
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                          {/* thông tin sản phẩm */}
                          <div className="info-header">
                            <div className="product-name">
                              <h1>{product?.name}</h1>
                            </div>
                            <div className="product-sku">
                              <span id="pro_sku">
                                Mã sản phẩm: <strong>{product?.sku}</strong>
                              </span>
                              <span className="pro-state">
                                Tình trạng:
                                <strong>Còn hàng</strong>
                              </span>
                              <span className="pro-vendor">
                                Thương hiệu:{' '}
                                <strong>
                                  <a title="Show vendor" className="cursor-pointer">
                                    MotoShop
                                  </a>
                                </strong>
                              </span>
                            </div>
                          </div>
                          <div className="info-body">
                            {/* giá */}
                            <div className="product-price">
                              <span className="pro-title">Giá:</span>
                              <span className="pro-price">{formatPrice(product?.salePrice)}</span>
                              {product?.sale !== 0 && (
                                <>
                                  <del className="">{formatPrice(product?.price)}</del>
                                  <span className="pro-percent">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={13}
                                      height={13}
                                      viewBox="0 0 512.002 512.002"
                                    >
                                      <g>
                                        <path
                                          d="m201.498 512.002c-1.992 0-4.008-.398-5.934-1.229-6.741-2.907-10.387-10.266-8.617-17.39l50.724-204.178h-136.67c-4.947 0-9.576-2.439-12.373-6.52s-3.402-9.278-1.617-13.892l100.262-259.204c2.235-5.779 7.793-9.589 13.989-9.589h137.961c5.069 0 9.795 2.56 12.565 6.806 2.768 4.246 3.206 9.603 1.162 14.242l-59.369 134.76h117.42c5.486 0 10.534 2.995 13.164 7.81 2.63 4.814 2.422 10.68-.543 15.296l-209.496 326.192c-2.833 4.412-7.651 6.896-12.628 6.896z"
                                          fill="#ffffff"
                                          data-original="#000000"
                                        />
                                      </g>
                                    </svg>
                                    - {sale?.discount}%
                                  </span>
                                </>
                              )}
                            </div>
                            {/* chọn phiên bản xe */}
                            <div className="product-variants">
                              <div id="add-item-form">
                                <div className="select-swatch">
                                  <div className="- swatch clearfix is-color">
                                    <div className="pro-title">Phiên bản:</div>
                                    <div className="select-swap">
                                      {product?.variants?.map((v, i) => (
                                        <div
                                          className={`n-sd swatch-element ${v.stock === 0 ? 'soldout' : ''}`}
                                          key={i}
                                          onClick={() => handleVariantChoose(i)}
                                        >
                                          <input className={`variant-${i}`} id={`swatch-v-${i}`} type="radio" readOnly />
                                          <label className={`${selectedVariantI === i ? 'sd' : ''}`} htmlFor={`swatch-v-${i}`}>
                                            {v.colorCode && (
                                              <span
                                                style={{
                                                  display: 'inline-block',
                                                  width: 12,
                                                  height: 12,
                                                  borderRadius: '50%',
                                                  background: v.colorCode,
                                                  marginRight: 4,
                                                  verticalAlign: 'middle',
                                                  border: '1px solid #ccc',
                                                }}
                                              />
                                            )}
                                            <span>{v.name}{v.colorName ? ` — ${v.colorName}` : ''}</span>
                                            {v.stock === 0 && <span style={{ fontSize: 11, color: '#999' }}> (hết hàng)</span>}
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* bảng thông số kỹ thuật */}
                            {product?.displacement && (
                              <div className="product-specs" style={{ marginTop: 16 }}>
                                <div className="pro-title" style={{ marginBottom: 8 }}>Thông số kỹ thuật:</div>
                                <table className="specs-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                  <tbody>
                                    {product.brand && <tr><td style={{ padding: '4px 8px', color: '#666', width: '45%' }}>Hãng xe</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.brand}</td></tr>}
                                    {product.vehicleType && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Loại xe</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.vehicleType}</td></tr>}
                                    {product.displacement && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Phân khối</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.displacement} CC</td></tr>}
                                    {product.engineType && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Loại động cơ</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.engineType}</td></tr>}
                                    {product.maxPower && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Công suất tối đa</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.maxPower}</td></tr>}
                                    {product.maxTorque && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Mô men xoắn</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.maxTorque}</td></tr>}
                                    {product.transmission && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Hộp số</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.transmission}</td></tr>}
                                    {product.fuelSystem && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Hệ thống nhiên liệu</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.fuelSystem}</td></tr>}
                                    {product.fuelCapacity && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Dung tích bình xăng</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.fuelCapacity} lít</td></tr>}
                                    {product.fuelConsumption && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Mức tiêu thụ nhiên liệu</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.fuelConsumption}</td></tr>}
                                    {product.dimensions && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Kích thước (D×R×C)</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.dimensions} mm</td></tr>}
                                    {product.weight && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Khối lượng</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.weight} kg</td></tr>}
                                    {product.seatHeight && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Chiều cao yên</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.seatHeight} mm</td></tr>}
                                    {product.warrantyInfo && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Bảo hành</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.warrantyInfo}</td></tr>}
                                    {product.origin && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Xuất xứ</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.origin}</td></tr>}
                                    <tr>
                                      <td style={{ padding: '4px 8px', color: '#666' }}>Tình trạng</td>
                                      <td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.condition === 'used' ? 'Xe đã qua sử dụng' : 'Xe mới'}</td>
                                    </tr>
                                    {product.manufacturingYear && <tr><td style={{ padding: '4px 8px', color: '#666' }}>Năm sản xuất</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.manufacturingYear}</td></tr>}
                                    {product.condition === 'used' && product.mileage > 0 && (
                                      <tr><td style={{ padding: '4px 8px', color: '#666' }}>Số km đã đi</td><td style={{ padding: '4px 8px', fontWeight: 500 }}>{product.mileage.toLocaleString('vi-VN')} km</td></tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {/* trả góp */}
                            {product?.installmentSupported && (
                              <div className="product-installment" style={{ marginTop: 12, borderTop: '1px solid #eee', paddingTop: 12 }}>
                                <button
                                  type="button"
                                  className="button btnborder"
                                  style={{ fontSize: 13, padding: '6px 14px' }}
                                  onClick={() => setShowInstallment(!showInstallment)}
                                >
                                  {showInstallment ? 'Ẩn thông tin trả góp' : 'Xem trả góp'}
                                </button>
                                {showInstallment && (
                                  <div className="installment-info" style={{ marginTop: 10, background: '#f9f9f9', padding: 12, borderRadius: 6, fontSize: 13 }}>
                                    <p><strong>Trả góp {product.name}</strong></p>
                                    <p>Giá xe: <strong>{formatPrice(product.salePrice)}</strong></p>
                                    <p>Trả trước {product.downPaymentPercent}%: <strong>{formatPrice(product.salePrice * product.downPaymentPercent / 100)}</strong></p>
                                    {[24, 36].filter(m => m <= product.installmentMonths).map((months) => {
                                      const loan = product.salePrice * (1 - product.downPaymentPercent / 100);
                                      const rate = 0.012;
                                      const monthly = Math.round(loan * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1));
                                      return <p key={months}>Góp {months} tháng: ~<strong>{formatPrice(monthly)}</strong>/tháng</p>;
                                    })}
                                    <p style={{ color: '#999', fontSize: 11 }}>* Lãi suất tham khảo 1.2%/tháng. Liên hệ showroom để được tư vấn.</p>
                                  </div>
                                )}
                              </div>
                            )}
                            {/* thay đổi số lượng */}
                            <div className="product-quantity ">
                              <div className="pro-qty d-flex align-items-center">
                                <div className="pro-title">Số lượng: </div>
                                <button type="button" className="qty-btn" onClick={handleMinusClick}>
                                  <svg
                                    focusable="false"
                                    className="icon icon--minus "
                                    viewBox="0 0 10 2"
                                    role="presentation"
                                  >
                                    <path d="M10 0v2H0V0z" />
                                  </svg>
                                </button>
                                <input
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min={1}
                                  className="qty-value"
                                  value={quantity}
                                  readOnly
                                />
                                <button type="button" className="qty-btn" onClick={handlePlusClick}>
                                  <svg
                                    focusable="false"
                                    className="icon icon--plus "
                                    viewBox="0 0 10 10"
                                    role="presentation"
                                  >
                                    <path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z" />
                                  </svg>
                                </button>
                              </div>
                              <div className="pro-share" id="share-mobile">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={22}
                                  height={22}
                                  viewBox="0 0 512 512.00508"
                                >
                                  <g>
                                    <path d="m453.335938 512.003906h-394.667969c-32.363281 0-58.66406275-26.304687-58.66406275-58.664062v-309.335938c0-32.363281 26.30078175-58.664062 58.66406275-58.664062h74.667969c8.832031 0 16 7.167968 16 16 0 8.832031-7.167969 16-16 16h-74.667969c-14.699219 0-26.664063 11.964844-26.664063 26.664062v309.335938c0 14.695312 11.964844 26.664062 26.664063 26.664062h394.667969c14.699218 0 26.667968-11.96875 26.667968-26.664062v-181.335938c0-8.832031 7.167969-16 16-16 8.832032 0 16 7.167969 16 16v181.335938c0 32.359375-26.304687 58.664062-58.667968 58.664062zm0 0" />
                                    <path d="m143.980469 341.0625c-1.171875 0-2.347657-.128906-3.519531-.429688-7.230469-1.683593-12.457032-7.871093-12.457032-15.292968v-32c0-114.6875 93.3125-208 208-208h5.332032v-69.335938c0-6.527344 3.96875-12.394531 10.027343-14.847656 6.035157-2.429688 12.96875-.960938 17.492188 3.753906l138.667969 144c5.972656 6.1875 5.972656 16 0 22.1875l-138.667969 144c-4.523438 4.714844-11.5 6.167969-17.492188 3.753906-6.058593-2.453124-10.027343-8.320312-10.027343-14.847656v-69.332031h-25.34375c-67.113282 0-127.425782 37.289063-157.417969 97.300781-2.753907 5.546875-8.535157 9.089844-14.59375 9.089844zm192.023437-223.722656c-89.601562 0-163.796875 67.304687-174.65625 154.023437 38.78125-43.261719 94.398438-68.691406 154.644532-68.691406h41.34375c8.832031 0 16 7.167969 16 16v45.652344l100.457031-104.320313-100.457031-104.320312v45.65625c0 8.832031-7.167969 16-16 16zm0 0" />
                                  </g>
                                </svg>
                                <span>Chia sẻ</span>
                              </div>
                            </div>
                            {/* thêm vào giỏ hàng */}
                            <div className="product-actions">
                              <div className="product-actions__inner">
                                <div className="action-buys">
                                  <button
                                    type="submit"
                                    name="add-to-cart"
                                    className="button btn-addtocart"
                                    id="add-to-cart"
                                    onClick={addToCart}
                                  >
                                    Thêm vào giỏ
                                  </button>
                                  <button
                                    type="submit"
                                    className="button btnred btn-buynow"
                                    name="buy-now"
                                    id="buy-now"
                                    onClick={buyNow}
                                  >
                                    <span className="add-to-cart--text">Mua ngay</span>
                                  </button>
                                </div>
                                <div id="zone-mix" className="d-none">
                                  <div className="wrapper-mix">
                                    <div className="media-mix" />
                                    <div className="info-mix">
                                      <div className="title-mix" />
                                      <div className="price-mix" />
                                      <div className="variant-mix">
                                        <input type="hidden" id="product-select-mix" defaultValue="" />
                                        <div id="swatch-option1-mix" className="item-options d-none">
                                          <label />
                                          <div className="wrapper-list-option" />
                                        </div>
                                        <div id="swatch-option2-mix" className="item-options d-none">
                                          <label />
                                          <div className="wrapper-list-option" />
                                        </div>
                                        <div id="swatch-option3-mix" className="item-options d-none">
                                          <label />
                                          <div className="wrapper-list-option" />
                                        </div>
                                      </div>
                                      <div className="action-mix">
                                        <button className="button btn-addtocart btn-addtocart-mix">Thêm vào giỏ</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* chia sẻ */}
                            <div className="product-share">
                              <span className="pro-title">Chia sẻ: </span>
                              <a
                                href="//www.facebook.com/"
                                target="_blank"
                                aria-label="facebook"
                                className="tooltip-cs share-facebook"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 512 512">
                                  <g>
                                    <g>
                                      <path
                                        d="m512 256c0 127.78-93.62 233.69-216 252.89v-178.89h59.65l11.35-74h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98h32.28v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6v56.4h-65v74h65v178.89c-122.38-19.2-216-125.11-216-252.89 0-141.38 114.62-256 256-256s256 114.62 256 256z"
                                        fill="#1877f2"
                                        data-original="#1877f2"
                                      />
                                      <path
                                        d="m355.65 330 11.35-74h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979h32.281v-63s-29.296-5-57.305-5c-58.476 0-96.695 35.44-96.695 99.6v56.4h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111v-178.889z"
                                        fill="#ffffff"
                                        data-original="#ffffff"
                                      />
                                    </g>
                                  </g>
                                </svg>
                                <span className="tooltip-hover">Facebook</span>
                              </a>
                              <a
                                href="https://m.me/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="messenger"
                                className="tooltip-cs share-messenger"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 28 28">
                                  <g fill="none" fillRule="evenodd">
                                    <g>
                                      <g>
                                        <g>
                                          <g>
                                            <g>
                                              <g transform="translate(-293.000000, -708.000000) translate(180.000000, 144.000000) translate(16.000000, 16.000000) translate(0.000000, 548.000000) translate(61.000000, 0.000000) translate(36.000000, 0.000000)">
                                                <circle cx={14} cy={14} r={14} fill="#0084FF" />
                                                <path
                                                  fill="#FFF"
                                                  d="M14.848 15.928l-1.771-1.9-3.457 1.9 3.802-4.061 1.815 1.9 3.414-1.9-3.803 4.061zM14.157 7.2c-3.842 0-6.957 2.902-6.957 6.481 0 2.04 1.012 3.86 2.593 5.048V21.2l2.368-1.308c.632.176 1.302.271 1.996.271 3.842 0 6.957-2.902 6.957-6.482S17.999 7.2 14.157 7.2z"
                                                />
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                                <span className="tooltip-hover">Messenger</span>
                              </a>
                              <a
                                href="https://twitter.com/"
                                target="_blank"
                                aria-label="twitter"
                                className="tooltip-cs share-twitter"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={22}
                                  height={22}
                                  viewBox="0 0 291.319 291.319"
                                >
                                  <g>
                                    <g>
                                      <path
                                        style={{}}
                                        d="M145.659,0c80.45,0,145.66,65.219,145.66,145.66c0,80.45-65.21,145.659-145.66,145.659 S0,226.109,0,145.66C0,65.219,65.21,0,145.659,0z"
                                        fill="#26a6d1"
                                        data-original="#26a6d1"
                                        className="hovered-path"
                                      />
                                      <path
                                        style={{}}
                                        d="M236.724,98.129c-6.363,2.749-13.21,4.597-20.392,5.435c7.338-4.27,12.964-11.016,15.613-19.072 c-6.864,3.96-14.457,6.828-22.55,8.366c-6.473-6.691-15.695-10.87-25.909-10.87c-19.591,0-35.486,15.413-35.486,34.439 c0,2.704,0.31,5.335,0.919,7.857c-29.496-1.438-55.66-15.158-73.157-35.996c-3.059,5.089-4.807,10.997-4.807,17.315 c0,11.944,6.263,22.504,15.786,28.668c-5.826-0.182-11.289-1.721-16.086-4.315v0.437c0,16.696,12.235,30.616,28.476,33.784 c-2.977,0.783-6.109,1.211-9.35,1.211c-2.285,0-4.506-0.209-6.673-0.619c4.515,13.692,17.625,23.651,33.165,23.925	c-12.153,9.249-27.457,14.748-44.089,14.748c-2.868,0-5.69-0.164-8.476-0.482c15.722,9.777,34.367,15.485,54.422,15.485 c65.292,0,100.997-52.51,100.997-98.029l-0.1-4.461C225.945,111.111,231.963,105.048,236.724,98.129z"
                                        fill="#ffffff"
                                        data-original="#ffffff"
                                      />
                                    </g>
                                  </g>
                                </svg>
                                <span className="tooltip-hover">Twitter</span>
                              </a>
                              <a
                                href="//pinterest.com/"
                                target="_blank"
                                aria-label="pinterest"
                                className="tooltip-cs share-pinterest"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={22}
                                  height={22}
                                  viewBox="0 0 112.198 112.198"
                                >
                                  <g>
                                    <g>
                                      <circle cx="56.099" cy="56.1" r="56.098" fill="#cb2027" data-original="#cb2027" />
                                      <g>
                                        <path
                                          style={{}}
                                          d="M60.627,75.122c-4.241-0.328-6.023-2.431-9.349-4.45c-1.828,9.591-4.062,18.785-10.679,23.588 c-2.045-14.496,2.998-25.384,5.34-36.941c-3.992-6.72,0.48-20.246,8.9-16.913c10.363,4.098-8.972,24.987,4.008,27.596 c13.551,2.724,19.083-23.513,10.679-32.047c-12.142-12.321-35.343-0.28-32.49,17.358c0.695,4.312,5.151,5.621,1.78,11.571 c-7.771-1.721-10.089-7.85-9.791-16.021c0.481-13.375,12.018-22.74,23.59-24.036c14.635-1.638,28.371,5.374,30.267,19.14 C85.015,59.504,76.275,76.33,60.627,75.122L60.627,75.122z"
                                          fill="#f1f2f2"
                                          data-original="#f1f2f2"
                                          className=""
                                        />
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                                <span className="tooltip-hover">Pinterest</span>
                              </a>
                              <a className="tooltip-cs share-link-js" name="copy-link" data-url="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={22}
                                  height={22}
                                  viewBox="0 0 496.158 496.158"
                                >
                                  <g>
                                    <path
                                      style={{}}
                                      d="M0,248.085C0,111.064,111.07,0.003,248.076,0.003c137.012,0,248.082,111.061,248.082,248.082 c0,137.002-111.07,248.07-248.082,248.07C111.07,496.155,0,385.087,0,248.085z"
                                      fill="#25b7d3"
                                      data-original="#25b7d3"
                                      className=""
                                    />
                                    <g>
                                      <path
                                        style={{}}
                                        d="M394.463,151.309l-49.615-49.614c-10.727-10.728-28.119-10.726-38.844,0l-76.631,76.63 c-10.726,10.728-10.727,28.119-0.001,38.847l49.615,49.614c10.727,10.727,28.119,10.726,38.845-0.002l76.631-76.63 C405.188,179.429,405.189,162.036,394.463,151.309z M312.59,235.423c-6.289,6.288-16.484,6.289-22.772,0.001l-29.084-29.084 c-6.288-6.288-6.287-16.483,0.001-22.772l50.511-50.511c6.287-6.287,16.482-6.288,22.771,0l29.084,29.085	c6.288,6.287,6.287,16.482,0,22.77L312.59,235.423z"
                                        fill="#ffffff"
                                        data-original="#ffffff"
                                        className=""
                                      />
                                      <path
                                        style={{}}
                                        d="M266.786,278.986l-49.614-49.614c-10.727-10.727-28.119-10.726-38.845,0l-76.631,76.632 c-10.726,10.726-10.727,28.118,0,38.844l49.615,49.615c10.726,10.727,28.119,10.725,38.844,0l76.632-76.633 C277.511,307.105,277.513,289.713,266.786,278.986z M184.912,363.1c-6.288,6.288-16.482,6.29-22.771,0.001l-29.084-29.084 c-6.289-6.288-6.288-16.483,0-22.771l50.512-50.512c6.287-6.287,16.482-6.288,22.771,0l29.084,29.084 c6.288,6.289,6.287,16.484,0,22.771L184.912,363.1z"
                                        fill="#ffffff"
                                        data-original="#ffffff"
                                        className=""
                                      />
                                    </g>
                                    <path
                                      style={{}}
                                      d="M306.907,191.673l-2.42-2.421c-7.742-7.743-20.34-7.743-28.083,0l-87.151,87.151 c-7.742,7.742-7.742,20.34,0,28.082l2.42,2.421c7.742,7.741,20.34,7.741,28.083,0l87.151-87.152 C314.649,212.013,314.649,199.414,306.907,191.673z"
                                      fill="#48a1af"
                                      data-original="#48a1af"
                                    />
                                    <path
                                      style={{}}
                                      d="M215.398,302.548c-5.348,5.348-14.02,5.349-19.368,0.001l-2.421-2.421 c-5.348-5.348-5.348-14.02,0-19.367l87.152-87.152c5.348-5.349,14.019-5.348,19.368,0.002l2.42,2.42 c5.347,5.348,5.349,14.019,0,19.366L215.398,302.548z"
                                      fill="#ffffff"
                                      data-original="#ffffff"
                                      className=""
                                    />
                                    <g />
                                  </g>
                                </svg>
                                <span className="tooltip-hover">Sao chép url</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* dưới chia sẻ */}
                    <div className="info-footer">
                      <div className="product-subinfo">
                        <div className="subinfo-block">
                          <div className="subtitle">
                            <span>Chính sách bán hàng</span>
                          </div>
                          <div className="subinfo-list">
                            <div className="item">
                              <div className="item--img">
                                <img
                                  className=" lazyloaded"
                                  data-src="//theme.hstatic.net/200000592359/1001011894/14/product_info1_desc1_img.png?v=423"
                                  src="//theme.hstatic.net/200000592359/1001011894/14/product_info1_desc1_img.png?v=423"
                                  alt="Miễn phí giao hàng cho đơn hàng từ 800K"
                                />
                              </div>
                              <div className="item--text">Giao xe tận nơi toàn quốc</div>
                            </div>
                            <div className="item">
                              <div className="item--img">
                                <img
                                  className=" lazyloaded"
                                  data-src="//theme.hstatic.net/200000592359/1001011894/14/product_info1_desc2_img.png?v=423"
                                  src="//theme.hstatic.net/200000592359/1001011894/14/product_info1_desc2_img.png?v=423"
                                  alt="Cam kết hàng chính hãng 100%"
                                />
                              </div>
                              <div className="item--text">Cam kết hàng chính hãng 100%</div>
                            </div>
                            <div className="item">
                              <div className="item--img">
                                <img
                                  className=" lazyloaded"
                                  data-src="//theme.hstatic.net/200000592359/1001011894/14/product_info1_desc3_img.png?v=423"
                                  src="//theme.hstatic.net/200000592359/1001011894/14/product_info1_desc3_img.png?v=423"
                                  alt="Hỗ trợ 24/7"
                                />
                              </div>
                              <div className="item--text">Hỗ trợ 24/7</div>
                            </div>
                          </div>
                        </div>
                        <div className="subinfo-block">
                          <div className="subtitle">
                            <span>Thông tin thêm</span>
                          </div>
                          <div className="subinfo-list">
                            <div className="item">
                              <div className="item--img">
                                <img
                                  className=" lazyloaded"
                                  data-src="//theme.hstatic.net/200000592359/1001011894/14/product_info2_desc1_img.png?v=423"
                                  src="//theme.hstatic.net/200000592359/1001011894/14/product_info2_desc1_img.png?v=423"
                                  alt="Đổi trả trong
                                    7 ngày
                                    nếu sản phẩm lỗi"
                                />
                              </div>
                              <div className="item--text">Bảo hành chính hãng theo phiếu bảo hành</div>
                            </div>
                            <div className="item">
                              <div className="item--img">
                                <img
                                  className=" lazyloaded"
                                  data-src="//theme.hstatic.net/200000592359/1001011894/14/product_info2_desc2_img.png?v=423"
                                  src="//theme.hstatic.net/200000592359/1001011894/14/product_info2_desc2_img.png?v=423"
                                  alt="Mở hộp kiểm tra nhận hàng"
                                />
                              </div>
                              <div className="item--text">Mở hộp kiểm tra nhận hàng</div>
                            </div>
                            <div className="item">
                              <div className="item--img">
                                <img
                                  className=" lazyloaded"
                                  data-src="//theme.hstatic.net/200000592359/1001011894/14/product_info2_desc3_img.png?v=423"
                                  src="//theme.hstatic.net/200000592359/1001011894/14/product_info2_desc3_img.png?v=423"
                                  alt="Thanh toán nhanh chóng"
                                />
                              </div>
                              <div className="item--text">Thanh toán nhanh chóng</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* mô tả sản phẩm */}
                <div className="col-lg-12 col-md-12 col-12 product-tabs">
                  <ul className="nav tab-title" role="tablist">
                    {tabs.map((tab, i) => (
                      <li className="nav-item" role="presentation" key={i} onClick={() => handleTabClick(tab.id)}>
                        <button
                          className={`title-link ${activeTab === tab.id ? 'active' : ''}`}
                          id={`tab.id`}
                          type="button"
                          role="tab"
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content">
                    {/* tab mô tả */}
                    <div className={`tab-pane fade product-desc ${activeTab === 1 ? 'active show' : ''}`}>
                      <div className="product-desc__inner">
                        <div className="product-desc__content expandable-toggle opened">
                          <div className="desc-content" style={isShow ? { maxHeight: 'none' } : { maxHeight: 230 }}>
                            <div
                              className="desc-content-js"
                              dangerouslySetInnerHTML={{ __html: product?.description }}
                            ></div>
                          </div>
                          <div className={`description-btn ${isShow ? 'is-show' : ''}`}>
                            <button
                              className={`expandable-toggle__btn button btnborder js_expandable_content btn-viewmore ${
                                isShow ? 'show' : ''
                              }`}
                              onClick={() => setIsShow(!isShow)}
                            >
                              <span className="expandable-toggle__icon" />
                              <span className="expandable-toggle__text">
                                {isShow ? 'Rút gọn nội dung' : 'Xem thêm nội dung'}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* tab bảo hành */}
                    <div className={`tab-pane fade product-policy-1 ${activeTab === 2 ? 'active show' : ''}`}>
                      <p><strong>1. Chính sách bảo hành</strong></p>
                      <ul>
                        <li>Xe máy được bảo hành theo chính sách của nhà sản xuất (thường 12-24 tháng hoặc theo km).</li>
                        <li>Bảo hành áp dụng cho các lỗi kỹ thuật từ nhà sản xuất, không áp dụng cho hư hỏng do tai nạn, sử dụng không đúng cách.</li>
                        <li>Mang phiếu bảo hành khi đến trạm bảo hành ủy quyền của hãng.</li>
                      </ul>
                      <p><strong>2. Lịch bảo dưỡng định kỳ</strong></p>
                      <ul>
                        <li>Bảo dưỡng lần 1: 1.000 km hoặc 1 tháng (tùy điều kiện nào đến trước).</li>
                        <li>Bảo dưỡng định kỳ: mỗi 3.000 km hoặc 3 tháng.</li>
                        <li>Kiểm tra dầu máy, bộ lọc gió, lốp xe, phanh theo hướng dẫn của nhà sản xuất.</li>
                      </ul>
                      <p><strong>3. Hỗ trợ sau bán hàng</strong></p>
                      <p>Liên hệ hotline showroom để được hỗ trợ kỹ thuật và đặt lịch bảo dưỡng.</p>
                    </div>
                    {/* hướng dẫn chọn size */}
                    <div className={`tab-pane fade product-policy-2 ${activeTab === 3 ? 'active show' : ''}`}>
                      <p>
                        <span className="wysiwyg-font-size-medium">
                          <strong>1. Giới thiệu</strong>
                        </span>
                      </p>
                      <p>
                        <span className="wysiwyg-font-size-medium">
                          Chào mừng quý khách hàng đến với website chúng tôi.
                        </span>
                      </p>
                      <p>
                        <span className="wysiwyg-font-size-medium">
                          Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý với
                          các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào
                          trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi
                          được đăng trên trang web mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang
                          web, sau khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách chấp nhận với
                          những thay đổi đó.
                        </span>
                      </p>
                      <p>
                        <span className="wysiwyg-font-size-medium">
                          Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
                        </span>
                      </p>
                      <p>
                        <span className="wysiwyg-font-size-medium">
                          <strong>2. Hướng dẫn sử dụng website</strong>
                        </span>
                      </p>
                      <p>
                        <span className="wysiwyg-font-size-medium">
                          Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát
                          của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực
                          hiện các giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.
                        </span>
                      </p>
                      <p>
                        <span className="wysiwyg-font-size-medium">
                          Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website. Nếu không muốn
                          tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở dưới cùng trong
                          mọi email quảng cáo.
                        </span>
                        <span className="wysiwyg-font-size-medium">
                          <strong />
                        </span>
                        <span className="wysiwyg-font-size-medium" />
                        <span className="wysiwyg-font-size-medium">
                          <strong />
                        </span>
                        <span className="wysiwyg-font-size-medium" />
                        <span className="wysiwyg-font-size-medium">
                          <strong />
                        </span>
                        <span className="wysiwyg-font-size-medium" />
                      </p>
                      <p>
                        <span className="wysiwyg-font-size-medium" />
                        <span className="wysiwyg-font-size-medium" />
                        <br />
                      </p>
                      <p>
                        <span className="wysiwyg-font-size-medium">
                          <strong>3. Thanh toán an toàn và tiện lợi</strong>
                        </span>
                      </p>
                      <p>
                        <span className="wysiwyg-font-size-medium">
                          Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức
                          phù hợp:
                        </span>
                      </p>
                      <p>
                        <span className="wysiwyg-font-size-medium">
                          <strong>
                            <u>Cách 1</u>
                          </strong>
                          : Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán)
                          <br />
                        </span>
                        <span className="wysiwyg-font-size-medium">
                          <strong>
                            <u>Cách 2</u>
                          </strong>
                          <strong>:</strong>&nbsp;Thanh toán sau (COD – giao hàng và thu tiền tận nơi)
                          <br />
                        </span>
                        <span className="wysiwyg-font-size-medium">
                          <strong>
                            <u>Cách 3</u>
                          </strong>
                          <strong>:</strong>&nbsp;Thanh toán online qua thẻ tín dụng, chuyển khoản
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* sản phẩm liên quan */}
                <div className="col-lg-12 col-md-12 col-12 product-related">
                  <div className="productDetail-related">
                    <div className="section-title">
                      <h2>Sản phẩm liên quan</h2>
                    </div>
                    <div className="block-content">
                      <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        loop={true}
                        navigation={true}
                        modules={[Navigation]}
                        className="list-product-slide"
                      >
                        {!!relatedProduct &&
                          !!relatedProduct.length &&
                          relatedProduct.map((item, i) => {
                            // Kiểm tra xem id của sản phẩm liên quan có giống với id của sản phẩm hiện tại không
                            if (item.id !== product?.id) {
                              return (
                                <SwiperSlide key={i} className="">
                                  <ItemProduct
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    salePrice={item.salePrice}
                                    img1={item.images?.[0]?.url ?? ''}
                                    img2={item.images?.[1]?.url ?? item.images?.[0]?.url ?? ''}
                                    sale={`${saleRelated[item.sale]}`}
                                    slide
                                  />
                                </SwiperSlide>
                              );
                            } else {
                              // Trả về null nếu id giống nhau để không hiển thị sản phẩm liên quan có cùng id
                              return null;
                            }
                          })}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-action-bottom">
        <div className="container">
          <div className="sticky-atc">
            <div className="sticky-atc__img">
              <div className="prod-info">
                <div className="prod-info__price">
                  <span className="prod-price">{formatPrice(product?.salePrice)}</span>
                  {product?.sale !== 0 && (
                    <>
                      <del className="">{formatPrice(product?.price)}</del>
                      <span className="prod-percent ">
                        <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 512.002 512.002">
                          <g>
                            <path
                              d="m201.498 512.002c-1.992 0-4.008-.398-5.934-1.229-6.741-2.907-10.387-10.266-8.617-17.39l50.724-204.178h-136.67c-4.947 0-9.576-2.439-12.373-6.52s-3.402-9.278-1.617-13.892l100.262-259.204c2.235-5.779 7.793-9.589 13.989-9.589h137.961c5.069 0 9.795 2.56 12.565 6.806 2.768 4.246 3.206 9.603 1.162 14.242l-59.369 134.76h117.42c5.486 0 10.534 2.995 13.164 7.81 2.63 4.814 2.422 10.68-.543 15.296l-209.496 326.192c-2.833 4.412-7.651 6.896-12.628 6.896z"
                              fill="#ffffff"
                              data-original="#000000"
                            />
                          </g>
                        </svg>
                        - {sale?.discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="sticky-atc__vrt">
              <form id="add-item-form-sb">
                <div className="select-swatch">
                  <div className="swatch clearfix choose-size">
                    <div className="header hide">Phiên bản:</div>
                    <select
                      className="select-swap"
                      value={selectedVariantI}
                      onChange={(e) => handleVariantChoose(Number(e.target.value))}
                    >
                      {product?.variants?.map((v, i) => (
                        <option key={i} value={i} disabled={v.stock === 0}>
                          {v.name}{v.colorName ? ` — ${v.colorName}` : ''}{v.stock === 0 ? ' (hết hàng)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="sticky-atc__action">
              <div className="sticky-atc__btn">
                <div className="btn-quantity">
                  <button type="button" className="qty-btn" onClick={handleMinusClick}>
                    <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x={0} y={0}>
                      <polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="quantity-sb"
                    name="quantity"
                    min={1}
                    className="quantity-input"
                    value={quantity}
                    readOnly
                  />
                  <button type="button" className="qty-btn" onClick={handlePlusClick}>
                    <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x={0} y={0}>
                      <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5" />
                    </svg>
                  </button>
                </div>
                <div className="btn-atc">
                  <button
                    type="submit"
                    name="add-to-cart"
                    className="btn-buy-sticky"
                    id="add-to-cart-sticky"
                    onClick={addToCart}
                  >
                    <span className="add-to-cart--text">Thêm vào giỏ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
