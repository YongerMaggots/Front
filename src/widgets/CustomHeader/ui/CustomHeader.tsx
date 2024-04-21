import styles from './CustomHeader.module.scss';
import LogoImage from '/logo.jpg';
import {Avatar, Button, Dropdown, Layout, MenuProps, Typography} from 'antd';
import {useProfileStore} from '@/entities/user/model';
import {AuthModal} from '@/widgets/user/ui';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const {Header} = Layout;
const {Link, Text} = Typography;

export const CustomHeader = () => {
    const {profile, resetProfile} = useProfileStore();
    const logout = () => {
        console.log('Вышли из аккаунта');
        resetProfile();
    };

    const navigate = useNavigate();

    const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <Link href='/profile/my'>Профиль</Link>,
        },
        {
            key: '2',
            label: <Link href='/records'>Мои записи</Link>,
        },
        {
            key: '3',
            label: (
                <Text type='danger' onClick={logout} className={styles.logout}>
                    Выход
                </Text>
            ),
        },
    ];

    const handleCloseModal = () => {
        setIsAuthModalOpened(false);
    };

    const handleOpenModal = () => {
        setIsAuthModalOpened(true);
    };

    const handleAppointment = () => {
        if (!profile) return handleOpenModal();

        navigate('/appointment');
    };

    return (
        <>
            <AuthModal onClose={handleCloseModal} isOpen={isAuthModalOpened} />
            <Header className={styles.header}>
                <div className={styles.content}>
                    <Link href={'/'} className={styles.logoContainer}>
                        <img src={LogoImage} className={styles.logo} />
                    </Link>
                    <nav className={styles.nav}>
                        <Button type='primary' onClick={handleAppointment}>
                            Записаться к врачу
                        </Button>
                        <div className={styles.profile}>
                            {profile ? (
                                <Dropdown menu={{items}}>
                                    <Avatar shape='circle' />
                                </Dropdown>
                            ) : (
                                <Link onClick={handleOpenModal}>Вход</Link>
                            )}
                        </div>
                    </nav>
                </div>
            </Header>
        </>
    );
};
