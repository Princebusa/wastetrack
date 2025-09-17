import Post from "../models/post.model.js";
import fileUpload from '../config/imageKit.config.js'



// CREATE POST
export const createPost = async (req, res) => {

  try {
    const { description } = req.body;
    const file = req.file ;
    console.log(req.user.id);

    const imageUrl = await fileUpload(
      file.buffer,
      `${req.user.id}_postImage`
    );

    const post = await Post.create({
      user: req.user.id,
      imageUrl : imageUrl.url,
      description,
    });

    res.status(201).json({success :  true , message : "post is created "});
  } catch (error) {
    res.status(500).json({success :  false , message: error.message });
  }
};

// READ ALL
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username email")
      .populate("comments.user", "username email")
      .sort({ createdAt: -1 });

    res.json({success :  true , data : posts});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "username email")
      .populate("comments.user", "username email");

    if (!post) return res.status(404).json({ success :false , message: "Post not found" });

    res.json({success : true , data : post});
  } catch (error) {
    res.status(500).json({success :false , message: error.message });
  }
};

// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const { image, description } = req.body;

    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success :false , message: "Post not found" });

    if (post.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({success :false ,  message: "Unauthorized" });
    }

    post.image = image || post.image;
    post.description = description || post.description;

    await post.save();
    res.json({success :false , message : "post updated"});

  } catch (error) {
    res.status(500).json({success :false , message: error.message });
  }
};

// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({success :false , message: "Unauthorized" });
    }

    await post.deleteOne();
    res.json({success : true , message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({success :false ,  message: error.message });
  }
};

// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      user: req.user.id,
      text,
    };

    post.comments.push(comment);
    await post.save();

    await post.populate("comments.user", "username email");

    res.status(201).json({success :true , message : "comment added"});
  } catch (error) {
    res.status(500).json({success :false , message: error.message });
  }
};
