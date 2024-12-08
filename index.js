const express = require("express");
const cors = require("cors")
const path = require("path");
const connectionDB = require("./src/config/connectionDB");
const authRoutes = require("./src/routes/auth.routes");
const corsAllows = require("./src/utils/corsAllows.utils");
const cookieParser = require("cookie-parser")
require("dotenv").config();

const app = express();
app.use(cors({
    origin:corsAllows.origin,
    methods:corsAllows.methods,
    allowedHeaders:corsAllows.allowedHeaders,
    credentials:corsAllows.credentials
}))
app.use(express.json());
app.use(cookieParser())

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/auth",authRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectionDB()
    console.log(`Server is running on http://localhost:${PORT}`);
});

