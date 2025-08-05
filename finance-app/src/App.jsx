import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <Header />
        <main className='flex-grow-1 container py-4'>
          <Routes>
            <Route path='/' element={<Dashboard />}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
