const { body } = require('express-validator');
const UserRepository = require('../../repositories/UserRepository');
const repository = new UserRepository();

module.exports = [
    body('name').not().isEmpty().trim().escape()
    .isLength({ min: 3})
    .withMessage("Fill the 'name'"),
    
    body('email').isEmail().normalizeEmail()
    .withMessage('This is not e-mail!')
    .custom(async (email) => {
      const user = await repository.getByCustomNotException({email: email});
      if(user) {
        return Promise.reject('E-mail already registered!');
      }
    }),
    
    body('password').not().isEmpty().isLength({
      min: 6, max: 10
    })
    .withMessage('Fill password, (min: 6, max: 10)!'),

    body('permission').not().isEmpty()
    .isIn(['admin', 'editor', 'subscriber'])
    .withMessage("Select permission 'admin', 'editor' or 'subscriber'")
  ]