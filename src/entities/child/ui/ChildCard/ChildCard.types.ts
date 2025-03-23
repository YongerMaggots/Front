import { ChildModel } from '../../model';

export interface ChildCardProps {
    child: ChildModel.Child;
    onEdit?: (id: number, child: ChildModel.Child) => void;
    onDelete?: (id: number) => void;
    onSelect?: (id: number) => void;
    my?: boolean;
    selected?: boolean;
    bordered?: boolean;
    isInfoVisible?: boolean;
    padding?: number;
    error?: boolean;
}
