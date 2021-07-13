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
exports.UserController = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const CustomError_1 = require("../errors/CustomError");
dotenv_1.default.config();
class UserController {
    loginAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
                res.setHeader("Content-Type", "application/json");
                const url = `https://github.com/login/oauth/authorize?client_id=${UserController.client_id}&redirect_uri=http://localhost:3000/login/callback`;
                res.redirect(url);
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
            ;
        });
    }
    ;
    loginCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.setHeader("Access-Control-Allow-Origin", "https://github.com");
                res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
                res.setHeader("Content-Type", "application/json");
                const { code } = req.query;
                const token = yield UserController.getAccessToken(code);
                res.send({ token });
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
            ;
        });
    }
    loginDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                console.log(body);
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
            ;
        });
    }
    ;
}
exports.UserController = UserController;
UserController.client_id = process.env.GITHUB_CLIENT_ID;
UserController.client_secret = process.env.GITHUB_CLIENT_SECRET;
UserController.getAccessToken = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        client_id: UserController.client_id,
        client_secret: UserController.client_secret,
        code
    };
    const res = yield axios_1.default.post("https://github.com/login/oauth/access_token", input, {
        headers: {
            accept: 'application/json',
            'Access-Control-Allow-Origin': 'https://github.com',
            "Access-Control-Allow-Headers": "X-Requested-With, content-type"
        }
    })
        .then((response) => {
        const data = response.data.access_token;
        return data;
    })
        .catch((error) => {
        throw new CustomError_1.CustomError(error.response.status, error.response.statusText);
    });
    return res;
});
exports.default = new UserController();
