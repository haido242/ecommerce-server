import ProductService from "../services/product.services";
import BaseController from "./base.controller";
import {uploadImage} from "utils/cloudinary";

export default class ProductController extends BaseController{
  private productService: ProductService;
  constructor() {
    const productService = new ProductService();
    super(productService);
    this.productService = productService;
  }

  public override create = async (req: any, res: any) => {
    console.log("body", req.body)
    try {
      const file = req.file;
      console.log("file", req.file)
      const data = req.body;
      const image = await uploadImage(file);
      data.image = image.url;
      const result = await this.productService.create(data);
      res.status(201).json({
        message: "success",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  public override get = async (req: any, res: any) => {
    const { page, limit, sort, order, keyword, category } = req.query;
    const p = page ? parseInt(page) : 1;
    const l = limit ? parseInt(limit) : 10;
    const s = sort ? sort : "_id";
    const o = order ? parseInt(order) : 1;
    const k = keyword ? keyword : "";
    try {
      const result = await this.productService.search(p, l, s, o, k, category);
      res.status(200).json({
        message: "success",
        data: result.data,
        total: result.total,
        page: p,
        limit: l,
      });
    } catch (error) {
      res.status(500).json({ message: "error", error: error.message });
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