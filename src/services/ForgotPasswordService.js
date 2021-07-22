const ForgotPassword = require('../mails/ForgotPassword');
// const Tokens = require('../controllers/auth/Tokens');

class ForgotPasswordService {
  static async sendEmail(user, token) {
    const forgotPassword = new ForgotPassword(user, token);
    await forgotPassword.sendMail();
  }
}

module.exports = ForgotPasswordService;