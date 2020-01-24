const express = require('express');
const router = express.Router();
const MongoAdapter = require('../server/mongoAdapter');
const { ObjectID } = require('mongodb');
const { blockingPeriod } = require('../config');
const { dateFormat } = require('../components/common/dateFormat');

router.post('/borrows', async (req, res) => {
  const adapter = new MongoAdapter('loans');
  
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + req.body.dueTime);

  const loan = {
    loanDate: new Date(),
    dueDate: dueDate,
    studentId: ObjectID(req.body.studentId),
    studentName: req.body.studentName,
    bookId: ObjectID(req.body.bookId),
    bookTitle: req.body.bookTitle
  };

  await adapter.create(loan);
  res.send('Loan created with success.');
});

router.post('/returns', async (req, res) => {
  const lAdapter = new MongoAdapter('loans');
  const hAdapter = new MongoAdapter('loan-histories');

  const loan = await lAdapter.getOne(req.body.id);
  
  loan.returnDate = new Date();

  if (loan.returnDate > loan.dueDate) {
    const sAdapter = new MongoAdapter('students');
    const student = await sAdapter.getOne(loan.studentId);

    const delayDays = Math.trunc((loan.returnDate - loan.dueDate) / 24 / 60 / 60 / 1000);

    student.blocked = true;
    student.blockedUntil = new Date();
    student.blockedUntil.setDate(student.blockedUntil.getDate() + blockingPeriod);
    student.blockedMessage= 
      `O aluno foi bloqueado por devolver o livro ${loan.bookTitle}, ` +
      `no dia ${dateFormat(loan.returnDate, 'dd/MM/yyyy')}, ` +
      `com um atraso de ${delayDays} dia(s). ` +
      `O bloqueio dura até ${dateFormat(student.blockedUntil, 'dd/MM/yyyy')}.`;

    await sAdapter.update(student.id, student);
  }

  await lAdapter.delete(req.body.id);
  await hAdapter.create(loan);

  res.send('Loan returned with success.');
});

module.exports = router;