import { useProfileStore } from '@/entities/user/model';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export const Main = () => {
    const { myProfile } = useProfileStore();

    return (
        <>
            <Title level={1}>Добро пожаловать</Title>
            {!myProfile && <Text>Для записи ко врачу, войдите или зарегистрируйтесь</Text>}
            {myProfile && <Text>Для записи ко врачу, войдите или зарегистрируйтесь</Text>}
        </>
    );
};
