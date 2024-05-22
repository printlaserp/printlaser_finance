import Progress from "@/components/Progress"
import { useAppData } from "@/contexts/initialDataContext"
import { Field, Form, Formik } from "formik"
import { useSnackbar } from "notistack"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  name: Yup.string().required("O campo Nome é obrigatório"),
  phone: Yup.string().required("O campo Valor é obrigatório"),
})

interface CreateClientProps {
  onClose: () => void
}

export default function CreateClient({ onClose }: CreateClientProps) {
  const { user } = useAppData()

  if (!user) {
    return <Progress variant="screen" />
  }

  const { enqueueSnackbar } = useSnackbar()

  return (
    <div className="flex flex-col h-fit justify-center rounded-sm items-center p-4">
      <Formik
        className="w-full"
        initialValues={{
          name: "",
          address: "",
          phone: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          const {
            name,
            address,
            phone,
            description,
          } = values

          const res = await fetch(
            "/api/client",
            {
              method: "POST",
              body: JSON.stringify({
                name,
                address,
                phone,
                description,
                user_id: user.id
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )

          if (res.status === 201) {
            enqueueSnackbar("Cliente criado com sucesso!", {
              variant: "success",
            })
            onClose()
          } else {
            enqueueSnackbar(
              `Erro ao cliar o cliente! Mensagem de erro: ${res.statusText}`,
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
          values
        }) => (
          <>
            <h1 className="text-xl font-bold text-gray-500">Novo cliente</h1>
            <Form className="w-full p-4">
              <div className="flex flex-col gap-1">

                <label htmlFor="name">Nome do cliente</label>
                <Field
                  name="name"
                  id="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="flex text-red-500 justify-end text-sm">
                  {errors.name &&
                    touched.name &&
                    errors.name}
                </div>

                <label htmlFor="address">Endereço</label>
                <Field
                  name="address"
                  id="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <label htmlFor="phone">Whatsapp/Celular</label>
                <Field
                  name="phone"
                  id="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="flex text-red-500 justify-end text-sm">
                  {errors.phone &&
                    touched.phone &&
                    errors.phone}
                </div>

                <label htmlFor="description">Descrição</label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="reset"
                    disabled={isSubmitting}
                    className={` ${isSubmitting ? 'opacity-50' : ''
                      } bg-transparent hover:bg-[#008282] text-amber-700 hover:text-white text-sm py-2 px-4 border border-amber-500 hover:border-transparent rounded`}
                  >
                    Limpar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${isSubmitting ? 'bg-[#008282] opacity-50' : 'bg-[#008282] hover:bg-[#008282]'
                      } text-sm text-white py-2 px-4 border border-[#008282] rounded`}
                  >
                    Criar
                  </button>
                </div>
              </div>
              {isSubmitting && <Progress variant="opacity" />}
            </Form>
          </>
        )
        }
      </Formik >
    </div >
  )
}

