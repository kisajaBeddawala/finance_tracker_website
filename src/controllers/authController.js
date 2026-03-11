import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (body) => {
    try {
        await connectDB();

        const { username, email, password } = body;

        if (!username || !email || !password) {
            return {
                status: 400,
                message: "All fields are required"
            }
        }

        const user = await User.findOne({ email });
        if (user) {
            return {
                status: 400,
                message: "Email already exists"
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return{
            status: 201,
            message: "User created successfully"
        }
    } catch (error) {
        console.error("Signup error:", error);
        return {
            status: 500,
            message: "Server error"
        }
    }
};

export const login = async (body) => {
    try{
        await connectDB();

        const { email, password } = body;

        if(!email || !password){
            return {
                status: 400,
                message: "Email and password are required"
            }
        }

        const user = await User.findOne({ email });
        if(!user){
            return {
                status: 400,
                message: "Invalid credentials"
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return {
                status: 400,
                message: "Invalid credentials"
            }
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return {
            status: 200,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        };

    } catch (error) {
        console.error("Login error:", error);
        return {
            status: 500,
            message: "Server error"
        };
    }
}