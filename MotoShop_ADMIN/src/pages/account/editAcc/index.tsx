import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '~/api/apis';
import { REQUEST_API } from '~/constants/method';
import path from '~/constants/path';
import { RootState } from '~/redux/reducers';
import { User } from '~/types/user.type';
import { toast } from 'react-toastify';

/* ─────────────── Modal đặt lại mật khẩu ─────────────── */
interface ResetPasswordModalProps {
  onClose: () => void;
  onConfirm: (newPass: string, cfPass: string) => Promise<void>;
  loading: boolean;
  targetUsername: string;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  onClose,
  onConfirm,
  loading,
  targetUsername,
}) => {
  const [newPass, setNewPass] = useState('');
  const [cfPass, setCfPass] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showCf, setShowCf] = useState(false);

  const mismatch = cfPass.length > 0 && newPass !== cfPass;

  return (
    /* Backdrop */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        style={{
          background: '#fff',
          borderRadius: '14px',
          padding: '32px 28px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
              🔑 Đặt lại mật khẩu
            </h2>
            <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0' }}>
              Tài khoản: <strong>{targetUsername}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#888' }}
          >
            ×
          </button>
        </div>

        {/* Mật khẩu mới */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#333' }}>
            Mật khẩu mới <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showNew ? 'text' : 'password'}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Ít nhất 6 ký tự"
              style={{
                width: '100%',
                height: '42px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                paddingLeft: '12px',
                paddingRight: '40px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <span
              onClick={() => setShowNew(!showNew)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888' }}
            >
              {showNew ? '🙈' : '👁️'}
            </span>
          </div>
        </div>

        {/* Xác nhận mật khẩu */}
        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#333' }}>
            Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showCf ? 'text' : 'password'}
              value={cfPass}
              onChange={(e) => setCfPass(e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
              style={{
                width: '100%',
                height: '42px',
                border: `1px solid ${mismatch ? '#e53935' : '#ddd'}`,
                borderRadius: '8px',
                paddingLeft: '12px',
                paddingRight: '40px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <span
              onClick={() => setShowCf(!showCf)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888' }}
            >
              {showCf ? '🙈' : '👁️'}
            </span>
          </div>
          {mismatch && (
            <p style={{ color: '#e53935', fontSize: '12px', marginTop: '4px' }}>Mật khẩu xác nhận chưa khớp</p>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              height: '42px',
              background: '#f0f0f0',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#444',
            }}
          >
            Hủy
          </button>
          <button
            onClick={() => onConfirm(newPass, cfPass)}
            disabled={loading || mismatch}
            style={{
              flex: 1,
              height: '42px',
              background: loading || mismatch ? '#aaa' : '#e53935',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 700,
              color: '#fff',
              cursor: loading || mismatch ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Đang xử lý...' : 'Xác nhận đặt lại'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────── EditAcc (trang chính) ─────────────── */
const EditAcc = () => {
  const token = useSelector((state: RootState) => state.ReducerAuth.token);
  const currentUser = useSelector((state: RootState) => state.ReducerAuth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;

  const [user, setUser] = useState<User>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal reset password
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const viewDetail = async () => {
    if (!!token) {
      try {
        const url = Api.detailAcc(id);
        const [res] = await Promise.all([
          REQUEST_API({ url, method: 'get', token }),
        ]);
        if (res.status) {
          const u: User = res.data;
          setUser(u);
          setFirstName(u.firstName || '');
          setLastName(u.lastName || '');
          setPhone(u.phone || '');
          setEmail(u.email || '');
        } else {
          toast.error('Không thể tải thông tin tài khoản', { position: 'top-right', theme: 'dark' });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    viewDetail();
  }, []);

  /* ── Lưu thông tin ── */
  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error('Vui lòng nhập họ và tên', { position: 'top-right', theme: 'dark' });
      return;
    }
    if (!phone.trim()) {
      toast.error('Vui lòng nhập số điện thoại', { position: 'top-right', theme: 'dark' });
      return;
    }
    if (!!token) {
      try {
        setLoading(true);
        const url = Api.updateUser(id, currentUser?.id);
        const body = { firstName, lastName, phone, email };
        const [res] = await Promise.all([
          REQUEST_API({ url, method: 'put', token, data: body }),
        ]);
        if (res.status) {
          toast.success('Cập nhật tài khoản thành công', { position: 'top-right', theme: 'dark' });
          navigate(path.accounts);
        } else {
          toast.error(res.data || 'Cập nhật thất bại', { position: 'top-right', theme: 'dark' });
        }
      } catch (error) {
        console.error(error);
        toast.error('Đã xảy ra lỗi, vui lòng thử lại', { position: 'top-right', theme: 'dark' });
      } finally {
        setLoading(false);
      }
    }
  };

  /* ── Đặt lại mật khẩu ── */
  const handleResetPassword = async (newPass: string, cfPass: string) => {
    if (!newPass.trim()) {
      toast.error('Vui lòng nhập mật khẩu mới', { position: 'top-right', theme: 'dark' });
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
    if (!!token) {
      try {
        setResetLoading(true);
        const url = Api.resetPassword(id, currentUser?.id);
        const [res] = await Promise.all([
          REQUEST_API({
            url,
            method: 'put',
            token,
            data: { newPassword: newPass, cfNewPassword: cfPass },
          }),
        ]);
        if (res.status) {
          toast.success('Đặt lại mật khẩu thành công!', { position: 'top-right', theme: 'dark' });
          setShowResetModal(false);
        } else {
          toast.error(res.data || 'Thất bại', { position: 'top-right', theme: 'dark' });
        }
      } catch (error) {
        console.error(error);
        toast.error('Đã xảy ra lỗi, vui lòng thử lại', { position: 'top-right', theme: 'dark' });
      } finally {
        setResetLoading(false);
      }
    }
  };

  return (
    <>
      {/* Modal reset password */}
      {showResetModal && (
        <ResetPasswordModal
          onClose={() => setShowResetModal(false)}
          onConfirm={handleResetPassword}
          loading={resetLoading}
          targetUsername={user?.username || ''}
        />
      )}

      <div className="max-w-5xl mx-auto shadow-md border rounded-lg">
        <div className="flex items-center justify-center pt-3">
          <span className="font-bold text-xl uppercase">Chỉnh sửa tài khoản</span>
        </div>
        <div className="p-5">
          {/* Username (readonly) */}
          <div className="flex items-center justify-around mt-3">
            <div className="w-[30%] text-base text-black font-bold">Tài khoản :</div>
            <div className="w-[70%] relative flex items-center text-gray-500">{user?.username}</div>
          </div>

          {/* Họ */}
          <div className="flex items-center justify-around mt-3">
            <div className="w-[30%] text-base text-black font-bold">Họ :</div>
            <div className="w-[70%] relative flex items-center">
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nhập họ"
              />
            </div>
          </div>

          {/* Tên */}
          <div className="flex items-center justify-around mt-3">
            <div className="w-[30%] text-base text-black font-bold">Tên :</div>
            <div className="w-[70%] relative flex items-center">
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nhập tên"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-around mt-3">
            <div className="w-[30%] text-base text-black font-bold">Email :</div>
            <div className="w-[70%] relative flex items-center">
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                type="email"
              />
            </div>
          </div>

          {/* Số điện thoại */}
          <div className="flex items-center justify-around mt-3">
            <div className="w-[30%] text-base text-black font-bold">Số điện thoại :</div>
            <div className="w-[70%] relative flex items-center">
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
                type="tel"
              />
            </div>
          </div>

          {/* Quyền (readonly) */}
          <div className="flex items-center justify-around mt-3">
            <div className="w-[30%] text-base text-black font-bold">Quyền :</div>
            <div className="w-[70%] relative flex items-center text-gray-500">
              {user?.roles?.[0]?.name?.replace('ROLE_', '') || '—'}
            </div>
          </div>

          {/* Trạng thái (readonly) */}
          <div className="flex items-center justify-around mt-3">
            <div className="w-[30%] text-base text-black font-bold">Trạng thái :</div>
            {user?.status === 1 && (
              <div className="w-[70%] relative flex items-center text-green-500">Hoạt động</div>
            )}
            {user?.status === 0 && (
              <div className="w-[70%] relative flex items-center text-red-500">Đã khóa</div>
            )}
          </div>

          {/* ─── Đường kẻ phân cách ─── */}
          <hr className="my-5 border-gray-200" />

          {/* Buttons */}
          <div className="flex items-center justify-between gap-3 mt-2">
            {/* Đặt lại mật khẩu */}
            <div
              className="px-5 py-2 flex justify-center items-center rounded-md h-10 cursor-pointer border border-orange-400 text-orange-500 hover:bg-orange-50 transition-colors"
              onClick={() => setShowResetModal(true)}
            >
              <i className="bx bx-lock-alt mr-1" />
              <span className="font-semibold text-sm">Đặt lại mật khẩu</span>
            </div>

            <div className="flex gap-3">
              <div
                className="px-5 py-2 flex justify-center items-center bg-gray-300 rounded-md h-10 cursor-pointer"
                onClick={() => navigate(path.accounts)}
              >
                <span>Quay lại</span>
              </div>
              <div
                className={`px-5 py-2 flex justify-center items-center bg-blue rounded-md h-10 cursor-pointer ${loading ? 'opacity-60 pointer-events-none' : ''}`}
                onClick={handleSave}
              >
                <span className="text-white">{loading ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAcc;
