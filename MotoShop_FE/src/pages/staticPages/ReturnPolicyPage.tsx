import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import './styles.css';

const ReturnPolicyPage = () => {
  return (
    <div>
      <Breadcrum title="Chính sách đổi trả" />

      <div className="static-page__hero">
        <div className="container">
          <h1 className="static-page__hero-title">Chính sách đổi trả</h1>
          <p className="static-page__hero-sub">
            Cam kết đổi trả minh bạch – Bảo vệ quyền lợi khách hàng
          </p>
        </div>
      </div>

      <div className="static-page__body">
        <div className="container">
          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">🔄</span> Điều kiện đổi/trả xe
            </h2>

            <div className="policy-section">
              <h3 className="policy-section__title">Trường hợp được đổi/trả</h3>
              <ul className="policy-list">
                <li>Xe có lỗi kỹ thuật từ nhà sản xuất không thể khắc phục trong vòng 30 ngày.</li>
                <li>Xe không đúng với thông tin mô tả khi đặt hàng (màu sắc, phiên bản, năm sản xuất).</li>
                <li>Xe bị hư hỏng trong quá trình vận chuyển do lỗi của bên vận tải.</li>
                <li>Xe thiếu phụ kiện đi kèm theo cam kết ban đầu.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Thời gian đổi/trả</h3>
              <ul className="policy-list">
                <li><strong>Đổi xe:</strong> Trong vòng <strong>7 ngày</strong> kể từ ngày nhận xe.</li>
                <li><strong>Trả xe hoàn tiền:</strong> Trong vòng <strong>3 ngày</strong> kể từ ngày nhận xe.</li>
                <li>Thời gian hoàn tiền: 3–5 ngày làm việc sau khi xác nhận đủ điều kiện.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Điều kiện xe khi đổi/trả</h3>
              <ul className="policy-list">
                <li>Xe chưa qua sửa chữa, chỉnh sửa bởi bên ngoài.</li>
                <li>Còn đầy đủ giấy tờ, hóa đơn mua hàng gốc.</li>
                <li>Xe không bị tai nạn, trầy xước do người dùng gây ra.</li>
                <li>Số km sử dụng không vượt quá 100km (đối với xe mới).</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Trường hợp không áp dụng đổi/trả</h3>
              <ul className="policy-list">
                <li>Xe đã qua sử dụng bình thường, không có lỗi kỹ thuật.</li>
                <li>Khách hàng tự ý sửa chữa, độ xe.</li>
                <li>Xe bị hư hỏng do tai nạn, thiên tai, hỏa hoạn.</li>
                <li>Quá thời hạn đổi/trả quy định.</li>
              </ul>
            </div>

            <div className="highlight-box">
              <span className="highlight-box__icon">📞</span>
              <p className="highlight-box__text">
                Để yêu cầu đổi/trả, vui lòng liên hệ hotline{' '}
                <strong>0334 018 518</strong> hoặc email{' '}
                <strong>quanglinhmoto@gmail.com</strong> trong thời gian làm việc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
