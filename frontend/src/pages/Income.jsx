import { useEffect, useState } from 'react'
import { get } from '../api'
import Box from '../components/Box'
import Button from '../components/Button'
import Card from '../components/Card'
import Navigation from '../components/Navigation'
import Table from '../components/Table'
import BasePage from './Page'

const Income = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const [view, setView] = useState(views[0])

  useEffect(() => {
    const onLoad = async () => {
      const data = await get()
      setData(data.income)
      setLoading(false)
    }
    onLoad()
  }, [])

  return (
    <BasePage navigation={<Navigation />}>
      <div className='flex h-full w-full flex-col gap-4 p-10'>
        <Box>
          <h1 className='text-4xl'>Income</h1>
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
                <h2 className='text-xl capitalize'>{type}</h2>
                {Object.keys(data[type]).map(item => (
                  <h3 key={item} className='capitalize'>
                    {item}
                  </h3>
                ))}
              </Card>
            ))}
          <Card>
            <Table headers={table.headers} rows={table.rows} />
          </Card>
        </div>
      </div>
    </BasePage>
  )
}

export default Income

const views = ['Monthly', 'Quarterly', 'Yearly']

const table = {
  headers: ['Wages', '1', '2', '3', '4', '5', '6'],
  rows: [
    ['Paycheck', 100, 1, 200, 4000, 229, 1000],
    ['Paycheck', 100, 1, 200, 4000, 229, 1000],
    ['Paycheck', 100, 1, 200, 4000, 229, 1000],
    ['Paycheck', 100, 1, 200, 4000, 229, 1000],
  ],
}
