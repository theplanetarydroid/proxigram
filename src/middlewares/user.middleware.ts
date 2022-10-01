import { NextFunction, Response, Request } from "express";
import config from "../config";

export function validUsernameMiddleware(req: Request, res: Response, next: NextFunction) {

    const { username } = req.params

    if (config.globals.username_regex.test(username) == false) {
        return res.json({
            msg: 'Invalid username'
        })
    }

    if (username.includes('@')) {
        req.params.username = username.slice(1)
    }

    return next()
}