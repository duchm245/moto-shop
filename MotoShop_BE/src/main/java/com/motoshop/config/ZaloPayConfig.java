package com.motoshop.config;

public class ZaloPayConfig {
    public static String APP_ID          = System.getenv().getOrDefault("ZALOPAY_APP_ID", "553");
    public static String KEY1            = System.getenv().getOrDefault("ZALOPAY_KEY1", "");
    public static String KEY2            = System.getenv().getOrDefault("ZALOPAY_KEY2", "");
    public static String CREATE_ORDER_URL    = "https://sandbox.zalopay.com.vn/v001/tpe/createorder";
    public static String GET_STATUS_PAY_URL  = "https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid";
    public static String REDIRECT_URL    = System.getenv().getOrDefault("ZALOPAY_REDIRECT_URL", "http://localhost:3000/thank-you");
}
