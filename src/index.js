import express from "express"
import dotenv from "dotenv"
import { RouteNotFound } from "./middlewares/RouteNotFoundHandler.js"
import cors from 'cors'
import { connectMongoDb } from "./db/MongoDBConnect.js"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "./controllers/ProductControllers.js"
import redisClient from "./utils/RedisConnection.js"
dotenv.config()
import morgan from "morgan"
import fs from 'fs';
import path from 'path';

// Establish mongodb connection
connectMongoDb()

// Initiate express app
const app = express()

// --- Setup Morgan Logger ---
// 2. Create a write stream (in 'append' mode)
const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), 'access.log'),
  { flags: 'a' }
);

// 3. Setup the logger to use the 'combined' format and write to the file
app.use(morgan('combined', { stream: accessLogStream }));

// 4. (Optional) Log to console in 'dev' format
app.use(morgan('dev'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cors
app.use(cors({
  // origin: ["http://localhost:5173"],
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "DELETE", "UPDATE"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}))

// Routes
app.get("/", (req, res) => {
  res.send("API is running...")
});
app.get("/products", getAllProducts)
app.get("/products/:productId", getProductById)
app.post("/products", createProduct)
app.put("/products/:productId", updateProduct)
app.delete("/products/:productId", deleteProduct)



// RouteNotFound Handler
app.use(RouteNotFound)

app.listen(process.env.PORT||3000, () => {
  console.log(`Server stated on http:localhost:${process.env.PORT || 3000}`);
})