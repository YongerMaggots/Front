import { PetCard } from '@/entities/pet/ui';
import styles from './AppointmentCard.module.scss';
import { AppointmentCardProps } from './AppointmentCard.types';
import { Button, Typography } from 'antd';

const { Title } = Typography;

export const AppointmentCard = ({ onDelete, appointment, my = false }: AppointmentCardProps) => {
    const ness = appointment.ness;
    return (
        <div className={styles.container}>
            <div className={styles.petInfo}>
                <PetCard pet={appointment.pet} padding={12} />
            </div>
            <div className={styles.nessInfo}>
                <Title level={4} className={styles.subtitle}>
                    Врач:
                </Title>
                <ul className={styles.nessData}>
                    <li className={styles.nessName}>
                        <b>Имя:</b> {ness.name} {ness.surname}
                    </li>
                    <li className={styles.nessEmail}>
                        <b>Почта:</b> <a href={`mailto:${ness.email}`}>{ness.email}</a>
                    </li>
                    {ness.phone && (
                        <li className={styles.nessPhone}>
                            <b>Телефон:</b> <a href={`tel:${ness.phone}`}>{ness.phone}</a>
                        </li>
                    )}
                </ul>
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
    );
};
