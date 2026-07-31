import { threatEvents } from '@/data/mockData'
import type { ThreatEvent } from '@/types'

export function getThreatSnapshot(offset: number): ThreatEvent[] {
  return threatEvents.map((event, index) => ({
    ...event,
    time: new Date(Date.now() - (index * 19000 + offset * 3000)).toLocaleTimeString('en-US', { hour12: false }),
  }))
}

export function analyzeIndicator(indicator: string) {
  const normalized = indicator.trim().toLowerCase()
  const checksum = [...normalized].reduce((total, character) => total + character.charCodeAt(0), 0)
  const isDomain = /[a-z]/i.test(normalized)
  const riskScore = 18 + (checksum % 71)

  return {
    indicator: normalized,
    type: isDomain ? 'Domain' : 'IPv4 Address',
    country: ['United States', 'Netherlands', 'Singapore', 'Germany'][checksum % 4],
    isp: ['Cloud Transit Networks', 'Atlas Hosting BV', 'Meridian Systems', 'Northstar Telecom'][checksum % 4],
    riskScore,
    riskLevel: riskScore > 70 ? 'High' : riskScore > 42 ? 'Medium' : 'Low',
    blacklist: riskScore > 62 ? 'Listed on 3 feeds' : 'No active listings',
    ssl: isDomain ? (checksum % 3 === 0 ? 'Certificate warning' : 'Valid / TLS 1.3') : 'Not applicable',
    ports: checksum % 2 ? ['22', '80', '443'] : ['53', '443', '8443'],
  }
}
