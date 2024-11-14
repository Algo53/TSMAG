"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetails = exports.getUserDetails = void 0;
const User_1 = __importDefault(require("../lib/models/User"));
const bcryptHelper_1 = require("../helpers/bcryptHelper");
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userDetails = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId).select("-password");
        return res.status(200).json({ success: true, user: userDetails });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.getUserDetails = getUserDetails;
const updateUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const { name, email, currentPassword, newPassword, avatar } = req.body;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "No user found" });
        }
        if (user.email !== email) {
            const exitUser = yield User_1.default.findOne({ email: req.body.email });
            if (exitUser) {
                return res.status(400).json({ success: false, message: "User all ready exist" });
            }
        }
        if (currentPassword !== null) {
            const isValidPassword = yield (0, bcryptHelper_1.comparePassword)(currentPassword, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ success: false, message: "Invalid Password!" });
            }
            const hashNewPass = yield (0, bcryptHelper_1.hashPassword)(newPassword);
            const userUpdated = yield User_1.default.findByIdAndUpdate(userId, {
                name: name,
                email: email,
                password: hashNewPass,
                avatar: avatar
            }, { new: true });
            return res.status(200).json({ success: true, user: userUpdated });
        }
        else {
            const userUpdated = yield User_1.default.findByIdAndUpdate(userId, {
                name: name,
                email: email,
                avatar: avatar
            }, { new: true });
            return res.status(200).json({ success: true, user: userUpdated });
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.updateUserDetails = updateUserDetails;
