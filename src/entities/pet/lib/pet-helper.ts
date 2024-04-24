import { PetEnum } from '@/entities/pet/model/pet.modal';
import { Icons } from '@/shared/ui';

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
