import PaypalService from "3rdparty/paypal/paypal.service";
import ZalopayService from "../3rdparty/zalopay/zalopay.service";
import VNPayService from "../3rdparty/vnpay/vnpay.service";

import OrderModel from "../models/order";

class PaymentService {
  public order = OrderModel;

  // create new pay order by provider (Zalopay, Momo, ...)
  public async createOrder(orderId: string) {
    const orderDetail = await this.order.findById(orderId);
    const paymentMethod = orderDetail.paymentInfo.paymentMethod;

    switch (paymentMethod) {
      case "zalopay":
        return await this.createZalopayOrder(orderDetail.id);
      case "paypal":
        return await this.createPaypalOrder(orderDetail.id);
      case "vnpay": 
        return await this.createVNPayOrder(orderDetail.id);
      default:
        throw new Error("Payment method is not supported");
    }
  }

  public async changeOrderStatus(orderId: string, status: string = "paid") {
    return await this.order.findByIdAndUpdate(orderId, { status });
  }

  private validateOrder(orderDetail) {
    if (!orderDetail) {
      throw new Error("Order not found");
    }
    if(!orderDetail.totalPrice) {
      throw new Error("Order total price is invalid");
    }
    if(orderDetail.status == "paid") {
      throw new Error("Order has been paid");
    }
  }

  private zalopayService = new ZalopayService();
  public async createZalopayOrder(orderId: string) {
    const orderDetail = await this.order.findById(orderId);
    this.validateOrder(orderDetail);
    return await this.zalopayService.createOrder(orderDetail);
  }
  private paypalService = new PaypalService();
  public async createPaypalOrder(orderId: string) {
    const orderDetail = await this.order.findById(orderId);
    this.validateOrder(orderDetail);
    return await this.paypalService.createOrder(orderDetail);
  }

  private vnpayService = new VNPayService();
  public async createVNPayOrder(orderId: string) {
    const orderDetail = await this.order.findById(orderId);
    this.validateOrder(orderDetail);
    return await this.vnpayService.createOrder(orderDetail);
  }
  public async vnpayReturn(req, res) {
    return await this.vnpayService.vnPayReturn(req, res);
  }

  
}

export default PaymentService;