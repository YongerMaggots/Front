import { useState } from 'react';
import { Chip } from '@/shared/ui';
import { Button, Modal, Typography } from 'antd';
import { PetCardProps } from './PetCard.types';
import { getPetImage, getPetTypeName } from '../../lib';

import styles from './PetCard.module.scss';
import classNames from 'classnames';
import { CheckCircleTwoTone } from '@ant-design/icons';

const { Title } = Typography;

export const PetCard = ({
    pet,
    // onEdit,
    onDelete,
    onSelect,
    my = false,
    error = false,
    selected = false,
    bordered = true,
    isInfoVisible = true,
    padding = 24,
}: PetCardProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = () => {
        if (onDelete) {
            onDelete(pet.id);
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <>
            <Modal
                title="Подтвердите действие"
                open={isDeleteModalOpen}
                onOk={handleDelete}
                okText={'Удалить'}
                onCancel={() => setIsDeleteModalOpen(false)}
                cancelText={'Отменить'}
                okButtonProps={{ danger: true }}
            >
                <p>Вы уверены, что хотите удалить питомца?</p>
            </Modal>

            <div
                className={classNames(styles.container, {
                    [styles.bordered]: bordered,
                    [styles.selected]: selected && onSelect,
                    [styles.onSelect]: onSelect,
                    [styles.error]: error,
                })}
                style={{ padding }}
                onClick={() => onSelect && onSelect(pet.id)}
            >
                {selected && <CheckCircleTwoTone className={styles.check} />}
                <div className={styles.imageInfo}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={getPetImage(pet.kind)}
                            alt={`Иконка ${getPetTypeName(pet.kind)}`}
                            className={styles.image}
                        />
                    </div>
                    <Chip className={styles.kind}>{getPetTypeName(pet.kind)}</Chip>
                </div>
                <div className={styles.petInfo}>
                    <Title level={3} className={styles.name}>
                        {pet.name}
                    </Title>
                    {isInfoVisible && (
                        <>
                            <ul className={styles.petAdditionalInfo}>
                                <li className={styles.adInfoItem}>
                                    <b>Порода:</b>
                                    {pet.breed}
                                </li>
                                <li className={styles.adInfoItem}>
                                    <b>Возраст:</b>
                                    {pet.age}
                                </li>
                            </ul>
                        </>
                    )}
                </div>
                {my && (
                    <div className={styles.actions}>
                        {/* <Button
                            className={styles.edit}
                            type="primary"
                            onClick={() => onEdit && onEdit(pet.id, pet)}
                        >
                            Редактировать
                        </Button> */}
                        <Button
                            danger
                            type="primary"
                            className={styles.delete}
                            onClick={() => onDelete && setIsDeleteModalOpen(true)}
                        >
                            Удалить
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};
