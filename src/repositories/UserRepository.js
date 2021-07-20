const Repository = require('./Repository');
const { hash } = require('bcrypt');

class UserRepository extends Repository {
  constructor() {
    super('User');

    this.generateHashPassword = (password) => {
      const saltOrRound = 12;
      return hash(password, saltOrRound);
    }
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
    return await super.getByCustom({
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
}

module.exports = UserRepository;