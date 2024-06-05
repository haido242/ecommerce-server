import OrderService from "../services/order.service";
import BaseController from "./base.controller";

export default class OrderController extends BaseController{
  public orderService = new OrderService();
  constructor() {
    const orderService = new OrderService();
    super(orderService);
  }
  getOrdersByUserId = async (req: any, res: any) => {
    try {
      const userId = req.params.id;
      const orders = await this.orderService.getOrdersByUserId(userId);
      const total = orders.length;
      res.status(200).json({ data: orders, message: 'success' });
    } catch (error) {
      res.status(500).json({ message: 'error', error: error.message });
    }
  }
}