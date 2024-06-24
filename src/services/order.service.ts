import OrderModel from "../models/order";
import BaseService from "./base.service";

class OrderService extends BaseService{
  constructor() {
    const orderModel = OrderModel;
    super(orderModel as any);
  }
  public order = OrderModel;
  getOrdersByUserId = async (userId: string) => {
    return await this.order.find({ user: userId });
  }
  
  public override async get(page: number, limit: number, sort: string, order: number) {
    const skip = (page - 1) * limit;
    const data = await this.order
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ [sort]: order } as any)
      .populate('user', '-password') // Populate user and exclude password field
.exec();
    const total = await this.order.countDocuments();
    return { data, total };
  }
  
  public async changeStatus(id: string, status: string) {
    return await this.order.findByIdAndUpdate(id, { status });
  }
}

export default OrderService;