import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import { toast } from 'react-toastify';
import consultApi, { ConsultRequestPayload } from '~/apis/consult.apis';
import { SHOP_INFO } from '~/constants/utils';
import './styles.css';

const VEHICLE_TYPES = ['Xe số', 'Xe tay ga', 'Xe côn tay', 'Xe điện'];
const BRANDS = ['Honda', 'Yamaha', 'Suzuki', 'TVS', 'SYM', 'Vinfast', 'GPX', 'Khác'];
const BUDGETS = [
  'Dưới 20 triệu',
  '20 – 30 triệu',
  '30 – 50 triệu',
  '50 – 80 triệu',
  'Trên 80 triệu',
];

const ConsultPage = () => {
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [vehicleType, setVehicleType] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [budget, setBudget] = React.useState('');
  const [vehicleInterest, setVehicleInterest] = React.useState('');
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
        vehicleType && `Loại xe: ${vehicleType}`,
        brand && `Hãng: ${brand}`,
        budget && `Ngân sách: ${budget}`,
        vehicleInterest && `Xe quan tâm: ${vehicleInterest}`,
        note && `Ghi chú: ${note}`,
      ].filter(Boolean).join(' | ');

      const payload: ConsultRequestPayload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        note: noteContent || undefined,
        productName: vehicleInterest || undefined,
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
      <Breadcrum title="Tư vấn mua bán xe" />

      {/* Hero banner */}
      <div className="consult-page__hero">
        <div className="container">
          <h1 className="consult-page__hero-title">Tư vấn mua – bán xe</h1>
          <p className="consult-page__hero-sub">
            Để lại thông tin, chuyên viên MotoShop sẽ liên hệ tư vấn miễn phí trong vòng <strong>30 phút</strong>
          </p>
        </div>
      </div>

      <div className="container consult-page__body">
        <div className="row">
          {/* Cột trái — form */}
          <div className="col-lg-7 col-md-12">
            <div className="consult-page__form-card">
              <h2 className="consult-page__form-title">📋 Đăng ký nhận tư vấn</h2>

              {submitted ? (
                <div className="consult-page__success">
                  <div className="consult-page__success-icon">✅</div>
                  <h3>Cảm ơn bạn đã đăng ký!</h3>
                  <p>Chuyên viên của MotoShop sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                  <button
                    className="consult-page__btn-again"
                    onClick={() => { setSubmitted(false); setFullName(''); setPhone(''); setEmail(''); setVehicleType(''); setBrand(''); setBudget(''); setVehicleInterest(''); setNote(''); }}
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="consult-page__form">
                  {/* Row 1: Tên + SĐT */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="consult-page__field">
                        <label htmlFor="cp-name">Tên khách hàng <span className="req">*</span></label>
                        <input id="cp-name" type="text" placeholder="Nguyễn Văn A" value={fullName} onChange={e => setFullName(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="consult-page__field">
                        <label htmlFor="cp-phone">Số điện thoại <span className="req">*</span></label>
                        <input id="cp-phone" type="tel" placeholder="0901234567" value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email */}
                  <div className="consult-page__field">
                    <label htmlFor="cp-email">Email (tuỳ chọn)</label>
                    <input id="cp-email" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>

                  {/* Row 3: Loại xe + Hãng */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="consult-page__field">
                        <label htmlFor="cp-type">Loại xe quan tâm</label>
                        <select id="cp-type" value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
                          <option value="">-- Chọn loại xe --</option>
                          {VEHICLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="consult-page__field">
                        <label htmlFor="cp-brand">Hãng xe</label>
                        <select id="cp-brand" value={brand} onChange={e => setBrand(e.target.value)}>
                          <option value="">-- Chọn hãng --</option>
                          {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Ngân sách */}
                  <div className="consult-page__field">
                    <label>Ngân sách dự kiến</label>
                    <div className="consult-page__budget-group">
                      {BUDGETS.map(b => (
                        <label key={b} className={`budget-chip ${budget === b ? 'active' : ''}`}>
                          <input type="radio" name="budget" value={b} checked={budget === b} onChange={() => setBudget(b)} />
                          {b}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Row 5: Mẫu xe */}
                  <div className="consult-page__field">
                    <label htmlFor="cp-vehicle">Mẫu xe bạn đang quan tâm</label>
                    <input id="cp-vehicle" type="text" placeholder="VD: Honda Air Blade 125, Yamaha Exciter 155..." value={vehicleInterest} onChange={e => setVehicleInterest(e.target.value)} />
                  </div>

                  {/* Row 6: Ghi chú */}
                  <div className="consult-page__field">
                    <label htmlFor="cp-note">Ghi chú thêm</label>
                    <textarea id="cp-note" rows={3} placeholder="Mua xe mới hay xe cũ? Cần hỗ trợ trả góp? Thời gian liên hệ phù hợp?..." value={note} onChange={e => setNote(e.target.value)} />
                  </div>

                  <button type="submit" className="consult-page__submit" disabled={loading}>
                    {loading ? 'Đang gửi...' : 'Nhận tư vấn miễn phí →'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Cột phải — thông tin */}
          <div className="col-lg-5 col-md-12">
            {/* Hotline card */}
            <div className="consult-page__info-card consult-page__info-card--red">
              <div className="info-card__icon">📞</div>
              <div>
                <p className="info-card__label">Hotline hỗ trợ</p>
                <a href={`tel:${SHOP_INFO.phone}`} className="info-card__value">{SHOP_INFO.phoneDisplay}</a>
              </div>
            </div>

            {/* Giờ làm việc */}
            <div className="consult-page__info-card">
              <div className="info-card__icon">🕐</div>
              <div>
                <p className="info-card__label">Giờ làm việc</p>
                <p className="info-card__value">{SHOP_INFO.hoursWeekdays}</p>
                <p className="info-card__sub">{SHOP_INFO.hoursSunday}</p>
              </div>
            </div>

            {/* Quy trình */}
            <div className="consult-page__process">
              <h3 className="process__title">Quy trình tư vấn</h3>
              <div className="process__steps">
                {[
                  { step: '1', title: 'Gửi thông tin', desc: 'Điền form bên cạnh hoặc gọi hotline' },
                  { step: '2', title: 'Chuyên viên liên hệ', desc: 'Trong vòng 30 phút giờ hành chính' },
                  { step: '3', title: 'Tư vấn & Báo giá', desc: 'Miễn phí, không ràng buộc' },
                  { step: '4', title: 'Đến showroom', desc: 'Xem xe thực tế & ký hợp đồng' },
                ].map(item => (
                  <div key={item.step} className="process__step">
                    <div className="process__step-num">{item.step}</div>
                    <div>
                      <p className="process__step-title">{item.title}</p>
                      <p className="process__step-desc">{item.desc}</p>
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

export default ConsultPage;
