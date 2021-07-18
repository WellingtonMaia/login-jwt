const { body } = require('express-validator');

module.exports = [
    body('title').not().isEmpty().trim().escape()
    .withMessage("Fill the 'title'!"),
    body('content').not().isEmpty().trim().escape()
    .isLength({ min: 5 }) //value should be more than 5
    .withMessage("Fill the 'content'!"),
  ];