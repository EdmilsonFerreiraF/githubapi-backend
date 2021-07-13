"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../UserController"));
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/login/callback", UserController_1.default.loginCallback);
exports.userRouter.get("/login/auth", UserController_1.default.loginAuth);
exports.userRouter.get("/login/details", UserController_1.default.loginDetails);
