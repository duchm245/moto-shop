import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import { toast } from 'react-toastify';
import consultApi, { ConsultRequestPayload } from '~/apis/consult.apis';
import { SHOP_INFO } from '~/constants/utils';
import '../consult/styles.css';
import './styles.css';

const BIKE_TYPES = ['Xe số', 'Xe tay ga', 'Xe côn tay', 'Xe điện'];
const BRANDS = ['Honda', 'Yamaha', 'Suzuki', 'SYM', 'TVS', 'Vinfast', 'Hãng khác'];
const BIKE_AGES = ['Dưới 1 năm', '1 – 3 năm', '3 – 5 năm', 'Trên 5 năm'];

const STEPS = [
  { icon: '📋', title: 'Đăng ký online', desc: 'Điền thông tin xe vào form bên dưới' },
  { icon: '📞', title: 'Nhân viên liên hệ', desc: 'Xác nhận thông tin & hẹn lịch trong 30 phút' },
  { icon: '🔍', title: 'Kiểm định xe', desc: 'Chuyên viên kiểm tra thực tế tại showroom hoặc tại nhà' },
  { icon: '💰', title: 'Nhận tiền ngay', desc: 'Thanh toán tiền mặt hoặc chuyển khoản trong ngày' },
];

const BENEFITS = [
  { icon: '⚡', title: 'Định giá trong 30 phút', desc: 'Hệ thống định giá tự động kết hợp chuyên viên giàu kinh nghiệm' },
  { icon: '💵', title: 'Giá tốt nhất thị trường', desc: 'Cam kết thu mua với giá cao, cạnh tranh minh bạch' },
  { icon: '🏠', title: 'Kiểm định tận nhà', desc: 'Chuyên viên đến kiểm định tại địa chỉ của bạn miễn phí' },
  { icon: '📄', title: 'Thủ tục nhanh gọn', desc: 'Hỗ trợ sang tên, sang chủ đầy đủ giấy tờ pháp lý' },
];

const UsedBikePage = () => {
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [bikeType, setBikeType] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [bikeAge, setBikeAge] = React.useState('');
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
        '[Dịch vụ: Mua xe cũ]',
        bikeType && `Loại xe: ${bikeType}`,
        brand && `Hãng: ${brand}`,
        model && `Mẫu xe: ${model}`,
        bikeAge && `Năm sử dụng: ${bikeAge}`,
        note && `Ghi chú: ${note}`,
      ].filter(Boolean).join(' | ');

      const payload: ConsultRequestPayload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        note: noteContent,
        productName: model || undefined,
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
      <Breadcrum title="Mua xe cũ" />

      {/* Hero */}
      <div className="service-hero service-hero--used">
        <div className="container">
          <div className="service-hero__badge">🔄 Thu mua – Bán lại xe cũ</div>
          <h1 className="service-hero__title">Mua xe cũ giá tốt nhất</h1>
          <p className="service-hero__sub">
            Định giá xe nhanh chóng – Thanh toán ngay trong ngày – Thủ tục pháp lý đầy đủ
          </p>
          <a href={`tel:${SHOP_INFO.phone}`} className="service-hero__cta">
            📞 Gọi ngay: {SHOP_INFO.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Lợi ích */}
      <div className="service-benefits">
        <div className="container">
          <div className="service-benefits__grid">
            {BENEFITS.map((b) => (
              <div className="service-benefit-card" key={b.title}>
                <div className="service-benefit-card__icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container consult-page__body">
        <div className="row">
          {/* Cột trái — form */}
          <div className="col-lg-7 col-md-12">
            <div className="consult-page__form-card">
              <h2 className="consult-page__form-title">🚗 Đăng ký định giá xe miễn phí</h2>

              {submitted ? (
                <div className="consult-page__success">
                  <div className="consult-page__success-icon">✅</div>
                  <h3>Đăng ký thành công!</h3>
                  <p>Chuyên viên MotoShop sẽ liên hệ để định giá xe của bạn trong thời gian sớm nhất.</p>
                  <button
                    className="consult-page__btn-again"
                    onClick={() => { setSubmitted(false); setFullName(''); setPhone(''); setEmail(''); setBikeType(''); setBrand(''); setModel(''); setBikeAge(''); setNote(''); }}
                  >
                    Đăng ký xe khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="consult-page__form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="consult-page__field">
                        <label htmlFor="ub-name">Họ tên <span className="req">*</span></label>
                        <input id="ub-name" type="text" placeholder="Nguyễn Văn A" value={fullName} onChange={e => setFullName(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="consult-page__field">
                        <label htmlFor="ub-phone">Số điện thoại <span className="req">*</span></label>
                        <input id="ub-phone" type="tel" placeholder="0901234567" value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="consult-page__field">
                    <label htmlFor="ub-email">Email (tuỳ chọn)</label>
                    <input id="ub-email" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="consult-page__field">
                        <label htmlFor="ub-type">Loại xe <span className="req">*</span></label>
                        <select id="ub-type" value={bikeType} onChange={e => setBikeType(e.target.value)}>
                          <option value="">-- Chọn loại xe --</option>
                          {BIKE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="consult-page__field">
                        <label htmlFor="ub-brand">Hãng xe <span className="req">*</span></label>
                        <select id="ub-brand" value={brand} onChange={e => setBrand(e.target.value)}>
                          <option value="">-- Chọn hãng --</option>
                          {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="consult-page__field">
                    <label htmlFor="ub-model">Tên mẫu xe (VD: Wave Alpha 110, Exciter 155...)</label>
                    <input id="ub-model" type="text" placeholder="Nhập tên xe cụ thể" value={model} onChange={e => setModel(e.target.value)} />
                  </div>

                  <div className="consult-page__field">
                    <label>Thời gian đã sử dụng</label>
                    <div className="consult-page__budget-group">
                      {BIKE_AGES.map(a => (
                        <label key={a} className={`budget-chip ${bikeAge === a ? 'active' : ''}`}>
                          <input type="radio" name="bikeAge" value={a} checked={bikeAge === a} onChange={() => setBikeAge(a)} />
                          {a}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="consult-page__field">
                    <label htmlFor="ub-note">Tình trạng xe / Ghi chú thêm</label>
                    <textarea id="ub-note" rows={3} placeholder="Xe còn nguyên zin? Đã sửa chữa bộ phận nào? Số km đã đi?..." value={note} onChange={e => setNote(e.target.value)} />
                  </div>

                  <button type="submit" className="consult-page__submit" disabled={loading}>
                    {loading ? 'Đang gửi...' : '🚀 Đăng ký định giá miễn phí →'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Cột phải */}
          <div className="col-lg-5 col-md-12">
            <div className="consult-page__info-card consult-page__info-card--red">
              <div className="info-card__icon">📞</div>
              <div>
                <p className="info-card__label">Hotline thu mua xe cũ</p>
                <a href={`tel:${SHOP_INFO.phone}`} className="info-card__value">{SHOP_INFO.phoneDisplay}</a>
              </div>
            </div>

            <div className="consult-page__info-card">
              <div className="info-card__icon">🕐</div>
              <div>
                <p className="info-card__label">Giờ làm việc</p>
                <p className="info-card__value">{SHOP_INFO.hoursWeekdays}</p>
                <p className="info-card__sub">{SHOP_INFO.hoursSunday}</p>
              </div>
            </div>

            <div className="consult-page__process">
              <h3 className="process__title">Quy trình thu mua xe cũ</h3>
              <div className="process__steps">
                {STEPS.map((s, i) => (
                  <div key={i} className="process__step">
                    <div className="process__step-num">{i + 1}</div>
                    <div>
                      <p className="process__step-title">{s.icon} {s.title}</p>
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

export default UsedBikePage;
