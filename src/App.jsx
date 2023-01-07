import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { RouteData } from './resources/routes'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={RouteData.home.path} element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
)

export default App
