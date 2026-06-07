import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/reducers';
import ThemeAction from '~/redux/actions/ThemeAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import path from '~/constants/path';
import './styles.css';

interface ColorSetting { id: string; name: string; bg: string; class: string }

const COLOR_SETTINGS: ColorSetting[] = [
  { id: 'blue',   name: 'Xanh dương', bg: '#2999ff', class: 'theme-color-blue'   },
  { id: 'red',    name: 'Đỏ',         bg: '#e74c3c', class: 'theme-color-red'    },
  { id: 'cyan',   name: 'Xanh ngọc',  bg: '#00b4d8', class: 'theme-color-cyan'   },
  { id: 'green',  name: 'Xanh lá',    bg: '#27ae60', class: 'theme-color-green'  },
  { id: 'orange', name: 'Cam',        bg: '#f39c12', class: 'theme-color-orange' },
];

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user     = useSelector((state: RootState) => state.ReducerAuth.user);

  const [currColor, setCurrColor] = React.useState('blue');

  React.useEffect(() => {
    const savedColor = localStorage.getItem('colorMode') || 'theme-color-blue';
    const colorObj   = COLOR_SETTINGS.find(c => c.class === savedColor) || COLOR_SETTINGS[0];
    setCurrColor(colorObj.id);
  }, []);

  const handleSetColor = (color: ColorSetting) => {
    setCurrColor(color.id);
    localStorage.setItem('colorMode', color.class);
    dispatch(ThemeAction.setColor(color.class));
    toast.success(`Đã đổi màu sang ${color.name}`);
  };

  const activeColor = COLOR_SETTINGS.find(c => c.id === currColor);

  return (
    <div className="settings-page">
      <div className="settings-page__header">
        <h1 className="settings-page__title">
          <i className="bx bx-cog" />
          Cài đặt
        </h1>
        <p className="settings-page__subtitle">Tùy chỉnh màu sắc và xem thông tin hệ thống</p>
      </div>

      <div className="settings-page__grid">

        {/* ── Màu sắc giao diện ── */}
        <div className="settings-card">
          <div className="settings-card__head">
            <i className="bx bx-palette settings-card__icon" style={{ color: activeColor?.bg || '#9b59b6' }} />
            <h2>Màu sắc giao diện</h2>
          </div>

          <p className="settings-section__label">Chọn màu chủ đạo cho toàn bộ Admin</p>

          <div className="settings-color-list">
            {COLOR_SETTINGS.map(c => (
              <button
                key={c.id}
                className={`settings-color-btn${currColor === c.id ? ' active' : ''}`}
                style={{ backgroundColor: c.bg }}
                title={c.name}
                onClick={() => handleSetColor(c)}
              >
                {currColor === c.id && <i className="bx bx-check" />}
              </button>
            ))}
          </div>

          <div className="settings-color-preview">
            <span className="settings-color-preview__label">Màu hiện tại:</span>
            <span
              className="settings-color-preview__chip"
              style={{ backgroundColor: activeColor?.bg }}
            />
            <strong>{activeColor?.name}</strong>
          </div>

          <p className="settings-color-hint">
            💡 Để đổi giữa chế độ Sáng / Tối, nhấn vào biểu tượng 🎨 ở góc trên cùng bên phải.
          </p>
        </div>

        {/* ── Tài khoản ── */}
        <div className="settings-card">
          <div className="settings-card__head">
            <i className="bx bx-user-circle settings-card__icon" style={{ color: '#3498db' }} />
            <h2>Tài khoản của tôi</h2>
          </div>

          <div className="settings-account">
            <div className="settings-account__avatar" style={{ background: `linear-gradient(135deg, ${activeColor?.bg || '#3498db'}, #2c3e50)` }}>
              {(user?.lastName || user?.firstName || user?.username)?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="settings-account__info">
              <p className="settings-account__name">
                {(user?.lastName && user?.firstName)
                  ? `${user.lastName} ${user.firstName}`
                  : user?.lastName || user?.firstName || user?.username || '—'}
              </p>
              <p className="settings-account__email">{user?.email || '—'}</p>
              <span className="settings-account__role">
                {user?.roles?.[0]?.name === 'ROLE_ADMIN' ? '👑 Admin' : '🧑‍💼 Nhân viên'}
              </span>
            </div>
          </div>

          <div className="settings-actions">
            <button
              className="settings-btn settings-btn--primary"
              style={{ background: activeColor?.bg }}
              onClick={() => navigate(path.profile)}
            >
              <i className="bx bx-edit" /> Chỉnh sửa hồ sơ
            </button>
            <button
              className="settings-btn settings-btn--secondary"
              onClick={() => navigate(path.profile, { state: { chooseTab: 2 } })}
            >
              <i className="bx bx-lock-alt" /> Đổi mật khẩu
            </button>
          </div>
        </div>

        {/* ── Thông tin hệ thống ── */}
        <div className="settings-card settings-card--full">
          <div className="settings-card__head">
            <i className="bx bx-info-circle settings-card__icon" style={{ color: '#27ae60' }} />
            <h2>Thông tin hệ thống</h2>
          </div>

          <div className="settings-info-grid">
            <div className="settings-info-item">
              <span className="settings-info-item__label">Tên hệ thống</span>
              <span className="settings-info-item__value">LT Motor Admin</span>
            </div>
            <div className="settings-info-item">
              <span className="settings-info-item__label">Phiên bản</span>
              <span className="settings-info-item__value">v1.0.0</span>
            </div>
            <div className="settings-info-item">
              <span className="settings-info-item__label">Backend</span>
              <span className="settings-info-item__value">
                <span className="settings-info-item__dot settings-info-item__dot--green" />
                Spring Boot 3 · localhost:8081
              </span>
            </div>
            <div className="settings-info-item">
              <span className="settings-info-item__label">Frontend Admin</span>
              <span className="settings-info-item__value">
                <span className="settings-info-item__dot settings-info-item__dot--green" />
                React + Vite · localhost:5174
              </span>
            </div>
            <div className="settings-info-item">
              <span className="settings-info-item__label">Frontend Khách hàng</span>
              <span className="settings-info-item__value">
                <span className="settings-info-item__dot settings-info-item__dot--green" />
                React + Vite · localhost:5173
              </span>
            </div>
            <div className="settings-info-item">
              <span className="settings-info-item__label">Database</span>
              <span className="settings-info-item__value">MySQL 8</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
