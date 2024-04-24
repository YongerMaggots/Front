import { useState } from 'react';
import { Chip } from '@/shared/ui';
import { Button, Modal, Typography } from 'antd';
import { PetCardProps } from './PetCard.types';
import { getPetImage, getPetTypeName } from '../../lib';

import styles from './PetCard.module.scss';

const { Title } = Typography;

export const PetCard = ({
    pet,
    onEdit,
    onDelete,
    my = false,
}: PetCardProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <>
            <Modal
                title="Подтвердите действие"
                open={isDeleteModalOpen}
                onOk={() => onDelete(pet.id)}
                okText={'Удалить'}
                onCancel={() => setIsDeleteModalOpen(false)}
                cancelText={'Отменить'}
                okButtonProps={{ danger: true }}
            >
                <p>Вы уверены, что хотите удалить питомца?</p>
            </Modal>

            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    <img
                        src={getPetImage(pet.type)}
                        alt={`Иконка ${getPetTypeName(pet.type)}`}
                        className={styles.image}
                    />
                </div>
                <div className={styles.petInfo}>
                    <Title level={3}>{pet.name}</Title>
                    <Chip>{getPetTypeName(pet.type)}</Chip>
                </div>
                {my && (
                    <div className={styles.actions}>
                        <Button
                            className={styles.edit}
                            type="primary"
                            onClick={() => onEdit(pet.id, pet)}
                        >
                            Редактировать
                        </Button>
                        <Button
                            danger
                            type="primary"
                            className={styles.delete}
                            onClick={() => setIsDeleteModalOpen(true)}
                        >
                            Удалить
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};