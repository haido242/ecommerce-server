import ProductService from "../services/product.services";

export default class ProductController {
  public productService = new ProductService();

  public getProducts = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json({ data: products, message: "findAll" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await this.productService.getProductById(productId);
      res.status(200).json({ data: product, message: "findOne" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public createProduct = async (req, res) => {
    try {
      const productData = req.body;
      const product = await this.productService.createProduct(productData);
      res.status(201).json({ data: product, message: "created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const productData = req.body;
      const product = await this.productService.updateProduct(productId, productData);
      res.status(200).json({ data: product, message: "updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await this.productService.deleteProduct(productId);
      res.status(200).json({ data: product, message: "deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}