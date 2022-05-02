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
const mongoose_1 = require("mongoose");
const project_model_1 = __importDefault(require("@/resources/project/project.model"));
const donationSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    vetoStatus: {
        type: Boolean,
        default: false,
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
donationSchema.statics.aggreateDonations = function (projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = yield this.aggregate([
            {
                $match: {
                    project: projectId,
                },
            },
            {
                $group: {
                    _id: 'total',
                    amount: { $sum: '$amount' }
                }
            }
        ]);
        if (stats.length > 0) {
            yield project_model_1.default.findByIdAndUpdate(projectId, {
                totalAmount: stats[0].amount
            });
        }
        else {
            yield project_model_1.default.findByIdAndUpdate(projectId, {
                totalAmount: 0
            });
        }
    });
};
donationSchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.constructor.aggreateDonations(this.project);
    });
});
donationSchema.pre(/^findOneAnd/, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.r = yield this.findOne();
        next();
    });
});
donationSchema.post(/^findOneAnd/, (docs) => __awaiter(void 0, void 0, void 0, function* () {
    if (docs)
        yield docs.constructor.aggreateDonations(docs.project);
}));
exports.default = (0, mongoose_1.model)('Donation', donationSchema);
