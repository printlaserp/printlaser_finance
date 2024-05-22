import Progress from '@components/Progress';
import { Clients, Purchases } from '@prisma/client';
import { useRouter } from 'next/router';
import PurchasesCard from './PurchasesCard';

interface IClientProps {
    client: Clients
    purchases: Purchases[]
}

export default function Client({ client, purchases }: IClientProps) {
    const router = useRouter();

    if (router.isFallback || !client) {
        return <Progress variant='screen' />;
    }

    return (
        <div className='cliente-container flex flex-col w-full justify-center gap-4 p-6 max-sm:mt-14 text-white max-h-screen'>
            <p className='text-3xl font-bold'>Informações do Cliente</p>
            <div className='client-infomations flex flex-col w-full text-lg mb-4'>
                <span>Name <br></br>{" "}
                    <span className='font-bold'>{client.name}</span>
                </span>
                <span>
                    Telefone <br></br>{" "}
                    <span className='font-bold'>
                        {client.phone}
                    </span>
                </span>
                <span>
                    Descrição <br></br> {" "}<span className='font-bold'>{client.description}</span>
                </span>
                <span>
                    Endereço <br></br>{" "}
                    <span className='font-bold'>
                        {client.address}
                    </span>
                </span>
            </div>

            <p className='text-3xl font-bold'>Débitos</p>
            <div className='purchases-cards flex w-full flex-wrap gap-2 max-sm:justify-center overflow-y-scroll'>
                {purchases.map((purchase: any) => (
                    <PurchasesCard key={purchase.id} price={purchase.amount} title={purchase.title} description={purchase.description} />
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const { id, credit_id } = context.query;

    const clientRes = await fetch(`/api/client?id=${id}`);
    const { data: client } = await clientRes.json();

    const debtsRes = await fetch(`/api/credit?credit_id=${credit_id}`);
    const { data: purchases } = await debtsRes.json();

    return {
        props: {
            client,
            purchases,
        },
    };
}
