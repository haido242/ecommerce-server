import CartController from "../controllers/cart.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Router } from "express";

export default class CartRoute {
  public path = "/carts";
  public router = Router();
  public cartController = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:userId`, authMiddleware, this.cartController.getCart);
    this.router.post(`${this.path}/:userId`, authMiddleware, this.cartController.addToCart);
    this.router.delete(`${this.path}/:userId/:productId`, authMiddleware, this.cartController.removeFromCart);
  }
}