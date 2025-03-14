export type Post = {
    id: string;
    content: string;
    image?: string;
    likes: number;
    profile: User;
};

export type User = {
    name: string;
    id: string;
    position: string;
    image?: string; //The ? character is for optional type
    backimage?: string; //The ? character is for optional type
    about?: string;
    experience?: Experience[]; //The ? character is for optional type
};

export type Experience = {
    id: string;
    title: string;
    companyname: string;
    companyimage?: string;
};
