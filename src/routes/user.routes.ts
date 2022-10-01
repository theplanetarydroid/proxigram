import { Router, Request, Response } from 'express';
import { InstagramController } from '../controllers/instagram.controller';
import { validUsernameMiddleware } from '../middlewares/user.middleware';
import { InstastoriesService } from '../services/instastories.services';

const router = Router();

const instaStoriesController = new InstagramController(
    new InstastoriesService()
)


router.get('/:username', [validUsernameMiddleware], (req: Request, res: Response) => instaStoriesController.renderProfile(req, res));
router.get('/:username/stories', [validUsernameMiddleware], (req: Request, res: Response) => instaStoriesController.renderStories(req, res));
router.get('/:username/:index', [validUsernameMiddleware], (req: Request, res: Response) => instaStoriesController.renderPost(req, res));

export default router;
