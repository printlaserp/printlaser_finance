import { FormEvent, useState } from "react"
import { enqueueSnackbar } from "notistack"
import { useRouter } from 'next/router';
import { useAppData } from "../contexts/initialDataContext";

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter()
  const { setMe: setUser } = useAppData()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true)
    const res = await fetch(
      "/api/auth",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (res.status === 200) {
      const session = await res.json()
      const { token, user } = session
      localStorage.removeItem("nc_token")
      localStorage.setItem("nc_token", token)
      setUser(user)
      enqueueSnackbar("Você está logado!", {
        variant: "success",
      })
      const redirectRoute = localStorage.getItem('redirectRoute');
      if (redirectRoute && redirectRoute !== '/login') {
        router.push(redirectRoute);
      } else {
        router.push('/app');
      }
    } else {
      const data = await res.json()
      enqueueSnackbar(
        `${data.error}`,
        {
          variant: "error",
        }
      )
    }
    setSubmitting(false)
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 ">
        <div className="flex justify-center">
          <div className="m-4 w-36 ">
            <img src="./logo.png" alt="Logo" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-gray-300 rounded-md p-2"
              placeholder="Usuário"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-gray-300 rounded-md p-2"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#ffac00] text-white font-medium py-2 px-4 rounded-md  hover:opacity-80"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
