import { IPost } from '../interfaces/IPost';
import { IRepository } from '../interfaces/IRepository';
import { Request, Response } from 'express';
import { InstagramRepository } from '../api/instagram.repository';

export class InstagramController {
  private _InstagramRepository: InstagramRepository

  constructor(Service: IRepository) {
    this._InstagramRepository = new InstagramRepository(
      Service
    );
  }

  async renderProfile(req: Request, res: Response) {
    try {
      const { username } = req.params;

      const [profileInfo, posts, stories] = await Promise.all([
        this._InstagramRepository.getProfile(username),
        this._InstagramRepository.getPosts(username),
        this._InstagramRepository.getStories(username),
      ])

      res.render('profile', {
        profileInfo,
        posts,
        stories: stories ? stories.length : 0
      });
    } catch (error: any) {
      res.status(error.response.status).json({
        msg: error.message
      })
    }
  }

  async renderStories(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const filtredStories = await this._InstagramRepository.getStories(username);

      res.render('stories', {
        stories: filtredStories,
        username,
      });
    } catch (error: any) {
      res.status(error.response.status).json({
        msg: error.message
      })
    }
  }

  async renderPost(req: Request, res: Response) {
    const { username, index } = req.params;
    let post: IPost | undefined

    try {
      const posts = await this._InstagramRepository.getPosts(username)
      if (!posts) {
        return res.status(404).json({
          msg: 'This profile does not have any posts'
        })
      }

      post = posts[Number(index)]

      if (!post || Number(index) > 18) {
        return res.status(400).json({
          msg: 'Try only the first 18'
        })
      }

      res.render('post', {
        post
      });

    } catch (error: any) {
      res.status(error.response.status).json({
        msg: error.message
      })
    }
  }
}
