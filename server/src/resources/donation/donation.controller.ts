import {Router, Request, Response, NextFunction} from 'express'
import Controller from '@/utils/interfaces/controller.interface'
import HttpException from '@/utils/exceptions/http.execption'
import DonationService from '@/resources/donation/donation.service'
import validationMiddleware from '@/middleware/validation.middleware'
import validate from '@/resources/donation/donation.validation'
import authenticated from '@/middleware/authenticated.middleware'

class DonationController implements Controller {
    public path = '/donations'
    public router = Router()
    private DonationService = new DonationService()

    constructor () {
        this.initializeRouter()
    }

    private initializeRouter () {
        this.router.route(`${this.path}`).post(authenticated, validationMiddleware(validate.create),this.createDonation)
    }

    private createDonation = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            req.body.user = req.user.id
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