import { Popover } from 'antd';
import styles from './AddNewPetButton.module.scss';
import { useNavigate } from 'react-router-dom';

export const AddNewPetButton = () => {
    const navigate = useNavigate();

    const handleNavigateToPet = () => {
        navigate('/pet/new');
    };

    return (
        <Popover content={<>Добавить нового питомца</>}>
            <button className={styles.container} onClick={handleNavigateToPet}>
                <button className={styles.button}>+</button>
            </button>
        </Popover>
    );
};
