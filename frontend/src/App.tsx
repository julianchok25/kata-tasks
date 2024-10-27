import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const [token, setToken] = useState<String>();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <main className='main-container'>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </main>
  )
}

export default App
