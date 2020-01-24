const normalizer = require('./normalizer').normalizer;
const sanitizer = require('./sanitizer');
const SanitizerTypes = sanitizer.SanitizerTypes;
const sanitize = sanitizer.sanitize;

const bookTemplate = {
  _id: SanitizerTypes.objectId,
  title: SanitizerTypes.string,
  author: SanitizerTypes.string,
  place: SanitizerTypes.string,
  code: SanitizerTypes.string,
  querytext: SanitizerTypes.string
}

function sanitizeBook(book) {
  book.querytext = normalizer(`${book.title} ${book.author}`);

  sanitize(book, bookTemplate);

  return book;
}

module.exports = { sanitizeBook };
