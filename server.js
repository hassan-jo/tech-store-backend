require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const sanitize = require("./middlewares/sanitize");

const serviceRoutes = require("./routes/serviceRoutes");
const serverServiceRoutes = require("./routes/serverServiceRoutes");
const imeiServiceRoutes = require("./routes/imeiServiceRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

/* Database */
connectDB();

/* Security */
app.use(helmet());

app.use(
  cors({
    origin: ["https://hassantechh.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* Rate limit */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use("/api", limiter);

/* Body parser */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* Compression */
app.use(compression());

/* Sanitizer */
app.use(sanitize);

/* Routes */
app.use("/api/services", serviceRoutes);
app.use("/api/server-services", serverServiceRoutes);
app.use("/api/imei-services", imeiServiceRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

/* Health Check */
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

/* Error Handler */
app.use(errorHandler);

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
