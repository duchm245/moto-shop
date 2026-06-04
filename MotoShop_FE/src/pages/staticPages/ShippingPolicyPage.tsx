import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import './styles.css';

const ShippingPolicyPage = () => {
  return (
    <div>
      <Breadcrum title="Chính sách vận chuyển" />

      <div className="static-page__hero">
        <div className="container">
          <h1 className="static-page__hero-title">Chính sách vận chuyển</h1>
          <p className="static-page__hero-sub">
            Giao xe tận nơi toàn quốc – An toàn – Đúng hẹn
          </p>
        </div>
      </div>

      <div className="static-page__body">
        <div className="container">
          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">🚚</span> Chính sách giao hàng
            </h2>

            <div className="policy-section">
              <h3 className="policy-section__title">Khu vực nội thành Hà Nội</h3>
              <ul className="policy-list">
                <li>Giao xe tận nơi miễn phí trong bán kính 10km từ showroom.</li>
                <li>Thời gian giao hàng: trong ngày hoặc theo hẹn (sáng/chiều).</li>
                <li>Phí giao hàng ngoài bán kính 10km: từ 100.000 VNĐ (tùy khoảng cách).</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Các tỉnh thành toàn quốc</h3>
              <ul className="policy-list">
                <li>Vận chuyển xe qua đơn vị chuyển phát uy tín: Nhanh, J&T, GHTK, xe chuyên dụng.</li>
                <li>Thời gian giao hàng: 2–5 ngày làm việc tùy tỉnh thành.</li>
                <li>
                  Phí vận chuyển:
                  <ul>
                    <li>Miền Bắc (ngoài HN): 200.000 – 400.000 VNĐ</li>
                    <li>Miền Trung: 400.000 – 700.000 VNĐ</li>
                    <li>Miền Nam: 600.000 – 1.000.000 VNĐ</li>
                  </ul>
                </li>
                <li>Phí vận chuyển được thỏa thuận trước khi đặt hàng.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Quy trình giao xe</h3>
              <ul className="policy-list">
                <li><strong>Bước 1:</strong> Xác nhận đơn hàng và thông tin giao hàng qua điện thoại.</li>
                <li><strong>Bước 2:</strong> Chuẩn bị xe, kiểm tra kỹ thuật lần cuối trước khi giao.</li>
                <li><strong>Bước 3:</strong> Giao xe kèm đầy đủ giấy tờ: hóa đơn, giấy kiểm định, phiếu bảo hành.</li>
                <li><strong>Bước 4:</strong> Khách hàng kiểm tra xe và ký biên bản giao nhận.</li>
              </ul>
            </div>

            <div className="highlight-box">
              <span className="highlight-box__icon">🛡️</span>
              <p className="highlight-box__text">
                Xe được đóng gói cẩn thận và có bảo hiểm vận chuyển.{' '}
                <strong>Nếu xe bị hư hỏng trong quá trình vận chuyển, chúng tôi hoàn toàn chịu trách nhiệm.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
