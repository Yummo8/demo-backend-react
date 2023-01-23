module.exports = class UserDto {
  username;
  email;
  id;
  activated;
  avatarUrl;

  constructor(model) {
    this.username = model.username;
    this.email = model.email;
    this.id = model._id;
    this.activated = model.activated;
    this.avatarUrl = model.avatarUrl;
  }
};
