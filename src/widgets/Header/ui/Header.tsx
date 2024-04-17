import Link from 'antd/es/typography/Link';
import styles from './Header.module.scss';
import LogoImage from '/public/logo.jpg';
import {Avatar, Dropdown, MenuProps} from 'antd';
import {useProfileStore} from '@/entities/profile/model';

export const Header = () => {
    const {profile} = useProfileStore();
    const logout = () => {
        console.log('Вышли из аккаунта');
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <Link href='/profile'>Профиль</Link>,
        },
        {
            key: '2',
            label: (
                <Link onClick={logout} className={styles.logout}>
                    Выход
                </Link>
            ),
        },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <Link href={'/'} className={styles.logoContainer}>
                    <img src={LogoImage} className={styles.logo} />
                </Link>
                <nav className={styles.nav}>
                    <Link href={'/'}>Записаться к врачу</Link>
                    <div className={styles.profile}>
                        {profile ? (
                            <Dropdown menu={{items}}>
                                <Avatar shape='circle' />
                            </Dropdown>
                        ) : (
                            <Link href='/login'>Вход/Регистрация</Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};
