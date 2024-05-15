import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema({
    key : String,
    value: String,
});



const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
    rating: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    attributes: [attributeSchema],

});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
