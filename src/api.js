const DATABASE_FILE = '/database.json'

export const get = async () => {
  const response = await fetch(DATABASE_FILE)
  const data = await response.text()
  const object = JSON.parse(data.toString())
  console.log(object)
  return object
}
