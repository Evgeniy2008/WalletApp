import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TransactionsList from './screens/TransactionsList'
import TransactionDetail from './screens/TransactionDetail'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransactionsList />} />
        <Route path="/tx/:id" element={<TransactionDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
