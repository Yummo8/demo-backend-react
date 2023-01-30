const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

const PostDto = require("../dtos/post.dto");

const ApiError = require("../exceptions/api.error");

class PostService {
  async createPost(title, text, id, imageUrl) {
    const post = await PostModel.create({ title, text, user: id, imageUrl });

    await UserModel.findByIdAndUpdate(id, {
      $push: { post: post },
    });

    const postDto = new PostDto(post);
    return {
      post: postDto,
    };
  }

  async updatePost(postId, title, text, imageUrl) {
    const post = await PostModel.findByIdAndUpdate(
      { _id: postId },
      {
        title,
        text,
        imageUrl,
      }
    );

    if (!post) {
      throw ApiError.BadRequest("Not found post");
    }

    return post;
  }

  async deletePost(postId, id) {
    const post = await PostModel.findByIdAndDelete(postId);
    await UserModel.findByIdAndUpdate(id, {
      $pull: { post: postId },
    });

    if (!post) {
      throw ApiError.BadRequest("Not found post");
    }

    return post;
  }

  async getOnePost(postId) {
    const post = await PostModel.findByIdAndUpdate(
      { _id: postId },

      { $inc: { viewCount: 1 } },

      { returnDocument: "after" }
    );

    if (!post) {
      throw ApiError.BadRequest("Not found post");
    }
    return post;
  }

  async likePost(postId, id) {
    const like = await PostModel.findByIdAndUpdate(postId, {
      $push: { likeCount: id },
    });
    console.log(like);
    return like;
  }

  async getAllPosts() {
    const posts = await PostModel.find().sort("-createdAt").populate("user").exec();

    return posts;
  }
}

module.exports = new PostService();
