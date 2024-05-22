import { useAppData } from "@/contexts/initialDataContext"
import Progress from "@/components/Progress";

export default function App() {
  const { user } = useAppData()

  if (!user) {
    return <Progress variant="screen" />
  }

  return (<>
    <div className="flex justify-center items-center h-full">
      <h1 className="font-bold text-4xl text-gray-200">Bem vindo ao Netal Finance</h1>
    </div>
    <div className="absolute text-white bottom-2 right-2 justify-center">
      <span>{"Ver. (1.0.0)"}</span>
    </div>
  </>
  )
}
