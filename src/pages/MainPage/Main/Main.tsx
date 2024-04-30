import { useProfileStore } from '@/entities/user/model';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export const Main = () => {
    const { myProfile } = useProfileStore();

    return (
        <>
            {!myProfile ? (
                <>
                    <Title level={1}>Добро пожаловать</Title>
                    <Text>Для записи ко врачу, войдите или зарегистрируйтесь</Text>
                </>
            ) : (
                <>
                    <Title level={1}>
                        Добро пожаловать, {myProfile.name} {myProfile.surname}
                    </Title>
                </>
            )}
        </>
    );
};
