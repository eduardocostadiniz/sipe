const { transformaObjectKeys, generatePassword } = require('../utils');

class User {

  constructor(data) {
    const dataCamelcase = transformaObjectKeys(data)
    this.email = dataCamelcase.email;
    this.name = dataCamelcase.name;
    this.password = dataCamelcase.password;
    this.avatar = dataCamelcase.avatar;
    this.profile = dataCamelcase.profile;
    this.clientCnpj = dataCamelcase.clientCnpj;
    this.isActive = dataCamelcase.isActive;
    this.createdAt = dataCamelcase.createdAt;
  }

  async encryptPassword() {
    this.password = await generatePassword(this.password);
  }

}

module.exports = User;
