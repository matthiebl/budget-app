import Box from '../components/Box'
import Button from '../components/Button'
import Card from '../components/Card'
import Navigation from '../components/Navigation'
import BasePage from './Page'

const Dashboard = () => {
  return (
    <BasePage navigation={<Navigation />}>
      <div className='flex h-full w-full gap-10 p-10'>
        <div className='flex h-full flex-grow flex-col gap-8'>
          <Box>
            <h1 className='text-4xl'>Finances</h1>
            <h1 className='text-4xl'>Dashboard</h1>
          </Box>
          <div className='flex gap-8'>
            <Card>Dashboard</Card>
            <Card>Dashboard</Card>
          </div>
          <Card
            className='flex-grow bg-gradient-to-br from-secondary-500 to-primary-900'
            background
          >
            Dashboard
          </Card>
          <div className='flex gap-8'>
            <Card>Dashboard</Card>
            <Card>Dashboard</Card>
          </div>
        </div>

        <div className='flex h-full w-80 flex-col gap-8'>
          <div className='flex justify-evenly gap-4'>
            <Button variant='text'>Daily</Button>
            <Button variant='text'>Monthly</Button>
            <Button variant='text'>Quarterly</Button>
            <Button variant='text'>Yearly</Button>
          </div>
          <Card className='flex-grow'></Card>
          <Card></Card>
          <Card className='flex-grow'></Card>
          <Card></Card>
        </div>
      </div>
    </BasePage>
  )
}

export default Dashboard
