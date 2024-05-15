import CartModel from "../models/cart";
import ProductModel from "../models/product";
import UserModel from "models/user";

export default class CartService {
  public cart = CartModel;
  public product = ProductModel;

  public async getCart(userId) {
    const cart = await this.cart.findOne({ user: userId });
    return cart;
  }

  public async addToCart(userId, productId, quantity) {
    const user = await UserModel.findById(userId);
    const product = await this.product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const cart = await this.cart.findOne({user: userId});
    if (!cart) {
      const newCart = new this.cart({
        user: user,
        cartItems: [{ product: productId, quantity }],
        totalPrice: product.price * quantity,
      });
      await newCart.save();
      return newCart;
    } else {
      const productIndex = cart.cartItems.findIndex(p => p.product == productId);
      if (productIndex === -1) {
        cart.cartItems.push({ product: productId, quantity });
      } else {
        cart.cartItems[productIndex].quantity += quantity;
      }
      cart.totalPrice += product.price * quantity;
      await cart.save();
    }

    return cart;
  }

  public async removeFromCart(userId, productId) {
    const cart = await this.cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    const productIndex = cart.cartItems.findIndex(p => p.product == productId);
    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cart.cartItems.splice(productIndex, 1);
    await cart.save();

    return cart;
  }

}