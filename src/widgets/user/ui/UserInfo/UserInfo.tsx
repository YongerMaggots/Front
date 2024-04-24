import { Button, Typography } from 'antd';
import { UserInfoProps } from './types';
import styles from './UserInfo.module.scss';
import { Avatar, Chip } from '@/shared/ui';
import { Tools } from '@/shared/lib';

const { Title } = Typography;

export const UserInfo = ({ userData, my = false }: UserInfoProps) => {
    if (!userData) {
        return (
            <Title level={1} className={styles.title}>
                Пользователь не найден
            </Title>
        );
    }

    return (
        <section className={styles.section}>
            <Title level={1} className={styles.title}>
                {my ? 'Мой профиль' : 'Профиль'}
            </Title>
            <div className={styles.user}>
                <div className={styles.userData}>
                    <Avatar
                        size={128}
                        src={userData?.photo}
                        alt={`${userData.name} ${userData.surname}`}
                        name={userData.name}
                        className={styles.avatar}
                    />
                    <div className={styles.userInfo}>
                        <Title level={2} className={styles.name}>
                            {userData.name} {userData.surname}
                        </Title>
                        <Chip>{Tools.getUserRole(userData.role)}</Chip>
                    </div>
                </div>
                {my && (
                    <Button type="primary" href="/profile/my/edit">
                        Редактировать
                    </Button>
                )}
            </div>
        </section>
    );
};
