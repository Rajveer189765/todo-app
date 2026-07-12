const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
connectDB();

// app.use("/api/tasks", taskRoutes);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
    res.send("Welcome to Todo App API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
