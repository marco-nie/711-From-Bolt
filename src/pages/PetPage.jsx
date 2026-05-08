import { useState } from 'react'
import { useGame } from '../context/GameContext'
import PetCat from '../components/PetCat'
import HappinessBar from '../components/HappinessBar'
import styles from './PetPage.module.css'

const LEVEL_THRESHOLDS = [0, 3, 7, 13, 20, 30]

export default function PetPage() {
  const { state, reaction, setPetName, toggleCosmetic } = useGame()
  const [editingName, setEditingName] = useState(!state.petName)
  const [tempName, setTempName] = useState(state.petName || '')

  const handleSaveName = () => {
    if (tempName.trim()) {
      setPetName(tempName.trim())
      setEditingName(false)
    }
  }

  const currentThreshold = LEVEL_THRESHOLDS[state.level - 1] ?? 0
  const nextThreshold = LEVEL_THRESHOLDS[state.level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  const levelProgress = state.level >= 5
    ? 100
    : Math.min(100, ((state.totalPurchases - currentThreshold) / (nextThreshold - currentThreshold)) * 100)

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.petSection}>
          <div className={styles.petStage}>
            <PetCat
              happiness={state.happiness}
              activeCosmetics={state.activeCosmetics}
              reaction={reaction}
            />
          </div>

          {editingName ? (
            <div className={styles.nameInput}>
              <input
                type="text"
                placeholder="Name your pet..."
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                maxLength={16}
                autoFocus
                className={styles.input}
              />
              <button onClick={handleSaveName} className={styles.saveBtn}>
                Save
              </button>
            </div>
          ) : (
            <button className={styles.petName} onClick={() => { setEditingName(true); setTempName(state.petName) }}>
              {state.petName} <span className={styles.editIcon}>✏️</span>
            </button>
          )}

          {reaction && (
            <div className={styles.reactionMsg} key={reaction.id}>
              Your pet loved the {reaction.itemName}! {reaction.emoji}
            </div>
          )}
        </div>

        <div className={styles.statsSection}>
          <HappinessBar happiness={state.happiness} />

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{state.level}</span>
              <span className={styles.statLabel}>Level</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{state.totalPurchases}</span>
              <span className={styles.statLabel}>Purchases</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{state.points}</span>
              <span className={styles.statLabel}>Points</span>
            </div>
          </div>

          <div className={styles.nextLevel}>
            <div className={styles.nextLevelHeader}>
              <span className={styles.nextLevelText}>
                {state.level < 5
                  ? `${Math.max(0, nextThreshold - state.totalPurchases)} more to Level ${state.level + 1}`
                  : 'Max Level Reached!'}
              </span>
              <span className={styles.levelLabel}>Lv {state.level}{state.level < 5 ? ` → ${state.level + 1}` : ''}</span>
            </div>
            <div className={styles.levelTrack}>
              <div className={styles.levelFill} style={{ width: `${levelProgress}%` }} />
            </div>
          </div>

          {state.unlockedCosmetics.length > 0 && (
            <div className={styles.cosmeticsSection}>
              <span className={styles.cosmeticsTitle}>Cosmetics</span>
              <div className={styles.cosmeticsList}>
                {state.unlockedCosmetics.map(c => (
                  <button
                    key={c}
                    className={`${styles.cosmeticChip} ${state.activeCosmetics.includes(c) ? styles.active : ''}`}
                    onClick={() => toggleCosmetic(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {state.purchaseHistory.length > 0 && (
            <div className={styles.history}>
              <span className={styles.historyTitle}>Recent Activity</span>
              <div className={styles.historyList}>
                {state.purchaseHistory.slice(0, 5).map((entry, i) => (
                  <div key={i} className={styles.historyItem}>
                    <span>{entry.emoji}</span>
                    <span className={styles.historyName}>{entry.item}</span>
                    <span className={styles.historyBoost}>+happiness</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
