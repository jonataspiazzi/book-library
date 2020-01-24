const studentsMock = require('../mock/students');
const booksMock = require('../mock/books');
const { USE_MOCK, MOCK_DELAY } = process.env;
const { normalizer } = require('../models/normalizer');
const { sanitizeBook } = require('../models/book');
const { sanitizeStudent } = require('../models/student');
const { applyLimitControl } = require('../config');
const { clearId } = require('./clearId');

const mongoAdapterSwapper = (MongoAdapter) => {
  if (USE_MOCK !== 'true') {
    return MongoAdapter;
  } else {
    console.log(`Using MongoAdapterMock with delay = ${MOCK_DELAY}`);

    function MongoAdapterMock(collectionName) {
      MongoAdapter.call(this, collectionName);
    
      this.getMock = () => {
        switch(collectionName) {
          case 'students': return studentsMock.map(student => sanitizeStudent({ ...student }));
          case 'books': return booksMock.map(book => sanitizeBook({ ...book }));
          default: null;
        }
      }
      
      const mock = this.getMock();

      if (mock) {
        this.getBy = (query) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              if (!query) {
                resolve(mock);
                return;
              }
      
              let prop;
          
              for (let p in query) {
                prop = p;
              }
          
              const value = query[prop];
          
              if (typeof value !== 'object') return mock;
          
              const regexp = new RegExp(value.$regex, value.$options);

              const res = mock.filter(i => regexp.test(i[prop]));
              res.forEach(i => clearId(id));
              
              resolve(res);
            }, Number(MOCK_DELAY));
          });
        }

        this.getAll = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const limit = applyLimitControl();
              resolve(mock.filter((_, i) => i < limit).map(i => clearId(i)));
            }, Number(MOCK_DELAY));
          })
        }

        this.getByQueryText = (query, skip, limit) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              mock.sort((l, r) => l.querytext <= r.querytext ? -1 : 1);

              let ret = mock;

              if (query) {
                const regex = new RegExp(normalizer(query).replace(/\./g, '.+'));

                ret = ret.filter(i => regex.test(i.querytext));
              }

              const count = ret.length;

              const nSkip = Number(skip) || 0;
              const nLimit = applyLimitControl(limit);

              if (nSkip) ret = ret.filter((_, i) => i >= nSkip);
              if (nLimit) ret = ret.filter((_, i) => i < nLimit);

              ret.forEach(i => clearId(i));

              resolve({ skip: nSkip, limit: nLimit, count, data: ret });
            }, Number(MOCK_DELAY));
          })
        }
      }
    }
    
    return MongoAdapterMock;
  }
}

module.exports = mongoAdapterSwapper;