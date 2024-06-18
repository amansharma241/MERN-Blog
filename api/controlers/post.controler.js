import { errorhandler } from "../utils/error.js"
import Post from '../models/post.model.js';

export const create = async (req,res,next) => {
    if(!req.user.isAdmin){
        return next(errorhandler('401',"Sorry you can't create a post"))
    };
    if(!req.body.title || !req.body.content){
        return next(errorhandler(400,'Please fill all the fields'))
    };
    const slug = req.body.title.split('').join('-').toLowerCase().replace(/[^a-zA-z0-9-]/g,'-');

    const newPost = new Post({
        ...req.body,
        slug,
        userId : req.user.id
    });
    try {
        const savedpost = await newPost.save();
        res.status(201).json(savedpost);
    } catch (error) {
        
    }

}