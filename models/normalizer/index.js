const normalizer = (text) => {
  if (!text) return;
  if (typeof text !== 'string') return '';

  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/\W/g, '_')
    .replace(/_+/g, ' ')
    .trim()
    .replace(/\s+/g, '.');
}

const PropTypes = {
  bool: v => {
    
  }
}


module.exports = { normalizer };