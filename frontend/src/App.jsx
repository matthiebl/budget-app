import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Income from './pages/Income'
import NewEntry from './pages/NewEntry'
import { RouteData } from './resources/routes'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={RouteData.home.path} element={<Dashboard />} />
      <Route path={RouteData.accmain.path} element={<Dashboard />} />
      <Route path={RouteData.accsaving.path} element={<Dashboard />} />
      <Route path={RouteData.income.path} element={<Income />} />
      <Route path={RouteData.expenses.path} element={<Dashboard />} />
      <Route path={RouteData.invest.path} element={<Dashboard />} />
      <Route path={RouteData.add.path} element={<NewEntry />} />
    </Routes>
  </BrowserRouter>
)

export default App
