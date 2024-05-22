import { DailySummaries } from "@prisma/client";
import { getShortFormatedDate } from "@utils/dateUtils";

interface DailySummariesSectionProps {
  deilySummaries: DailySummaries[]
}

function DailySummariesSection({ deilySummaries }: DailySummariesSectionProps) {

  return (
    <div className="daily-summaries-section w-full flex flex-row flex-wrap gap-4">
      {deilySummaries.map((it: DailySummaries) => (
        <div key={it.id} className="flex flex-col items-center gap-1 text-white font-semibold ">
          <span className="text-xs">{getShortFormatedDate(new Date(it.created_at))}</span>
          <div className="flex justify-center items-center w-12 h-7 border-[2px] px-2 py-2 rounded-lg border-green-600">
            <span>{it.incomes.toFixed(0)}</span>
          </div>
          <div className="flex justify-center items-center w-12 h-7 border-[2px] px-2 py-2 rounded-lg border-red-600">
            <span>{it.expenses.toFixed(0)}</span>
          </div>
        </div>
      ))}
      {deilySummaries.length === 0 && <div className='flex justify-center w-full items-center '>
        <div className='text-gray-500 text-center text-lg'>Não há resumos registrados.</div>
      </div>}
    </div>
  )
}

export default DailySummariesSection;
