import React, { useState } from 'react';
import Breadcrum from '~/components/breadcrumb';
import InstallmentCalculator from '~/components/installmentCalculator/InstallmentCalculator';
import './InstallmentPage.css';

const DOCS = [
  {
    num: '01',
    text: 'Bản sao CMND/CCCD và hộ khẩu (photo nguyên cuốn, không cần sao y) kèm bản chính để đối chiếu.',
  },
  {
    num: '02',
    text: '01 số điện thoại cố định hoặc 02 số điện thoại di động của người thân.',
  },
  {
    num: '03',
    text: 'Khách hàng được bảo hiểm khoản vay miễn phí trong suốt thời gian vay.',
  },
  {
    num: '04',
    text: 'Với bảo hiểm khoản vay, khách hàng sẽ không phải trả nợ trong trường hợp rủi ro xảy ra.',
  },
];

const INFO_BLOCKS = [
  {
    side: 'left' as const,
    img: 'https://kuongngan.com/wp-content/uploads/2023/07/IMG_4020.png',
    content: (
      <>
        <h3>Vay mua xe trả góp với HDSaison:</h3>
        <ul>
          <li>Với lãi suất thấp nhất 1,49%.</li>
          <li>Được tặng ngay thẻ bảo hiểm.</li>
        </ul>
        <h3>Khoản vay</h3>
        <ul>
          <li>Không cần thế chấp.</li>
          <li>Số tiền trả trước thấp.</li>
          <li>Kỳ hạn thanh toán: 6 đến 60 tháng.</li>
          <li>Xét duyệt nhanh, thủ tục đơn giản.</li>
        </ul>
      </>
    ),
  },
  {
    side: 'right' as const,
    img: 'https://kuongngan.com/wp-content/uploads/2023/07/104369806_3626528367375365_1530922756350618424_n.png',
    content: (
      <>
        <h3>Ưu điểm của thẻ:</h3>
        <ul>
          <li>Miễn phí bảo hiểm khoản vay.</li>
        </ul>
        <h3>HDSaison qua HD Bank</h3>
        <ul>
          <li>Miễn phí phát hành, phí thường niên năm đầu.</li>
          <li>Miễn phí rút tiền tại máy ATM.</li>
        </ul>
      </>
    ),
  },
  {
    side: 'left' as const,
    img: 'https://kuongngan.com/wp-content/uploads/2023/07/LJarDdxfY7eXmw8vyYhm-scaled.jpg',
    content: (
      <>
        <h3>HD Bank và các ngân hàng khác trên toàn quốc</h3>
        <ul>
          <li>Miễn phí sử dụng dịch vụ ngân hàng điện tử HDBank eBanking 24/7.</li>
          <li>Tận hưởng cộng đồng ưu đãi HDBank.</li>
          <li>Tích điểm đổi quà / hoàn tiền khi thanh toán bằng thẻ.</li>
        </ul>
        <h3>Phương thức thanh toán khoản vay</h3>
        <ul>
          <li>
            Thanh toán qua hệ thống: HDBank, SeABank, Ngân hàng Đông Á, Sacombank, BIDV, MHB và Bưu điện.
          </li>
        </ul>
      </>
    ),
  },
];

const BANKS = [
  { name: 'HDSaison', rate: 1.49 },
  { name: 'ACB', rate: 1.2 },
  { name: 'SHB', rate: 0.72 },
  { name: 'Sacombank', rate: 0.71 },
  { name: 'SeABank', rate: 0.63 },
  { name: 'BIDV', rate: 0.65 },
];

const InstallmentPage: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState(BANKS[0]);
  const [vehiclePrice, setVehiclePrice] = useState(80_000_000);
  const [priceInput, setPriceInput] = useState('80.000.000');

  const handlePriceChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    const num = parseInt(digits || '0', 10);
    setVehiclePrice(num);
    setPriceInput(num.toLocaleString('vi-VN'));
  };

  return (
    <>
      <Breadcrum title="Mua xe trả góp" />

      {/* ── BANNER ── */}
      <div className="ip-banner">
        <img
          src="https://kuongngan.com/wp-content/uploads/2023/07/fkeaYaS5YGfjlEztEYjS.jpg"
          alt="Mua xe trả góp"
        />
      </div>

      {/* ── SECTION 1: Hướng dẫn thủ tục ── */}
      <section className="ip-section">
        <div className="container">
          <h2 className="ip-section-title">Hướng dẫn thủ tục mua xe trả góp</h2>

          {INFO_BLOCKS.map((block, i) => (
            <div
              key={i}
              className={`ip-info-row ${block.side === 'right' ? 'ip-info-row--reverse' : ''}`}
            >
              <div className="ip-info-img">
                <img src={block.img} alt="" loading="lazy" />
              </div>
              <div className="ip-info-content">{block.content}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: Hồ sơ xét duyệt ── */}
      <section className="ip-section ip-docs-section">
        <div className="container">
          <h2 className="ip-section-title">Hồ sơ xét duyệt khoản vay</h2>
          <div className="ip-docs-grid">
            {DOCS.map((d) => (
              <div className="ip-doc-card" key={d.num}>
                <div className="ip-doc-num">{d.num}</div>
                <p className="ip-doc-text">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Bảng tính trả góp ── */}
      <section className="ip-section ip-calc-section">
        <div className="container">
          <h2 className="ip-section-title">Mua xe trả góp – Bảng tính chi phí</h2>

          {/* Chọn ngân hàng & nhập giá xe */}
          <div className="ip-calc-controls">
            <div className="ip-calc-control-group">
              <label>Giá xe (VNĐ)</label>
              <input
                type="text"
                value={priceInput}
                onChange={(e) => handlePriceChange(e.target.value)}
                placeholder="80.000.000"
                className="ip-price-input"
              />
              <div className="ip-presets">
                {[50_000_000, 80_000_000, 100_000_000, 150_000_000].map((p) => (
                  <button
                    key={p}
                    className={`ip-preset-btn ${vehiclePrice === p ? 'active' : ''}`}
                    onClick={() => { setVehiclePrice(p); setPriceInput(p.toLocaleString('vi-VN')); }}
                    type="button"
                  >
                    {(p / 1_000_000).toFixed(0)} triệu
                  </button>
                ))}
              </div>
            </div>

            <div className="ip-calc-control-group">
              <label>Ngân hàng / Lãi suất</label>
              <div className="ip-bank-tabs">
                {BANKS.map((b) => (
                  <button
                    key={b.name}
                    className={`ip-bank-tab ${selectedBank.name === b.name ? 'active' : ''}`}
                    onClick={() => setSelectedBank(b)}
                    type="button"
                  >
                    {b.name}
                    <span>{b.rate}%/tháng</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <InstallmentCalculator
            productPrice={vehiclePrice > 0 ? vehiclePrice : 80_000_000}
            productName={`${selectedBank.name} · Lãi suất ${selectedBank.rate}%/tháng`}
            defaultDownPaymentPercent={30}
            maxInstallmentMonths={60}
            interestRatePerMonth={selectedBank.rate}
          />

          <p className="ip-disclaimer">
            * Số liệu mang tính tham khảo. Lãi suất thực tế phụ thuộc vào ngân hàng và hồ sơ của khách hàng.
            Vui lòng liên hệ showroom để được tư vấn chính xác.
          </p>
        </div>
      </section>
    </>
  );
};

export default InstallmentPage;
