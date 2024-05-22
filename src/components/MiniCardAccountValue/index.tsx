import { List } from "@phosphor-icons/react/dist/ssr/List"
import { useRouter } from "next/router"

interface MiniCardAccountValueProps {
    id: string
    value: number
    accountName: string
    borderColor?: string | null
}

export default function ({ id, value, borderColor, accountName }: MiniCardAccountValueProps) {
    const router = useRouter()

    const handleAccountTransactions = () => {
        router.push(`/app/transactions?account=${id}`)
    }

    return (
        <div className={`${borderColor ? ` border-[${borderColor}]` : 'border-white'}  relative  flex flex-col border-[2px] gap-4 px-2 py-2 rounded-lg w-48`}>
            <div onClick={handleAccountTransactions} className='absolute right-2 top-2 text-white cursor-pointer'>
                <List size={18} />
            </div>
            <div className="text-white texl-lg font-bold">{accountName}</div>
            <div className='h-full flex justify-between items-end'>
                <p className="font-bold mr-[4px] text-base text-white">R$</p>
                <span className="font-bold text-2xl text-white">
                    {Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>
        </div>
    )
}