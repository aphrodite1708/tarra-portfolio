import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import SocialBar from './SocialBar'
import { FOLDERS, type FolderId } from '../data/folders'

interface LandingProps {
  onFolderClick: (id: FolderId) => void
}

const STRIP_HEIGHT = 100  // visible height of each non-front folder
const BODY_HEIGHT  = 200  // full height of the front folder

export default function Landing({ onFolderClick }: LandingProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useTransform(mouseY, [0, 1], [-5, 5])
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5])
  const springRotX = useSpring(rotateX, { damping: 32, stiffness: 200 })
  const springRotY = useSpring(rotateY, { damping: 32, stiffness: 200 })

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

  const stackHeight = BODY_HEIGHT + (FOLDERS.length - 1) * STRIP_HEIGHT  // 200 + 3*100 = 500

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
          style={{ rotateX: springRotX, rotateY: springRotY, transformPerspective: 900 }}
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/tarra.png"
            alt="Tarra Ananda"
            className="hero-photo"
            onError={(e) => {
              const img = e.currentTarget
              img.style.display = 'none'
              img.parentElement?.classList.add('photo-missing')
            }}
          />
          <div className="photo-fallback">
            <span>Add your photo to<br /><code>public/tarra.png</code></span>
          </div>
        </motion.div>

        <motion.div
          className="hero-text"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-title">
            <span className="hero-title-name">Tarra Ananda</span>
            <span className="hero-title-serif">Digital Portfolio</span>
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Render back-to-front; front folder drawn last (highest z-index via CSS) */}
          {[...FOLDERS].reverse().map((folder, reversedIdx) => {
            const idx = FOLDERS.length - 1 - reversedIdx
            // idx 0 = Accounting (front/bottom), idx 3 = Marketing (back/top)
            const topPos = (FOLDERS.length - 1 - idx) * STRIP_HEIGHT
            // Front folder (idx=0) gets highest z-index so it covers everything below it
            const zIdx = FOLDERS.length - idx
            const isFront = idx === 0
            const tabAlignRight = idx % 2 === 1

            return (
              <motion.div
                key={folder.id}
                className={`folder-card${isFront ? ' folder-card--front' : ''}`}
                style={{
                  top: topPos,
                  zIndex: zIdx,
                  backgroundColor: folder.bodyColor,
                  backgroundImage: `url(${folder.image})`,
                  cursor: 'pointer',
                }}
                whileHover={{ y: -10, transition: { duration: 0.2, ease: 'easeOut' } }}
                onClick={() => onFolderClick(folder.id)}
                role="button"
                aria-label={`Open ${folder.label}`}
              >
                {/* Color tint overlay — tints image with folder color */}
                <div
                  className="folder-color-tint"
                  style={{ background: folder.bodyColor }}
                />
                {/* Dark gradient at top so label text is always readable */}
                <div className="folder-label-gradient" />

                {/* Label strip */}
                <div className={`folder-tab-label${tabAlignRight ? ' folder-tab-label--right' : ''}`}>
                  <span className="folder-tab-category">{folder.shortLabel}</span>
                  <span className="folder-tab-full">{folder.label}</span>
                  {isFront && <span className="folder-open-cue">Open</span>}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}
