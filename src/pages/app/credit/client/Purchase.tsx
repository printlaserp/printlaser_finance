import Progress from '@components/Progress'
import { Clients } from '@prisma/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Client() {
    const router = useRouter()
    const { id } = router.query

    const [client, setClient] = useState<Clients | null>(null)

    useEffect(() => {
        fetch(`/api/client/purchase?id=${id}`)
            .then(async function (response) {
                const { data } = await response.json()
                setClient(data)
            })
            .catch(function (error) {
                console.error(error)
            })
            .finally(function () {
            })
    }, [])

    if (!client) {
        return <Progress variant='screen' />
    }

    return (
        <div className='cliente-container flex flex-col w-full justify-center gap-4 p-6 max-sm:mt-14 text-white max-h-screen'>
            <p className='text-3xl font-bold'>Informações da Compra</p>
            <div className='client-infomations flex flex-col w-full text-lg mb-4'>
                <span>Cliente <br></br>{" "}
                    <span className='font-bold'>WENDEL DOS SANTOS PEREIRA</span>
                </span>

            </div>

            <p className='text-3xl font-bold'>Débitos</p>
            <div className='purchases-cards flex w-full flex-wrap gap-2 max-sm:justify-center overflow-y-scroll'>
               
            </div>
        </div>
    )
}