import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import './styles.css';

const PaymentPolicyPage = () => {
  return (
    <div>
      <Breadcrum title="Chính sách thanh toán" />

      <div className="static-page__hero">
        <div className="container">
          <h1 className="static-page__hero-title">Chính sách thanh toán</h1>
          <p className="static-page__hero-sub">
            Các hình thức thanh toán linh hoạt, an toàn và tiện lợi
          </p>
        </div>
      </div>

      <div className="static-page__body">
        <div className="container">
          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">💳</span> Các hình thức thanh toán
            </h2>

            <div className="policy-section">
              <h3 className="policy-section__title">Thanh toán tiền mặt</h3>
              <ul className="policy-list">
                <li>Khách hàng có thể thanh toán trực tiếp bằng tiền mặt tại showroom.</li>
                <li>Nhận hóa đơn VAT ngay sau khi thanh toán.</li>
                <li>Áp dụng cho cả thanh toán toàn bộ và đặt cọc.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Chuyển khoản ngân hàng</h3>
              <ul className="policy-list">
                <li>Số tài khoản: <strong>1234567890</strong> – Ngân hàng Vietcombank</li>
                <li>Chủ tài khoản: <strong>HOANG QUANG LINH</strong></li>
                <li>Nội dung chuyển khoản: Họ tên + Số điện thoại + Tên xe.</li>
                <li>Sau khi chuyển khoản, vui lòng gửi xác nhận qua hotline hoặc Zalo.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Thanh toán trả góp</h3>
              <ul className="policy-list">
                <li>Hợp tác với các ngân hàng: VPBank, Techcombank, BIDV, MBBank, FE Credit...</li>
                <li>Trả góp từ 6 – 36 tháng với lãi suất từ 0.8%/tháng.</li>
                <li>Trả trước tối thiểu 20% giá trị xe.</li>
                <li>Duyệt nhanh trong 1–2 giờ làm việc với hồ sơ đầy đủ.</li>
                <li>Không yêu cầu tài sản thế chấp cho khoản vay dưới 50 triệu đồng.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Đặt cọc trực tuyến</h3>
              <ul className="policy-list">
                <li>Số tiền đặt cọc tối thiểu: <strong>2.000.000 VNĐ</strong>.</li>
                <li>Xe được giữ trong <strong>7 ngày</strong> kể từ ngày đặt cọc.</li>
                <li>Tiền cọc được trừ vào tổng giá trị xe khi thanh toán đủ.</li>
                <li>Hoàn cọc 100% nếu xe không đúng mô tả hoặc hết hàng.</li>
              </ul>
            </div>

            <div className="highlight-box">
              <span className="highlight-box__icon">⚠️</span>
              <p className="highlight-box__text">
                <strong>Lưu ý:</strong> Mọi giao dịch đều có hóa đơn xác nhận. Vui lòng giữ lại
                biên lai để được hỗ trợ trong trường hợp có tranh chấp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPolicyPage;
