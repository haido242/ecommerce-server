import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" }
    },
    quantity: {
        type: Number,
        required: true,
    },
    });

const paymentInfoSchema = new mongoose.Schema({
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
});

const deliveryInfoSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    ward: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },

});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: deliveryInfoSchema,
    paymentInfo: paymentInfoSchema,
   
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    status: {
        type: String,
        required: true,
        default: "Created",
    },
    deliveredAt: {
        type: Date,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;