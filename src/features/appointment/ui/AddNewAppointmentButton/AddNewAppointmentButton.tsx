import { Popover } from 'antd';
import styles from './AddNewAppointmentButton.module.scss';
import { useNavigate } from 'react-router-dom';

export const AddNewAppointmentButton = () => {
    const navigate = useNavigate();

    const handleNavigateToAppointment = () => {
        navigate('/appointment/new');
    };

    return (
        <Popover content={<>Записаться на приём</>}>
            <button className={styles.container} onClick={handleNavigateToAppointment}>
                <button className={styles.button}>+</button>
            </button>
        </Popover>
    );
};
