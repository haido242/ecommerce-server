import PaymentController from "../controllers/payment.controller";
import e, { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import authMiddleware from "../middlewares/auth.middleware";
import authorize from "../middlewares/authorize.middleware";

class PaymentRoute implements Routes {
  public path = "/payments";
  public router = Router();
  public paymentController = new PaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, authMiddleware, this.paymentController.createOrder);
    this.router.put(`${this.path}/status`, authMiddleware, this.paymentController.changeOrderStatus);
    
  }
}

export default PaymentRoute;