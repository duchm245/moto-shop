import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '~/components/badge';
import StatusCard from '~/components/statuscard';
import { RootState } from '~/redux/reducers';
import { toast } from 'react-toastify';
import Api from '~/api/apis';
import { REQUEST_API } from '~/constants/method';
import { formatPrice } from '~/constants/utils';
import LoadingPage from '~/components/loadingPage';
import path from '~/constants/path';
import { Order } from '~/types/order.type';
import { User } from '~/types/user.type';
import './styles.css';

interface ITopUser {
  id: number;
  username: string;
  totalOrder: number;
  totalIncome: number;
}
interface IOrderByMonth {
  month: string;
  orderCount: number;
  status: number;
}

// ─── Drawer Panel ─────────────────────────────────────────────────────────────
type DrawerType = 'delivered' | 'products' | 'income' | 'pending' | null;

const statusLabel = (s: number) => {
  if (s === 1) return { text: 'Chờ xác nhận', cls: 'text-orange-500' };
  if (s === 2) return { text: 'Đã xác nhận',  cls: 'text-green-500'  };
  if (s === 3) return { text: 'Đang vận chuyển', cls: 'text-cyan-500' };
  if (s === 4) return { text: 'Đã giao',       cls: 'text-blue-500'  };
  if (s === 5) return { text: 'Không nhận hàng', cls: 'text-red-500' };
  return       { text: 'Đã hủy',               cls: 'text-red-400'   };
};

const Dashboard = () => {
  const themeReducer = useSelector((state: RootState) => state.ThemeReducer.mode);
  const token = useSelector((state: RootState) => state.ReducerAuth.token);
  const navigate = useNavigate();

  const [countOrders, setCountOrders] = React.useState();
  const [totalProduct, setToTalProduct] = React.useState();
  const [totalInCome, setTotalInCome] = React.useState();
  const [totalOrderNoProcess, setTotalOrderNoProcess] = React.useState();
  const [topUser, setTopUser] = React.useState<ITopUser[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderByMonthSuccess, setOrderByMonthSuccess] = React.useState<IOrderByMonth[]>([]);
  const [orderByMonthUnSuccess, setOrderByMonthUnSuccess] = React.useState<IOrderByMonth[]>([]);

  // Drawer state
  const [drawer, setDrawer] = React.useState<DrawerType>(null);
  const [drawerOrders, setDrawerOrders] = React.useState<Order[]>([]);
  const [drawerLoading, setDrawerLoading] = React.useState(false);

  const openDrawer = async (type: DrawerType) => {
    setDrawer(type);
    if (type === 'delivered' || type === 'pending') {
      setDrawerLoading(true);
      try {
        const statusParam = type === 'delivered' ? 4 : 1;
        const params = { keyword: '', pageNo: 1, pageSize: 50, sortBy: 'id', sortDirection: 'desc', status: statusParam };
        const url = Api.getAllOrders(params);
        const res = await REQUEST_API({ url, method: 'get', token });
        if (res?.status) setDrawerOrders(res.data.data || []);
        else setDrawerOrders([]);
      } catch { setDrawerOrders([]); }
      setDrawerLoading(false);
    }
  };
  const closeDrawer = () => { setDrawer(null); setDrawerOrders([]); };

  // ─── API calls ───────────────────────────────────────────────────────────────
  const getCountOrders = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const res = await REQUEST_API({ url: Api.countOrders(4), method: 'get', token });
      if (res?.status) setCountOrders(res.data);
    } catch { /* ignore */ } finally { setIsLoading(false); }
  };
  const getTotalProduct = async () => {
    if (!token) return;
    try {
      const res = await REQUEST_API({ url: Api.totalProduct(), method: 'get', token });
      if (res?.status) setToTalProduct(res.data);
    } catch { /* ignore */ }
  };
  const getTotalInCome = async () => {
    if (!token) return;
    try {
      const res = await REQUEST_API({ url: Api.totalInCome(), method: 'get', token });
      if (res?.status) setTotalInCome(res.data);
    } catch { /* ignore */ }
  };
  const getTotalOrderNoProcesse = async () => {
    if (!token) return;
    try {
      const res = await REQUEST_API({ url: Api.totalOrderNoProcess(), method: 'get', token });
      if (res?.status) setTotalOrderNoProcess(res.data);
    } catch { /* ignore */ }
  };
  const findTopUser = async () => {
    if (!token) return;
    try {
      const res = await REQUEST_API({ url: Api.findTopUser(), method: 'get', token });
      if (res?.status) setTopUser(res.data);
    } catch { /* ignore */ }
  };
  const getAllOrders = async () => {
    if (!token) return;
    try {
      const params = { keyword: '', pageNo: 1, sortBy: 'id', sortDirection: 'asc' };
      const res = await REQUEST_API({ url: Api.getAllOrders(params), method: 'get', token });
      if (res?.status) setOrders(res.data.data.map((i) => ({ ...i })));
    } catch { /* ignore */ }
  };
  const getUser = async (id: number) => {
    if (!token) return;
    try {
      const res = await REQUEST_API({ url: Api.detailAcc(id), method: 'get', token });
      if (res?.status) {
        const u = res.data;
        setUser((prev) => ({ ...prev, [u.id]: u.username }));
      }
    } catch { /* ignore */ }
  };
  const getOrderByMonthSuccess = async () => {
    if (!token) return;
    try {
      const res = await REQUEST_API({ url: Api.getOrderByMonth(4), method: 'get', token });
      if (res?.status) setOrderByMonthSuccess(res.data);
    } catch { /* ignore */ }
  };
  const getOrderByMonthUnSuccess = async () => {
    if (!token) return;
    try {
      const res = await REQUEST_API({ url: Api.getOrderByMonth(5), method: 'get', token });
      if (res?.status) setOrderByMonthUnSuccess(res.data);
    } catch { /* ignore */ }
  };

  React.useEffect(() => {
    getCountOrders(); getTotalProduct(); getTotalInCome();
    getTotalOrderNoProcesse(); findTopUser();
    getOrderByMonthSuccess(); getOrderByMonthUnSuccess(); getAllOrders();
  }, []);

  React.useEffect(() => {
    orders.forEach(async (item) => {
      if (item.user != null && item.user !== 0) await getUser(item.user);
    });
  }, [orders]);

  const totalCost = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return 0;
    const itemTotal = order.items.reduce((sum, i) => sum + i.sellPrice * i.quantity, 0);
    return itemTotal + order.shippingFee;
  };

  // ─── Status cards ─────────────────────────────────────────────────────────
  const statusCards = [
    {
      icon: 'bx bx-shopping-bag',
      title: 'Tổng số đơn hàng đã giao',
      count: countOrders || '0',
      color: '#3b82f6',
      onClick: () => openDrawer('delivered'),
    },
    {
      icon: 'bx bx-cart',
      count: totalProduct || '0',
      title: 'Tổng số sản phẩm đang bán',
      color: '#10b981',
      onClick: () => navigate(path.products),
    },
    {
      icon: 'bx bx-dollar-circle',
      count: formatPrice(Number(totalInCome)) || '0đ',
      title: 'Tổng thu nhập',
      color: '#f59e0b',
      onClick: () => openDrawer('income'),
    },
    {
      icon: 'bx bx-receipt',
      count: totalOrderNoProcess || '0',
      title: 'Tổng đơn hàng cần được xử lý',
      color: '#ef4444',
      onClick: () => openDrawer('pending'),
    },
  ];

  // ─── Chart ────────────────────────────────────────────────────────────────
  const startYear = 2023;
  const endYear = new Date().getFullYear() + 1;
  const months: string[] = [];
  for (let y = startYear; y <= endYear; y++)
    for (let m = 1; m <= 12; m++)
      months.push(`${y}-${String(m).padStart(2, '0')}`);

  const successData = new Array(12).fill(0);
  const failData = new Array(12).fill(0);
  orderByMonthSuccess.forEach((item) => {
    const idx = months.indexOf(item.month);
    if (idx !== -1) successData[idx] = item.orderCount;
  });
  orderByMonthUnSuccess.forEach((item) => {
    const idx = months.indexOf(item.month);
    if (idx !== -1) failData[idx] = item.orderCount;
  });

  const chartOptions = {
    series: [
      { name: 'Đơn hàng thành công',       data: successData },
      { name: 'Đơn hàng không thành công',  data: failData    },
    ],
    options: {
      colors: ['#2999ff', '#ff0000'],
      chart: { background: 'transparent' },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' as const },
      xaxis: {
        categories: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6',
                     'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
      },
      title: { text: 'Thống kê đơn hàng', align: 'left' as const },
      legend: { position: 'top' as const },
      grid: { show: false },
    },
  };

  // ─── Income breakdown ─────────────────────────────────────────────────────
  const incomeByMonth = months.map((m, i) => ({
    month: m,
    success: successData[i] ?? 0,
    fail:    failData[i]    ?? 0,
  })).filter((r) => r.success > 0 || r.fail > 0);

  // ─── Drawer content ───────────────────────────────────────────────────────
  const drawerTitle =
    drawer === 'delivered' ? 'Đơn hàng đã giao' :
    drawer === 'income'    ? 'Thống kê thu nhập theo tháng' :
    drawer === 'pending'   ? 'Đơn hàng cần xử lý' : '';

  return (
    <div>
      {isLoading && <LoadingPage />}
      <h2 className="page-header text-xl font-bold">Trang tổng quan</h2>

      {/* ── Stat Cards ─────────────────────────────────────────────────── */}
      <div className="row">
        <div className="col-6">
          <div className="row">
            {statusCards.map((item, index) => (
              <div className="col-6" key={index}>
                <div
                  className="status-card h-[135px] cursor-pointer dash-stat-card"
                  style={{ '--card-accent': item.color } as React.CSSProperties}
                  onClick={item.onClick}
                  title={`Xem chi tiết: ${item.title}`}
                >
                  <div className="status-card__icon" style={{ color: item.color }}>
                    <i className={item.icon}></i>
                  </div>
                  <div className="status-card__info">
                    <p style={{ color: item.color }}>{item.count}</p>
                    <span>{item.title}</span>
                  </div>
                  <div className="dash-stat-arrow">
                    <i className="bx bx-chevron-right"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="col-6">
          <div className="card full-height">
            <Chart
              options={
                themeReducer === 'theme-mode-dark'
                  ? { ...chartOptions.options, theme: { mode: 'dark' } }
                  : { ...chartOptions.options, theme: { mode: 'light' } }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>

        {/* Top users */}
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>Top người dùng mua hàng nhiều nhất</h3>
            </div>
            <div className="card__body">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th className="text-center">Tên Tài Khoản</th>
                      <th className="text-center">Số Đơn Hàng</th>
                      <th className="text-center">Tổng Tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topUser.map((item, i) => (
                      <tr key={i}>
                        <td className="text-center">{item.username}</td>
                        <td className="text-center">{item.totalOrder}</td>
                        <td className="text-center">{formatPrice(item.totalIncome)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent orders */}
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>Đơn hàng mới nhất</h3>
            </div>
            <div className="card__body">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th className="text-center">Mã Đơn Hàng</th>
                      <th className="text-center">Tài Khoản</th>
                      <th className="text-center">Tổng Tiền</th>
                      <th className="text-center">Ngày Đặt</th>
                      <th className="text-center">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 6).map((item, i) => {
                      const sl = statusLabel(item.status);
                      return (
                        <tr key={i}>
                          <td className="text-center">{item.codeOrders}</td>
                          <td className="text-center">{user[item.user]}</td>
                          <td className="text-center">{formatPrice(totalCost(item.id))}</td>
                          <td className="text-center">{item.orderDate}</td>
                          <td className={`text-center ${sl.cls}`}>{sl.text}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card__footer">
              <Link to={path.orders}>Xem tất cả</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slide-in Drawer ─────────────────────────────────────────────── */}
      {drawer && (
        <>
          {/* Overlay */}
          <div className="dash-drawer-overlay" onClick={closeDrawer} />

          {/* Panel */}
          <div className={`dash-drawer ${drawer ? 'dash-drawer--open' : ''}`}>
            {/* Header */}
            <div className="dash-drawer__header">
              <h3>{drawerTitle}</h3>
              <button className="dash-drawer__close" onClick={closeDrawer}>
                <i className="bx bx-x"></i>
              </button>
            </div>

            {/* Body */}
            <div className="dash-drawer__body">
              {drawerLoading && (
                <div className="dash-drawer__loading">
                  <div className="dash-drawer__spinner" />
                  <span>Đang tải dữ liệu...</span>
                </div>
              )}

              {/* Delivered / Pending orders table */}
              {!drawerLoading && (drawer === 'delivered' || drawer === 'pending') && (
                <>
                  <div className="dash-drawer__summary">
                    <span className="dash-drawer__badge">
                      {drawerOrders.length} đơn hàng
                    </span>
                  </div>
                  {drawerOrders.length === 0 ? (
                    <div className="dash-drawer__empty">Không có đơn hàng nào</div>
                  ) : (
                    <div className="dash-drawer__table-wrap">
                      <table className="dash-drawer__table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Mã đơn</th>
                            <th>Ngày đặt</th>
                            <th>Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {drawerOrders.map((o, i) => {
                            const sl = statusLabel(o.status);
                            return (
                              <tr
                                key={i}
                                onClick={() => navigate(path.orders)}
                                className="dash-drawer__table-row"
                              >
                                <td>{i + 1}</td>
                                <td className="font-medium">{o.codeOrders}</td>
                                <td>{o.orderDate}</td>
                                <td className={sl.cls}>{sl.text}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="dash-drawer__footer">
                    <button
                      className="dash-drawer__view-all"
                      onClick={() => { closeDrawer(); navigate(path.orders); }}
                    >
                      <i className="bx bx-link-external mr-1"></i>
                      Xem tất cả đơn hàng
                    </button>
                  </div>
                </>
              )}

              {/* Income breakdown */}
              {!drawerLoading && drawer === 'income' && (
                <>
                  <div className="dash-drawer__income-total">
                    <div className="dash-income-total-label">Tổng thu nhập</div>
                    <div className="dash-income-total-value">
                      {formatPrice(Number(totalInCome))}
                    </div>
                  </div>
                  {incomeByMonth.length === 0 ? (
                    <div className="dash-drawer__empty">Chưa có dữ liệu thu nhập</div>
                  ) : (
                    <div className="dash-drawer__table-wrap">
                      <table className="dash-drawer__table">
                        <thead>
                          <tr>
                            <th>Tháng</th>
                            <th className="text-center">Đơn thành công</th>
                            <th className="text-center">Đơn hủy/từ chối</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...incomeByMonth].reverse().map((r, i) => (
                            <tr key={i} className="dash-drawer__table-row">
                              <td className="font-medium">{r.month}</td>
                              <td className="text-center text-green-600 font-semibold">
                                {r.success} đơn
                              </td>
                              <td className="text-center text-red-500">
                                {r.fail > 0 ? `${r.fail} đơn` : '–'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="dash-drawer__footer">
                    <button
                      className="dash-drawer__view-all"
                      onClick={() => { closeDrawer(); navigate(path.analytics); }}
                    >
                      <i className="bx bx-bar-chart-alt-2 mr-1"></i>
                      Xem thống kê chi tiết
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
