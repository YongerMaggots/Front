import { PetEnum } from '@/entities/pet/model/pet.modal';
import { Icons } from '@/shared/ui';
import { PetModel } from '../model';

export const getPetImage = (pet: PetEnum) => {
    switch (pet) {
        case PetEnum.cat:
            return Icons.cat;
        case PetEnum.dog:
            return Icons.dog;
        case PetEnum.rabbit:
            return Icons.rabbit;
        case PetEnum.bird:
            return Icons.bird;
        default:
            return Icons.dog;
    }
};
export const getPetTypeName = (type: PetEnum) => {
    switch (type) {
        case PetEnum.cat:
            return 'Кот';
        case PetEnum.dog:
            return 'Собака';
        case PetEnum.rabbit:
            return 'Кролик';
        case PetEnum.bird:
            return 'Птица';
        default:
            return 'Киборг-убийца';
    }
};

export const petVariants: PetModel.Pet[] = [
    {
        id: 1,
        name: 'Кот',
        type: PetEnum.cat,
        breed: 'Латыш',
        ownerId: 1,
    },
    {
        id: 2,
        name: 'Собака',
        type: PetEnum.dog,
        breed: 'Шпиц',
        ownerId: 1,
    },
    {
        id: 3,
        name: 'Кролик',
        type: PetEnum.rabbit,
        breed: 'Серояйций',
        ownerId: 1,
    },
    {
        id: 4,
        name: 'Птица',
        type: PetEnum.bird,
        breed: 'Голубая',
        ownerId: 1,
    },
];
