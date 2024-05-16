import CategoryService from "../services/category.service";
import BaseController from "./base.controller";

export default class CategoryController extends BaseController {
  constructor() {
    const categoryService = new CategoryService();
    super(categoryService);
  }
}