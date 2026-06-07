import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '~/api/apis';
import { REQUEST_API } from '~/constants/method';
import path from '~/constants/path';
import { RootState } from '~/redux/reducers';
import { User } from '~/types/user.type';
import { toast } from 'react-toastify';

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

  return (
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

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6">
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
  );
};

export default EditAcc;
