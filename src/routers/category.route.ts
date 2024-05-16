import CategoryController from "../controllers/category.controller";
import authMiddleware from "middlewares/auth.middleware";
import { Router } from "express";
import authorize from "middlewares/authorize.middleware";

export default class CategoryRoute {
  public path = "/categories";
  public router = Router();
  public categoryController = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoryController.get);
    this.router.get(`${this.path}/:id`, this.categoryController.getById);
    this.router.post(`${this.path}`, authMiddleware, authorize(["admin"]), this.categoryController.create);
    this.router.put(`${this.path}/:id`, authMiddleware, authorize(["admin"]), this.categoryController.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, authorize(["admin"]), this.categoryController.delete);
  }
}