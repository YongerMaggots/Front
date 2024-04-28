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
    onEdit,
    onDelete,
    onSelect,
    my = false,
    selected = false,
    bordered = true,
    isChipVisible = true,
    padding = 24,
}: PetCardProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <>
            <Modal
                title="Подтвердите действие"
                open={isDeleteModalOpen}
                onOk={() => onDelete && onDelete(pet.id)}
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
                })}
                style={{ padding }}
                onClick={() => onSelect && onSelect(pet.id)}
            >
                {selected && <CheckCircleTwoTone className={styles.check} />}
                <div className={styles.imageWrapper}>
                    <img
                        src={getPetImage(pet.type)}
                        alt={`Иконка ${getPetTypeName(pet.type)}`}
                        className={styles.image}
                    />
                </div>
                <div className={styles.petInfo}>
                    <Title level={3} className={styles.name}>
                        {pet.name}
                    </Title>
                    {isChipVisible && <Chip>{getPetTypeName(pet.type)}</Chip>}
                </div>
                {my && (
                    <div className={styles.actions}>
                        <Button
                            className={styles.edit}
                            type="primary"
                            onClick={() => onEdit && onEdit(pet.id, pet)}
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
