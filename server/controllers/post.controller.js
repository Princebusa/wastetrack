import Post from "../models/post.model.js";
import fileUpload from '../config/imageKit.config.js'



// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { description, isAnonymous } = req.body;
    const file = req.file;
    
    let imageUrl = null;
    if (file) {
      const uploadResult = await fileUpload(
        file.buffer,
        `${Date.now()}_postImage`
      );
      imageUrl = uploadResult.url;
    }

    const postData = {
      description,
      isAnonymous: isAnonymous === 'true' || isAnonymous === true,
    };

    // Only add user if not anonymous
    if (!postData.isAnonymous && req.user) {
      postData.user = req.user.id;
    }

    // Add image URL if provided
    if (imageUrl) {
      postData.imageUrl = imageUrl;
    }

    const post = await Post.create(postData);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

// READ ALL
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username email")
      .populate("comments.user", "username email")
      .populate("upvotes", "username")
      .populate("downvotes", "username")
      .sort({ createdAt: -1 });

    // Transform posts to include vote counts and user voting status
    const transformedPosts = posts.map(post => {
      const postObj = post.toObject();
      postObj.upvoteCount = post.upvotes.length;
      postObj.downvoteCount = post.downvotes.length;
      postObj.score = post.upvotes.length - post.downvotes.length;
      
      // Check if current user has voted (if authenticated)
      if (req.user) {
        postObj.userUpvoted = post.upvotes.some(vote => vote._id.toString() === req.user.id);
        postObj.userDownvoted = post.downvotes.some(vote => vote._id.toString() === req.user.id);
      } else {
        postObj.userUpvoted = false;
        postObj.userDownvoted = false;
      }
      
      // Remove user details for anonymous posts
      if (post.isAnonymous) {
        postObj.user = null;
      }
      
      return postObj;
    });

    res.json({success: true, data: transformedPosts});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
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

// VOTE ON POST
export const votePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { voteType } = req.body; // 'upvote' or 'downvote'
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({success: false, message: "Post not found"});

    // Remove user from both vote arrays first
    post.upvotes = post.upvotes.filter(vote => vote.toString() !== userId);
    post.downvotes = post.downvotes.filter(vote => vote.toString() !== userId);

    // Add to appropriate vote array
    if (voteType === 'upvote') {
      post.upvotes.push(userId);
    } else if (voteType === 'downvote') {
      post.downvotes.push(userId);
    }

    await post.save();

    res.json({
      success: true,
      message: `Post ${voteType}d successfully`,
      data: {
        upvoteCount: post.upvotes.length,
        downvoteCount: post.downvotes.length,
        score: post.upvotes.length - post.downvotes.length
      }
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

// REMOVE VOTE FROM POST
export const removeVote = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({success: false, message: "Post not found"});

    // Remove user from both vote arrays
    post.upvotes = post.upvotes.filter(vote => vote.toString() !== userId);
    post.downvotes = post.downvotes.filter(vote => vote.toString() !== userId);

    await post.save();

    res.json({
      success: true,
      message: "Vote removed successfully",
      data: {
        upvoteCount: post.upvotes.length,
        downvoteCount: post.downvotes.length,
        score: post.upvotes.length - post.downvotes.length
      }
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({success: false, message: "Post not found"});

    const comment = {
      user: req.user.id,
      text,
    };

    post.comments.push(comment);
    await post.save();

    await post.populate("comments.user", "username email");

    res.status(201).json({success: true, message: "Comment added successfully"});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
