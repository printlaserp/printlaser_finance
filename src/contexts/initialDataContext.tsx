import { Categories, Subcategories, Accounts, Users } from '@prisma/client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ShortUserDTO } from '../dtos/UserDTO'
import router from 'next/router'

interface AppDataProps {
  user: ShortUserDTO | null
  categories: Categories[]
  subcategories: Subcategories[]
  loading: boolean
  accounts: Accounts[]
  reloadAppData: () => void
  setMe: (data: ShortUserDTO) => void
  users: ShortUserDTO[] | null
}

const AppDataCtx = createContext<AppDataProps>({
  user: null,
  categories: [],
  subcategories: [],
  accounts: [],
  loading: false,
  reloadAppData: () => { },
  setMe: () => { },
  users: null
})

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<ShortUserDTO[] | null>(null)
  const [me, _setMe] = useState<ShortUserDTO | null>(null)
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [accounts, setAccounts] = useState([])

  const fetchData = () => {
    setLoading(true)
    fetch('/api/cashFlow/categories/list')
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories)
      })
    fetch('/api/cashFlow/subcategories/list')
      .then((response) => response.json())
      .then((subcategories) => {
        setSubcategories(subcategories)
      })
    fetch('/api/cashFlow/accounts/list')
      .then((response) => response.json())
      .then((accounts) => {
        setAccounts(accounts)
      })
    fetch('/api/users/list')
      .then((response) => response.json())
      .then((res) => {
        const { data } = res
        setUsers(data)
      })
    setLoading(false)
  }

  const reloadAppData = () => {
    setReload(!reload)
    fetchData() // Chame a função fetchData para buscar dados atualizados.
  }

  const setMe = (data: ShortUserDTO) => {
    _setMe(data)
  }

  useEffect(() => {
    fetchData()
  }, [reload])


  return (
    <AppDataCtx.Provider value={{ user: me, setMe: setMe, categories, subcategories, accounts, loading, reloadAppData, users }}>
      {children}
    </AppDataCtx.Provider>
  )
}

export function useAppData() {
  return useContext(AppDataCtx)
}
