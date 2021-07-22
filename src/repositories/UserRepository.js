const Repository = require('./Repository');
const { hash } = require('bcrypt');
const UserConverter = require('../converter/UserConverter');

class UserRepository extends Repository {
  constructor() {
    super('User');

    this.generateHashPassword = (password) => {
      const saltOrRound = 12;
      return hash(password, saltOrRound);
    }
  }

  async getUsers(isAuthenticating, access) {
    let users = await super.all();
    
    const attributes = access.any.allowed 
    ? access.any.attributes 
    : access.own.attributes; 
    
    const converter = new UserConverter('json', attributes);
    
    if (!isAuthenticating) {
      users = users.map(user => ({
        name: user.name
      }));
    }

    return converter.converter(users);
  }

  async create(body) {
    const newPasswordWithHash = await this.generateHashPassword(body.password);
    const newBody = {
      ...body, 
      password: newPasswordWithHash, 
      checked_email: false
    };
    return await super.create(newBody);
  }

  async getUserByEmail(email) {
    return await super.getByCustomNotException({
        email: email
      }, 
      `${email} not registered`,
      true
    );
  }

  async updateCheckedEmail(id) {
    const value = { checked_email: true };
    const where = { id: id };
    return await super.updateCustom(value, where);
  }

  async updatePassword(id, password) {
    const newPassword = await this.generateHashPassword(password);
    const value = { password: newPassword };
    const where = { id: id };
    return await super.updateCustom(value, where);
  }
}

module.exports = UserRepository;