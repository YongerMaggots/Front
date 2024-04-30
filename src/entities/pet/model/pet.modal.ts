export enum PetTypeEnum {
    cat = 'cat',
    dog = 'dog',
    rabbit = 'rabbit',
    bird = 'bird',
}

export interface Pet {
    id: number;
    age: number;
    name: string;
    kind: PetTypeEnum;
    breed: string;
    ownerId: number;
}
