import { PetCard } from '@/entities/pet/ui';
import styles from './AppointmentCard.module.scss';
import { AppointmentCardProps, ClientInfoProps, DoctorInfoProps } from './AppointmentCard.types';
import { Button, Typography } from 'antd';

import { Tools } from '@/shared/lib';
import { Chip } from '@/shared/ui';

const { Title } = Typography;

export const AppointmentCard = ({
    onDelete,
    appointment,
    isDoctor = false,
    my = false,
}: AppointmentCardProps) => {
    const dateFormatter = (date: string): string =>
        Tools.intlDateFormat(new Date(date), {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });

    const doctor = appointment.doctor;
    const client = appointment.client;

    return (
        <div className={styles.container}>
            <div className={styles.date}>
                <Title level={4} className={styles.subtitle}>
                    Дата:
                </Title>
                <Chip className={styles.dateText}>{dateFormatter(appointment.date)}</Chip>
            </div>
            <div className={styles.otherInfo}>
                <div className={styles.petInfo}>
                    <PetCard pet={appointment.pet} padding={12} />
                </div>
                <div className={styles.nessInfo}>
                    {isDoctor ? <ClientInfo client={client} /> : <DoctorInfo doctor={doctor} />}
                </div>
                <div className={styles.description}>
                    <Title level={4} className={styles.subtitle}>
                        Описание:
                    </Title>
                    <p className={styles.descriptionText}>{appointment.description}</p>
                </div>
                {my && onDelete && (
                    <div className={styles.actions}>
                        <Button
                            danger
                            type="primary"
                            className={styles.button}
                            onClick={() => onDelete(appointment.id)}
                        >
                            Отменить запись
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

const DoctorInfo = ({ doctor }: DoctorInfoProps) => {
    return (
        <>
            <Title level={4} className={styles.subtitle}>
                Врач:
            </Title>
            <ul className={styles.nessData}>
                <li className={styles.nessName}>
                    <b>Имя:</b> {doctor.name} {doctor.surname}
                </li>
                <li className={styles.nessEmail}>
                    <b>Почта:</b> <a href={`mailto:${doctor.email}`}>{doctor.email}</a>
                </li>
                {doctor.phone && (
                    <li className={styles.nessPhone}>
                        <b>Телефон:</b> <a href={`tel:${doctor.phone}`}>{doctor.phone}</a>
                    </li>
                )}
            </ul>
        </>
    );
};

const ClientInfo = ({ client }: ClientInfoProps) => {
    return (
        <>
            <Title level={4} className={styles.subtitle}>
                Клиент:
            </Title>
            <ul className={styles.nessData}>
                <li className={styles.nessName}>
                    <b>Имя:</b> {client.name} {client.surname}
                </li>
                <li className={styles.nessEmail}>
                    <b>Почта:</b> <a href={`mailto:${client.email}`}>{client.email}</a>
                </li>
                {client.phone && (
                    <li className={styles.nessPhone}>
                        <b>Телефон:</b> <a href={`tel:${client.phone}`}>{client.phone}</a>
                    </li>
                )}
            </ul>
        </>
    );
};
