import { Button, Typography } from 'antd';

const { Title } = Typography;

export const NotFoundPage = () => {
    return (
        <section
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '12px',
            }}
        >
            <Title level={1}>Страница не найдена</Title>
            <Button type="primary" href="/">
                Вернуться на главную
            </Button>
        </section>
    );
};
