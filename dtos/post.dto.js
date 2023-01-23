module.exports = class PostDto {
  user;
  title;
  text;
  imageUrl;
  postId;

  constructor(model) {
    this.userId = model.user;
    this.postId = model._id;
    this.title = model.title;
    this.text = model.text;
    this.imageUrl = model.imageUrl;
  }
};
