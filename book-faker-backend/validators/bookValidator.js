const LOCALES = ["en-US", "de-DE", "fr-FR"];

exports.validateBookParams = (query) => {
  const errors = [];

  if (isNaN(query.seed)) errors.push("Seed must be a number");
  if (query.page && (isNaN(query.page) || query.page < 1)) {
    errors.push("Page must be a positive number");
  }
  if (query.region && !LOCALES.includes(query.region)) {
    errors.push(`Unsupported region. Supported: ${LOCALES.join(", ")}`);
  }
  if (
    query.avgLikes &&
    (isNaN(query.avgLikes) || query.avgLikes < 0 || query.avgLikes > 10)
  ) {
    errors.push("Likes must be between 0-10");
  }
  if (
    query.avgReviews &&
    (isNaN(query.avgReviews) || query.avgReviews < 0 || query.avgReviews > 10)
  ) {
    errors.push("Reviews must be between 0-10");
  }

  return errors;
};
