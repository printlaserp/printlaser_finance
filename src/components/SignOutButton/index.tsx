import { useRouter } from 'next/router';
import { ReactNode } from 'react';
type SignOutButtonProps = {
    children?: ReactNode
} & Record<string, unknown>;

function SignOutButton({ children, ...rest }: SignOutButtonProps) {
    const route = useRouter();
    const signOut = () => {
        localStorage.removeItem("nc_token");
        route.reload();
    };

    return (
        <button type="button" className="bg-white text-gray-700 h-8 border px-4 m-4 top-4 left-4" onClick={signOut} {...rest}>{children || "Sair"}</button>
    );
}

export default SignOutButton;






