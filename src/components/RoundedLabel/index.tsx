type RoundedLabelProps = {
    label: string | undefined
    subcategory?: boolean
}

function RoundedLabel({ label, subcategory }: RoundedLabelProps) {
    return (
        <div className="flex">
            {label && <span className={`flex ${!subcategory ? 'bg-yellow-400' : 'bg-gray-400'} px-2 h-4 rounded-xl text-xs overflow-hidden overflow-ellipsis`}>{label}</span>}
        </div>
    )
}

export { RoundedLabel }