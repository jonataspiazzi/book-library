const defaultLoan = {
  _id: null,
  loanDate: null,
  dueDate: null,
  returnDate: null,
  studentId: null,
  studentName: "",
  bookId: null,
  bookTitle: ""
}

function loanModel(obj) {
  return { ...defaultLoan, ...obj };
}

module.exports = {
  defaultLoan
};