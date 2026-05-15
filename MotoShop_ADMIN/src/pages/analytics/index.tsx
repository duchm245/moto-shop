import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import Api from '~/api/apis';
import LoadingPage from '~/components/loadingPage';
import { REQUEST_API } from '~/constants/method';
import { formatPrice } from '~/constants/utils';
import { RootState } from '~/redux/reducers';
import './styles.css';

interface TopUser {
  id: number;
  fullName: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
}

const Analytics = () => {
  const token        = useSelector((state: RootState) => state.ReducerAuth.token);
  const themeMode    = useSelector((state: RootState) => state.ThemeReducer.mode);
  const isDark       = themeMode === 'theme-mode-dark';
  const chartTheme   = isDark ? 'dark' : 'light';

  const [isLoading, setIsLoading]   = React.useState(false);

  // Thống kê đơn hàng theo trạng thái
  const [orderStats, setOrderStats] = React.useState([0, 0, 0, 0, 0, 0]);

  // Tổng quan
  const [totalIncome,  setTotalIncome]  = React.useState<number>(0);
  const [totalSold,    setTotalSold]    = React.useState<number>(0);
  const [totalProduct, setTotalProduct] = React.useState<number>(0);
  const [totalNoProc,  setTotalNoProc]  = React.useState<number>(0);

  // Doanh thu theo tháng
  const [revenueByMonth,  setRevenueByMonth]  = React.useState<number[]>(Array(12).fill(0));
  const [deliveredByMonth, setDeliveredByMonth] = React.useState<number[]>(Array(12).fill(0));

  // Top khách hàng
  const [topUsers, setTopUsers] = React.useState<TopUser[]>([]);

  /* ── helpers ── */
  const callApi = async (url: string) => {
    const res = await REQUEST_API({ url, method: 'get', token });
    return res;
  };

  const fetchAll = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      // 1. Đếm đơn theo trạng thái (0-5)
      const counts = await Promise.all(
        [1, 2, 3, 4, 5, 0].map(s => callApi(Api.countOrders(s)))
      );
      setOrderStats(counts.map(r => (r?.status ? Number(r.data) : 0)));

      // 2. Tổng doanh thu
      const income = await callApi(Api.totalInCome());
      if (income?.status) setTotalIncome(Number(income.data) || 0);

      // 3. Tổng sản phẩm đã bán
      const sold = await callApi(Api.getTotalSoldProduct());
      if (sold?.status) setTotalSold(Number(sold.data) || 0);

      // 4. Tổng sản phẩm
      const prod = await callApi(Api.totalProduct());
      if (prod?.status) setTotalProduct(Number(prod.data) || 0);

      // 5. Đơn chưa xử lý
      const noProc = await callApi(Api.totalOrderNoProcess());
      if (noProc?.status) setTotalNoProc(Number(noProc.data) || 0);

      // 6. Doanh thu theo tháng (đơn đã giao - status 4)
      const byMonth4 = await callApi(Api.getOrderByMonth(4));
      if (byMonth4?.status && Array.isArray(byMonth4.data)) {
        const arr = Array(12).fill(0);
        byMonth4.data.forEach((item: any) => {
          const m = Number(item.month);
          if (m >= 1 && m <= 12) arr[m - 1] = Number(item.total) || 0;
        });
        setRevenueByMonth(arr);
      }

      // 7. Đơn đã giao theo tháng
      const byMonth3 = await callApi(Api.getOrderByMonth(3));
      if (byMonth3?.status && Array.isArray(byMonth3.data)) {
        const arr = Array(12).fill(0);
        byMonth3.data.forEach((item: any) => {
          const m = Number(item.month);
          if (m >= 1 && m <= 12) arr[m - 1] = Number(item.total) || 0;
        });
        setDeliveredByMonth(arr);
      }

      // 8. Top khách hàng
      const topU = await callApi(Api.findTopUser());
      if (topU?.status && Array.isArray(topU.data)) setTopUsers(topU.data);

    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => { fetchAll(); }, [token]);

  /* ── Chart configs ── */
  const MONTHS = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];

  const barChartOptions: ApexCharts.ApexOptions = {
    chart: { type: 'bar', height: 300, toolbar: { show: false }, background: 'transparent' },
    theme: { mode: chartTheme },
    plotOptions: { bar: { borderRadius: 4, horizontal: true } },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Chưa xác nhận','Đã xác nhận','Đang giao','Đã giao','Giao k.thành','Đã hủy'],
      labels: { style: { fontSize: '12px' } },
    },
    colors: ['#3498db'],
    grid: { borderColor: isDark ? '#ffffff18' : '#00000010' },
    title: { text: 'Thống kê đơn hàng theo trạng thái', style: { fontSize: '14px', fontWeight: '700' } },
  };

  const lineChartOptions: ApexCharts.ApexOptions = {
    chart: { type: 'area', height: 300, toolbar: { show: false }, background: 'transparent' },
    theme: { mode: chartTheme },
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    dataLabels: { enabled: false },
    xaxis: { categories: MONTHS, labels: { style: { fontSize: '12px' } } },
    yaxis: { labels: { formatter: (v) => v.toLocaleString('vi-VN') } },
    colors: ['#e74c3c', '#27ae60'],
    grid: { borderColor: isDark ? '#ffffff18' : '#00000010' },
    legend: { position: 'top' },
    title: { text: 'Đơn hàng theo tháng trong năm', style: { fontSize: '14px', fontWeight: '700' } },
  };

  const donutOptions: ApexCharts.ApexOptions = {
    chart: { type: 'donut', background: 'transparent' },
    theme: { mode: chartTheme },
    labels: ['Chưa xác nhận','Đã xác nhận','Đang giao','Đã giao','Giao k.thành','Đã hủy'],
    colors: ['#f39c12','#3498db','#00b4d8','#27ae60','#e67e22','#e74c3c'],
    legend: { position: 'bottom', fontSize: '12px' },
    dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(0)}%` },
    title: { text: 'Tỷ lệ trạng thái đơn hàng', style: { fontSize: '14px', fontWeight: '700' } },
    plotOptions: { pie: { donut: { size: '60%' } } },
  };
  const donutSeries = orderStats.map(Number);
  const donutTotal  = donutSeries.reduce((a, b) => a + b, 0);

  return (
    <div className="analytics-page">
      {isLoading && <LoadingPage />}

      <h2 className="analytics-page__title">Phân tích</h2>

      {/* ── Stat cards ── */}
      <div className="analytics-stats">
        <div className="analytics-stat-card analytics-stat-card--blue">
          <div className="analytics-stat-card__icon"><i className="bx bx-money-withdraw" /></div>
          <div className="analytics-stat-card__body">
            <p className="analytics-stat-card__label">Tổng doanh thu</p>
            <p className="analytics-stat-card__value">{formatPrice(totalIncome)}</p>
          </div>
        </div>
        <div className="analytics-stat-card analytics-stat-card--green">
          <div className="analytics-stat-card__icon"><i className="bx bx-cart-check" /></div>
          <div className="analytics-stat-card__body">
            <p className="analytics-stat-card__label">Sản phẩm đã bán</p>
            <p className="analytics-stat-card__value">{totalSold.toLocaleString('vi-VN')}</p>
          </div>
        </div>
        <div className="analytics-stat-card analytics-stat-card--purple">
          <div className="analytics-stat-card__icon"><i className="bx bx-package" /></div>
          <div className="analytics-stat-card__body">
            <p className="analytics-stat-card__label">Tổng sản phẩm</p>
            <p className="analytics-stat-card__value">{totalProduct.toLocaleString('vi-VN')}</p>
          </div>
        </div>
        <div className="analytics-stat-card analytics-stat-card--red">
          <div className="analytics-stat-card__icon"><i className="bx bx-time-five" /></div>
          <div className="analytics-stat-card__body">
            <p className="analytics-stat-card__label">Đơn chờ xử lý</p>
            <p className="analytics-stat-card__value">{totalNoProc.toLocaleString('vi-VN')}</p>
          </div>
        </div>
      </div>

      {/* ── Charts row 1 ── */}
      <div className="analytics-charts-row">
        <div className="analytics-chart-card analytics-chart-card--lg">
          <Chart
            options={barChartOptions}
            series={[{ name: 'Số đơn', data: orderStats }]}
            type="bar"
            height={300}
          />
        </div>
        <div className="analytics-chart-card analytics-chart-card--sm">
          {donutTotal > 0
            ? <Chart options={donutOptions} series={donutSeries} type="donut" height={300} />
            : (
              <div className="analytics-chart-card__empty">
                <i className="bx bx-pie-chart-alt" />
                <p>Chưa có dữ liệu</p>
              </div>
            )
          }
        </div>
      </div>

      {/* ── Charts row 2: line chart ── */}
      <div className="analytics-charts-row">
        <div className="analytics-chart-card analytics-chart-card--full">
          <Chart
            options={lineChartOptions}
            series={[
              { name: 'Đơn đang giao', data: deliveredByMonth },
              { name: 'Đơn đã giao',   data: revenueByMonth  },
            ]}
            type="area"
            height={300}
          />
        </div>
      </div>

      {/* ── Top khách hàng ── */}
      {topUsers.length > 0 && (
        <div className="analytics-top-users">
          <h3 className="analytics-section-title">
            <i className="bx bxs-crown" style={{ color: '#f39c12' }} /> Top khách hàng
          </h3>
          <div className="analytics-top-table-wrap">
            <table className="analytics-top-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Khách hàng</th>
                  <th>Email</th>
                  <th>Tổng đơn</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((u, i) => (
                  <tr key={u.id}>
                    <td>
                      <span className={`analytics-rank analytics-rank--${i + 1}`}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                      </span>
                    </td>
                    <td>
                      <div className="analytics-user">
                        <div className="analytics-avatar">
                          {u.fullName?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <span>{u.fullName}</span>
                      </div>
                    </td>
                    <td className="analytics-email">{u.email}</td>
                    <td><strong>{u.totalOrders}</strong> đơn</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
