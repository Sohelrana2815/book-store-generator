const { faker } = require('@faker-js/faker');
const seedrandom = require('seedrandom');

const LOCALE_MAP = {
  'en-US': 'en',
  'de-DE': 'de', 
  'fr-FR': 'fr'
};

const generateBookCover = (title, author, seed) => {
  const rng = seedrandom(seed);
  const bgColor = Math.floor(rng() * 16777215).toString(16).padStart(6, '0');
  return `https://dummyimage.com/200x300/${bgColor}/ffffff?text=${encodeURIComponent(title.substring(0, 30))}`;
};

exports.getBooks = (req, res) => {
  try {
    const { seed = 42, locale = 'en-US', page = 0, avgLikes = 5, avgReviews = 3 } = req.query;
    
    // Validate numeric inputs
    if (isNaN(seed) || isNaN(page) || isNaN(avgLikes) || isNaN(avgReviews)) {
      return res.status(400).json({ error: 'Invalid numeric parameters' });
    }

    faker.locale = LOCALE_MAP[locale] || 'en';
    const books = Array.from({ length: page == 0 ? 20 : 10 }, (_, index) => {
      const bookSeed = `${seed}-${page}-${index}`;
      const rng = seedrandom(bookSeed);
      
      // Calculate probabilistic counts
      const likes = Math.floor(avgLikes) + (rng() < (avgLikes % 1) ? 1 : 0);
      const reviewCount = Math.floor(avgReviews) + (rng() < (avgReviews % 1) ? 1 : 0);

      return {
        id: `${seed}-${page}-${index}`,
        index: page * 20 + index + 1,
        isbn: faker.commerce.isbn(),
        title: faker.music.songName(),
        author: faker.person.fullName(),
        publisher: faker.company.name(),
        year: faker.date.past(10).getFullYear(),
        likes,
        reviews: Array.from({ length: reviewCount }, () => ({
          text: faker.lorem.paragraph(),
          author: faker.person.fullName(),
          rating: Math.min(5, Math.floor(rng() * 6)) // 0-5 stars
        })),
        coverImage: generateBookCover(
          faker.music.songName(),
          faker.person.fullName(),
          bookSeed
        )
      };
    });

    res.json(books);
  } catch (error) {
    console.error('Error generating books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};