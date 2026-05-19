import React from 'react';
import quyTrinhImg from '~/static/images/quy-trinh-mua-xe-motor.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import homeApi from '~/apis/home.apis';
import { Banner, Category } from '~/types/category.type';
import { API_URL_IMAGE, SHOP_INFO } from '~/constants/utils';
import './styles.css';
import { toast } from 'react-toastify';
import SwiperCore from 'swiper/core';
import categoryApi from '~/apis/category.apis';
import { Link, useNavigate } from 'react-router-dom';
import productApi from '~/apis/product.apis';
import { Product } from '~/types/product.type';
import ItemProduct from '~/components/product';
import { Sale } from '~/types/sale.type';
import saleApi from '~/apis/sale.apis';
import articleApi from '~/apis/article.apis';
import { Article } from '~/types/article.type';
import { formatDateString } from '~/constants/formatDate';
import path from '~/constants/path';

SwiperCore.use([Navigation]);
const Home = () => {
  const navigate = useNavigate();
  const [slide, setSlide] = React.useState<Banner[]>([]);
  const [productBestSeller, setProductBestSeller] = React.useState<Product[]>([]);
  //PBS === productBestSeller
  const [sales, setSales] = React.useState<Sale[]>([]);
  const [salesColection, setSalesColection] = React.useState<Sale[]>([]);
  const [salesProduct, setSalesProduct] = React.useState<Sale[]>([]);

  const getSlideHome = async () => {
    try {
      const res = await homeApi.getSlideHome();
      if (res.data.status) {
        setSlide(res.data.data);
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
    getSlideHome();
  }, []);
  //getcategory
  const [category, setCategory] = React.useState<Category[]>([]);

  const getAllCategories = async () => {
    try {
      const res = await categoryApi.getAllCategory();
      if (res.data.status) {
        const raw: any = res.data.data;
        const all: any[] = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
        // Chỉ lấy danh mục sản phẩm (type=0), bỏ danh mục tin tức (type=2)
        setCategory(all.filter((c: any) => c.type === 0));
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getAllCategories();
  }, []);
  // swiper
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [swiper, setSwiper] = React.useState(null);
  const totalSlides = category.length;
  const setSwiperRef = (ref) => {
    setSwiper(ref);
  };
  const handlePrevClick = () => {
    if (swiper && !swiper.isBeginning) {
      swiper.slidePrev();
      setActiveSlide((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNextClick = () => {
    if (swiper && !swiper.isEnd) {
      swiper.slideNext();
      setActiveSlide((prev) => Math.min(totalSlides - 1, prev + 1));
    }
  };

  //getProductBestSeller
  const getProBestSeller = async () => {
    try {
      const res = await productApi.getBestSellerProduct();
      if (res.data.status) {
        const raw: any = res.data.data;
        const productBestSeller = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
        setProductBestSeller(productBestSeller);
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
    getProBestSeller();
  }, []);
  const getSale = async (id: number) => {
    try {
      const res = await saleApi.getSale(id);
      if (res.data.status) {
        const sale = res.data.data;
        setSales((prevMapping) => ({
          ...prevMapping,
          [sale.id]: sale.discount,
        }));
        setSalesColection((prevMapping) => ({
          ...prevMapping,
          [sale.id]: sale.discount,
        }));
        setSalesProduct((prevMapping) => ({
          ...prevMapping,
          [sale.id]: sale.discount,
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
    if (Array.isArray(productBestSeller) && productBestSeller.length > 0) {
      productBestSeller.forEach(async (item) => {
        if (item.sale != null && item.sale !== 0) {
          await getSale(item.sale);
        }
      });
    }
  }, [productBestSeller]);
  //productColection
  const [activeTab, setActiveTab] = React.useState<number | null>();
  const [activeCategoryId, setActiveCategoryId] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (category.length > 0) {
      if (activeCategoryId === null || !category.find((item) => item.id === activeCategoryId)) {
        setActiveCategoryId(category[0].id);
      }
    }
  }, [category]);

  React.useEffect(() => {
    if (activeCategoryId !== null) {
      setActiveTab(activeCategoryId);
    }
  }, [activeCategoryId]);

  const handleTabClick = (tabIndex) => {
    setActiveCategoryId(tabIndex);
  };
  const [productColection, setProductColection] = React.useState<Product[]>([]);
  const getProduct = async (id: number) => {
    try {
      const res = await productApi.getProductByCategory(id);
      if (res.data.status) {
        setProductColection(res.data.data);
      } else {
        setProductColection([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (!!activeTab) {
      getProduct(activeTab);
    }
  }, [activeTab]);
  React.useEffect(() => {
    if (Array.isArray(productColection) && productColection.length > 0) {
      productColection.forEach(async (item) => {
        if (item.sale != null && item.sale !== 0) {
          await getSale(item.sale);
        }
      });
    }
  }, [productColection]);
  //article
  const [activeSlideArticle, setActiveSlideArticle] = React.useState(0);
  const [swiperArticle, setSwiperArticle] = React.useState(null);
  const [article, setArticle] = React.useState<Article[]>([]);
  const totalSlidesArticle = article.length;
  const setSwiperRefArticle = (ref) => {
    setSwiperArticle(ref);
  };
  const handlePrevClickArticle = () => {
    if (swiperArticle && !swiperArticle.isBeginning) {
      swiperArticle.slidePrev();
      setActiveSlideArticle((prev) => Math.max(0, prev - 1));
    }
  };
  const handleNextClickArticle = () => {
    if (swiperArticle && !swiperArticle.isEnd) {
      swiperArticle.slideNext();
      setActiveSlideArticle((prev) => Math.min(totalSlidesArticle - 1, prev + 1));
    }
  };
  const getArticle = async () => {
    try {
      const res = await articleApi.getArticleHome();
      if (res.data.status) {
        setArticle(res.data.data);
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
    getArticle();
  }, []);

  //sản phẩm khuyến mãi
  const [activeSlideSale, setActiveSlideSale] = React.useState(0);
  const [swiperSale, setSwiperSale] = React.useState(null);
  const [productSale, setProductSale] = React.useState<Product[]>([]);
  const totalSlidesSale = productSale.length;
  const setSwiperRefSale = (ref) => {
    setSwiperSale(ref);
  };
  const handlePrevClickSale = () => {
    if (swiperSale && !swiperSale.isBeginning) {
      swiperSale.slidePrev();
      setActiveSlideSale((prev) => Math.max(0, prev - 1));
    }
  };
  const handleNextClickSale = () => {
    if (swiperSale && !swiperSale.isEnd) {
      swiperSale.slideNext();
      setActiveSlideSale((prev) => Math.min(totalSlidesSale - 1, prev + 1));
    }
  };
  const getProductSale = async () => {
    try {
      const res = await productApi.productSale();
      if (res.data.status) {
        setProductSale(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    getProductSale();
  }, []);
  React.useEffect(() => {
    if (Array.isArray(productSale) && productSale.length > 0) {
      productSale.forEach(async (item) => {
        if (item.sale != null && item.sale !== 0) {
          await getSale(item.sale);
        }
      });
    }
  }, [productSale]);

  //đếm ngược
  const [countdown, setCountdown] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [saleEndDate, setSaleEndDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (!Array.isArray(productSale) || productSale.length === 0) return;
    const firstWithSale = productSale.find((p) => p.sale != null && p.sale !== 0);
    if (!firstWithSale) return;
    saleApi.getSale(firstWithSale.sale)
      .then((res) => {
        if (res.data.status && res.data.data.endDate) {
          const dateStr: string = res.data.data.endDate;
          const parts = dateStr.split(' ');
          if (parts.length < 2) return;
          const t = parts[0].split(':');
          const d = parts[1].split('-');
          const parsed = new Date(+d[2], +d[1] - 1, +d[0], +t[0], +t[1], +t[2]);
          if (!isNaN(parsed.getTime())) setSaleEndDate(parsed);
        }
      })
      .catch(() => {/* ignore */});
  }, [productSale]);

  React.useEffect(() => {
    if (!saleEndDate) return;
    const tick = () => {
      const diff = saleEndDate.getTime() - new Date().getTime();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setCountdown({
          days:    Math.floor(diff / 86400000),
          hours:   Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [saleEndDate]);
  return (
    <>
      {/* banner */}
      <div className="section-home-slider">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="home-slider"
        >
          {!!slide &&
            !!slide.length &&
            slide.map((item, i) => {
              return (
                <SwiperSlide key={i} className="">
                  <img src={`${API_URL_IMAGE}${item.src}`} className="banner-home" />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      {/* danh mục nổi bật */}
      <div className="section-home-category">
        <div className="container">
          <div className="section-title">
            <h2 className="text-start">
              <Link to={path.product}>Danh mục nổi bật</Link>
            </h2>{' '}
            <div className="swiper-nav">
              <span
                className={`swiper-button swiper-category-prev ${!swiper || swiper.isBeginning ? 'swiper-button-disabled' : ''}`}
                role="button"
                tabIndex={-1}
                onClick={handlePrevClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 511.993 511.993">
                  <g>
                    <g>
                      <g>
                        <path d="M487.292,235.408H20.59c-11.372,0-20.59,9.224-20.59,20.59c0,11.366,9.217,20.59,20.59,20.59h466.702 c11.372,0,20.59-9.217,20.59-20.59C507.882,244.625,498.665,235.408,487.292,235.408z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M505.96,241.434L304.187,39.653c-8.044-8.037-21.07-8.037-29.114,0c-8.044,8.044-8.044,21.084,0,29.121l187.216,187.223 L275.073,443.221c-8.044,8.037-8.044,21.077,0,29.114c4.022,4.022,9.286,6.033,14.557,6.033s10.535-2.011,14.557-6.033	l201.773-201.78C514.004,262.511,514.004,249.47,505.96,241.434z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <span
                className={`swiper-button swiper-category-next ${
                  !swiper || swiper.isEnd ? 'swiper-button-disabled' : ''
                }`}
                role="button"
                tabIndex={0}
                onClick={handleNextClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 511.993 511.993">
                  <g>
                    <g>
                      <g>
                        <path d="M487.292,235.408H20.59c-11.372,0-20.59,9.224-20.59,20.59c0,11.366,9.217,20.59,20.59,20.59h466.702 c11.372,0,20.59-9.217,20.59-20.59C507.882,244.625,498.665,235.408,487.292,235.408z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M505.96,241.434L304.187,39.653c-8.044-8.037-21.07-8.037-29.114,0c-8.044,8.044-8.044,21.084,0,29.121l187.216,187.223 L275.073,443.221c-8.044,8.037-8.044,21.077,0,29.114c4.022,4.022,9.286,6.033,14.557,6.033s10.535-2.011,14.557-6.033	l201.773-201.78C514.004,262.511,514.004,249.47,505.96,241.434z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <div className="section-content">
            <Swiper
              onSwiper={setSwiperRef}
              onSlideChange={(s) => setActiveSlide(s.activeIndex)}
              observer={true}
              observeParents={true}
              slidesPerView={4}
              breakpoints={{
                0: {
                  slidesPerView: 1.4,
                  spaceBetween: 30,
                },
                760: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                990: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              spaceBetween={30}
              modules={[Navigation]}
              className="list-category-slide"
            >
              {!!category &&
                !!category.length &&
                category.map((item, i) => (
                  <SwiperSlide key={i} className="category-item">
                    <div
                      className="category-item__inner"
                      onClick={() => navigate(path.product, { state: { categoryId: item.id } })}
                    >
                      <div className="category-item__img boxlazy-img">
                        <div className="cursor-pointer">
                          <img className="swiper-lazy swiper-lazy-loaded" src={`${API_URL_IMAGE}${item.urlImage}`} />
                        </div>
                      </div>
                      <div className="category-item__info cursor-pointer">
                        <div className="info-title">
                          <h3>
                            <a className="cursor-pointer">{item.title}</a>
                          </h3>
                        </div>
                        <div className="info-icon">
                          <div className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                              <g>
                                <path
                                  xmlns="http://www.w3.org/2000/svg"
                                  d="m4 13c-.26901 0-.50292-.0994-.70175-.2982-.19883-.1989-.29825-.4328-.29825-.7018 0-.2807.09942-.5146.29825-.7018.19883-.1988.43274-.2982.70175-.2982h16c.2807 0 .5146.0994.7018.2982.1988.1872.2982.4211.2982.7018 0 .269-.0994.5029-.2982.7018-.1872.1988-.4211.2982-.7018.2982zm9.7018 6.7018c-.1755.1988-.4094.2982-.7018.2982-.269 0-.5029-.0994-.7018-.2982-.1988-.1989-.2982-.4328-.2982-.7018 0-.2924.0994-.5263.2982-.7018l6.8948-6.8947c.0585-.0585.0994.0292.1228.2632.0234.2222.0234.4503 0 .6842-.0234.2222-.0643.3041-.1228.2456l-6.8948-6.89475c-.1988-.18713-.2982-.42105-.2982-.70175s.0994-.51462.2982-.70176c.1989-.19882.4328-.29824.7018-.29824.2924 0 .5263.09942.7018.29824l6.8947 6.89476c.2222.2105.3333.4795.3333.807 0 .3158-.1111.5848-.3333.807z"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* sản phẩm khuyến mãi */}
      <section className="section-home-collection collection-flashsale">
        <div className="container">
          <div className="section-title">
            <h2 className="text-start">
              <a className="cursor-pointer" onClick={() => navigate(path.product)}>
                Xe máy khuyến mãi
              </a>
            </h2>
            {/* đếm ngược  */}
            <div className="section-countdown flip-js-countdown countdown-show">
              <div
                className="auto-due soon"
                data-face="slot"
                data-format="d,h,m,s"
                data-labels-days="Dia,Ngày"
                data-labels-hours="Hora,Giờ"
                data-labels-minutes="Minuto,Phút"
                data-labels-seconds="Segundo,Giây"
                data-initialized="true"
                data-layout=" group"
                data-scale="m"
              >
                <span id="label-due" />
                <div id="soon-espa" />
                <span className="soon-group ">
                  <span className="soon-group-inner">
                    <span className="soon-group soon-group-sub">
                      <span className="soon-group-inner">
                        <span className="soon-slot-inner">{countdown.days}</span>
                        <span className="soon-text soon-label">Ngày</span>
                      </span>
                    </span>
                    <span className="soon-group soon-group-sub">
                      <span className="soon-group-inner">
                        <span className="soon-slot-inner">{countdown.hours}</span>
                        <span className="soon-text soon-label">Giờ</span>
                      </span>
                    </span>
                    <span className="soon-group soon-group-sub">
                      <span className="soon-group-inner">
                        <span className="soon-slot-inner">{countdown.minutes}</span>
                        <span className="soon-text soon-label">Phút</span>
                      </span>
                    </span>
                    <span className="soon-group soon-group-sub">
                      <span className="soon-group-inner">
                        <span className="soon-slot-inner">{countdown.seconds}</span>
                        <span className="soon-text soon-label">Giây</span>
                      </span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <div className="swiper-nav">
              <span
                className={`swiper-button swiper-category-prev ${
                  activeSlideSale === 0 ? 'swiper-button-disabled' : ''
                }`}
                role="button"
                tabIndex={-1}
                onClick={handlePrevClickSale}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 511.993 511.993">
                  <g>
                    <g>
                      <g>
                        <path d="M487.292,235.408H20.59c-11.372,0-20.59,9.224-20.59,20.59c0,11.366,9.217,20.59,20.59,20.59h466.702 c11.372,0,20.59-9.217,20.59-20.59C507.882,244.625,498.665,235.408,487.292,235.408z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M505.96,241.434L304.187,39.653c-8.044-8.037-21.07-8.037-29.114,0c-8.044,8.044-8.044,21.084,0,29.121l187.216,187.223 L275.073,443.221c-8.044,8.037-8.044,21.077,0,29.114c4.022,4.022,9.286,6.033,14.557,6.033s10.535-2.011,14.557-6.033	l201.773-201.78C514.004,262.511,514.004,249.47,505.96,241.434z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <span
                className={`swiper-button swiper-category-next ${
                  activeSlideSale >= totalSlidesSale - 6 ? 'swiper-button-disabled' : ''
                }`}
                role="button"
                tabIndex={0}
                onClick={handleNextClickSale}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 511.993 511.993">
                  <g>
                    <g>
                      <g>
                        <path d="M487.292,235.408H20.59c-11.372,0-20.59,9.224-20.59,20.59c0,11.366,9.217,20.59,20.59,20.59h466.702 c11.372,0,20.59-9.217,20.59-20.59C507.882,244.625,498.665,235.408,487.292,235.408z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M505.96,241.434L304.187,39.653c-8.044-8.037-21.07-8.037-29.114,0c-8.044,8.044-8.044,21.084,0,29.121l187.216,187.223 L275.073,443.221c-8.044,8.037-8.044,21.077,0,29.114c4.022,4.022,9.286,6.033,14.557,6.033s10.535-2.011,14.557-6.033	l201.773-201.78C514.004,262.511,514.004,249.47,505.96,241.434z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <div className="section-content">
            <Swiper
              onSwiper={setSwiperRefSale}
              slidesPerView={4}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                760: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                990: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 6,
                  spaceBetween: 30,
                },
              }}
              spaceBetween={30}
              modules={[Navigation]}
              className="list-product-slide"
            >
              {!!productSale &&
                !!productSale.length &&
                productSale.map((item, i) => (
                  <SwiperSlide key={i} className="">
                    <ItemProduct
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      salePrice={item.salePrice}
                      img1={item.images?.[0]?.url ?? ''}
                      img2={item.images?.[1]?.url ?? item.images?.[0]?.url ?? ''}
                      sale={`${salesProduct[item.sale]}`}
                      slide={true}
                      condition={item.condition}
                      isNew={item.isNew}
                      displacement={item.displacement}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="see-more-product d-flex" onClick={() => navigate(path.product, { state: { saleId: 1 } })}>
              <a className="button btnlight btn-see-more cursor-pointer">
                Xem tất cả <strong>Sản phẩm khuyến mãi</strong>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* sản phẩm nổi bật */}
      <div className="section-home-collection collection-1-tabs collection-tabs">
        <div className="container">
          <div className="section-title">
            <div className="title-tabs__navigation">
              <ul className="nav tabs-navigation">
                <li className="nav-item tab-header">
                  <a className="tab-title nav-link active" onClick={() => navigate(path.product)}>
                    XE MÁY NỔI BẬT
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="list-product-row row">
            {!!productBestSeller &&
              !!productBestSeller.length &&
              productBestSeller.map((item, i) => (
                <React.Fragment key={i}>
                  <ItemProduct
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    salePrice={item.salePrice}
                    img1={item.images?.[0]?.url ?? ''}
                    img2={item.images?.[1]?.url ?? item.images?.[0]?.url ?? ''}
                    sale={`${sales[item.sale]}`}
                    slide={false}
                    condition={item.condition}
                    isNew={item.isNew}
                    displacement={item.displacement}
                  />
                </React.Fragment>
              ))}
          </div>
          <div className="see-more-product d-flex " onClick={() => navigate(path.product)}>
            <a className="button btnlight btn-see-more cursor-pointer">
              Xem tất cả <strong className="coll-title">XE MÁY NỔI BẬT</strong>
            </a>
          </div>
        </div>
      </div>
      {/* home about us */}
      {/* <div id="home-aboutUs" className="animation-eva">
        <div className="innerHomeAboutUs">
          <div className="padding-lr-0 col-12 col-sm-7">
            <div className="leftAboutUs site-animation">
              <div className="imageAboutUs">
                <Link  title="𝐔𝐑𝐁𝐀𝐍𝐈𝐓𝐘 | 𝐍𝐄𝐖 𝐂𝐎𝐋𝐋𝐄𝐂𝐓𝐈𝐎𝐍">
                  <img
                    src="https://file.hstatic.net/200000000133/file/1000x600-min_0f26080a01954a0b9483c997aea6d7cf.jpg"
                    alt="𝐔𝐑𝐁𝐀𝐍𝐈𝐓𝐘 | 𝐍𝐄𝐖 𝐂𝐎𝐋𝐋𝐄𝐂𝐓𝐈𝐎𝐍"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="padding-lr-0 col-12 col-sm-5">
            <div className="rightAboutUs site-animation">
              <div className="sectionTitleAboutus">
                <h2>
                  <Link to="https://evadeeva.com.vn/collections/hang-moi-ve" title="𝐔𝐑𝐁𝐀𝐍𝐈𝐓𝐘 | 𝐍𝐄𝐖 𝐂𝐎𝐋𝐋𝐄𝐂𝐓𝐈𝐎𝐍">
                    𝐔𝐑𝐁𝐀𝐍𝐈𝐓𝐘 | 𝐍𝐄𝐖 𝐂𝐎𝐋𝐋𝐄𝐂𝐓𝐈𝐎𝐍
                  </Link>
                </h2>
              </div>
              <div className="sectionContentAboutus">
                <p style={{ textAlign: 'justify' }}>
                  𝐔𝐑𝐁𝐀𝐍𝐈𝐓𝐘 | 𝐍𝐄𝐖 𝐂𝐎𝐋𝐋𝐄𝐂𝐓𝐈𝐎𝐍 Nguồn cảm hứng dẫn lối các nhà thiết kế của CRKing7 để sáng tạo nên BST
                  URBANITY chính là vẻ đẹp hiện đại nhưng đầy tinh tế của những cô gái thành thị. Kết hợp những yếu tố
                  hiện đại pha trộn nét nữ tính mang lại cái chạm mềm mại và lãng mạn cho từng trang phục, cho dù đó là
                  nhờ những tone màu bay bổng, các hoạ tiết sáng tạo hay phụ kiện ăn ý, tạo ra phong cách của những cô
                  gái đô thị vừa sành điệu, thu hút nhưng vẫn đầy sự tinh tế với tính nữ được toát ra mạnh mẽ.{' '}
                </p>
                <div className="btnCenter">
                  <Link
                    className="button btnlight btn-see-more"
                    to="/collections/hang-moi-ve"
                    title="Xem sản phẩm New Collection"
                  >
                    Xem sản phẩm New Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* sản phẩm collection */}
      <div className="section-home-collection collection-1-tabs collection-tabs">
        <div className="container">
          <div className="section-title">
            <div className="title-tabs__navigation">
              <ul className="nav tabs-navigation" data-limit-desktop={10} data-limit-mobile={6} data-index={2}>
                {!!category &&
                  !!category.length &&
                  category.map((item, index) => (
                    <li className="nav-item tab-header" key={index}>
                      <a
                        className={`tab-title nav-link ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(item.id)}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="tab-content section-content">
            <div className="list-product-row row">
              {!!productColection &&
                !!productColection.length &&
                productColection.map((item, i) => {
                  if (i > 10) {
                    return;
                  }
                  return (
                    <React.Fragment key={`product-${item.id}`}>
                      <ItemProduct
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        salePrice={item.salePrice}
                        img1={item.images?.[0]?.url ?? ''}
                        img2={item.images?.[1]?.url ?? item.images?.[0]?.url ?? ''}
                        sale={`${salesColection[item.sale]}`}
                        slide={false}
                        condition={item.condition}
                        isNew={item.isNew}
                        displacement={item.displacement}
                      />
                    </React.Fragment>
                  );
                })}
            </div>
            <div
              className="see-more-product d-flex cursor-pointer"
              onClick={() =>
                navigate(path.product, { state: { categoryId: category.find((item) => item.id === activeTab)?.id } })
              }
            >
              <a className="button btnlight btn-see-more">
                Xem tất cả{' '}
                <strong className="coll-title">{category.find((item) => item.id === activeTab)?.title}</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* bài viết */}
      <div className="section-home-blogs">
        <div className="container">
          <div className="section-title d-flex justify-content-between">
            <h2 className="text-start">
              <Link to={path.article}>Bài viết mới nhất</Link>
            </h2>
            <div className="swiper-nav">
              <span
                className={`swiper-button swiper-category-prev ${
                  activeSlideArticle === 0 ? 'swiper-button-disabled' : ''
                }`}
                role="button"
                tabIndex={-1}
                onClick={handlePrevClickArticle}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 511.993 511.993">
                  <g>
                    <g>
                      <g>
                        <path d="M487.292,235.408H20.59c-11.372,0-20.59,9.224-20.59,20.59c0,11.366,9.217,20.59,20.59,20.59h466.702 c11.372,0,20.59-9.217,20.59-20.59C507.882,244.625,498.665,235.408,487.292,235.408z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M505.96,241.434L304.187,39.653c-8.044-8.037-21.07-8.037-29.114,0c-8.044,8.044-8.044,21.084,0,29.121l187.216,187.223 L275.073,443.221c-8.044,8.037-8.044,21.077,0,29.114c4.022,4.022,9.286,6.033,14.557,6.033s10.535-2.011,14.557-6.033	l201.773-201.78C514.004,262.511,514.004,249.47,505.96,241.434z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <span
                className={`swiper-button swiper-category-next ${
                  activeSlideArticle >= totalSlidesArticle - 4 ? 'swiper-button-disabled' : ''
                }`}
                role="button"
                tabIndex={0}
                onClick={handleNextClickArticle}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 511.993 511.993">
                  <g>
                    <g>
                      <g>
                        <path d="M487.292,235.408H20.59c-11.372,0-20.59,9.224-20.59,20.59c0,11.366,9.217,20.59,20.59,20.59h466.702 c11.372,0,20.59-9.217,20.59-20.59C507.882,244.625,498.665,235.408,487.292,235.408z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M505.96,241.434L304.187,39.653c-8.044-8.037-21.07-8.037-29.114,0c-8.044,8.044-8.044,21.084,0,29.121l187.216,187.223 L275.073,443.221c-8.044,8.037-8.044,21.077,0,29.114c4.022,4.022,9.286,6.033,14.557,6.033s10.535-2.011,14.557-6.033	l201.773-201.78C514.004,262.511,514.004,249.47,505.96,241.434z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <div className="wrapper-content">
            <Swiper
              onSwiper={setSwiperRefArticle}
              slidesPerView={4}
              breakpoints={{
                0: {
                  slidesPerView: 1.4,
                  spaceBetween: 30,
                },
                760: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                990: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              spaceBetween={30}
              modules={[Navigation]}
              className="list-article-row"
            >
              {!!article &&
                !!article.length &&
                article.map((item, i) => (
                  <SwiperSlide key={i} className="article-item">
                    <div className="article-item__block">
                      <div className="article-item__image">
                        <div className="art-image">
                          <a
                            className="cursor-pointer"
                            onClick={() => navigate(path.detailArticle, { state: item.id })}
                          >
                            <img className=" lazyloaded" src={`${API_URL_IMAGE}${item.image}`} />
                          </a>
                        </div>
                      </div>
                      <div className="article-item__detail">
                        <h3 className="art-title" onClick={() => navigate(path.detailArticle, { state: item.id })}>
                          <a className="cursor-pointer">{item.title}</a>
                        </h3>
                        <div className="art-desc">
                          <p dangerouslySetInnerHTML={{ __html: item?.shortContent }}></p>
                        </div>
                        <div className="art-meta">
                          <div className="art-date">
                            <time>{formatDateString(item.modifiedDate)}</time>
                          </div>
                          <a
                            className="art-seemore cursor-pointer"
                            title={item.title}
                            onClick={() => navigate(path.detailArticle, { state: item.id })}
                          >
                            Xem thêm &gt;
                            <i className="fa fa-angle-double-right" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* ===== TẠI SAO CHỌN CHÚNG TÔI ===== */}
      <section className="section-home-whyus">
        <div className="container">
          <div className="whyus-inner">
            {/* Nội dung bên trái */}
            <div className="whyus-content">
              <h2 className="whyus-title">Mua xe tại <span>{SHOP_INFO.name}</span></h2>
              <div className="whyus-features">
                <div className="whyus-feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
                  </div>
                  <div className="feature-body">
                    <h3>Thủ tục đơn giản, nhanh gọn</h3>
                    <p>Giấy tờ tối giản, hỗ trợ làm hồ sơ trả góp ngay tại showroom. Nhận xe trong ngày mà không cần chờ đợi lâu.</p>
                  </div>
                </div>
                <div className="whyus-feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div className="feature-body">
                    <h3>Có nhân viên chăm sóc tận tình</h3>
                    <p>Đội ngũ tư vấn viên giàu kinh nghiệm luôn sẵn sàng hỗ trợ bạn chọn xe phù hợp với nhu cầu và ngân sách.</p>
                  </div>
                </div>
                <div className="whyus-feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                  </div>
                  <div className="feature-body">
                    <h3>Có bộ phận giải đáp sau bán hàng</h3>
                    <p>Hỗ trợ kỹ thuật, bảo dưỡng định kỳ và giải đáp mọi thắc mắc sau khi mua xe. Gọi <b>{SHOP_INFO.phoneDisplay}</b> — miễn phí 24/7.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Ảnh bên phải */}
            <div className="whyus-image">
              <img
                src={quyTrinhImg}
                alt="Quy trình mua xe tại LT Motor"
              />
            </div>
          </div>
        </div>
      </section>


      {/* ===== GIẢI THƯỞNG & CHỨNG NHẬN ===== */}
      <section className="section-home-awards">
        <div className="container">
          <div className="section-title" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Giải thưởng &amp; Chứng nhận</h2>
            <p style={{ color: '#666', marginTop: '8px' }}>Được công nhận bởi các tổ chức uy tín trong ngành xe máy Việt Nam</p>
          </div>
          <div className="awards-grid">
            <div className="award-item">
              <div className="award-icon">🏆</div>
              <div className="award-info">
                <h4>Top 10 Đại lý Honda</h4>
                <p>Uy tín nhất miền Trung 2023</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">⭐</div>
              <div className="award-info">
                <h4>Dịch vụ xuất sắc</h4>
                <p>Chứng nhận chất lượng ISO 9001</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">🥇</div>
              <div className="award-info">
                <h4>Đại lý Yamaha chính hãng</h4>
                <p>Được ủy quyền phân phối chính thức</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">💎</div>
              <div className="award-info">
                <h4>Khách hàng hài lòng nhất</h4>
                <p>Bình chọn từ 5.000+ khách hàng</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CHỈ DẪN ĐỊA CHỈ + BẢN ĐỒ ===== */}
      <section className="section-home-map">
        <div className="container">
          <div className="section-title" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Tìm đường đến showroom</h2>
            <p style={{ color: '#666', marginTop: '8px' }}>Ghé thăm chúng tôi để trải nghiệm xe trực tiếp</p>
          </div>
          <div className="map-wrapper">
            <div className="map-info">
              <div className="map-info-item">
                <div className="map-info-icon">📍</div>
                <div>
                  <h4>Địa chỉ showroom</h4>
                  <p>{SHOP_INFO.address}</p>
                </div>
              </div>
              <div className="map-info-item">
                <div className="map-info-icon">📞</div>
                <div>
                  <h4>Hotline tư vấn</h4>
                  <p><a href={`tel:${SHOP_INFO.phone}`}>{SHOP_INFO.phoneDisplay}</a></p>
                </div>
              </div>
              <div className="map-info-item">
                <div className="map-info-icon">🕐</div>
                <div>
                  <h4>Giờ mở cửa</h4>
                  <p>Thứ 2 – Thứ 7: 8:00 – 18:00</p>
                  <p>Chủ nhật: 8:00 – 12:00</p>
                </div>
              </div>
              <div className="map-info-item">
                <div className="map-info-icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p><a href={`mailto:${SHOP_INFO.email}`}>{SHOP_INFO.email}</a></p>
                </div>
              </div>
            </div>
            <div className="map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0!2d108.2!3d16.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDA0JzEyLjAiTiAxMDjCsDEyJzAwLjAiRQ!5e0!3m2!1svi!2svn!4v1620000000000!5m2!1svi!2svn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ showroom QuangLinhMoto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* gần cuối */}

      <div className="section-home-policy">
        <div className="container">
          <div className="list-policy-row row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12 policy-item">
              <div className="policy-item__inner">
                <div className="policy-item__icon">
                  <div className="icon">
                    <img
                      className=" lazyloaded"
                      data-src="//theme.hstatic.net/200000000133/1001115658/14/home_policy_icon_1.png?v=275"
                      src="//theme.hstatic.net/200000000133/1001115658/14/home_policy_icon_1.png?v=275"
                      alt="Miễn phí vận chuyển"
                    />
                  </div>
                </div>
                <div className="policy-item__info">
                  <h3 className="info-title">Giao xe tận nơi</h3>
                  <div className="infor-des">Giao xe miễn phí toàn quốc</div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-12 policy-item">
              <div className="policy-item__inner">
                <div className="policy-item__icon">
                  <div className="icon">
                    <img
                      className=" lazyloaded"
                      data-src="//theme.hstatic.net/200000000133/1001115658/14/home_policy_icon_2.png?v=275"
                      src="//theme.hstatic.net/200000000133/1001115658/14/home_policy_icon_2.png?v=275"
                      alt="Miễn phí cước đổi hàng"
                    />
                  </div>
                </div>
                <div className="policy-item__info">
                  <h3 className="info-title">Bảo hành chính hãng</h3>
                  <div className="infor-des">Bảo hành theo phiếu bảo hành của nhà sản xuất</div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-12 policy-item">
              <div className="policy-item__inner">
                <div className="policy-item__icon">
                  <div className="icon">
                    <img
                      className=" lazyloaded"
                      data-src="//theme.hstatic.net/200000000133/1001115658/14/home_policy_icon_3.png?v=275"
                      src="//theme.hstatic.net/200000000133/1001115658/14/home_policy_icon_3.png?v=275"
                      alt="Tổng Đài Bán Hàng Miễn Phí"
                    />
                  </div>
                </div>
                <div className="policy-item__info">
                  <h3 className="info-title">Tổng Đài Bán Hàng Miễn Phí</h3>
                  <div className="infor-des">
                    Gọi <b>{SHOP_INFO.phoneDisplay}</b> để được tư vấn
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-12 policy-item">
              <div className="policy-item__inner">
                <div className="policy-item__icon">
                  <div className="icon">
                    <img
                      className=" lazyloaded"
                      data-src="//theme.hstatic.net/200000000133/1001115658/14/home_policy_icon_4.png?v=275"
                      src="//theme.hstatic.net/200000000133/1001115658/14/home_policy_icon_4.png?v=275"
                      alt="Thanh toán đa dạng"
                    />
                  </div>
                </div>
                <div className="policy-item__info">
                  <h3 className="info-title">Thanh toán đa dạng</h3>
                  <div className="infor-des">Phương thức thanh toán đa dạng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
