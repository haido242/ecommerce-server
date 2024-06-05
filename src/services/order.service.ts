import OrderModel from "../models/order";
import BaseService from "./base.service";

class OrderService extends BaseService{
  constructor() {
    const orderModel = OrderModel;
    super(orderModel as any);
  }
  public order = OrderModel;
  getOrdersByUserId = async (userId: string) => {
    return await this.order.find({ user: userId });
  }
  
  
}

export default OrderService;