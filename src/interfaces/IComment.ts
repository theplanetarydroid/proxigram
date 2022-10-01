export interface IComment {
    id: string,
    text: string,
    ownner: {
        id: string,
        isVerified: boolean,
        pic: string,
        username: string
    },
    responses?: IComment[],
    likes: {
        count: number,
        formated: string
    },
    createdAt: number

}