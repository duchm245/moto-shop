import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Api from '~/api/apis';
import { toast } from 'react-toastify';
import Images from '~/assets';
import { REQUEST_API } from '~/constants/method';
import { RootState } from '~/redux/reducers';
import { User } from '~/types/user.type';
import { useNavigate } from 'react-router-dom';
import path from '~/constants/path';
import SpinLoading from '~/components/loading/spinLoading';
import Pagination from '~/components/paginationItems';

interface Params {
  keyword: string;
  pageNo: number;
  sortBy: string;
  sortDirection: string;
  status?: number | undefined;
}

/* ─── Modal đặt lại mật khẩu ─── */
interface ResetModalProps {
  username: string;
  onClose: () => void;
  onConfirm: (newPass: string, cfPass: string) => Promise<void>;
  loading: boolean;
}
const ResetPasswordModal: React.FC<ResetModalProps> = ({ username, onClose, onConfirm, loading }) => {
  const [newPass, setNewPass] = useState('');
  const [cfPass, setCfPass] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const mismatch = cfPass.length > 0 && newPass !== cfPass;
  const inp: React.CSSProperties = {
    width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '7px',
    paddingLeft: '12px', paddingRight: '38px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  };
  return (
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: '14px', padding: '28px 24px', width: '100%',
          maxWidth: '400px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>🔑 Đặt lại mật khẩu</h2>
            <p style={{ fontSize: '13px', color: '#777', margin: '3px 0 0' }}>Tài khoản: <strong>{username}</strong></p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#999', lineHeight: 1 }}>×</button>
        </div>
        {/* Mật khẩu mới */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '5px' }}>Mật khẩu mới <span style={{ color: 'red' }}>*</span></label>
          <div style={{ position: 'relative' }}>
            <input type={showNew ? 'text' : 'password'} value={newPass}
              onChange={(e) => setNewPass(e.target.value)} placeholder="Ít nhất 6 ký tự" style={inp} />
            <span onClick={() => setShowNew(!showNew)}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '16px' }}>
              {showNew ? '🙈' : '👁️'}
            </span>
          </div>
        </div>
        {/* Xác nhận */}
        <div style={{ marginBottom: '6px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '5px' }}>Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span></label>
          <div style={{ position: 'relative' }}>
            <input type={showCf ? 'text' : 'password'} value={cfPass}
              onChange={(e) => setCfPass(e.target.value)} placeholder="Nhập lại mật khẩu mới"
              style={{ ...inp, borderColor: mismatch ? '#e53935' : '#ddd' }} />
            <span onClick={() => setShowCf(!showCf)}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '16px' }}>
              {showCf ? '🙈' : '👁️'}
            </span>
          </div>
          {mismatch && <p style={{ color: '#e53935', fontSize: '12px', margin: '4px 0 0' }}>Mật khẩu xác nhận chưa khớp</p>}
        </div>
        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={onClose}
            style={{ flex: 1, height: '40px', background: '#f0f0f0', border: 'none', borderRadius: '7px',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer', color: '#444' }}>
            Hủy
          </button>
          <button onClick={() => onConfirm(newPass, cfPass)} disabled={loading || mismatch}
            style={{ flex: 1, height: '40px', background: loading || mismatch ? '#aaa' : '#e53935',
              border: 'none', borderRadius: '7px', fontSize: '14px', fontWeight: 700, color: '#fff',
              cursor: loading || mismatch ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Đang xử lý...' : 'Xác nhận'}
          </button>
        </div>
      </div>
    </div>
  );
};
const Account = () => {
  const token = useSelector((state: RootState) => state.ReducerAuth.token);
  const user = useSelector((state: RootState) => state.ReducerAuth.user);
  const [page, setPage] = React.useState(1);
  const [keyword, setKeyword] = React.useState('');
  const [status, setStatus] = React.useState<number>(-1);
  const [sortBy, setSortBy] = React.useState('id');
  const [totalPage, setTotalPage] = React.useState(1);
  const [sortDirection, setSortDirection] = React.useState();
  const [loadding, setLoading] = React.useState(false);
  const [showFilter, setShowFilter] = React.useState(false);
  const [chooseFilter, setChooseFilter] = React.useState(null);
  const showFilterRef = React.useRef(null);
  // Reset password modal state
  const [resetTarget, setResetTarget] = useState<User | null>(null);
  const [resetLoading, setResetLoading] = useState(false);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (showFilterRef.current && !showFilterRef.current.contains(event.target)) {
        // Nếu sự kiện click xảy ra bên ngoài div, đóng dropdown
        setShowFilter(false);
      }
    }
    // Đăng ký sự kiện click trên document
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Hủy đăng ký sự kiện khi component unmount
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const filterOptions = [
    { id: -1, title: 'Tất Cả' },
    { id: 1, title: 'Hoạt Động' },
    { id: 0, title: 'Đã Khóa' },
  ];
  const handleChooseFilter = (item) => {
    setStatus(item.id);
    setChooseFilter(item.id);
    setShowFilter(false);
  };
  const navigate = useNavigate();
  const [listUser, setListUser] = React.useState<User[]>([]);

  const getListUser = async () => {
    if (!!token) {
      try {
        setLoading(true);
        const params: Params = {
          keyword: keyword,
          pageNo: page,
          sortBy: sortBy,
          sortDirection: sortDirection || 'asc',
        };
        if (status !== -1) {
          params.status = status;
        }
        const url = Api.getListUser(params);
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'get',
            token: token,
          }),
        ]);
        if (res.status) {
          setLoading(false);
          const newData = res.data.data.map((item) => {
            return {
              ...item,
            };
          });
          setListUser(newData);
          const totalPages = Math.ceil(res.data.total / res.data.perPage);
          setTotalPage(totalPages);
          setPage(res.data.currentPage);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  React.useEffect(() => {
    getListUser();
  }, []);

  const handlePageClick = (page) => {
    setPage(page);
  };
  React.useEffect(() => {
    getListUser();
  }, [page, status, sortBy, sortDirection]);
  const hideUser = async (userId: number) => {
    if (!!token) {
      try {
        const url = Api.hideUser(userId, user.id);
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'post',
            token: token,
          }),
        ]);
        if (res.status) {
          getListUser();
          toast.success(`${res.data}`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const showUser = async (userId: number) => {
    if (!!token) {
      try {
        const url = Api.showUser(userId, user.id);
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'post',
            token: token,
          }),
        ]);
        if (res.status) {
          getListUser();
          toast.success(`${res.data}`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /* ── Đặt lại mật khẩu ── */
  const handleResetPassword = async (newPass: string, cfPass: string) => {
    if (!newPass.trim() || newPass.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự', { position: 'top-right', theme: 'dark' }); return;
    }
    if (newPass !== cfPass) {
      toast.error('Mật khẩu xác nhận không khớp', { position: 'top-right', theme: 'dark' }); return;
    }
    if (!!token && resetTarget) {
      try {
        setResetLoading(true);
        const [res] = await Promise.all([
          REQUEST_API({
            url: Api.resetPassword(resetTarget.id, user.id),
            method: 'put', token,
            data: { newPassword: newPass, cfNewPassword: cfPass },
          }),
        ]);
        if (res.status) {
          toast.success('Đặt lại mật khẩu thành công!', { position: 'top-right', theme: 'dark' });
          setResetTarget(null);
        } else {
          toast.error(res.data || 'Thất bại', { position: 'top-right', theme: 'dark' });
        }
      } catch (e) {
        toast.error('Đã xảy ra lỗi', { position: 'top-right', theme: 'dark' });
      } finally {
        setResetLoading(false);
      }
    }
  };

  return (
    <div className="">
      {/* Modal đặt lại mật khẩu */}
      {resetTarget && (
        <ResetPasswordModal
          username={resetTarget.username}
          onClose={() => setResetTarget(null)}
          onConfirm={handleResetPassword}
          loading={resetLoading}
        />
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-base font-bold">Tài khoản</span>
          <div className="flex ml-5 items-center justify-center">
            <input
              className="h-10 border-black rounded-lg pl-3"
              placeholder="Nhập tên tài khoản ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <i
              className="bx bx-search text-2xl text-blue ml-3 cursor-pointer"
              onClick={() => {
                getListUser(), setKeyword('');
              }}
            ></i>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-10 h-10 rounded-md mr-2 relative bg-blue flex items-center justify-center">
            <i
              ref={showFilterRef}
              className="bx bx-filter text-white text-4xl cursor-pointer"
              onClick={() => setShowFilter(!showFilter)}
            ></i>
            {showFilter && (
              <ul className="absolute top-[70%] right-0 translate-y-4 transition-transform px-2 w-40 bg-blue rounded-md flex flex-col items-center justify-center">
                {filterOptions.map((option, i) => (
                  <React.Fragment key={i}>
                    <li
                      className={`py-2 cursor-pointer w-full text-center ${
                        chooseFilter === option.id ? 'text-black font-semibold' : 'text-white'
                      }`}
                      onClick={() => handleChooseFilter(option)}
                    >
                      {option.title}
                    </li>
                    {option.id !== filterOptions[filterOptions.length - 1].id && (
                      <div className="w-full bg-white h-[1px]"></div>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            )}
          </div>
          <div
            className="w-auto px-2 py-1 cursor-pointer flex justify-center items-center bg-blue rounded-md"
            onClick={() => navigate(path.addEmp)}
          >
            <i className="bx bxs-user-plus text-2xl text-white"></i>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-black mt-5"></div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr className="border-black border-b-[1px]">
              <th
                className="flex items-center w-[50%]"
                onClick={() => {
                  setSortBy('username'), setSortDirection(!sortDirection);
                }}
              >
                Tài khoản <i className="bx bx-sort text-blue text-xl"></i>
              </th>
              <th>Điện thoại</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>ROLE</th>
              <th className="text-center">Hành động</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!!listUser &&
              !!listUser.length &&
              listUser.map((item, i) => {
                return (
                  <tr key={i} className="cursor-pointer border-black border-b-[1px] last:border-none">
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">{item.username}</div>
                          <div className="text-sm opacity-50">
                            {item.lastName} {item.firstName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.createdDate}</td>
                    {item.status === 1 && (
                      <td className="text-green-500">
                        Hoạt động <i className="bx bxs-lock text-xl text-red-500" onClick={() => hideUser(item.id)}></i>
                      </td>
                    )}
                    {item.status === 0 && (
                      <td className="text-red-500">
                        Đã khóa{' '}
                        <i className="bx bxs-lock-open text-xl text-green-500" onClick={() => showUser(item.id)}></i>
                      </td>
                    )}
                    <td>{item.roles[0].name.replace('ROLE_', '')}</td>
                    <td className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <i
                          className="bx bxs-show text-2xl font-semibold text-blue cursor-pointer"
                          title="Xem chi tiết"
                          onClick={() => navigate(path.detailAcc, { state: item.id })}
                        />
                        <i
                          className="bx bxs-pencil text-2xl font-semibold text-blue cursor-pointer"
                          title="Chỉnh sửa"
                          onClick={() => navigate(path.editAcc, { state: item.id })}
                        />
                        <i
                          className="bx bx-key text-2xl font-semibold text-orange-500 cursor-pointer"
                          title="Đặt lại mật khẩu"
                          onClick={() => setResetTarget(item)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPage={totalPage} handlePageClick={handlePageClick} />
      {loadding && <SpinLoading />}
    </div>
  );
};

export default Account;
