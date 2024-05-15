import ProductModel from "models/product";

export default class ProductService {
  public products = ProductModel;

  public async getAllProducts() {
    const products = await this.products.find();
    return products;
  }

  public async getProductById(productId) {
    const product = await this.products.findById(productId);
    return product;
  }

  public async createProduct(productData) {
    const product = await this.products.create(productData);
    return product;
  }

  public async updateProduct(productId, productData) {
    const product = await this.products.findByIdAndUpdate(productId, productData, { new: true });
    return product;
  }

  public async deleteProduct(productId) {
    const product = await this.products.findByIdAndDelete(productId);
    return product;
  }
}