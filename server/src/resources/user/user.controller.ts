import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import HttpException from '@/utils/exceptions/http.execption';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private userService = new UserService();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(`${this.path}/login`, validationMiddleware(validate.login), this.login)
        this.router.get(`${this.path}`, authenticated, this.getUser)
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password, name } = req.body;
            const {accessToken, user} = await this.userService.register( name, email, password);
            res.status(201).json({
                status: 'success',
                token: accessToken,
                user,
            })
        } catch (error: any) {
            next(new HttpException(error.message, 400));
        }
    }

    private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, password } = req.body

            const token = await this.userService.login(email, password)
            res.status(200).json({
                status: 'success',
                token,
            })
        } catch (error: any) {
            next(new HttpException(error.message, 400));
        }
    }

    private getUser = (req: Request, res: Response, next: NextFunction): Response | void => {
    if (!req.user) {
        next(new HttpException('No logged in User', 404))
    }

    res.status(200).json({
        data: 'success',
        user: req.user
    })
}
}

export default UserController;
