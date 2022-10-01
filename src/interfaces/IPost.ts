import { IComment } from "./IComment";
import { IMedia } from "./IMedia";

export interface IPost {
    id: string,
    photo: string,
    shortcode?: string,
    medias: IMedia[],
    likes?: {
        count: number | undefined,
        formated: string | number | undefined
    },
    text?: string,
    comments?: {
        count: { count: number, formated: string },
        edges: IComment[]
    }
}