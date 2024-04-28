import { PetTypeEnum } from '@/entities/pet/model/pet.modal';
import { Icons } from '@/shared/ui';
import { PetModel } from '../model';

export const getPetImage = (pet: PetTypeEnum) => {
    switch (pet) {
        case PetTypeEnum.cat:
            return Icons.cat;
        case PetTypeEnum.dog:
            return Icons.dog;
        case PetTypeEnum.rabbit:
            return Icons.rabbit;
        case PetTypeEnum.bird:
            return Icons.bird;
        default:
            return Icons.dog;
    }
};
export const getPetTypeName = (type: PetTypeEnum) => {
    switch (type) {
        case PetTypeEnum.cat:
            return 'Кот';
        case PetTypeEnum.dog:
            return 'Собака';
        case PetTypeEnum.rabbit:
            return 'Кролик';
        case PetTypeEnum.bird:
            return 'Птица';
        default:
            return 'Киборг-убийца';
    }
};

export const petVariants: PetModel.Pet[] = [
    {
        id: 1,
        name: 'Кот',
        type: PetTypeEnum.cat,
        breed: 'Латыш',
        ownerId: 1,
    },
    {
        id: 2,
        name: 'Собака',
        type: PetTypeEnum.dog,
        breed: 'Шпиц',
        ownerId: 1,
    },
    {
        id: 3,
        name: 'Кролик',
        type: PetTypeEnum.rabbit,
        breed: 'Серояйций',
        ownerId: 1,
    },
    {
        id: 4,
        name: 'Птица',
        type: PetTypeEnum.bird,
        breed: 'Голубая',
        ownerId: 1,
    },
];
