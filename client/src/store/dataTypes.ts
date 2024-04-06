// types.ts

export interface Item {
    id: string;
    itemname: string;
    condition: string;
    price: number;
    sold: boolean;
    description: string;
    image: string;
    createdAt:Date;
    quantity:number;
    ownerId:string;
    city:string;
}
export interface User{
    username:string;
    token:string;
}