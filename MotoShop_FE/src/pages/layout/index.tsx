import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from '~/components/footer';
import Header from '~/components/header';
import Topbar from '~/components/topbar';
import path from '~/constants/path';
import Login from '../user/login';
import './styles.css';
import Register from '../user/register';
import Home from '../home';
import Profile from '../profile';
import Address from '../profile/address';
import ProductView from '../product';
import CollectionProduct from '../collectionProduct';
import Cart from '../cart';
import DetailProduct from '../detailProduct';
import SearchProduct from '../searchProduct';
import DetailArticle from '../detailArticle';
import DetailOrder from '../profile/detailOrder';
import Contact from '../contact';
import Articles from '../articles';
import ConsultPage from '../consult';
import ComparePage from '../compare';
import CompareTray from '~/components/compareTray';
import AboutPage from '../staticPages/AboutPage';
import FaqPage from '../staticPages/FaqPage';
import ShowroomPage from '../staticPages/ShowroomPage';
import PaymentPolicyPage from '../staticPages/PaymentPolicyPage';
import ShippingPolicyPage from '../staticPages/ShippingPolicyPage';
import ReturnPolicyPage from '../staticPages/ReturnPolicyPage';
import PrivacyPolicyPage from '../staticPages/PrivacyPolicyPage';
import WarrantyPolicyPage from '../staticPages/WarrantyPolicyPage';
import FloatingContact from '~/components/floatingContact/FloatingContact';

const Layout = () => {
  const ScrollToTopOnNavigate = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

      document.body.classList.add('scroll-fade-out');
      scrollToTop();

      setTimeout(() => {
        document.body.classList.remove('scroll-fade-out');
      }, 300);
    }, [pathname]);

    return null;
  };
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollToTopBtn = document.getElementById('scrollToTop');
      if (scrollToTopBtn) {
        if (window.scrollY > 300) {
          scrollToTopBtn.classList.add('show');
        } else {
          scrollToTopBtn.classList.remove('show');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <ScrollToTopOnNavigate />
      <Topbar />
      <Header />
      <div className="mainWrapper--content">
        <Routes>
          <Route path={path.login} element={<Login />} />
          <Route path={path.register} element={<Register />} />
          <Route path={path.home} element={<Home />} />
          <Route path={path.profile} element={<Profile />} />
          <Route path={path.address} element={<Address />} />
          <Route path={path.product} element={<ProductView />} />
          <Route path={path.collectionsProduct} element={<CollectionProduct />} />
          <Route path={path.cart} element={<Cart />} />
          <Route path={path.detailProduct} element={<DetailProduct />} />
          <Route path={path.searchProduct} element={<SearchProduct />} />
          <Route path={path.detailArticle} element={<DetailArticle />} />
          <Route path={path.detailOrder} element={<DetailOrder />} />
          <Route path={path.contact} element={<Contact />} />
          <Route path={path.article} element={<Articles />} />
          <Route path={path.consult} element={<ConsultPage />} />
          <Route path={path.compare} element={<ComparePage />} />
          {/* Trang tĩnh footer */}
          <Route path={path.about} element={<AboutPage />} />
          <Route path={path.faq} element={<FaqPage />} />
          <Route path={path.showroom} element={<ShowroomPage />} />
          <Route path={path.news} element={<Articles />} />
          <Route path={path.paymentPolicy} element={<PaymentPolicyPage />} />
          <Route path={path.shippingPolicy} element={<ShippingPolicyPage />} />
          <Route path={path.returnPolicy} element={<ReturnPolicyPage />} />
          <Route path={path.privacyPolicy} element={<PrivacyPolicyPage />} />
          <Route path={path.warrantyPolicy} element={<WarrantyPolicyPage />} />
        </Routes>
      </div>
      <Footer />
      <CompareTray />
      <FloatingContact />
      <div className="back-to-top" id="scrollToTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={22} height={22}>
          <path d="M12 4l-8 8h5v8h6v-8h5z" />
        </svg>
      </div>
    </>
  );
};

export default Layout;
