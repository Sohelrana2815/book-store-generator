const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/books");

const app = express();
app.use(cors()); // CORS এনাবল করুন

// API রাউট কানেক্ট করুন
app.use("/api/books", bookRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
