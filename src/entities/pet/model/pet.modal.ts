export enum PetEnum {
    cat = 'cat',
    dog = 'dog',
    rabbit = 'rabbit',
    bird = 'bird',
}

export interface Pet {
    id: number;
    name: string;
    type: PetEnum;
    breed: string;
    ownerId: number;
}
