/**
 * Creates a object with the reflection of object passed.
 * @param {object} [obj] The object to be reflected.
 * @param {number} [deep] The maximun deep to reflect in prop values of object type.
 * @param {object} [displayValues=false] Indicates when include or not prop values.
 * @return {object} A object with all reflection information.
 */
function objectReflection(obj, deep, displayValues = false) {
  if (deep == 0) return {};

  const dic = [{ key: "__type", value: obj.constructor && obj.constructor.name || 'not indentified' }];

  for (let prop in obj) {
    const propValue = obj[prop];
    const type = typeof propValue;
    let outputValue = '';

    if (['undefined', 'boolean', 'number', 'string'].indexOf(type) >= 0) {
      outputValue = displayValues ? `[${type}] ${propValue}` : type;
    } else if (type === 'object' && deep > 1 && propValue !== null) {
      outputValue = objectReflection(propValue, deep - 1, displayValues);
    } else {
      outputValue = displayValues ? `[${type}]` : type;
    }

    dic.push({ key: prop, value: outputValue });
  }

  dic.sort((l, r) => l.key < r.key ? -1 : (l.key === r.key ? 0 : 1));

  const ret = {};

  for (let kv of dic) ret[kv.key] = kv.value;

  return ret;
}

module.exports = { objectReflection };