import express from "express"
import dotenv from "dotenv"
import { RouteNotFound } from "./middlewares/RouteNotFoundHandler.js"
import cors from 'cors'
import { connectMongoDb } from "./db/MongoDBConnect.js"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "./controllers/ProductControllers.js"
import redisClient from "./utils/RedisConnection.js"
dotenv.config()

// Establish mongodb connection
connectMongoDb()

// Initiate express app
const app = express()

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