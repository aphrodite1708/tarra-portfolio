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
  items: SubItem[]
}

export const FOLDERS: FolderDef[] = [
  {
    id: 'accounting',
    label: 'Accounting & Consulting',
    shortLabel: 'Accounting',
    bodyColor: '#E9C8D2',
    tabColor: '#C9A0AE',
    textColor: '#5C1E30',
    items: [
      { id: 'bookkeeping', label: 'Accounting & Bookkeeping' },
      { id: 'recruiting', label: 'Recruiting & Talent Sourcing' },
    ],
  },
  {
    id: 'executive',
    label: 'Executive Assistance',
    shortLabel: 'Executive',
    bodyColor: '#EDE3D4',
    tabColor: '#C8B09A',
    textColor: '#3E2A18',
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
    bodyColor: '#8A7E76',
    tabColor: '#635C56',
    textColor: '#FFFFFF',
    items: [
      { id: 'socialmedia', label: 'Social Media Marketing' },
      { id: 'sales', label: 'Sales & Business Development' },
      { id: 'leadgen', label: 'Lead Generation' },
      { id: 'campaigns', label: 'Campaign Management' },
    ],
  },
]
