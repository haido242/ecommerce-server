import CartService from "../services/cart.service";

export default class CartController {
  public cartService = new CartService();

  public getCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await this.cartService.getCart(userId);
      res.status(200).json({ data: cart, message: "getCart" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public addToCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { productId, quantity } = req.body;
      const cart = await this.cartService.addToCart(userId, productId, quantity);
      res.status(200).json({ data: cart, message: "addToCart" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public removeFromCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      const cart = await this.cartService.removeFromCart(userId, productId);
      res.status(200).json({ data: cart, message: "removeFromCart" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // clear cart
  public clearCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await this.cartService.clearCart(userId);
      res.status(200).json({ data: cart, message: "clearCart" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // change quantity of product in cart
  public changeQuantity = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { productId, quantity } = req.body;
      const cart = await this.cartService.updateQuantity(userId, productId, quantity);
      res.status(200).json({ data: cart, message: "changeQuantity" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // checkout 
  public checkout = async (req, res) => {
    try {
      const userId = req.params.userId;
      const shippingAddress = req.body.shippingAddress;
      const paymentInfo = req.body.paymentInfo;
      const cart = await this.cartService.checkout(userId, shippingAddress, paymentInfo);
      res.status(200).json({ data: cart, message: "checkout" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}