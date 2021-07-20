const { promisify } = require('util');

class ManipuleteList {
  constructor(list) {
    this.list = list;
    this.setAsync = promisify(this.list.set).bind(this.list);
    this.existsAsync = promisify(this.list.exists).bind(this.list);
    this.getAsync = promisify(this.list.get).bind(this.list);
    this.delAsync = promisify(this.list.del).bind(this.list);
  }

  async add(key, value, expireAt) {
    await this.setAsync(key, value);
    this.list.expireat(key, expireAt);
  }

  async getValue(key) {
    return await this.getAsync(key);
  }

  async hasKey(key) {
    const result = await this.existsAsync(key);
    return  result === 1;
  }

  async delete(key) {
    await this.delAsync(key)
  }
  
}

module.exports = ManipuleteList;