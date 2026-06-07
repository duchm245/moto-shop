import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '~/redux/reducers';
import userApi from '~/apis/user.apis';
import Types from '~/redux/types';
import path from '~/constants/path';
import LeftPage from '../component/leftPage';
import '../styles.css';

const ChangePassword = () => {
  const user = useSelector((state: RootState) => state.AuthReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [cfPass, setCfPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCf, setShowCf] = useState(false);

  const handleSubmit = async () => {
    if (!oldPass.trim()) {
      toast.error('Vui lòng nhập mật khẩu cũ', { position: 'top-right', theme: 'dark' });
      return;
    }
    if (newPass.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự', { position: 'top-right', theme: 'dark' });
      return;
    }
    if (newPass !== cfPass) {
      toast.error('Mật khẩu xác nhận không khớp', { position: 'top-right', theme: 'dark' });
      return;
    }

    try {
      setLoading(true);
      const res = await userApi.changePassword(user.id, {
        oldPassword: oldPass,
        newPassword: newPass,
        cfNewPassword: cfPass,
      });

      if (res.data.status) {
        toast.success(`${res.data.data}. Vui lòng đăng nhập lại!`, {
          position: 'top-right',
          theme: 'dark',
        });
        // Đăng xuất sau khi đổi mật khẩu thành công
        localStorage.setItem('user', null);
        localStorage.setItem('token', '');
        dispatch({ type: Types.LOGOUT });
        navigate(path.login);
      } else {
        toast.error(`${res.data.data}`, { position: 'top-right', theme: 'dark' });
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi, vui lòng thử lại', { position: 'top-right', theme: 'dark' });
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ show, onToggle }: { show: boolean; onToggle: () => void }) => (
    <span
      onClick={onToggle}
      style={{
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#888',
        fontSize: '18px',
        userSelect: 'none',
      }}
    >
      {show ? '🙈' : '👁️'}
    </span>
  );

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '44px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    paddingLeft: '14px',
    paddingRight: '42px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div className="layout-account">
      <div className="container">
        <div className="wrapbox-content-account">
          <div className="header-page clearfix">
            <h1>Tài khoản của bạn</h1>
          </div>
          <div className="row">
            <LeftPage />
            <div className="col-lg-9 col-md-12 col-12">
              <div
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  padding: '32px',
                  maxWidth: '540px',
                  margin: '0 auto',
                }}
              >
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: '#222' }}>
                  Đổi mật khẩu
                </h2>

                {/* Mật khẩu cũ */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#444' }}>
                    Mật khẩu hiện tại
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showOld ? 'text' : 'password'}
                      style={inputStyle}
                      placeholder="Nhập mật khẩu hiện tại"
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                    />
                    <EyeIcon show={showOld} onToggle={() => setShowOld(!showOld)} />
                  </div>
                </div>

                {/* Mật khẩu mới */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#444' }}>
                    Mật khẩu mới
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNew ? 'text' : 'password'}
                      style={inputStyle}
                      placeholder="Ít nhất 6 ký tự"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                    <EyeIcon show={showNew} onToggle={() => setShowNew(!showNew)} />
                  </div>
                </div>

                {/* Xác nhận mật khẩu mới */}
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#444' }}>
                    Xác nhận mật khẩu mới
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showCf ? 'text' : 'password'}
                      style={{
                        ...inputStyle,
                        borderColor: cfPass && cfPass !== newPass ? '#e53935' : '#ddd',
                      }}
                      placeholder="Nhập lại mật khẩu mới"
                      value={cfPass}
                      onChange={(e) => setCfPass(e.target.value)}
                    />
                    <EyeIcon show={showCf} onToggle={() => setShowCf(!showCf)} />
                  </div>
                  {cfPass && cfPass !== newPass && (
                    <p style={{ color: '#e53935', fontSize: '13px', marginTop: '4px' }}>
                      Mật khẩu xác nhận chưa khớp
                    </p>
                  )}
                </div>

                {/* Nút */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    marginTop: '24px',
                    width: '100%',
                    height: '46px',
                    backgroundColor: loading ? '#aaa' : '#d32f2f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
