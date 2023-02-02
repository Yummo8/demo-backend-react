const commentService = require("../service/comment.service");
const { validationResult } = require("express-validator");

const ApiError = require("../exceptions/api.error");

class CommentController {
  async createComment(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Comment no create", errors.array()));
    }
    try {
      const { text } = req.body;
      const postId = req.params.id;
      const { id } = req.user;
      const comment = await commentService.createComment(text, postId, id);
      return res.json(comment);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const postId = req.params.postId;
      const commentId = req.params.commentId;
      const id = req.user;
      const comment = await commentService.deleteComment(commentId, postId, id);
      return res.json(comment);
    } catch (error) {
      next(error);
    }
  }

  async getAllComments(req, res, next) {
    try {
      const comments = await commentService.getAllComments();
      return res.json(comments);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
