const { dueTimeOptions } = require('./dueTimeOptions');
const { applyLimitControlFunc } = require('./applyLimitControlFunc');

const defaultDueTime = dueTimeOptions[8];
const maxLoanBooksPerStudent = 3;
const idleTimeout = 5 * 60; // sec
const gridPageSize = 6;
const gridMaxPaginationControl = 5;
const maxLimit = 10;
const applyLimitControl = applyLimitControlFunc(maxLimit);
const blockingPeriod = 15; // days

module.exports = {
  defaultDueTime,
  dueTimeOptions,
  maxLoanBooksPerStudent,
  idleTimeout,
  gridPageSize,
  gridMaxPaginationControl,
  maxLimit,
  applyLimitControl,
  blockingPeriod
};