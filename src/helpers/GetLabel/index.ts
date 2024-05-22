export default function findLabel(arr: any[], id: string | undefined) {
  const item = arr.find((it) => it.id === id)
  return item ? item.label : null
}
