import { errorhandler } from "../utils/error.js"
import Post from '../models/post.model.js';

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorhandler('401', "Sorry you can't create a post"))
    };
    if (!req.body.title || !req.body.content) {
        return next(errorhandler(400, 'Please fill all the fields'))
    };
    const slug = req.body.title.split('').join('-').toLowerCase().replace(/[^a-zA-z0-9-]/g, '-');

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    });
    try {
        const savedpost = await newPost.save();
        res.status(201).json(savedpost);
    } catch (error) {

    }

}

// export const getposts = async (req, res, next) => {
//     console.log("inside");
//     try {
//         const startIndex = parseInt(req.query.startIndex) || 0;
//         const limit = parseInt(req.query.limit) || 9;
//         const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1;
//         const posts = await Post.find(
//             ...(req.query.userID && { userID: req.query.userID }), // if we want to find basis of a userid
//             ...(req.query.category && { category: req.query.category }),
//             ...(req.query.slug && { slug: req.query.slug }),
//             ...(req.query.postID && { _id: req.query.postID }),
//             // finding basis on a search term
//             ...(req.query.searchTerm && {
//                 $or: [
//                     { title: { $regex: req.query.searchTerm, $options: 'i' } },
//                     { content: { $regex: req.query.searchTerm, $options: 'i' } }
//                 ]
//             })
//         ).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit);
//         const totalPosts = await Post.countDocuments();
//         const now = new Date();
//         const oneMonthAgo = new Date(
//             now.getFullYear(),
//             now.getMonth()-1,
//             now.getDate()
//         );
//         const lastMonthPosts = await Post.countDocuments({
//             createdAt: {$gte:oneMonthAgo}
//         });
//         console.log("posts---",posts)
//         res.status(200).json(posts,totalPosts,lastMonthPosts)
//     }
//              catch (error) {
//             next(error)
//     }
// }

export const getposts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1;
        
        const query = {};
        
        if (req.query.userID) query.userID = req.query.userID;
        if (req.query.category) query.category = req.query.category;
        if (req.query.slug) query.slug = req.query.slug;
        if (req.query.postID) query._id = req.query.postID;
        if (req.query.searchTerm) {
            query.$or = [
                { title: { $regex: req.query.searchTerm, $options: 'i' } },
                { content: { $regex: req.query.searchTerm, $options: 'i' } }
            ];
        }
        
        const posts = await Post.find(query)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);
        
        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });
        
        res.status(200).json({ posts, totalPosts, lastMonthPosts });
    } catch (error) {
        next(error);
    }
};

export const deletepost = async (req, res, next) => {
    console.log(req.user.isAdmin)
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorhandler(403, 'You are not allowed to delete this post'));
    }
    try {
      await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json('The post has been deleted');
    } catch (error) {
      next(error);
    }
  };

  export const updatepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorhandler(403, 'You are not allowed to update this post'));
    }
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: req.body.image,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  };