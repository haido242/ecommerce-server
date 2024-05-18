import PaymentService from "../services/payment.service";

export default class PaymentController {
  public paymentService = new PaymentService();

  public createZalopayOrder = async (req, res) => {
    const orderId = req.body.orderId;
    console.log("orderId", orderId)
    try {
      const response = await this.paymentService.createZalopayOrder(orderId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
      // console.log(error);
    }
  };
}