import { forwardRef, useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import { ChildCardProps } from './ChildCard.types';

import styles from './ChildCard.module.scss';
import classNames from 'classnames';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { GenderText } from '@/entities/child/constants';
import { GenderEnum } from '@/entities/child/model/child.modal';
import { Icons } from '@/shared/ui';

const { Title } = Typography;

export const ChildCard = forwardRef<HTMLDivElement, ChildCardProps>(
    (
        {
            child,
            // onEdit,
            onDelete,
            onSelect,
            my = false,
            error = false,
            selected = false,
            bordered = true,
            isInfoVisible = true,
            padding = 24,
        },
        ref
    ) => {
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

        const handleDelete = () => {
            if (onDelete) {
                onDelete(child.id);
                setIsDeleteModalOpen(false);
            }
        };

        const IconByGender = {
            [GenderEnum.Female]: Icons.female,
            [GenderEnum.Male]: Icons.male,
        }[child.gender];

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
                    <p>Вы уверены, что хотите удалить ребенка?</p>
                </Modal>

                <div
                    className={classNames(styles.container, {
                        [styles.bordered]: bordered,
                        [styles.selected]: selected && onSelect,
                        [styles.onSelect]: onSelect,
                        [styles.error]: error,
                    })}
                    style={{ padding }}
                    onClick={() => onSelect && onSelect(child.id)}
                    ref={ref}
                >
                    {selected && <CheckCircleTwoTone className={styles.check} />}
                    <div className={styles.childInfo}>
                        <div className={styles.imageWrapper}>
                            <img src={IconByGender} alt="" className={styles.image} />
                        </div>
                        <Title level={3} className={styles.name}>
                            {child.name} {child.surname}
                        </Title>
                        {isInfoVisible && (
                            <>
                                <ul className={styles.petAdditionalInfo}>
                                    <li className={styles.adInfoItem}>
                                        <b>Возраст:</b>
                                        {child.age}
                                    </li>
                                    <li className={styles.adInfoItem}>
                                        <b>Пол:</b>
                                        {GenderText[child.gender]}
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
                            onClick={() => onEdit && onEdit(child.id, child)}
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
    }
);
