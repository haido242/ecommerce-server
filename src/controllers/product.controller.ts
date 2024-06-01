import ProductService from "../services/product.services";
import BaseController from "./base.controller";

export default class ProductController extends BaseController{
  private productService: ProductService;
  constructor() {
    const productService = new ProductService();
    super(productService);
    this.productService = productService;
  }

  public getLowStock = async (req: any, res: any) => {
    try {
      const data = await this.productService.getLowStock();
      res.status(200).json({
        message: "success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}