import { useEffect, useState } from 'react'
import { get } from '../api'
import Box from '../components/Box'
import DisplayTable from '../components/DisplayTablePage'
import Navigation from '../components/Navigation'
import BasePage from './Page'

const Investments = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

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
        <DisplayTable data={data} loading={loading} flipTableSign />
      </div>
    </BasePage>
  )
}

export default Investments
