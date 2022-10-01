import { IMedia } from './IMedia';
import { IPost } from './IPost';
import { IProfile } from './IProfile';

export interface IRepository {
    getProfile(username: string): Promise<IProfile>;
    getPosts(username: string): Promise<IPost[] | undefined>;
    getStories?(username: string): Promise<IMedia[] | undefined>;
    getPost?(shortcode: string): Promise<IPost | undefined>
}

export interface IGetProfile {
    getProfile(username: string): Promise<IProfile>;
}

export interface IGetPosts {
    getPosts(username: string): Promise<IPost[] | undefined>;
}

export interface IGetPost {
    getPost(shortcode: string): Promise<IPost | undefined>
}

export interface IGetStories {
    getStories(username: string): Promise<IMedia[] | undefined>;
}