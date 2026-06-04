import React from 'react';
import Breadcrum from '~/components/breadcrumb';
import './styles.css';

type FaqItem = { q: string; a: string };

const FAQ_LIST: FaqItem[] = [
  {
    q: 'Xe bán tại LT Motor có phải xe chính hãng không?',
    a: 'Tất cả xe bán tại LT Motor đều là xe chính hãng, có đầy đủ hóa đơn VAT, giấy tờ gốc từ nhà sản xuất và tem bảo hành chính hãng. Chúng tôi cam kết không bán xe không rõ nguồn gốc.',
  },
  {
    q: 'Tôi có thể mua xe trả góp không? Thủ tục ra sao?',
    a: 'Có, chúng tôi hỗ trợ mua xe trả góp với lãi suất ưu đãi từ nhiều ngân hàng và công ty tài chính uy tín. Bạn chỉ cần CMND/CCCD, hộ khẩu hoặc KT3 và thu nhập tối thiểu 4 triệu/tháng. Thủ tục duyệt nhanh trong 1–2 giờ.',
  },
  {
    q: 'Thời gian bảo hành xe là bao lâu?',
    a: 'Xe tại LT Motor được bảo hành theo chính sách của nhà sản xuất: Honda 3 năm hoặc 30.000km, Yamaha 3 năm hoặc 30.000km (tùy điều kiện nào đến trước). Ngoài ra, chúng tôi tặng thêm gói bảo dưỡng miễn phí lần đầu.',
  },
  {
    q: 'Tôi muốn đặt cọc xe, cần làm gì?',
    a: 'Bạn có thể đặt cọc online qua website hoặc đến trực tiếp showroom. Mức cọc tối thiểu là 2.000.000đ và sẽ được giữ xe trong 7 ngày. Tiền cọc được hoàn lại 100% nếu xe không đúng như mô tả.',
  },
  {
    q: 'LT Motor có mua xe cũ không?',
    a: 'Có, chúng tôi có dịch vụ thu mua xe cũ của mọi hãng với mức giá cạnh tranh. Bạn có thể mang xe đến showroom để được định giá miễn phí, hoặc gửi ảnh/video qua Zalo/Facebook để được tư vấn sơ bộ.',
  },
  {
    q: 'Xe mua tại đây có được bao đăng ký, bao bảo hiểm không?',
    a: 'Chúng tôi hỗ trợ làm đăng ký xe tại nhà (phí dịch vụ áp dụng tùy khu vực). Bảo hiểm TNDS bắt buộc được mua kèm theo xe. Bạn cũng có thể mua thêm bảo hiểm vật chất tại showroom với giá ưu đãi.',
  },
  {
    q: 'Tôi ở ngoại tỉnh, LT Motor có ship xe không?',
    a: 'Có, chúng tôi vận chuyển xe toàn quốc qua các đơn vị vận tải uy tín. Phí vận chuyển và thời gian giao hàng tùy thuộc vào khu vực. Liên hệ hotline để được báo giá cụ thể.',
  },
  {
    q: 'Tôi có thể đổi/trả xe sau khi mua không?',
    a: 'Chúng tôi có chính sách đổi trả trong 7 ngày nếu xe có lỗi kỹ thuật từ nhà sản xuất hoặc không đúng với mô tả khi mua. Vui lòng xem chi tiết tại trang Chính sách đổi trả.',
  },
  {
    q: 'Showroom mở cửa những ngày nào trong tuần?',
    a: 'Showroom LT Motor mở cửa Thứ 2 – Thứ 7 từ 8:00 – 18:00 và Chủ nhật từ 8:00 – 12:00. Bạn có thể đặt lịch tư vấn trước để được phục vụ tốt hơn.',
  },
  {
    q: 'Tôi muốn lái thử xe trước khi mua có được không?',
    a: 'Được, bạn có thể trải nghiệm lái thử xe tại khu vực showroom. Vui lòng mang theo CMND/CCCD và bằng lái xe. Chúng tôi khuyến khích khách hàng lái thử để đưa ra quyết định mua đúng đắn nhất.',
  },
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div>
      <Breadcrum title="Câu hỏi thường gặp" />

      <div className="static-page__hero">
        <div className="container">
          <h1 className="static-page__hero-title">Câu hỏi thường gặp</h1>
          <p className="static-page__hero-sub">
            Tổng hợp những thắc mắc phổ biến nhất của khách hàng
          </p>
        </div>
      </div>

      <div className="static-page__body">
        <div className="container">
          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">❓</span> Các câu hỏi thường gặp
            </h2>

            {FAQ_LIST.map((item, i) => (
              <div
                key={i}
                className={`faq-item${openIndex === i ? ' open' : ''}`}
              >
                <div className="faq-question" onClick={() => toggle(i)}>
                  <span>{item.q}</span>
                  <span className="arrow">▾</span>
                </div>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="static-page__card">
            <h2 className="static-page__card-title">
              <span className="icon">📞</span> Vẫn còn thắc mắc?
            </h2>
            <p>
              Nếu bạn không tìm thấy câu trả lời cho thắc mắc của mình, hãy liên hệ trực tiếp với
              chúng tôi qua các kênh sau:
            </p>
            <div className="highlight-box">
              <span className="highlight-box__icon">💬</span>
              <p className="highlight-box__text">
                <strong>Hotline:</strong> 0334 018 518 (Thứ 2 – CN)
                <br />
                <strong>Zalo:</strong> 0334018518 &nbsp;|&nbsp;
                <strong>Email:</strong> quanglinhmoto@gmail.com
                <br />
                Đội ngũ tư vấn sẵn sàng hỗ trợ bạn trong thời gian làm việc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
