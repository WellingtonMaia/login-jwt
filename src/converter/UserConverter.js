const Converter = require('./Converter');

class UserConverter extends Converter {
  constructor(contentType, extrasFields = []) {
    const publicField = ['name'].concat(extrasFields);
    super(contentType, publicField)    
  }
}

module.exports = UserConverter;