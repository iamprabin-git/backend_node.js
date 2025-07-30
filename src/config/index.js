import dotenv from 'dotenv';
dotenv.config();


export default {
    port: process.env.PORT || 5000,
    name: process.env.APP_NAME || 'ecommerce_backend',
    version: process.env.APP_VERSION || '0.1.0',
    mongoUrl: process.env.MONGO_URI || "",
};
