import { createContext, useContext, useState, useEffect } from 'react'

const GameContext = createContext(null)

const ITEMS = [
  { id: 'onigiri', name: 'Onigiri', emoji: '🍙', price: 20, happiness: 15, color: '#FF6600' },
  { id: 'coffee', name: 'Coffee', emoji: '☕', price: 25, happiness: 20, color: '#00703C' },
  { id: 'sandwich', name: 'Sandwich', emoji: '🥪', price: 35, happiness: 25, color: '#E8002D' },
  { id: 'juice', name: 'Juice', emoji: '🧃', price: 15, happiness: 10, color: '#FFD100' },
]

const LEVEL_THRESHOLDS = [0, 3, 7, 13, 20, 30]
const LEVEL_REWARDS = [
  [],
  ['🎩 Top Hat'],
  ['🎩 Top Hat', '🌸 Cherry Background'],
  ['🎩 Top Hat', '🌸 Cherry Background', '🎀 Pink Ribbon'],
  ['🎩 Top Hat', '🌸 Cherry Background', '🎀 Pink Ribbon', '⭐ Gold Star'],
  ['🎩 Top Hat', '🌸 Cherry Background', '🎀 Pink Ribbon', '⭐ Gold Star', '👑 Crown'],
]

const COSMETIC_ACCESSORIES = {
  '🎩 Top Hat': 'hat',
  '🌸 Cherry Background': 'bg',
  '🎀 Pink Ribbon': 'ribbon',
  '⭐ Gold Star': 'star',
  '👑 Crown': 'crown',
}

const initialState = {
  petName: '',
  happiness: 50,
  totalPurchases: 0,
  level: 1,
  points: 0,
  unlockedCosmetics: [],
  activeCosmetics: [],
  purchaseHistory: [],
}

export function GameProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem('711-pet-state')
      return saved ? JSON.parse(saved) : initialState
    } catch {
      return initialState
    }
  })
  const [reaction, setReaction] = useState(null)

  useEffect(() => {
    localStorage.setItem('711-pet-state', JSON.stringify(state))
  }, [state])

  const setPetName = (name) => setState(s => ({ ...s, petName: name }))

  const buyItem = (itemId) => {
    const item = ITEMS.find(i => i.id === itemId)
    if (!item) return

    setState(prev => {
      const newHappiness = Math.min(100, prev.happiness + item.happiness)
      const newPurchases = prev.totalPurchases + 1
      const newPoints = prev.points + item.price
      const newLevel = LEVEL_THRESHOLDS.reduce((lvl, threshold, idx) =>
        newPurchases >= threshold ? idx + 1 : lvl, 1)
      const clampedLevel = Math.min(newLevel, 5)
      const newCosmetics = LEVEL_REWARDS[clampedLevel]

      return {
        ...prev,
        happiness: newHappiness,
        totalPurchases: newPurchases,
        points: newPoints,
        level: clampedLevel,
        unlockedCosmetics: newCosmetics,
        purchaseHistory: [{ item: item.name, emoji: item.emoji, time: Date.now() }, ...prev.purchaseHistory.slice(0, 9)],
      }
    })

    setReaction({ itemName: item.name, emoji: item.emoji, id: Date.now() })
    setTimeout(() => setReaction(null), 2000)
  }

  const toggleCosmetic = (cosmetic) => {
    setState(prev => {
      const active = prev.activeCosmetics.includes(cosmetic)
        ? prev.activeCosmetics.filter(c => c !== cosmetic)
        : [...prev.activeCosmetics, cosmetic]
      return { ...prev, activeCosmetics: active }
    })
  }

  const resetGame = () => {
    setState(initialState)
  }

  const getNextLevelPurchases = () => {
    const nextLevel = Math.min(state.level + 1, 5)
    return LEVEL_THRESHOLDS[nextLevel] - state.totalPurchases
  }

  return (
    <GameContext.Provider value={{
      state,
      reaction,
      items: ITEMS,
      levelThresholds: LEVEL_THRESHOLDS,
      levelRewards: LEVEL_REWARDS,
      cosmeticTypes: COSMETIC_ACCESSORIES,
      setPetName,
      buyItem,
      toggleCosmetic,
      resetGame,
      getNextLevelPurchases,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)
