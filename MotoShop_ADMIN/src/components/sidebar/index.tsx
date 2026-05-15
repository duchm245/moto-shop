import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import sidebar_items from '../../assets/JsonData/sidebar_routes.json';
import './styles.css';
import Images from '~/assets';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/reducers';

const Sidebar = () => {
  const location = useLocation();
  const themeReducer = useSelector((state: RootState) => state.ThemeReducer);
  const activeItem = sidebar_items.findIndex((item) => item.route === location.pathname);

  const logoImage = themeReducer.mode === 'theme-mode-light' ? Images.logoLight : Images.logoDark;
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <span style={{
          fontFamily: "'Montserrat', 'Inter', sans-serif",
          fontWeight: 800,
          fontSize: '24px',
          letterSpacing: '0.5px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          userSelect: 'none',
        }}>
          <span style={{ color: themeReducer.mode === 'theme-mode-light' ? '#1a1a1a' : '#f0f0f0' }}>LT</span>
          <span style={{ color: '#e74c3c' }}>Motor</span>
        </span>
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem title={item.display_name} icon={item.icon} active={index === activeItem} />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
