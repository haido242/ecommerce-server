import ProductModel from "models/product";
import BaseService from "./base.service";
export default class ProductService extends BaseService{
  constructor() {
    const productModel = ProductModel;
    super(productModel as any);
  }
  public async search(p, l, s, o, keyword, category) {
    const skip = (p - 1) * l;
    const sort = { [s]: o };
    let query = this.Model.find();
    
    if (keyword) {
      query = query.find({ $or: [{ name: { $regex: keyword, $options: 'i' } }, { description: { $regex: keyword, $options: 'i' } }] });
    }
    
    if (category) {
      query = query.find({ category: category });
    }
    
    const data = await query.skip(skip).limit(l).sort(sort).populate('category', 'name').exec();
    const total = await this.Model.countDocuments(query);
    
    return { data, total };
  }

  public async getLowStock() {
    return await this.Model.find({ stockQuantity: { $lt: 10 } }).populate('category', 'name').exec();
  }
}