import { Popover } from 'antd';
import styles from './AddNewPetButton.module.scss';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

export const AddNewPetButton = ({ error }: { error?: boolean }) => {
    const navigate = useNavigate();

    const handleNavigateToPet = () => {
        navigate('/pet/new');
    };

    return (
        <Popover content={<>Добавить нового питомца</>}>
            <button
                className={classNames(styles.container, {
                    [styles.error]: error,
                })}
                onClick={handleNavigateToPet}
            >
                <button className={styles.button}>+</button>
            </button>
        </Popover>
    );
};
