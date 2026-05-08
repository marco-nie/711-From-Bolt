import { useNavigate } from 'react-router-dom'
import styles from './HomePage.module.css'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.logoBlock}>
          <span className={styles.logoRed}>7</span>
          <span className={styles.logoDash}>-</span>
          <span className={styles.logoGreen}>ELEVEn</span>
        </div>
        <h1 className={styles.headline}>Virtual Pet Project</h1>
        <p className={styles.tagline}>
          Shop. Feed. Level up your buddy.
        </p>

        <div className={styles.petPreview}>
          <div className={styles.previewGlow} />
          <svg viewBox="0 0 200 220" className={styles.previewCat}>
            <path d="M 155 175 Q 185 150 175 125 Q 165 105 155 120" stroke="#e8c88a" strokeWidth="10" fill="none" strokeLinecap="round" />
            <ellipse cx="100" cy="168" rx="52" ry="42" fill="#f5dba0" />
            <ellipse cx="100" cy="160" rx="48" ry="38" fill="#f0d090" />
            <ellipse cx="100" cy="172" rx="28" ry="22" fill="#fff8ec" />
            <ellipse cx="100" cy="105" rx="48" ry="44" fill="#f5dba0" />
            <polygon points="58,72 46,42 78,62" fill="#f5dba0" />
            <polygon points="142,72 154,42 122,62" fill="#f5dba0" />
            <polygon points="62,68 52,48 76,62" fill="#f0b0b0" />
            <polygon points="138,68 148,48 124,62" fill="#f0b0b0" />
            <ellipse cx="88" cy="102" rx="8" ry="8.5" fill="#5a3a1a" />
            <ellipse cx="112" cy="102" rx="8" ry="8.5" fill="#5a3a1a" />
            <ellipse cx="85" cy="99" rx="2.5" ry="2.5" fill="white" />
            <ellipse cx="109" cy="99" rx="2.5" ry="2.5" fill="white" />
            <ellipse cx="100" cy="113" rx="4" ry="3" fill="#e88090" />
            <path d="M 92 119 Q 100 126 110 119" stroke="#c87080" strokeWidth="2" fill="none" strokeLinecap="round" />
            <line x1="65" y1="111" x2="88" y2="114" stroke="#d0a060" strokeWidth="1.5" opacity="0.8" />
            <line x1="65" y1="116" x2="88" y2="116" stroke="#d0a060" strokeWidth="1.5" opacity="0.8" />
            <line x1="112" y1="114" x2="135" y2="111" stroke="#d0a060" strokeWidth="1.5" opacity="0.8" />
            <line x1="112" y1="116" x2="135" y2="116" stroke="#d0a060" strokeWidth="1.5" opacity="0.8" />
            <ellipse cx="74" cy="116" rx="9" ry="6" fill="#ffb0b0" opacity="0.4" />
            <ellipse cx="126" cy="116" rx="9" ry="6" fill="#ffb0b0" opacity="0.4" />
            <ellipse cx="68" cy="200" rx="18" ry="12" fill="#f5dba0" />
            <ellipse cx="132" cy="200" rx="18" ry="12" fill="#f5dba0" />
          </svg>
        </div>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🛒</span>
            <span className={styles.featureText}>Shop 711 items</span>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>⬆️</span>
            <span className={styles.featureText}>Level up to 5</span>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎁</span>
            <span className={styles.featureText}>Unlock rewards</span>
          </div>
        </div>

        <button className={styles.startBtn} onClick={() => navigate('/pet')}>
          Start Playing
        </button>
      </div>
    </div>
  )
}
