export class userEntity {
    id: string;
    name: string;
    email: string;
    createdAt: Date;

    constructor(partial: Partial<userEntity>){
        Object.assign(this, partial)
    }
}

