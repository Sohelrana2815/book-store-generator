const { faker } = require("@faker-js/faker");
const seedrandom = require("seedrandom");

// Generate books data according the locale and seed

function generateBooks(seed, locale, count, startIndex) {
  const books = [];
  for (let i = 0; i < count; i++) {
    const bookSeed = seed + startIndex + i;
    faker.seed(bookSeed);
    books.push({
      index: startIndex + i + 1,
      isbn: faker.commerce.isbn(),
      title: faker.book.title(),
      author: faker.book.author(),
      publisher: faker.book.publisher(),
    });
  }
  return books;
}

// Likes & Reviews calculation

function calculateCount(avg) {
  const base = Math.floor(avg);
  const decimal = avg - base;
  return base + (Math.random() < decimal ? 1 : 0);
}

module.exports = { generateBooks, calculateCount };


