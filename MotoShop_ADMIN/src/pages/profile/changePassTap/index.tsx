import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from '~/api/apis';
import { REQUEST_API } from '~/constants/method';
import { RootState } from '~/redux/reducers';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import path from '~/constants/path';
import Types from '~/redux/types';

const ChangePass = () => {
  const token = useSelector((state: RootState) => state.ReducerAuth.token);
  const user = useSelector((state: RootState) => state.ReducerAuth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [cfPass, setCfPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCf, setShowCf] = useState(false);

  const changePass = async () => {
    // Validate phía client
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

    if (!!token) {
      try {
        setLoading(true);
        const data = {
          oldPassword: oldPass,
          newPassword: newPass,
          cfNewPassword: cfPass,
        };
        const url = Api.changePassword(user.id);
        const [res] = await Promise.all([
          REQUEST_API({ url, method: 'put', token, data }),
        ]);
        if (res.status) {
          toast.success(`${res.data}. Vui lòng đăng nhập lại!`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
          localStorage.setItem('user', null);
          localStorage.setItem('token', '');
          dispatch({ type: Types.LOGOUT });
          navigate(path.login);
        } else {
          toast.error(`${res.data}`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        }
      } catch (error) {
        console.error(error);
        toast.error('Đã xảy ra lỗi, vui lòng thử lại', { position: 'top-right', theme: 'dark' });
      } finally {
        setLoading(false);
      }
    }
  };

  const inputClass =
    'w-[70%] rounded-md h-10 pl-3 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400';

  const EyeButton = ({ show, onToggle }: { show: boolean; onToggle: () => void }) => (
    <i
      className={`bx ${show ? 'bx-show' : 'bx-hide'} text-xl text-gray-500 cursor-pointer ml-2`}
      onClick={onToggle}
    />
  );

  return (
    <div className="max-w-5xl mx-auto shadow-md border rounded-lg">
      <div className="flex items-center justify-center pt-3">
        <span className="font-bold text-xl uppercase">Đổi mật khẩu</span>
      </div>
      <div className="p-5">

        {/* Mật khẩu cũ */}
        <div className="flex items-center justify-around mt-4">
          <div className="w-[30%] text-base text-black font-bold">Mật khẩu cũ :</div>
          <div className="w-[70%] flex items-center">
            <input
              type={showOld ? 'text' : 'password'}
              className={inputClass}
              placeholder="Nhập mật khẩu cũ"
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
            />
            <EyeButton show={showOld} onToggle={() => setShowOld(!showOld)} />
          </div>
        </div>

        {/* Mật khẩu mới */}
        <div className="flex items-center justify-around mt-4">
          <div className="w-[30%] text-base text-black font-bold">Mật khẩu mới :</div>
          <div className="w-[70%] flex items-center">
            <input
              type={showNew ? 'text' : 'password'}
              className={inputClass}
              placeholder="Ít nhất 6 ký tự"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <EyeButton show={showNew} onToggle={() => setShowNew(!showNew)} />
          </div>
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className="flex items-center justify-around mt-4">
          <div className="w-[30%] text-base text-black font-bold">Nhập lại mật khẩu :</div>
          <div className="w-[70%] flex items-center">
            <input
              type={showCf ? 'text' : 'password'}
              className={`${inputClass} ${cfPass && cfPass !== newPass ? 'border-red-400' : ''}`}
              placeholder="Nhập lại mật khẩu mới"
              value={cfPass}
              onChange={(e) => setCfPass(e.target.value)}
            />
            <EyeButton show={showCf} onToggle={() => setShowCf(!showCf)} />
          </div>
        </div>

        {/* Gợi ý lỗi realtime */}
        {cfPass && cfPass !== newPass && (
          <div className="flex justify-end pr-[calc(30%+2.5rem)] mt-1">
            <span className="text-xs text-red-500">Mật khẩu xác nhận chưa khớp</span>
          </div>
        )}

        {/* Nút đổi */}
        <div className="flex items-center justify-center mt-6">
          <div
            className={`w-[30%] flex justify-center items-center bg-blue rounded-md h-10 cursor-pointer transition-opacity ${loading ? 'opacity-60 pointer-events-none' : ''}`}
            onClick={changePass}
          >
            <span className="text-base text-white font-bold">
              {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChangePass;
