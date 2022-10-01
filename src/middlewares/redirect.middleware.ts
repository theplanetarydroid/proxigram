import { NextFunction, Response, Request } from "express";
import config from "../config";

export function redirectMiddleware(req: Request, res: Response, next: NextFunction) {

    const { term, type } = req.query

    if (!term || !type) {
        return res.json({
            msg: 'You should send the term and the type on the query'
        })
    }

    const t = (term as string).trim()

    if (config.globals.username_regex.test(t) == false) {
        return res.json({
            msg: 'Invalid username'
        })
    }


    if (t.includes('@')) {
        req.query.term = t.slice(1)
    }


    return next()
}