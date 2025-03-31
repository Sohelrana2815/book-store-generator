const { faker } = require("@faker-js/faker");
const seedrandom = require("seedrandom");
const { calculateIndex } = require("../utils/helpers");

const LOCALE_MAP = {
  "en-US": "en",
  "de-DE": "de",
  "fr-FR": "fr",
};

// Simplified Faker instance management
function getLocalizedFaker(region) {
  const locale = LOCALE_MAP[region] || "en";
  faker.locale = locale;
  return faker;
}

function generateBookData(baseSeed, page, index, region) {
  const uniqueSeed = `${baseSeed}-${region}-${page}-${index}`;
  const faker = getLocalizedFaker(region);
  faker.seed(uniqueSeed);

  // Generate reliable data that works across all locales
  return {
    isbn: faker.commerce.isbn(),
    title: faker.book.title(), // More reliable than music/book modules
    authors: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.name.fullName()
    ),
    publisher: faker.company.name(),
  };
}

function generateCount(value, uniqueSeed) {
  const base = Math.floor(value);
  const decimal = value % 1;
  const rng = seedrandom(`${uniqueSeed}-count`);
  return base + (rng() < decimal ? 1 : 0);
}

exports.generateBooksBatch = async (params) => {
  const batchSize = params.page === 1 ? 20 : 10;
  const books = [];

  for (let i = 0; i < batchSize; i++) {
    const book = generateBookData(params.seed, params.page, i, params.region);

    // Add calculated fields
    book.index = calculateIndex(params.page, i);
    const uniqueSeed = params.seed + params.page + i;

    // Generate likes/reviews
    book.likes = generateCount(params.avgLikes, `${uniqueSeed}-likes`);
    book.reviews = Array.from(
      { length: generateCount(params.avgReviews, `${uniqueSeed}-reviews`) },
      (_, r) => ({
        author: faker.name.fullName(),
        text: faker.lorem.paragraph(),
      })
    );

    books.push(book);
  }

  return books;
};
