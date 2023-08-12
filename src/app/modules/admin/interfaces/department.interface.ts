import { FeeForDuration } from "./fees.interface";


export interface department {
    _id:string;
    departmentName: string;
    description: string;
    HOD: string;
    duration: number;
    fees: FeeForDuration[]
    professors: any[]
}



