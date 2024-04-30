import { AppointmentModel, useAppointmentStore } from '@/entities/appointment/model';
import { AppointmentCard } from '@/entities/appointment/ui';
import { useProfileStore } from '@/entities/user/model';
import { useEffect, useState } from 'react';

export const DoctorAppointment = () => {
    const [appointments, setAppointments] = useState<AppointmentModel.Appointment[]>();

    const { myProfile } = useProfileStore();
    const { getAppointmentByDoctorId } = useAppointmentStore();

    const handleGetAppointments = async () => {
        if (!myProfile) return;

        const appointments = await getAppointmentByDoctorId(myProfile.id);
        setAppointments(appointments);
    };

    useEffect(() => {
        handleGetAppointments();
    }, [myProfile]);

    useEffect(() => {
        handleGetAppointments();
    }, []);

    if (!appointments) return <></>;

    return (
        <div>
            {appointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} isDoctor />
            ))}
        </div>
    );
};
