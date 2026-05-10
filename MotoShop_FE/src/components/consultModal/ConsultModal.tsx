import React from 'react';
import { toast } from 'react-toastify';
import consultApi, { ConsultRequestPayload } from '~/apis/consult.apis';
import './ConsultModal.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productId?: number;
  productName?: string;
  defaultPhone?: string;
  defaultName?: string;
}

const ConsultModal: React.FC<Props> = ({
  isOpen,
  onClose,
  productId,
  productName,
  defaultPhone = '',
  defaultName = '',
}) => {
  const [fullName, setFullName] = React.useState(defaultName);
  const [phone, setPhone] = React.useState(defaultPhone);
  const [email, setEmail] = React.useState('');
  const [note, setNote] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setFullName(defaultName);
      setPhone(defaultPhone);
      setEmail('');
      setNote(productName || '');
    }
  }, [isOpen, defaultName, defaultPhone, productName]);

  if (!isOpen) return null;

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
      const payload: ConsultRequestPayload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        note: note.trim() || undefined,
        productId,
        productName,
      };
      await consultApi.create(payload);
      toast.success('Yêu cầu tư vấn đã được ghi nhận! Chúng tôi sẽ liên hệ sớm.', {
        theme: 'dark',
        position: 'top-right',
      });
      onClose();
    } catch {
      toast.error('Gửi yêu cầu thất bại, vui lòng thử lại.', { theme: 'dark', position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consult-overlay" onClick={onClose}>
      <div className="consult-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="consult-modal__header">
          <div className="consult-modal__icon">📞</div>
          <div>
            <h2 className="consult-modal__title">Yêu cầu tư vấn</h2>
            {productName && (
              <p className="consult-modal__subtitle">Xe: <strong>{productName}</strong></p>
            )}
          </div>
          <button className="consult-modal__close" onClick={onClose} aria-label="Đóng">✕</button>
        </div>

        {/* Body */}
        <form className="consult-modal__body" onSubmit={handleSubmit}>
          <div className="consult-field">
            <label className="consult-label" htmlFor="consult-name">
              Tên khách hàng <span className="consult-required">*</span>
            </label>
            <input
              id="consult-name"
              className="consult-input"
              type="text"
              placeholder="Nguyễn Văn A"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="consult-field">
            <label className="consult-label" htmlFor="consult-phone">
              Số điện thoại <span className="consult-required">*</span>
            </label>
            <input
              id="consult-phone"
              className="consult-input"
              type="tel"
              placeholder="0901234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="consult-field">
            <label className="consult-label" htmlFor="consult-vehicle">Mẫu xe bạn đang quan tâm</label>
            <input
              id="consult-vehicle"
              className="consult-input"
              type="text"
              placeholder="VD: Honda Air Blade 125, Yamaha Exciter..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="consult-field">
            <label className="consult-label" htmlFor="consult-email">Email (tuỳ chọn)</label>
            <input
              id="consult-email"
              className="consult-input"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="consult-modal__footer">
            <button type="button" className="consult-btn consult-btn--cancel" onClick={onClose}>
              Huỷ
            </button>
            <button type="submit" className="consult-btn consult-btn--submit" disabled={loading}>
              {loading ? 'Đang gửi...' : 'Nhận tư vấn →'}
            </button>
          </div>

          <div className="consult-hotline">
            <span>Hotline hỗ trợ: </span>
            <a href="tel:19001234" className="consult-hotline__number">1900.1234</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultModal;

