import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_DATABASE, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const {ZALOPAY_APPID, ZALOPAY_KEY1, ZALOPAY_KEY2, ZALOPAY_ENDPOINT, ZALOPAY_GETLISTMERCHANTBANKS} = process.env;
export const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, IMAGE_FILE_UPLOAD_SIZE } = process.env;
export const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
