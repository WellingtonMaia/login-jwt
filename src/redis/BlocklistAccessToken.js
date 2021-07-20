const redis = require('redis');
const blocklist = redis.createClient({ prefix: 'blocklist-access-token:' });

const ManipuleteList = require('./ManiputeList');
const manipuleBlocklist = new ManipuleteList(blocklist);

const jwt = require('jsonwebtoken');

const { createHash } = require('crypto');

function generateTokenHash(token) {
  return createHash('sha256').update(token).digest('hex');
}

class ManipuleBlocklist {
  static async addToken(token) {
    const expireAt = jwt.decode(token).exp;
    const tokenHash = generateTokenHash(token);
    await manipuleBlocklist.add(tokenHash, '', expireAt);
  }

  static async tokenExists (token) {
    const tokenHash = generateTokenHash(token);
    return await manipuleBlocklist.hasKey(tokenHash);
  }
}

module.exports = ManipuleBlocklist;