import ProductController from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Router } from "express";
import authorize from "../middlewares/authorize.middleware";
import multer from "multer";
import { IMAGE_FILE_UPLOAD_SIZE } from "../config";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: IMAGE_FILE_UPLOAD_SIZE,
      files: 10,
  },
});

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
    this.router.get(`${this.path}/search`, this.productController.getByArrayIds);
    this.router.post(`${this.path}`, authMiddleware, authorize(["admin"]), upload.single("productImage"), this.productController.create);
    this.router.put(`${this.path}/:id`, authMiddleware, authorize(["admin"]), this.productController.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, authorize(["admin"]), this.productController.delete);
  }
}