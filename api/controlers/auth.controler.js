import User from '../models/user.model.js';
import bcryptjs from 'bcrypt';
import { errorhandler } from '../utils/error.js';


const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    // if (!username || !email || !password || username === '' || password === '' || email === '') {
    //     next(errorhandler(400,"Please fill all the fields"))
    // };

    const hashedpassword = bcryptjs.hashSync(password,10)
    const newUser = new User({
        username,
        email,
        password:hashedpassword
    })
    try {
        await newUser.save();
        res.send("Signup success")
    }
    catch (error) {
        next(error)
    }
}


export default signup;