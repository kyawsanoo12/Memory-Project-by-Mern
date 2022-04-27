import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignIn = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User does't exist! Please let sign up" });

        const pwd = await bcrypt.compare(password, existingUser.password);

        if (!pwd) {
            return res.status(400).json({message:"Invaild Credential"})
        }

        const token = await jwt.sign({ email: existingUser.email, id: existingUser._id }, "secret", { expiresIn: "1h" });

        return res.status(200).json({ result: existingUser, token });

    } catch (err) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
}

export const SingUp = async (req, res) => {
    const { firstName, lastName, password, confrimPassword,email } = req.body;
    try {
        const existingUser = await User.findOne({ email });
         if (existingUser) return res.status(400).json({ message: "User already exist" });
        if (password !== confrimPassword) {
            return res.status(400).json({ message: "Password does't match" })
        }
        const hashedPwd = await bcrypt.hash(password, 10);

        const result = await User.create({ email, password: hashedPwd, name: `${firstName} ${lastName}` });
        
         const token = await jwt.sign({ email: result.email, id: result._id }, "secret", { expiresIn: "1h" });

        return res.status(201).json({ result, token });
         
    } catch (err) {
         return res.status(500).json({ message: "Something went wrong!" ,err:err});
    }
}