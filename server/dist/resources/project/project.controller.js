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
const role_middleware_1 = __importDefault(require("@/middleware/role.middleware"));
const project_validation_1 = __importDefault(require("@/resources/project/project.validation"));
const http_execption_1 = __importDefault(require("@/utils/exceptions/http.execption"));
const project_service_1 = __importDefault(require("@/resources/project/project.service"));
const authenticated_middleware_1 = __importDefault(require("@/middleware/authenticated.middleware"));
class ProjectController {
    constructor() {
        this.ProjectService = new project_service_1.default();
        this.router = (0, express_1.Router)();
        this.path = '/projects';
        this.createProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, expectedAmount } = req.body;
                const project = yield this.ProjectService.create(name, expectedAmount);
                return res.status(201).json({
                    status: 'success',
                    project,
                });
            }
            catch (error) {
                next(new http_execption_1.default(error.message, 400));
            }
        });
        this.getAllProjects = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield this.ProjectService.getAll();
                res.status(200).json({
                    status: 'success',
                    length: projects.length,
                    projects,
                });
            }
            catch (error) {
                next(new http_execption_1.default(error.message, 400));
            }
        });
        this.getProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield this.ProjectService.get(id);
                res.status(200).json({
                    status: 'success',
                    project,
                });
            }
            catch (error) {
                next(new http_execption_1.default(error.message, 400));
            }
        });
        this.updateProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, expectedAmount, consensusStatus } = req.body;
                const project = yield this.ProjectService.update(id, name, expectedAmount, consensusStatus);
                res.status(200).json({
                    status: 'success',
                    project,
                });
            }
            catch (error) {
                next(new http_execption_1.default(error.message, 400));
            }
        });
        this.initializeRouter();
    }
    initializeRouter() {
        this.router
            .route(`${this.path}`)
            .post(authenticated_middleware_1.default, (0, role_middleware_1.default)('admin'), (0, validation_middleware_1.default)(project_validation_1.default.create), this.createProject)
            .get(this.getAllProjects);
        this.router
            .route(`${this.path}/:id`)
            .get(this.getProject)
            .patch(authenticated_middleware_1.default, (0, role_middleware_1.default)('admin'), (0, validation_middleware_1.default)(project_validation_1.default.update), this.updateProject);
    }
}
exports.default = ProjectController;
