import { useState } from 'react'
import { useGame } from '../context/GameContext'
import styles from './StorePage.module.css'

export default function StorePage() {
  const { items, buyItem, state, reaction } = useGame()
  const [lastBought, setLastBought] = useState(null)
  const [animating, setAnimating] = useState(null)

  const handleBuy = (item) => {
    buyItem(item.id)
    setLastBought(item)
    setAnimating(item.id)
    setTimeout(() => setAnimating(null), 600)
  }

  const HAPPINESS_EFFECTS = { onigiri: '+15', coffee: '+20', sandwich: '+25', juice: '+10' }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>🏪</div>
        <div>
          <h2 className={styles.title}>711 Store</h2>
          <p className={styles.subtitle}>Feed your pet with your favorite snacks</p>
        </div>
      </div>

      {reaction && lastBought && (
        <div className={styles.toast} key={reaction.id}>
          <span className={styles.toastEmoji}>{lastBought.emoji}</span>
          <span>Your pet loved the <strong>{lastBought.name}</strong>!</span>
        </div>
      )}

      <div className={styles.grid}>
        {items.map(item => (
          <button
            key={item.id}
            className={`${styles.itemCard} ${animating === item.id ? styles.bounce : ''}`}
            onClick={() => handleBuy(item)}
            style={{ '--item-color': item.color }}
          >
            <div className={styles.itemGlow} />
            <div className={styles.itemEmoji}>{item.emoji}</div>
            <div className={styles.itemName}>{item.name}</div>
            <div className={styles.itemHappiness}>
              <span className={styles.happinessIcon}>❤️</span>
              {HAPPINESS_EFFECTS[item.id]}
            </div>
            <div className={styles.itemPrice}>
              <span className={styles.priceIcon}>⭐</span>
              {item.price} pts
            </div>
            <div className={styles.buyLabel}>Tap to Buy</div>
          </button>
        ))}
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>💡</span>
          <span className={styles.infoText}>Each purchase increases your pet's happiness and earns points toward the next level!</span>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.miniStat}>
          <span className={styles.miniValue}>{state.totalPurchases}</span>
          <span className={styles.miniLabel}>Total Purchases</span>
        </div>
        <div className={styles.miniStat}>
          <span className={styles.miniValue}>{state.points}</span>
          <span className={styles.miniLabel}>Points Earned</span>
        </div>
        <div className={styles.miniStat}>
          <span className={styles.miniValue}>Lv {state.level}</span>
          <span className={styles.miniLabel}>Current Level</span>
        </div>
      </div>
    </div>
  )
}
