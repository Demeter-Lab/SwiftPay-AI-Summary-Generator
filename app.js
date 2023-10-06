const express = require("express");
const cors = require("cors");

const appRouter = require("./routes/appRoutes");

const app = express();
// Middleware to parse JSON request bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// routes
app.use("/api/generateSummary", appRouter);

module.exports = app;
