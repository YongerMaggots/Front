import { UserAppointmentProps } from './UserAppointment.types';

import styles from './UserAppointment.module.scss';
import { Typography } from 'antd';

const { Title } = Typography;

export const UserAppointment = ({
    userData,
    my = false,
}: UserAppointmentProps) => {
    return (
        <div className={styles.container}>
            <Title level={2} className={styles.title}>
                {my ? 'Мой записи' : 'Записи'} ко врачу
            </Title>
            {userData?.appointments.map((appointment) => (
                <li>{appointment.description}</li>
            ))}
        </div>
    );
};
