import ReactDOM from 'react-dom/client';
import { MyApp } from './MyApp';
import { apiCore } from '@/shared/api';
import { useToken } from '@/entities/user/model';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <MyApp />
    // </React.StrictMode>
);
apiCore.createAxiosRequestInterceptor(useToken);
