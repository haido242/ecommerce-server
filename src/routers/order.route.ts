import OrderController from "../controllers/order.controller";
import authMiddleware from "../middlewares/auth.middleware";
import authorize from "../middlewares/authorize.middleware";
import e, { Router } from "express";
import { Routes } from "../interfaces/routes.interface";

class OrderRoute implements Routes{
  public path = "/orders";
  public router = Router();
  public orderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }
  
  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, authorize(["admin"]), this.orderController.get);
    this.router.get(`${this.path}/:id`, authMiddleware, this.orderController.getById);
    this.router.put(`${this.path}/:id`, authMiddleware, authorize(["admin"]), this.orderController.update);
    this.router.get(`${this.path}/get-user-order/:id`, authMiddleware, this.orderController.getOrdersByUserId);
  }
}

export default OrderRoute;