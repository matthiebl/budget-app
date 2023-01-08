import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import {
  getAll,
  getCategories,
  getTransaction,
  postTransaction,
} from './service'

import { InputError, AccessError } from './errors'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(morgan(':method :url :status'))

const catchErrors = fn => async (req, res) => {
  try {
    if (req.method === 'GET') {
      console.log(`Query params are ${JSON.stringify(req.params)}`)
    } else {
      console.log(`Body params are ${JSON.stringify(req.body)}`)
    }
    await fn(req, res)
    save()
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message })
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message })
    } else {
      console.log(err)
      res.status(500).send({ error: 'A system error ocurred' })
    }
  }
}

app.get(
  '/all',
  catchErrors(async (req, res) => {
    return res.status(200).json(await getAll())
  })
)

app.get(
  '/categories',
  catchErrors(async (req, res) => {
    return res.status(200).json(await getCategories())
  })
)

app.get(
  '/transaction/:id',
  catchErrors(async (req, res) => {
    const { id } = req.params
    return res.status(200).json(await getTransaction(id))
  })
)

app.post(
  '/transaction',
  catchErrors(async (req, res) => {
    const { title, description, category, type, item, amount, date } =
      req.params
    return res
      .status(200)
      .json(
        await postTransaction(
          title,
          description,
          category,
          type,
          item,
          amount,
          date
        )
      )
  })
)

const server = app.listen(5009, () => {
  console.log('Backend now running on port 5009')
})

export default server
