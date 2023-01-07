import Navigation from '../components/Navigation'
import BasePage from './Page'

const Dashboard = () => {
  return (
    <BasePage navigation={<Navigation />}>
      <h1>Dashboard</h1>
    </BasePage>
  )
}

export default Dashboard
