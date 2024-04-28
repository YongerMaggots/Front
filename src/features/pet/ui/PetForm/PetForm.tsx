import { Button, Input, Typography } from 'antd';
import styles from './PetForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { PetFormType } from './PetForm.types';
import { petVariants } from '@/entities/pet/lib';
import { PetCard } from '@/entities/pet/ui';
import { usePetStore } from '@/entities/pet/model';
import { useNavigate } from 'react-router-dom';
import { handlerError } from '@/shared/lib/handle-error';

const { Title } = Typography;

export const PetForm = () => {
    const { addNewPet } = usePetStore();
    const navigate = useNavigate();
    const {
        formState: { errors },
        handleSubmit,
        control,
    } = useForm<PetFormType>();

    const submit = async (data: PetFormType) => {
        try {
            await addNewPet(data);
            navigate('/profile/my');
        } catch (error) {
            handlerError(error);
        }
    };

    return (
        <section className={styles.section}>
            <Title level={1} className={styles.title}>
                Добавить нового питомца
            </Title>
            <form onSubmit={handleSubmit(submit)} className={styles.form}>
                <Title level={4} className={styles.formTitle}>
                    Имя
                </Title>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            style={{ resize: 'none' }}
                            status={errors.name ? 'error' : ''}
                        />
                    )}
                />
                <Title level={4} className={styles.formTitle}>
                    Тип животного
                </Title>
                <div className={styles.petContainer}>
                    {petVariants.map((pet) => (
                        <Controller
                            key={pet.id}
                            name="type"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <PetCard
                                    {...field}
                                    pet={pet}
                                    onSelect={() => field.onChange(pet.type)}
                                    selected={field.value === pet.type}
                                    isChipVisible={false}
                                />
                            )}
                        />
                    ))}
                </div>
                <Title level={4} className={styles.formTitle}>
                    Порода
                </Title>
                <Controller
                    name="breed"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input {...field} status={errors.breed ? 'error' : ''} />
                    )}
                />
                <div className={styles.actions}>
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </div>
            </form>
        </section>
    );
};
