import User from '../models/user.model.js';
import bcryptjs from 'bcrypt';
import { errorhandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || password === '' || email === '') {
        next(errorhandler(400, "Please fill all the fields"))
    };

    const hashedpassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedpassword
    })
    try {
        await newUser.save();
        res.send({ message: "Signup success" })
    }
    catch (error) {
        next(error)
    }
}
export default signup

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!password || !email || email === '' | password === '') {
        next(errorhandler(400, "Please fill all the fields"));
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            next(errorhandler(404, "User not found"))
        };
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            next(errorhandler(400, "Invalid password"))
        };
        const token = jwt.sign({ id: validUser._id }, 'aman');
        res.status(200).cookie('access_token', token, { httpOnly: true }).json(validUser);
    } catch (error) {
        next(error)
    }
}


