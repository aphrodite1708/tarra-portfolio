import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import SocialBar from './SocialBar'
import { FOLDERS, type FolderId } from '../data/folders'

interface LandingProps {
  onFolderClick: (id: FolderId) => void
}

const TAB_HEIGHT = 48
const BODY_HEIGHT = 200

export default function Landing({ onFolderClick }: LandingProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [0, 1], [-6, 6])
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6])
  const springRotX = useSpring(rotateX, { damping: 30, stiffness: 200 })
  const springRotY = useSpring(rotateY, { damping: 30, stiffness: 200 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }
  function handleMouseLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  // stack height: front folder full + 3 tab-only layers behind it
  const stackHeight = BODY_HEIGHT + (FOLDERS.length - 1) * TAB_HEIGHT

  return (
    <motion.div
      className="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      <SocialBar />

      {/* Hero */}
      <div
        className="hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="hero-photo-frame"
          style={{ rotateX: springRotX, rotateY: springRotY, transformPerspective: 800 }}
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/tarra.jpg"
            alt="Tarra"
            className="hero-photo"
            onError={(e) => {
              const img = e.currentTarget
              img.style.display = 'none'
              const parent = img.parentElement
              if (parent) parent.classList.add('photo-missing')
            }}
          />
          <div className="photo-fallback">
            <span>Add your photo to<br /><code>public/tarra.jpg</code></span>
          </div>
        </motion.div>

        <motion.div
          className="hero-text"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-title">
            <span className="hero-title-script">Tarra's</span>
            <span className="hero-title-serif">digital portfolio</span>
          </h1>
          <p className="hero-tagline">
            Authentic story-teller that connects brands with audiences<br className="break-desktop" /> through relatable experiences
          </p>
        </motion.div>
      </div>

      {/* Folder stack */}
      <div className="folder-stack-wrap">
        <motion.div
          className="folder-stack"
          style={{ height: stackHeight }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Render back-to-front so front folder is on top in DOM */}
          {[...FOLDERS].reverse().map((folder, reversedIdx) => {
            const idx = FOLDERS.length - 1 - reversedIdx
            // idx 0 = front (accounting), idx 3 = back (marketing)
            // front folder sits at bottom: top = (stackHeight - BODY_HEIGHT)
            // each folder behind it moves up by TAB_HEIGHT
            const topPos = (FOLDERS.length - 1 - idx) * TAB_HEIGHT
            const zIdx = idx + 1
            const isFront = idx === 0
            const tabAlignRight = idx % 2 === 1

            return (
              <motion.div
                key={folder.id}
                className={`folder-card${isFront ? ' folder-card--front' : ''}`}
                style={{
                  top: topPos,
                  zIndex: zIdx,
                  background: folder.bodyColor,
                  cursor: 'pointer',
                }}
                whileHover={{ y: -10, transition: { duration: 0.2, ease: 'easeOut' } }}
                onClick={() => onFolderClick(folder.id)}
                role="button"
                aria-label={`Open ${folder.label}`}
              >
                {/* Tab label strip — the top part visible for non-front folders */}
                <div
                  className={`folder-tab-label${tabAlignRight ? ' folder-tab-label--right' : ''}`}
                  style={{ color: folder.textColor }}
                >
                  <span className="folder-tab-category">{folder.shortLabel}</span>
                  <span className="folder-tab-full">{folder.label}</span>
                  {isFront && <span className="folder-open-cue">Open</span>}
                </div>

                {/* Body — only fully visible on the front folder */}
                {isFront && (
                  <div className="folder-body-content" style={{ color: folder.textColor }}>
                    <div className="folder-body-items">
                      {folder.items.map(item => (
                        <span key={item.id} className="folder-body-item">{item.label}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}
