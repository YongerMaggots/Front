import { PetModel } from '../../model';

export interface PetCardProps {
    pet: PetModel.Pet;
    onEdit?: (id: number, pet: PetModel.Pet) => void;
    onDelete?: (id: number) => void;
    onSelect?: (id: number) => void;
    my?: boolean;
    selected?: boolean;
    bordered?: boolean;
    isInfoVisible?: boolean;
    padding?: number;
    error?: boolean;
}
