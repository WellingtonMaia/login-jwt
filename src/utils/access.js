module.exports = {
  access: (access) => {
      if (access) {
        return access.any.allowed 
        ? access.any.attributes 
        : access.own.attributes;
      }
      return [];
  }
}