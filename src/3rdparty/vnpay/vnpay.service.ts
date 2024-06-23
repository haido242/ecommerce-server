import express, { Request, Response } from 'express';
import OrderService from 'services/order.service';
import ProductService from 'services/product.services';
import { VNPay } from 'vnpay';
import { ReturnQueryFromVNPay, VerifyReturnUrl } from 'vnpay';
import { IpnResponse,
  IpnSuccess,
  IpnUnknownError,
  IpnFailChecksum,
  IpnOrderNotFound,
  IpnInvalidAmount,
  InpOrderAlreadyConfirmed,} from 'vnpay';

class VNPayService {
  public orderService = new OrderService();
  public productService = new ProductService();

  vnpay = new VNPay({
    tmnCode: "KG57LG19",
    secureSecret: "G6C5ER2C3BVPW11N4EI1CCHRS8KCMBYI",
    testMode: true
  });3

  public async createOrder(orderDetail: any) {
    if (!orderDetail) throw new Error("Order not found");
    
    const urlString = this.vnpay.buildPaymentUrl(
      {
          vnp_Amount: orderDetail.totalPrice,
          vnp_IpAddr: '1.1.1.1',
          vnp_TxnRef: orderDetail._id,
          vnp_OrderInfo: 'Payment for order ${orderDetail._id}',
          vnp_OrderType: 'billpayment',
          vnp_ReturnUrl: `http://localhost:3001/success`,
      });
      console.log("urlString", urlString)
    return urlString;
  }

  public async changeStatus(orderdetails, reqQuery) {
    try {
      const verify: VerifyReturnUrl = this.vnpay.verifyIpnCall(reqQuery);
      if (!verify.isVerified) {
        return IpnFailChecksum;
      }
      const foundOrder = await this.orderService.getById(orderdetails._id);
      if (!foundOrder) {
        return IpnOrderNotFound;
      }
      // Nếu không tìm thấy đơn hàng hoặc mã đơn hàng không khớp
      if (!foundOrder || verify.vnp_TxnRef !== foundOrder._id) {
        return IpnOrderNotFound;
    }

    // Nếu số tiền thanh toán không khớp
    if (verify.vnp_Amount !== foundOrder._id) {
        return IpnInvalidAmount;
    }
    await this.orderService.changeStatus(orderdetails._id, 'paid');
    return IpnSuccess;
    } catch (error) {
      return IpnUnknownError;
    }
  }

  public async vnPayReturn(req: Request<any, any, any, ReturnQueryFromVNPay>, res: Response) {
    let verify: VerifyReturnUrl;
    try {
      verify = this.vnpay.verifyReturnUrl(
        { ...req.query },
      );
      if (!verify.isVerified) {
        return res.status(200).json({
          message: verify?.message ?? 'Payment failed!',
          status: verify.isSuccess,
        });
      }
      if (verify.isSuccess) {
        const orderdetails = await this.orderService.getById(verify.vnp_TxnRef);
        if (orderdetails) {
          await this.changeStatus(orderdetails, req.query);
        }
      }
    } catch (error) {
      return res.status(400).json({ message: 'verify error', status: false });
    }
    
    return res.status(200).json({
      message: verify?.message ?? 'Payment successful!',
      status: verify.isSuccess,
    });
  }
}

export default VNPayService;