import CategoryModel from "../models/category";

export default class CategoryService {
  public async createCategory(name: string, description: string) {
    return CategoryModel.create({ name, description });
  }

  public async getCategories() {
    return CategoryModel.find();
  }

  public async getCategoryById(id: string) {
    return CategoryModel.findById(id);
  }

  public async updateCategory(id: string, name: string, description: string) {
    return CategoryModel.findByIdAndUpdate(id, { name, description });
  }

  public async deleteCategory(id: string) {
    return CategoryModel.findByIdAndDelete(id);
  }
}