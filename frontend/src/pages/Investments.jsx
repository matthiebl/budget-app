import { useEffect, useState } from 'react'
import { get } from '../api'
import Box from '../components/Box'
import Button from '../components/Button'
import Card from '../components/Card'
import Navigation from '../components/Navigation'
import Table from '../components/Table'
import BasePage from './Page'

const Investments = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const [view, setView] = useState(views[0])

  useEffect(() => {
    const onLoad = async () => {
      const data = await get()
      setData(data.investment)
      setLoading(false)
    }
    onLoad()
  }, [])

  return (
    <BasePage navigation={<Navigation />}>
      <div className='flex h-full w-full flex-col gap-4 p-10'>
        <Box>
          <h1 className='text-4xl'>Investments</h1>
        </Box>
        <div className='flex justify-evenly gap-4'>
          {views.map((v, index) => (
            <Button
              key={index}
              text={v}
              variant='text'
              onClick={() => setView(v)}
              className={view === v ? 'underline' : ''}
            />
          ))}
        </div>
        <div className='flex flex-col gap-10'>
          {!loading &&
            Object.keys(data).map(type => (
              <Card key={type}>
                <Table
                  headers={[type, ...headers[view]]}
                  rows={formatRows(view, data[type])}
                  flipSign
                />
              </Card>
            ))}
        </div>
      </div>
    </BasePage>
  )
}

export default Investments

const views = ['Monthly', 'Quarterly', 'Yearly']
const headers = {
  Monthly: ['W1', 'W2', 'W3', 'W4'],
  Quarterly: ['Q1', 'Q2', 'Q3', 'Q4'],
  Yearly: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
}
const viewCols = { Monthly: 4, Quarterly: 4, Yearly: 12 }

const formatRow = (view, transactions) => {
  let cols = []
  for (let i = 0; i < viewCols[view]; i++)
    cols.push(transactions.reduce((total, t) => total + t.amount, 0))
  return cols
}

const formatRows = (view, items) => {
  return Object.keys(items).map(item => [item, ...formatRow(view, items[item])])
}
