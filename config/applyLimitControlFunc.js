const applyLimitControlFunc = (maxLimit) => {
  return (limit) => {
    const nLimit = Number(limit);

    if (isNaN(nLimit)) return maxLimit;
    if (nLimit < 1) return maxLimit;
  
    return nLimit < maxLimit ? nLimit : maxLimit;
  }
}

module.exports = { applyLimitControlFunc };