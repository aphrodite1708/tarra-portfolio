import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Landing from './components/Landing'
import FolderOpen from './components/FolderOpen'
import CustomCursor from './components/CustomCursor'
import { FOLDERS, type FolderId } from './data/folders'

export default function App() {
  const [activeFolder, setActiveFolder] = useState<FolderId | null>(null)

  const folder = activeFolder ? FOLDERS.find(f => f.id === activeFolder) ?? null : null

  return (
    <div className="app">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {folder === null ? (
          <Landing key="landing" onFolderClick={setActiveFolder} />
        ) : (
          <FolderOpen
            key={folder.id}
            folder={folder}
            onClose={() => setActiveFolder(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
