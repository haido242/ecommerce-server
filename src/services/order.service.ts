import OrderModel from "../models/order";

export default class OrderService {
  public order = OrderModel;

  // get all orders
  public async getOrders() {
    const orders = await this.order.find();
    return orders;
  }
}