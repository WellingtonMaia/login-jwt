const { body } = require('express-validator');

module.exports = {
  login: [
    body('email').not().isEmpty()
    .withMessage("Fill the 'email'")
    .isEmail().normalizeEmail()
    .withMessage('This is not e-mail!'),
    body('password').not().isEmpty().isLength({
      min: 6, max: 10
    })
    .withMessage('Fill password, (min: 6, max: 10)!'),
  ],
  resetPassword: [
    body('token').not().isEmpty()
    .withMessage("Token not informed")
    .isString()
    .withMessage("The token not is a string")
    .isLength({min: 1})
    .withMessage("Token not informed"),
    body('password').not().isEmpty().isLength({
      min: 6, max: 10
    })
    .withMessage('Fill password, (min: 6, max: 10)!')
  ]
}