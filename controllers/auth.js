import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// register user function
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath
    } = req.body;

    // encripting our password to store on db
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hashSync(password, salt);

    // create user on User collection
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath
    });

    // save user on db
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// log in user function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // check if password is correct.
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Wrong password' });
    
    // jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    delete user.password; // to not send password to client
    res.status(200).json({ user, token });
  }
   catch (error) {
    res.status(500).json({ error: err.message });
  }
}