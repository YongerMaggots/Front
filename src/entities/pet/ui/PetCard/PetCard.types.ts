import { PetModel } from '../../model';

export interface PetCardProps {
    pet: PetModel.pet;
    onEdit: (id: number, pet: PetModel.pet) => void;
    onDelete: (id: number) => void;
    my?: boolean;
}
