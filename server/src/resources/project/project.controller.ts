import { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import role from '@/middleware/role.middleware';
import validate from '@/resources/project/project.validation';
import HttpException from '@/utils/exceptions/http.execption';
import Controller from '@/utils/interfaces/controller.interface';
import ProjectService from '@/resources/project/project.service';
import authenticated from '@/middleware/authenticated.middleware';
import DonationController from '@/resources/donation/donation.controller';

class ProjectController implements Controller {
    private ProjectService = new ProjectService();
    public router = Router();
    public path = '/projects';
    public DonationController = new DonationController().router;

    constructor() {
        this.initializeRouter();
    }

    public initializeRouter(): void {
        this.router.use(
            `${this.path}/:projectId/donations`, this.DonationController);

        this.router
            .route(`${this.path}`)
            .post(
                authenticated,
                role('admin'),
                validationMiddleware(validate.create),
                this.createProject
            )
            .get(this.getAllProjects);

        this.router
            .route(`${this.path}/:id`)
            .get(this.getProject)
            .patch(
                authenticated,
                role('admin'),
                validationMiddleware(validate.update),
                this.updateProject
            );
    }

    private createProject = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, expectedAmount } = req.body;
            const project = await this.ProjectService.create(
                name,
                expectedAmount
            );
            return res.status(201).json({
                status: 'success',
                project,
            });
        } catch (error: any) {
            next(new HttpException(error.message, 400));
        }
    };

    private getAllProjects = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const projects = await (this as any).ProjectService.getAll();
            res.status(200).json({
                status: 'success',
                length: projects.length,
                projects,
            });
        } catch (error: any) {
            next(new HttpException(error.message, 400));
        }
    };

    private getProject = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const project = await this.ProjectService.get(id);
            res.status(200).json({
                status: 'success',
                project,
            });
        } catch (error: any) {
            next(new HttpException(error.message, 400));
        }
    };

    private updateProject = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const { name, expectedAmount, consensusStatus } = req.body;
            const project = await this.ProjectService.update(
                id,
                name,
                expectedAmount,
                consensusStatus
            );
            res.status(200).json({
                status: 'success',
                project,
            });
        } catch (error: any) {
            next(new HttpException(error.message, 400));
        }
    };
}

export default ProjectController;
