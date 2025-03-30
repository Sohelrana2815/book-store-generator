const { faker } = require("@faker-js/faker");
const seedrandom = require("seedrandom");

// Supported locales mapping

const LOCALE_MAP = {
  "en-US": "en",
  "de-DE": "de",
  "fr-FR": "fr",
};

/**
 * Generates book data with consistent seed-based randomization
 * @param {number} baseSeed - User provided seed value
 * @param {number} page - Current page number
 * @param {number} index - Item index in page
 * @param {string} locale - Selected locale
 * @param {number} avgLikes - Average likes per book
 * @param {number} avgReviews - Average reviews per book
 */

const generateBook = (baseSeed, page, index, locale, avgLikes, avgReviews) => {
  // Combine seed with page number for consistent pagination
  const seed = baseSeed + page;
  faker.locale = LOCALE_MAP[locale] || "en";
  const rng = seedrandom(`${seed}-${index}`);

  // Calculate probabilistic values
  const calculateCount = (avg) => {
    const base = Math.floor(avg); // 3.7 will be 3
    const decimal = avg - base; // 3.7 - 3 = 0.7
    return base + (rng() < decimal ? 1 : 0); // example: 0.7>0.6 => base + 1 else : decimal<rng() => base + 0 == 3 + 0 = 3
  };

  return {
    index: page * 20 + index + 1,
    isbn: faker.commerce.isbn(),
    title: faker.book.title(),
    author: faker.book.author(),
    publisher: faker.book.publisher(),
    likes: calculateCount(avgLikes),
    reviews: Array.from({ length: calculateCount(avgReviews) }, () => ({
      text: faker.lorem.sentence(),
      author: faker.person.fullName(),
    })),
  };
};

/**
 * API Controller for fetching books
 */

exports.getBooks = (req, res) => {
  try {
    const {
      seed = 42,
      locale = "en-US",
      page = 0,
      avgLikes = 5,
      avgReviews = 3,
    } = req.query;

    // Validate input parameters
    if (isNaN(seed) || isNaN(page)) {
      return res.status(400).json({ error: "Invalid page or seed value" });
    }

    // Generate 20 books per page
    const books = Array.from({ length: 20 }, (_, index) =>
      generateBook(
        Number(seed),
        Number(page),
        index,
        locale,
        Number(avgLikes),
        Number(avgReviews)
      )
    );
    res.json(books);
  } catch (error) {
    console.error("Book generation error:", error);
    res.status(500).json({ error: "Failed to generate books" });
  }
};
