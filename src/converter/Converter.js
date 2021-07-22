class Converter {
  constructor(contentType, publicField) {
    this.contentType = contentType;
    this.publicField = publicField;
  }

  filter(data) {
    if (Array.isArray(data)) {
      data = data.map(object => this.filterObject(object));
    } else {
      data = this.filterObject(data);
    }

    return data;
  }

  filterObject(object) {
    const objectFiltered = {};
    this.publicField.forEach(field => {
      if (Reflect.has(object, field)) {
        objectFiltered[field] = object[field];
      }
    });
    return objectFiltered;
  }

  converter(data) {
    if (this.publicField.indexOf('*') === -1) {
      data = this.filter(data);
    }

    if (this.contentType === 'json') {
      return this.json(data);
    }
  }

  json(data) {
    return JSON.stringify(data);
  }

}

module.exports = Converter;