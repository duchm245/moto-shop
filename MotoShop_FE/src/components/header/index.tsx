import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import path from '~/constants/path';
import { RootState } from '~/redux/reducers';
import Images from '~/static';
import './styles.css';
import { Order, OrderItem } from '~/types/order.type';
import cartApi from '~/apis/cart.apis';
import { Category } from '~/types/category.type';
import categoryApi from '~/apis/category.apis';
import { SHOP_INFO } from '~/constants/utils';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector((state: RootState) => state.AuthReducer.user);
  const cart: Order[] = useSelector((state: RootState) => state.CartReducer.cart);
  const [cartItem, setCartItem] = React.useState<OrderItem[]>([]);
  const [category, setCategory] = React.useState<Category[]>([]);
  const [articleCategories, setArticleCategories] = React.useState<Category[]>([]);
  const [showMenu, setShowMenu] = React.useState(false);
  const [searchLaptop, setSearchLaptop] = React.useState(false);
  const [searchMoblie, setSearchMobile] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  
  const [productMenuOpen, setProductMenuOpen] = React.useState(false);
  const productMenuTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [serviceMenuOpen, setServiceMenuOpen] = React.useState(false);
  const serviceMenuTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openProductMenu = () => {
    if (productMenuTimer.current) clearTimeout(productMenuTimer.current);
    setProductMenuOpen(true);
  };
  const scheduleCloseProductMenu = () => {
    productMenuTimer.current = setTimeout(() => setProductMenuOpen(false), 200);
  };
  
  const openServiceMenu = () => {
    if (serviceMenuTimer.current) clearTimeout(serviceMenuTimer.current);
    setServiceMenuOpen(true);
  };
  const scheduleCloseServiceMenu = () => {
    serviceMenuTimer.current = setTimeout(() => setServiceMenuOpen(false), 200);
  };

  const getAllCategories = async () => {
    try {
      const res = await categoryApi.getAllCategory();
      if (res.data.status) {
        const raw: any = res.data.data;
        const all: Category[] = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
        setCategory(all.filter((c: any) => c.type === 0));
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getAllCategories();
    categoryApi.getCategoryType(2).then((res) => {
      if (res.data.status) {
        const raw: any = res.data.data;
        setArticleCategories(Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []));
      }
    }).catch(console.error);
  }, []);

  const handleUser = () => {
    if (!!user && user !== null) {
      navigate(path.profile);
    } else {
      navigate(path.login);
    }
  };

  const getCart = async () => {
    if (user) {
      try {
        const res = await cartApi.getCart(user.id);
        if (res.data.status) {
          setCartItem(res.data.data.items);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    getCart();
  }, [cart]);

  const handleSearch = () => {
    if (keyword !== '') {
      navigate(path.searchProduct, { state: keyword });
      setKeyword('');
      setSearchLaptop(false);
      setSearchMobile(false);
    }
  };

  React.useEffect(() => {
    setShowMenu(false);
    setSearchLaptop(false);
    setSearchMobile(false);
  }, [pathname]);

  return (
    <>
      <header className="mainHeader--height" style={{ minHeight: 110 }}>
        <div className="mainHeader mainHeader_temp01" id="main-header">
          
          {/* --- TOP BAR --- */}
          <div className="header-top">
            <div className="container">
              <div className="flex-container-header" style={{ height: '70px' }}>
                
                {/* Mobile Menu Icon */}
                <div className="header-wrap-iconav header-wrap-actions d-lg-none">
                  <div className="header-action">
                    <button
                      className="header-action__link"
                      onClick={() => setShowMenu(true)}
                    >
                      <svg width="20px" height="20px" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* LOGO */}
                <div className="header-wrap-logo">
                  <div className="wrap-logo cursor-pointer" onClick={() => navigate('/')}>
                    <span style={{
                      fontFamily: '\'Montserrat\', \'Inter\', sans-serif',
                      fontWeight: 900,
                      fontSize: '26px',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <span style={{ color: '#1a1a1a' }}>LT</span>
                      <span style={{ color: '#c0392b' }}>Motor</span>
                    </span>
                  </div>
                </div>

                {/* QUICK LINKS (Desktop only) */}
                <div className="header-top-links d-none d-lg-flex" style={{ flex: 1, justifyContent: 'center', gap: '30px' }}>
                  <Link to={path.contact} className="top-link-item">Hệ thống cửa hàng</Link>
                  <Link to={path.article} className="top-link-item">Tin tức</Link>
                  <Link to={path.contact} className="top-link-item">Liên hệ</Link>
                </div>

                {/* ICONS */}
                <div className="header-wrap-iconav header-wrap-actions">
                  {/* Search */}
                  <div className="header-action header-action_search cursor-pointer">
                    <button className="header-action__link" onClick={() => setSearchLaptop(true)}>
                      <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                      </svg>
                    </button>
                  </div>
                  {/* User */}
                  <div className="header-action header-action_account cursor-pointer">
                    <button className="header-action__link" onClick={handleUser}>
                      <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
                      </svg>
                    </button>
                  </div>
                  {/* Cart */}
                  <div className="header-action header-action_cart cursor-pointer">
                    <button className="header-action__link" onClick={() => navigate(path.cart)}>
                      <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
                      </svg>
                      <span className="count-holder">
                        <span className="count">{cartItem.length}</span>
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* --- BOTTOM BAR --- */}
          <div className="header-bottom d-none d-lg-block bg-red">
            <div className="container">
              <nav className="navbar-mainmenu">
                <ul className="menuList-main">
                  
                  {/* Xe Máy */}
                  <li
                    className={`has-submenu${productMenuOpen ? ' is-open' : ''}`}
                    onMouseEnter={openProductMenu}
                    onMouseLeave={scheduleCloseProductMenu}
                  >
                    <a onClick={() => navigate(path.product)} title="Xe máy" className="cursor-pointer">
                      Xe máy
                      {category.length > 0 && (
                        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 128 128" style={{ marginLeft: 4 }}>
                          <path d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z" />
                        </svg>
                      )}
                    </a>
                    {category.length > 0 && (
                      <div
                        className="menuList-submain"
                        onMouseEnter={openProductMenu}
                        onMouseLeave={scheduleCloseProductMenu}
                      >
                        <ul>
                          {category.map((item, i) => (
                            <li key={i}>
                              <a className="cursor-pointer" title={item.title} onClick={() => navigate(path.product, { state: { categoryId: item.id } })}>
                                {item.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>

                  {/* Tư vấn mua – Bán xe */}
                  <li>
                    <a className="cursor-pointer" title="Tư vấn mua – Bán xe" onClick={() => navigate(path.consult)}>
                      Tư vấn mua – Bán xe
                    </a>
                  </li>

                  {/* Mua xe trả góp */}
                  <li>
                    <a className="cursor-pointer" title="Mua xe trả góp" onClick={() => navigate('#')}>
                      Mua xe trả góp
                    </a>
                  </li>

                  {/* Đặt lịch hẹn */}
                  <li>
                    <a className="cursor-pointer" title="Đặt lịch hẹn" onClick={() => navigate(path.consult)}>
                      Đặt lịch hẹn
                    </a>
                  </li>

                  {/* Dịch vụ */}
                  <li
                    className={`has-submenu${serviceMenuOpen ? ' is-open' : ''}`}
                    onMouseEnter={openServiceMenu}
                    onMouseLeave={scheduleCloseServiceMenu}
                  >
                    <a className="cursor-pointer" title="Dịch vụ">
                      Dịch vụ
                      <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 128 128" style={{ marginLeft: 4 }}>
                        <path d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z" />
                      </svg>
                    </a>
                    <div
                        className="menuList-submain"
                        onMouseEnter={openServiceMenu}
                        onMouseLeave={scheduleCloseServiceMenu}
                      >
                        <ul>
                          <li>
                            <a className="cursor-pointer" title="Mua xe cũ" onClick={() => navigate(path.consult)}>
                              Mua xe cũ
                            </a>
                          </li>
                          <li>
                            <a className="cursor-pointer" title="Bảo dưỡng xe máy" onClick={() => navigate(path.consult)}>
                              Bảo dưỡng xe máy
                            </a>
                          </li>
                          <li>
                            <a className="cursor-pointer" title="Tư vấn chọn mua xe" onClick={() => navigate(path.consult)}>
                              Tư vấn chọn mua xe
                            </a>
                          </li>
                        </ul>
                      </div>
                  </li>

                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`sidebar-main ${showMenu ? 'show' : ''}`}>
        <div className="sidebar-main-content">
          <div className="sidebar-main-heading">
            <div className="sidebar-main-heading_title">Danh mục menu</div>
            <div className="sidebar-main-heading_close cursor-pointer" onClick={() => setShowMenu(false)}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
          </div>
          <div className="sidebar-main-body">
            <ul className="sitenav-main">
              <li className="level0" onClick={() => navigate(path.home)}><a><span>Trang chủ</span></a></li>
              <li className="level0" onClick={() => navigate(path.product)}><a><span>Xe máy</span></a></li>
              {!!category && category.length > 0 && category.map((item, i) => (
                <li key={i} style={{ paddingLeft: 16 }} onClick={() => navigate(path.product, { state: { categoryId: item.id } })}>
                  <a><span style={{ fontSize: 13, color: '#555' }}>— {item.title}</span></a>
                </li>
              ))}
              <li className="level0"><a onClick={() => navigate(path.article)}><span>Tin tức</span></a></li>
              <li className="level0"><a onClick={() => navigate(path.consult)}><span>Tư vấn mua – Bán xe</span></a></li>
              <li className="level0"><a onClick={() => navigate('#')}><span>Mua xe trả góp</span></a></li>
              <li className="level0"><a onClick={() => navigate(path.consult)}><span>Đặt lịch hẹn</span></a></li>
              <li className="level0"><a onClick={() => navigate(path.contact)}><span>Hệ thống cửa hàng</span></a></li>
              <li className="level0"><a onClick={() => navigate(path.contact)}><span>Liên hệ</span></a></li>
            </ul>
          </div>
        </div>
        <div className="overlay" onClick={() => setShowMenu(false)} />
      </div>

      {/* SEARCH OVERLAY */}
      {searchLaptop && (
        <div className="sidebar-search show">
          <div className="sitenav-search">
            <div className="mini_search_header">
              <h3 className="d-sm-block d-lg-none">Tìm kiếm</h3>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 logo">
                  <div className="wrap-logo cursor-pointer" onClick={() => navigate('/')}>
                    <span style={{
                      fontFamily: '\'Montserrat\', \'Inter\', sans-serif',
                      fontWeight: 900,
                      fontSize: '22px',
                      letterSpacing: '0.5px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <span style={{ color: '#1a1a1a' }}>LT</span>
                      <span style={{ color: '#c0392b' }}>Motor</span>
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 search-form wpo-wrapper-search">
                  <div className="searchform searchform-categoris ultimate-search">
                    <div className="wpo-search-inner">
                      <input
                        className="input-search"
                        maxLength={40}
                        autoComplete="off"
                        type="text"
                        size={20}
                        placeholder="Tìm kiếm sản phẩm..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                        autoFocus
                      />
                    </div>
                    <div className="btn-search btn cursor-pointer" aria-label="button search" onClick={handleSearch}>
                      <svg
                        version="1.1"
                        className="svg search"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 27"
                      >
                        <path d="M10,2C4.5,2,0,6.5,0,12s4.5,10,10,10s10-4.5,10-10S15.5,2,10,2z M10,19c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S13.9,19,10,19z" />
                        <rect x={17} y={17} transform="matrix(0.7071 -0.7071 0.7071 0.7071 -9.2844 19.5856)" width={4} height={8} />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 actions">
                  <div className="btn-close-search" onClick={() => setSearchLaptop(false)} />
                </div>
              </div>
            </div>
          </div>
          <div className="overlay" onClick={() => setSearchLaptop(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
