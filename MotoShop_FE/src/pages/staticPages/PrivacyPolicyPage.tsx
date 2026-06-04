import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import './styles.css';

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Breadcrum title="Chính sách bảo mật" />

      <div className="static-page__hero">
        <div className="container">
          <h1 className="static-page__hero-title">Chính sách bảo mật</h1>
          <p className="static-page__hero-sub">
            Thông tin của bạn được bảo vệ an toàn tuyệt đối
          </p>
        </div>
      </div>

      <div className="static-page__body">
        <div className="container">
          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">🔒</span> Chính sách bảo mật thông tin
            </h2>

            <div className="policy-section">
              <h3 className="policy-section__title">Thông tin chúng tôi thu thập</h3>
              <ul className="policy-list">
                <li>Họ tên, số điện thoại, địa chỉ email khi đăng ký tài khoản hoặc đặt hàng.</li>
                <li>Địa chỉ giao hàng để thực hiện vận chuyển xe.</li>
                <li>Thông tin giao dịch để xử lý đơn hàng và hoàn tiền.</li>
                <li>Cookie và dữ liệu duyệt web để cải thiện trải nghiệm người dùng.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Mục đích sử dụng thông tin</h3>
              <ul className="policy-list">
                <li>Xử lý đơn hàng, giao xe và hỗ trợ khách hàng.</li>
                <li>Gửi thông báo về trạng thái đơn hàng và khuyến mãi (nếu bạn đồng ý).</li>
                <li>Cải thiện chất lượng dịch vụ và trải nghiệm mua sắm.</li>
                <li>Tuân thủ các nghĩa vụ pháp lý theo quy định của pháp luật Việt Nam.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Bảo mật thông tin</h3>
              <ul className="policy-list">
                <li>Thông tin của bạn được lưu trữ trên hệ thống máy chủ bảo mật với mã hóa SSL.</li>
                <li>Chúng tôi không bán hoặc chia sẻ thông tin cá nhân cho bên thứ ba vì mục đích thương mại.</li>
                <li>Chỉ chia sẻ thông tin khi có yêu cầu từ cơ quan có thẩm quyền theo quy định pháp luật.</li>
                <li>Nhân viên chỉ được truy cập thông tin khi cần thiết để thực hiện công việc.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3 className="policy-section__title">Quyền của bạn</h3>
              <ul className="policy-list">
                <li>Yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình.</li>
                <li>Từ chối nhận email marketing bất kỳ lúc nào.</li>
                <li>Khiếu nại nếu thông tin của bạn bị sử dụng sai mục đích.</li>
              </ul>
            </div>

            <div className="highlight-box">
              <span className="highlight-box__icon">📧</span>
              <p className="highlight-box__text">
                Mọi yêu cầu về quyền riêng tư, vui lòng liên hệ:{' '}
                <strong>quanglinhmoto@gmail.com</strong>. Chúng tôi sẽ phản hồi trong vòng{' '}
                <strong>3 ngày làm việc</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
