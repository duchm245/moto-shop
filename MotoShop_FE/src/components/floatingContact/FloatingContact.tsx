import React from 'react';
import ConsultModal from '~/components/consultModal/ConsultModal';
import { SHOP_INFO } from '~/constants/utils';
import './FloatingContact.css';

const FloatingContact: React.FC = () => {
  const [consultOpen, setConsultOpen] = React.useState(false);

  return (
    <>
      <div className="fc-wrapper">

        {/* ── Nút Gọi điện (3 vòng tròn đồng tâm) ── */}
        <div className="fc-phone-ring">
          <div className="fc-outer-ring" />
          <div className="fc-mid-ring" />
          <a
            href={`tel:${SHOP_INFO.phone}`}
            className="fc-inner-btn fc-inner-btn--phone"
            aria-label="Gọi điện tư vấn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </a>
        </div>

        {/* ── Nút Zalo ── */}
        <a
          href={`https://zalo.me/${SHOP_INFO.zaloPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fc-simple-btn fc-simple-btn--zalo"
          aria-label="Chat Zalo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="26" height="26">
            <path fill="white" d="M32 2C15.43 2 2 15.43 2 32s13.43 30 30 30 30-13.43 30-30S48.57 2 32 2zm14.5 41.5H18v-3l16-17H19v-4h26.5v3l-16 17H46.5v4z"/>
          </svg>
          <span className="fc-simple-label">Zalo</span>
        </a>

        {/* ── Nút Tư vấn online ── */}
        <button
          className="fc-simple-btn fc-simple-btn--consult"
          aria-label="Tư vấn online"
          onClick={() => setConsultOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="22" height="22">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
          <span className="fc-simple-label">Tư vấn</span>
        </button>

      </div>

      <ConsultModal isOpen={consultOpen} onClose={() => setConsultOpen(false)} />
    </>
  );
};

export default FloatingContact;
