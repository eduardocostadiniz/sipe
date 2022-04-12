
class User {

  constructor(data) {
    this.id = data.id
    this.name = `${data.firstName} ${data.lastName || ''}`.trim()
    this.email = data.email;
    this.isActive = data.enabled
    this.createdAt = data.createdTimestamp;
  }

}

module.exports = User;
