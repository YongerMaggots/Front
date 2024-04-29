import classNames from 'classnames';
import styles from './DoctorCard.module.scss';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { Avatar } from '@/shared/ui';
import { DoctorCardProps } from './DoctorCard.types';

const { Title } = Typography;

export const DoctorCard = ({
    doctor,
    onSelect,
    my = false,
    error = false,
    selected = false,
    bordered = true,
    padding = 24,
}: DoctorCardProps) => {
    return (
        <div
            className={classNames(styles.container, {
                [styles.bordered]: bordered,
                [styles.selected]: selected && onSelect,
                [styles.onSelect]: onSelect,
                [styles.error]: error,
            })}
            style={{ padding }}
            onClick={() => onSelect && onSelect(doctor.id)}
        >
            {selected && <CheckCircleTwoTone className={styles.check} />}
            <div className={styles.imageWrapper}>
                <Avatar size={64} src={doctor.photo} name={doctor.name} className={styles.image} />
            </div>
            <div className={styles.petInfo}>
                <Title level={3} className={styles.name}>
                    {doctor.name} {doctor.surname}
                </Title>
            </div>
            {my && (
                <div className={styles.actions}>
                    {/* <Button
                className={styles.edit}
                type="primary"
                onClick={() => onEdit && onEdit(doctor.id, doctor)}
            >
                Редактировать
            </Button> */}
                    {/* <Button
                        danger
                        type="primary"
                        className={styles.delete}
                        onClick={() => onDelete && setIsDeleteModalOpen(true)}
                    >
                        Удалить
                    </Button> */}
                </div>
            )}
        </div>
    );
};
