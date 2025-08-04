import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import Debt from './pages/Debt'
import Transactions from "./pages/Transactions"
import Accounts from "./pages/Accounts"
import Assets from "./pages/Assets"
import AiInsights from "./pages/AiInsights"
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Protected/Main Layout Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="debts" element={<Debt />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="assets" element={<Assets />} />
          <Route path="ai-insights" element={<AiInsights />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
