import { useEffect, useState } from 'react'
import { get } from '../resources/api'
import Box from '../components/Box'
import DisplayTable from '../components/DisplayTablePage'
import Navigation from '../components/Navigation'
import { RouteData } from '../resources/routes'
import BasePage from './Page'

const Expenses = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const onLoad = async () => {
      const data = await get()
      setData(data.expense)
      setLoading(false)
    }
    onLoad()
  }, [])

  return (
    <BasePage navigation={<Navigation />}>
      <div className='flex h-full w-full flex-col gap-4 p-10'>
        <Box>
          <h1 className='text-4xl'>{RouteData.expenses.text}</h1>
        </Box>
        <DisplayTable data={data} loading={loading} />
      </div>
    </BasePage>
  )
}

export default Expenses
