import { FieldProps } from "formik"
import React, { ChangeEvent } from "react"

export const CurrencyInput: React.FC<FieldProps<number>> = ({
  field,
  form,
  ...props
}) => {
  const { name } = field
  const { setFieldValue, getFieldProps } = form

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const cleanValue = inputValue.replace(/[^0-9.]/g, "")
    const numericValue = parseInt(cleanValue.replace(/[^0-9]/g, ""))

    if (!isNaN(numericValue)) {
      setFieldValue(name, numericValue / 100)
    } else {
      setFieldValue(name, "")
    }
  }

  return (
    <input
      {...props}
      value={formatter.format(getFieldProps("value").value)}
      name={name}
      onChange={handleChange}
      placeholder="R$ 0,00"
    />
  )
}
