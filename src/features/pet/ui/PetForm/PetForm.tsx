import { Button, Input, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { PetFormType } from './PetForm.types';
import { petVariants } from '@/entities/pet/lib';
import { PetCard } from '@/entities/pet/ui';
import { usePetStore } from '@/entities/pet/model';
import { useNavigate } from 'react-router-dom';
import { handlerError } from '@/shared/lib/handle-error';
import styles from './PetForm.module.scss';

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
                            name="kind"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <PetCard
                                    {...field}
                                    pet={pet}
                                    error={Boolean(errors.kind)}
                                    onSelect={() => field.onChange(pet.kind)}
                                    selected={field.value === pet.kind}
                                    isInfoVisible={false}
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
                <Title level={4} className={styles.formTitle}>
                    Возраст
                </Title>
                <Controller
                    name="age"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input {...field} type="number" status={errors.age ? 'error' : ''} />
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
