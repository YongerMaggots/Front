import Link from 'antd/es/typography/Link';
import styles from './Header.module.scss';
import LogoImage from '/logo.jpg';
import {Avatar, Dropdown, MenuProps, Typography} from 'antd';
import {useProfileStore} from '@/entities/profile/model';

export const Header = () => {
    const {profile} = useProfileStore();
    const logout = () => {
        console.log('Вышли из аккаунта');
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <Typography.Link href='/profile/my'>Профиль</Typography.Link>,
        },
        {
            key: '2',
            label: <Typography.Link href='/records'>Мои записи</Typography.Link>,
        },
        {
            key: '3',
            label: (
                <Typography.Text type='danger' onClick={logout} className={styles.logout}>
                    Выход
                </Typography.Text>
            ),
        },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <Typography.Link href={'/'} className={styles.logoContainer}>
                    <img src={LogoImage} className={styles.logo} />
                </Typography.Link>
                <nav className={styles.nav}>
                    <Typography.Link href={'/'}>Записаться к врачу</Typography.Link>
                    <div className={styles.profile}>
                        {!profile ? (
                            <Dropdown menu={{items}}>
                                <Avatar shape='circle' />
                            </Dropdown>
                        ) : (
                            <Typography.Link href='/login'>Вход/Регистрация</Typography.Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};
