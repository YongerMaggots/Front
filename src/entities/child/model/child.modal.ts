export enum GenderEnum {
    Male = 'male',
    Female = 'female',
}

export interface Child {
    id: number;
    age: number;
    name: string;
    surname: string;
    gender: GenderEnum;
    ownerId: number;
}
