import { useEffect } from "react";
import { useRouter } from 'next/router';
import Progress from "../components/Progress";

export default function () {
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("nc_token")
        if (!token) {
            router.push('/login')
        } else {
            router.push('/app')
        }
    }, [])
    return <Progress variant="screen" />
}