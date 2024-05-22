import AddCategoryModal from "@/components/AddCategoryModal"
import AddSubcategoryModal from "@/components/AddSubtegoryModal"
import { CurrencyInput } from "@/components/CurrencyInput"
import Progress from "@/components/Progress"
import { useAppData } from "@/contexts/initialDataContext"
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown"
import { CaretUp } from "@phosphor-icons/react/dist/ssr/CaretUp"
import { PlusCircle } from "@phosphor-icons/react/dist/ssr/PlusCircle"
import { Field, Form, Formik } from "formik"
import { useSnackbar } from "notistack"
import { useState } from "react"
import DatePicker from "react-datepicker"
import * as Yup from "yup"
import { accessRules } from "../../../rules"

const validationSchema = Yup.object().shape({
  value: Yup.string().required("O campo Valor é obrigatório"),
  category: Yup.string().required("Selecione uma categoria"),
  // subcategory: Yup.string().required("Selecione uma subcategoria"),
  account: Yup.string().required("Selecione uma forma de pagamento"),
})


export default function Expense() {
  const { enqueueSnackbar } = useSnackbar()
  const { accounts, categories, subcategories, user } = useAppData()

  if (!user || !categories || !subcategories || !accounts) {
    return <Progress variant="screen" />
  }

  const expenseCategories = categories.filter((it) => it.type === "EXPENSE")

  const [selectedCategory, setSelectedCategory] = useState<{ id: string | undefined, label: string | undefined }>({
    id: "", label: ""
  })

  const [moreOptions, setMoreOptions] = useState(false)
  const [categoryModal, setCategoryModal] = useState(false)
  const [subcategoryModal, setSubcategoryModal] = useState(false)

  const handleMoreOptions = () => {
    setMoreOptions(!moreOptions)
  }

  const closeSubcategoryModal = () => {
    setSubcategoryModal(false)
  }

  const closeCategoryModal = () => {
    setCategoryModal(false)
  }

  const handleAddSubcategory = () => {
    setSubcategoryModal(true)
  }

  const handleAddCategory = () => {
    setCategoryModal(true)
  }

  return (
    <div className="flex flex-col h-fit min-h-screen justify-center rounded-sm items-center ">

      <Formik
        className="w-full"
        initialValues={{
          value: "",
          category: "",
          subcategory: "Outros",
          date: new Date(),
          description: "",
          account: "",
          observation: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const { value, category, subcategory, account, date, description, observation } = values
          const res = await fetch(
            "/api/cashFlow/expenses/create",
            {
              method: "POST",
              body: JSON.stringify({
                value: Number(value),
                category: categories.find(it => it.label === category)?.id,
                subcategory: subcategories.find(it => it.label === subcategory)?.id,
                description: description || subcategories.find(it => it.label === subcategory)?.label || "Outros",
                account: accounts.find(it => it.label === account)?.id,
                observation: observation,
                create_at: date,
                userId: user?.id
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )

          if (res.status === 201) {
            enqueueSnackbar("Nova despesa salva com sucesso!", {
              variant: "success",
            })
          } else {
            enqueueSnackbar(
              `Error ao salvar a despesa! Mensagem de erro: ${res.statusText}`,
              {
                variant: "error",
              }
            )
          }
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
            <div className="rounded-t-lg h-2 bg-red-600 w-full"></div>
            <h1 className="text-xl font-bold text-gray-500 mt-4">Nova Despesa</h1>
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
                <label htmlFor="category">Categoria</label>
                <div className="flex gap-1 w-full">
                  <Field
                    name="category"
                    id="category"
                    className="w-full"
                    as="select"
                    onChange={(e: any) => {
                      const option = e.currentTarget.value as string
                      const categoryId = categories.find(it => it.label === option)?.id
                      setSelectedCategory({ label: option, id: categoryId })
                      handleChange(e)
                    }}
                    onBlur={handleBlur}

                  >
                    <option value="" disabled>
                      Escolha uma opção
                    </option>
                    {expenseCategories
                      .slice() // cria uma cópia do array para não alterar o original
                      .sort((a, b) => a.label.localeCompare(b.label)) // ordena o array alfabeticamente
                      .map((it) => (
                        <option key={it.id} value={it.label}>
                          {it.label}
                        </option>
                      ))}
                  </Field>
                  <div onClick={handleAddCategory} className="flex items-center cursor-pointer">
                    <PlusCircle size={32} className="text-gray-600" />
                  </div>
                </div>
                <div className="flex text-red-500 justify-end text-sm">
                  {errors.category && touched.category && errors.category}
                </div>

                <label htmlFor="subcategory">Subcategoria</label>
                <div className="flex gap-1">
                  <Field
                    as="select"
                    name="subcategory"
                    id="subcategory"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full"

                  >
                    {selectedCategory && subcategories
                      .slice() // cria uma cópia do array para não alterar o original
                      .sort((a, b) => a.label.localeCompare(b.label)) // ordena o array alfabeticamente
                      .filter(
                        (it) => it.category_id === selectedCategory.id
                      )
                      .map((it) => (
                        <option key={it.id} value={it.label}>
                          {it.label}
                        </option>
                      )
                      )}
                  </Field>
                  <div onClick={handleAddSubcategory} className="flex items-center cursor-pointer">
                    <PlusCircle size={32} className="text-gray-600" />
                  </div>
                </div>

                <div className="flex text-red-500 justify-end text-sm">
                  {errors.subcategory &&
                    touched.subcategory &&
                    errors.subcategory}
                </div>


                <label htmlFor="description">Descrição</label>
                <Field
                  name="description"
                  id="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="account">Forma de pagamento</label>
                <Field
                  name="account"
                  as="select"
                  id="account"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled>
                    Escolha uma opção
                  </option>
                  {accounts
                    .slice() // cria uma cópia do array para não alterar o original
                    .sort((a, b) => a.label.localeCompare(b.label)) // ordena o array alfabeticamente
                    .filter(it => accessRules[user.role].accountLevel.includes(it.access_level)).map((it) => (
                      <option key={it.id} id={it.label} value={it.label}>
                        {it.label}
                      </option>
                    ))}
                </Field>
                <div className="flex text-red-500 justify-end text-sm">
                  {errors.account &&
                    touched.account &&
                    errors.account}
                </div>
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
                      maxDate={new Date()} // Defina a data máxima como a data atual
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
                    type="reset"
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
      {user?.role === 'ADMIN' && <AddCategoryModal onClose={closeCategoryModal} isOpen={categoryModal} type="EXPENSE" />}
      {user?.role === 'ADMIN' && <AddSubcategoryModal onClose={closeSubcategoryModal} isOpen={subcategoryModal} categories={expenseCategories} />}
    </div >
  )
}
