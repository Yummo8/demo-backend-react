module.exports = class CommentDto {
  user;
  text;
  commentId;
  post;

  constructor(model) {
    this.userId = model.user;
    this.postId = model.post;
    this.commentId = model._id;
    this.text = model.text;
  }
};
