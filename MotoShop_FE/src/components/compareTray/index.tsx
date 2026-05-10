import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '~/redux/reducers';
import CompareAction from '~/redux/actions/compareAction';
import { API_URL_IMAGE, formatPrice } from '~/constants/utils';
import path from '~/constants/path';
import './styles.css';

const CompareTray = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.CompareReducer.items);

  if (items.length === 0) return null;

  return (
    <div className="compare-tray">
      <div className="compare-tray__inner container">
        <div className="compare-tray__label">
          <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
          So sánh
          <span className="compare-tray__count">{items.length}/4</span>
        </div>

        <div className="compare-tray__items">
          {items.map((item) => (
            <div key={item.id} className="compare-tray__item">
              <div className="compare-tray__item-img">
                <img src={`${API_URL_IMAGE}${item.img}`} alt={item.name} />
              </div>
              <div className="compare-tray__item-info">
                <p className="compare-tray__item-name">{item.name}</p>
                <p className="compare-tray__item-price">{formatPrice(item.salePrice || item.price)}</p>
              </div>
              <button
                className="compare-tray__item-remove"
                onClick={() => dispatch(CompareAction.removeFromCompare(item.id))}
                title="Xóa"
              >
                ×
              </button>
            </div>
          ))}

          {Array.from({ length: 4 - items.length }).map((_, i) => (
            <div key={`empty-${i}`} className="compare-tray__item compare-tray__item--empty">
              <div className="compare-tray__item-placeholder">+ Thêm xe</div>
            </div>
          ))}
        </div>

        <div className="compare-tray__actions">
          <button
            className="compare-tray__btn compare-tray__btn--primary"
            onClick={() => navigate(path.compare)}
            disabled={items.length < 2}
            title={items.length < 2 ? 'Chọn ít nhất 2 xe để so sánh' : ''}
          >
            So sánh ngay
          </button>
          <button
            className="compare-tray__btn compare-tray__btn--ghost"
            onClick={() => dispatch(CompareAction.clearCompare())}
          >
            Xóa tất cả
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareTray;
