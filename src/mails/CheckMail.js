const Mail = require('./Mail');

class CheckMail extends Mail {
  constructor(user, address) {
    super();
    this.from = '"Blog do Código" <noreply@blogdocodigo.com,br>';
    this.to = user.email;
    this.subject = "Verification of E-mail";
    this.text = `Hello! check your e-mail here: ${address}`;
    this.html = `<h1>Hello!</h1> 
    <p>check your e-mail here: <a href="${address}">${address}<a> <p/>`;
  }
}

module.exports = CheckMail;