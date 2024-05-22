import MiniCardAccountValue from "@components/MiniCardAccountValue"
import Progress from "@components/Progress"
import CheckPermissions from "@middlewares/CheckPermissions"
import { useState } from "react"

export default function Admin() {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin')
      const data = await res.json()
      setData(data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <CheckPermissions allowedRoles={['ADMIN', 'ROOT']}>
      <div className="flex flex-col text-white h-screen justify-center items-center gap-4 overflow-y-scroll py-16">
        <button
          type="button"
          onClick={handleGenerate}
          className='bg-[#008282]  text-white text-sm py-2 px-4 border border-amber-500 hover:border-transparent rounded'
        >
          Salvar Resumo
        </button>
        <div className="flex flex-row flex-wrap gap-4 justify-center">

          {
            data && (
              data.balances.map((it: { label: string, id: string, balance: string }) => {
                const { label, balance, id } = it
                return < MiniCardAccountValue key={id} accountName={label} value={Number(balance)} id={id} />
              })
            )
          }
          {loading && <Progress variant="simple" />}
        </div>
      </div>
    </CheckPermissions>
  )
}

