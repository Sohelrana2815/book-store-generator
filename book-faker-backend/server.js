const express = require("express");
const cors = require("cors");
const bookController = require("./controllers/bookController");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/books", bookController.getBooks);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
