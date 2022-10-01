export interface IProfile {
    id: number,
    username: string,
    avatar: string,
    isPrivate: boolean,
    name: string,
    bio: string,
    website: string,
    publication: {
        count: number,
        formated: string
    },
    subscriber: {
        count: number,
        formated: string
    },
    subscription: {
        count: number,
        formated: string
    },
}

