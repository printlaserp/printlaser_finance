import { Formik, Form, Field } from "formik"
import { enqueueSnackbar } from "notistack"
import Modal from "../Modal"
import * as Yup from "yup"
import { useAppData } from "@/contexts/initialDataContext"

type AddCategoryModalProps = {
    onClose: () => void
    isOpen: boolean
    type: "INCOME" | "EXPENSE"
}
const validationSchema = Yup.object().shape({
    label: Yup.string().required("O campo label é obrigatório"),
})


export default function AddCategoryModal({ onClose, isOpen, type }: AddCategoryModalProps) {
    const { reloadAppData } = useAppData()

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <Formik
                className="w-full"
                initialValues={{
                    label: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    const res = await fetch(
                        `/api/cashFlow/categories/create`,
                        {
                            method: "POST",
                            body: JSON.stringify({ ...values, type: type }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )

                    const data = await res.json()

                    if (res.status === 201) {
                        enqueueSnackbar("Nova categoria criada com sucesso!", {
                            variant: "success",
                        })
                        onClose()
                        reloadAppData()
                    } else {
                        enqueueSnackbar(
                            `Error ao criar a categoria. ${data.conflict}`,
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
                    <Form className="w-full p-4 ">
                        <h1 className="text-xl font-bold text-gray-500 mb-4">Nova Categoria</h1>
                        <div className="flex flex-col gap-1">
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
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
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
                    </Form>
                )
                }
            </Formik >
        </Modal>
    )
}