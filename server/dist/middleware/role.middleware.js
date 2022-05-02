"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_execption_1 = __importDefault(require("@/utils/exceptions/http.execption"));
function restrictTo(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return next(new http_execption_1.default('You do not have permission to perform this action', 403));
        }
        next();
    };
}
exports.default = restrictTo;
