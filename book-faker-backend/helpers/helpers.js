exports.calculateIndex = (page, bookIndex) => {
  return page === 1 ? bookIndex + 1 : 20 + (page - 2) * 10 + bookIndex + 1;
};
