import { IPost } from '../interfaces/IPost';
import { IMedia } from '../interfaces/IMedia';
import { IProfile } from '../interfaces/IProfile';
import { IGetPosts, IGetProfile, IGetStories } from '../interfaces/IRepository';
import instastoriesApi from '../api/instastories.api';
import { formatter as format } from '../lib/formatter';

const formatter = format('en')

export class InstastoriesService implements IGetProfile, IGetPosts, IGetStories {
    async getProfile(username: string): Promise<IProfile> {
        const { profileInfo } = await instastoriesApi.getProfileContent(username);
        return {
            ...profileInfo,
            publication: {
                count: profileInfo.publication,
                formated: formatter.format(profileInfo.publication),
            },
            subscriber: {
                count: profileInfo.subscriber,
                formated: formatter.format(profileInfo.subscriber),
            },
            subscription: {
                count: profileInfo.subscription,
                formated: formatter.format(profileInfo.subscription),
            },
        };
    }

    async getPosts(username: string): Promise<IPost[] | undefined> {
        const { publication } = await instastoriesApi.getProfileContent(username);

        if (!publication) {
            return;
        }

        const posts: IPost[] = [];
        publication.items.forEach((post) => {
            const medias: IMedia[] = post.medias
                .map((story) => ({
                    id: story.id,
                    url: story.url,
                    originalUrl: story.originalUrl,
                    type: story.type,
                }))
                .filter((media) => media.type !== 'ads');
            posts.push({
                ...post,
                likes: {
                    count: post.likes,
                    formated: post.likes ? formatter.format(post.likes) : post.likes,
                },
                medias,
            });
        });
        return posts;
    }

    async getStories(username: string): Promise<IMedia[] | undefined> {
        const { stories } = await instastoriesApi.getProfileContent(username);

        if (!stories) {
            return;
        }

        return stories.filter((story) => story.type !== 'ads');
    }
}
