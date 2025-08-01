import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Payment from './components/Payment'

function App() {
  return (
    <div className="container mt-4">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  )
}

export default App;