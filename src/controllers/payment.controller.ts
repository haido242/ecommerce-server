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
}