import styles from './HappinessBar.module.css'

export default function HappinessBar({ happiness }) {
  const getColor = () => {
    if (happiness >= 70) return '#00703C'
    if (happiness >= 40) return '#FF6600'
    return '#E8002D'
  }

  const getMoodLabel = () => {
    if (happiness >= 80) return 'Ecstatic!'
    if (happiness >= 60) return 'Happy'
    if (happiness >= 40) return 'Okay'
    if (happiness >= 20) return 'Sad'
    return 'Unhappy'
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>Happiness</span>
        <span className={styles.mood} style={{ color: getColor() }}>{getMoodLabel()}</span>
        <span className={styles.value}>{happiness}%</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${happiness}%`, background: `linear-gradient(90deg, ${getColor()}, ${getColor()}cc)` }}
        />
        <div className={styles.shimmer} style={{ width: `${happiness}%` }} />
      </div>
    </div>
  )
}
