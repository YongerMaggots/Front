import { UserModel } from '../../model';

export interface DoctorCardProps {
    doctor: UserModel.Doctor;

    onSelect?: (id: number) => void;
    my?: boolean;
    selected?: boolean;
    bordered?: boolean;
    padding?: number;
    error?: boolean;
}
