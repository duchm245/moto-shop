# Sơ đồ ERD - Cơ sở dữ liệu MotoShop (Phiên bản Thẩm mỹ)

Dưới đây là sơ đồ ERD chính xác được ánh xạ trực tiếp từ các entity JPA trong mã nguồn Java của backend (`MotoShop_BE`). 

Sơ đồ này đã được thiết kế lại để:
1. **Khắc phục các lỗi logic của ảnh cũ:** Loại bỏ bảng lặp, nối dây chính xác đến các khóa ngoại thực tế.
2. **Đẹp và gọn gàng hơn:** Sử dụng giao diện màu vàng kem (`#FFF2CC`) chủ đạo, viền đen và chữ đen tối giản giống hệt phong cách gọn gàng của ảnh cũ trước đây.

```mermaid
---
config:
  theme: base
  themeVariables:
    primaryColor: "#fff2cc"
    primaryTextColor: "#000000"
    primaryBorderColor: "#000000"
    lineColor: "#000000"
    fontSize: "15px"
    fontFamily: "Arial"
---
erDiagram
    %% --- Core Entities Group ---
    USER {
        long id PK
        string username
        string password
        string email
        string firstName
        string lastName
        string phone
        int status
        Date createdDate
    }
    ROLE {
        long id PK
        string name
    }
    USER_ROLES {
        long user_id FK
        long role_id FK
    }
    ADDRESS {
        long id PK
        long user_id FK
        string province
        string district
        string wards
        string addressDetail
        boolean isDefault
    }

    %% --- Catalog Group ---
    CATEGORY {
        long id PK
        string name
        string image
        int status
        int type
        long parent_id FK
    }
    PRODUCT {
        long id PK
        string name
        string sku
        int price
        int salePrice
        int status
        string brand
        string vehicleType
        string displacement
        boolean newArrival
        long product_category_id FK
        long sale_id FK
    }
    PRODUCT_IMAGE {
        long id PK
        string url
        long product_id FK
    }
    VARIANT {
        long id PK
        string name
        string colorName
        string colorCode
        int stock
        int sold
        long product_id FK
    }
    SALE {
        long id PK
        string name
        int discount
        Date startDate
        Date endDate
        boolean isActive
    }

    %% --- Transactions & Admin Group ---
    ORDERS {
        long id PK
        string codeOrders
        string fullName
        string phone
        int status
        int totalPrice
        string paymentMethod
        long user_id FK
        long address_id FK
    }
    ORDER_ITEM {
        long id PK
        int quantity
        int sellPrice
        string productName
        long variantId
        long order_id FK
    }
    BANNER {
        long id PK
        string name
        string src
        Date createdDate
        int status
        long category_id FK
    }
    ARTICLE {
        long id PK
        string title
        string shortContent
        string content
        string author
        Date createdDate
        string image
        int status
        long user_id FK
        long category_id FK
    }
    NOTIFICATION {
        long id PK
        string content
        boolean isRead
        int type
        long order_id FK
        long product_id FK
    }

    %% --- Relationship Layout ---
    
    %% User & Security
    USER ||--o{ USER_ROLES : "has"
    ROLE ||--o{ USER_ROLES : "assigned_to"
    USER ||--o{ ADDRESS : "has"
    
    %% Orders
    USER ||--o{ ORDERS : "places"
    ADDRESS ||--o{ ORDERS : "ships_to"
    ORDERS ||--o{ ORDER_ITEM : "contains"
    
    %% Product Catalog
    CATEGORY ||--o{ PRODUCT : "contains"
    PRODUCT ||--o{ VARIANT : "has"
    PRODUCT ||--o{ PRODUCT_IMAGE : "has"
    SALE ||--o{ PRODUCT : "applies_to"
    
    %% Category Extensions
    CATEGORY ||--o{ CATEGORY : "parentOf"
    CATEGORY ||--o{ BANNER : "displays"
    CATEGORY ||--o{ ARTICLE : "categorizes"
    USER ||--o{ ARTICLE : "writes"
    
    %% Notifications
    ORDERS ||--o{ NOTIFICATION : "triggers"
    PRODUCT ||--o{ NOTIFICATION : "triggers"
```
