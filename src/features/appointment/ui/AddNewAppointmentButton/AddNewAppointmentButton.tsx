import { Popover } from 'antd';
import styles from './AddNewAppointmentButton.module.scss';

export const AddNewAppointmentButton = () => {
    return (
        <Popover content={<>Записаться на приём</>}>
            <button className={styles.container}>
                <button className={styles.button}>+</button>
            </button>
        </Popover>
    );
};
