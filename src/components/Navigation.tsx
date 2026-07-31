import { AnimatePresence, motion } from 'framer-motion'
import { Activity, Bell, BookOpen, ChartNoAxesCombined, Menu, Radar, Search, Settings, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Overview', href: '#overview', icon: Activity },
  { label: 'Threat Feed', href: '#threat-feed', icon: Radar },
  { label: 'Analytics', href: '#analytics', icon: ChartNoAxesCombined },
  { label: 'Intelligence', href: '#intelligence', icon: Search },
  { label: 'Knowledge', href: '#knowledge', icon: BookOpen },
]

interface NavigationProps {
  onOpenSettings: () => void
}

export function Navigation({ onOpenSettings }: NavigationProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="CyberShield home">
          <span className="brand-mark"><ShieldCheck size={22} /></span>
          <span><strong>CYBER</strong>SHIELD<small>THREAT INTELLIGENCE</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="topbar-actions">
          <span className="system-online"><i /> SYSTEMS OPERATIONAL</span>
          <button className="icon-button" aria-label="Notifications"><Bell size={18} /><b>3</b></button>
          <button className="icon-button" onClick={onOpenSettings} aria-label="Open settings"><Settings size={18} /></button>
          <button className="icon-button mobile-only" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="mobile-menu-panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28 }}>
              <div className="mobile-menu-head"><span>COMMAND INDEX</span><button className="icon-button" onClick={() => setOpen(false)}><X size={20} /></button></div>
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}><item.icon size={18} />{item.label}<span>↗</span></a>
              ))}
              <button className="mobile-settings" onClick={() => { setOpen(false); onOpenSettings() }}><Settings size={18} /> Console settings</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
