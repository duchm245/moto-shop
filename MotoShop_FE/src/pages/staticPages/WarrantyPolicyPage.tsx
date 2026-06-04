import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import './styles.css';

const WarrantyPolicyPage = () => {
  return (
    <div>
      <Breadcrum title="Chính sách bảo hành" />

      <div className="static-page__hero">
        <div className="container">
          <h1 className="static-page__hero-title">Chính sách bảo hành</h1>
          <p className="static-page__hero-sub">
            Bảo hành chính hãng – Yên tâm khi mua xe tại LT Motor
          </p>
        </div>
      </div>

      <div className="static-page__body">
        <div className="container">
          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">🛡️</span> Chính sách bảo hành xe
            </h2>

            <div className="policy-section">
              <h3 className="policy-section__title">Thời hạn bảo hành theo hãng</h3>
              <ul className="policy-list">
                <li><strong>Honda:</strong> 3 năm hoặc 30.000km (tùy điều kiện nào đến trước).</li>
                <li><strong>Yamaha:</strong> 3 năm hoặc 30.000km (tùy điều kiện nào đến trước).</li>
                <li><strong>Suzuki:</strong> 2 năm hoặc 20.000km.</li>
                <li><strong>SYM / Piaggio / Kymco:</strong> Theo chính sách từng hãng, thông thường 2 năm.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Nội dung bảo hành</h3>
              <ul className="policy-list">
                <li>Khắc phục miễn phí các lỗi kỹ thuật do nhà sản xuất trong thời hạn bảo hành.</li>
                <li>Thay thế linh kiện bị lỗi bằng linh kiện chính hãng mới.</li>
                <li>Bảo dưỡng định kỳ miễn phí lần đầu tiên (theo quy định của hãng).</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Điều kiện áp dụng bảo hành</h3>
              <ul className="policy-list">
                <li>Xe trong thời hạn bảo hành và chưa vượt quá số km quy định.</li>
                <li>Giữ nguyên tem, nhãn bảo hành gốc của nhà sản xuất.</li>
                <li>Xe không bị tai nạn, ngập nước, hoặc sửa chữa ngoài hệ thống chính hãng.</li>
                <li>Sử dụng đúng nhiên liệu và bảo dưỡng đúng lịch theo khuyến cáo.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Trường hợp không được bảo hành</h3>
              <ul className="policy-list">
                <li>Hư hỏng do tai nạn giao thông, thiên tai, hỏa hoạn.</li>
                <li>Tự ý tháo, sửa chữa, thay thế linh kiện không chính hãng.</li>
                <li>Sử dụng không đúng mục đích (đua xe, chở hàng quá tải...).</li>
                <li>Hao mòn tự nhiên theo thời gian (lốp, má phanh, bóng đèn...).</li>
              </ul>
            </div>

            <div className="highlight-box">
              <span className="highlight-box__icon">🔧</span>
              <p className="highlight-box__text">
                Để được bảo hành, mang xe đến{' '}
                <strong>showroom LT Motor</strong> hoặc các trung tâm bảo hành ủy quyền của
                hãng. Vui lòng mang theo <strong>phiếu bảo hành và hóa đơn mua hàng</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyPolicyPage;
