import OrderService from "../services/order.service";
import BaseController from "./base.controller";

export default class OrderController extends BaseController{
  constructor() {
    const orderService = new OrderService();
    super(orderService);
  } 
}