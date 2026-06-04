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
  staffNote?: string; // Ghi chú nội bộ của nhân viên
}

const STATUS_OPTIONS = [
  { value: -1, label: 'Tất cả',      color: '#6c757d' },
  { value: 0,  label: 'Chờ xử lý',   color: '#f39c12' },
  { value: 1,  label: 'Đang xử lý',  color: '#3498db' },
  { value: 2,  label: 'Đã xong',     color: '#27ae60' },
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

  const [items, setItems]             = React.useState<ConsultItem[]>([]);
  const [loading, setLoading]         = React.useState(false);
  const [filterStatus, setFilterStatus] = React.useState<number>(-1);
  const [page, setPage]               = React.useState(0);
  const [totalPages, setTotalPages]   = React.useState(0);
  const [totalElements, setTotalElements] = React.useState(0);
  const [updatingId, setUpdatingId]   = React.useState<number | null>(null);
  const [noteMap, setNoteMap]         = React.useState<Record<number, string>>({});
  const [savingNoteId, setSavingNoteId] = React.useState<number | null>(null);

  const fetchData = async (p = 0, status = filterStatus) => {
    if (!token) return;
    setLoading(true);
    try {
      let url = `${API_URL}/api/consult/admin?page=${p}&size=10`;
      if (status >= 0) url += `&status=${status}`;
      const res = await REQUEST_API({ url, method: 'get', token });
      if (res && res.status) {
        const data = res.data;
        const list: ConsultItem[] = data.content || [];
        setItems(list);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements || 0);
        setPage(p);
        // Khởi tạo noteMap từ dữ liệu server
        const map: Record<number, string> = {};
        list.forEach(item => { map[item.id] = item.staffNote || ''; });
        setNoteMap(prev => ({ ...map, ...Object.fromEntries(Object.entries(prev).filter(([k]) => list.some(i => i.id === Number(k)))) }));
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

  const handleUpdateStatus = async (id: number, newStatus: number) => {
    if (!token) return;
    setUpdatingId(id);
    try {
      const url = `${API_URL}/api/consult/admin/${id}/status?status=${newStatus}`;
      const res = await REQUEST_API({ url, method: 'put', token });
      if (res && res.status) {
        toast.success('Cập nhật trạng thái thành công!');
        fetchData(page, filterStatus);
      }
    } catch {
      toast.error('Cập nhật thất bại');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNote = async (id: number) => {
    if (!token) return;
    setSavingNoteId(id);
    try {
      const note = noteMap[id] ?? '';
      const url = `${API_URL}/api/consult/admin/${id}/note?staffNote=${encodeURIComponent(note)}`;
      const res = await REQUEST_API({ url, method: 'put', token });
      if (res && res.status) {
        toast.success('Đã lưu ghi chú nội bộ!');
      } else {
        toast.error('Lưu ghi chú thất bại');
      }
    } catch {
      toast.error('Lỗi khi lưu ghi chú');
    } finally {
      setSavingNoteId(null);
    }
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-page__header">
        <div className="chat-page__header-left">
          <h1 className="chat-page__title">
            <i className="bx bx-chat" style={{ marginRight: 10, color: '#e74c3c' }} />
            Chăm sóc khách hàng
          </h1>
          <p className="chat-page__subtitle">Quản lý các yêu cầu tư vấn từ khách hàng</p>
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
                <th>Sản phẩm</th>
                <th>Ghi chú KH</th>
                <th>Ghi chú nội bộ</th>
                <th>Ngày gửi</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const badge = getStatusBadge(item.status);
                return (
                  <tr key={item.id} className={item.status === 2 ? 'chat-page__row--done' : ''}>
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
                        <a href={`tel:${item.phone}`} className="chat-page__phone">
                          <i className="bx bx-phone" /> {item.phone}
                        </a>
                        {item.email && (
                          <a href={`mailto:${item.email}`} className="chat-page__email">
                            <i className="bx bx-envelope" /> {item.email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td>
                      {item.productName
                        ? <span className="chat-page__product">{item.productName}</span>
                        : <span className="chat-page__no-product">—</span>}
                    </td>
                    <td>
                      <span className="chat-page__note" title={item.note}>
                        {item.note || '—'}
                      </span>
                    </td>
                    <td>
                      <div className="chat-page__staff-note">
                        <textarea
                          className="chat-page__note-input"
                          rows={2}
                          placeholder={item.status === 2 ? 'Đã khóa' : 'Nhập ghi chú nội bộ...'}
                          value={noteMap[item.id] ?? ''}
                          disabled={item.status === 2}
                          onChange={e => setNoteMap(prev => ({ ...prev, [item.id]: e.target.value }))}
                          title={item.status === 2 ? 'Yêu cầu đã hoàn thành, không thể chỉnh sửa' : ''}
                        />
                        <button
                          className="chat-page__btn chat-page__btn--note"
                          disabled={savingNoteId === item.id || item.status === 2}
                          onClick={() => handleSaveNote(item.id)}
                          title={item.status === 2 ? 'Yêu cầu đã hoàn thành, không thể chỉnh sửa' : 'Lưu ghi chú nội bộ'}
                        >
                          {savingNoteId === item.id ? '...' : 'Lưu'}
                        </button>
                      </div>
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
                      <div className="chat-page__actions">
                        {item.status === 0 && (
                          <button
                            className="chat-page__btn chat-page__btn--process"
                            disabled={updatingId === item.id}
                            onClick={() => handleUpdateStatus(item.id, 1)}
                          >
                            {updatingId === item.id ? '...' : 'Tiếp nhận'}
                          </button>
                        )}
                        {item.status === 1 && (
                          <button
                            className="chat-page__btn chat-page__btn--done"
                            disabled={updatingId === item.id}
                            onClick={() => handleUpdateStatus(item.id, 2)}
                          >
                            {updatingId === item.id ? '...' : 'Hoàn thành'}
                          </button>
                        )}
                        {item.status === 2 && (
                          <span className="chat-page__done-label">✓ Xong</span>
                        )}
                      </div>
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
    </div>
  );
};

export default ChatPage;
