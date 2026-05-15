import React, { useEffect, useRef, useState } from 'react';
import './InstallmentCalculator.css';
import { formatPrice } from '~/constants/utils';

interface Props {
  productPrice: number;
  productName: string;
  defaultDownPaymentPercent?: number;
  maxInstallmentMonths?: number;
  interestRatePerMonth?: number;
}

const MONTH_OPTIONS = [12, 18, 24, 36, 48, 60];

const InstallmentCalculator: React.FC<Props> = ({
  productPrice,
  productName,
  defaultDownPaymentPercent = 30,
  maxInstallmentMonths = 36,
  interestRatePerMonth = 1.2,
}) => {
  const [downPercent, setDownPercent] = useState(defaultDownPaymentPercent);
  const [selectedMonths, setSelectedMonths] = useState(24);
  const [interestRate, setInterestRate] = useState(interestRatePerMonth);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const availableMonths = MONTH_OPTIONS.filter((m) => m <= maxInstallmentMonths);

  // Auto-select the first available month on mount
  React.useEffect(() => {
    if (availableMonths.length > 0 && !availableMonths.includes(selectedMonths)) {
      setSelectedMonths(availableMonths[Math.floor(availableMonths.length / 2)] || availableMonths[0]);
    }
  }, [maxInstallmentMonths]);

  const downPayment = Math.round((productPrice * downPercent) / 100);
  const loanAmount = productPrice - downPayment;
  const r = interestRate / 100;

  // Annuity formula for monthly payment
  const monthlyPayment =
    r > 0
      ? Math.round((loanAmount * r * Math.pow(1 + r, selectedMonths)) / (Math.pow(1 + r, selectedMonths) - 1))
      : Math.round(loanAmount / selectedMonths);

  const totalInterestCalc = monthlyPayment * selectedMonths - loanAmount;
  const totalCost = downPayment + loanAmount + totalInterestCalc;

  // Donut chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const total = totalCost;
    const segments = [
      { value: downPayment, color: '#e53935' },
      { value: loanAmount, color: '#1e88e5' },
      { value: totalInterestCalc, color: '#fb8c00' },
    ];

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(cx, cy) - 10;
    const innerRadius = radius * 0.58;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let startAngle = -Math.PI / 2;
    segments.forEach((seg) => {
      const sliceAngle = (seg.value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Inner white circle (donut hole)
    ctx.beginPath();
    ctx.arc(cx, cy, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // Center text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#555';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Tổng chi phí', cx, cy - 6);
    ctx.fillStyle = '#e53935';
    ctx.font = 'bold 11.5px Inter, sans-serif';
    ctx.fillText(formatPrice(totalCost), cx, cy + 10);
  }, [downPayment, loanAmount, totalInterestCalc, totalCost]);

  return (
    <div className="ic-wrapper">
      <div className="ic-header">
        <div className="ic-header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </div>
        <div>
          <h3 className="ic-title">Bảng tính trả góp</h3>
          <p className="ic-subtitle">{productName}</p>
        </div>
      </div>

      <div className="ic-body">
        {/* Left: Controls */}
        <div className="ic-controls">
          {/* Vehicle Price */}
          <div className="ic-field">
            <label className="ic-label">Giá xe</label>
            <div className="ic-value-display">{formatPrice(productPrice)}</div>
          </div>

          {/* Down Payment Slider */}
          <div className="ic-field">
            <div className="ic-label-row">
              <label className="ic-label">Tỉ lệ trả trước</label>
              <span className="ic-badge ic-badge--red">{downPercent}% — {formatPrice(downPayment)}</span>
            </div>
            <div className="ic-slider-wrap">
              <input
                id="ic-slider-down"
                type="range"
                min={10}
                max={90}
                step={5}
                value={downPercent}
                className="ic-slider"
                onChange={(e) => setDownPercent(Number(e.target.value))}
                style={{ '--slider-percent': `${((downPercent - 10) / (90 - 10)) * 100}%` } as React.CSSProperties}
              />
              <div className="ic-slider-labels">
                <span>10%</span>
                <span>90%</span>
              </div>
            </div>
          </div>

          {/* Months */}
          <div className="ic-field">
            <label className="ic-label">Thời hạn vay</label>
            <div className="ic-months-grid">
              {availableMonths.map((m) => (
                <button
                  key={m}
                  className={`ic-month-btn ${selectedMonths === m ? 'active' : ''}`}
                  onClick={() => setSelectedMonths(m)}
                  type="button"
                >
                  {m} tháng
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div className="ic-field">
            <div className="ic-label-row">
              <label className="ic-label">Lãi suất tham khảo</label>
              <span className="ic-badge ic-badge--blue">{interestRate}%/tháng</span>
            </div>
            <div className="ic-slider-wrap">
              <input
                id="ic-slider-rate"
                type="range"
                min={0.5}
                max={2.5}
                step={0.1}
                value={interestRate}
                className="ic-slider"
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ '--slider-percent': `${((interestRate - 0.5) / (2.5 - 0.5)) * 100}%` } as React.CSSProperties}
              />
              <div className="ic-slider-labels">
                <span>0.5%</span>
                <span>2.5%</span>
              </div>
            </div>
          </div>

          <p className="ic-note">* Số liệu mang tính tham khảo. Liên hệ showroom để được tư vấn chính xác.</p>
        </div>

        {/* Right: Chart + Results */}
        <div className="ic-results">
          <div className="ic-chart-wrap">
            <canvas ref={canvasRef} width={200} height={200} className="ic-donut" />
          </div>

          <div className="ic-breakdown">
            <div className="ic-result-title">Kết quả dự toán</div>

            <div className="ic-result-item">
              <div className="ic-result-dot" style={{ background: '#e53935' }} />
              <div className="ic-result-info">
                <span className="ic-result-label">Trả trước ({downPercent}%)</span>
                <span className="ic-result-value" style={{ color: '#e53935' }}>{formatPrice(downPayment)}</span>
              </div>
            </div>

            <div className="ic-result-item">
              <div className="ic-result-dot" style={{ background: '#1e88e5' }} />
              <div className="ic-result-info">
                <span className="ic-result-label">Số tiền vay</span>
                <span className="ic-result-value" style={{ color: '#1e88e5' }}>{formatPrice(loanAmount)}</span>
              </div>
            </div>

            <div className="ic-result-item">
              <div className="ic-result-dot" style={{ background: '#fb8c00' }} />
              <div className="ic-result-info">
                <span className="ic-result-label">Tiền lãi ({selectedMonths} tháng)</span>
                <span className="ic-result-value" style={{ color: '#fb8c00' }}>{formatPrice(totalInterestCalc)}</span>
              </div>
            </div>

            <div className="ic-divider" />

            <div className="ic-result-monthly">
              <span className="ic-result-monthly-label">Góp mỗi tháng</span>
              <span className="ic-result-monthly-value">{formatPrice(monthlyPayment)}<small>/tháng</small></span>
            </div>

            <div className="ic-result-total">
              <span className="ic-result-total-label">Tổng thanh toán</span>
              <span className="ic-result-total-value">{formatPrice(totalCost)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentCalculator;
