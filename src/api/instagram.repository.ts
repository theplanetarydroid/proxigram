import { IMedia } from '../interfaces/IMedia';
import { IPost } from '../interfaces/IPost';
import { IProfile } from '../interfaces/IProfile';
import { IRepository } from '../interfaces/IRepository';

export class InstagramRepository implements IRepository {
    constructor(private api: IRepository) { }
    async getProfile(username: string): Promise<IProfile> {
        return await this.api.getProfile(username);
    }
    async getPosts(username: string): Promise<IPost[] | undefined> {
        return await this.api.getPosts(username);
    }
    async getStories(username: string): Promise<IMedia[] | undefined> {
        if (this.api.getStories) {
            return await this.api.getStories(username);
        }
        return;
    }
    async getPost(shortcode: string): Promise<IPost | undefined> {
        if (this.api.getPost) {
            return await this.api.getPost(shortcode)
        }

        return;
    }
}
