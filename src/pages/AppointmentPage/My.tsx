import { useProfileStore } from '@/entities/user/model';
import { UserAppointment } from '@/widgets';

export const My = () => {
    const { myProfile } = useProfileStore();

    if (!myProfile) return null;

    return <UserAppointment userId={myProfile.id} my />;
};
