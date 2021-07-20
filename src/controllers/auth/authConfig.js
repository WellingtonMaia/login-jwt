const passport = require('passport');
const LocalStrategy = require('passport-local');
const { compare } = require('bcrypt');
const BearerStrategy = require('passport-http-bearer').Strategy;

const { InvalidArgumentError } = require('../../errors/erros');

const UserRepository = require('../../repositories/UserRepository');
const userRepository = new UserRepository();
const Tokens = require('./Tokens');

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, async (email, password, done) => {

    try {
      const user = await userRepository.getUserByEmail(email);
      
      await checkPassword(password, user.password);

      done(null, user);      
    } catch (error) {
      done(error);
    }
  })
);

async function checkPassword(password, hashPassword) {
  const passwordIsValid = await compare(password, hashPassword);
  if (!passwordIsValid) {
    throw new InvalidArgumentError('Mail or password was invalid');
  }
}

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const id = await Tokens.checkJsonWebToken(token)
        const user = await userRepository.getById(id);

        done(null, user, { token: token });
      } catch (error) {
        done(error);
      }
    }
  )
)

module.exports = passport;