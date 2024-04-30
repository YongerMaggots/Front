import { Divider, Spin, Typography } from 'antd';
import styles from './UserPets.module.scss';
import { PetModel, usePetStore } from '@/entities/pet/model';
import { PetCard } from '@/entities/pet/ui';
import { AddNewPetButton } from '@/features/pet/ui';
import { UserPetsProps } from './UserPets.types';
import { useEffect, useState } from 'react';
import { handlerError } from '@/shared/lib/handle-error';
import { useProfileStore } from '@/entities/user/model';
import { RoleEnum } from '@/entities/user/model/user.modal';
import { DoctorAppointment } from '../DoctorAppointment/DoctorAppointment';

const { Title } = Typography;

export const UserPets = ({ my, userId }: UserPetsProps) => {
    const { myProfile } = useProfileStore();
    const { deletePet, editPet, getPetsByUserId } = usePetStore();
    const [pets, setPets] = useState<PetModel.Pet[]>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetPets();
    }, []);

    const handleEdit = (id: number, pet: PetModel.Pet) => {
        editPet(id, pet);
    };

    const handleGetPets = async () => {
        setIsLoading((prev) => !prev);
        try {
            const petsRes = await getPetsByUserId(userId);
            setPets(petsRes);
        } catch (error) {
            handlerError(error);
        }
        setIsLoading((prev) => !prev);
    };

    const handleDelete = async (id: number) => {
        await deletePet(id);
        await handleGetPets();
    };

    if (myProfile && my && myProfile.role === RoleEnum.doctor) {
        return (
            <>
                <Divider />
                <DoctorAppointment />
            </>
        );
    }

    if (isLoading) return <Spin />;

    if (!pets) {
        return (
            <>
                <Divider />
                <Title level={1} className={styles.title}>
                    Ошибка загрузки данных
                </Title>
            </>
        );
    }

    return (
        <>
            <Divider />
            <Title level={2} className={styles.title}>
                {my ? 'Мои питомцы' : 'Питомцы'}
            </Title>
            <div className={styles.petsCards}>
                {!my && pets.length === 0 && <Title level={4}>Питомцев нет</Title>}
                {pets.map((pet) => (
                    <PetCard
                        key={pet.id}
                        pet={pet}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        my
                    />
                ))}
                {my && <AddNewPetButton />}
            </div>
        </>
    );
};
