export const collect = obj => {
  if (Array.isArray(obj)) return obj
  let collection = []
  for (const v of Object.values(obj)) collection.push(...collect(v))
  return collection
}
