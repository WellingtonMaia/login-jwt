const UserRepository = require('../repositories/UserRepository');
const repository = new UserRepository();
const ForgotPasswordService = require('./ForgotPasswordService');
const Tokens = require('../controllers/auth/Tokens');

class UserService {
  static async forgotPassword(email) {
    const user = await repository.getByCustom({email: email});
    const token = await Token.resetPassword(user.id);
    await ForgotPasswordService.sendEmail(user, token);
  }

  static async resetPassword(token, password) {
    const id = await Tokens.checkTokenToResetPassword(token);
    await repository.updatePassword(id, password);
    await Tokens.invalidateResetPasswordToken(token);
  }
}

module.exports = UserService;