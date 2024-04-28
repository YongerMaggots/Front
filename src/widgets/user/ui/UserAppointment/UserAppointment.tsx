import { UserAppointmentProps } from './UserAppointment.types';
import { Spin, Typography } from 'antd';
import { AppointmentModel, useAppointmentStore } from '@/entities/appointment/model';
import { useEffect, useState } from 'react';
import { handlerError } from '@/shared/lib/handle-error';
import { AppointmentCard } from '@/entities/appointment/ui';
import { AddNewAppointmentButton } from '@/features/appointment/ui';

import styles from './UserAppointment.module.scss';

const { Title } = Typography;

export const UserAppointment = ({ userId, my = false }: UserAppointmentProps) => {
    const { getAppointmentById } = useAppointmentStore();
    const [appointments, setAppointments] = useState<AppointmentModel.Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetAppointments = async () => {
        setIsLoading(true);
        try {
            const data = await getAppointmentById(userId);

            setAppointments(data);
        } catch (error) {
            handlerError(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        handleGetAppointments();
    }, []);

    if (isLoading) {
        return <Spin />;
    }

    if (!appointments) {
        return (
            <Title level={1} className={styles.title}>
                Записи не найдены не найден
            </Title>
        );
    }

    return (
        <div className={styles.container}>
            <Title level={2} className={styles.title}>
                {my ? 'Мой записи' : 'Записи'} ко врачу
            </Title>
            <div className={styles.appointmentsContainer}>
                {appointments.map((appointment) => (
                    <AppointmentCard appointment={appointment} key={appointment.id} my />
                ))}
                <AddNewAppointmentButton />
            </div>
        </div>
    );
};
