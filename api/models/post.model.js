import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    userId :{
        type: String,
        required:true,
    },
    title : {
        type:String,
        required : true,
        unique : true
    },
    content : {
        type : String,
        required : true
    },
    image : {
        type: String,
        default : 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png'
    },
    category : {
        type: String,
        default : "Uncategorized"
    },
    slug : {
        type : String,
        required : true,
        unique : true
    }

},{timestamps:true});

const Post =  mongoose.model('Post',postSchema);
export default Post;