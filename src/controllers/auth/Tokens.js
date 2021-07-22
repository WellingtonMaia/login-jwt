const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

const BlocklistAccessToken = require('../../redis/BlocklistAccessToken');
const allowlistRefreshToken = require('../../redis/AllowlistRefreshToken');
const allowlistResetPasswordToken = require('../../redis/ResetPasswordToken');

const { InvalidArgumentError } = require('../../errors/erros');

const defaultValueJWT = [5, 'd']; //after change to 15 min => [15, 'm'];
const defaultValueOpacoToken = [5, 'd'];
const defaultValueCheckEmail = [1, 'h'];
const defaultValueResetPassword = [1, 'h'];

class Tokens {
  static createJsonWebToken(
      id, 
      [amountTimeExpiration, unitTime] = defaultValueJWT
    ) {
    return createJTW(id, amountTimeExpiration, unitTime);
  }

  static async checkJsonWebToken(
      token, 
      blocklist = BlocklistAccessToken, 
      name = 'Access Token'
    ) {
    return await checkJWT(token, blocklist, name);
  }

  static async invalidateJsonWebToken(token, blocklist = BlocklistAccessToken) {
    return await blocklist.addToken(token);
  }

  static async createOpacoToken(
    id, 
    allowlist = allowlistRefreshToken, 
    [ amountTimeExpiration, unitTime ] = defaultValueOpacoToken
    ) {
    return await generateOpacoToken(id, allowlist, amountTimeExpiration, unitTime);
  }

  static async checkOpacoToken(token, 
    allowlist = allowlistRefreshToken,
    name = 'Refresh Token'
  ) {
    return await checkIfOpacoTokenIsValid(token, name, allowlist);  
  }

  static async invalidateOpacoToken(token, allowlist = allowlistRefreshToken) {
    await allowlist.delete(token);
  }

  static createTokenCheckedEmail(id,
    [ amountTimeExpiration, unitTime ] = defaultValueCheckEmail,
  ) {
      return createJTW(id, amountTimeExpiration, unitTime);
  }

  static async checkedEmail(token,
    name = 'Token of verification email'
  ) {
    return await checkJWT(token, undefined, name)
  }

  static async resetPassword(
    id, 
    allowlist = allowlistResetPasswordToken,
    [amountTimeExpiration, unitTime] = defaultValueResetPassword
  ) {
    return await generateOpacoToken(
      id, allowlist, amountTimeExpiration, unitTime
    );
  }

  static async checkTokenToResetPassword(
    token, 
    allowlist = allowlistResetPasswordToken,
    name = 'Reset Password Token'
  ) {
    return await checkIfOpacoTokenIsValid(token, name, allowlist);  
  }

  static async invalidateResetPasswordToken(token, allowlist = allowlistResetPasswordToken) {
    await allowlist.delete(token)
  }
}

async function checkIfOpacoTokenIsValid(token, name, allowlist) {
  checkTokenSended(token, name);
  const id = await allowlist.getValue(token);
  checkTokenIsValid(id, name);
  return id;
}

async function generateOpacoToken(id, allowlist, amountTimeExpiration, unitTime) {
  const sizeBytes = 24;
  const expireIn = moment().add(amountTimeExpiration, unitTime).unix();
  const opacoToken = crypto.randomBytes(sizeBytes).toString('hex');

  await allowlist.add(opacoToken, id, expireIn);

  return opacoToken;
}

async function checkJWT(token, blocklist, name) {
  await checkTokenInBlocklist(token, blocklist, name);
  const { id } = jwt.verify(token, process.env.JWT_KEY);
  return id;
}

function createJTW(id, amountTimeExpiration, unitTime) {
  const payload = {
    id
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_KEY,
    {
      expiresIn: amountTimeExpiration + unitTime
    }
  );
  return token;
}

async function checkTokenInBlocklist(token, blocklist, name) {
  if(!blocklist) {
    return;
  }

  const tokenInBlocklist = await blocklist.tokenExists(token);
  if (tokenInBlocklist) {
    throw new jwt.JsonWebTokenError(`${name} invalid to logout!`);
  }
}

function checkTokenIsValid(id, name) {
  if (!id) {
    throw new InvalidArgumentError(`${name} is invalid!`);
  }
}

function checkTokenSended(token, name) {
  if (!token) {
    throw new InvalidArgumentError(`${name} was not send!`);
  }
}

module.exports = Tokens;