const CheckMail = require('../mails/CheckMail');
const Tokens = require('../controllers/auth/Tokens');

class CheckMailService {
  static async sendEmail(user) {
    const token = await Tokens.createTokenCheckedEmail(user.id);
    const address = generateAddress('/users/check-email/', token);
    const checkMail = new CheckMail(user, address);
    checkMail.sendMail().catch(console.log);
  }
}

function generateAddress(route, token) {
  const baseURL = process.env.BASE_URL;
  return `${baseURL}${route}${token}`;
}

module.exports = CheckMailService;