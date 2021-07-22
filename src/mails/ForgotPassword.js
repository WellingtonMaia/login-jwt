const Mail = require('./Mail');

class ForgotPassword extends Mail {
  constructor(user, token) {
    super();
    this.from = '"Blog do Código" <noreply@blogdocodigo.com,br>';
    this.to = user.email;
    this.subject = "Reset Password";
    this.text = `Hello! you requested to reset your password.
    Use this token ${token} to reset your password.`;
    this.html = `<h1>Hello!</h1> 
    <p>You requested to reset your password<p/>
    <p>Use this token <strong>${token}</strong> to reset your password</p>`;
  }
}

module.exports = ForgotPassword;