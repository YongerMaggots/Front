import { UserAppointmentProps } from './UserAppointment.types';

import styles from './UserAppointment.module.scss';
import { Spin, Typography } from 'antd';
import {
    AppointmentModel,
    useAppointmentStore,
} from '@/entities/appointment/model';
import { PetEnum } from '@/entities/pet/model/pet.modal';
import { useEffect, useState } from 'react';
import { handlerError } from '@/shared/lib/handle-error';
import { AppointmentCard } from '@/entities/appointment/ui';
import { RoleEnum } from '@/entities/user/model/user.modal';
import { AddNewAppointmentButton } from '@/features/appointment/ui';

const { Title } = Typography;

export const UserAppointment = ({
    userId,
    my = false,
}: UserAppointmentProps) => {
    const { getAppointmentById } = useAppointmentStore();
    const [appointments, setAppointments] = useState<
        AppointmentModel.Appointment[]
    >([
        {
            id: 0,
            pet: {
                id: 1,
                name: 'Catty',
                type: PetEnum.cat,
                ownerId: 1,
            },
            date: '2022-12-12T12:00:00.000Z',
            ness: {
                id: 5,
                name: 'Доктор',
                surname: 'Айболит',
                role: RoleEnum.doctor,
                email: 'doctor@gmail.ru',
                phone: '+7 (619) 555-55-55',
            },
            description: 'У моей Маси ножка зудит',
        },
    ]);
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
                    <AppointmentCard
                        appointment={appointment}
                        key={appointment.id}
                        my
                    />
                ))}
                <AddNewAppointmentButton />
            </div>
        </div>
    );
};
