import { CurrencyInput } from "@/components/CurrencyInput"
import Progress from "@/components/Progress"
import { useAppData } from "@/contexts/initialDataContext"
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown"
import { CaretUp } from "@phosphor-icons/react/dist/ssr/CaretUp"
import { Field, Form, Formik } from "formik"
import { useSnackbar } from "notistack"
import { useState } from "react"
import DatePicker from "react-datepicker"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  value: Yup.string().required("O campo Valor é obrigatório"),
  origin_account: Yup.string().required("Selecione a conta de origem"),
  target_account: Yup.string().required("Selecione a conta de destino"),
})


export default function Transference() {
  const { enqueueSnackbar } = useSnackbar()
  const { user, reloadAppData, accounts, loading } = useAppData()
  const [moreOptions, setMoreOptions] = useState(false)

  const handleMoreOptions = () => {
    setMoreOptions(!moreOptions)
  }

  return (
    !loading ? (
      <div className="flex flex-col h-fit min-h-screen justify-center rounded-sm items-center  p-4">
        <Formik
          className="w-full"
          initialValues={{
            value: "",
            origin_account: "",
            target_account: "",
            description: "",
            date: new Date(),
            observation: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const res = await fetch(
              "/api/cashFlow/transferences/create",
              {
                method: "POST",
                body: JSON.stringify({ ...values, userId: user?.id }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )

            if (res.status === 201) {
              enqueueSnackbar("Nova entrada salva com sucesso!", {
                variant: "success",
              })
            } else {
              enqueueSnackbar(
                `Error ao salvar a receita! Mensagem de erro: ${res.statusText}`,
                {
                  variant: "error",
                }
              )
            }
            reloadAppData()
            resetForm()
            setSubmitting(false)
          }}
        >
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            getFieldProps,
            setFieldValue,
          }) => (
            <div className="flex flex-col w-96 rounded-lg items-center bg-slate-100 ">
              <div className="rounded-t-lg h-2 bg-blue-600 w-full"></div>
              <h1 className="text-xl font-bold text-gray-500 mt-4">Nova Transferência</h1>
              <Form className="w-full p-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="value">Valor</label>
                  <Field
                    component={CurrencyInput}
                    id="value"
                    name="value"
                    onBlur={handleBlur}

                  />
                  <div className="flex text-red-500 justify-end text-sm">
                    {errors.value && touched.value && errors.value}
                  </div>

                  {/* ########################################################## */}

                  <label htmlFor="origin_account">Conta de origem</label>
                  <Field
                    name="origin_account"
                    as="select"
                    id="origin_account"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>
                      Escolha uma opção
                    </option>
                    {accounts
                      .slice() // cria uma cópia do array para não alterar o original
                      .sort((a, b) => a.label.localeCompare(b.label)) // ordena o array alfabeticamente
                      .map((it) => (
                        <option key={it.id} value={it.id}>
                          {it.label}
                        </option>
                      ))}
                  </Field>
                  <div className="flex text-red-500 justify-end text-sm">
                    {errors.origin_account &&
                      touched.origin_account &&
                      errors.origin_account}
                  </div>
                  {/* ########################################################## */}
                  <label htmlFor="target_account">Conta de destino</label>
                  <Field
                    name="target_account"
                    as="select"
                    id="target_account"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>
                      Escolha uma opção
                    </option>
                    {accounts
                      .slice() // cria uma cópia do array para não alterar o original
                      .sort((a, b) => a.label.localeCompare(b.label)) // ordena o array alfabeticamente
                      .map((it) => (
                        <option key={it.id} value={it.id}>
                          {it.label}
                        </option>
                      ))}
                  </Field>
                  <div className="flex text-red-500 justify-end text-sm">
                    {errors.target_account &&
                      touched.target_account &&
                      errors.target_account}
                  </div>
                  {/* ########################################################## */}
                  <label htmlFor="description">Descrição</label>
                  <Field
                    name="description"
                    id="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div
                    onClick={handleMoreOptions}
                    className="flex justify-center gap-2 items-center"
                  >
                    <label>Mais opções</label>
                    {moreOptions ? (
                      <CaretUp size={24} />
                    ) : (
                      <CaretDown size={24} />
                    )}
                  </div>
                  {moreOptions && (
                    <>
                      <label htmlFor="date">Data</label>
                      <DatePicker
                        name="date"
                        id="date"
                        selected={getFieldProps("date").value}
                        onChange={(date) => {
                          setFieldValue("date", date)
                        }}
                        dateFormat="dd/MM/yyyy"
                      />
                      <label htmlFor="observation">Observações</label>
                      <Field
                        as="textarea"
                        name="observation"
                        id="observation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </>
                  )}
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      className={` ${isSubmitting ? 'opacity-50' : ''
                        } bg-transparent hover:bg-amber-500 text-amber-700 hover:text-white text-sm py-2 px-4 border border-amber-500 hover:border-transparent rounded`}
                    >
                      Cancelar
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
                {isSubmitting && <Progress variant="opacity" />}
              </Form>
            </div>
          )
          }
        </Formik >
      </div >
    ) : (
      <Progress variant="simple" />
    )
  )
}
