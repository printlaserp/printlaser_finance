// components/AuthenticatedRoute.js
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useAppData } from '@/contexts/initialDataContext';

interface AuthRouteProps {
    children: ReactNode;
}

export default function AuthRoute({ children }: AuthRouteProps) {
    const router = useRouter();
    const { setMe: setUser } = useAppData();

    async function tokenValidate(token: string | null) {
        // Armazena a rota atual no localStorage
        localStorage.removeItem('redirectRoute');
        localStorage.setItem('redirectRoute', router.asPath);
        if (!token) {
            router.push('/login');
        }

        const res = await fetch(
            '/api/auth/verify',
            {
                method: 'POST',
                body: JSON.stringify({ token }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (res.status === 200) {
            const data = await res.json();
            setUser(data.user);

            // Verifica se há uma rota de redirecionamento e redireciona para ela
            const redirectRoute = localStorage.getItem('redirectRoute');
            if (redirectRoute) {
                router.push(redirectRoute);
            } else {
                router.push('/app');
            }
        } else {
            router.push('/login');
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('nc_token');
        tokenValidate(token);
    }, []);

    return children;
}
