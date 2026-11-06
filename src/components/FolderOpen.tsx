import { motion } from 'framer-motion'
import type { FolderDef } from '../data/folders'

interface FolderOpenProps {
  folder: FolderDef
  onClose: () => void
}

const containerVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.07, delayChildren: 0.2 },
  },
  exit: { opacity: 0, y: 40, scale: 0.97, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
}

const panelVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function FolderOpen({ folder, onClose }: FolderOpenProps) {
  const isLight = folder.id === 'accounting' || folder.id === 'executive'

  return (
    <motion.div
      className="folder-open"
      style={{ background: folder.bodyColor }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Top bar */}
      <div className="folder-open-topbar" style={{ borderBottomColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.12)' }}>
        <motion.button
          className="folder-back-btn"
          style={{ color: folder.textColor, borderColor: isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)' }}
          onClick={onClose}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5m7-7-7 7 7 7"/>
          </svg>
          Back
        </motion.button>

        <h2
          className="folder-open-title"
          style={{ color: folder.textColor }}
        >
          {folder.label}
        </h2>
      </div>

      {/* Sub-folder panels */}
      <div className="subfolder-grid" style={{ '--panel-count': folder.items.length } as React.CSSProperties}>
        {folder.items.map((item) => (
          <motion.div
            key={item.id}
            className="subfolder-panel"
            variants={panelVariants}
            whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.18)', transition: { duration: 0.2 } }}
            style={{
              background: isLight ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.1)',
              borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)',
            }}
          >
            <div
              className="subfolder-panel-tab"
              style={{
                background: folder.tabColor,
                color: folder.textColor,
              }}
            >
              {item.label}
            </div>
            <div className="subfolder-panel-body">
              <p className="subfolder-soon" style={{ color: isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)' }}>
                Content coming soon
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
