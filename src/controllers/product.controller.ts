import ProductService from "../services/product.services";
import BaseController from "./base.controller";
import uploadImage from "utils/cloudinary";

export default class ProductController extends BaseController{
  private productService: ProductService;
  constructor() {
    const productService = new ProductService();
    super(productService);
    this.productService = productService;
  }

  public override create = async (req: any, res: any) => {
    try {
      const file = req.file;
      const data = req.body;
      const image = await uploadImage(file);
      data.image = image.url;
      const result = await this.productService.create(data);
      res.status(201).json({
        message: "success",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
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