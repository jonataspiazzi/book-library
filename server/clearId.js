function clearId(obj, remove_id = true, removeId = false) {
  if (remove_id) {
    if (obj._id) {
      obj.id = obj._id;
    }
    delete obj._id;
  }

  if (removeId) {
    delete obj.id;
  }
  
  return obj;
}

module.exports = { clearId };