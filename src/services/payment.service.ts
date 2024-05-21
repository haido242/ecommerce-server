import ZalopayService from "../3rdparty/zalopay/zalopay.service";
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
        // create order on Paypal
        break;
      case "vnpay": 
        // create order on Vnpay
        break;
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
}

export default PaymentService;