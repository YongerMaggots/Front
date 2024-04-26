import { Spin, Typography } from 'antd';
import styles from './UserPets.module.scss';
import { PetModel, usePetStore } from '@/entities/pet/model';
import { PetCard } from '@/entities/pet/ui';
import { AddNewPetButton } from '@/features/pet/ui';
import { UserPetsProps } from './UserPets.types';
import { useEffect, useState } from 'react';
import { handlerError } from '@/shared/lib/handle-error';
import { PetEnum } from '@/entities/pet/model/pet.modal';

const { Title } = Typography;

export const UserPets = ({ my, userId }: UserPetsProps) => {
    const { deletePet, editPet, getPetsByUserId } = usePetStore();
    const [pets, setPets] = useState<PetModel.Pet[]>([
        {
            id: 0,
            name: 'Doogy',
            type: PetEnum.dog,
            ownerId: 1,
        },
        {
            id: 1,
            name: 'Catty',
            type: PetEnum.cat,
            ownerId: 1,
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetPets();
    }, []);

    const handleEdit = (id: number, pet: PetModel.Pet) => {
        editPet(id, pet);
    };

    const handleGetPets = async () => {
        if (my) return;

        setIsLoading(true);
        try {
            const petsRes = await getPetsByUserId(userId);
            setPets(petsRes);
        } catch (error) {
            handlerError(error);
        }
        setIsLoading(false);
    };

    const handleDelete = (id: number) => {
        deletePet(id);
    };

    if (isLoading) return <Spin />;

    if (!pets) {
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
                {pets.map((pet) => (
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
