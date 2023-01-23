const CommentModel = require("../models/comment.model");
const PostModel = require("../models/post.model");

const CommentDto = require("../dtos/comment.dto");

const ApiError = require("../exceptions/api.error");

class CommentService {
  async createComment(text, username, postId, id) {
    const comment = await CommentModel.create({ text, post: postId, user: username, user: id });

    await PostModel.findByIdAndUpdate(postId, {
      $push: { comment: comment },
    });

    const commentDto = new CommentDto(comment);
    return {
      comment: commentDto,
    };
  }

  async deleteComment(commentId, postId, id) {
    const comment = await CommentModel.findByIdAndDelete(commentId);

    await PostModel.findByIdAndUpdate(postId, {
      $pull: { comment: commentId },
    });
    console.log(id);

    if (!comment) {
      throw ApiError.BadRequest("Not found comment");
    }

    return comment;
  }

  async getAllComments() {
    const comment = await CommentModel.find();

    return comment;
  }
}

module.exports = new CommentService();
