const { generateBooksBatch } = require("../services/bookService");
const { validateBookParams } = require("../validators/bookValidator");

exports.getBooks = async (req, res) => {
  try {
    // Validate parameters
    const errors = validateBookParams(req.query);
    if (errors.length > 0) return res.status(400).json({ errors });

    const params = {
      seed: parseInt(req.query.seed, 10),
      page: parseInt(req.query.page || 1, 10),
      region: req.query.region || "en-US",
      avgLikes: parseFloat(req.query.avgLikes || 5),
      avgReviews: parseFloat(req.query.avgReviews || 3),
    };

    const books = await generateBooksBatch(params);
    res.json(books);
  } catch (error) {
    console.error("Book generation error:", error);
    res.status(500).json({ error: "Failed to generate books" });
  }
};
