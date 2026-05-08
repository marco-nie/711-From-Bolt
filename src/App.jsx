import { Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import PetPage from './pages/PetPage'
import StorePage from './pages/StorePage'
import RewardsPage from './pages/RewardsPage'

export default function App() {
  return (
    <GameProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pet" element={<PetPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/rewards" element={<RewardsPage />} />
      </Routes>
    </GameProvider>
  )
}
