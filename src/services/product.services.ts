import ProductModel from "models/product";
import BaseService from "./base.service";
import { v2 as cloudinary } from 'cloudinary';

export default class ProductService extends BaseService{
  constructor() {
    const productModel = ProductModel;
    super(productModel as any);
  }
}