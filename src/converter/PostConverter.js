const Converter = require('./Converter');

class PostConverter extends Converter {
  constructor(contentType, extrasFields = []) {
    const publicField = ['title', 'content'].concat(extrasFields);
    super(contentType, publicField)    
  }
}

module.exports = PostConverter;