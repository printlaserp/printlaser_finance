import Divider from "@/components/Divider"
import CurrencyFormater from "@/helpers/CurrencyFormater"
import { ArrowCircleLeft } from "@phosphor-icons/react/dist/ssr/ArrowCircleLeft"
import { ArrowCircleRight } from "@phosphor-icons/react/dist/ssr/ArrowCircleRight"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight"
import Progress from "@/components/Progress"
import { useEffect, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import findLabel from "@/helpers/GetLabel"
import { useAppData } from "@/contexts/initialDataContext"
import OverflowMenu from "@/components/OverflowMenu"
import { enqueueSnackbar } from "notistack"
import DatePicker from "react-datepicker"
import { getShortFormatedDate } from "@/utils/dateUtils"
import { useRouter } from "next/router"
import UserProfileById from "@components/UserProfileById"
import TransactionIcon from "@components/TransactionIcon"
import FiltersOverflowMenu from "@components/FiltersOverflowMenu"
import { TransactionsFiltersType } from "@dtos/FiltersDTO"
import MiniCardValue from "@components/MiniCardValue"
import CheckPermissions from "@middlewares/CheckPermissions"

export default function () {
    const { accounts, categories, subcategories } = useAppData()
    const router = useRouter()
    const { account } = router.query

    let incomesSum = 0
    let expensesSum = 0

    const [transactions, setTransactions] = useState<any[]>([])
    const [loadingData, setLoadingData] = useState(false)
    const [reload, setReload] = useState(false)
    const [date, setDate] = useState<Date>(new Date())
    const [submitting, setSubmitting] = useState(false)
    const [filters, setFilters] = useState<TransactionsFiltersType>({
        category: undefined,
        subcategory: undefined,
        type: 'TRANSACTIONS',
        account: undefined,
        gte: undefined,
        lt: undefined
    })


    const isTodaySelected = date.toDateString() === new Date().toDateString()

    const increaseOneDay = () => {
        const newDate = new Date(date)
        newDate.setDate(date.getDate() + 1)
        setDate(newDate)
    }

    const decreaseOneDay = () => {
        const newDate = new Date(date)
        newDate.setDate(date.getDate() - 1)
        setDate(newDate)
    }

    const fetchData = async () => {
        setLoadingData(true)
        const initialDate = new Date(date)
        initialDate.setHours(0, 0, 0, 0)
        const finalDate = new Date(date)
        finalDate.setHours(23, 59, 59, 999)
        const filters_ = {
            account: filters.account || account,
            category: filters.category,
            subcategories: filters.subcategory,
            type: filters.type,
            lt: filters.lt || finalDate.toISOString(),
            gte: filters.gte || initialDate.toISOString(),
        }
        const apiUrl = "/api/cashFlow/transactions"
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filters_),
        }
        const res = await fetch(apiUrl, requestOptions)
        const data = await res.json()
        setTransactions(data)
        setLoadingData(false)
    }

    useEffect(() => {
        fetchData()
    }, [reload, date, filters])

    const handleFilters = (filters: TransactionsFiltersType) => {
        setFilters(filters)
    }

    const deleteTransaction = async (
        transactionId: string,
        transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFERENCE'
    ) => {
        setSubmitting(true)
        const res = await fetch(
            `/api/cashFlow/${transactionType.toLowerCase()}s/delete`,
            {
                method: "POST",
                body: JSON.stringify({
                    transaction_id: transactionId,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        if (res.status === 201) {
            enqueueSnackbar("Transação deletada", {
                variant: "success",
            })
        } else {
            enqueueSnackbar(
                `Erro ao deletar a transação!`,
                {
                    variant: "error",
                }
            )
        }
        setReload(!reload)
        setSubmitting(false)
    }

    const handleDelete = async (transactionId: string, type: 'INCOME' | 'EXPENSE' | 'TRANSFERENCE') => {
        await deleteTransaction(transactionId, type)
    }

    // <li/> generator
    const TransactionItem = (transaction: any) => {
        if (transaction.type === 'INCOME') {
            return (
                <li key={transaction.id}>
                    <div >
                        <div className="flex justify-between h-12 w-full items-center">
                            <div className="flex items-end">
                                <TransactionIcon type={transaction.type} />
                                <div className="flex flex-col">
                                    <span className="text-xs">{findLabel(accounts, transaction.account_id)}</span>
                                    <label className="text-lg">{transaction.description || findLabel(categories, transaction.category_id)}</label>
                                    <div className="flex gap-1">
                                        <span className="flex items-center  bg-yellow-400 px-2 h-4 rounded-xl text-xs overflow-hidden overflow-ellipsis">{findLabel(categories, transaction.category_id)}</span>
                                        <span className="flex items-center  bg-slate-400 px-2 h-4 rounded-xl text-xs">{findLabel(subcategories, transaction.subcategory_id) || "Outros"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-end">
                                <UserProfileById userId={transaction.user_id} />
                                <div className="flex items-center">
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs">{getShortFormatedDate(new Date(transaction.create_at))}</span>
                                        <span className={`font-bold text-green-700`}>{CurrencyFormater.format(Number(transaction.final_value))}</span>
                                    </div>
                                    <OverflowMenu handleDelete={handleDelete} type={transaction.type} id={transaction.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider />
                </li>
            )
        }
        if (transaction.type === 'EXPENSE') {
            return (
                <li key={transaction.id}>
                    <div >
                        <div className="flex justify-between h-12 w-full items-center">
                            <div className="flex items-end">
                                <TransactionIcon type={transaction.type} />
                                <div className="flex flex-col">
                                    <span className="text-xs">{findLabel(accounts, transaction.account_id)}</span>
                                    <label className="text-lg">{transaction.description || findLabel(categories, transaction.category_id)}</label>
                                    <div className="flex gap-1">
                                        <p className=" items-center overflow-hidden overflow-ellipsis bg-yellow-400 px-2 h-4 rounded-xl text-xs">{findLabel(categories, transaction.category_id)}</p>
                                        <span className="flex items-center bg-slate-400 px-2 h-4 rounded-xl text-xs">{findLabel(subcategories, transaction.subcategory_id) || "Outros"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex items-end">
                                    <UserProfileById userId={transaction.user_id} />
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs">{getShortFormatedDate(new Date(transaction.create_at))}</span>
                                        <span className={`font-bold text-red-700`}>{CurrencyFormater.format(Number(transaction.value))}</span>
                                    </div>
                                    <OverflowMenu handleDelete={handleDelete} type={transaction.type} id={transaction.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider />
                </li>
            )
        }
        if (transaction.type === 'TRANSFERENCE') {
            return (
                <li key={transaction.id}>
                    <div className="flex justify-between h-12 w-full items-center">
                        <div className="flex items-end">
                            <TransactionIcon type={transaction.type} />
                            <div className="flex flex-col">
                                <label className="text-lg">{transaction.description || "Transferência"}</label>
                                <div className="flex gap-1">
                                    <span className="flex items-center  bg-red-700 px-2 h-4 rounded-xl text-white text-xs">{findLabel(accounts, transaction.origin_account_id)}</span>
                                    <span>
                                        <ArrowRight size={16} />
                                    </span>
                                    <span className="flex items-center  bg-green-700 px-2 h-4 rounded-xl text-white text-xs">{findLabel(accounts, transaction.target_account_id)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex items-end">
                                <UserProfileById userId={transaction.user_id} />
                                <div className="flex flex-col items-end">
                                    <span className="text-xs">{getShortFormatedDate(new Date(transaction.create_at))}</span>
                                    <span className="font-bold text-blue-900">{CurrencyFormater.format(Number(transaction.value))}</span>
                                </div>
                                <OverflowMenu handleDelete={handleDelete} type={transaction.type} id={transaction.id} />
                            </div>
                        </div>
                    </div>
                    <Divider />
                </li>
            )
        }
    }

    const incomeTotal = transactions.reduce((acc, curr) => {
        if (curr.type === 'INCOME') {
            return acc + parseFloat(curr.final_value);
        }
        return acc;
    }, 0);

    const expenseTotal = transactions.reduce((acc, curr) => {
        if (curr.type === 'EXPENSE') {
            return acc + parseFloat(curr.value || curr.value);
        }
        return acc;
    }, 0);

    const transferenceTotal = transactions.reduce((acc, curr) => {
        if (curr.type === 'TRANSFERENCE') {
            return acc + parseFloat(curr.value || curr.value);
        }
        return acc;
    }, 0);

    return (
        <CheckPermissions allowedRoles={['ADMIN', 'ROOT']}>
            <div className="page flex flex-col rounded-sm items-center p-4 gap-4 ">
                <div className="flex w-full gap-4">
                    <div className="transactions-container relative flex-col mt-16  flex flex-1 h-transaction-container bg-slate-100 overflow-auto rounded-sm w-[95%] py-4 px-2">
                        <div className="flex w-full justify-center">
                            <div className="flex w-56 max-w-56">
                                <div className="flex justify-between w-full">
                                    <button>
                                        <ArrowCircleLeft size={36} className="text-gray-400" onClick={decreaseOneDay} />
                                    </button >
                                    <DatePicker
                                        name="date"
                                        id="date"
                                        selected={date}
                                        onChange={(date) => setDate(date!)}
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={new Date()} // Define a data máxima como a data atual
                                        className="w-28 text-center rounded-lg "

                                    />
                                    <button disabled={isTodaySelected}>
                                        <ArrowCircleRight
                                            size={36}
                                            className={`text-gray-400 ${isTodaySelected ? 'text-gray-400' : ''}`}
                                            onClick={increaseOneDay}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-1 right-1 z-10">
                            <FiltersOverflowMenu handleFilters={handleFilters} />
                        </div>
                        {loadingData ? (
                            <Progress variant="simple" />
                        ) : transactions.length === 0 ? (
                            <div className='flex justify-center w-full h-full items-center'>
                                <div className='text-gray-500 text-center text-xl'>Não há registros <br /> para esta data.</div>
                            </div>
                        ) : (
                            <ul className="flex flex-col w-full h-full">
                                {
                                    <ul>
                                        {
                                            transactions.length > 0 && transactions.map((it: any) => TransactionItem(it))
                                        }
                                    </ul>
                                }
                            </ul>
                        )}
                    </div>
                    <CheckPermissions allowedRoles={['ADMIN', 'ROOT']} deniedAccessMsg={false}>
                        <div className="flex flex-col mt-16">
                            <div className='flex w-fit'>
                                <div className='flex flex-col h-full w-fit gap-2'>
                                    <h2 className="text-white">Resumo das Transações</h2>
                                    <label className='font-light text-white text-xs'>Entradas</label>
                                    <MiniCardValue value={incomeTotal.toFixed(2)} borderColor='border-green-600' />
                                    <label className='font-light text-white text-xs'>Saídas</label>
                                    <MiniCardValue value={expenseTotal.toFixed(2)} borderColor='border-red-600' />
                                    <label className='font-light text-white text-xs'>Transferências</label>
                                    <MiniCardValue value={transferenceTotal.toFixed(2)} borderColor='border-blue-600' />
                                </div>
                            </div>
                        </div>
                    </CheckPermissions>
                </div>


                {submitting && <Progress variant="opacity" />}
            </div >
        </CheckPermissions>
    )
}
