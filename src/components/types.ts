export type Comment = {
    id: string;
    comment: string;
    replies: Array<string>;
};

export type Comments = Array<Comment>;
