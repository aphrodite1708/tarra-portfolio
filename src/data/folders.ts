export type FolderId = 'accounting' | 'executive' | 'creative' | 'marketing'

export interface SubItem {
  id: string
  label: string
}

export interface FolderDef {
  id: FolderId
  label: string
  shortLabel: string
  bodyColor: string
  tabColor: string
  textColor: string
  image: string
  items: SubItem[]
}

export const FOLDERS: FolderDef[] = [
  {
    id: 'accounting',
    label: 'Accounting & Consulting',
    shortLabel: 'Accounting',
    bodyColor: '#D9A8B4',
    tabColor: '#B8818F',
    textColor: '#FFFFFF',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&fit=crop',
    items: [
      { id: 'bookkeeping', label: 'Accounting & Bookkeeping' },
      { id: 'recruiting', label: 'Recruiting & Talent Sourcing' },
    ],
  },
  {
    id: 'executive',
    label: 'Executive Assistance',
    shortLabel: 'Executive',
    bodyColor: '#C8B09A',
    tabColor: '#A08068',
    textColor: '#FFFFFF',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&fit=crop',
    items: [
      { id: 'operations', label: 'Executive Operations' },
      { id: 'partnerships', label: 'Partnerships' },
      { id: 'realestate', label: 'Real Estate' },
    ],
  },
  {
    id: 'creative',
    label: 'Creative Strategist',
    shortLabel: 'Creative',
    bodyColor: '#BE3D4C',
    tabColor: '#8E2535',
    textColor: '#FFFFFF',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80&fit=crop',
    items: [
      { id: 'process', label: 'Process' },
      { id: 'casestudy', label: 'Case Study' },
      { id: 'analytics', label: 'Analytics' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing & Sales',
    shortLabel: 'Marketing',
    bodyColor: '#7A6E66',
    tabColor: '#5A5450',
    textColor: '#FFFFFF',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80&fit=crop',
    items: [
      { id: 'socialmedia', label: 'Social Media Marketing' },
      { id: 'sales', label: 'Sales & Business Development' },
      { id: 'leadgen', label: 'Lead Generation' },
      { id: 'campaigns', label: 'Campaign Management' },
    ],
  },
]
