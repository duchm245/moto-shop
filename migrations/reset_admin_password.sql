-- Reset mật khẩu admin về: 123456
-- Hash được generate bởi PasswordEncoderGenerator.java của chính project này
USE motorbike_shop;
UPDATE user
SET password = '$2a$10$1Xmt73dPIjrpTIFrU04hx.WCLdIjaV9yrCUN6QbhjbT8ntIRuOS.i'
WHERE username = 'admin';

SELECT id, username, email FROM user WHERE username = 'admin';
