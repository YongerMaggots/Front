import { AxiosError } from 'axios';
import { useProfileStore } from '@/entities/user/model';
import { Toast } from '@/shared/ui';

export const handlerError = (error: unknown) => {
    if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
            useProfileStore.getState().resetMyProfile();
        }

        if (error.response) {
            if (Array.isArray(error.response.data.message)) {
                return error.response.data.message.map((message: string) =>
                    Toast({ appearence: 'error', message })
                );
            } else {
                if (!error.response.data.message) {
                    return Toast({ appearence: 'error', message: 'Произошла ошибка' });
                }
                return Toast({ appearence: 'error', message: String(error.response.data.message) });
            }
        }
    } else {
        return Toast({ appearence: 'error', message: 'Произошла ошибка' });
    }
    // } catch (error) {
    // console.error(error);
    // }
};
