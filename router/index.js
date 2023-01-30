const Router = require("express").Router;
const router = new Router();

const userController = require("../controllers/user.controller");
const postController = require("../controllers/post.controller");
const commentController = require("../controllers/comment.controller");

const validRegistration = require("../validations/valid.registration");
const validPost = require("../validations/valid.post");
const validComment = require("../validations/valid.comment");

const authMiddleware = require("../middlewares/auth.middleware");
const uploadMiddleware = require("../middlewares/upload.middleware");

router.post("/registration", validRegistration, userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getAllUsers);
router.get("/users/:id", authMiddleware, userController.getOneUser);

router.post("/create-post", authMiddleware, validPost, postController.createPost);
router.get("/posts/user/me", authMiddleware, postController.getMyPosts);
router.get("/posts", authMiddleware, postController.getAllPosts);
router.get("/posts/:id", authMiddleware, postController.getOnePost);
router.delete("/posts/:id", authMiddleware, postController.deletePost);
router.patch("/posts/:id", authMiddleware, postController.updatePost);
router.post("/uploads", authMiddleware, uploadMiddleware.single("image"), postController.uploadImage);
router.put("/like/:postId", authMiddleware, postController.likePost);

router.get("/comments", authMiddleware, commentController.getAllComments);
router.post("/comments/:id", authMiddleware, validComment, commentController.createComment);
router.delete("/comments/:postId/:commentId", authMiddleware, commentController.deleteComment);

module.exports = router;
