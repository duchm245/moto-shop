# Tổng hợp chức năng & Kế hoạch Test - Dự án MotoShop

## Mục lục
- [Phần A: Tổng hợp chức năng](#phần-a-tổng-hợp-chức-năng)
- [Phần B: Kế hoạch Test](#phần-b-kế-hoạch-test)

---

# Phần A: Tổng hợp chức năng

## Kiến trúc hệ thống

| Thành phần | Công nghệ | Cổng | Mô tả |
|---|---|---|---|
| **Backend (BE)** | Spring Boot + MySQL | `8081` | REST API server |
| **Frontend (FE)** | React + TypeScript (Vite) | `3000` | Giao diện khách hàng |
| **Admin** | React + TypeScript (Vite) | `3001` | Giao diện quản trị |
| **Database** | MySQL (Docker) | `3306` | Cơ sở dữ liệu |

---

## I. Chức năng phía Khách hàng (Frontend - `localhost:3000`)

### 1. Xác thực & Tài khoản

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 1.1 | Đăng nhập | `POST /api/auth/login` | `/login` |
| 1.2 | Đăng ký tài khoản | `POST /api/auth/register` | `/register` |
| 1.3 | Xác thực OTP email | `POST /api/auth/verify-otp` | `/verify-email` |
| 1.4 | Quên mật khẩu | `POST /api/auth/forgot-password` | `/forgot-password` |
| 1.5 | Đặt lại mật khẩu | `POST /api/auth/reset-password` | `/forgot-password` |
| 1.6 | Làm mới JWT token | `POST /api/auth/refresh-token` | (tự động) |
| 1.7 | Xem thông tin cá nhân | `GET /api/user/profile` | `/tai-khoan` |
| 1.8 | Cập nhật thông tin cá nhân | `PUT /api/user/update-profile` | `/tai-khoan` |
| 1.9 | Đổi mật khẩu | `PUT /api/user/change-password` | `/tai-khoan` |

### 2. Quản lý địa chỉ

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 2.1 | Xem danh sách địa chỉ | `GET /api/address` | `/tai-khoan/dia-chi` |
| 2.2 | Thêm địa chỉ mới | `POST /api/address/create` | `/tai-khoan/dia-chi` |
| 2.3 | Sửa địa chỉ | `PUT /api/address/update` | `/tai-khoan/dia-chi` |
| 2.4 | Xóa địa chỉ | `DELETE /api/address/delete/{id}` | `/tai-khoan/dia-chi` |
| 2.5 | Đặt địa chỉ mặc định | `PUT /api/address/set-default/{id}` | `/tai-khoan/dia-chi` |

### 3. Sản phẩm

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 3.1 | Trang chủ (Banner, danh mục, bán chạy, KM) | `GET /api/banner/home`, `GET /api/category/all`, `GET /api/product/best-seller`, `GET /api/sale/all` | `/` |
| 3.2 | Danh sách sản phẩm (phân trang, lọc, sắp xếp) | `GET /api/product/all` | `/san-pham` |
| 3.3 | Chi tiết sản phẩm | `GET /api/product/{id}` | `/san-pham/:id` |
| 3.4 | So sánh xe | `GET /api/product/compare` | `/so-sanh-xe` |
| 3.5 | Tìm kiếm sản phẩm (theo keyword) | `GET /api/product/all?keyword=...` | `/san-pham` |
| 3.6 | Lọc sản phẩm (giá, hãng, loại xe, tình trạng, danh mục) | `GET /api/product/all?...` | `/san-pham` |

### 4. Giỏ hàng

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 4.1 | Xem giỏ hàng | `GET /api/cart` | `/gio-hang` |
| 4.2 | Thêm sản phẩm vào giỏ | `POST /api/cart/add` | `/san-pham/:id` |
| 4.3 | Cập nhật số lượng | `PUT /api/cart/update` | `/gio-hang` |
| 4.4 | Xóa sản phẩm khỏi giỏ | `DELETE /api/cart/delete/{id}` | `/gio-hang` |

### 5. Đặt hàng

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 5.1 | Thanh toán / Đặt hàng | `POST /api/order/create` | `/thanh-toan` |
| 5.2 | Xem lịch sử đơn hàng | `GET /api/order/user` | `/don-hang` |
| 5.3 | Xem chi tiết đơn hàng | `GET /api/order/{id}` | `/don-hang/:id` |
| 5.4 | Hủy đơn hàng | `PUT /api/order/cancel/{id}` | `/don-hang/:id` |

### 6. Khuyến mãi & Tin tức

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 6.1 | Xem danh sách khuyến mãi | `GET /api/sale/all` | `/` |
| 6.2 | Xem chi tiết khuyến mãi | `GET /api/sale/{id}` | `/` |
| 6.3 | Xem danh sách tin tức | `GET /api/news/all` | `/tin-tuc` |
| 6.4 | Xem chi tiết tin tức | `GET /api/news/{id}` | `/tin-tuc/:id` |

### 7. Thanh toán trực tuyến

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 7.1 | Tạo thanh toán VNPay | `POST /api/vnpay/create?orderId=&bankCode=&language=` | `/thanh-toan` |
| 7.2 | Xử lý kết quả VNPay (callback) | `GET /api/vnpay/result` | (redirect) |
| 7.3 | Tạo thanh toán MoMo | `POST /api/momo/create-order?orderId=` | `/thanh-toan` |
| 7.4 | Kiểm tra trạng thái giao dịch MoMo | `POST /api/momo/transactionStatus?requestId=&orderId=` | (tự động) |
| 7.5 | Tạo thanh toán ZaloPay | `POST /api/zalopay/create-order?orderId=` | `/thanh-toan` |
| 7.6 | Kiểm tra trạng thái giao dịch ZaloPay | `GET /api/zalopay/getstatusbyapptransid?apptransid=` | (tự động) |

### 8. Đánh giá sản phẩm

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 8.1 | Xem đánh giá của sản phẩm | `GET /api/review/{productId}` | `/san-pham/:id` |
| 8.2 | Viết đánh giá sản phẩm (rating + bình luận) | `POST /api/review` | `/san-pham/:id` |

### 9. Yêu cầu tư vấn

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 9.1 | Gửi yêu cầu tư vấn mua xe | `POST /api/consult` | `/tu-van-mua-ban-xe` |
| 9.2 | Admin: Xem danh sách yêu cầu tư vấn | `GET /api/consult/admin?page=&size=&status=` | (Admin) |
| 9.3 | Admin: Cập nhật trạng thái tư vấn | `PUT /api/consult/admin/{id}/status?status=` | (Admin) |
| 9.4 | Admin: Ghi chú nội bộ cho yêu cầu tư vấn | `PUT /api/consult/admin/{id}/note?staffNote=` | (Admin) |

### 10. Khác

| # | Chức năng | Trang |
|---|---|---|
| 10.1 | Trang liên hệ | `/lien-he` |
| 10.2 | Trang 404 | `/404` |
| 10.3 | Trang giới thiệu | `/pages/gioi-thieu` |
| 10.4 | Trang FAQ | `/pages/cau-hoi-thuong-gap` |
| 10.5 | Trang chính sách thanh toán | `/pages/chinh-sach-thanh-toan` |
| 10.6 | Trang chính sách vận chuyển | `/pages/chinh-sach-van-chuyen` |
| 10.7 | Trang chính sách đổi trả | `/pages/chinh-sach-doi-tra` |
| 10.8 | Trang chính sách bảo mật | `/pages/chinh-sach-bao-mat` |
| 10.9 | Trang chính sách bảo hành | `/pages/chinh-sach-bao-hanh` |

---

## II. Chức năng phía Quản trị (Admin - `localhost:3001`)

### 11. Đăng nhập Admin

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 11.1 | Đăng nhập (yêu cầu role ADMIN/EMPLOYEE) | `POST /api/auth/login` | `/login` |

### 12. Tổng quan (Dashboard)

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 12.1 | Thống kê tổng quan (đơn giao, SP đang bán, doanh thu, đơn chờ) | `GET /api/admin/dashboard/stats` | `/` |
| 12.2 | Biểu đồ doanh thu theo tháng | `GET /api/admin/dashboard/revenue` | `/` |
| 12.3 | Biểu đồ đơn hàng theo trạng thái | `GET /api/admin/dashboard/orders-by-status` | `/` |
| 12.4 | Top sản phẩm bán chạy | `GET /api/admin/dashboard/top-products` | `/` |

### 13. Quản lý Sản phẩm

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 13.1 | Danh sách sản phẩm (tìm kiếm, lọc, phân trang) | `GET /api/admin/product/all` | `/products` |
| 13.2 | Xem chi tiết sản phẩm | `GET /api/admin/product/{id}` | `/products/:id` |
| 13.3 | Thêm sản phẩm mới (ảnh, biến thể, thông số) | `POST /api/admin/product/create` | `/products/add` |
| 13.4 | Sửa sản phẩm | `PUT /api/admin/product/update/{id}` | `/products/edit/:id` |
| 13.5 | Xóa sản phẩm | `DELETE /api/admin/product/delete/{id}` | `/products` |
| 13.6 | Bật/tắt trạng thái sản phẩm | `PUT /api/admin/product/status/{id}` | `/products` |

### 14. Quản lý Danh mục

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 14.1 | Danh sách danh mục | `GET /api/admin/category/all` | `/categories` |
| 14.2 | Thêm danh mục | `POST /api/admin/category/create` | `/categories` |
| 14.3 | Sửa danh mục | `PUT /api/admin/category/update/{id}` | `/categories` |
| 14.4 | Xóa danh mục | `DELETE /api/admin/category/delete/{id}` | `/categories` |

### 15. Quản lý Đơn hàng

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 15.1 | Danh sách đơn hàng (lọc, phân trang) | `GET /api/admin/order/all` | `/orders` |
| 15.2 | Xem chi tiết đơn hàng | `GET /api/admin/order/{id}` | `/orders/:id` |
| 15.3 | Cập nhật trạng thái đơn hàng | `PUT /api/admin/order/status/{id}` | `/orders/:id` |

### 16. Quản lý Người dùng

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 16.1 | Danh sách người dùng (phân trang) | `GET /api/admin/user/all` | `/users` |
| 16.2 | Bật/tắt trạng thái người dùng | `PUT /api/admin/user/status/{id}` | `/users` |
| 16.3 | Thêm nhân viên mới | `POST /api/admin/user/addEmp` | `/add-emp` |
| 16.4 | Reset mật khẩu người dùng | `PUT /api/admin/user/resetPassword/{id}` | `/users` |

### 17. Quản lý Banner

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 17.1 | Danh sách banner | `GET /api/admin/banner/all` | `/banners` |
| 17.2 | Thêm banner (upload ảnh) | `POST /api/admin/banner/create` | `/banners` |
| 17.3 | Sửa banner | `PUT /api/admin/banner/update/{id}` | `/banners` |
| 17.4 | Xóa banner | `DELETE /api/admin/banner/delete/{id}` | `/banners` |
| 17.5 | Bật/tắt trạng thái banner | `PUT /api/admin/banner/status/{id}` | `/banners` |

### 18. Quản lý Khuyến mãi

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 18.1 | Danh sách khuyến mãi | `GET /api/admin/sale/all` | `/sales` |
| 18.2 | Xem chi tiết KM | `GET /api/admin/sale/{id}` | `/sales/:id` |
| 18.3 | Thêm khuyến mãi (% giảm, ngày, chọn SP) | `POST /api/admin/sale/create` | `/sales/add` |
| 18.4 | Sửa khuyến mãi | `PUT /api/admin/sale/update/{id}` | `/sales/edit/:id` |
| 18.5 | Xóa khuyến mãi | `DELETE /api/admin/sale/delete/{id}` | `/sales` |
| 18.6 | Thêm sản phẩm vào chương trình KM | `POST /api/admin/sale/add-product/{id}?productIds=` | `/add-product-sale` |
| 18.7 | Xóa sản phẩm khỏi chương trình KM | `POST /api/admin/sale/remove-product/{id}?productIds=` | `/add-product-sale` |

### 19. Quản lý Tin tức / Bài viết

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 19.1 | Danh sách bài viết | `GET /api/admin/article` | `/article` |
| 19.2 | Xem chi tiết bài viết | `GET /api/admin/article/{id}` | `/deail-article` |
| 19.3 | Thêm bài viết (upload ảnh) | `POST /api/admin/article/create` | `/add-article` |
| 19.4 | Sửa bài viết | `PUT /api/admin/article/update/{id}` | `/edit-article` |
| 19.5 | Xóa bài viết | `DELETE /api/admin/article/delete/{id}` | `/article` |
| 19.6 | Ẩn/hiện bài viết | `PUT /api/admin/article/hide/{id}`, `PUT /api/admin/article/show/{id}` | `/article` |

### 20. Quản lý Thông báo (Admin)

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 20.1 | Tải danh sách thông báo | `GET /api/admin/load-notification` | (sidebar) |
| 20.2 | Đánh dấu đã đọc | `GET /api/admin/read-notification?id=` | (sidebar) |
| 20.3 | Đẩy thông báo mới | `GET /api/admin/push-notification` | (sidebar) |

### 21. Quản lý Thông tin Công ty

| # | Chức năng | API Endpoint | Trang |
|---|---|---|---|
| 21.1 | Xem thông tin công ty | `GET /api/company/{id}` | `/settings` |
| 21.2 | Tạo thông tin công ty | `POST /api/admin/company/create` | `/settings` |
| 21.3 | Cập nhật thông tin công ty | `PUT /api/admin/company/update/{id}` | `/settings` |

### 22. Scheduled Tasks (Tác vụ tự động)

| # | Chức năng | Cơ chế | Tần suất |
|---|---|---|---|
| 22.1 | Tự động kích hoạt KM khi đến ngày bắt đầu | Cron Job: cập nhật isActive=1, tính lại salePrice | Mỗi phút |
| 22.2 | Tự động hủy KM khi hết hạn | Cron Job: cập nhật isActive=0, reset salePrice về giá gốc | Mỗi phút |
| 22.3 | Quét cảnh báo hàng tồn kho thấp | Cron Job: tạo notification nếu (stock - sold) ≤ 100 | Hàng ngày 20:30 |

---

## III. Bảo mật & Phân quyền

| Vùng truy cập | Yêu cầu xác thực | Vai trò |
|---|---|---|
| `/api/login`, `/api/register`, `/api/generate-otp`, `/api/forgotPass` | ❌ Không | Tất cả |
| `/api/product/**`, `/api/category/**`, `/api/banner/**`, `/api/sale/**`, `/api/article/**`, `/api/review/**` | ❌ Không | Tất cả (đọc công khai) |
| `POST /api/consult` | ❌ Không | Tất cả |
| `/api/cart/**`, `/api/user/**` | ✅ JWT | USER, EMPLOYEE, ADMIN |
| `/api/admin/user/addEmp` | ✅ JWT | ADMIN only |
| `/api/admin/**` | ✅ JWT | ADMIN, EMPLOYEE |
| `/api/vnpay/**`, `/api/momo/**`, `/api/zalopay/**` | ✅ JWT | USER, EMPLOYEE, ADMIN |

---

## IV. Tổng hợp Entity & Model dữ liệu

| Entity | Mô tả | Trường chính |
|---|---|---|
| `User` | Người dùng | id, username, password, email, firstName, lastName, phone, status, otp |
| `Role` | Vai trò | id, name (ADMIN / EMPLOYEE / USER) |
| `Product` | Sản phẩm xe máy | id, name, sku, price, vehicleCondition, brand, vehicleType, displacement, engineType, ... |
| `ProductImage` | Ảnh sản phẩm | id, url, product |
| `Variant` | Biến thể (màu sắc, tồn kho) | id, name, colorName, colorCode, stock, sold |
| `Category` | Danh mục | id, title, description, type, parentCategory |
| `Cart` / `CartItem` | Giỏ hàng | id, user, quantity, product, variant |
| `Orders` / `OrderItem` | Đơn hàng | id, codeOrders, status, paymentMethod, shippingFee, type, isCheckout |
| `Address` | Địa chỉ giao hàng | id, firstName, lastName, phone, province, district, wards, addressDetail, focus |
| `Banner` | Ảnh quảng cáo | id, name, src, status, category |
| `Sale` | Chương trình KM | id, name, discount, startDate, endDate, isActive |
| `Article` | Bài viết / Tin tức | id, title, content, shortContent, image, author, status |
| `ProductComment` | Đánh giá SP | id, productId, user, rating, content, createdDate |
| `ConsultRequest` | Yêu cầu tư vấn | id, fullName, phone, email, note, productId, status, staffNote |
| `Company` | Thông tin công ty | id, name, phoneCskh, phone, taxCode, address |
| `SocialMedia` | Mạng xã hội | id, name, url, company |
| `Notification` | Thông báo | id, content, isRead, deliverStatus, type (order/cancel/out-of-stock) |

---

# Phần B: Kế hoạch Test

## Phương pháp Test

Sử dụng phương pháp **Kiểm thử hộp đen (Black-box Testing)** kết hợp:
- **Functional Testing**: Kiểm tra từng chức năng hoạt động đúng
- **Boundary Testing**: Kiểm tra giá trị biên
- **Negative Testing**: Kiểm tra xử lý lỗi
- **Integration Testing**: Kiểm tra luồng end-to-end

---

## Module 1: Xác thực & Tài khoản

### TC-1.1: Đăng ký tài khoản

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-1.1.1 | Đăng ký thành công | Username, email, password, phone hợp lệ | Tạo tài khoản, gửi OTP email | 🔴 Cao |
| TC-1.1.2 | Đăng ký - username đã tồn tại | Username trùng | Báo lỗi "Username đã tồn tại" | 🔴 Cao |
| TC-1.1.3 | Đăng ký - email đã tồn tại | Email trùng | Báo lỗi "Email đã tồn tại" | 🔴 Cao |
| TC-1.1.4 | Đăng ký - để trống trường bắt buộc | Bỏ trống username/email/password | Báo lỗi validation | 🟡 Trung bình |
| TC-1.1.5 | Đăng ký - password quá ngắn | Password < 6 ký tự | Báo lỗi validation | 🟡 Trung bình |
| TC-1.1.6 | Đăng ký - email sai định dạng | Email không hợp lệ (thiếu @) | Báo lỗi validation | 🟡 Trung bình |
| TC-1.1.7 | Đăng ký - SĐT sai định dạng | SĐT chứa chữ cái | Báo lỗi validation | 🟡 Trung bình |

### TC-1.2: Xác thực OTP

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-1.2.1 | Xác thực OTP đúng | OTP đúng | Kích hoạt tài khoản, chuyển trang login | 🔴 Cao |
| TC-1.2.2 | Xác thực OTP sai | OTP sai | Báo lỗi "OTP không đúng" | 🔴 Cao |
| TC-1.2.3 | Xác thực OTP hết hạn | OTP quá thời hạn | Báo lỗi "OTP đã hết hạn" | 🟡 Trung bình |

### TC-1.3: Đăng nhập

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-1.3.1 | Đăng nhập thành công | Username/password đúng | Đăng nhập, lưu JWT, chuyển trang chủ | 🔴 Cao |
| TC-1.3.2 | Đăng nhập - sai password | Password sai | Báo lỗi "Sai tài khoản hoặc mật khẩu" | 🔴 Cao |
| TC-1.3.3 | Đăng nhập - tài khoản không tồn tại | Username không tồn tại | Báo lỗi | 🔴 Cao |
| TC-1.3.4 | Đăng nhập - tài khoản bị khóa | Tài khoản status = inactive | Báo lỗi "Tài khoản đã bị khóa" | 🟡 Trung bình |
| TC-1.3.5 | Đăng nhập - để trống trường | Bỏ trống username hoặc password | Báo lỗi validation | 🟡 Trung bình |

### TC-1.4: Quên mật khẩu

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-1.4.1 | Gửi yêu cầu reset password thành công | Email đã đăng ký | Gửi OTP qua email | 🟡 Trung bình |
| TC-1.4.2 | Reset password thành công | OTP đúng + password mới | Đổi mật khẩu thành công | 🟡 Trung bình |
| TC-1.4.3 | Reset - email không tồn tại | Email chưa đăng ký | Báo lỗi | 🟡 Trung bình |

### TC-1.5: Quản lý hồ sơ cá nhân

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-1.5.1 | Xem thông tin cá nhân | Đã đăng nhập | Hiển thị đầy đủ thông tin | 🟡 Trung bình |
| TC-1.5.2 | Cập nhật thông tin thành công | Tên, SĐT hợp lệ | Cập nhật thành công | 🟡 Trung bình |
| TC-1.5.3 | Đổi mật khẩu thành công | Mật khẩu cũ đúng + mật khẩu mới | Đổi thành công | 🟡 Trung bình |
| TC-1.5.4 | Đổi mật khẩu - sai mật khẩu cũ | Mật khẩu cũ sai | Báo lỗi | 🟡 Trung bình |

---

## Module 2: Quản lý Địa chỉ

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-2.1 | Xem danh sách địa chỉ | Đã đăng nhập | Hiển thị tất cả địa chỉ của user | 🟡 Trung bình |
| TC-2.2 | Thêm địa chỉ mới thành công | Họ tên, SĐT, tỉnh, quận, xã, chi tiết | Thêm thành công | 🟡 Trung bình |
| TC-2.3 | Thêm địa chỉ - bỏ trống trường bắt buộc | Bỏ trống SĐT | Báo lỗi validation | 🟢 Thấp |
| TC-2.4 | Sửa địa chỉ | Thay đổi chi tiết địa chỉ | Cập nhật thành công | 🟡 Trung bình |
| TC-2.5 | Xóa địa chỉ | Chọn xóa 1 địa chỉ | Xóa thành công | 🟡 Trung bình |
| TC-2.6 | Đặt địa chỉ mặc định | Chọn 1 địa chỉ | Đánh dấu mặc định, bỏ mặc định cũ | 🟡 Trung bình |

---

## Module 3: Sản phẩm (Phía Khách hàng)

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-3.1 | Xem trang chủ | Truy cập `/` | Banner, danh mục, SP bán chạy, KM hiển thị đúng | 🔴 Cao |
| TC-3.2 | Xem danh sách sản phẩm | Truy cập `/san-pham` | Hiển thị danh sách SP có phân trang | 🔴 Cao |
| TC-3.3 | Tìm kiếm sản phẩm | Nhập keyword "Honda" | Hiển thị SP có chứa "Honda" | 🔴 Cao |
| TC-3.4 | Lọc theo danh mục | Chọn danh mục "Xe tay ga" | Chỉ hiển thị SP thuộc danh mục | 🟡 Trung bình |
| TC-3.5 | Lọc theo khoảng giá | minPrice=10tr, maxPrice=50tr | Chỉ hiển thị SP trong khoảng giá | 🟡 Trung bình |
| TC-3.6 | Lọc theo hãng xe | Chọn brand "Honda" | Chỉ hiển thị SP hãng Honda | 🟡 Trung bình |
| TC-3.7 | Lọc theo loại xe | Chọn vehicleType "Xe tay ga" | Chỉ hiển thị đúng loại | 🟡 Trung bình |
| TC-3.8 | Lọc theo tình trạng xe | Chọn vehicleCondition "new" | Chỉ hiển thị xe mới | 🟡 Trung bình |
| TC-3.9 | Sắp xếp sản phẩm | Sắp xếp theo giá tăng dần | Danh sách sắp xếp đúng | 🟡 Trung bình |
| TC-3.10 | Xem chi tiết sản phẩm | Click vào 1 SP | Hiển thị đầy đủ: ảnh, thông số, biến thể, giá | 🔴 Cao |
| TC-3.11 | Chọn biến thể (màu sắc) | Click chọn màu khác | Hiển thị đúng thông tin biến thể | 🟡 Trung bình |
| TC-3.12 | So sánh xe | Chọn 2+ xe để so sánh | Hiển thị bảng so sánh thông số | 🟡 Trung bình |
| TC-3.13 | Phân trang | Click trang 2, 3, ... | Chuyển trang, load đúng dữ liệu | 🟡 Trung bình |

---

## Module 4: Giỏ hàng

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-4.1 | Thêm SP vào giỏ (đã đăng nhập) | Chọn SP + biến thể + số lượng | SP được thêm vào giỏ, hiện thông báo | 🔴 Cao |
| TC-4.2 | Thêm SP vào giỏ (chưa đăng nhập) | Chưa login, click "Thêm vào giỏ" | Chuyển hướng sang trang đăng nhập | 🔴 Cao |
| TC-4.3 | Xem giỏ hàng | Truy cập `/gio-hang` | Hiển thị danh sách SP, tổng tiền | 🔴 Cao |
| TC-4.4 | Tăng/giảm số lượng | Thay đổi số lượng SP | Cập nhật số lượng + tổng tiền | 🟡 Trung bình |
| TC-4.5 | Xóa SP khỏi giỏ | Click nút xóa | SP bị xóa khỏi giỏ | 🟡 Trung bình |
| TC-4.6 | Giỏ hàng trống | Không có SP nào | Hiển thị thông báo giỏ trống | 🟢 Thấp |

---

## Module 5: Đặt hàng & Thanh toán

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-5.1 | Đặt hàng thành công | Giỏ hàng có SP + địa chỉ + phương thức TT | Tạo đơn hàng, chuyển trang xác nhận | 🔴 Cao |
| TC-5.2 | Đặt hàng - chưa có địa chỉ | Không có địa chỉ giao hàng | Yêu cầu thêm địa chỉ | 🔴 Cao |
| TC-5.3 | Xem lịch sử đơn hàng | Đã đăng nhập | Hiển thị danh sách đơn của user | 🟡 Trung bình |
| TC-5.4 | Xem chi tiết đơn hàng | Click vào 1 đơn | Hiển thị đầy đủ thông tin đơn | 🟡 Trung bình |
| TC-5.5 | Hủy đơn hàng (đơn đang chờ) | Đơn ở trạng thái "Chờ xác nhận" | Hủy thành công | 🟡 Trung bình |
| TC-5.6 | Hủy đơn hàng (đơn đã giao) | Đơn ở trạng thái "Đã giao" | Không cho hủy, báo lỗi | 🟡 Trung bình |

---

## Module 6: Khuyến mãi & Tin tức (FE)

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-6.1 | Xem danh sách KM trên trang chủ | Truy cập `/` | Hiển thị KM đang hoạt động | 🟢 Thấp |
| TC-6.2 | Xem chi tiết KM | Click vào 1 KM | Hiển thị thông tin chi tiết | 🟢 Thấp |
| TC-6.3 | Xem danh sách tin tức | Truy cập `/tin-tuc` | Hiển thị danh sách bài viết | 🟢 Thấp |
| TC-6.4 | Xem chi tiết tin tức | Click vào 1 bài | Hiển thị nội dung đầy đủ | 🟢 Thấp |

---

## Module 7: Admin - Đăng nhập

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-7.1 | Admin login thành công | Account ADMIN/EMPLOYEE | Đăng nhập, vào Dashboard | 🔴 Cao |
| TC-7.2 | Admin login - role USER | Account USER thường | Từ chối đăng nhập | 🔴 Cao |
| TC-7.3 | Admin login - sai password | Password sai | Báo lỗi | 🔴 Cao |

---

## Module 8: Admin - Dashboard

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-8.1 | Hiển thị 4 thẻ thống kê | Truy cập Dashboard | Hiển thị đúng: đơn giao, SP bán, doanh thu, đơn chờ | 🟡 Trung bình |
| TC-8.2 | Biểu đồ doanh thu | Truy cập Dashboard | Biểu đồ cột doanh thu theo tháng đúng dữ liệu | 🟡 Trung bình |
| TC-8.3 | Biểu đồ trạng thái đơn hàng | Truy cập Dashboard | Biểu đồ tròn trạng thái đơn đúng | 🟡 Trung bình |
| TC-8.4 | Top sản phẩm bán chạy | Truy cập Dashboard | Hiển thị danh sách SP bán chạy nhất | 🟡 Trung bình |

---

## Module 9: Admin - Quản lý Sản phẩm

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-9.1 | Xem danh sách SP | Truy cập `/products` | Hiển thị bảng SP có phân trang | 🔴 Cao |
| TC-9.2 | Tìm kiếm SP | Nhập keyword | Lọc đúng kết quả | 🟡 Trung bình |
| TC-9.3 | Thêm SP mới thành công | Đầy đủ thông tin + ảnh + biến thể | Tạo SP thành công | 🔴 Cao |
| TC-9.4 | Thêm SP - thiếu trường bắt buộc | Bỏ trống tên SP | Báo lỗi validation | 🟡 Trung bình |
| TC-9.5 | Sửa SP | Thay đổi tên/giá/... | Cập nhật thành công | 🟡 Trung bình |
| TC-9.6 | Xóa SP | Chọn xóa 1 SP | Xóa thành công, SP biến mất khỏi DS | 🟡 Trung bình |
| TC-9.7 | Bật/tắt trạng thái SP | Click toggle status | Trạng thái thay đổi (active ↔ inactive) | 🟡 Trung bình |
| TC-9.8 | Xem chi tiết SP | Click vào 1 SP | Hiển thị đầy đủ thông tin, ảnh, biến thể | 🟡 Trung bình |

---

## Module 10: Admin - Quản lý Danh mục

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-10.1 | Xem danh sách danh mục | Truy cập `/categories` | Hiển thị tất cả danh mục | 🟡 Trung bình |
| TC-10.2 | Thêm danh mục thành công | Tên danh mục hợp lệ | Tạo thành công | 🟡 Trung bình |
| TC-10.3 | Thêm danh mục - tên trùng | Tên đã tồn tại | Báo lỗi | 🟢 Thấp |
| TC-10.4 | Sửa danh mục | Thay đổi tên | Cập nhật thành công | 🟡 Trung bình |
| TC-10.5 | Xóa danh mục | Chọn xóa | Xóa thành công | 🟡 Trung bình |
| TC-10.6 | Xóa danh mục đang có SP | Danh mục có SP thuộc về | Báo lỗi hoặc xử lý cascade | 🟡 Trung bình |

---

## Module 11: Admin - Quản lý Đơn hàng

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-11.1 | Xem danh sách đơn hàng | Truy cập `/orders` | Hiển thị tất cả đơn có phân trang | 🔴 Cao |
| TC-11.2 | Xem chi tiết đơn | Click vào 1 đơn | Hiển thị đầy đủ: SP, giá, địa chỉ, trạng thái | 🟡 Trung bình |
| TC-11.3 | Xác nhận đơn hàng | Đơn "Chờ xác nhận" → "Đã xác nhận" | Cập nhật trạng thái thành công | 🔴 Cao |
| TC-11.4 | Chuyển trạng thái: Đang giao | Đơn "Đã xác nhận" → "Đang giao" | Cập nhật thành công | 🟡 Trung bình |
| TC-11.5 | Chuyển trạng thái: Đã giao | Đơn "Đang giao" → "Đã giao" | Cập nhật thành công | 🟡 Trung bình |
| TC-11.6 | Hủy đơn hàng từ Admin | Đơn "Chờ xác nhận" → "Đã hủy" | Hủy thành công | 🟡 Trung bình |

---

## Module 12: Admin - Quản lý Người dùng

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-12.1 | Xem danh sách người dùng | Truy cập `/users` | Hiển thị tất cả user có phân trang | 🟡 Trung bình |
| TC-12.2 | Khóa tài khoản user | Toggle status → inactive | User không đăng nhập được nữa | 🟡 Trung bình |
| TC-12.3 | Mở khóa tài khoản user | Toggle status → active | User đăng nhập được trở lại | 🟡 Trung bình |

---

## Module 13: Admin - Quản lý Banner

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-13.1 | Xem danh sách banner | Truy cập `/banners` | Hiển thị tất cả banner kèm ảnh preview | 🟡 Trung bình |
| TC-13.2 | Thêm banner (upload ảnh) | Tên + file ảnh | Tạo thành công, hiển thị ảnh | 🟡 Trung bình |
| TC-13.3 | Sửa banner | Thay đổi tên/ảnh | Cập nhật thành công | 🟢 Thấp |
| TC-13.4 | Xóa banner | Chọn xóa | Xóa thành công | 🟢 Thấp |
| TC-13.5 | Bật/tắt trạng thái banner | Toggle status | Banner ẩn/hiện trên trang chủ FE | 🟡 Trung bình |

---

## Module 14: Admin - Quản lý Khuyến mãi

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-14.1 | Xem danh sách KM | Truy cập `/sales` | Hiển thị tất cả KM | 🟡 Trung bình |
| TC-14.2 | Thêm KM thành công | Tên, % giảm, ngày bắt đầu/kết thúc, chọn SP | Tạo KM thành công | 🟡 Trung bình |
| TC-14.3 | Thêm KM - ngày kết thúc trước ngày bắt đầu | endDate < startDate | Báo lỗi validation | 🟢 Thấp |
| TC-14.4 | Sửa KM | Thay đổi % giảm | Cập nhật thành công | 🟢 Thấp |
| TC-14.5 | Xóa KM | Chọn xóa | Xóa thành công | 🟢 Thấp |

---

## Module 15: Admin - Quản lý Tin tức

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-15.1 | Xem danh sách tin tức | Truy cập `/news` | Hiển thị tất cả bài viết | 🟢 Thấp |
| TC-15.2 | Thêm tin tức (upload ảnh) | Tiêu đề, nội dung, ảnh | Tạo thành công | 🟢 Thấp |
| TC-15.3 | Sửa tin tức | Thay đổi nội dung | Cập nhật thành công | 🟢 Thấp |
| TC-15.4 | Xóa tin tức | Chọn xóa | Xóa thành công | 🟢 Thấp |

---

## Module 16: Bảo mật & Phân quyền

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-16.1 | Truy cập trang protected (chưa login) | Vào `/don-hang` khi chưa login | Chuyển hướng về `/login` | 🔴 Cao |
| TC-16.2 | Truy cập Admin API bằng role USER | Gọi `/api/admin/*` với JWT của USER | Trả về 403 Forbidden | 🔴 Cao |
| TC-16.3 | JWT hết hạn → auto refresh | Token access hết hạn | Tự động refresh, không bị logout | 🟡 Trung bình |
| TC-16.4 | Refresh token hết hạn | Cả 2 token đều hết hạn | Chuyển hướng về login | 🟡 Trung bình |
| TC-16.5 | Truy cập Admin panel bằng URL (chưa login) | Vào `localhost:3001/products` | Chuyển hướng về `/login` | 🔴 Cao |

---

## Module 17: Thanh toán trực tuyến (VNPay / MoMo / ZaloPay)

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-17.1 | Thanh toán VNPay thành công | Chọn VNPay, chọn ngân hàng, thanh toán | Tạo URL thanh toán, redirect, callback thành công, đơn hàng cập nhật trạng thái | 🔴 Cao |
| TC-17.2 | Thanh toán VNPay thất bại | Hủy thanh toán trên trang VNPay | Callback trả về lỗi, đơn hàng giữ trạng thái "Chờ thanh toán" | 🔴 Cao |
| TC-17.3 | Thanh toán MoMo thành công | Chọn MoMo, hoàn tất thanh toán | Tạo đơn thành công, trạng thái MoMo trả về success | 🔴 Cao |
| TC-17.4 | Thanh toán MoMo thất bại | Hủy trên app MoMo | Đơn hàng giữ trạng thái chờ | 🟡 Trung bình |
| TC-17.5 | Thanh toán ZaloPay thành công | Chọn ZaloPay, hoàn tất thanh toán | Tạo đơn thành công, kiểm tra trạng thái qua API | 🔴 Cao |
| TC-17.6 | Thanh toán ZaloPay thất bại | Hủy trên ZaloPay | Đơn hàng giữ trạng thái chờ | 🟡 Trung bình |
| TC-17.7 | Kiểm tra trạng thái giao dịch MoMo | Gọi API transactionStatus | Trả về đúng trạng thái (thành công/thất bại) | 🟡 Trung bình |
| TC-17.8 | Kiểm tra trạng thái giao dịch ZaloPay | Gọi API getstatusbyapptransid | Trả về đúng trạng thái | 🟡 Trung bình |

---

## Module 18: Đánh giá sản phẩm

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-18.1 | Xem danh sách đánh giá của SP | Truy cập chi tiết 1 SP có đánh giá | Hiển thị danh sách rating + bình luận | 🟡 Trung bình |
| TC-18.2 | Viết đánh giá thành công | Đã đăng nhập, chọn rating 1-5 + viết nội dung | Tạo đánh giá thành công, hiển thị trên trang SP | 🟡 Trung bình |
| TC-18.3 | Viết đánh giá - chưa đăng nhập | Chưa login, click "Đánh giá" | Yêu cầu đăng nhập | 🟡 Trung bình |
| TC-18.4 | Viết đánh giá - đã đánh giá rồi | User đã từng đánh giá SP này | Báo lỗi "Bạn đã đánh giá sản phẩm này" | 🟡 Trung bình |
| TC-18.5 | Đánh giá - không chọn rating | Bỏ trống rating | Báo lỗi validation | 🟢 Thấp |

---

## Module 19: Yêu cầu tư vấn

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-19.1 | Gửi yêu cầu tư vấn thành công | Họ tên, SĐT, email, ghi chú, sản phẩm quan tâm | Gửi thành công, hiển thị thông báo xác nhận | 🟡 Trung bình |
| TC-19.2 | Gửi yêu cầu tư vấn - thiếu trường bắt buộc | Bỏ trống SĐT | Báo lỗi validation | 🟢 Thấp |
| TC-19.3 | Admin: Xem danh sách yêu cầu tư vấn | Truy cập trang quản lý tư vấn | Hiển thị danh sách có phân trang, lọc theo status | 🟡 Trung bình |
| TC-19.4 | Admin: Cập nhật trạng thái tư vấn | Đổi status: Chưa xử lý → Đã liên hệ → Hoàn thành | Cập nhật thành công | 🟡 Trung bình |
| TC-19.5 | Admin: Ghi chú nội bộ | Nhập ghi chú cho nhân viên | Lưu ghi chú thành công | 🟢 Thấp |

---

## Module 20: Thông báo (Admin)

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-20.1 | Tải danh sách thông báo | Truy cập Admin panel | Hiển thị danh sách thông báo (đơn mới, hủy, hết hàng) | 🟡 Trung bình |
| TC-20.2 | Đánh dấu thông báo đã đọc | Click vào 1 thông báo | Trạng thái chuyển thành "Đã đọc" | 🟢 Thấp |
| TC-20.3 | Nhận thông báo đơn hàng mới | Khách hàng đặt đơn hàng | Admin nhận thông báo type=1 (order) | 🟡 Trung bình |
| TC-20.4 | Nhận thông báo hủy đơn | Khách hàng hủy đơn hàng | Admin nhận thông báo type=2 (cancel) | 🟡 Trung bình |
| TC-20.5 | Nhận thông báo hết hàng | Variant có (stock - sold) ≤ 100 | Admin nhận thông báo type=3 (out-of-stock) | 🟡 Trung bình |

---

## Module 21: Quản lý Thông tin Công ty

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-21.1 | Xem thông tin công ty | Truy cập trang Settings | Hiển thị thông tin: tên, SĐT, mã số thuế, địa chỉ | 🟢 Thấp |
| TC-21.2 | Cập nhật thông tin công ty | Thay đổi SĐT, địa chỉ | Cập nhật thành công | 🟢 Thấp |
| TC-21.3 | Tạo thông tin công ty (lần đầu) | Nhập đầy đủ thông tin | Tạo thành công | 🟢 Thấp |

---

## Module 22: Scheduled Tasks (Tác vụ tự động)

| ID | Tên Test Case | Dữ liệu đầu vào | Kết quả mong đợi | Mức ưu tiên |
|---|---|---|---|---|
| TC-22.1 | Tự động kích hoạt KM khi đến ngày | Tạo KM với startDate = hôm nay, endDate = ngày mai | Sau 1 phút: isActive=1, salePrice của SP được tính lại | 🔴 Cao |
| TC-22.2 | Tự động hủy KM khi hết hạn | KM có endDate = hôm qua | Sau 1 phút: isActive=0, salePrice reset về giá gốc | 🔴 Cao |
| TC-22.3 | Cảnh báo hàng tồn kho thấp | Variant có stock=100, sold=95 → còn 5 | Hệ thống tạo notification type=3 vào lúc 20:30 | 🟡 Trung bình |
| TC-22.4 | Không cảnh báo khi tồn kho đủ | Variant có stock=200, sold=10 → còn 190 | Không tạo notification | 🟡 Trung bình |

---

## Tổng hợp

| Mức ưu tiên | Số lượng Test Case | Mô tả |
|---|---|---|
| 🔴 **Cao** | 30 | Luồng chính: login, xem SP, giỏ hàng, đặt hàng, thanh toán, phân quyền, scheduled tasks |
| 🟡 **Trung bình** | 66 | Chức năng phụ trợ: filter, CRUD, profile, address, đánh giá, tư vấn, thông báo |
| 🟢 **Thấp** | 22 | Chức năng ít quan trọng: tin tức, KM, banner, công ty, edge cases |
| **Tổng** | **118** | |

---

## Thứ tự thực hiện Test (đề xuất)

| Giai đoạn | Module | Mô tả |
|---|---|---|
| **Giai đoạn 1** | Module 1, 11, 16 | Xác thực, đăng nhập Admin, phân quyền (nền tảng) |
| **Giai đoạn 2** | Module 3, 4, 5, 17 | Sản phẩm, giỏ hàng, đặt hàng, thanh toán (luồng mua hàng E2E) |
| **Giai đoạn 3** | Module 13, 15, 12, 22 | Admin: quản lý SP, đơn hàng, dashboard, tác vụ tự động |
| **Giai đoạn 4** | Module 2, 14, 16, 17, 18, 6 | Địa chỉ, danh mục, người dùng, banner, KM, tin tức |
| **Giai đoạn 5** | Module 18, 19, 20, 21, 10 | Đánh giá SP, tư vấn, thông báo, công ty, trang tĩnh |
