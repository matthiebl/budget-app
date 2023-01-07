const DATABASE_FILE = '/database.json'

export const get = async () => {
  const response = await fetch(DATABASE_FILE)
  const data = await response.text()
  const object = JSON.parse(data.toString())
  return object
}

export const getCTI = async () => {
  const data = await get()
  let categories = []
  let types = []
  let items = []
  for (const category of Object.keys(data)) {
    categories.push(category)
    for (const type of Object.keys(data[category])) {
      types.push(type)
      items.push(...Object.keys(data[category][type]))
    }
  }
  return { categories, types, items }
}
