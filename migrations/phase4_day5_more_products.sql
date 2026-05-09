-- ============================================================
-- Phase 4 · Day 5 — Them 32 san pham xe may moi
--   Honda: 14 xe (ID 107-120)
--   Yamaha: 10 xe (ID 121-130)
--   SYM:    8 xe (ID 131-138)
-- ============================================================
USE motorbike_shop;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- BUOC 1: PRODUCTS
-- ============================================================

INSERT IGNORE INTO product (
    id, name, description, sku, price, sale_price, status, visited,
    vehicle_condition, manufacturing_year, mileage,
    brand, vehicle_type, is_new,
    engine_type, displacement, max_power, max_torque, transmission,
    fuel_system, fuel_capacity, fuel_consumption,
    dimensions, weight, seat_height, ground_clearance,
    warranty_info, origin,
    installment_supported, installment_months, down_payment_percent,
    product_author_id, product_category_id, sale_id,
    created_date, modified_date
)
VALUES

-- Honda Wave RSX 110 (ID 107)
(107,'Honda Wave RSX 110','<p>Honda Wave RSX 110 - xe so the thao voi thiet ke tre trung, dong co 4 thi tiet kiem nhien lieu, phu hop hoc sinh sinh vien.</p>','HONDA-WAVE-RSX-110',
 30490000,30490000,1,0,'new',2024,0,'Honda','Xe so',1,
 '4 thi, SOHC, 2 van',110,'5.5 kW / 7500 rpm','8.05 Nm / 5500 rpm','4 so',
 'Phun xang dien tu PGM-FI',3.7,'1.66 lit/100km',
 '1897 x 696 x 1069 mm',101,771,149,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,31,NULL,NOW(),NOW()),

-- Honda Future 125 FI (ID 108)
(108,'Honda Future 125 FI','<p>Honda Future 125 FI - xe so quoc dan voi thiet ke don gian, tiet kiem nhien lieu va do ben cao, lua chon cua hang trieu nguoi Viet.</p>','HONDA-FUTURE-125-FI',
 30290000,30290000,1,0,'new',2024,0,'Honda','Xe so',0,
 '4 thi, SOHC, 2 van',125,'6.7 kW / 7500 rpm','10.0 Nm / 6000 rpm','4 so',
 'Phun xang dien tu PGM-FI',4.0,'1.58 lit/100km',
 '1924 x 699 x 1076 mm',107,778,148,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,31,NULL,NOW(),NOW()),

-- Honda Super Cub C125 (ID 109)
(109,'Honda Super Cub C125','<p>Honda Super Cub C125 - huyen thoai 60 nam tuoi voi thiet ke co dien dac biet, dong co 125cc hien dai va kha nang tiet kiem nhien lieu tuyet voi.</p>','HONDA-SUPER-CUB-C125',
 68000000,68000000,1,0,'new',2024,0,'Honda','Xe so',1,
 '4 thi, SOHC, 2 van, lam mat bang khong khi',125,'6.9 kW / 7500 rpm','10.3 Nm / 5500 rpm','4 so tu dong',
 'Phun xang dien tu PGM-FI',3.7,'1.82 lit/100km',
 '1869 x 760 x 1000 mm',102,779,135,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,31,NULL,NOW(),NOW()),

-- Honda Blade 125 (ID 110)
(110,'Honda Blade 125','<p>Honda Blade 125 - xe so tre trung voi thiet ke sporty an tuong, dong co 125cc manh me va tiet kiem nhien lieu voi he thong phun xang PGM-FI.</p>','HONDA-BLADE-125',
 23990000,23990000,1,0,'new',2024,0,'Honda','Xe so',0,
 '4 thi, SOHC, 2 van',125,'7.0 kW / 7500 rpm','10.12 Nm / 5500 rpm','4 so',
 'Phun xang dien tu PGM-FI',3.7,'1.73 lit/100km',
 '1918 x 692 x 1067 mm',103,770,145,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,31,NULL,NOW(),NOW()),

-- Honda Vision 110 (ID 111)
(111,'Honda Vision 110','<p>Honda Vision - xe tay ga quoc dan voi thiet ke thanh lich, suc chua hang hoa lon va tiet kiem nhien lieu xuat sac, phu hop cho nguoi di hang ngay.</p>','HONDA-VISION-110',
 32990000,32990000,1,0,'new',2024,0,'Honda','Xe tay ga',1,
 '4 thi, SOHC, 2 van, lam mat bang khong khi',110,'6.0 kW / 8000 rpm','8.68 Nm / 5500 rpm','Tay ga (CVT)',
 'Phun xang dien tu PGM-FI',5.0,'1.76 lit/100km',
 '1824 x 683 x 1088 mm',104,761,130,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,32,NULL,NOW(),NOW()),

-- Honda Vario 125 (ID 112)
(112,'Honda Vario 125','<p>Honda Vario 125 - xe tay ga the thao voi thiet ke khoe khoan, dong co eSP 125cc tiet kiem nhien lieu va nhieu tinh nang hien dai.</p>','HONDA-VARIO-125',
 39990000,39990000,1,0,'new',2024,0,'Honda','Xe tay ga',0,
 '4 thi, SOHC, 2 van, eSP',125,'8.3 kW / 8500 rpm','10.9 Nm / 5000 rpm','Tay ga (CVT)',
 'Phun xang dien tu PGM-FI',5.5,'1.76 lit/100km',
 '1939 x 694 x 1133 mm',116,789,140,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,32,NULL,NOW(),NOW()),

-- Honda Vario 160 (ID 113)
(113,'Honda Vario 160','<p>Honda Vario 160 - xe tay ga phan khuc cao voi dong co 160cc manh me, thiet ke sang trong va nhieu tinh nang cong nghe tien tien.</p>','HONDA-VARIO-160',
 50490000,50490000,1,0,'new',2024,0,'Honda','Xe tay ga',1,
 '4 thi, SOHC, 2 van, eSP+',160,'12.3 kW / 8500 rpm','14.7 Nm / 6500 rpm','Tay ga (CVT)',
 'Phun xang dien tu PGM-FI',5.5,'1.98 lit/100km',
 '1936 x 694 x 1133 mm',125,790,143,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,32,NULL,NOW(),NOW()),

-- Honda SH Mode 125 (ID 114)
(114,'Honda SH Mode 125','<p>Honda SH Mode 125 - xe tay ga cao cap phan khuc trung voi thiet ke thanh lich, trang bi day du tinh nang va cong nghe hien dai.</p>','HONDA-SH-MODE-125',
 56990000,56990000,1,0,'new',2024,0,'Honda','Xe tay ga',0,
 '4 thi, SOHC, 2 van, eSP',125,'8.7 kW / 8500 rpm','11.2 Nm / 5000 rpm','Tay ga (CVT)',
 'Phun xang dien tu PGM-FI',5.7,'1.74 lit/100km',
 '1924 x 696 x 1153 mm',129,768,155,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,32,NULL,NOW(),NOW()),

-- Honda SH 160i (ID 115)
(115,'Honda SH 160i','<p>Honda SH 160i - bieu tuong xe tay ga cao cap Viet Nam voi dong co 160cc, thiet ke sang trong dang cap va nhieu trang bi tien nghi hang dau.</p>','HONDA-SH-160I',
 77990000,77990000,1,0,'new',2024,0,'Honda','Xe tay ga',0,
 '4 thi, SOHC, 2 van, eSP+',160,'12.3 kW / 8500 rpm','14.7 Nm / 6500 rpm','Tay ga (CVT)',
 'Phun xang dien tu PGM-FI',8.0,'2.1 lit/100km',
 '1940 x 698 x 1148 mm',140,790,150,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,32,NULL,NOW(),NOW()),

-- Honda ADV 350 (ID 116)
(116,'Honda ADV 350','<p>Honda ADV350 - adventure scooter cao cap voi dong co 350cc, thiet ke kham pha duong truong, trang bi he thong ABS va nhieu cong nghe tien tien.</p>','HONDA-ADV-350',
 120000000,120000000,1,0,'new',2024,0,'Honda','Xe tay ga',1,
 '4 thi, SOHC, 4 van, lam mat bang nuoc',350,'25.8 kW / 7500 rpm','32 Nm / 5250 rpm','Tay ga (CVT)',
 'Phun xang dien tu PGM-FI',11.0,'3.3 lit/100km',
 '2175 x 815 x 1320 mm',212,805,165,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,32,NULL,NOW(),NOW()),

-- Honda Winner X (ID 117)
(117,'Honda Winner X','<p>Honda Winner X - xe con tay the thao voi dong co 150cc manh me, thiet ke hung han va he thong phun xang Fi cho hieu suat van hanh vuot troi.</p>','HONDA-WINNER-X',
 45690000,45690000,1,0,'new',2024,0,'Honda','Xe con tay',1,
 '4 thi, DOHC, 4 van, lam mat bang nuoc',150,'12.0 kW / 10000 rpm','13.8 Nm / 8000 rpm','6 so',
 'Phun xang dien tu PGM-FI',4.8,'2.1 lit/100km',
 '2007 x 698 x 1077 mm',123,795,175,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,33,NULL,NOW(),NOW()),

-- Honda CBR150R (ID 118)
(118,'Honda CBR150R','<p>Honda CBR150R - sportbike thuan thuy voi thiet ke khi dong nhu CBR1000RR, dong co 150cc DOHC 4 van suc manh an tuong trong phan khuc 150cc.</p>','HONDA-CBR150R',
 89000000,89000000,1,0,'new',2024,0,'Honda','Xe con tay',1,
 '4 thi, DOHC, 4 van, lam mat bang nuoc',150,'12.5 kW / 10000 rpm','13.8 Nm / 8500 rpm','6 so',
 'Phun xang dien tu PGM-FI',11.0,'2.8 lit/100km',
 '2012 x 726 x 1064 mm',136,795,170,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,33,NULL,NOW(),NOW()),

-- Honda CB350 H-ness (ID 119)
(119,'Honda CB350 H-ness','<p>Honda CB350 - neo-classic phong cach retro voi dong co 350cc 2 xi-lanh, thiet ke co dien sang trong ket hop cong nghe hien dai.</p>','HONDA-CB350-HNESS',
 150000000,150000000,1,0,'new',2024,0,'Honda','Xe con tay',1,
 '4 thi, OHC, 2 xi-lanh song song',350,'21.0 kW / 5500 rpm','29.0 Nm / 3000 rpm','5 so',
 'Phun xang dien tu PGM-FI',15.0,'3.5 lit/100km',
 '2117 x 800 x 1107 mm',181,800,166,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,36,20,1,33,NULL,NOW(),NOW()),

-- Honda CUV e (ID 120)
(120,'Honda CUV e','<p>Honda CUV e - xe may dien cao cap voi thiet ke hien dai, pin Li-ion dung luong lon, ket noi smartphone va nhieu tinh nang thong minh hang dau.</p>','HONDA-CUV-E',
 50000000,50000000,1,0,'new',2024,0,'Honda','Xe dien',1,
 'Dong co dien Hub-motor',NULL,'1.4 kW (dinh 4 kW)',NULL,'Tay ga (1 cap)',
 'Dien (pin Li-ion)',NULL,'2.2 kWh/100km',
 '1875 x 720 x 1082 mm',108,745,152,
 '3 nam hoac 30000 km','Honda Viet Nam',
 1,0,0,1,34,NULL,NOW(),NOW()),

-- Yamaha Jupiter FI (ID 121)
(121,'Yamaha Jupiter FI','<p>Yamaha Jupiter FI - xe so quen thuoc voi nguoi Viet voi thiet ke gon gang, dong co 113cc BluCore tiet kiem nhien lieu hang dau phan khuc.</p>','YAMAHA-JUPITER-FI',
 18400000,18400000,1,0,'new',2024,0,'Yamaha','Xe so',0,
 '4 thi, SOHC, 2 van, BluCore',113,'6.0 kW / 8000 rpm','8.7 Nm / 6000 rpm','4 so',
 'Phun xang dien tu',4.2,'1.47 lit/100km',
 '1880 x 695 x 1060 mm',99,763,141,
 '3 nam hoac 30000 km','Yamaha Viet Nam',
 1,36,20,1,31,NULL,NOW(),NOW()),

-- Yamaha Jupiter Finn (ID 122)
(122,'Yamaha Jupiter Finn','<p>Yamaha Jupiter Finn - phien ban nang cap cua Jupiter voi dong co BluCore the he moi, thiet ke sang trong va tinh nang bao ve tu dong tien tien.</p>','YAMAHA-JUPITER-FINN',
 20490000,20490000,1,0,'new',2024,0,'Yamaha','Xe so',1,
 '4 thi, SOHC, 2 van, BluCore',113,'6.0 kW / 8000 rpm','8.7 Nm / 6000 rpm','4 so tu dong',
 'Phun xang dien tu',4.2,'1.47 lit/100km',
 '1880 x 695 x 1060 mm',100,763,141,
 '3 nam hoac 30000 km','Yamaha Viet Nam',
 1,36,20,1,31,NULL,NOW(),NOW()),

-- Yamaha NVX 155 VVA (ID 123)
(123,'Yamaha NVX 155 VVA','<p>Yamaha NVX 155 VVA - xe tay ga the thao voi thiet ke hieu suat cao, dong co 155cc VVA cho cam giac van hanh manh me va tiet kiem nhien lieu.</p>','YAMAHA-NVX-155-VVA',
 53900000,53900000,1,0,'new',2024,0,'Yamaha','Xe tay ga',0,
 '4 thi, SOHC, 4 van, VVA',155,'11.4 kW / 8000 rpm','14.0 Nm / 6000 rpm','Tay ga (CVT)',
 'Phun xang dien tu',5.4,'2.0 lit/100km',
 '1940 x 680 x 1140 mm',127,790,150,
 '3 nam hoac 30000 km','Yamaha Viet Nam',
 1,36,20,1,32,NULL,NOW(),NOW()),

-- Yamaha Janus 125 (ID 124)
(124,'Yamaha Janus 125','<p>Yamaha Janus 125 - xe tay ga pho thong voi thiet ke thanh lich, dong co 125cc tiet kiem nhien lieu va khoang chua do lon tien loi.</p>','YAMAHA-JANUS-125',
 30490000,30490000,1,0,'new',2024,0,'Yamaha','Xe tay ga',0,
 '4 thi, SOHC, 4 van, BluCore',125,'7.0 kW / 8000 rpm','10.0 Nm / 6000 rpm','Tay ga (CVT)',
 'Phun xang dien tu',4.9,'1.85 lit/100km',
 '1812 x 668 x 1120 mm',98,760,135,
 '3 nam hoac 30000 km','Yamaha Viet Nam',
 1,36,20,1,32,NULL,NOW(),NOW()),

-- Yamaha Freego 125 (ID 125)
(125,'Yamaha Freego 125','<p>Yamaha Freego 125 - xe tay ga thong minh voi he thong Y-Connect ket noi smartphone, thiet ke tre trung an tuong va tinh nang Smart Key hien dai.</p>','YAMAHA-FREEGO-125',
 31490000,31490000,1,0,'new',2024,0,'Yamaha','Xe tay ga',1,
 '4 thi, SOHC, 4 van, BluCore',125,'7.3 kW / 8000 rpm','10.6 Nm / 6000 rpm','Tay ga (CVT)',
 'Phun xang dien tu',5.0,'1.85 lit/100km',
 '1836 x 704 x 1149 mm',104,760,145,
 '3 nam hoac 30000 km','Yamaha Viet Nam',
 1,36,20,1,32,NULL,NOW(),NOW()),

-- Yamaha Latte 125 (ID 126)
(126,'Yamaha Latte 125','<p>Yamaha Latte 125 - xe tay ga danh cho nu voi thiet ke nhe nhang uyen chuyen, mam xa phong thap giu xe de dang va nhieu tinh nang thong minh.</p>','YAMAHA-LATTE-125',
 39490000,39490000,1,0,'new',2024,0,'Yamaha','Xe tay ga',1,
 '4 thi, SOHC, 4 van, BluCore',125,'7.0 kW / 8000 rpm','10.0 Nm / 6000 rpm','Tay ga (CVT)',
 'Phun xang dien tu',4.0,'1.85 lit/100km',
 '1765 x 680 x 1090 mm',97,720,130,
 '3 nam hoac 30000 km','Yamaha Viet Nam',
 1,36,20,1,32,NULL,NOW(),NOW()),

-- Yamaha MT-15 (ID 127)
(127,'Yamaha MT-15','<p>Yamaha MT-15 - naked bike the thao voi thiet ke MT-DNA hung han, dong co 155cc VVA manh me va he thong traction control cho cam giac lai dinh cao.</p>','YAMAHA-MT15',
 71900000,71900000,1,0,'new',2024,0,'Yamaha','Xe con tay',1,
 '4 thi, SOHC, 4 van, VVA, lam mat bang nuoc',155,'13.6 kW / 10000 rpm','14.1 Nm / 7500 rpm','6 so',
 'Phun xang dien tu',10.0,'2.8 lit/100km',
 '1930 x 800 x 1055 mm',139,810,160,
 '3 nam hoac 30000 km','Yamaha Viet Nam',
 1,36,20,1,33,NULL,NOW(),NOW()),

-- Yamaha MT-03 (ID 128)
(128,'Yamaha MT-03','<p>Yamaha MT-03 - naked bike 2 xi-lanh manh me voi dong co 321cc, thiet ke MT-DNA du ngoai an tuong va the tao van hanh the thao dinh cao.</p>','YAMAHA-MT03',
 115000000,115000000,1,0,'new',2024,0,'Yamaha','Xe con tay',1,
 '4 thi, DOHC, 4 van, 2 xi-lanh song song, lam mat bang nuoc',321,'31.0 kW / 10750 rpm','29.5 Nm / 9000 rpm','6 so',
 'Phun xang dien tu',14.0,'3.8 lit/100km',
 '2005 x 740 x 1050 mm',168,780,145,
 '3 nam hoac 30000 km','Yamaha Viet Nam',
 1,36,20,1,33,NULL,NOW(),NOW()),

-- Yamaha XSR155 (ID 129)
(129,'Yamaha XSR155','<p>Yamaha XSR155 - neo-retro sport voi thiet ke co dien ket hop hieu suat hien dai, dong co 155cc VVA va khung kim cuong chac chan cho trai nghiem lai thu vi.</p>','YAMAHA-XSR155',
 79900000,79900000,1,0,'new',2024,0,'Yamaha','Xe con tay',1,
 '4 thi, SOHC, 4 van, VVA, lam mat bang nuoc',155,'13.6 kW / 10000 rpm','14.4 Nm / 8000 rpm','6 so',
 'Phun xang dien tu',10.0,'2.8 lit/100km',
 '2000 x 800 x 1060 mm',134,810,160,
 '3 nam hoac 30000 km','Yamaha Viet Nam',
 1,36,20,1,33,NULL,NOW(),NOW()),

-- Yamaha YZF-R15M (ID 130)
(130,'Yamaha YZF-R15M','<p>Yamaha YZF-R15M - fullsport thu thuat cua MotoGP, trang bi VVA, TCS va quickshifter, the hien tinh than chien binh dua trong phan khuc 150cc.</p>','YAMAHA-R15M',
 90000000,90000000,1,0,'new',2024,0,'Yamaha','Xe con tay',1,
 '4 thi, SOHC, 4 van, VVA, lam mat bang nuoc',155,'13.6 kW / 10000 rpm','14.2 Nm / 8500 rpm','6 so',
 'Phun xang dien tu',11.0,'2.9 lit/100km',
 '1990 x 720 x 1060 mm',142,815,170,
 '3 nam hoac 30000 km','Yamaha Viet Nam',
 1,36,20,1,33,NULL,NOW(),NOW()),

-- SYM Angela 50 (ID 131)
(131,'SYM Angela 50','<p>SYM Angela 50 - xe tay ga pho thong danh cho nu voi thiet ke nhe nhang, gon gang, de di trong noi thanh, dong co 50cc on dinh va tiet kiem.</p>','SYM-ANGELA-50',
 11990000,11990000,1,0,'new',2024,0,'SYM','Xe tay ga',0,
 '4 thi, 1 xi-lanh, lam mat bang khong khi',50,'2.2 kW / 7500 rpm','3.5 Nm / 6000 rpm','Tay ga (CVT)',
 'Che hoa khi',3.5,'1.4 lit/100km',
 '1700 x 660 x 1055 mm',77,720,120,
 '1 nam hoac 10000 km','SYM Viet Nam',
 0,0,0,1,32,NULL,NOW(),NOW()),

-- SYM Attila 50 (ID 132)
(132,'SYM Attila 50','<p>SYM Attila 50 - xe tay ga co dien voi thiet ke sang trong duoc yeu thich tu nhieu the he, dong co on dinh, de bao tri va phu hop su dung hang ngay.</p>','SYM-ATTILA-50',
 12490000,12490000,1,0,'new',2024,0,'SYM','Xe tay ga',0,
 '4 thi, 1 xi-lanh, lam mat bang khong khi',50,'2.2 kW / 7500 rpm','3.5 Nm / 6000 rpm','Tay ga (CVT)',
 'Che hoa khi',3.5,'1.4 lit/100km',
 '1700 x 660 x 1055 mm',78,720,120,
 '1 nam hoac 10000 km','SYM Viet Nam',
 0,0,0,1,32,NULL,NOW(),NOW()),

-- SYM Elegant 50 (ID 133)
(133,'SYM Elegant 50','<p>SYM Elegant 50 - xe tay ga 50cc phan khuc binh dan voi thiet ke don gian, gon nhe, de bao tri va gia ca phai chang, lua chon tot cho hoc sinh.</p>','SYM-ELEGANT-50',
 10490000,10490000,1,0,'new',2024,0,'SYM','Xe tay ga',0,
 '4 thi, 1 xi-lanh, lam mat bang khong khi',50,'2.0 kW / 7000 rpm','3.2 Nm / 5500 rpm','Tay ga (CVT)',
 'Che hoa khi',3.5,'1.4 lit/100km',
 '1690 x 640 x 1040 mm',74,715,120,
 '1 nam hoac 10000 km','SYM Viet Nam',
 0,0,0,1,32,NULL,NOW(),NOW()),

-- SYM Elite 50 (ID 134)
(134,'SYM Elite 50','<p>SYM Elite 50 - xe tay ga 50cc the he moi voi thiet ke hien dai, dong co on dinh va nhieu mau sac de lua chon, trang bi hop so CVT tien loi.</p>','SYM-ELITE-50',
 11490000,11490000,1,0,'new',2024,0,'SYM','Xe tay ga',0,
 '4 thi, 1 xi-lanh, lam mat bang khong khi',50,'2.2 kW / 7500 rpm','3.5 Nm / 6000 rpm','Tay ga (CVT)',
 'Che hoa khi',3.5,'1.4 lit/100km',
 '1700 x 655 x 1050 mm',76,718,120,
 '1 nam hoac 10000 km','SYM Viet Nam',
 0,0,0,1,32,NULL,NOW(),NOW()),

-- SYM Galaxy 50 (ID 135)
(135,'SYM Galaxy 50','<p>SYM Galaxy 50 - xe tay ga 50cc voi thiet ke tre trung nang dong, chat luong tay ga SYM voi gia ca hop ly phu hop cho hoc sinh sinh vien.</p>','SYM-GALAXY-50',
 12990000,12990000,1,0,'new',2024,0,'SYM','Xe tay ga',0,
 '4 thi, 1 xi-lanh, lam mat bang khong khi',50,'2.2 kW / 7500 rpm','3.5 Nm / 6000 rpm','Tay ga (CVT)',
 'Che hoa khi',3.5,'1.4 lit/100km',
 '1710 x 665 x 1060 mm',78,722,122,
 '1 nam hoac 10000 km','SYM Viet Nam',
 0,0,0,1,32,NULL,NOW(),NOW()),

-- SYM Husky Classic 125 (ID 136)
(136,'SYM Husky Classic 125','<p>SYM Husky Classic 125 - xe so phong cach co dien doc dao trong phan khuc 125cc, dong co tiet kiem nhien lieu va thiet ke retro an tuong.</p>','SYM-HUSKY-CLASSIC-125',
 35000000,35000000,1,0,'new',2024,0,'SYM','Xe so',1,
 '4 thi, 1 xi-lanh, lam mat bang khong khi',125,'6.0 kW / 7000 rpm','9.0 Nm / 5500 rpm','5 so',
 'Phun xang dien tu',12.0,'2.0 lit/100km',
 '2030 x 770 x 1080 mm',128,780,150,
 '2 nam hoac 20000 km','SYM Viet Nam',
 1,36,20,1,31,NULL,NOW(),NOW()),

-- SYM Passing 50 (ID 137)
(137,'SYM Passing 50','<p>SYM Passing 50 - xe tay ga 50cc pho thong voi gia ca re nhat phan khuc, de bao tri va on dinh, lua chon kinh te cho nguoi di lam hang ngay.</p>','SYM-PASSING-50',
 10990000,10990000,1,0,'new',2024,0,'SYM','Xe tay ga',0,
 '4 thi, 1 xi-lanh, lam mat bang khong khi',50,'2.0 kW / 7000 rpm','3.2 Nm / 5500 rpm','Tay ga (CVT)',
 'Che hoa khi',3.5,'1.4 lit/100km',
 '1680 x 640 x 1040 mm',73,713,118,
 '1 nam hoac 10000 km','SYM Viet Nam',
 0,0,0,1,32,NULL,NOW(),NOW()),

-- SYM Shark 50 (ID 138)
(138,'SYM Shark 50','<p>SYM Shark 50 - xe tay ga 50cc voi thiet ke the thao an tuong, dong co on dinh va ty le gia tri tot nhat trong dong san pham SYM 50cc.</p>','SYM-SHARK-50',
 12490000,12490000,1,0,'new',2024,0,'SYM','Xe tay ga',0,
 '4 thi, 1 xi-lanh, lam mat bang khong khi',50,'2.2 kW / 7500 rpm','3.5 Nm / 6000 rpm','Tay ga (CVT)',
 'Che hoa khi',3.5,'1.4 lit/100km',
 '1720 x 660 x 1060 mm',79,720,122,
 '1 nam hoac 10000 km','SYM Viet Nam',
 0,0,0,1,32,NULL,NOW(),NOW());

-- ============================================================
-- BUOC 2: VARIANTS
-- ============================================================
DELETE FROM variant WHERE product_id BETWEEN 107 AND 138;

INSERT INTO variant (name, color_name, color_code, stock, sold, product_id) VALUES
-- Honda Wave RSX 110 (107)
('Tieu Chuan','Do den','#CC0000',40,0,107),
('Tieu Chuan','Trang den','#F5F5F5',35,0,107),
-- Honda Future 125 (108)
('Tieu Chuan','Xanh den','#1A237E',40,0,108),
('Tieu Chuan','Do den','#B71C1C',35,0,108),
-- Honda Super Cub C125 (109)
('Tieu Chuan','Do','#CC0000',20,0,109),
('Tieu Chuan','Den','#212121',15,0,109),
-- Honda Blade 125 (110)
('Tieu Chuan','Do den','#CC0000',45,0,110),
('Tieu Chuan','Trang den','#F5F5F5',40,0,110),
-- Honda Vision (111)
('Tieu Chuan','Trang ngoc trai','#ECEFF1',50,0,111),
('Tieu Chuan','Den','#212121',45,0,111),
-- Honda Vario 125 (112)
('The Thao','Do den','#CC0000',35,0,112),
('Tieu Chuan','Trang bac','#F5F5F5',30,0,112),
-- Honda Vario 160 (113)
('Dac Biet','Xanh xam','#546E7A',25,0,113),
('Tieu Chuan','Den nham','#212121',20,0,113),
-- Honda SH Mode 125 (114)
('Tieu Chuan','Trang ngoc','#ECEFF1',25,0,114),
('Dac Biet','Den bong','#212121',20,0,114),
-- Honda SH 160i (115)
('Tieu Chuan','Trang','#FFFFFF',20,0,115),
('Dac Biet','Do den','#B71C1C',15,0,115),
-- Honda ADV350 (116)
('Tieu Chuan','Do den','#CC0000',10,0,116),
('Dac Biet','Xanh bac','#78909C',8,0,116),
-- Honda Winner X (117)
('Tieu Chuan','Den do','#212121',30,0,117),
('The Thao','Xanh den','#1A237E',25,0,117),
-- Honda CBR150R (118)
('Tieu Chuan','Do den','#CC0000',15,0,118),
('Tieu Chuan','Den trang','#212121',12,0,118),
-- Honda CB350 H-ness (119)
('Tieu Chuan','Xanh den','#1A237E',8,0,119),
('Tieu Chuan','Den','#212121',6,0,119),
-- Honda CUV e (120)
('Ban Tieu Chuan','Trang ngoc trai','#ECEFF1',20,0,120),
('Ban Cao Cap','Xanh duong','#1565C0',15,0,120),
-- Yamaha Jupiter FI (121)
('Tieu Chuan','Do metallic','#CC0000',50,0,121),
('Tieu Chuan','Xanh den','#1A237E',45,0,121),
-- Yamaha Jupiter Finn (122)
('Tieu Chuan','Do metallic','#CC0000',40,0,122),
('Premium','Vang metallic','#FFD700',30,0,122),
-- Yamaha NVX 155 (123)
('Tieu Chuan','Den nham','#212121',30,0,123),
('Dac Biet','Do candy','#CC0000',25,0,123),
-- Yamaha Janus 125 (124)
('Tieu Chuan','Den metallic','#212121',40,0,124),
('Dac Biet','Do metallic','#CC0000',35,0,124),
-- Yamaha Freego (125)
('Tieu Chuan','Do metallic','#CC0000',35,0,125),
('Dac Biet','Do nham','#B71C1C',30,0,125),
-- Yamaha Latte (126)
('Tieu Chuan','Xanh navy','#1A237E',30,0,126),
('Gioi Han','Xam den','#546E7A',20,0,126),
-- Yamaha MT-15 (127)
('Tieu Chuan','Den','#212121',20,0,127),
('Mau Moi','Xanh den','#1A237E',15,0,127),
-- Yamaha MT-03 (128)
('Tieu Chuan','Den','#212121',10,0,128),
('Fluo','Vang xanh','#CDDC39',8,0,128),
-- Yamaha XSR155 (129)
('Tieu Chuan','Den metallic','#212121',15,0,129),
('Tieu Chuan','Xam bac','#78909C',12,0,129),
-- Yamaha R15M (130)
('60th Anniversary','Trang xanh','#FFFFFF',10,0,130),
('Tieu Chuan','Xanh dua','#1565C0',8,0,130),
-- SYM Angela 50 (131)
('Tieu Chuan','Trang','#FFFFFF',50,0,131),
('Tieu Chuan','Hong','#F48FB1',45,0,131),
-- SYM Attila 50 (132)
('Tieu Chuan','Trang bac','#ECEFF1',45,0,132),
('Tieu Chuan','Xanh ngoc','#B2EBF2',40,0,132),
-- SYM Elegant 50 (133)
('Tieu Chuan','Trang','#FFFFFF',50,0,133),
('Tieu Chuan','Xanh ngoc','#B2EBF2',45,0,133),
-- SYM Elite 50 (134)
('Tieu Chuan','Trang','#FFFFFF',45,0,134),
('Tieu Chuan','Do','#CC0000',40,0,134),
-- SYM Galaxy 50 (135)
('Tieu Chuan','Trang bac','#ECEFF1',45,0,135),
('Tieu Chuan','Xanh ngoc','#B2EBF2',40,0,135),
-- SYM Husky Classic 125 (136)
('Tieu Chuan','Xam den','#546E7A',20,0,136),
('Tieu Chuan','Nau den','#4E342E',15,0,136),
-- SYM Passing 50 (137)
('Tieu Chuan','Trang','#FFFFFF',50,0,137),
('Tieu Chuan','Do','#CC0000',45,0,137),
-- SYM Shark 50 (138)
('Tieu Chuan','Xam nham','#9E9E9E',40,0,138),
('Tieu Chuan','Den','#212121',35,0,138);

-- ============================================================
-- BUOC 3: IMAGES
-- ============================================================
DELETE FROM product_image WHERE product_id BETWEEN 107 AND 138;

INSERT INTO product_image (url, product_id) VALUES
-- Honda (107-120)
('honda_wave_rsx_110.png',107),('honda_wave_rsx.webp',107),
('honda_future_125.jpeg',108),('honda_wave_alpha_110.webp',108),
('honda_super_cub_c125.png',109),('honda_super_cub_c125.png',109),
('honda_blade_2023.png',110),('honda_blade_2023.png',110),
('honda_vision.webp',111),('honda_vision_classic.png',111),
('honda_vario125.png',112),('honda_vario125.png',112),
('honda_vario160.webp',113),('honda_vario160.webp',113),
('honda_sh_mode_125.png',114),('honda_sh_mode_125.png',114),
('honda_sh160i.png',115),('honda_sh160i.png',115),
('honda_adv350.png',116),('honda_adv350.png',116),
('honda_winner_x.png',117),('honda_winner_x_2024.jpg',117),
('honda_cbr150r.png',118),('honda_cbr150r.png',118),
('honda_cb350_hness.webp',119),('honda_cb350_hness.webp',119),
('honda_cuv_e.webp',120),('honda_icon_e.webp',120),
-- Yamaha (121-130)
('yamaha_jupiter_fi.png',121),('yamaha_jupiter_fi_mau_moi.png',121),
('yamaha_jupiter_finn_tieu_chuan.png',122),('yamaha_jupiter_finn_premium.png',122),
('yamaha_nvx155.png',123),('yamaha_nvx155_mau_moi.png',123),
('yamaha_janus_tieu_chuan.png',124),('yamaha_janus_dac_biet.png',124),
('yamaha_freego_tieu_chuan.png',125),('yamaha_freego_s_dac_biet.png',125),
('yamaha_latte_tieu_chuan.png',126),('yamaha_latte_gioi_han.png',126),
('yamaha_mt15.png',127),('yamaha_mt15_mau_moi.png',127),
('yamaha_mt03.png',128),('yamaha_mt03.png',128),
('yamaha_xsr155.png',129),('yamaha_xsr155.png',129),
('yamaha_r15m_60th.png',130),('yamaha_r15m_60th.png',130),
-- SYM (131-138)
('sym_angela_50.png',131),('sym_angela_50_b.png',131),
('sym_attila_50.png',132),('sym_attila_50.png',132),
('sym_elegant_50.png',133),('sym_elegant_50.png',133),
('sym_elite_50.png',134),('sym_elite_50_b.png',134),
('sym_galaxy_50.png',135),('sym_galaxy_50_b.png',135),
('sym_husky_classic_125.png',136),('sym_husky_classic_125.png',136),
('sym_passing_50.png',137),('sym_passing_50.png',137),
('sym_shark_50.png',138),('sym_shark_50.png',138);

-- Reset AUTO_INCREMENT
ALTER TABLE product AUTO_INCREMENT = 200;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- XAC NHAN
-- ============================================================
SELECT p.id, p.name, p.brand, p.vehicle_type, p.price,
       COUNT(DISTINCT v.id) AS variants,
       COUNT(DISTINCT pi.id) AS images
FROM product p
LEFT JOIN variant v ON v.product_id = p.id
LEFT JOIN product_image pi ON pi.product_id = p.id
WHERE p.id BETWEEN 107 AND 138
GROUP BY p.id ORDER BY p.id;
