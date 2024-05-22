import Modal from "../Modal"

type CardPaymetMethodProps = {
    onClose: () => void
    isOpen: boolean
    formField: any
    errors: any
    values: any
}

export default function CardPaymetMethodModal({ onClose, isOpen, formField: Field, errors, values }: CardPaymetMethodProps) {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <div className="flex flex-col w-full p-4 gap-2 ">
                <div className="mb-4">
                    <label htmlFor="cardType" className="block text-gray-700 text-sm font-bold mb-2">
                        Escolha o método de pagamento:
                    </label>
                    <div className="mt-2">
                        <div className="inline-flex items-center mr-6">
                            <Field type="radio" name="cardType" value="debit" id="debit" />
                            <label htmlFor="debit" className="ml-2">
                                Débito
                            </label>
                        </div>
                        <div className="inline-flex items-center">
                            <Field type="radio" name="cardType" value="credit" id="credit" />
                            <label htmlFor="credit" className="ml-2">
                                Crédito
                            </label>
                        </div>
                    </div>
                </div>
                {errors.cardType}

                <div className="mb-4">
                    <label htmlFor="recurrence" className="block text-gray-700 text-sm font-bold mb-2">
                        Selecione o número de parcelas:
                    </label>
                    <Field as="select" name="recurrence" id="recurrence" disabled={values.cardType === "debit"} className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200">
                        {Array.from({ length: 12 }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}x
                            </option>
                        ))}
                    </Field>
                </div>
                <div className="mb-4">

                    <label htmlFor="cardBanner" className="block text-gray-700 text-sm font-bold mb-2">
                        Selecione a bandeira do cartão:
                    </label>
                    <Field as="select" name="cardBanner" id="cardBanner" className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" >
                        <option value='visa'>
                            Visa
                        </option>
                        <option value='master'>
                            Master
                        </option>
                        <option value='elo'>
                            Elo
                        </option>
                        <option value='Hiper'>
                            Hiper
                        </option>
                    </Field>
                    {errors.cardBanner}
                </div>

                {/* <button type="button" onClick={onClose} className='bg-[#008282] hover:bg-[#008282] text-sm text-white py-2 px-4 border border-[#008282] rounded'>
                    Cancelar
                </button> */}
                <button type="button" onClick={onClose} className='bg-[#008282] hover-bg-amber-400 text-sm text-white py-2 px-4 border border-[#008282] rounded'>
                    Ok
                </button>
            </div>

        </Modal >
    )
}
