import { Popover } from 'antd';
import styles from './AddNewPetButton.module.scss';

export const AddNewPetButton = () => {
    return (
        <Popover content={<>Добавить нового питомца</>}>
            <button className={styles.container}>
                <button className={styles.button}>+</button>
            </button>
        </Popover>
    );
};
