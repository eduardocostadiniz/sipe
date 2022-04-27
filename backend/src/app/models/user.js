
class User {

  constructor(data) {
    this.id = data.id;
    this.firstName = (data.firstName || '').trim();
    this.lastName = (data.lastName || '').trim();
    this.email = data.email;
    this.profile = data.profile;
    this.isActive = data.enabled;
    this.createdAt = data.createdTimestamp;
  }

}

module.exports = User;
