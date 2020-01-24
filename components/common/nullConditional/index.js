export const nc = (operation) => {
  try {
    return operation();
  } catch (e) {
    return null;
  }
};

export const safeBind = (operation) => {
  return (...args) => {
    return nc(() => operation(...args));
  }
}