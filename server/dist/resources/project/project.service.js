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
const project_model_1 = __importDefault(require("./project.model"));
class ProjectService {
    constructor() {
        this.project = project_model_1.default;
    }
    /**
     * Create Project
     */
    create(name, expectedAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield this.project.create({ name, expectedAmount });
                return project;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * Get all Projects
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield this.project.find();
                return projects;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * Get Project
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield this.project
                    .findById(id)
                    .populate('donations');
                return project;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /**
     * Update Project
     */
    update(id, name, expectedAmount, consensusStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {};
                if (name) {
                    data.name = name;
                }
                if (expectedAmount) {
                    data.expectedAmount = expectedAmount;
                }
                if (consensusStatus) {
                    data.consensusStatus = consensusStatus;
                }
                const project = yield this.project.findByIdAndUpdate(id, data, {
                    new: true,
                    runValidators: true,
                });
                return project;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = ProjectService;
