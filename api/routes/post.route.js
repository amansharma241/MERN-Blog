import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts } from '../controlers/post.controler.js';

const router = express.Router();

router.post('/create-post',verifyToken,create);
router.get('/getposts',getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)

export default router;