import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Income from './pages/Income'
import Investments from './pages/Investments'
import NewEntry from './pages/NewEntry'
import Summary from './pages/Summary'
import { RouteData } from './resources/routes'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={RouteData.home.path} element={<Dashboard />} />
      <Route path={RouteData.summary.path} element={<Summary />} />
      <Route path={RouteData.income.path} element={<Income />} />
      <Route path={RouteData.expenses.path} element={<Expenses />} />
      <Route path={RouteData.invest.path} element={<Investments />} />
      <Route path={RouteData.add.path} element={<NewEntry />} />
    </Routes>
  </BrowserRouter>
)

export default App
