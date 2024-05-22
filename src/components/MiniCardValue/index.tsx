interface MiniCardValueProps {
    value: string | number
    borderColor: string
}
export default function ({ value, borderColor }: MiniCardValueProps) {
    return (
        <div className={`${borderColor ? borderColor : 'borderWhite'} border-[2px] text-right px-2 py-2 rounded-lg w-48 h-full`}>
            <div className='h-full flex justify-between items-end'>
                <p className="font-bold mr-[4px] text-base text-white">R$</p>
                <span className="font-bold text-2xl text-white">
                    {Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>
        </div>
    )
}