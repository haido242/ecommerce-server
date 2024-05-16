import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;

export interface Category {
  name: string;
  description: string;
}