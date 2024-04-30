import { useEffect, useState } from 'react';
import { Button, DatePicker, Input, Typography } from 'antd';
import { AppointmentFormProps, AppointmentFormType } from './AppointmentForm.types';
import { Controller, useForm } from 'react-hook-form';
import { UserModel, useProfileStore } from '@/entities/user/model';
import { PetCard } from '@/entities/pet/ui';
import { useNavigate } from 'react-router-dom';
import { AddNewPetButton } from '@/features/pet/ui';
import { DoctorCard } from '@/entities/user/ui';
import { handlerError } from '@/shared/lib/handle-error';
import styles from './AppointmentForm.module.scss';
import { useAppointmentStore } from '@/entities/appointment/model';

const { Title } = Typography;
const { TextArea } = Input;

export const AppointmentForm = ({ edit = false }: AppointmentFormProps) => {
    console.log(edit);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<AppointmentFormType>();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState<UserModel.Doctor[]>([]);
    const { newAppointment } = useAppointmentStore();
    const { myPets, authMe, getDoctor } = useProfileStore();

    useEffect(() => {
        handleGetDoctor();
    }, []);

    const handleGetDoctor = async () => {
        try {
            const doctor = await getDoctor(0, 10);
            await authMe();
            setDoctor(doctor);
        } catch (error) {
            handlerError(error);
        }
    };

    const submit = async (data: AppointmentFormType) => {
        try {
            await newAppointment(data);
            navigate('/profile/my');
        } catch (error) {
            handlerError(error);
        }
    };

    if (!myPets) {
        navigate('/404');
        return <></>;
    }

    return (
        <section>
            <Title level={1}>Запись на прием</Title>
            <form onSubmit={handleSubmit(submit)} className={styles.form}>
                <Title level={3} className={styles.formTitle}>
                    Выберите питомца:
                </Title>
                <Controller
                    name="petId"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={myPets.length > 0 ? myPets[0].id : undefined}
                    render={({ field }) => (
                        <div className={styles.petSelect}>
                            {myPets.map((pet) => (
                                <PetCard
                                    {...field}
                                    key={pet.id}
                                    pet={pet}
                                    selected={field.value === pet.id}
                                    error={errors.petId ? true : false}
                                    onSelect={(id) => field.onChange(id)}
                                />
                            ))}
                            <AddNewPetButton
                                error={errors.petId && myPets.length === 0 ? true : false}
                            />
                        </div>
                    )}
                />
                <Title level={3} className={styles.formTitle}>
                    Выберите врача:
                </Title>
                <Controller
                    name="doctorId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div className={styles.nessList}>
                            {doctor.map((doctor) => (
                                <DoctorCard
                                    {...field}
                                    key={doctor.id}
                                    doctor={doctor}
                                    selected={field.value === doctor.id}
                                    error={errors.doctorId ? true : false}
                                    onSelect={(id) => field.onChange(id)}
                                />
                            ))}
                        </div>
                    )}
                />
                <Title level={3} className={styles.formTitle}>
                    Опишите проблему:
                </Title>
                <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextArea
                            {...field}
                            style={{ resize: 'none' }}
                            status={errors.description ? 'error' : ''}
                            rows={4}
                        />
                    )}
                />
                <Title level={3} className={styles.formTitle}>
                    Выберите дату и время:
                </Title>
                <Controller
                    name="date"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <DatePicker
                            onChange={(_date, dateString) => {
                                field.onChange(dateString);
                            }}
                            status={errors.date ? 'error' : ''}
                            placeholder="Выберите дату"
                        />
                    )}
                />
                <div className={styles.actions}>
                    <Button type="primary" htmlType="submit" className={styles.button}>
                        Записаться
                    </Button>
                </div>
            </form>
        </section>
    );
};
