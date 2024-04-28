import { useProfileStore } from '@/entities/user/model';
import { RoleEnum } from '@/entities/user/model/user.modal';
import { Button, Modal, Select, Typography } from 'antd';
import { ChangeUserRoleProps } from './ChangeUserRole.types';
import { useState } from 'react';
import styles from './ChangeUserRole.module.scss';
import { handlerError } from '@/shared/lib/handle-error';

const { Title } = Typography;

export const ChangeUserRole = ({ userId, currentRole, getUser }: ChangeUserRoleProps) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleEnum>(currentRole);
    const { myProfile, changeUserRole } = useProfileStore();

    const handleChangeRole = async () => {
        try {
            try {
                await changeUserRole(userId, selectedRole);
                await getUser();
            } catch (error) {
                handlerError(error);
            }
            setIsSelectOpen(false);
        } catch (error) {
            handlerError(error);
        }
    };

    if (!myProfile || myProfile.role !== RoleEnum.admin) {
        return null;
    }

    return (
        <>
            <Modal open={isSelectOpen} onCancel={() => setIsSelectOpen(false)} footer={false}>
                <div className={styles.container}>
                    <Title level={3}>Изменить роль</Title>
                    <Select
                        defaultValue={myProfile.role}
                        onChange={setSelectedRole}
                        value={selectedRole}
                        className={styles.select}
                    >
                        <Select.Option value={RoleEnum.user}>Пользователь</Select.Option>
                        <Select.Option value={RoleEnum.doctor}>Доктор</Select.Option>
                        <Select.Option value={RoleEnum.admin}>Админ</Select.Option>
                    </Select>
                    <Button
                        type="primary"
                        className={styles.button}
                        onClick={() => handleChangeRole()}
                    >
                        Подтвердить
                    </Button>
                </div>
            </Modal>
            <Button onClick={() => setIsSelectOpen(true)}>Изменить роль</Button>
        </>
    );
};
