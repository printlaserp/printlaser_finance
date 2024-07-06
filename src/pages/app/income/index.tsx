import AddCategoryModal from '@/components/AddCategoryModal'
import AddSubcategoryModal from '@/components/AddSubtegoryModal'
import CardPaymetMethodModal from '@/components/CardPaymetMethodModal'
import { CurrencyInput } from '@/components/CurrencyInput'
import Progress from '@/components/Progress'
import { useAppData } from '@/contexts/initialDataContext'
import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown'
import { CaretUp } from '@phosphor-icons/react/dist/ssr/CaretUp'
import { PlusCircle } from '@phosphor-icons/react/dist/ssr/PlusCircle'
import { Field, Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import * as Yup from 'yup'
import { accessRules } from '../../../rules'

const validationSchema = Yup.object().shape({
  value: Yup.string().required('O campo Valor é obrigatório'),
  category: Yup.string().required('Selecione uma categoria'),
  account: Yup.string().required('Selecione uma forma de pagamento')
})

let defaultCategory = 'PrintLaser (Especie)'

export default function Incoming() {
  const { accounts, categories, subcategories, user } = useAppData()
  const incomeCategories = categories.filter((it) => it.type === 'INCOME')

  if (!user || !categories || !subcategories || !accounts) {
    return <Progress variant="screen" />
  }

  const { enqueueSnackbar } = useSnackbar()

  // const [selectedCategory, setSelectedCategory] = useState<{
  //   id: string | undefined
  //   label: string | undefined
  // }>({
  //   label: defaultCategory,
  //   id: categories.find((it) => it.label == defaultCategory)?.id
  // })
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string | undefined
    label: string | undefined
  }>()
  const [moreOptions, setMoreOptions] = useState(false)
  const [categoryModal, setCategoryModal] = useState(false)
  const [subcategoryModal, setSubcategoryModal] = useState(false)
  const [cardPaymetMethodModalState, setCardPaymetMethodModalState] =
    useState(false)

  const handleMoreOptions = () => {
    setMoreOptions(!moreOptions)
  }

  const closeSubcategoryModal = () => {
    setSubcategoryModal(false)
  }

  const closeCategoryModal = () => {
    setCategoryModal(false)
  }

  const closeCardPaymentMethodModal = () => {
    setCardPaymetMethodModalState(false)
  }

  const openCardPaymentMethodModal = () => {
    setCardPaymetMethodModalState(true)
  }

  const handleAddSubcategory = () => {
    setSubcategoryModal(true)
  }

  const handleAddCategory = () => {
    setCategoryModal(true)
  }

  return (
    <div className="flex flex-col h-fit min-h-screen justify-center rounded-sm items-center  p-4">
      <Formik
        className="w-full"
        initialValues={{
          value: '',
          category: '',
          subcategory: 'Outros',
          date: new Date(),
          description: '',
          account: '',
          observation: '',
          cardType: 'debit',
          recurrence: '1',
          cardBanner: 'visa'
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          const {
            value,
            category,
            subcategory,
            description,
            account,
            observation,
            cardType,
            cardBanner,
            recurrence,
            date
          } = values

          if (!cardBanner || !cardType) {
            openCardPaymentMethodModal()
            return
          }

          console.log({
            value: Number(value),
            category: categories.find((it) => it.label === category)?.id,
            subcategory: subcategories.find((it) => it.label === subcategory)
              ?.id,
            description:
              description ||
              subcategories.find((it) => it.label === subcategory)?.label ||
              'Outros',
            account_id: accounts.find((it) => it.label === account)?.id,
            observation: observation,
            create_at: date,
            card_type: cardType,
            card_banner: cardBanner,
            recurrence: Number(recurrence),
            card_payment_method: accounts.find((it) => it.label === account)
              ?.is_card_account, //Receita no cartão
            userId: user?.id
          })

          const res = await fetch('/api/cashFlow/incomes/create', {
            method: 'POST',
            body: JSON.stringify({
              value: Number(value),
              category: categories.find((it) => it.label === category)?.id,
              subcategory: subcategories.find((it) => it.label === subcategory)
                ?.id,
              description:
                description ||
                subcategories.find((it) => it.label === subcategory)?.label ||
                'Outros',
              account_id: accounts.find((it) => it.label === account)?.id,
              observation: observation,
              create_at: date,
              card_type: cardType,
              card_banner: cardBanner,
              recurrence: Number(recurrence),
              card_payment_method: accounts.find((it) => it.label === account)
                ?.is_card_account, //Receita no cartão
              userId: user?.id
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (res.status === 201) {
            enqueueSnackbar('Nova entrada salva com sucesso!', {
              variant: 'success'
            })
          } else {
            enqueueSnackbar(
              `Error ao salvar a receita! Mensagem de erro: ${res.statusText}`,
              {
                variant: 'error'
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
          values
        }) => (
          <div className="flex flex-col w-11/12 max-w-sm  rounded-lg items-center bg-slate-100 ">
            <div className="rounded-t-lg h-2 bg-green-600 w-full"></div>
            <h1 className="text-xl font-bold text-gray-500 mt-4">
              Nova Receita
            </h1>
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
                    as="select"
                    className="w-full"
                    onChange={(e: any) => {
                      const option = e.currentTarget.value as string
                      const categoryId = categories.find(
                        (it) => it.label === option
                      )?.id
                      setSelectedCategory({ label: option, id: categoryId })
                      handleChange(e)
                    }}
                    onBlur={handleBlur}
                  >
                    <option defaultChecked value="" disabled>
                      Escolha uma opção
                    </option>
                    {incomeCategories
                      .slice() // cria uma cópia do array para não alterar o original
                      .sort((a, b) => a.label.localeCompare(b.label)) // ordena o array alfabeticamente
                      .map((it) => (
                        <option key={it.id} value={it.label}>
                          {it.label}
                        </option>
                      ))}
                  </Field>

                  <div
                    onClick={handleAddCategory}
                    className="flex items-center cursor-pointer"
                  >
                    {user?.role === 'ADMIN' && (
                      <PlusCircle size={32} className="text-gray-600" />
                    )}
                  </div>
                </div>
                <div className="flex text-red-500 justify-end text-sm">
                  {errors.category && touched.category}
                </div>
                <label htmlFor="subcategory">Subcategoria</label>
                <div className="flex gap-1">
                  <Field
                    as="select"
                    name="subcategory"
                    id="subcategory"
                    className="w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {subcategories
                      .slice() // cria uma cópia do array para não alterar o original
                      .sort((a, b) => a.label.localeCompare(b.label)) // ordena o array alfabeticamente
                      .filter((it) => it.category_id === selectedCategory?.id)
                      .map((it) => {
                        return (
                          <option key={it.id} value={it.label}>
                            {it.label}
                          </option>
                        )
                      })}
                  </Field>
                  <div
                    onClick={handleAddSubcategory}
                    className="flex items-center cursor-pointer"
                  >
                    {user?.role === 'ADMIN' && (
                      <PlusCircle size={32} className="text-gray-600" />
                    )}
                  </div>
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
                  onChange={(e: any) => {
                    const option = e.currentTarget.value
                    const isCardAccount = accounts.find(
                      (it) => it.label === option
                    )?.is_card_account
                    isCardAccount && openCardPaymentMethodModal()
                    handleChange(e)
                  }}
                  onBlur={handleBlur}
                >
                  <option defaultChecked value="" disabled>
                    Escolha uma opção
                  </option>
                  {accounts
                    .slice() // cria uma cópia do array para não alterar o original
                    .sort((a, b) => a.label.localeCompare(b.label)) // ordena o array alfabeticamente
                    .filter((it) =>
                      accessRules[user.role].accountLevel.includes(
                        it.access_level
                      )
                    )
                    .map((it) => (
                      <option key={it.id} id={it.label} value={it.label}>
                        {it.label}
                      </option>
                    ))}
                </Field>
                <div className="flex text-red-500 justify-end text-sm">
                  {errors.account && touched.account && errors.account}
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
                      selected={getFieldProps('date').value}
                      onChange={(date) => {
                        setFieldValue('date', date)
                      }}
                      dateFormat="dd/MM/yyyy"
                      maxDate={new Date()} // Defina a data máxima como a data atual
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
                    className={` ${
                      isSubmitting ? 'opacity-50' : ''
                    } bg-transparent hover:bg-[#008282] text-amber-700 hover:text-white text-sm py-2 px-4 border border-amber-500 hover:border-transparent rounded`}
                  >
                    Limpar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${
                      isSubmitting
                        ? 'bg-[#008282] opacity-50'
                        : 'bg-[#008282] hover:bg-[#008282]'
                    } text-sm text-white py-2 px-4 border border-[#008282] rounded`}
                  >
                    Criar
                  </button>
                </div>
              </div>
              {isSubmitting && <Progress variant="opacity" />}
              <CardPaymetMethodModal
                values={values}
                onClose={closeCardPaymentMethodModal}
                isOpen={cardPaymetMethodModalState}
                formField={Field}
                errors={errors}
              />
            </Form>
          </div>
        )}
      </Formik>
      <AddCategoryModal
        onClose={closeCategoryModal}
        isOpen={categoryModal}
        type="INCOME"
      />
      <AddSubcategoryModal
        onClose={closeSubcategoryModal}
        isOpen={subcategoryModal}
        categories={incomeCategories}
      />
    </div>
  )
}
