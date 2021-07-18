const database = require('../database/models');

class Repository {
  
  constructor(modelName) {
    this.modelName = modelName;
    
    this.conditionsIsValid = (where) => {
      if (!where) throw new Error('Uninformed conditions!');
    }
  }

  async all(where = {}) {
    return await database[this.modelName].findAll({
      where: { ...where }
    });
  }

  async getById(id, msgError) {
    const found =  await database[this.modelName].findOne({
      where: { 
        id: id
       }
    });

    if (!found) {
      throw new Error(msgError || `${this.modelName} not found!`);
    }

    return found;
  }

  async getByCustom(where, msgError, raw = false) {
    const found = await this.getByCustomNotException(where, raw)
    
    if (!found) {
      throw new Error(msgError || `${this.modelName} not found!`);
    }
    
    return found;
  }

  async getByCustomNotException(where, raw = false) {
    this.conditionsIsValid(where);

    return await database[this.modelName].findOne({
      where: { ...where },
      raw: raw
    });
  }

  async create(values) {
    return await database[this.modelName].create(values);
  }

  async update(values, id, transaction = {}) {
    await this.getById(id);

    await database[this.modelName].update(values, {
      where: {
        id: id
      }
    }, { transaction: transaction })

    return await this.getById(id);
  }

  async updateCustom(values, where, transaction = {}) {
    this.conditionsIsValid(where);
    
    await this.getById(where);

    await database[this.modelName].update(values, {
      where: { ...where }
    }, { transaction: transaction })

    return await this.getById(where);
  }

  async delete(id) {
    await this.getById(id);
    
    return await database[this.modelName].destroy({
      where: {
        id: id
      }
    });
  }

  async deleteCustom(where) {
    this.conditionsIsValid(where);
    
    await await this.getByCustom(where);

    return await database[this.modelName].destroy({
      where: { ...where }
    });
  }

  async restore(id) {
    return await database[this.modelName].restore({
      where: { 
        id: id 
      }
    });
  }
}

module.exports = Repository;