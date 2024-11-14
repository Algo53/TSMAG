import { Request, Response } from "express";
import User from "../lib/models/User";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper";

export const getUserDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const userDetails = await User.findById((req as any).user?.userId).select("-password");
        return res.status(200).json({ success: true, user: userDetails });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateUserDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = (req as any).user?.userId;
        const { name, email, currentPassword, newPassword, avatar } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "No user found" })
        }

        if (user.email !== email) {
            const exitUser = await User.findOne({ email: req.body.email });
            if (exitUser) {
                return res.status(400).json({ success: false, message: "User all ready exist" })
            }
        }

        if (currentPassword !== null) {
            const isValidPassword = await comparePassword(currentPassword, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ success: false, message: "Invalid Password!" })
            }

            const hashNewPass = await hashPassword(newPassword);

            const userUpdated = await User.findByIdAndUpdate(
                userId,
                {
                    name: name,
                    email: email,
                    password: hashNewPass,
                    avatar: avatar
                },
                { new: true }
            );
            return res.status(200).json({ success: true, user: userUpdated });
        }
        else {
            const userUpdated = await User.findByIdAndUpdate(
                userId,
                {
                    name: name,
                    email: email,
                    avatar: avatar
                },
                { new: true }
            )
            return res.status(200).json({ success: true, user: userUpdated });
        }
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}