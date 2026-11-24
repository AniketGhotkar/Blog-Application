const express = require("express");
const router = express.Router();
const Post = require("../model/PostSchema");
const authMiddleware = require("../middlware/authMiddleware");
const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");



router.post("/add", authMiddleware, asyncHandler(async (req, res) => {
        const { title, content } = req.body;
        if(typeof title !== "string" || typeof content !== "string" || !title.trim() || !content.trim()){
            return res.status(400).json({message: "Please enter valid title or content"});
        }
        const post = new Post({
            title: title,
            content: content,
            user: req.user.id
        });
        await post.save();

        res.status(201).json(post);
}));

router.get("/get", authMiddleware, asyncHandler(async (req, res) => {
        const data = await Post.find().populate("user", "name email");
        res.status(200).json(data);
}));

router.get("/user", authMiddleware , asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const data = await Post.find({user:userId}).populate("user", "name email");

        res.status(200).json(data);
}));

router.get("/:id", authMiddleware, asyncHandler(async (req, res) => {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid Post ID" });
    }

    const post = await Post.findById(postId).populate("user", "name email");

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
}));

router.put("/:id", authMiddleware, asyncHandler(async (req, res) => {
        const postId = req.params.id;
        const {title, content} = req.body;
        if (
            typeof title !== "string" ||
            typeof content !== "string" ||
            !title.trim() ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: "Please enter valid title or content"
            });
        }
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid Post ID"
            });
        }
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }


        if (post.user.toString() !== req.user.id) {
                return res.status(403).json({
                    message: "You cannot update this post"
            });
        }
        

     const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            title: req.body.title,
            content: req.body.content
        },
        { returnDocument: "after", runValidators: true }
    );

         res.status(200).json(updatedPost);
}));


router.patch("/:id", authMiddleware, asyncHandler(async (req, res) => {
        const postId = req.params.id;
        const {title, content} = req.body;
        if (title === undefined && content === undefined) {
            return res.status(400).json({
                message: "Please provide at least one field to update"
            });
        }
        if (
            (title !== undefined &&
                (typeof title !== "string" || !title.trim())) ||
            (content !== undefined &&
                (typeof content !== "string" || !content.trim()))
        ) {
            return res.status(400).json({
                message: "Please provide valid title or content"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid Post ID"
            });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.user.toString() !== req.user.id) {
                return res.status(403).json({
                    message: "You cannot update this post"
            });
        }

        const updateData = {};

        if (title !== undefined) {
            updateData.title = title.trim();
        }

        if (content !== undefined) {
            updateData.content = content.trim();
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            updateData,
            { returnDocument: "after", runValidators: true }
        );

        return res.status(200).json(updatedPost);

}));

router.delete("/:id", authMiddleware, asyncHandler(async (req, res) => {
        const postId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid Post ID"
            });
        }
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message: "Post not Found"
            });
        }

        if(req.user.id !== post.user.toString()){
            return res.status(403).json({
                message: "You cannot Delete this post"
            });
        }

        const deletedPost = await Post.findByIdAndDelete(postId);

        res.status(200).json(deletedPost);
}));

router.get("/error-test", (req, res, next) => {
    const err = new Error("Something went Wrong");
    next(err);
});

router.get("/not-found", (req, res, next) => {
    const err = new Error("Post not found");
    err.status = 404;

    next(err);
});

module.exports = router;
