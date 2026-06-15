import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '~/redux/reducers';
import CompareAction from '~/redux/actions/compareAction';
import productApi from '~/apis/product.apis';
import { Product } from '~/types/product.type';
import { formatPrice, resolveImageUrl } from '~/constants/utils';
import path from '~/constants/path';
import Breadcrum from '~/components/breadcrumb';
import './styles.css';

interface SpecRow {
  label: string;
  key: keyof Product | string;
  format?: (val: any) => string;
}

const SPECS: SpecRow[] = [
  { label: 'Giá bán', key: 'salePrice', format: (v) => (v ? formatPrice(v) : '—') },
  { label: 'Hãng xe', key: 'brand' },
  { label: 'Loại xe', key: 'vehicleType' },
  { label: 'Tình trạng', key: 'vehicleCondition', format: (v) => (v === 'used' ? 'Xe cũ' : 'Xe mới') },
  { label: 'Năm sản xuất', key: 'manufacturingYear', format: (v) => (v ? String(v) : '—') },
  { label: 'Số km đã đi', key: 'mileage', format: (v) => (v ? `${v.toLocaleString()} km` : '—') },
  { label: 'Loại động cơ', key: 'engineType' },
  { label: 'Dung tích', key: 'displacement', format: (v) => (v ? `${v} cc` : '—') },
  { label: 'Công suất tối đa', key: 'maxPower' },
  { label: 'Mô-men xoắn', key: 'maxTorque' },
  { label: 'Hộp số', key: 'transmission' },
  { label: 'Hệ thống nhiên liệu', key: 'fuelSystem' },
  { label: 'Dung tích bình xăng', key: 'fuelCapacity', format: (v) => (v ? `${v} lít` : '—') },
  { label: 'Tiêu thụ nhiên liệu', key: 'fuelConsumption' },
  { label: 'Kích thước tổng thể', key: 'dimensions' },
  { label: 'Trọng lượng', key: 'weight', format: (v) => (v ? `${v} kg` : '—') },
  { label: 'Chiều cao yên', key: 'seatHeight', format: (v) => (v ? `${v} mm` : '—') },
  { label: 'Khoảng sáng gầm', key: 'groundClearance', format: (v) => (v ? `${v} mm` : '—') },
  { label: 'Xuất xứ', key: 'origin' },
  { label: 'Bảo hành', key: 'warrantyInfo' },
  { label: 'Hỗ trợ trả góp', key: 'installmentSupported', format: (v) => (v ? 'Có' : 'Không') },
];

const getValue = (product: Product, row: SpecRow): string => {
  const raw = (product as any)[row.key];
  if (row.format) return row.format(raw);
  return raw != null && raw !== '' ? String(raw) : '—';
};

const ComparePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const compareItems = useSelector((state: RootState) => state.CompareReducer.items);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [highlightDiff, setHighlightDiff] = React.useState(false);
  const [onlyDiff, setOnlyDiff] = React.useState(false);

  React.useEffect(() => {
    if (compareItems.length === 0) {
      setLoading(false);
      return;
    }
    const fetchAll = async () => {
      setLoading(true);
      const results = await Promise.all(
        compareItems.map((item) =>
          productApi.getProduct(item.id).then((r) => r.data.data).catch(() => null)
        )
      );
      setProducts(results.filter(Boolean) as Product[]);
      setLoading(false);
    };
    fetchAll();
  }, [compareItems]);

  if (loading) {
    return (
      <div style={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Đang tải dữ liệu so sánh...</p>
      </div>
    );
  }

  if (compareItems.length === 0) {
    return (
      <>
        <Breadcrum title="So sánh xe" />
        <div className="compare-empty">
          <div className="compare-empty__icon">🏍️</div>
          <h2>Chưa có xe nào để so sánh</h2>
          <p>Hãy chọn ít nhất 2 xe từ danh sách sản phẩm để so sánh thông số kỹ thuật.</p>
          <button className="compare-empty__btn" onClick={() => navigate(path.product)}>
            Xem danh sách xe
          </button>
        </div>
      </>
    );
  }

  const isDifferent = (row: SpecRow): boolean => {
    if (products.length < 2) return false;
    const vals = products.map((p) => getValue(p, row));
    return vals.some((v) => v !== vals[0]);
  };

  const visibleSpecs = onlyDiff ? SPECS.filter(isDifferent) : SPECS;

  return (
    <>
      <Breadcrum title="So sánh xe" />
      <div className="compare-page container">
        <div className="compare-page__header">
          <h1 className="compare-page__title">So sánh xe máy</h1>
          <div className="compare-page__filters">
            <button
              className={`compare-filter-btn${highlightDiff ? ' active' : ''}`}
              onClick={() => setHighlightDiff((v) => !v)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={10}/><path d="M12 8v4M12 16h.01"/></svg>
              Hiển thị nổi bật
            </button>
            <button
              className={`compare-filter-btn${onlyDiff ? ' active' : ''}`}
              onClick={() => setOnlyDiff((v) => !v)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18M8 12h8M11 18h2"/></svg>
              Chỉ hiện khác biệt
            </button>
            <button
              className="compare-page__clear"
              onClick={() => { dispatch(CompareAction.clearCompare()); navigate(path.product); }}
            >
              ← Thêm xe khác
            </button>
          </div>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="compare-table__spec-col">Thông số</th>
                {products.map((p) => (
                  <th key={p.id} className="compare-table__product-col">
                    <div className="compare-table__product-header">
                      <button
                        className="compare-table__remove"
                        onClick={() => dispatch(CompareAction.removeFromCompare(p.id))}
                        title="Xóa khỏi so sánh"
                      >
                        ×
                      </button>
                      <div
                        className="compare-table__product-img"
                        onClick={() => navigate(path.detailProduct, { state: p.id })}
                      >
                        <img src={resolveImageUrl(p.images?.[0]?.url ?? '')} alt={p.name} />
                      </div>
                      <h3
                        className="compare-table__product-name"
                        onClick={() => navigate(path.detailProduct, { state: p.id })}
                      >
                        {p.name}
                      </h3>
                    </div>
                  </th>
                ))}
                {products.length < 4 && (
                  <th className="compare-table__product-col compare-table__add-col">
                    <div className="compare-table__add-slot" onClick={() => navigate(path.product)}>
                      <span className="compare-table__add-icon">+</span>
                      <span>Thêm xe</span>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {visibleSpecs.map((row) => {
                const diff = isDifferent(row);
                return (
                  <tr key={row.key} className={`compare-table__row${diff && highlightDiff ? ' compare-table__row--diff' : ''}`}>
                    <td className="compare-table__spec-label">{row.label}</td>
                    {products.map((p) => {
                      const val = getValue(p, row);
                      return (
                        <td key={p.id} className={`compare-table__value${diff && highlightDiff ? ' compare-table__value--diff' : ''}`}>
                          {row.key === 'salePrice' ? (
                            <span className="compare-table__price">{val}</span>
                          ) : (
                            val
                          )}
                        </td>
                      );
                    })}
                    {products.length < 4 && <td />}
                  </tr>
                );
              })}
              <tr className="compare-table__row compare-table__action-row">
                <td className="compare-table__spec-label"></td>
                {products.map((p) => (
                  <td key={p.id}>
                    <button
                      className="compare-table__detail-btn"
                      onClick={() => navigate(path.detailProduct, { state: p.id })}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                ))}
                {products.length < 4 && <td />}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ComparePage;
