const postService = require("../service/post.service");
const { validationResult } = require("express-validator");

const ApiError = require("../exceptions/api.error");

class PostController {
  async createPost(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Post no create", errors.array()));
    }
    try {
      const { title, text, imageUrl } = req.body;
      const id = req.user.id;
      const post = await postService.createPost(title, text, id, imageUrl);
      return res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req, res, next) {
    try {
      const { title, text, imageUrl } = req.body;
      const postId = req.params.id;
      const post = await postService.updatePost(postId, title, text, imageUrl);
      return res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const postId = req.params.id;
      const id = req.user.id;
      const post = await postService.deletePost(postId, id);
      return res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async getOnePost(req, res, next) {
    try {
      const postId = req.params.id;
      const post = await postService.getOnePost(postId);
      return res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await postService.getAllPosts();
      return res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async uploadImage(req, res) {
    res.json({ url: `/uploads/${req.file.originalname}` });
  }
}

module.exports = new PostController();
