package com.crking7.datn.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;


import com.crking7.datn.config.MomoConfig;
import com.crking7.datn.models.OrderItem;
import com.crking7.datn.models.Orders;
import com.crking7.datn.repositories.OrdersRepository;
import com.crking7.datn.services.OrdersService;
import com.crking7.datn.utils.MomoEncoderUtils;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/momo")
public class MomoPayController {

    private final OrdersRepository ordersRepository;

    private final OrdersService ordersService;

    public MomoPayController(OrdersRepository ordersRepository, OrdersService ordersService){
        this.ordersRepository = ordersRepository;
        this.ordersService = ordersService;
    }

    @GetMapping(value = "/test")
    public String test() {
        return "Test";
    }

    // tạo thanh toán, response trả về pay url
    @PostMapping(value = "/create-order")
    public Map<String, Object> createPayment(@RequestParam("orderId") Long orderId) throws IOException, NoSuchAlgorithmException, InvalidKeyException {

        Orders orders = ordersRepository.findById(orderId).orElseThrow();
        String amount = String.valueOf((totalOrderAmount(orders) + orders.getShippingFee()));
        JsonObject json = new JsonObject();
        String partnerCode = MomoConfig.PARTNER_CODE;
        String accessKey = MomoConfig.ACCESS_KEY;
        String secretKey = MomoConfig.SECRET_KEY;
        String returnUrl = MomoConfig.REDIRECT_URL;
        String notifyUrl = MomoConfig.NOTIFY_URL;
        String requestId = String.valueOf(System.currentTimeMillis());

        json.addProperty("partnerCode", partnerCode);
        json.addProperty("accessKey", accessKey);
        json.addProperty("requestId", requestId);
        json.addProperty("amount", amount);
        json.addProperty("orderId", orderId.toString());
        json.addProperty("orderInfo", "Thanh toan don hang " + orderId);
        json.addProperty("returnUrl", returnUrl);
        json.addProperty("notifyUrl", notifyUrl);
        json.addProperty("requestType", "captureMoMoWallet");

        String data = "partnerCode=" + partnerCode
                + "&accessKey=" + accessKey
                + "&requestId=" + requestId
                + "&amount=" + amount
                + "&orderId=" + orderId
                + "&orderInfo=" + ("Thanh toan don hang " + orderId)
                + "&returnUrl=" + returnUrl
                + "&notifyUrl=" + notifyUrl
                + "&extraData=";

        String hashData = MomoEncoderUtils.signHmacSHA256(data, secretKey);
        json.addProperty("signature", hashData);
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(MomoConfig.CREATE_ORDER_URL);
        StringEntity stringEntity = new StringEntity(json.toString());
        post.setHeader("content-type", "application/json");
        post.setEntity(stringEntity);

        CloseableHttpResponse res = client.execute(post);
        BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            resultJsonStr.append(line);
        }
        JsonObject result = JsonParser.parseString(resultJsonStr.toString()).getAsJsonObject();
        Map<String, Object> kq = new HashMap<>();
        String errorCode = result.has("errorCode") && !result.get("errorCode").isJsonNull()
                ? result.get("errorCode").getAsString()
                : "";
        if ("0".equalsIgnoreCase(errorCode)) {
            kq.put("requestType", result.has("requestType") ? result.get("requestType").getAsString() : null);
            kq.put("orderId", result.has("orderId") ? result.get("orderId").getAsString() : null);
            kq.put("payUrl", result.has("payUrl") ? result.get("payUrl").getAsString() : null);
            kq.put("signature", result.has("signature") ? result.get("signature").getAsString() : null);
            kq.put("requestId", result.has("requestId") ? result.get("requestId").getAsString() : null);
            kq.put("errorCode", errorCode);
            kq.put("message", result.has("message") ? result.get("message").getAsString() : null);
            kq.put("localMessage", result.has("localMessage") ? result.get("localMessage").getAsString() : null);
        } else {
            kq.put("requestType", result.has("requestType") ? result.get("requestType").getAsString() : null);
            kq.put("orderId", result.has("orderId") ? result.get("orderId").getAsString() : null);
            kq.put("signature", result.has("signature") ? result.get("signature").getAsString() : null);
            kq.put("requestId", result.has("requestId") ? result.get("requestId").getAsString() : null);
            kq.put("errorCode", errorCode);
            kq.put("message", result.has("message") ? result.get("message").getAsString() : null);
            kq.put("localMessage", result.has("localMessage") ? result.get("localMessage").getAsString() : null);
        }
        return kq;
    }

    // truy vấn lại trạng thái thanh toán
    @PostMapping(value = "/transactionStatus")
    public Map<String, Object> transactionStatus(@RequestParam String requestId,
                                                 @RequestParam String orderId)
            throws InvalidKeyException, NoSuchAlgorithmException, ClientProtocolException, IOException {
        JsonObject json = new JsonObject();
        String partnerCode = MomoConfig.PARTNER_CODE;
        String accessKey = MomoConfig.ACCESS_KEY;
        String secretKey = MomoConfig.SECRET_KEY;
        String requestType = "transactionStatus";

        json.addProperty("partnerCode", partnerCode);
        json.addProperty("accessKey", accessKey);
        json.addProperty("requestId", requestId);
        json.addProperty("orderId", orderId);
        json.addProperty("requestType", requestType);

        String data = "partnerCode=" + partnerCode
                + "&accessKey=" + accessKey
                + "&requestId=" + requestId
                + "&orderId=" + orderId
                + "&requestType=" + requestType;
        String hashData = MomoEncoderUtils.signHmacSHA256(data, secretKey);
        json.addProperty("signature", hashData);
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(MomoConfig.CREATE_ORDER_URL);
        StringEntity stringEntity = new StringEntity(json.toString());
        post.setHeader("content-type", "application/json");
        post.setEntity(stringEntity);

        CloseableHttpResponse res = client.execute(post);
        BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            resultJsonStr.append(line);
        }
        JsonObject result = JsonParser.parseString(resultJsonStr.toString()).getAsJsonObject();
        Map<String, Object> kq = new HashMap<>();
        kq.put("requestId", result.has("requestId") ? result.get("requestId").getAsString() : null);
        kq.put("orderId", result.has("orderId") ? result.get("orderId").getAsString() : null);
        kq.put("extraData", result.has("extraData") ? result.get("extraData").getAsString() : null);
        kq.put("amount", result.has("amount") ? result.get("amount").getAsLong() : null);
        kq.put("transId", result.has("transId") ? result.get("transId").getAsString() : null);
        kq.put("payType", result.has("payType") ? result.get("payType").getAsString() : null);
        kq.put("errorCode", result.has("errorCode") ? result.get("errorCode").getAsString() : null);
        kq.put("message", result.has("message") ? result.get("message").getAsString() : null);
        kq.put("localMessage", result.has("localMessage") ? result.get("localMessage").getAsString() : null);
        kq.put("requestType", result.has("requestType") ? result.get("requestType").getAsString() : null);
        kq.put("signature", result.has("signature") ? result.get("signature").getAsString() : null);
        return kq;
    }
    private int totalOrderAmount(Orders orders) {
        int totalAmount = 0;
        for (OrderItem item : orders.getOrderItems()) {
            totalAmount += item.getQuantity() * item.getSellPrice();
        }
        return totalAmount;
    }
}
