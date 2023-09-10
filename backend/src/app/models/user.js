
class User {

  constructor(data) {
    this.id = data.user_id;
    this.name = data.name;
    this.email = data.email;
    this.isActive = !data.blocked;
    this.createdAt = data.created_at;
    this.userMetadata = data.user_metadata;
    this.profile = (data.user_metadata && data.user_metadata.sipe && data.user_metadata.sipe.perfil) || '';
    this.cnpjs = (data.user_metadata && data.user_metadata.sipe && data.user_metadata.sipe.cnpjs) || '';
  }

}

module.exports = User;
