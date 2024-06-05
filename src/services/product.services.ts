import ProductModel from "models/product";
import BaseService from "./base.service";
export default class ProductService extends BaseService{
  constructor() {
    const productModel = ProductModel;
    super(productModel as any);
  }

  public override async get(p, l) {
    // return await this.Model.find().populate('category', 'name').exec();
    const skip = (p - 1) * l;
    const data = await this.Model.find().populate('category', 'name').skip(skip).limit(l);
    const total = await this.Model.countDocuments();
    return { data, total };
  }

  public async getLowStock() {
    return await this.Model.find({ stockQuantity: { $lt: 10 } }).populate('category', 'name').exec();
  }
}