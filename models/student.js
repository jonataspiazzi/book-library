const normalizer = require('./normalizer').normalizer;
const sanitizer = require('./sanitizer');
const SanitizerTypes = sanitizer.SanitizerTypes;
const sanitize = sanitizer.sanitize;

const studentTemplate = {
  _id: SanitizerTypes.objectId,
  name: SanitizerTypes.string,
  code: SanitizerTypes.string,
  class: SanitizerTypes.string,
  blocked: SanitizerTypes.bool,
  blockedUntil: SanitizerTypes.date,
  blockedMessage: SanitizerTypes.string,
  querytext: SanitizerTypes.string
}

function sanitizeStudent(student) {
  student.querytext = normalizer(`${student.name} ${student.code}`);

  sanitize(student, studentTemplate);

  return student;
}

module.exports = { sanitizeStudent };
