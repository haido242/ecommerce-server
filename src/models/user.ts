// create schema user
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    street: String,
    ward: String,
    district: String,
    city: String,
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    //   enum role user
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        default: '',
        required: true,
    },
    address: addressSchema,
    phone: {
        type: String,
        default: '',
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

