import User from '../models/user.model.js';
import bcryptjs from 'bcrypt'

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || password === '' || email === '') {
        return res.status(400).json({ message: "Please fill all the fields" });
    };

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
        res.status(500).json({ message: error.message });
    }
}


export default signup;