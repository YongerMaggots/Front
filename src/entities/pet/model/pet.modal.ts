export enum PetTypeEnum {
    cat = 'cat',
    dog = 'dog',
    rabbit = 'rabbit',
    bird = 'bird',
}

export interface Pet {
    id: number;
    name: string;
    type: PetTypeEnum;
    breed: string;
    ownerId: number;
}
