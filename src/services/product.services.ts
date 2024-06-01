import ProductModel from "models/product";
import BaseService from "./base.service";
import { v2 as cloudinary } from 'cloudinary';

export default class ProductService extends BaseService{
  constructor() {
    const productModel = ProductModel;
    super(productModel as any);
  }

  public override async get() {
    return await this.Model.find().populate('category', 'name').exec();
  }

  public async getLowStock() {
    return await this.Model.find({ stockQuantity: { $lt: 10 } }).populate('category', 'name').exec();
  }
}