import ZalopayService from "../3rdparty/zalopay/zalopay.service";
import OrderModel from "../models/order";

class PaymentService {
  public order = OrderModel;
  private zalopayService = new ZalopayService();

  public async createZalopayOrder(orderId: string) {
    const orderDetail = await this.order.findById(orderId);
    if (!orderDetail) {
      throw new Error("Order not found");
    }
    if(!orderDetail.totalPrice) {
      throw new Error("Order total price is invalid");
    }
    // create order on Zalopay
    return await this.zalopayService.createOrder(orderId);
  }
}

export default PaymentService;