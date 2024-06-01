import ProductController from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Router } from "express";
import authorize from "../middlewares/authorize.middleware";

export default class ProductRoute {
  public path = "/products";
  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/low-stock`, this.productController.getLowStock);
    this.router.get(`${this.path}`, this.productController.get);
    this.router.get(`${this.path}/:id`, this.productController.getById);
    this.router.post(`${this.path}`, authMiddleware, authorize(["admin"]), this.productController.create);
    this.router.put(`${this.path}/:id`, authMiddleware, authorize(["admin"]), this.productController.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, authorize(["admin"]), this.productController.delete);
  }
}