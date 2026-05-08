import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import { useGame } from '../context/GameContext'

export default function NavBar() {
  const { state } = useGame()

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.logo}>
          <span className={styles.logoRed}>7</span>
          <span className={styles.logoDash}>-</span>
          <span className={styles.logoGreen}>ELEVEn</span>
        </span>
        <span className={styles.title}>Virtual Pet Project</span>
      </div>

      <div className={styles.links}>
        <NavLink to="/" end className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
          Home
        </NavLink>
        <NavLink to="/pet" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
          My Pet
        </NavLink>
        <NavLink to="/store" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
          Store
        </NavLink>
        <NavLink to="/rewards" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
          Rewards
        </NavLink>
      </div>

      <div className={styles.levelBadge}>
        <span className={styles.levelLabel}>LV</span>
        <span className={styles.levelNum}>{state.level}</span>
      </div>
    </nav>
  )
}
