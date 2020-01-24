export default class PromiseList {
  constructor() {
    this.list = [];
  }

  push(promise) {
    this.list.push(promise);
  }

  async toArray() {
    const arr = [];

    for (let i = 0; i < this.list.length; i++) {
      try {
        const item = await this.list[i];
        arr.push(item);
      } catch (e) {};
    }

    return arr;
  }
}