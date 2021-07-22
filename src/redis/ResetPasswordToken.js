const redis = require('redis');
const allowlist = redis.createClient({ prefix: 'reset-password-token:' });

const ManipuleteList = require('./ManiputeList');

module.exports = new ManipuleteList(allowlist);