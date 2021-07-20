const nodemailer = require('nodemailer');

const emailTestSetup = (testAccount) => ({
  host: 'smtp.ethereal.email',
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  }
});

const setupProductionEmail = {
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  port: process.env.MAIL_PORT,
  secure: true
};

class Mail {
  async sendMail() {
    const emailConfig = await createEmailConfig();
    const transport = nodemailer.createTransport(emailConfig);

    const info = await transport.sendMail(this);

    if (process.env.NODE_ENV !== 'production') {
      console.log('URL: '+ nodemailer.getTestMessageUrl(info));
    } else {
      
    }
  }
}

async function createEmailConfig() {
  if (process.env.NODE_ENV === 'production') {
    return setupProductionEmail;
  } else {
    const testAccount = await nodemailer.createTestAccount();
    return emailTestSetup(testAccount);
  }
}

module.exports = Mail;