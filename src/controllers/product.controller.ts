import ProductService from "../services/product.services";
import BaseController from "./base.controller";

export default class ProductController extends BaseController{
  constructor() {
    const productService = new ProductService();
    super(productService);
  }
}