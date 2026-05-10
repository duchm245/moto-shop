import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, formatPrice } from '~/constants/utils';
import './styles.css';
import productApi from '~/apis/product.apis';
import { Product, ProductImages, Variant } from '~/types/product.type';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

import { Pagination, Navigation, Thumbs, FreeMode } from 'swiper/modules';
import cartApi from '~/apis/cart.apis';
import { User } from '~/types/user.type';
import { RootState } from '~/redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import path from '~/constants/path';
import Types from '~/redux/types';
import CartAction from '~/redux/actions/cartAction';
import CompareAction from '~/redux/actions/compareAction';

interface IIProduct {
  id: number;
  price: number;
  salePrice: number;
  name: string;
  img1: string;
  img2: string;
  sale: string;
  slide: boolean;
  condition?: string;
  isNew?: boolean;
  displacement?: number;
}

const ItemProduct = (props: IIProduct) => {
  const user: User = useSelector((state: RootState) => state.AuthReducer.user);
  const compareItems = useSelector((state: RootState) => state.CompareReducer.items);
  const isInCompare = compareItems.some((i) => i.id === props.id);
  const compareIsFull = compareItems.length >= 4 && !isInCompare;
  const dispatch = useDispatch();

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCompare) {
      dispatch(CompareAction.removeFromCompare(props.id));
    } else if (!compareIsFull) {
      dispatch(CompareAction.addToCompare({
        id: props.id,
        name: props.name,
        img: props.img1,
        salePrice: props.salePrice,
        price: props.price,
      }));
    }
  };
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const handleThumbsSwiper = (swiper) => {
    setThumbsSwiper(swiper);
  };
  const [mainSwiper, setMainSwiper] = React.useState<any>(null);
  const [isSale, setIsSale] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [product, setProduct] = React.useState<Product>();
  const [selectedVariantI, setSelectedVariantI] = React.useState(0);
  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [productImage, setProductImage] = React.useState<ProductImages[]>([]);

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };

  const handleVariantChoose = (i: number) => {
    const variant = product?.variants?.[i];
    if (!variant || variant.stock === 0) return;
    setSelectedVariantI(i);
    setSelectedVariant(variant);
    if (mainSwiper && !mainSwiper.destroyed) {
      mainSwiper.slideToLoop(0, 300);
    }
  };

  React.useEffect(() => {
    if (props.salePrice === props.price) {
      setIsSale(false);
    }
  }, []);

  const openModal = () => {
    setIsOpen(true);
    getProduct();
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const getProduct = async () => {
    try {
      const res = await productApi.getProduct(props.id);
      if (res.data.status) {
        const productData = res.data.data;
        setProduct(productData);
        setProductImage(productData.images);
        const variants: Variant[] = productData.variants || [];
        const firstAvailable = variants.findIndex((v) => v.stock > 0);
        const idx = firstAvailable >= 0 ? firstAvailable : 0;
        setSelectedVariantI(idx);
        setSelectedVariant(variants[idx] || null);
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

  const addToCart = async () => {
    if (user) {
      try {
        const data = {
          quantity: quantity,
          sellPrice: props.salePrice,
          productName: product?.name,
          valueColor: selectedVariant?.colorName || '',
          valueSize: selectedVariant?.name || '',
          variantId: selectedVariant?.id || null,
        };
        const res = await cartApi.addToCart(user.id, data);
        if (res.data.status) {
          dispatch(CartAction.addToCart(res.data.data.items));
          setIsOpen(false);
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
  return (
    <>
      <div className={`product-loop ${props.slide ? 'product-loop-slide' : 'col-lg-cus5 col-lg-3 col-md-6 col-6'}`}>
        <div className="product-inner cursor-pointer">
          <div className="proloop-image">
            <div className="proloop-image__inner" onClick={() => navigate(path.detailProduct, { state: props.id })}>
              <div className="lazy-img lazy-img__prod first-image">
                <img className="img-loop lazyloaded img-zoom" src={`${API_URL_IMAGE}${props.img1}`} />
              </div>
              <div className="lazy-img lazy-img__prod second-image hovered-img d-none d-lg-block">
                <img className="img-loop lazyloaded img-zoom" src={`${API_URL_IMAGE}${props.img2}`} />
              </div>
            </div>
            <div className="proloop-image__position">
              {isSale && (
                <div className="pro-sale">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 512.002 512.002">
                      <g>
                        <path
                          d="m201.498 512.002c-1.992 0-4.008-.398-5.934-1.229-6.741-2.907-10.387-10.266-8.617-17.39l50.724-204.178h-136.67c-4.947 0-9.576-2.439-12.373-6.52s-3.402-9.278-1.617-13.892l100.262-259.204c2.235-5.779 7.793-9.589 13.989-9.589h137.961c5.069 0 9.795 2.56 12.565 6.806 2.768 4.246 3.206 9.603 1.162 14.242l-59.369 134.76h117.42c5.486 0 10.534 2.995 13.164 7.81 2.63 4.814 2.422 10.68-.543 15.296l-209.496 326.192c-2.833 4.412-7.651 6.896-12.628 6.896z"
                          fill="#ffffff"
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                    -{props.sale} %
                  </span>
                </div>
              )}
              {props.condition === 'used' && (
                <div style={{ position: 'absolute', top: 6, right: 6, zIndex: 3, background: '#e67e22', color: '#fff', fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 4, lineHeight: 1 }}>
                  Xe cũ
                </div>
              )}
              {props.isNew && (
                <div style={{ position: 'absolute', top: props.condition === 'used' ? 38 : 6, right: 6, zIndex: 3, background: '#27ae60', color: '#fff', fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 4, lineHeight: 1 }}>
                  Mới về
                </div>
              )}
            </div>
            <div className="proloop-actions">
              <div className="proloop-actions__inner">
                <div className="proloop-actions__cart">
                  <div className="actions-primary">
                    <button
                      className={`button btn-small btn-proloop-cart add-to-cart btn-addcart-view`}
                      onClick={openModal}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 22 22">
                        <path d="M15.95 6H19.7V17.875C19.7 18.7344 19.3875 19.4635 18.7625 20.0625C18.1635 20.6875 17.4344 21 16.575 21H5.325C4.46563 21 3.72344 20.6875 3.09844 20.0625C2.49948 19.4635 2.2 18.7344 2.2 17.875V6H5.95C5.95 4.61979 6.43177 3.44792 7.39531 2.48438C8.3849 1.49479 9.56979 1 10.95 1C12.3302 1 13.5021 1.49479 14.4656 2.48438C15.4552 3.44792 15.95 4.61979 15.95 6ZM13.1375 3.8125C12.5385 3.1875 11.8094 2.875 10.95 2.875C10.0906 2.875 9.34844 3.1875 8.72344 3.8125C8.12448 4.41146 7.825 5.14062 7.825 6H14.075C14.075 5.14062 13.7625 4.41146 13.1375 3.8125ZM17.825 17.875V7.875H15.95V9.4375C15.95 9.69792 15.8589 9.91927 15.6766 10.1016C15.4943 10.2839 15.2729 10.375 15.0125 10.375C14.7521 10.375 14.5307 10.2839 14.3484 10.1016C14.1661 9.91927 14.075 9.69792 14.075 9.4375V7.875H7.825V9.4375C7.825 9.69792 7.73385 9.91927 7.55156 10.1016C7.36927 10.2839 7.14792 10.375 6.8875 10.375C6.62708 10.375 6.40573 10.2839 6.22344 10.1016C6.04115 9.91927 5.95 9.69792 5.95 9.4375V7.875H4.075V17.875C4.075 18.2135 4.19219 18.5 4.42656 18.7344C4.68698 18.9948 4.98646 19.125 5.325 19.125H16.575C16.9135 19.125 17.2 18.9948 17.4344 18.7344C17.6948 18.5 17.825 18.2135 17.825 17.875Z" />
                      </svg>
                      <span className="btnadd">Thêm vào giỏ</span>
                    </button>
                  </div>
                </div>
                <div className="proloop-actions__quickview">
                  <button className="icon-quickview tooltip-cs " title="Xem nhanh" onClick={openModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 577.029 577.029">
                      <g>
                        <g>
                          <path
                            d="M288.514,148.629c73.746,0,136.162,33.616,175.539,61.821c46.652,33.415,70.66,65.737,76.885,78.065
    						c-6.232,12.327-30.232,44.649-76.885,78.065c-39.377,28.204-101.793,61.82-175.539,61.82c-73.746,0-136.161-33.616-175.539-61.82
    						c-46.661-33.416-70.66-65.738-76.894-78.065c6.234-12.328,30.233-44.65,76.885-78.065
    						C152.353,182.245,214.768,148.629,288.514,148.629 M288.514,113.657C129.176,113.657,0,253.543,0,288.515
    						s129.176,174.857,288.514,174.857c159.339,0,288.515-139.886,288.515-174.857S447.854,113.657,288.514,113.657L288.514,113.657z
    						M288.514,183.601c-57.939,0-104.914,46.975-104.914,104.914c0,57.938,46.975,104.914,104.914,104.914
    						s104.914-46.976,104.914-104.914C393.428,230.576,346.453,183.601,288.514,183.601z M260.266,288.515
    						c-24.515,0-44.388-19.873-44.388-44.388c0-24.515,19.873-44.387,44.388-44.387c24.515,0,44.388,19.873,44.388,44.387
    						C304.654,268.642,284.781,288.515,260.266,288.515z"
                          />
                        </g>
                      </g>
                    </svg>
                    <span className="tooltip-hover">Xem nhanh</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="proloop-detail">
            <h3 className="proloop-title">
              <a className="cursor-pointer" onClick={() => navigate(path.detailProduct, { state: props.id })}>
                {props.name}
              </a>
            </h3>
            <p className="proloop-price on-sale">
              <span className="price">
                {isSale ? `${formatPrice(props.salePrice)}` : `${formatPrice(props.price)}`}
              </span>
              {isSale && <span className="price-del">{formatPrice(props.price)}</span>}
              <span className="addtocart-mb d-sm-block d-lg-none" onClick={openModal}>
                <a className="icon-addtocart">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 22 22">
                    <path d="M15.95 6H19.7V17.875C19.7 18.7344 19.3875 19.4635 18.7625 20.0625C18.1635 20.6875 17.4344 21 16.575 21H5.325C4.46563 21 3.72344 20.6875 3.09844 20.0625C2.49948 19.4635 2.2 18.7344 2.2 17.875V6H5.95C5.95 4.61979 6.43177 3.44792 7.39531 2.48438C8.3849 1.49479 9.56979 1 10.95 1C12.3302 1 13.5021 1.49479 14.4656 2.48438C15.4552 3.44792 15.95 4.61979 15.95 6ZM13.1375 3.8125C12.5385 3.1875 11.8094 2.875 10.95 2.875C10.0906 2.875 9.34844 3.1875 8.72344 3.8125C8.12448 4.41146 7.825 5.14062 7.825 6H14.075C14.075 5.14062 13.7625 4.41146 13.1375 3.8125ZM17.825 17.875V7.875H15.95V9.4375C15.95 9.69792 15.8589 9.91927 15.6766 10.1016C15.4943 10.2839 15.2729 10.375 15.0125 10.375C14.7521 10.375 14.5307 10.2839 14.3484 10.1016C14.1661 9.91927 14.075 9.69792 14.075 9.4375V7.875H7.825V9.4375C7.825 9.69792 7.73385 9.91927 7.55156 10.1016C7.36927 10.2839 7.14792 10.375 6.8875 10.375C6.62708 10.375 6.40573 10.2839 6.22344 10.1016C6.04115 9.91927 5.95 9.69792 5.95 9.4375V7.875H4.075V17.875C4.075 18.2135 4.19219 18.5 4.42656 18.7344C4.68698 18.9948 4.98646 19.125 5.325 19.125H16.575C16.9135 19.125 17.2 18.9948 17.4344 18.7344C17.6948 18.5 17.825 18.2135 17.825 17.875Z" />
                  </svg>
                </a>
              </span>
            </p>
            <button
              className={`proloop-compare${isInCompare ? ' proloop-compare--active' : ''}${compareIsFull ? ' proloop-compare--disabled' : ''}`}
              onClick={handleCompareToggle}
              title={compareIsFull ? 'Đã chọn đủ 4 xe' : undefined}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
              {isInCompare ? '✓ Đã thêm' : 'So sánh'}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div id="modal-quickview" className="noscroll-bar modal fade modal-quickview show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content wrapper-quickview">
              <div className="modal-header modal-paramlink">
                <div className="modal-close quickview-close" onClick={closeModal}></div>
                <div className="paramlink-topbar text-center">
                  <h4 className="purl-title">
                    <span>{product?.name}</span>
                  </h4>
                </div>
              </div>
              <div className="modal-body modal-detailProduct">
                <div className="productDetail-information">
                  <div className="productDetail--gallery product-gallery">
                    <div className="product-gallery__inner sticky-gallery">
                      <Swiper
                        onSwiper={setMainSwiper}
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        centeredSlides={true}
                        pagination={{
                          clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation, Thumbs, FreeMode]}
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
                                      <img src={`${API_URL_IMAGE}${item.url}`} />
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
                  <div className="productDetail--content product-info">
                    {/* info */}
                    <div className="info-header">
                      <div className="product-name">
                        <h2>{product?.name}</h2>
                      </div>
                      <div className="product-sku">
                        <span id="pro_sku">
                          Mã sản phẩm: <strong>{product?.sku}</strong>
                        </span>
                        {product?.brand && (
                          <span className="pro-state">
                            Hãng xe: <strong>{product?.brand}</strong>
                          </span>
                        )}
                        {product?.displacement && (
                          <span className="pro-state">
                            Phân khối: <strong>{product?.displacement} cc</strong>
                          </span>
                        )}
                        {product?.vehicleType && (
                          <span className="pro-state">
                            Loại xe: <strong>{product?.vehicleType}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="info-body">
                      <div className="product-price">
                        <span className="pro-title">Giá:</span>
                        <span className="pro-price">{formatPrice(product?.salePrice)}</span>
                        {isSale && (
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
                              - {props.sale}%
                            </span>
                          </>
                        )}
                      </div>
                      {/* chọn phiên bản */}
                      <div className="product-variants">
                        <div>
                          <div className="select-swatch">
                            <div className="swatch clearfix">
                              <div className="pro-title">Phiên bản:</div>
                              <div className="select-swap">
                                {product?.variants?.map((variant, i) => (
                                  <div
                                    className={`n-sd swatch-element ${variant.stock === 0 ? 'soldout' : ''}`}
                                    key={i}
                                    onClick={() => handleVariantChoose(i)}
                                  >
                                    <input
                                      className={`variant-${i}`}
                                      id={`swatch-variant-${i}-qv`}
                                      type="radio"
                                      readOnly
                                    />
                                    <label
                                      htmlFor={`swatch-variant-${i}-qv`}
                                      className={`${selectedVariantI === i ? 'sd' : ''}`}
                                    >
                                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        {variant.colorCode && (
                                          <span
                                            style={{
                                              background: variant.colorCode,
                                              width: 12,
                                              height: 12,
                                              borderRadius: '50%',
                                              display: 'inline-block',
                                              border: '1px solid #ccc',
                                              flexShrink: 0,
                                            }}
                                          />
                                        )}
                                        {variant.name}
                                      </span>
                                    </label>
                                  </div>
                                ))}
                                {(!product?.variants || product.variants.length === 0) && (
                                  <span style={{ fontSize: 13, color: '#999' }}>Chưa có phiên bản</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* số lượng */}
                      <div className="product-quantity">
                        <div className="pro-title">Số lượng: </div>
                        <div className="pro-qty d-flex align-items-center">
                          <button className="qty-btn" onClick={handleMinusClick}>
                            <svg focusable="false" className="icon icon--minus " viewBox="0 0 10 2" role="presentation">
                              <path d="M10 0v2H0V0z" />
                            </svg>
                          </button>
                          <input
                            type="text"
                            id="quickview-qtyvalue"
                            name="quantity"
                            value={quantity}
                            min={1}
                            className="qty-value"
                            readOnly
                          />
                          <button className="qty-btn" onClick={handlePlusClick}>
                            <svg focusable="false" className="icon icon--plus " viewBox="0 0 10 10" role="presentation">
                              <path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* thêm vào giỏ */}
                      <div className="product-actions">
                        <div className="product-actions__inner">
                          <div className="action-buys">
                            <button
                              type="submit"
                              name="add-to-cart"
                              className="button btnred btn-addtocart-qv "
                              id="add-to-cart-qv"
                              onClick={addToCart}
                            >
                              <span className="add-to-cart--text">Thêm vào giỏ </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="product-share">
                        <span className="pro-title">Chia sẻ: </span>
                        <a
                          href="//www.facebook.com/sharer/sharer.php?u=https://motoshop.vn"
                          target="_blank"
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
                          href="https://m.me/motoshop"
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
                      </div>
                      <div
                        className="product-viewdetail text-start"
                        onClick={() => navigate(path.detailProduct, { state: props.id })}
                      >
                        <a href="" className="productdetail-link">
                          Xem chi tiết sản phẩm
                        </a>
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} x={0} y={0} viewBox="0 0 24 24">
                          <g>
                            <g data-name={19}>
                              <path d="m12 19a1 1 0 0 1 -.71-1.71l5.3-5.29-5.3-5.29a1 1 0 0 1 1.41-1.41l6 6a1 1 0 0 1 0 1.41l-6 6a1 1 0 0 1 -.7.29z" />
                              <path d="m6 19a1 1 0 0 1 -.71-1.71l5.3-5.29-5.3-5.29a1 1 0 0 1 1.42-1.42l6 6a1 1 0 0 1 0 1.41l-6 6a1 1 0 0 1 -.71.3z" />
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemProduct;
