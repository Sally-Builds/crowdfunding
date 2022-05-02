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
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const user_validation_1 = __importDefault(require("@/resources/user/user.validation"));
const http_execption_1 = __importDefault(require("@/utils/exceptions/http.execption"));
const user_service_1 = __importDefault(require("@/resources/user/user.service"));
const authenticated_middleware_1 = __importDefault(require("@/middleware/authenticated.middleware"));
class UserController {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.userService = new user_service_1.default();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name } = req.body;
                const token = yield this.userService.register(name, email, password);
                res.status(201).json({
                    status: 'success',
                    token,
                });
            }
            catch (error) {
                next(new http_execption_1.default(error.message, 400));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.userService.login(email, password);
                res.status(200).json({
                    status: 'success',
                    token,
                });
            }
            catch (error) {
                next(new http_execption_1.default(error.message, 400));
            }
        });
        this.getUser = (req, res, next) => {
            if (!req.user) {
                next(new http_execption_1.default('No logged in User', 404));
            }
            res.status(200).json({
                data: 'success',
                user: req.user
            });
        };
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.default.register), this.register);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(user_validation_1.default.login), this.login);
        this.router.get(`${this.path}`, authenticated_middleware_1.default, this.getUser);
    }
}
exports.default = UserController;
