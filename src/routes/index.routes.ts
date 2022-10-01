import { Router, Response, Request } from 'express';
import { redirectMiddleware } from '../middlewares/redirect.middleware';

const router = Router();

router.get('/', (_, res) => res.render('home'));

router.get('/redirect', [redirectMiddleware], (req: Request, res: Response) => {
    const { term, type } = req.query;
    switch (type) {
        case "profile":
            res.redirect(`/@/${term}`)
            break;
    }
})

router.get('/feed', (_, res) => res.render('feed'))
export default router;