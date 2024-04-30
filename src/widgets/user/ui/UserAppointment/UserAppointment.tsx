import { UserAppointmentProps } from './UserAppointment.types';
import { Divider, Spin, Typography } from 'antd';
import { AppointmentModel, useAppointmentStore } from '@/entities/appointment/model';
import { useEffect, useState } from 'react';
import { handlerError } from '@/shared/lib/handle-error';
import { AppointmentCard } from '@/entities/appointment/ui';
import { AddNewAppointmentButton } from '@/features/appointment/ui';

import styles from './UserAppointment.module.scss';
import { RoleEnum } from '@/entities/user/model/user.modal';
import { useProfileStore } from '@/entities/user/model';

const { Title } = Typography;

export const UserAppointment = ({ userId, my = false }: UserAppointmentProps) => {
    const { myProfile } = useProfileStore();
    const { getAppointmentByUserId, deleteAppointment } = useAppointmentStore();
    const [appointments, setAppointments] = useState<AppointmentModel.Appointment[]>();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (id: number) => {
        await deleteAppointment(id);
        await handleGetAppointments();
    };

    const handleGetAppointments = async () => {
        setIsLoading(true);
        try {
            const data = await getAppointmentByUserId(userId);

            setAppointments(data);
        } catch (error) {
            handlerError(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        handleGetAppointments();
    }, []);

    if (myProfile && my && myProfile.role === RoleEnum.doctor) {
        return <></>;
    }

    if (isLoading) {
        return <Spin />;
    }

    if (!appointments) {
        return (
            <>
                <Divider />
                <Title level={1} className={styles.title}>
                    Ошибка загрузки данных
                </Title>
            </>
        );
    }

    return (
        <>
            <Divider />
            <div className={styles.container}>
                <Title level={2} className={styles.title}>
                    {my ? 'Мой записи' : 'Записи'} к врачу
                </Title>
                <div className={styles.appointmentsContainer}>
                    {!my && appointments.length === 0 && <Title level={4}>Записи не найдены</Title>}
                    {appointments.map((appointment) => (
                        <AppointmentCard
                            appointment={appointment}
                            key={appointment.id}
                            my
                            onDelete={handleDelete}
                        />
                    ))}
                    {my && <AddNewAppointmentButton />}
                </div>
            </div>
        </>
    );
};
