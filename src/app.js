import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";
import multer from "multer";
import orderRoutes from "./routes/orderRoute.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import viewRoutes from "./routes/viewRoute.js";
import config from "./config/index.js";


const app = express();

connectDB();
connectCloudinary();

const upload = multer({
  storage: multer.memoryStorage(),
});

app.use(logger);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "hbs");


app.get('/', (req, res) => {
  res.json({
    port: config.port, 
    name: config.name,
    version: config.version,
  });
});

app.use("/api/products", upload.array("images", 5), productRoutes);
app.use("/api/users", upload.single("image"), userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/page", viewRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}.....`);
});
