import { useGame } from '../context/GameContext'
import styles from './RewardsPage.module.css'

const LEVEL_THRESHOLDS = [0, 3, 7, 13, 20, 30]

const ALL_REWARDS = [
  { level: 1, name: '🎩 Top Hat', desc: 'A classic top hat for your cat!', type: 'hat' },
  { level: 2, name: '🌸 Cherry Background', desc: 'Cherry blossom aura effect', type: 'bg' },
  { level: 3, name: '🎀 Pink Ribbon', desc: 'A cute ribbon accessory', type: 'ribbon' },
  { level: 4, name: '⭐ Gold Star', desc: 'A golden star follower', type: 'star' },
  { level: 5, name: '👑 Crown', desc: 'The royal crown — max prestige!', type: 'crown' },
]

export default function RewardsPage() {
  const { state, toggleCosmetic, resetGame } = useGame()

  const currentThreshold = LEVEL_THRESHOLDS[state.level - 1] ?? 0
  const nextThreshold = LEVEL_THRESHOLDS[state.level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  const levelProgress = state.level >= 5
    ? 100
    : Math.min(100, ((state.totalPurchases - currentThreshold) / (nextThreshold - currentThreshold)) * 100)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>🏆</div>
        <div>
          <h2 className={styles.title}>Rewards</h2>
          <p className={styles.subtitle}>Unlock cosmetics as you level up</p>
        </div>
      </div>

      <div className={styles.levelCard}>
        <div className={styles.levelTop}>
          <div className={styles.levelCircle}>
            <span className={styles.levelNum}>{state.level}</span>
            <span className={styles.levelMax}>/5</span>
          </div>
          <div className={styles.levelInfo}>
            <span className={styles.levelTitle}>
              {state.level === 5 ? 'Max Level' : `Level ${state.level}`}
            </span>
            <span className={styles.levelSub}>
              {state.level < 5
                ? `${Math.max(0, nextThreshold - state.totalPurchases)} purchases to Level ${state.level + 1}`
                : 'All rewards unlocked!'}
            </span>
            <div className={styles.levelTrack}>
              <div className={styles.levelFill} style={{ width: `${levelProgress}%` }} />
            </div>
          </div>
        </div>

        <div className={styles.levelStats}>
          <div className={styles.lStat}>
            <span className={styles.lStatVal}>{state.totalPurchases}</span>
            <span className={styles.lStatLabel}>Purchases</span>
          </div>
          <div className={styles.lStat}>
            <span className={styles.lStatVal}>{state.points}</span>
            <span className={styles.lStatLabel}>Points</span>
          </div>
          <div className={styles.lStat}>
            <span className={styles.lStatVal}>{state.unlockedCosmetics.length}</span>
            <span className={styles.lStatLabel}>Unlocked</span>
          </div>
        </div>
      </div>

      <div className={styles.rewardsList}>
        <span className={styles.sectionTitle}>Cosmetic Rewards</span>
        {ALL_REWARDS.map(reward => {
          const unlocked = state.level >= reward.level
          const active = state.activeCosmetics.includes(reward.name)

          return (
            <div key={reward.name} className={`${styles.rewardItem} ${unlocked ? styles.unlocked : styles.locked}`}>
              <div className={styles.rewardLeft}>
                <div className={styles.rewardEmoji}>{reward.name.split(' ')[0]}</div>
                <div className={styles.rewardInfo}>
                  <span className={styles.rewardName}>{reward.name.slice(2)}</span>
                  <span className={styles.rewardDesc}>{unlocked ? reward.desc : `Unlock at Level ${reward.level}`}</span>
                </div>
              </div>

              <div className={styles.rewardRight}>
                <div className={styles.levelPill} style={{ background: unlocked ? 'rgba(0,112,60,0.2)' : 'rgba(42,63,85,0.8)', borderColor: unlocked ? '#00703C' : '#2A3F55' }}>
                  <span style={{ color: unlocked ? '#00703C' : '#9BAAB8', fontSize: '0.72rem', fontWeight: 700 }}>
                    Lv {reward.level}
                  </span>
                </div>
                {unlocked && (
                  <button
                    className={`${styles.toggleBtn} ${active ? styles.active : ''}`}
                    onClick={() => toggleCosmetic(reward.name)}
                  >
                    {active ? 'ON' : 'OFF'}
                  </button>
                )}
                {!unlocked && <div className={styles.lockIcon}>🔒</div>}
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.milestones}>
        <span className={styles.sectionTitle}>Level Milestones</span>
        <div className={styles.milestonePath}>
          {[1, 2, 3, 4, 5].map(lvl => (
            <div key={lvl} className={styles.milestoneStep}>
              <div className={`${styles.milestoneDot} ${state.level >= lvl ? styles.reached : ''}`}>
                {state.level >= lvl ? '✓' : lvl}
              </div>
              {lvl < 5 && (
                <div className={`${styles.milestoneConnector} ${state.level > lvl ? styles.filled : ''}`} />
              )}
            </div>
          ))}
        </div>
        <div className={styles.milestoneLabels}>
          {[1, 2, 3, 4, 5].map(lvl => (
            <span key={lvl} className={`${styles.milestoneLabel} ${state.level >= lvl ? styles.reached : ''}`}>
              Lv{lvl}
            </span>
          ))}
        </div>
      </div>

      <button className={styles.resetBtn} onClick={() => {
        if (window.confirm('Reset your pet? This cannot be undone.')) resetGame()
      }}>
        Reset Game
      </button>
    </div>
  )
}
