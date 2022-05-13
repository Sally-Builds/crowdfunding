import express, {Router, Request, Response, NextFunction} from 'express'
import Controller from '@/utils/interfaces/controller.interface'
import HttpException from '@/utils/exceptions/http.execption'
import DonationService from '@/resources/donation/donation.service'
import validationMiddleware from '@/middleware/validation.middleware'
import validate from '@/resources/donation/donation.validation'
import authenticated from '@/middleware/authenticated.middleware'

class DonationController implements Controller{
    public path = '/donations'
    public router = Router({mergeParams: true})
    public DonationService = new DonationService()
    public app = express()

    constructor () {
        this.initializeRouter()
    }

    public initializeRouter = (): void =>  {
        this.router.route(`/`).post(authenticated, validationMiddleware(validate.create),this.createDonation)

        this.app.use(`${this.path}`, this.router)
    }

    public createDonation = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            req.body.user = req.user.id
            req.body.project = req.params.projectId
            const {user, project, amount} = req.body
        const donation = await this.DonationService.create(amount, user, project)
        res.status(201).json({
            status: 'success',
            donation,
        })
        } catch (error:any) {
            next(new HttpException(error.message, 400))
        }
    }
}

export default DonationController