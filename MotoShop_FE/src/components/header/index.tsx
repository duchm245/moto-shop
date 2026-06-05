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
import bannerHonda from '~/static/images/banner/adv350-scaled.jpg';
import bannerYamaha from '~/static/images/banner/VkyJuVLDi2zi1jWpxVTM.png';
import bannerSym from '~/static/images/banner/AB-scaled.jpg';

type BrandKey = 'HONDA' | 'YAMAHA' | 'SYM';

const BRAND_DATA: Record<BrandKey, { image: string; categories: { title: string; items: string[] }[] }> = {
  HONDA: {
    image: bannerHonda,
    categories: [
      { title: 'Xe ga', items: ['SH350i', 'Sh mode 125cc', 'SH160i/125i', 'Honda Vision', 'Vision phiên bản cổ điển', 'ADV350', 'LEAD ABS', 'Air Blade', 'Vario 125', 'Vario160'] },
      { title: 'Xe côn tay', items: ['CBR150R', 'Winner X 2024', 'Winner R', "CB350 H'ness"] },
      { title: 'Xe số', items: ['Wave Alpha 110cc', 'Wave Alpha phiên bản cổ điển', 'Future 125 FI', 'Blade 2023', 'Wave RSX', 'Super Cub C125', 'CT125'] },
      { title: 'Xe điện', items: ['Honda UC3', 'ICON e', 'CUV e'] },
    ],
  },
  YAMAHA: {
    image: bannerYamaha,
    categories: [
      { title: 'Xe ga', items: ['Freego S phiên bản đặc biệt màu mới', 'Freego phiên bản tiêu chuẩn màu mới', 'Janus phiên bản tiêu chuẩn', 'Janus phiên bản đặc biệt', 'Latte tiêu chuẩn', 'Latte phiên bản giới hạn', 'Grande tiêu chuẩn', 'Grande đặc biệt', 'NVX 155', 'Neos'] },
      { title: 'Xe số', items: ['Jupiter FI màu mới', 'Exciter 155 VVA 60 năm Yamaha', 'Exciter 155 VVA phiên bản giới hạn'] },
      { title: 'Xe thể thao', items: ['MT-03', 'MT-15 màu mới', 'MT-15', 'XSR155', 'YZF-R15M phiên bản giới hạn 60 năm'] },
    ],
  },
  SYM: {
    image: bannerSym,
    categories: [
      { title: 'Xe ga', items: ['SHARK 50', 'ATTILA 50', 'PASSING 50', 'ELITE 50'] },
      { title: 'Xe số', items: ['ANGELA 50', 'GALAXY 50', 'HUSKY CLASSIC 125', 'ELEGANT 50'] },
      { title: 'Xe côn tay', items: ['NEW GALAXY 125', 'STAR SR 125 EFI'] },
    ],
  },
};

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector((state: RootState) => state.AuthReducer.user);
  const cart: Order[] = useSelector((state: RootState) => state.CartReducer.cart);
  const [cartItem, setCartItem] = React.useState<OrderItem[]>([]);
  const [category, setCategory] = React.useState<Category[]>([]);
  const [showMenu, setShowMenu] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');

  const [productMenuOpen, setProductMenuOpen] = React.useState(false);
  const productMenuTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [serviceMenuOpen, setServiceMenuOpen] = React.useState(false);
  const serviceMenuTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [newsMenuOpen, setNewsMenuOpen] = React.useState(false);
  const newsMenuTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeBrand, setActiveBrand] = React.useState<BrandKey>('HONDA');

  const openProductMenu = () => { if (productMenuTimer.current) clearTimeout(productMenuTimer.current); setProductMenuOpen(true); };
  const scheduleCloseProductMenu = () => { productMenuTimer.current = setTimeout(() => setProductMenuOpen(false), 200); };
  const openServiceMenu = () => { if (serviceMenuTimer.current) clearTimeout(serviceMenuTimer.current); setServiceMenuOpen(true); };
  const scheduleCloseServiceMenu = () => { serviceMenuTimer.current = setTimeout(() => setServiceMenuOpen(false), 200); };
  const openNewsMenu = () => { if (newsMenuTimer.current) clearTimeout(newsMenuTimer.current); setNewsMenuOpen(true); };
  const scheduleCloseNewsMenu = () => { newsMenuTimer.current = setTimeout(() => setNewsMenuOpen(false), 200); };

  React.useEffect(() => {
    categoryApi.getAllCategory().then((res) => {
      if (res.data.status) {
        const raw: any = res.data.data;
        const all: Category[] = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
        setCategory(all.filter((c: any) => c.type === 0));
      }
    }).catch(console.error);
  }, []);

  const handleUser = () => navigate(!!user ? path.profile : path.login);

  React.useEffect(() => {
    if (user) {
      cartApi.getCart(user.id).then((res) => {
        if (res.data.status) setCartItem(res.data.data.items);
      }).catch(console.error);
    }
  }, [cart]);

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(path.searchProduct, { state: keyword });
      setKeyword('');
      setSearchOpen(false);
    }
  };

  React.useEffect(() => { setShowMenu(false); setSearchOpen(false); }, [pathname]);

  return (
    <>
      {/* ===== DESKTOP HEADER ===== */}
      <header className="lt-header">
        {/* FULL-WIDTH WRAPPER */}
        <div className="lt-header__wrapper">

          {/* Logo area - overlaps both rows */}
          <div className="lt-header__logo-col" onClick={() => navigate('/')}>
            <img src={Images.logo} alt="LTMoto" className="lt-logo-img" />
          </div>

          {/* Right content */}
          <div className="lt-header__right-col">

            {/* === ROW 1: Red bar === */}
            <div className="lt-topbar">
              <div className="lt-topbar__slant"></div>
              {/* Everything right-aligned: links → social */}
              <div className="lt-topbar__content">
                <div className="lt-topbar__links">
                  <Link to="/" className="lt-topbar__link">LTMoto</Link>
                  <span className="lt-topbar__sep">|</span>
                  <Link to={path.contact} className="lt-topbar__link">Hệ thống cửa hàng</Link>
                  <span className="lt-topbar__sep">|</span>
                  
                  {/* Tin Tức Dropdown */}
                  <div className={`lt-topbar__dropdown-wrapper${newsMenuOpen ? ' open' : ''}`} onMouseEnter={openNewsMenu} onMouseLeave={scheduleCloseNewsMenu}>
                    <Link to={path.article} className="lt-topbar__link">
                      Tin tức
                      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={8} viewBox="0 0 128 128" fill="#fff" style={{ marginLeft: 3, verticalAlign: 'middle' }}>
                        <path d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z" />
                      </svg>
                    </Link>
                    <div className="lt-topbar__dropdown">
                      <Link to={path.article} className="lt-topbar__dd-item">Tin sự kiện</Link>
                      <Link to={path.article} className="lt-topbar__dd-item">Tin khuyến mại</Link>
                      <Link to={path.article} className="lt-topbar__dd-item">Tin tuyển dụng</Link>
                    </div>
                  </div>

                  <span className="lt-topbar__sep">|</span>
                  <Link to={path.contact} className="lt-topbar__link">Liên hệ</Link>
                </div>

                {/* Social icons - right after Liên hệ */}
                <div className="lt-topbar__socials">
                  <a href={`https://zalo.me/${SHOP_INFO.zaloPhone}`} target="_blank" rel="noopener noreferrer" className="lt-social-icon lt-social-icon--zalo" title="Zalo">
                    <img src="https://kuongngan.com/wp-content/uploads/2023/08/Logo-Zalo-Arc.png" alt="Zalo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="lt-social-icon lt-social-icon--yt" title="YouTube">
                    <img src="https://kuongngan.com/wp-content/uploads/2023/07/Group-501.png" alt="YouTube" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="lt-social-icon lt-social-icon--ig" title="Instagram">
                    <img src="https://kuongngan.com/wp-content/uploads/2023/07/Group-500.png" alt="Instagram" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="lt-social-icon lt-social-icon--fb" title="Facebook">
                    <img src="https://kuongngan.com/wp-content/uploads/2023/07/Group-502.png" alt="Facebook" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </a>
                </div>

              </div>
            </div>


            {/* === ROW 2: White nav bar === */}
            <div className="lt-navbar">
              <nav className="lt-nav">
                {/* Xe Máy - MEGA MENU */}
                <div className={`lt-nav__item lt-nav__item--mega${productMenuOpen ? ' open' : ''}`} onMouseEnter={openProductMenu} onMouseLeave={scheduleCloseProductMenu}>
                  <a className="lt-nav__link" onClick={() => navigate(path.product)}>
                    XE MÁY
                    <svg xmlns="http://www.w3.org/2000/svg" width={9} height={9} viewBox="0 0 128 128" fill="#d71a21" style={{ marginLeft: 4 }}><path d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z"/></svg>
                  </a>
                  
                  {/* The Mega Menu Dropdown */}
                  <div className="lt-mega-menu" onMouseEnter={openProductMenu} onMouseLeave={scheduleCloseProductMenu}>
                    <div className="lt-mega-menu__inner">
                      {/* Left Column: Brand Tabs */}
                      <div className="lt-mega-menu__col-left">
                        <ul className="lt-mega-tabs">
                          {(['HONDA', 'YAMAHA', 'SYM'] as BrandKey[]).map((brand) => (
                            <li
                              key={brand}
                              className={activeBrand === brand ? 'active' : ''}
                              onMouseEnter={() => setActiveBrand(brand)}
                              onClick={() => setActiveBrand(brand)}
                            >
                              {brand}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Middle Column: Dynamic Categories */}
                      <div className="lt-mega-menu__col-middle">
                        <div className="lt-mega-subcats">
                          {/* Split categories into 2 columns */}
                          {(() => {
                            const cats = BRAND_DATA[activeBrand].categories;
                            const half = Math.ceil(cats.length / 2);
                            const col1 = cats.slice(0, half);
                            const col2 = cats.slice(half);
                            return (
                              <>
                                <div className="lt-mega-subcat-group">
                                  {col1.map((cat) => (
                                    <React.Fragment key={cat.title}>
                                      <h4>{cat.title}</h4>
                                      <ul>
                                        {cat.items.map((item) => (
                                          <li key={item} onClick={() => navigate(path.product)}>{item}</li>
                                        ))}
                                      </ul>
                                    </React.Fragment>
                                  ))}
                                </div>
                                <div className="lt-mega-subcat-group">
                                  {col2.map((cat) => (
                                    <React.Fragment key={cat.title}>
                                      <h4>{cat.title}</h4>
                                      <ul>
                                        {cat.items.map((item) => (
                                          <li key={item} onClick={() => navigate(path.product)}>{item}</li>
                                        ))}
                                      </ul>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Right Column: Dynamic Brand Image */}
                      <div className="lt-mega-menu__col-right">
                        <div className="lt-mega-img-wrapper">
                          <img
                            key={activeBrand}
                            src={BRAND_DATA[activeBrand].image}
                            alt={`${activeBrand} Cover`}
                            className="lt-mega-img"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lt-nav__item"><a className="lt-nav__link" onClick={() => navigate(path.consult)}>TƯ VẤN MUA – BÁN XE</a></div>
                <div className="lt-nav__item"><a className="lt-nav__link" onClick={() => navigate('#')}>MUA XE TRẢ GÓP</a></div>
                <div className="lt-nav__item"><a className="lt-nav__link" onClick={() => navigate(path.consult)}>ĐẶT LỊCH HẸN</a></div>

                {/* Dịch Vụ */}
                <div className={`lt-nav__item${serviceMenuOpen ? ' open' : ''}`} onMouseEnter={openServiceMenu} onMouseLeave={scheduleCloseServiceMenu}>
                  <a className="lt-nav__link">
                    DỊCH VỤ
                    <svg xmlns="http://www.w3.org/2000/svg" width={9} height={9} viewBox="0 0 128 128" fill="#d71a21" style={{ marginLeft: 4 }}><path d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z"/></svg>
                  </a>
                  <div className="lt-nav__dropdown" onMouseEnter={openServiceMenu} onMouseLeave={scheduleCloseServiceMenu}>
                    <a className="lt-nav__dd-item" onClick={() => navigate(path.consult)}>Mua xe cũ</a>
                    <a className="lt-nav__dd-item" onClick={() => navigate(path.consult)}>Bảo dưỡng xe máy</a>
                    <a className="lt-nav__dd-item" onClick={() => navigate(path.consult)}>Tư vấn chọn mua xe</a>
                  </div>
                </div>
              </nav>

              {/* Action icons */}
              <div className="lt-navbar__actions">
                <button className="lt-navbar-icon-btn" onClick={() => setSearchOpen(true)} title="Tìm kiếm">
                  <svg width={18} height={18} fill="#333" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
                </button>
                <button className="lt-navbar-icon-btn" onClick={handleUser} title="Tài khoản">
                  <svg width={18} height={18} fill="#333" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>
                </button>
                <button className="lt-navbar-icon-btn lt-cart-btn" onClick={() => navigate(path.cart)} title="Giỏ hàng">
                  <svg width={18} height={18} fill="#333" viewBox="0 0 576 512"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/></svg>
                  {cartItem.length > 0 && <span className="lt-cart-badge">{cartItem.length}</span>}
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ===== MOBILE HEADER ===== */}
      <header className="lt-header-mobile">
        <button className="lt-mobile-btn" onClick={() => setShowMenu(true)}>
          <svg width={22} height={22} fill="#333" viewBox="0 0 448 512"><path d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"/></svg>
        </button>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={Images.logo} alt="LTMoto" style={{ height: 40 }} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="lt-mobile-btn" onClick={() => setSearchOpen(true)}>
            <svg width={18} height={18} fill="#333" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
          </button>
          <button className="lt-mobile-btn lt-cart-btn" onClick={() => navigate(path.cart)}>
            <svg width={18} height={18} fill="#333" viewBox="0 0 576 512"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/></svg>
            {cartItem.length > 0 && <span className="lt-cart-badge">{cartItem.length}</span>}
          </button>
        </div>
      </header>

      {/* ===== MOBILE DRAWER ===== */}
      <div className={`lt-drawer${showMenu ? ' open' : ''}`}>
        <div className="lt-drawer__panel">
          <div className="lt-drawer__head"><span>Menu</span><button onClick={() => setShowMenu(false)}><svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><line x1={18} y1={6} x2={6} y2={18}/><line x1={6} y1={6} x2={18} y2={18}/></svg></button></div>
          <ul className="lt-drawer__list">
            <li onClick={() => navigate(path.home)}><a>Trang chủ</a></li>
            <li onClick={() => navigate(path.product)}><a>Xe máy</a></li>
            {category.map((item, i) => (<li key={i} className="sub" onClick={() => navigate(path.product, { state: { categoryId: item.id } })}><a>— {item.title}</a></li>))}
            <li onClick={() => navigate(path.consult)}><a>Tư vấn mua – Bán xe</a></li>
            <li onClick={() => navigate('#')}><a>Mua xe trả góp</a></li>
            <li onClick={() => navigate(path.consult)}><a>Đặt lịch hẹn</a></li>
            <li onClick={() => navigate(path.article)}><a>Tin tức</a></li>
            <li onClick={() => navigate(path.contact)}><a>Hệ thống cửa hàng</a></li>
            <li onClick={() => navigate(path.contact)}><a>Liên hệ</a></li>
          </ul>
        </div>
        <div className="lt-drawer__overlay" onClick={() => setShowMenu(false)} />
      </div>

      {/* ===== SEARCH OVERLAY ===== */}
      {searchOpen && (
        <div className="lt-search-overlay">
          <div className="lt-search-box">
            <input type="text" placeholder="Tìm kiếm sản phẩm..." value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} autoFocus className="lt-search-input" />
            <button onClick={handleSearch} className="lt-search-submit"><svg width={18} height={18} fill="#fff" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg></button>
            <button onClick={() => setSearchOpen(false)} className="lt-search-close">✕</button>
          </div>
          <div className="lt-search-overlay__bg" onClick={() => setSearchOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
