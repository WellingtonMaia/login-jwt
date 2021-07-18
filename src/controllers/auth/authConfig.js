const passport = require('passport');
const LocalStrategy = require('passport-local');
const { compare } = require('bcrypt');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');

const { InvalidArgumentError } = require('../../errors/erros');

const UserRepository = require('../../repositories/UserRepository');
const userRepository = new UserRepository();

const ManipuleBlacklist = require('../../redis/ManipuleBlacklist');

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

async function checkTokenInBlacklist(token) {
  const tokenInBlacklist = await ManipuleBlacklist.tokenExists(token);
  if (tokenInBlacklist) {
    throw new jwt.JsonWebTokenError('Token invalid to logout!')
  }
}

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await checkTokenInBlacklist(token);
        
        const payload = jwt.verify(token, process.env.JWT_KEY);
        const user = await userRepository.getById(payload.id);

        done(null, user, { token: token });
      } catch (error) {
        done(error.message);
      }
    }
  )
)

module.exports = passport;