import ProductModel from "models/product";
import BaseService from "./base.service";

export default class ProductService extends BaseService{
  constructor() {
    const productModel = ProductModel;
    super(productModel as any);
  }

}