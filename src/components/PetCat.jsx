import { useEffect, useRef, useState } from 'react'
import styles from './PetCat.module.css'

export default function PetCat({ happiness, activeCosmetics, reaction }) {
  const [mood, setMood] = useState('idle')
  const [blinking, setBlinking] = useState(false)
  const blinkRef = useRef(null)
  const moodRef = useRef(null)

  useEffect(() => {
    if (happiness >= 70) setMood('happy')
    else if (happiness >= 40) setMood('idle')
    else setMood('sad')
  }, [happiness])

  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 3000
      blinkRef.current = setTimeout(() => {
        setBlinking(true)
        setTimeout(() => setBlinking(false), 200)
        scheduleBlink()
      }, delay)
    }
    scheduleBlink()
    return () => clearTimeout(blinkRef.current)
  }, [])

  useEffect(() => {
    if (reaction) {
      setMood('excited')
      moodRef.current = setTimeout(() => {
        setMood(happiness >= 70 ? 'happy' : happiness >= 40 ? 'idle' : 'sad')
      }, 1800)
    }
    return () => clearTimeout(moodRef.current)
  }, [reaction])

  const hasHat = activeCosmetics.includes('🎩 Top Hat')
  const hasCrown = activeCosmetics.includes('👑 Crown')
  const hasRibbon = activeCosmetics.includes('🎀 Pink Ribbon')
  const hasStar = activeCosmetics.includes('⭐ Gold Star')
  const hasBg = activeCosmetics.includes('🌸 Cherry Background')

  const eyesClosed = blinking
  const eyeHappy = mood === 'happy' || mood === 'excited'
  const eyeSad = mood === 'sad'

  return (
    <div className={`${styles.petWrapper} ${mood === 'excited' ? styles.excited : ''}`}>
      {hasBg && <div className={styles.bgEffect} />}

      <div className={styles.petContainer}>
        {hasStar && <div className={styles.star}>⭐</div>}

        <svg
          viewBox="0 0 200 220"
          className={`${styles.cat} ${styles[mood]}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* tail */}
          <path
            className={styles.tail}
            d="M 155 175 Q 185 150 175 125 Q 165 105 155 120"
            stroke="#e8c88a" strokeWidth="10" fill="none" strokeLinecap="round"
          />

          {/* body */}
          <ellipse cx="100" cy="168" rx="52" ry="42" fill="#f5dba0" />
          <ellipse cx="100" cy="160" rx="48" ry="38" fill="#f0d090" />

          {/* belly */}
          <ellipse cx="100" cy="172" rx="28" ry="22" fill="#fff8ec" />

          {/* stripes on body */}
          <path d="M 68 148 Q 72 158 68 168" stroke="#e8c070" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 132 148 Q 128 158 132 168" stroke="#e8c070" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* head */}
          <ellipse cx="100" cy="105" rx="48" ry="44" fill="#f5dba0" />

          {/* ears */}
          <polygon points="58,72 46,42 78,62" fill="#f5dba0" />
          <polygon points="142,72 154,42 122,62" fill="#f5dba0" />
          <polygon points="62,68 52,48 76,62" fill="#f0b0b0" />
          <polygon points="138,68 148,48 124,62" fill="#f0b0b0" />

          {/* forehead stripe */}
          <path d="M 88 78 Q 92 70 100 68 Q 108 70 112 78" stroke="#e8c070" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 91 74 Q 100 65 109 74" stroke="#e8c070" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* eyes */}
          {eyesClosed ? (
            <>
              <path d="M 82 102 Q 88 97 94 102" stroke="#5a3a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 106 102 Q 112 97 118 102" stroke="#5a3a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : eyeHappy ? (
            <>
              <path d="M 80 100 Q 88 94 96 100" stroke="#5a3a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 104 100 Q 112 94 120 100" stroke="#5a3a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          ) : eyeSad ? (
            <>
              <ellipse cx="88" cy="103" rx="8" ry="7" fill="#5a3a1a" />
              <ellipse cx="112" cy="103" rx="8" ry="7" fill="#5a3a1a" />
              <ellipse cx="85" cy="101" rx="2.5" ry="2.5" fill="white" />
              <ellipse cx="109" cy="101" rx="2.5" ry="2.5" fill="white" />
              <path d="M 80 96 Q 88 99 96 96" stroke="#c8a06a" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 104 96 Q 112 99 120 96" stroke="#c8a06a" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx="88" cy="102" rx="8" ry="8.5" fill="#5a3a1a" />
              <ellipse cx="112" cy="102" rx="8" ry="8.5" fill="#5a3a1a" />
              <ellipse cx="85" cy="99" rx="2.5" ry="2.5" fill="white" />
              <ellipse cx="109" cy="99" rx="2.5" ry="2.5" fill="white" />
            </>
          )}

          {/* nose */}
          <ellipse cx="100" cy="113" rx="4" ry="3" fill="#e88090" />

          {/* mouth */}
          {eyeSad ? (
            <path d="M 92 120 Q 100 116 108 120" stroke="#c87080" strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : eyeHappy ? (
            <path d="M 90 119 Q 100 126 110 119" stroke="#c87080" strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M 92 119 Q 100 122 108 119" stroke="#c87080" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}

          {/* whiskers */}
          <line x1="65" y1="111" x2="88" y2="114" stroke="#d0a060" strokeWidth="1.5" opacity="0.8" />
          <line x1="65" y1="116" x2="88" y2="116" stroke="#d0a060" strokeWidth="1.5" opacity="0.8" />
          <line x1="112" y1="114" x2="135" y2="111" stroke="#d0a060" strokeWidth="1.5" opacity="0.8" />
          <line x1="112" y1="116" x2="135" y2="116" stroke="#d0a060" strokeWidth="1.5" opacity="0.8" />

          {/* cheek blush */}
          <ellipse cx="74" cy="116" rx="9" ry="6" fill="#ffb0b0" opacity="0.4" />
          <ellipse cx="126" cy="116" rx="9" ry="6" fill="#ffb0b0" opacity="0.4" />

          {/* paws */}
          <ellipse cx="68" cy="200" rx="18" ry="12" fill="#f5dba0" />
          <ellipse cx="132" cy="200" rx="18" ry="12" fill="#f5dba0" />
          <ellipse cx="60" cy="203" rx="5" ry="4" fill="#f0c880" />
          <ellipse cx="68" cy="206" rx="5" ry="4" fill="#f0c880" />
          <ellipse cx="76" cy="203" rx="5" ry="4" fill="#f0c880" />
          <ellipse cx="124" cy="203" rx="5" ry="4" fill="#f0c880" />
          <ellipse cx="132" cy="206" rx="5" ry="4" fill="#f0c880" />
          <ellipse cx="140" cy="203" rx="5" ry="4" fill="#f0c880" />

          {/* accessories */}
          {hasRibbon && (
            <g>
              <ellipse cx="100" cy="143" rx="14" ry="8" fill="#FF69B4" opacity="0.9" />
              <ellipse cx="88" cy="143" rx="9" ry="6" fill="#FF1493" opacity="0.8" />
              <ellipse cx="112" cy="143" rx="9" ry="6" fill="#FF1493" opacity="0.8" />
              <circle cx="100" cy="143" r="4" fill="#FFB6C1" />
            </g>
          )}

          {(hasHat || hasCrown) && (
            <g>
              {hasHat && !hasCrown && (
                <>
                  <rect x="78" y="48" width="44" height="30" rx="4" fill="#1a1a1a" />
                  <rect x="66" y="75" width="68" height="8" rx="4" fill="#1a1a1a" />
                  <rect x="84" y="42" width="32" height="12" rx="3" fill="#E8002D" />
                </>
              )}
              {hasCrown && (
                <>
                  <polygon points="100,38 82,58 90,52 100,62 110,52 118,58" fill="#FFD100" stroke="#FF6600" strokeWidth="1.5" />
                  <circle cx="100" cy="40" r="4" fill="#E8002D" />
                  <circle cx="84" cy="55" r="3" fill="#E8002D" />
                  <circle cx="116" cy="55" r="3" fill="#E8002D" />
                </>
              )}
            </g>
          )}
        </svg>

        {/* reaction bubble */}
        {reaction && (
          <div className={styles.reactionBubble} key={reaction.id}>
            {reaction.emoji}
          </div>
        )}
      </div>
    </div>
  )
}
