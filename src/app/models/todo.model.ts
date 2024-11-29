import { ITodoType } from "../to-do-card/to-do-card.component";

export interface ITodo{
    id?: number;
    title:string;
    description: string;
    status :ITodoType;
    created_at?: string;
    updated_at?:string;
}