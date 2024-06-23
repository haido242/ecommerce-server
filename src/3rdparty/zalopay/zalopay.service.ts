import OrderService from "../../services/order.service";
import CryptoJS from "crypto-js";
import moment from "moment";
import { HttpException } from "../../exceptions/HttpException";
import { ZALOPAY_APPID, ZALOPAY_KEY1, ZALOPAY_KEY2, ZALOPAY_ENDPOINT, ZALOPAY_GETLISTMERCHANTBANKS } from "../../config";
import axios from "axios";
import ProductService from "../../services/product.services";

class ZalopayService {
  public orderService = new OrderService();
  public productService = new ProductService();

  public async createOrder(orderDetail: any) {
    const transID = Math.floor(Math.random() * 1000000).toString();
    if (!orderDetail) throw new HttpException(409, "Order not found");
    const embedData = {orderId: orderDetail._id};
    const item = orderDetail.orderItems || [];
    const callbackUrl = "https://ecommerce-91256.web.app//api/zalopay/paid"
    let order = {
      app_id: ZALOPAY_APPID,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
      app_user: "user123",
      app_time: Date.now(),
      item: JSON.stringify(item),
      embed_data: JSON.stringify(embedData),
      amount: orderDetail.totalPrice,
      description: `Thanh toán đơn hàng ${orderDetail._id}`,
      mac: "",
      callback_url: callbackUrl,
    }
    const data = ZALOPAY_APPID 
    + "|" + order.app_trans_id 
    + "|" + order.app_user 
    + "|" + order.amount 
    + "|" + order.app_time 
    + "|" + order.embed_data 
    + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, ZALOPAY_KEY1).toString();
    const response = await axios.post(ZALOPAY_ENDPOINT, null, { params: order });
    return response.data;
  }
}

export default ZalopayService;