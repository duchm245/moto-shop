import React from 'react';
import { useSelector } from 'react-redux';
import { REQUEST_API } from '~/constants/method';
import { API_URL } from '~/constants/utils';
import { RootState } from '~/redux/reducers';
import { toast } from 'react-toastify';
import './styles.css';

interface ConsultItem {
  id: number;
  fullName: string;
  phone: string;
  email?: string;
  note?: string;
  productId?: number;
  productName?: string;
  status: number; // 0: Chờ xử lý, 1: Đang xử lý, 2: Đã xong
  createdDate: string;
  updatedDate: string;
  staffNote?: string;
}

const STATUS_OPTIONS = [
  { value: -1, label: 'Tất cả',      color: '#6c757d' },
  { value: 0,  label: 'Chờ xử lý',  color: '#f39c12' },
  { value: 1,  label: 'Đang xử lý', color: '#3498db' },
  { value: 2,  label: 'Đã xong',    color: '#27ae60' },
];

const STATUS_SELECTABLE = [
  { value: 0, label: 'Chờ xử lý',  color: '#f39c12' },
  { value: 1, label: 'Đang xử lý', color: '#3498db' },
  { value: 2, label: 'Đã xong',    color: '#27ae60' },
];

const getStatusBadge = (status: number) => {
  const s = STATUS_OPTIONS.find(o => o.value === status);
  return s ? { label: s.label, color: s.color } : { label: 'Không rõ', color: '#999' };
};

const formatDateStr = (dateStr: string) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleString('vi-VN');
};

const ChatPage = () => {
  const token = useSelector((state: RootState) => state.ReducerAuth.token);

  const [items, setItems]                   = React.useState<ConsultItem[]>([]);
  const [loading, setLoading]               = React.useState(false);
  const [filterStatus, setFilterStatus]     = React.useState<number>(-1);
  const [page, setPage]                     = React.useState(0);
  const [totalPages, setTotalPages]         = React.useState(0);
  const [totalElements, setTotalElements]   = React.useState(0);

  // Modal state
  const [selectedItem, setSelectedItem]     = React.useState<ConsultItem | null>(null);
  const [modalStatus, setModalStatus]       = React.useState<number>(0);
  const [modalNote, setModalNote]           = React.useState<string>('');
  const [saving, setSaving]                 = React.useState(false);

  const fetchData = async (p = 0, status = filterStatus) => {
    if (!token) return;
    setLoading(true);
    try {
      let url = `${API_URL}/api/consult/admin?page=${p}&size=10`;
      if (status >= 0) url += `&status=${status}`;
      const res = await REQUEST_API({ url, method: 'get', token });
      if (res && res.status) {
        const data = res.data;
        setItems(data.content || []);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements || 0);
        setPage(p);
      }
    } catch {
      toast.error('Không thể tải danh sách yêu cầu tư vấn');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData(0, filterStatus);
  }, [token]);

  const handleFilterChange = (status: number) => {
    setFilterStatus(status);
    fetchData(0, status);
  };

  // Mở modal chi tiết
  const handleOpenModal = (item: ConsultItem) => {
    setSelectedItem(item);
    setModalStatus(item.status);
    setModalNote(item.staffNote || '');
  };

  // Đóng modal
  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // Lưu tất cả thay đổi (trạng thái + ghi chú) trong 1 lần
  const handleSaveAll = async () => {
    if (!token || !selectedItem) return;
    setSaving(true);
    try {
      const promises: Promise<any>[] = [];

      // Cập nhật trạng thái nếu thay đổi
      if (modalStatus !== selectedItem.status) {
        const urlStatus = `${API_URL}/api/consult/admin/${selectedItem.id}/status?status=${modalStatus}`;
        promises.push(REQUEST_API({ url: urlStatus, method: 'put', token }));
      }

      // Cập nhật ghi chú nội bộ nếu thay đổi
      if (modalNote !== (selectedItem.staffNote || '')) {
        const urlNote = `${API_URL}/api/consult/admin/${selectedItem.id}/note?staffNote=${encodeURIComponent(modalNote)}`;
        promises.push(REQUEST_API({ url: urlNote, method: 'put', token }));
      }

      if (promises.length === 0) {
        toast.info('Không có thay đổi nào để lưu');
        setSaving(false);
        return;
      }

      await Promise.all(promises);
      toast.success('Đã lưu thay đổi!');
      handleCloseModal();
      fetchData(page, filterStatus);
    } catch {
      toast.error('Lưu thất bại, vui lòng thử lại');
    } finally {
      setSaving(false);
    }
  };

  const isDone = selectedItem?.status === 2;

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-page__header">
        <div className="chat-page__header-left">
          <h1 className="chat-page__title">
            <i className="bx bx-chat" style={{ marginRight: 10, color: '#e74c3c' }} />
            Chăm sóc khách hàng
          </h1>
          <p className="chat-page__subtitle">Click vào hàng để xem chi tiết và cập nhật</p>
        </div>
        <div className="chat-page__stat">
          <span className="chat-page__stat-value">{totalElements}</span>
          <span className="chat-page__stat-label">Tổng yêu cầu</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="chat-page__filters">
        {STATUS_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`chat-page__filter-btn${filterStatus === opt.value ? ' active' : ''}`}
            style={filterStatus === opt.value
              ? { borderColor: opt.color, color: opt.color, backgroundColor: opt.color + '18' }
              : {}}
            onClick={() => handleFilterChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="chat-page__table-wrap">
        {loading ? (
          <div className="chat-page__loading">
            <div className="chat-page__spinner" />
            <span>Đang tải...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="chat-page__empty">
            <i className="bx bx-inbox" style={{ fontSize: 48, color: '#ccc' }} />
            <p>Không có yêu cầu nào</p>
          </div>
        ) : (
          <table className="chat-page__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Khách hàng</th>
                <th>Liên hệ</th>
                <th>Sản phẩm quan tâm</th>
                <th>Ngày gửi</th>
                <th>Trạng thái</th>
                <th>Ghi chú NB</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const badge = getStatusBadge(item.status);
                return (
                  <tr
                    key={item.id}
                    className={`chat-page__row-clickable${item.status === 2 ? ' chat-page__row--done' : ''}`}
                    onClick={() => handleOpenModal(item)}
                    title="Click để xem chi tiết và cập nhật"
                  >
                    <td className="chat-page__td-id">{item.id}</td>
                    <td>
                      <div className="chat-page__customer">
                        <div className="chat-page__avatar">
                          {item.fullName?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <span className="chat-page__name">{item.fullName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="chat-page__contact">
                        <span className="chat-page__phone">
                          <i className="bx bx-phone" /> {item.phone}
                        </span>
                        {item.email && (
                          <span className="chat-page__email">
                            <i className="bx bx-envelope" /> {item.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      {item.productName
                        ? <span className="chat-page__product">{item.productName}</span>
                        : <span className="chat-page__no-product">—</span>}
                    </td>
                    <td className="chat-page__date">{formatDateStr(item.createdDate)}</td>
                    <td>
                      <span
                        className="chat-page__badge"
                        style={{
                          backgroundColor: badge.color + '22',
                          color: badge.color,
                          borderColor: badge.color,
                        }}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td>
                      {item.staffNote
                        ? <span className="chat-page__note" title={item.staffNote}>{item.staffNote}</span>
                        : <span className="chat-page__action-hint">Chưa có ghi chú</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="chat-page__pagination">
          <button
            className="chat-page__page-btn"
            disabled={page === 0}
            onClick={() => fetchData(page - 1, filterStatus)}
          >
            ‹ Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`chat-page__page-btn${i === page ? ' active' : ''}`}
              onClick={() => fetchData(i, filterStatus)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="chat-page__page-btn"
            disabled={page === totalPages - 1}
            onClick={() => fetchData(page + 1, filterStatus)}
          >
            Sau ›
          </button>
        </div>
      )}

      {/* ─── MODAL CHI TIẾT (Slide panel từ phải) ─── */}
      {selectedItem && (
        <div className="chat-modal__overlay" onClick={handleCloseModal}>
          <div className="chat-modal__panel" onClick={e => e.stopPropagation()}>

            {/* Header modal */}
            <div className="chat-modal__header">
              <h2 className="chat-modal__title">
                <i className="bx bx-user-circle" style={{ color: '#e74c3c' }} />
                Chi tiết yêu cầu #{selectedItem.id}
              </h2>
              <button className="chat-modal__close" onClick={handleCloseModal}>×</button>
            </div>

            <div className="chat-modal__body">

              {/* Thông tin khách hàng */}
              <div className="chat-modal__section">
                <p className="chat-modal__section-title">Thông tin khách hàng</p>
                <div className="chat-modal__info-row">
                  <span className="chat-modal__info-label">Họ tên</span>
                  <span className="chat-modal__info-value">{selectedItem.fullName}</span>
                </div>
                <div className="chat-modal__info-row">
                  <span className="chat-modal__info-label">Số điện thoại</span>
                  <a href={`tel:${selectedItem.phone}`} className="chat-modal__info-link">
                    <i className="bx bx-phone" /> {selectedItem.phone}
                  </a>
                </div>
                {selectedItem.email && (
                  <div className="chat-modal__info-row">
                    <span className="chat-modal__info-label">Email</span>
                    <a href={`mailto:${selectedItem.email}`} className="chat-modal__info-link">
                      <i className="bx bx-envelope" /> {selectedItem.email}
                    </a>
                  </div>
                )}
                {selectedItem.productName && (
                  <div className="chat-modal__info-row">
                    <span className="chat-modal__info-label">Quan tâm</span>
                    <span className="chat-page__product">{selectedItem.productName}</span>
                  </div>
                )}
                {selectedItem.note && (
                  <div className="chat-modal__info-row">
                    <span className="chat-modal__info-label">Ghi chú KH</span>
                    <span className="chat-modal__info-value">{selectedItem.note}</span>
                  </div>
                )}
                <div className="chat-modal__info-row">
                  <span className="chat-modal__info-label">Ngày gửi</span>
                  <span className="chat-modal__info-value">{formatDateStr(selectedItem.createdDate)}</span>
                </div>
              </div>

              {/* Trạng thái xử lý */}
              <div className="chat-modal__status-wrap">
                <p className="chat-modal__status-label">
                  Trạng thái xử lý
                  {isDone && <span style={{ color: '#27ae60', fontWeight: 400, marginLeft: 8, fontSize: 12 }}>
                    (đã hoàn thành — không thể thay đổi)
                  </span>}
                </p>
                <div className="chat-modal__status-options">
                  {STATUS_SELECTABLE.map(s => (
                    <button
                      key={s.value}
                      className={`chat-modal__status-btn${modalStatus === s.value ? ' selected' : ''}`}
                      disabled={isDone}
                      style={modalStatus === s.value ? { backgroundColor: s.color, borderColor: s.color } : {}}
                      onClick={() => setModalStatus(s.value)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ghi chú nội bộ */}
              <div className="chat-modal__note-wrap">
                <p className="chat-modal__note-label">
                  Ghi chú nội bộ
                  <span className="chat-modal__note-badge">Chỉ nhân viên thấy</span>
                </p>
                <textarea
                  className="chat-modal__note-textarea"
                  placeholder={isDone ? 'Yêu cầu đã hoàn thành, không thể chỉnh sửa' : 'Ghi lại kết quả tư vấn, thông tin đã trao đổi với khách...'}
                  value={modalNote}
                  disabled={isDone}
                  onChange={e => setModalNote(e.target.value)}
                />
                {!isDone && (
                  <p className="chat-modal__note-hint">Ghi chú này sẽ được lưu cùng với trạng thái khi bấm "Lưu thay đổi"</p>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="chat-modal__footer">
              <button className="chat-modal__btn chat-modal__btn--cancel" onClick={handleCloseModal}>
                Đóng
              </button>
              {!isDone && (
                <button
                  className="chat-modal__btn chat-modal__btn--save"
                  disabled={saving}
                  onClick={handleSaveAll}
                >
                  {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
