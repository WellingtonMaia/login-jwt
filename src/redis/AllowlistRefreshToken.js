const redis = require('redis');
const allowlist = redis.createClient({ prefix: 'allowlist-refresh-token:' });

const ManipuleteList = require('./ManiputeList');

module.exports = new ManipuleteList(allowlist);