import PaymentService from "../services/payment.service";

export default class PaymentController {
  public paymentService = new PaymentService();

  public createOrder = async (req, res) => {
    try {
      const orderId = req.body.orderId;
      const order = await this.paymentService.createOrder(orderId);
      res.status(200).json({ data: order, message: "create payment by provider" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  public vnpayReturn = async (req, res) => {
    try {
      const verify = await this.paymentService.vnpayReturn(req, res);
      res.status(200).json({ data: verify, message: "vnpay return" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  public changeOrderStatus = async (req, res) => {
    try {
      const orderId = req.body.orderId;
      const status = req.body.status;
      const order = await this.paymentService.changeOrderStatus(orderId, status);
      res.status(200).json({ data: order, message: "change order status" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}