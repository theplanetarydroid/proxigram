import { IMedia } from './IMedia';

export interface InstaStoriesResponse {
  profileInfo: {
    id: number,
    username: string,
    avatar: string,
    isPrivate: boolean,
    name: string,
    bio: string,
    website: string,
    publication: number,
    subscriber: number,
    subscription: number,
  };
  stories?: IMedia[];
  highlights?: { id: string; name: string; icon: string }[];
  publication: {
    items: {
      id: string,
      photo: string,
      medias: IMedia[],
      likes?: number,
      text?: string,
    }[];
    nextMaxId: string;
  };
  igtv?: { items: any[]; nextMaxId: any };
}