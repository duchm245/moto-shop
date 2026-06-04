import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import { SHOP_INFO } from '~/constants/utils';
import './styles.css';

const ShowroomPage = () => {
  return (
    <div>
      <Breadcrum title="Hệ thống Showroom" />

      <div className="static-page__hero">
        <div className="container">
          <h1 className="static-page__hero-title">Hệ thống Showroom</h1>
          <p className="static-page__hero-sub">
            Ghé thăm showroom của chúng tôi để trải nghiệm trực tiếp
          </p>
        </div>
      </div>

      <div className="static-page__body">
        <div className="container">
          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">📍</span> Showroom LT Motor Hà Nội
            </h2>

            <div className="showroom-card">
              <div className="showroom-card__badge">🏍️</div>
              <div>
                <p className="showroom-card__name">{SHOP_INFO.name} – Showroom Cầu Giấy</p>
                <p className="showroom-card__info">
                  <strong>Địa chỉ:</strong> {SHOP_INFO.address}
                  <br />
                  <strong>Hotline:</strong>{' '}
                  <a href={`tel:${SHOP_INFO.phone}`} style={{ color: '#c0392b', fontWeight: 600 }}>
                    {SHOP_INFO.phoneDisplay}
                  </a>
                  <br />
                  <strong>Email:</strong> {SHOP_INFO.email}
                  <br />
                  <strong>Giờ làm việc:</strong> {SHOP_INFO.hoursWeekdays}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {SHOP_INFO.hoursSunday}
                  <br />
                  <span className="showroom-card__status">✅ Đang hoạt động</span>
                </p>
              </div>
            </div>

            {/* Bản đồ */}
            <div style={{ borderRadius: 12, overflow: 'hidden', marginTop: 16 }}>
              <iframe
                src="https://maps.google.com/maps?q=S%E1%BB%91+34+ng%C3%B5+445+Nguy%E1%BB%85n+Khang+C%E1%BA%A7u+Gi%E1%BA%A5y+H%C3%A0+N%E1%BB%99i&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height={380}
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ LT Motor"
              />
            </div>
          </div>

          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">🛎️</span> Dịch vụ tại showroom
            </h2>
            <div className="static-page__values">
              <div className="value-box">
                <div className="value-box__icon">🏍️</div>
                <p className="value-box__title">Mua xe mới</p>
                <p className="value-box__desc">
                  Trưng bày đầy đủ các dòng xe Honda, Yamaha, Suzuki mới nhất.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box__icon">🔄</div>
                <p className="value-box__title">Thu mua xe cũ</p>
                <p className="value-box__desc">
                  Định giá nhanh, trả tiền ngay, thủ tục đơn giản.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box__icon">💳</div>
                <p className="value-box__title">Tư vấn trả góp</p>
                <p className="value-box__desc">
                  Kết nối nhiều ngân hàng, lãi suất tốt, duyệt nhanh trong ngày.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box__icon">📋</div>
                <p className="value-box__title">Hỗ trợ đăng ký</p>
                <p className="value-box__desc">
                  Làm đăng ký xe, biển số nhanh chóng, đúng pháp luật.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box__icon">🔧</div>
                <p className="value-box__title">Bảo dưỡng</p>
                <p className="value-box__desc">
                  Dịch vụ bảo dưỡng định kỳ, sửa chữa bởi kỹ thuật viên được đào tạo.
                </p>
              </div>
              <div className="value-box">
                <div className="value-box__icon">🎁</div>
                <p className="value-box__title">Phụ kiện xe</p>
                <p className="value-box__desc">
                  Cung cấp phụ kiện chính hãng, mũ bảo hiểm, áo giáp bảo hộ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowroomPage;
