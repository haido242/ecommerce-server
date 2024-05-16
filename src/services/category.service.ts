import CategoryModel from "../models/category";
import BaseService from "./base.service";

export default class CategoryService extends BaseService{
  constructor() {
    const categoryModel = CategoryModel;
    super(categoryModel as any);
  }

}