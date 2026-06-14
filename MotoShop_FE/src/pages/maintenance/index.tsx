import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import { toast } from 'react-toastify';
import consultApi, { ConsultRequestPayload } from '~/apis/consult.apis';
import { SHOP_INFO } from '~/constants/utils';
import '../consult/styles.css';
import './styles.css';

const SERVICES = [
  { icon: '🛢️', name: 'Thay dầu nhớt', time: '15 phút', price: '80.000đ', desc: 'Dầu chính hãng, thay nhanh tại chỗ' },
  { icon: '🔧', name: 'Bảo dưỡng định kỳ', time: '45–60 phút', price: 'Từ 150.000đ', desc: 'Kiểm tra toàn bộ, thay lọc, chỉnh bu-gi' },
  { icon: '🛞', name: 'Thay vá lốp xe', time: '20–30 phút', price: 'Từ 50.000đ', desc: 'Vá nhanh hoặc thay lốp mới chính hãng' },
  { icon: '⚡', name: 'Kiểm tra điện – Ắc quy', time: '30 phút', price: 'Từ 100.000đ', desc: 'Bình điện, hệ thống đèn, xi-nhan' },
  { icon: '🔩', name: 'Sửa chữa động cơ', time: 'Theo yêu cầu', price: 'Báo giá trực tiếp', desc: 'Đại tu, sửa phanh, hộp số, trục xe' },
  { icon: '🧴', name: 'Rửa xe – Vệ sinh', time: '20 phút', price: 'Từ 30.000đ', desc: 'Rửa toàn bộ, vệ sinh buồng đốt' },
];

const SCHEDULES = [
  { km: '1.000 km', items: ['Kiểm tra áp suất lốp', 'Kiểm tra mức dầu nhớt', 'Kiểm tra phanh & đèn', 'Vệ sinh sơ bộ'] },
  { km: '3.000 km', items: ['Thay dầu nhớt', 'Vệ sinh bộ lọc gió', 'Kiểm tra dây côn / phanh', 'Kiểm tra bu-gi'] },
  { km: '6.000 km', items: ['Thay lọc dầu', 'Thay bu-gi (nếu cần)', 'Kiểm tra nhiên liệu & kim phun', 'Kiểm tra độ mòn lốp'] },
  { km: '12.000 km', items: ['Thay dầu hộp số', 'Kiểm tra hệ thống điện', 'Tra mỡ bạc đạn bánh xe', 'Vệ sinh tổng thể động cơ'] },
];

const STEPS = [
  { title: 'Đặt lịch trước', desc: 'Điền form hoặc gọi hotline để đặt lịch' },
  { title: 'Mang xe đến', desc: 'Đến đúng giờ hẹn, tiếp đón ngay không chờ đợi' },
  { title: 'Chẩn đoán miễn phí', desc: 'Chuyên viên kiểm tra và báo giá trước khi làm' },
  { title: 'Nhận xe & Thanh toán', desc: 'Bảo hành dịch vụ, hóa đơn rõ ràng' },
];

const MaintenancePage = () => {
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [selectedService, setSelectedService] = React.useState('');
  const [preferTime, setPreferTime] = React.useState('');
  const [note, setNote] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast.error('Vui lòng nhập họ tên', { theme: 'dark', position: 'top-right' });
      return;
    }
    const phoneRegex = /^0[0-9]{9}$/;
    if (!phoneRegex.test(phone.trim())) {
      toast.error('Số điện thoại không hợp lệ (VD: 0901234567)', { theme: 'dark', position: 'top-right' });
      return;
    }
    try {
      setLoading(true);
      const noteContent = [
        '[Dịch vụ: Bảo dưỡng xe máy]',
        selectedService && `Dịch vụ: ${selectedService}`,
        preferTime && `Thời gian mong muốn: ${preferTime}`,
        note && `Ghi chú: ${note}`,
      ].filter(Boolean).join(' | ');

      const payload: ConsultRequestPayload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        note: noteContent,
      };
      await consultApi.create(payload);
      setSubmitted(true);
    } catch {
      toast.error('Gửi yêu cầu thất bại, vui lòng thử lại.', { theme: 'dark', position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Breadcrum title="Bảo dưỡng xe máy" />

      {/* Hero */}
      <div className="service-hero service-hero--maintenance">
        <div className="container">
          <div className="service-hero__badge">🔧 Dịch vụ kỹ thuật chuyên nghiệp</div>
          <h1 className="service-hero__title">Bảo dưỡng xe máy</h1>
          <p className="service-hero__sub">
            Đội ngũ kỹ thuật viên được đào tạo bài bản – Phụ tùng chính hãng – Bảo hành dịch vụ
          </p>
          <a href={`tel:${SHOP_INFO.phone}`} className="service-hero__cta">
            📞 Đặt lịch ngay: {SHOP_INFO.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Bảng giá dịch vụ */}
      <div className="maintenance-services">
        <div className="container">
          <h2 className="section-title">Dịch vụ & Bảng giá</h2>
          <div className="maintenance-services__grid">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className={`maintenance-service-card ${selectedService === s.name ? 'selected' : ''}`}
                onClick={() => setSelectedService(s.name)}
              >
                <div className="maintenance-service-card__icon">{s.icon}</div>
                <h3>{s.name}</h3>
                <p className="maintenance-service-card__desc">{s.desc}</p>
                <div className="maintenance-service-card__meta">
                  <span className="maintenance-service-card__time">⏱ {s.time}</span>
                  <span className="maintenance-service-card__price">{s.price}</span>
                </div>
                {selectedService === s.name && <div className="maintenance-service-card__selected-badge">✓ Đã chọn</div>}
              </div>
            ))}
          </div>
          <p className="maintenance-services__note">* Giá trên chưa bao gồm phụ tùng. Báo giá cuối cùng sau khi chẩn đoán xe.</p>
        </div>
      </div>

      {/* Lịch bảo dưỡng định kỳ */}
      <div className="maintenance-schedule">
        <div className="container">
          <h2 className="section-title">Lịch bảo dưỡng định kỳ khuyến nghị</h2>
          <div className="maintenance-schedule__grid">
            {SCHEDULES.map((s) => (
              <div className="maintenance-schedule-card" key={s.km}>
                <div className="maintenance-schedule-card__km">Mỗi {s.km}</div>
                <ul>
                  {s.items.map((item) => (
                    <li key={item}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form đặt lịch + Thông tin */}
      <div className="container consult-page__body">
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="consult-page__form-card">
              <h2 className="consult-page__form-title">📅 Đặt lịch bảo dưỡng</h2>
              {selectedService && (
                <div className="maintenance-selected-service">
                  Dịch vụ đã chọn: <strong>{selectedService}</strong>
                  <button onClick={() => setSelectedService('')}>✕</button>
                </div>
              )}

              {submitted ? (
                <div className="consult-page__success">
                  <div className="consult-page__success-icon">✅</div>
                  <h3>Đặt lịch thành công!</h3>
                  <p>Chuyên viên MotoShop sẽ xác nhận lịch hẹn với bạn trong thời gian sớm nhất.</p>
                  <button
                    className="consult-page__btn-again"
                    onClick={() => { setSubmitted(false); setFullName(''); setPhone(''); setSelectedService(''); setPreferTime(''); setNote(''); }}
                  >
                    Đặt lịch khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="consult-page__form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="consult-page__field">
                        <label htmlFor="mt-name">Họ tên <span className="req">*</span></label>
                        <input id="mt-name" type="text" placeholder="Nguyễn Văn A" value={fullName} onChange={e => setFullName(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="consult-page__field">
                        <label htmlFor="mt-phone">Số điện thoại <span className="req">*</span></label>
                        <input id="mt-phone" type="tel" placeholder="0901234567" value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="consult-page__field">
                    <label htmlFor="mt-service">Dịch vụ cần thực hiện</label>
                    <select id="mt-service" value={selectedService} onChange={e => setSelectedService(e.target.value)}>
                      <option value="">-- Chọn dịch vụ --</option>
                      {SERVICES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                      <option value="Khác">Khác (ghi rõ ở ghi chú)</option>
                    </select>
                  </div>

                  <div className="consult-page__field">
                    <label htmlFor="mt-time">Thời gian mong muốn</label>
                    <input id="mt-time" type="text" placeholder="VD: Sáng thứ 2, 8h-10h hoặc Chiều cuối tuần..." value={preferTime} onChange={e => setPreferTime(e.target.value)} />
                  </div>

                  <div className="consult-page__field">
                    <label htmlFor="mt-note">Mô tả vấn đề / Ghi chú thêm</label>
                    <textarea id="mt-note" rows={3} placeholder="Xe có triệu chứng gì bất thường? Số km đã đi? Muốn thay phụ tùng nào?..." value={note} onChange={e => setNote(e.target.value)} />
                  </div>

                  <button type="submit" className="consult-page__submit" disabled={loading}>
                    {loading ? 'Đang gửi...' : '📅 Đặt lịch bảo dưỡng →'}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="col-lg-5 col-md-12">
            <div className="consult-page__info-card consult-page__info-card--red">
              <div className="info-card__icon">📞</div>
              <div>
                <p className="info-card__label">Hotline kỹ thuật</p>
                <a href={`tel:${SHOP_INFO.phone}`} className="info-card__value">{SHOP_INFO.phoneDisplay}</a>
              </div>
            </div>

            <div className="consult-page__info-card">
              <div className="info-card__icon">🕐</div>
              <div>
                <p className="info-card__label">Giờ tiếp nhận xe</p>
                <p className="info-card__value">{SHOP_INFO.hoursWeekdays}</p>
                <p className="info-card__sub">{SHOP_INFO.hoursSunday}</p>
              </div>
            </div>

            <div className="consult-page__process">
              <h3 className="process__title">Quy trình bảo dưỡng</h3>
              <div className="process__steps">
                {STEPS.map((s, i) => (
                  <div key={i} className="process__step">
                    <div className="process__step-num">{i + 1}</div>
                    <div>
                      <p className="process__step-title">{s.title}</p>
                      <p className="process__step-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
