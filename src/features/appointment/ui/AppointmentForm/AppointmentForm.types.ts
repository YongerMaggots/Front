export interface AppointmentFormProps {
    edit?: boolean;
}
export type AppointmentFormType = {
    petId: number;
    nessId: number;
    date: string;
    description: string;
};
