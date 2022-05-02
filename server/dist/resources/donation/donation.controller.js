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
const http_execption_1 = __importDefault(require("@/utils/exceptions/http.execption"));
const donation_service_1 = __importDefault(require("@/resources/donation/donation.service"));
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const donation_validation_1 = __importDefault(require("@/resources/donation/donation.validation"));
const authenticated_middleware_1 = __importDefault(require("@/middleware/authenticated.middleware"));
class DonationController {
    constructor() {
        this.path = '/donations';
        this.router = (0, express_1.Router)();
        this.DonationService = new donation_service_1.default();
        this.createDonation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.user = req.user.id;
                const { user, project, amount } = req.body;
                const donation = yield this.DonationService.create(amount, user, project);
                res.status(201).json({
                    status: 'success',
                    donation,
                });
            }
            catch (error) {
                next(new http_execption_1.default(error.message, 400));
            }
        });
        this.initializeRouter();
    }
    initializeRouter() {
        this.router.route(`${this.path}`).post(authenticated_middleware_1.default, (0, validation_middleware_1.default)(donation_validation_1.default.create), this.createDonation);
    }
}
exports.default = DonationController;
