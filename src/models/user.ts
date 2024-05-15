// create schema user
import { model, Schema, Document} from 'mongoose';
import { User } from 'interfaces/users.interface';

const addressSchema: Schema = new Schema({
    street: String,
    ward: String,
    district: String,
    city: String,
});

const userSchema: Schema = new Schema({
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

const UserModel = model<User & Document>('User', userSchema);
export default UserModel;

