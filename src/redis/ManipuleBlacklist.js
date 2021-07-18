const blacklist = require('./blacklist');
const { promisify } = require("util");

const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

const jwt = require('jsonwebtoken');

const { createHash } = require('crypto');

function generateTokenHash(token) {
  return createHash('sha256').update(token).digest('hex');
}

class ManipuleBlacklist {
  static async addToken(token) {
    const dateExpire = jwt.decode(token).exp;
    const tokenHash = generateTokenHash(token);
    
    await setAsync(tokenHash, '');
    blacklist.expireat(token, dateExpire);
  }

  static async tokenExists (token) {
    const tokenHash = generateTokenHash(token);
    const result = await existsAsync(tokenHash);
    return  result === 1;
  }
}

module.exports = ManipuleBlacklist;