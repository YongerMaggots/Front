import { Divider, Spin, Typography } from 'antd';
import styles from './UserChildrens.module.scss';
import { ChildModel, useChildStore } from '@/entities/child/model';
import { ChildCard } from '@/entities/child/ui';
import { AddNewChildrenButton } from '@/features/child/ui';
import { UserProps } from './UserChildrens.types';
import { useEffect, useState } from 'react';
import { handlerError } from '@/shared/lib/handle-error';
import { useProfileStore } from '@/entities/user/model';
import { RoleEnum } from '@/entities/user/model/user.modal';
import { DoctorAppointment } from '../DoctorAppointment/DoctorAppointment';

const { Title } = Typography;

export const UserChildrens = ({ my, userId }: UserProps) => {
    const { myProfile } = useProfileStore();
    const { deleteChild, editChild, getChildrensByUserId } = useChildStore();
    const [children, setChildren] = useState<ChildModel.Child[]>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetChild();
    }, []);

    const handleEdit = (id: number, child: ChildModel.Child) => {
        editChild(id, child);
    };

    const handleGetChild = async () => {
        setIsLoading((prev) => !prev);
        try {
            const childRes = await getChildrensByUserId(userId);
            setChildren(childRes);
        } catch (error) {
            handlerError(error);
        }
        setIsLoading((prev) => !prev);
    };

    const handleDelete = async (id: number) => {
        await deleteChild(id);
        await handleGetChild();
    };

    if (myProfile && my && myProfile.role === RoleEnum.doctor) {
        return (
            <>
                <Divider />
                <DoctorAppointment />
            </>
        );
    }

    if (isLoading) return <Spin />;

    if (!children) {
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
            <Title level={2} className={styles.title}>
                {my ? 'Мои дети' : 'Дети'}
            </Title>
            <div className={styles.childCards}>
                {!my && children.length === 0 && (
                    <Title level={4}>У вас ещё не добавлены дети</Title>
                )}
                {children.map((child) => (
                    <ChildCard
                        key={child.id}
                        child={child}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        my
                    />
                ))}
                {my && <AddNewChildrenButton />}
            </div>
        </>
    );
};
