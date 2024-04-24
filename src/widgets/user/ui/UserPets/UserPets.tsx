import { Typography } from 'antd';
import styles from './UserPets.module.scss';
import { PetModel, usePetStore } from '@/entities/pet/model';
import { PetCard } from '@/entities/pet/ui';
import { AddNewPetButton } from '@/features/pet/ui';
import { UserPetsProps } from './UserPets.types';

const { Title } = Typography;

export const UserPets = ({ my, userData }: UserPetsProps) => {
    const { deletePet, editPet } = usePetStore();

    const handleEdit = (id: number, pet: PetModel.pet) => {
        editPet(id, pet);
    };

    const handleDelete = (id: number) => {
        deletePet(id);
    };

    if (!userData) {
        return (
            <Title level={1} className={styles.title}>
                Пользователь не найден
            </Title>
        );
    }
    return (
        <>
            <Title level={2} className={styles.title}>
                {my ? 'Мои питомцы' : 'Питомцы'}
            </Title>
            <div className={styles.petsCards}>
                {userData.pets.map((pet) => (
                    <PetCard
                        key={pet.id}
                        pet={pet}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        my
                    />
                ))}
                <AddNewPetButton />
            </div>
        </>
    );
};
