import OrderModel from "../models/order";
import BaseService from "./base.service";

class OrderService extends BaseService{
  constructor() {
    const orderModel = OrderModel;
    super(orderModel as any);
  }
  
}

export default OrderService;