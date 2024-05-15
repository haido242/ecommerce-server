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
}