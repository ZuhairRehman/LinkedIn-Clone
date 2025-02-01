export type Post = {
    id: string;
    content: string;
    image?: string;
    likes: number;
    author: User;
};

export type User = {
    name: string;
    id: string;
    position: string;
    image?: string; //The ? character is for optional type
    backImage?: string; //The ? character is for optional type
    about: string;
};
