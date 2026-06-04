import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import { SHOP_INFO } from '~/constants/utils';
import './styles.css';

const AboutPage = () => {
  return (
    <div>
      <Breadcrum title="Về chúng tôi" />

      <div className="static-page__hero">
        <div className="container">
          <h1 className="static-page__hero-title">Về chúng tôi</h1>
          <p className="static-page__hero-sub">
            Hơn 10 năm đồng hành cùng người Việt trên mọi nẻo đường
          </p>
        </div>
      </div>

      <div className="static-page__body">
        <div className="container">
          {/* Stats */}
          <div className="static-page__stats">
            <div className="stat-box">
              <div className="stat-box__num">10+</div>
              <div className="stat-box__label">Năm kinh nghiệm</div>
            </div>
            <div className="stat-box">
              <div className="stat-box__num">5.000+</div>
              <div className="stat-box__label">Khách hàng tin dùng</div>
            </div>
            <div className="stat-box">
              <div className="stat-box__num">200+</div>
              <div className="stat-box__label">Dòng xe phong phú</div>
            </div>
            <div className="stat-box">
              <div className="stat-box__num">1</div>
              <div className="stat-box__label">Showroom tại Hà Nội</div>
            </div>
          </div>

          {/* Giới thiệu */}
          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">🏍️</span> Câu chuyện của chúng tôi
            </h2>
            <p>
              <strong>{SHOP_INFO.name}</strong> được thành lập với sứ mệnh mang đến trải nghiệm mua xe
              hai bánh tốt nhất cho người tiêu dùng Việt Nam. Chúng tôi hiểu rằng mỗi chiếc xe
              không chỉ là phương tiện di chuyển mà còn là người bạn đồng hành đáng tin cậy trong
              cuộc sống hàng ngày.
            </p>
            <p>
              Tọa lạc tại <strong>{SHOP_INFO.address}</strong>, showroom của chúng tôi trưng bày
              đầy đủ các dòng xe từ xe số, xe tay ga đến xe côn tay của các thương hiệu danh tiếng
              như Honda, Yamaha, Suzuki. Đội ngũ tư vấn viên chuyên nghiệp luôn sẵn sàng hỗ trợ
              bạn tìm chiếc xe phù hợp nhất với nhu cầu và ngân sách.
            </p>
            <p>
              Chúng tôi cam kết cung cấp xe chính hãng, có đầy đủ giấy tờ pháp lý, với chính sách
              bảo hành và hậu mãi minh bạch. Sự hài lòng của khách hàng là thước đo thành công của
              chúng tôi.
            </p>
          </div>

          {/* Giá trị cốt lõi */}
          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">⭐</span> Giá trị cốt lõi
            </h2>
            <div className="static-page__values">
              <div className="value-box">
                <div className="value-box__icon">🤝</div>
                <p className="value-box__title">Uy tín</p>
                <p className="value-box__desc">
                  Cam kết cung cấp xe chính hãng, nguồn gốc rõ ràng, không nhập xe trôi nổi.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box__icon">💰</div>
                <p className="value-box__title">Giá cả minh bạch</p>
                <p className="value-box__desc">
                  Niêm yết giá rõ ràng, không phát sinh phí ẩn, hỗ trợ so sánh giá tốt nhất.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box__icon">🛠️</div>
                <p className="value-box__title">Dịch vụ tận tâm</p>
                <p className="value-box__desc">
                  Hỗ trợ tư vấn, làm giấy tờ, vận chuyển và bảo hành tận nhà cho khách hàng.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box__icon">🚀</div>
                <p className="value-box__title">Đổi mới</p>
                <p className="value-box__desc">
                  Không ngừng cập nhật các dòng xe mới, công nghệ mới để phục vụ khách tốt hơn.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box__icon">🌿</div>
                <p className="value-box__title">Bền vững</p>
                <p className="value-box__desc">
                  Ưu tiên xe tiết kiệm nhiên liệu, thân thiện môi trường cho tương lai xanh.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box__icon">❤️</div>
                <p className="value-box__title">Khách hàng là trung tâm</p>
                <p className="value-box__desc">
                  Mọi quyết định đều hướng đến lợi ích và sự hài lòng của khách hàng.
                </p>
              </div>
            </div>
          </div>

          {/* Liên hệ */}
          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">📞</span> Liên hệ với chúng tôi
            </h2>
            <div className="highlight-box">
              <span className="highlight-box__icon">📍</span>
              <p className="highlight-box__text">
                <strong>Địa chỉ:</strong> {SHOP_INFO.address}
                <br />
                <strong>Hotline:</strong> {SHOP_INFO.phoneDisplay} &nbsp;|&nbsp;
                <strong>Email:</strong> {SHOP_INFO.email}
                <br />
                <strong>Giờ làm việc:</strong> {SHOP_INFO.hoursWeekdays} — {SHOP_INFO.hoursSunday}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
