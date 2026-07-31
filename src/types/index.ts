export type Severity = 'Critical' | 'High' | 'Medium' | 'Low'

export interface NewsItem {
  id: number
  title: string
  description: string
  source: string
  published: string
  category: string
  tone: 'cyan' | 'violet' | 'amber' | 'red' | 'green'
}

export interface ThreatEvent {
  id: string
  threat: string
  source: string
  target: string
  severity: Severity
  time: string
}

export interface GlossaryTerm {
  term: string
  title: string
  summary: string
  detail: string
}

export interface CveItem {
  id: string
  severity: Severity
  description: string
  product: string
  score: number
  reference: string
}

export interface MapThreat {
  country: string
  count: number
  severity: Severity
  x: number
  y: number
}
