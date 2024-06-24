import paypal from 'paypal-rest-sdk';
import { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } from "config";

class PaypalService {
  constructor() {
    paypal.configure({
      'mode': 'sandbox', // Change to 'live' for production
        'client_id': PAYPAL_CLIENT_ID,
        'client_secret': PAYPAL_CLIENT_SECRET
    });
  }
  convertToUSD(price) {
    //get exchange rate from VND to USD
    return price / 25000;
  }

  public async createOrder(orderDetail) {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": "http://localhost:3001/success",
        "cancel_url": "http://localhost:3001/shop/cart"
      },
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": this.convertToUSD(orderDetail.totalPrice)
        },
        "description": "This is the payment description."
      }]
    };

    return new Promise((resolve, reject) => {
      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });
  }
}

export default PaypalService;