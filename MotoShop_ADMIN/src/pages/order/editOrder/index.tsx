import React from 'react';
import { useSelector } from 'react-redux';
import Api from '~/api/apis';
import provinceApi from '~/api/province.apis';
import { REQUEST_API } from '~/constants/method';
import { toast } from 'react-toastify';
import { RootState } from '~/redux/reducers';
import { City, District, Ward } from '~/types/province.type';
import { useLocation, useNavigate } from 'react-router-dom';
import { Order } from '~/types/order.type';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import { formatDate } from '~/constants/formatDate';
import LoadingPage from '~/components/loadingPage';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalCus = ({ isOpen, closeModal, title, content, onClick, shipDate, onChange, status }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="flex flex-col items-center justify-around h-[200px] w-[800px] rounded-lg">
        <h1 className="text-red-500 text-xl font-bold">{title}</h1>
        <p className="text-base text-black">{content}</p>
        {status === 3 && (
          <div className="flex items-center justify-center py-3">
            <span>Chọn ngày giao hàng</span>
            <DatePicker
              selected={shipDate}
              onChange={onChange}
              timeInputLabel="Time:"
              dateFormat="dd/MM/yyyy h:mm:ss aa"
              showTimeInput
              placeholderText="Nhập ngày giao thành công"
              className="rounded-lg h-9 pl-2 border-[#737373] w-[100%] ml-4"
            />
          </div>
        )}
        <div className="flex items-center justify-around w-full mt-5">
          <div
            className="cursor-pointer w-[40%] h-10 rounded-md flex items-center justify-center bg-blue"
            onClick={onClick}
          >
            <span className="text-base text-white font-semibold">Xác nhận</span>
          </div>
          <div
            className="cursor-pointer w-[30%] h-10 rounded-md bg-red-500 flex items-center justify-center"
            onClick={closeModal}
          >
            <span className="text-base text-white font-semibold">Hủy</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const EditOrder = () => {
  const token = useSelector((state: RootState) => state.ReducerAuth.token);
  const user = useSelector((state: RootState) => state.ReducerAuth.user);
  const location = useLocation();
  const id = location.state;
  const navigate = useNavigate();

  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [note, setNote] = React.useState('');
  const [addressDetail, setAddressDetail] = React.useState('');
  const [cities, setCities] = React.useState<City[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [cityId, setCityId] = React.useState('');
  const [districtId, setDistrictId] = React.useState('');
  const [wardId, setWardId] = React.useState('');

  const [order, setOrder] = React.useState<Order>();
  
  // Modal states
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [shipDate, setShipDate] = React.useState(new Date());
  const [isLoading, setIsLoading] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const openModal2 = () => setIsOpen2(true);
  const closeModal = () => {
    setIsOpen(false);
    setIsOpen2(false);
  };

  const getCities = async () => {
    try {
      const res = await provinceApi.cityApi();
      if (res.status === 200) {
        setCities(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getDistricts = async () => {
    try {
      const res = await provinceApi.districtApi(cityId);
      if (res.status === 200) {
        setDistricts(res.data.districts);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getWards = async () => {
    try {
      const res = await provinceApi.wardApi(districtId);
      if (res.status === 200) {
        setWards(res.data.wards);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getCities();
  }, []);

  const handleCity = (e) => {
    const city = e.target.value;
    if (city === 'Chọn tỉnh / thành') {
      setCityId('');
      setDistrictId('');
      setWardId('');
      setWards([]);
      setDistricts([]);
    } else {
      setCityId(city);
      setDistrictId('');
      setWardId('');
      setWards([]);
    }
  };
  const handleDistrict = (e) => {
    const district = e.target.value;
    if (district === 'Chọn quận / huyện') {
      setDistrictId('');
      setWardId('');
      setWards([]);
    } else {
      setDistrictId(district);
      setWardId('');
    }
  };
  const handleWard = (e) => {
    const ward = e.target.value;
    if (ward === 'Chọn phường / xã') {
      setWardId('');
    } else {
      setWardId(ward);
    }
  };

  React.useEffect(() => {
    if (cityId) getDistricts();
  }, [cityId]);
  React.useEffect(() => {
    if (districtId) getWards();
  }, [districtId]);

  const getOrder = async () => {
    if (!!token) {
      try {
        const url = Api.getOrder(id);
        const [res] = await Promise.all([
          REQUEST_API({ url: url, method: 'get', token: token }),
        ]);
        if (res.status) {
          setOrder(res.data);
        } else {
          toast.error(`${res.data}`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    getOrder();
  }, []);

  React.useEffect(() => {
    if (!!order) {
      setFullName(order.fullName);
      setPhone(order.phone);
      setNote(order.note || '');
      setAddressDetail(order.addressDetail);
      setWardId(order.wards);
      setDistrictId(order.district);
      setCityId(order.province);
    }
  }, [order]);

  const updateOrder = async () => {
    if (!!token) {
      try {
        const phoneNumberRegex = /^0[0-9]{9}$/;
        if (!fullName || !phone || !addressDetail || !cityId || !districtId || !wardId) {
          toast.error(`Vui lòng điền đầy đủ thông tin`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
          return;
        }
        if (isNaN(Number(phone)) || !phoneNumberRegex.test(phone)) {
          toast.error('Số điện thoại không hợp lệ', {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
          return;
        }
        const data = {
          orderId: id,
          userNameEmp: order?.userNameEmp,
          fullName: fullName,
          phone: phone,
          note: note,
          addressDetail: addressDetail,
          province: cityId,
          district: districtId,
          wards: wardId,
        };
        const url = Api.upadteOrder();
        const [res] = await Promise.all([
          REQUEST_API({ url: url, method: 'post', token: token, data: data }),
        ]);
        if (res.status) {
          toast.success(`${res.data}`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
          navigate(-1);
        } else {
          toast.error(`${res.data}`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Status Handlers
  const handleConfirm = async () => {
    if (!!token) {
      try {
        const data = { orderId: id, userNameEmp: user.username };
        const url = Api.confirmOrder();
        const [res] = await Promise.all([
          REQUEST_API({ url: url, method: 'post', token: token, data: data }),
        ]);
        if (res.status) {
          getOrder();
          setIsOpen(false);
          toast.success(`Đơn hàng đã được xác nhận`, { pauseOnHover: false, theme: 'dark' });
        } else {
          toast.error(`${res.data}`, { pauseOnHover: false, theme: 'dark' });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleShipping = async () => {
    if (!!token) {
      try {
        setIsLoading(true);
        const data = { orderId: id, userNameEmp: user.username };
        const url = Api.shippingOrder();
        const [res] = await Promise.all([
          REQUEST_API({ url: url, method: 'post', token: token, data: data }),
        ]);
        if (res.status) {
          getOrder();
          setIsOpen(false);
          toast.success(`Đơn hàng đã được chuẩn bị giao đi`, { pauseOnHover: false, theme: 'dark' });
        } else {
          toast.error(`${res.data}`, { pauseOnHover: false, theme: 'dark' });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSuccess = async () => {
    if (!!token) {
      try {
        if (!shipDate) {
          toast.success(`Hãy chọn ngày giao thành công`, { pauseOnHover: false, theme: 'dark' });
          return;
        }
        setIsLoading(true);
        const data = { orderId: id, userNameEmp: user.username, shipDate: formatDate(shipDate) };
        const url = Api.successOrder();
        const [res] = await Promise.all([
          REQUEST_API({ url: url, method: 'post', token: token, data: data }),
        ]);
        if (res.status) {
          getOrder();
          setIsOpen(false);
          toast.success(`Đơn hàng đã được xác nhận giao thành công`, { pauseOnHover: false, theme: 'dark' });
        } else {
          toast.error(`${res.data}`, { pauseOnHover: false, theme: 'dark' });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = async () => {
    if (!!token) {
      try {
        const data = { orderId: id, userNameEmp: user.username };
        const url = Api.cancelOrder();
        const [res] = await Promise.all([
          REQUEST_API({ url: url, method: 'post', token: token, data: data }),
        ]);
        if (res.status) {
          getOrder();
          setIsOpen(false);
          toast.success(`Đơn hàng đã được xác nhận giao không thành công`, { pauseOnHover: false, theme: 'dark' });
        } else {
          toast.error(`${res.data}`, { pauseOnHover: false, theme: 'dark' });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAction = async () => {
    try {
      setIsLoading(true);
      if (order?.status === 1) await handleConfirm();
      else if (order?.status === 2) await handleShipping();
      else if (order?.status === 3) await handleSuccess();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className="flex gap-10 justify-normal items-start">
        {/* Cột 1: Cập nhật thông tin khách hàng */}
        <div className="flex flex-col border rounded-md p-5 w-[60%]">
          <span className="text-lg font-semibold text-blue">Cập nhật thông tin giao hàng</span>
          <div className="w-full h-[1px] bg-black my-2"></div>
          <div className="flex flex-col pt-5">
            <span className="text-base text-black font-bold">Họ và tên người nhận: </span>
            <input
              value={fullName}
              placeholder="Họ và tên người nhận"
              className="border-[2px] rounded-md pl-3 border-black h-10 mt-1"
              onChange={(e) => setFullName(e.target.value)}
              disabled={order?.status === 3}
            />
          </div>
          <div className="flex flex-col pt-5">
            <span className="text-base text-black font-bold">Số điện thoại: </span>
            <input
              value={phone}
              placeholder="Số điện thoại người nhận"
              className="border-[2px] rounded-md pl-3 border-black h-10 mt-1"
              onChange={(e) => setPhone(e.target.value)}
              disabled={order?.status === 3}
            />
          </div>
          <div className="flex flex-col pt-5">
            <span className="text-base text-black font-bold">Note: </span>
            <input
              value={note}
              placeholder="Note"
              className="border-[2px] rounded-md pl-3 border-black h-10 mt-1"
              onChange={(e) => setNote(e.target.value)}
              disabled={order?.status === 3}
            />
          </div>
          <div className="flex flex-col pt-5">
            <span className="text-base text-black font-bold">Chi tiết địa chỉ: </span>
            <input
              value={addressDetail}
              placeholder="Địa chỉ chi tiết"
              className="border-[2px] rounded-md pl-3 border-black h-10 mt-1"
              onChange={(e) => setAddressDetail(e.target.value)}
              disabled={order?.status === 3}
            />
          </div>
          <div className="flex flex-col pt-5">
            <span className="text-base text-black font-bold">Tỉnh / Thành: </span>
            <select
              className="appearance-none border-[2px] rounded-md pl-3 border-black h-10 mt-1"
              onChange={handleCity}
              value={cityId}
              disabled={order?.status === 3}
            >
              <option>Chọn tỉnh / thành</option>
              {!!cities &&
                !!cities.length &&
                cities.map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col pt-5">
            <span className="text-base text-black font-bold">Quận / Huyện: </span>
            <select
              className="appearance-none border-[2px] rounded-md pl-3 border-black h-10 mt-1"
              onChange={handleDistrict}
              value={districtId}
              disabled={order?.status === 3}
            >
              <option>Chọn quận / huyện</option>
              {!!districts &&
                !!districts.length &&
                districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col pt-5">
            <span className="text-base text-black font-bold">Phường / Xã: </span>
            <select
              className="appearance-none border-[2px] rounded-md pl-3 border-black h-10 mt-1"
              onChange={handleWard}
              value={wardId}
              disabled={order?.status === 3}
            >
              <option>Chọn phường / xã</option>
              {!!wards &&
                !!wards.length &&
                wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
            </select>
          </div>
          
          <div className="flex mt-8 gap-4 justify-end">
            <button
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition"
              onClick={() => navigate(-1)}
            >
              Quay lại
            </button>
            <button
              className="px-6 py-2 bg-blue text-white font-semibold rounded-md hover:opacity-90 transition disabled:opacity-50"
              onClick={updateOrder}
              disabled={order?.status === 3}
            >
              Cập nhật thông tin
            </button>
          </div>
        </div>

        {/* Cột 2: Cập nhật trạng thái đơn hàng */}
        <div className="flex flex-col border rounded-md p-5 w-[40%] bg-gray-50">
          <span className="text-lg font-semibold text-blue">Thay đổi trạng thái</span>
          <div className="w-full h-[1px] bg-black my-2"></div>
          
          <div className="py-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-base text-black font-bold">Trạng thái hiện tại:</span>
              {order?.status === 1 && <span className="text-base font-bold text-orange-500">Chờ xác nhận</span>}
              {order?.status === 2 && <span className="text-base font-bold text-green-500">Đã xác nhận</span>}
              {order?.status === 3 && <span className="text-base font-bold text-cyan-500">Đang giao</span>}
              {order?.status === 4 && <span className="text-base font-bold text-blue">Đã giao</span>}
              {order?.status === 0 && <span className="text-base font-bold text-red-500">Đã hủy</span>}
              {order?.status === 5 && <span className="text-base font-bold text-red-500">Khách không nhận</span>}
            </div>

            <div className="flex flex-col gap-3">
              {/* Action Buttons */}
              {order?.status === 1 && (
                <button
                  className="w-full py-3 bg-blue text-white font-bold rounded-md hover:opacity-90 transition shadow-sm text-lg"
                  onClick={openModal}
                >
                  Xác nhận đơn hàng
                </button>
              )}
              {order?.status === 2 && (
                <button
                  className="w-full py-3 bg-cyan-500 text-white font-bold rounded-md hover:opacity-90 transition shadow-sm text-lg"
                  onClick={openModal}
                >
                  Bắt đầu giao hàng
                </button>
              )}
              {order?.status === 3 && (
                <button
                  className="w-full py-3 bg-green-500 text-white font-bold rounded-md hover:opacity-90 transition shadow-sm text-lg"
                  onClick={openModal}
                >
                  Xác nhận đã giao
                </button>
              )}

              <div className="h-[1px] bg-gray-200 my-2"></div>

              {/* Cancel Buttons */}
              {(order?.status === 1 || order?.status === 2) && order?.isCheckout === false && (
                <button
                  className="w-full py-2.5 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition shadow-sm"
                  onClick={openModal2}
                >
                  Hủy đơn hàng
                </button>
              )}
              {order?.status === 3 && order?.isCheckout === false && (
                <button
                  className="w-full py-2.5 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition shadow-sm"
                  onClick={openModal2}
                >
                  Báo khách không nhận hàng
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ModalCus
        status={order?.status}
        shipDate={shipDate}
        onChange={(date) => setShipDate(date)}
        isOpen={isOpen}
        title={
          order?.status === 1 ? 'Xác nhận đơn hàng'
            : order?.status === 2 ? 'Vận chuyển đơn hàng'
            : order?.status === 3 ? 'Đơn hàng giao thành công'
            : ''
        }
        content={
          order?.status === 1 ? 'Bạn có chắc chắn xác nhận đơn hàng này?'
            : order?.status === 2 ? 'Bạn có chắc chắn bắt đầu giao đơn hàng này?'
            : order?.status === 3 ? 'Bạn có chắc chắn đơn hàng này giao thành công? Vui lòng chọn ngày giao'
            : ''
        }
        closeModal={closeModal}
        onClick={handleAction}
      />
      <ModalCus
        status={-1}
        shipDate={null}
        onChange={() => {}}
        isOpen={isOpen2}
        title={'Hủy đơn hàng'}
        content={'Bạn có chắc chắn hủy / báo không nhận đơn hàng này?'}
        closeModal={closeModal}
        onClick={handleCancel}
      />
    </>
  );
};

export default EditOrder;
