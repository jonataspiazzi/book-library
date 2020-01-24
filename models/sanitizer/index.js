const { ObjectID } = require('mongodb');

const stBool = v => {
  if (v === true) return true;
  if (v === false) return false;
  
  if (typeof v !== 'string') return undefined;

  const s = v.toLowerCase();

  if (s == 'true') return true;
  if (s == 'false') return false;

  return undefined;
}

const stNumber = v => {
  const n = Number(v);

  if (isNaN(n)) return undefined;

  return n;
}

const stString = v => {
  if (!v) return '';

  return typeof v === 'string' ? v : undefined;
}

const stDate = v => {
  if (!v) return undefined;

  const d = new Date(v);

  return isNaN(d.valueOf()) ? undefined : d;
}

const stObjectId = v => {
  if (!v) return undefined;

  try {
    return ObjectID(v);
  } catch (err) {
    return undefined;
  }
}

stBool.isSanitizerType = true;
stBool.sanitizerName = 'bool';

stNumber.isSanitizerType = true;
stNumber.sanitizerName = 'number';

stString.isSanitizerType = true;
stString.sanitizerName = 'string';

stDate.isSanitizerType = true;
stDate.sanitizerName = 'date';

stObjectId.isSanitizerType = true;
stObjectId.sanitizerName = 'objectId';

const sanitize = (obj, template) => {
  for (let prop in obj) {
    const s = template[prop];

    if (!s || typeof s !== 'function' || !s.isSanitizerType) {
      delete obj[prop];
      continue;
    }

    obj[prop] = s(obj[prop]);
  }
}

module.exports = {
  SanitizerTypes: {
    bool: stBool,
    number: stNumber,
    string: stString,
    date: stDate,
    objectId: stObjectId
  },
  sanitize
}