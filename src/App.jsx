import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Game from './components/Tictactoe'
import Chess from './components/Chess'
import List from './components/Todo'
import Fundamental from './components/FundamentalPractice'
import './App.css'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/chess" element={<Chess />} />
      <Route path="/todo" element={<List />} />
      <Route path="/fundamental" element={<Fundamental />} />
    </Routes>
    </>
  )
}

export default App
