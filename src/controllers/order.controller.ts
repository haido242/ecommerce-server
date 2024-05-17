import OrderService from "../services/order.service";

export default class OrderController {
  public orderService = new OrderService();

  public getOrders = async (req, res) => {
    try {
      const orders = await this.orderService.getOrders();
      res.status(200).json({ data: orders, message: "getOrders" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getOrderById = async (req, res) => {
    const orderId = req.params.id;

    try {
      const order = await this.orderService.getOrderById(orderId);
      if (!order) {
        res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ data: order, message: "getOrderById" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}