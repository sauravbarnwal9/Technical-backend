import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export default class AuthController {
    static async register(payload) {
        try {
            const { name, email, password } = payload;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already registered');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            const savedUser = await newUser.save();

            const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            });

            return { user: savedUser, token };
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async login(payload) {
        try {
            const { email, password } = payload;

            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Invalid credentials');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            });

            return { user, token };
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
