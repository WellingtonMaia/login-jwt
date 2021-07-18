const { body } = require('express-validator');

module.exports = [
  body('email').not().isEmpty()
  .withMessage("Fill the 'email'")
  .isEmail().normalizeEmail()
  .withMessage('This is not e-mail!'),
  body('password').not().isEmpty().isLength({
    min: 6, max: 10
  })
  .withMessage('Fill password, (min: 6, max: 10)!'),
]