import CartModel from "../models/cart";
import ProductModel from "../models/product";
import UserModel from "../models/user";
import OrderModel from "../models/order";
import OrderService from "./order.service";

export default class CartService {
  public cart = CartModel;
  public product = ProductModel;
  public user = UserModel;
  public orderService = new OrderService();

  public async getCart(userId) {
    const cart = await this.cart.findOne({ user: userId });
    return cart;
  }

  public async addToCart(userId, productId, quantity) {
    quantity = parseInt(quantity);
    const user = await this.user.findById(userId);
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
      cart.totalPrice = await this.calculateTotalPrice(cart);
      
      await cart.save();
    }

    return cart;
  }

  public async removeFromCart(userId, productId) {
    const cart = await this.cart.findOne({user: userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    const productIndex = cart.cartItems.findIndex(p => p.product == productId);
    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cart.cartItems.splice(productIndex, 1);
    if(cart.cartItems.length === 0) {
      cart.totalPrice = 0;
    } else {
      cart.totalPrice = await this.calculateTotalPrice(cart);
    }
    await cart.save();
    return cart;
  }

  private async calculateTotalPrice(cart) {
    const productPrices = await Promise.all(
      cart.cartItems.map(async item => {
        const product = await this.product.findById(item.product);
        return product.price * item.quantity;
      })
    );
    return productPrices.reduce((a, b) => a + b, 0);
  }

  public async clearCart(userId) {
    const cart = await this.cart.findOne({ user: userId });
    if (!cart) {
      throw new Error("Cart not found");
    }
    cart.set({ cartItems: [] });
    cart.totalPrice = 0;
    await cart.save();

    return cart;
  }

  // change the quantity of a product in the cart
  public async updateQuantity(userId, productId, quantity) {
    quantity = parseInt(quantity);
    const cart = await this.cart.findOne({ user: userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    const productIndex = cart.cartItems.findIndex(p => p.product == productId);
    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
    cart.cartItems[productIndex].quantity = quantity;
    cart.totalPrice = await this.calculateTotalPrice(cart);
    await cart.save();

    return cart;
  }

  public async checkout(userId, shippingAddress, paymentInfo) {
    const cart = await this.cart.findOne({ user: userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    if(!cart.cartItems.length) {
      throw new Error("Cart is empty");
    };
    const orderItems = await Promise.all(
      cart.cartItems.map(async item => {
        const product = await this.product.findById(item.product);
        return {
          product: product,
          quantity: item.quantity,
        };
      })
    );

    const totalPrice = await this.calculateTotalPrice(cart);
    const data = new OrderModel({
      user: userId,
      orderItems,
      shippingAddress,
      paymentInfo,
      totalPrice,
    });
    const order = await this.orderService.create(data);
    await this.clearCart(userId);
    return order;
  }
  
}