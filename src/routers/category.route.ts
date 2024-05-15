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
    this.router.get(`${this.path}`, this.categoryController.getCategories);
    this.router.get(`${this.path}/:id`, this.categoryController.getCategoryById);
    this.router.post(`${this.path}`, authMiddleware, authorize(["admin"]), this.categoryController.createCategory);
    this.router.put(`${this.path}/:id`, authMiddleware, authorize(["admin"]), this.categoryController.updateCategory);
    this.router.delete(`${this.path}/:id`, authMiddleware, authorize(["admin"]), this.categoryController.deleteCategory);
  }
}