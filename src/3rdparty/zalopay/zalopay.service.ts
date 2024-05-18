import OrderService from "../../services/order.service";
import CryptoJS from "crypto-js";
import moment from "moment";
import { HttpException } from "../../exceptions/HttpException";
import { ZALOPAY_APPID, ZALOPAY_KEY1, ZALOPAY_KEY2, ZALOPAY_ENDPOINT, ZALOPAY_GETLISTMERCHANTBANKS } from "../../config";
import express from 'express';
import axios from "axios";

class ZalopayService {

  public async createOrder(orderId: string) {
    const orderService = new OrderService();
    const transID = Math.floor(Math.random() * 1000000).toString();
    const orderDetail = await orderService.getOrderById(orderId);
    if (!orderDetail) throw new HttpException(409, "Order not found");
    const embedData = {};
    const item = orderDetail.orderItems.map((item) => {
      return {
        item_name: item.id,
        item_quantity: item.quantity,
      }
    });
    let order = {
      app_id: ZALOPAY_APPID,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
      app_user: "user123",
      app_time: Date.now(),
      item: JSON.stringify(item),
      embed_data: JSON.stringify(embedData),
      amount: orderDetail.totalPrice,
      description: `Thanh toán đơn hàng ${orderId}`,
      mac: ""
    }
    const data = ZALOPAY_APPID 
    + "|" + order.app_trans_id 
    + "|" + order.app_user 
    + "|" + order.amount 
    + "|" + order.app_time 
    + "|" + order.embed_data 
    + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, ZALOPAY_KEY1).toString();
    console.log("order", order);
    const response = await axios.post(ZALOPAY_ENDPOINT, null, { params: order });

    // Return only the necessary data from the response
    return response.data;
  }
}

export default ZalopayService;