import { useSnackbar } from "notistack"
import "react-datepicker/dist/react-datepicker.css"
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus"
import Modal from "@/components/Modal"
import { useState } from "react"
import { CurrencyInput } from "@/components/CurrencyInput"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import CurrencyFormater from "@/helpers/CurrencyFormater"
import { useAppData } from "@/contexts/initialDataContext"
import CheckPermissions from "@middlewares/CheckPermissions"

const validationSchema = Yup.object().shape({
  label: Yup.string().required("O campo label é obrigatório"),
})

export default function BankAccounts() {
  const { accounts, reloadAppData } = useAppData()
  const { enqueueSnackbar } = useSnackbar()
  const [modal, setModal] = useState(false)

  const handleAddAccount = async () => {
    setModal(true)
  }

  const closeModal = async () => {
    setModal(false)
  }

  return (
    <CheckPermissions allowedRoles={['ADMIN', 'ROOT']}>

      <div className="container flex flex-col h-fit min-h-screen justify-center rounded-sm items-center p-4">

        <div className="flex justify-center flex-wrap items-center w-full gap-2">
          {accounts.map((it) => (
            <div key={it.id} className="card block items-center justify-between flex-col w-48 h-24 rounded-md p-4 bg-slate-100">
              <label className="w-full font-bold text-center text-base">{it.label}</label>
              <div className="flex w-full justify-between">
                <label className="">Saldo</ label>
                <label className={`text-green-600 text-lg  ${Number(it.balance) >= 0 ? 'text-green-700' : 'text-red-700'}`}>{CurrencyFormater.format(Number(it.balance))}</label>
              </div>
            </div>
          ))}
          <button onClick={handleAddAccount} className="flex items-center w-48 h-24 rounded-md p-4 bg-slate-100">
            <Plus />
            <label className="w-full font-bold text-center text-base">Criar Conta</label>
          </button>
        </div>
      </div >
      <Modal onClose={closeModal} isOpen={modal}>
        <Formik
          className="w-full"
          initialValues={{
            label: "",
            value: "",
            description: "",
            logo_url: "",
            type: "specie",
            is_default: false,
            is_card_account: false
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const res = await fetch(
              "/api/cashFlow/accounts/create",
              {
                method: "POST",
                body: JSON.stringify({ ...values }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )

            const data = await res.json()

            if (data.data) {
              enqueueSnackbar(data.data, {
                variant: "success",
              })
              closeModal()
              resetForm()
              reloadAppData()
            } else {
              enqueueSnackbar(
                `Error ao criar a conta. ${data.error}`,
                {
                  variant: "error",
                }
              )
            }
            setSubmitting(false)
          }}
        >
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className="w-full p-4">
              <h1 className="text-xl font-bold text-gray-500 ">Nova Conta</h1>
              <div className="flex flex-col gap-1">
                <label htmlFor="label">Nome</label>
                <Field
                  name="label"
                  id="label"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="flex text-red-500 justify-end text-sm">
                  {errors.label &&
                    touched.label &&
                    errors.label}
                </div>

                <label htmlFor="value">Saldo Inicial</label>
                <Field
                  component={CurrencyInput}
                  id="value"
                  name="value"
                  onBlur={handleBlur}
                />

                <label htmlFor="description">Descrição</label>
                <Field
                  name="description"
                  id="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="logo_url">Logo URL</label>
                <Field
                  name="logo_url"
                  id="logo_url"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="logo_url">Tipo</label>
                <Field
                  name="type"
                  id="type"
                  as="select"
                  className="w-full"
                >
                  <option value="specie">
                    Espécie
                  </option>
                  <option value="bank">
                    Banco
                  </option>
                  <option value="provisioned">
                    Provisionado
                  </option>
                  <option value="other">
                    Outro
                  </option>
                </Field>
                <div className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="is_default"
                    id="is_default"
                  />
                  <label htmlFor="is_default">Conta Padrão</label>
                </div>
                <div className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="is_card_account"
                    id="is_card_account"
                  />
                  <label htmlFor="is_card_account">Conta Cartão</label>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="reset"
                    disabled={isSubmitting}
                    className={` ${isSubmitting ? 'opacity-50' : ''
                      } bg-transparent hover:bg-amber-500 text-amber-700 hover:text-white text-sm py-2 px-4 border border-amber-500 hover:border-transparent rounded`}
                  >
                    Limpar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${isSubmitting ? 'bg-amber-500 opacity-50' : 'bg-amber-500 hover:bg-amber-400'
                      } text-sm text-white py-2 px-4 border border-amber-700 rounded`}
                  >
                    Criar
                  </button>
                </div>
              </div>
            </Form>
          )
          }
        </Formik >
      </Modal>
    </CheckPermissions>
  )
}

