import { useEffect, useState } from 'react';
import { Button, DatePicker, Input, Spin, Typography } from 'antd';
import { AppointmentFormType } from './AppointmentForm.types';
import { Controller, useForm } from 'react-hook-form';
import { UserModel, useProfileStore } from '@/entities/user/model';
import { ChildCard } from '@/entities/child/ui';
import { useNavigate } from 'react-router-dom';
import { AddNewChildrenButton } from '@/features/child/ui';
import { DoctorCard } from '@/entities/user/ui';
import { handlerError } from '@/shared/lib/handle-error';
import styles from './AppointmentForm.module.scss';
import { useAppointmentStore } from '@/entities/appointment/model';

const { Title } = Typography;
const { TextArea } = Input;

export const AppointmentForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<AppointmentFormType>();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState<UserModel.Doctor[]>([]);
    const [doctorsLoading, setDoctorsLoading] = useState(false);
    const [isDoctorsAreNotAvailable, setIsDoctorsAreNotAvailable] = useState(false);
    const { newAppointment } = useAppointmentStore();
    const { myChildrens, authMe, getDoctor } = useProfileStore();

    useEffect(() => {
        handleGetDoctor();
    }, []);

    const handleGetDoctor = async () => {
        try {
            setDoctorsLoading(true);
            const doctor = await getDoctor(0, 10);
            setDoctor(doctor);
            setDoctorsLoading(false);
            await authMe();
        } catch (error) {
            handlerError(error);
        }
    };

    useEffect(() => {
        if (!doctor.length) {
            setIsDoctorsAreNotAvailable(true);
        }
    }, [doctor]);

    const submit = async (data: AppointmentFormType) => {
        try {
            await newAppointment(data);
            navigate('/profile/my');
        } catch (error) {
            handlerError(error);
        }
    };

    if (!myChildrens) {
        navigate('/404');
        return <></>;
    }

    return (
        <section>
            <Title level={1}>Запись на прием</Title>
            {!isDoctorsAreNotAvailable ? (
                <Title level={3} className={styles.formTitle}>
                    Все доктора временно заняты
                </Title>
            ) : (
                <form onSubmit={handleSubmit(submit)} className={styles.form}>
                    <Title level={3} className={styles.formTitle}>
                        Выберите ребенка:
                    </Title>
                    <Controller
                        name="childId"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={myChildrens.length > 0 ? myChildrens[0].id : undefined}
                        render={({ field }) => (
                            <div className={styles.childSelect}>
                                {myChildrens.map((child) => (
                                    <ChildCard
                                        {...field}
                                        key={child.id}
                                        child={child}
                                        selected={!!field.value && field.value === child.id}
                                        error={errors.childId ? true : false}
                                        onSelect={(id) => field.onChange(id)}
                                    />
                                ))}
                                <AddNewChildrenButton
                                    error={
                                        errors.childId && myChildrens.length === 0 ? true : false
                                    }
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
                                {doctorsLoading && <Spin />}
                                {!doctorsLoading &&
                                    doctor.map((doctor) => (
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
            )}
        </section>
    );
};
