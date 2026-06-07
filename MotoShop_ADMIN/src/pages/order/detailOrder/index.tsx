import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '~/api/apis';
import { REQUEST_API } from '~/constants/method';
import { RootState } from '~/redux/reducers';
import { toast } from 'react-toastify';
import { formatPrice } from '~/constants/utils';
import { Order, OrderItem } from '~/types/order.type';
import { User } from '~/types/user.type';
import provinceApi from '~/api/province.apis';
import { City, District, Ward } from '~/types/province.type';
import LoadingPage from '~/components/loadingPage';

const DetailOrder = () => {
  const location = useLocation();
  const id = location.state;
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.ReducerAuth.token);
  const [order, setOrder] = React.useState<Order>();
  const [user2, setUser2] = React.useState<User>();
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getOrder = async () => {
    if (!!token) {
      try {
        setIsLoading(true);
        const url = Api.getOrder(id);
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'get',
            token: token,
          }),
        ]);
        if (res.status) {
          setOrder(res.data);
          setOrderItems(res.data.items);
        } else {
          toast.error(`${res.data}`, {
            position: 'top-right',
            pauseOnHover: false,
            theme: 'dark',
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const getUser = async () => {
    if (!!token && order?.user) {
      try {
        const url = Api.detailAcc(order?.user);
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'get',
            token: token,
          }),
        ]);
        if (res.status) {
          setUser2(res.data);
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
    if (order != null) {
      getUser();
    }
  }, [order]);

  const totalCost =
    orderItems.reduce((total, item) => {
      const itemCost = item.sellPrice * item.quantity;
      return total + itemCost;
    }, 0) + (order?.shippingFee || 0);

  const [cities, setCities] = React.useState<City[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  
  const getCities = async () => {
    try {
      const res = await provinceApi.cityApi();
      if (res.status === 200) setCities(res.data);
    } catch (error) { console.error(error); }
  };
  const getDistricts = async () => {
    try {
      const res = await provinceApi.districtApi(order?.province);
      if (res.status === 200) setDistricts(res.data.districts);
    } catch (error) { console.error(error); }
  };
  const getWards = async () => {
    try {
      const res = await provinceApi.wardApi(order?.district);
      if (res.status === 200) setWards(res.data.wards);
    } catch (error) { console.error(error); }
  };

  React.useEffect(() => { getCities(); }, []);
  React.useEffect(() => { if (!!order) getDistricts(); }, [order]);
  React.useEffect(() => { if (!!order) getWards(); }, [order]);

  const cityName = cities.find((city) => city.code === parseInt(order?.province || ''));
  const districtName = districts.find((district) => district.code === parseInt(order?.district || ''));
  const wardName = wards.find((ward) => ward.code === parseInt(order?.wards || ''));

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className="flex mt-0">
        <div className="flex flex-col border rounded-md p-5 w-[70%]">
          <span className="text-lg font-semibold text-blue">Thông tin đơn hàng</span>
          <div className="w-full h-[1px] bg-black"></div>
          <div className="flex items-center pt-5">
            <span className="text-base text-black font-bold">Mã đơn hàng: </span>
            <span className="text-base ml-5">{order?.codeOrders}</span>
          </div>
          <div className="flex items-center pt-5">
            <span className="text-base text-black font-bold">Người nhận: </span>
            <span className="text-base ml-5">{order?.fullName}</span>
          </div>
          <div className="flex items-center pt-5">
            <span className="text-base text-black font-bold">Số điện thoại: </span>
            <span className="text-base ml-5">{order?.phone}</span>
          </div>
          <div className="flex pt-5">
            <span className="text-base text-black font-bold w-[20%]">Địa chỉ: </span>
            <span className="text-base ml-5">
              {order?.addressDetail}, {wardName?.name}, {districtName?.name}, {cityName?.name}
            </span>
          </div>
          <div className="flex items-center pt-5">
            <span className="text-base text-black font-bold">Note: </span>
            <span className="text-base ml-5">{order?.note}</span>
          </div>
          <div className="flex items-center pt-5">
            <span className="text-base text-black font-bold">Thanh toán: </span>
            <span className="text-base ml-5">{order?.isCheckout ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
          </div>
          <div className="flex items-center pt-5">
            <span className="text-base text-black font-bold">Phương thức thanh toán: </span>
            <span className="text-base ml-5">{order?.paymentMethod}</span>
          </div>
          <div className="flex items-center pt-5">
            <span className="text-base text-black font-bold">Tài khoản đặt hàng: </span>
            <span className="text-base ml-5">{user2?.username}</span>
          </div>
          <div className="flex items-center pt-5">
            <span className="text-base text-black font-bold">Ngày giao hàng: </span>
            <span className="text-base ml-5">{order?.shipDate ? `${order.shipDate}` : 'Chưa cập nhật'}</span>
          </div>
          <div className="flex items-center pt-5">
            <span className="text-base text-black font-bold">Ngày tạo: </span>
            <span className="text-base ml-5">{order?.createDate}</span>
          </div>
          <div className="flex items-center pt-5">
            <span className="text-base text-black font-bold">Ngày sửa đổi gần nhất: </span>
            <span className="text-base ml-5">{order?.modifiedDate}</span>
          </div>
          <div className="flex items-center pt-5">
            <span className="text-base text-black font-bold">Nhân viên chăm sóc: </span>
            <span className="text-base ml-5">{order?.userNameEmp}</span>
          </div>
          
          <span className="text-lg font-semibold text-blue pt-5">Trạng thái đơn hàng</span>
          <div className="w-full h-[1px] bg-black my-1"></div>
          <div className="flex items-center pt-3">
            {order?.status === 1 && <span className="text-base font-bold text-orange-500">Chờ xác nhận</span>}
            {order?.status === 2 && <span className="text-base font-bold text-green-500">Đã xác nhận</span>}
            {order?.status === 3 && <span className="text-base font-bold text-cyan-500">Đang giao</span>}
            {order?.status === 4 && <span className="text-base font-bold text-blue">Đã giao</span>}
            {order?.status === 0 && <span className="text-base font-bold text-red-500">Đã hủy</span>}
            {order?.status === 5 && <span className="text-base font-bold text-red-500">Khách không nhận hàng</span>}
          </div>
        </div>
        
        <div className="flex flex-col border rounded-md p-5 ml-10 w-full">
          <div className="flex mb-3">
            <span className="text-lg font-semibold text-blue">Danh sách sản phẩm</span>
          </div>
          <div className="w-full h-[1px] bg-black"></div>
          <table className="table w-full">
            <thead>
              <tr>
                <th className="w-[30%] text-center text-black">Tên sản phẩm</th>
                <th className="w-[10%] text-center text-black">Màu</th>
                <th className="w-[10%] text-center text-black">Size</th>
                <th className="w-[15%] text-center text-black">Số lượng</th>
                <th className="w-[15%] text-center text-black">Đơn giá</th>
              </tr>
            </thead>
            <tbody>
              {!!orderItems &&
                !!orderItems.length &&
                orderItems.map((item, i) => {
                  return (
                    <tr key={i} className="cursor-pointer">
                      <td className="text-center">{item.productName}</td>
                      <td className="text-center">{item.valueColor}</td>
                      <td className="text-center">{item.valueSize}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">{formatPrice(item.sellPrice)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="w-full h-[1px] bg-black my-2"></div>
          <div className="flex flex-col self-end">
            <div className="flex items-center">
              <span className="text-base text-black font-bold">Phí ship: </span>
              <span className="text-base ml-5">{formatPrice(order?.shippingFee)}</span>
            </div>
            <div className="flex items-center pt-5">
              <span className="text-base text-black font-bold">Tổng tiền của đơn hàng: </span>
              <span className="text-base ml-5">{formatPrice(totalCost)}</span>
            </div>
          </div>
          <div
            className="flex items-center justify-center bg-blue h-10 rounded-md w-[30%] self-end mt-[60%] cursor-pointer hover:opacity-90 transition"
            onClick={() => navigate(-1)}
          >
            <span className="text-white font-bold">Quay lại</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailOrder;
