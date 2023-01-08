import fs from 'fs'
import AsyncLock from 'async-lock'
import { InputError } from './errors'
import { DEFAULT } from './default'

const lock = new AsyncLock()

const DATABASE_FILE = './database.json'

let database = {}

const update = database =>
  new Promise((resolve, reject) => {
    lock.acquire('saveData', () => {
      try {
        fs.writeFileSync(DATABASE_FILE, JSON.stringify(database, null, 2))
        resolve()
      } catch {
        reject(new Error('Writing to database failed'))
      }
    })
  })

export const save = () => update(database)
export const reset = () => {
  database = DEFAULT
  update(database)
}

try {
  database = JSON.parse(fs.readFileSync(DATABASE_FILE))
} catch {
  console.log('WARNING: No database found, create a new one')
  database = DEFAULT
  save(DEFAULT)
}

const newId = () => generateId(Object.keys(all))

const generateId = taken => {
  let id = crypto.randomUUID()
  if (taken.includes(id)) return generateId(taken)
  return id
}

export const resourceLock = callback =>
  new Promise((resolve, reject) => {
    lock.acquire('resourceLock', callback(resolve, reject))
  })

export const getCategories = () =>
  resourceLock((resolve, reject) => {
    resolve(database.categories)
  })

export const getAll = () =>
  resourceLock((resolve, reject) => {
    resolve(database.all)
  })

export const postTransaction = (
  title,
  description,
  category,
  type,
  item,
  amount,
  date
) =>
  resourceLock((resolve, reject) => {
    try {
      const list = database.categories[category][type][item]
    } catch (err) {
      reject(new InputError('Invalid category, type or item'))
    }
    try {
      const cost = parseFloat(amount)
    } catch (err) {
      reject(new InputError('Amount is not a number'))
    }
    const id = newId()
    const transaction = {
      id,
      title,
      description,
      amount: parseFloat(amount),
      date,
      category,
      type,
      item,
    }
    database.categories[category][type][item].push(transaction)
    database.all[id] = transaction
    resolve(transaction)
  })

export const getTransaction = id =>
  resourceLock((resolve, reject) => {
    if (Object.keys(database.all).includes(id)) resolve(database.all[id])
    else reject(new InputError('Invlid id'))
  })
