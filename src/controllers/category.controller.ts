import CategoryService from "../services/category.service";

export default class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  public async createCategory(req: any, res: any) {
    try {
      const { name, description } = req.body;
      const category = await this.categoryService.createCategory(name, description);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getCategories(req: any, res: any) {
    try {
      const categories = await this.categoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getCategoryById(req: any, res: any) {
    try {
      const { id } = req.params;
      const category = await this.categoryService.getCategoryById(id);
      if (!category) {
        res.status(404).json({ error: "Category not found" });
      } else {
        res.status(200).json(category);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async updateCategory(req: any, res: any) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await this.categoryService.updateCategory(id, name, description);
      if (!category) {
        res.status(404).json({ error: "Category not found" });
      } else {
        res.status(200).json(category);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async deleteCategory(req: any, res: any) {
    try {
      const { id } = req.params;
      const category = await this.categoryService.deleteCategory(id);
      if (!category) {
        res.status(404).json({ error: "Category not found" });
      } else {
        res.status(200).json({ message: "Category deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}