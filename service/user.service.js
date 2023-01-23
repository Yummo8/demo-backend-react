const bcrypt = require("bcrypt");
const uuid = require("uuid");

const UserModel = require("../models/user.model");

const emailService = require("./email.service");
const tokenService = require("./token.service");

const UserDto = require("../dtos/user.dto");

const ApiError = require("../exceptions/api.error");

class UserService {
  async registration(username, email, password, avatarUrl, post) {
    const userEmail = await UserModel.findOne({ email });

    if (userEmail) {
      throw ApiError.BadRequest(`Email ${email} already exists`);
    }

    const userName = await UserModel.findOne({ username });
    if (userName) {
      throw ApiError.BadRequest(`Username ${username} already exists`);
    }

    const activationLink = uuid.v4();
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({ avatarUrl, post, username, email, password: hashPassword, activationLink });
    await emailService.sendActivationEmail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest("Incorrect link activated");
    }
    user.activated = true;
    await user.save();
  }

  async login(username, password) {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw ApiError.BadRequest(`User ${username} not found`);
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw ApiError.BadRequest("Incorrect password");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async getOneUser(userId) {
    const user = await UserModel.findById({
      _id: userId,
    });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    return user;
  }
}

module.exports = new UserService();
