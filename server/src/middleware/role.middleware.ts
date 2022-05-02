import {Request, Response, NextFunction} from 'express'
import HttpException from '@/utils/exceptions/http.execption'
import UserModel from '@/resources/user/user.model'

function restrictTo (role:string) {
    return (req:Request, res:Response, next:NextFunction) => {
        if(req.user.role !== role) {
            return next(new HttpException('You do not have permission to perform this action', 403))
        }
        next()
    }
}

export default restrictTo