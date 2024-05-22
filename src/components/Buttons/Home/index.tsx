import Link from "next/link"

export default function HomeButton() {
    return (
        <div className="inicio fixed top-2 right-2 justify-center">
            <Link href="/app">
                <button type="button" className="bg-white h-8 border px-4 m-4 top-4 left-4">Início</button>
            </Link>
        </div>
    )
}