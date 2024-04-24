export enum PetEnum {
    cat = 'cat',
    dog = 'dog',
    rabbit = 'rabbit',
    bird = 'bird',
}

export interface pet {
    id: number;
    name: string;
    type: PetEnum;
    ownerId: number;
}
