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
    this.router.get(`${this.path}`, this.productController.getProducts);
    this.router.get(`${this.path}/:id`, this.productController.getProductById);
    this.router.post(`${this.path}`, authMiddleware, authorize(["admin"]), this.productController.createProduct);
    this.router.put(`${this.path}/:id`, authMiddleware, authorize(["admin"]), this.productController.updateProduct);
    this.router.delete(`${this.path}/:id`, authMiddleware, authorize(["admin"]), this.productController.deleteProduct);
  }
}