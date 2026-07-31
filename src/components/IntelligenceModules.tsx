import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, CheckCircle2, ExternalLink, Fingerprint, Globe, LockKeyhole, Search, Server, ShieldAlert, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cves, glossary, news, tools } from '@/data/mockData'
import { analyzeIndicator } from '@/services/threatService'
import type { GlossaryTerm } from '@/types'
import { severityClass } from '@/utils/format'

const categories = ['All', 'Malware', 'Ransomware', 'Data Breaches', 'Vulnerabilities', 'Government', 'Cloud Security', 'AI Security']

export function NewsHub() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const visibleNews = useMemo(() => news.filter((item) => (category === 'All' || item.category === category) && `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [category, query])

  return (
    <section className="section-block" id="news">
      <div className="section-heading">
        <div><span className="eyebrow"><Globe size={14}/> OPEN-SOURCE INTELLIGENCE</span><h2>Real-time cyber news</h2></div>
        <div className="search-field small"><Search size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search intelligence" aria-label="Search cyber news"/></div>
      </div>
      <div className="filter-row" role="group" aria-label="News categories">{categories.map((item) => <button className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <motion.div className="news-grid" layout>
        <AnimatePresence mode="popLayout">
          {visibleNews.map((item, index) => (
            <motion.article className="news-card" layout key={item.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ delay: index * .04 }}>
              <div className={`news-visual visual-${item.tone}`}>
                <span className="visual-grid"/><span className="visual-orbit"/><ShieldAlert size={28}/><b>{String(item.id).padStart(2, '0')}</b>
              </div>
              <div className="news-body">
                <div className="news-meta"><span>{item.category}</span><time>{item.published}</time></div>
                <h3>{item.title}</h3><p>{item.description}</p>
                <div className="news-footer"><span>{item.source}</span><button>Read report <ArrowUpRight size={14}/></button></div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
        {!visibleNews.length && <div className="empty-state"><Search size={28}/><h3>No signals matched</h3><p>Try a wider phrase or reset the category filter.</p></div>}
      </motion.div>
    </section>
  )
}

export function IndicatorIntelligence() {
  const [indicator, setIndicator] = useState('185.220.101.14')
  const [submitted, setSubmitted] = useState('185.220.101.14')
  const result = analyzeIndicator(submitted)

  return (
    <section className="section-block" id="intelligence">
      <div className="section-heading">
        <div><span className="eyebrow"><Fingerprint size={14}/> INDICATOR ENRICHMENT</span><h2>IP & domain intelligence</h2></div>
        <p>Rapid contextual analysis for suspicious infrastructure.</p>
      </div>
      <div className="intel-layout">
        <article className="panel intel-query">
          <div><span className="panel-kicker">OBSERVABLE LOOKUP</span><h3>Investigate an indicator</h3><p>Submit an IPv4 address or domain to generate a simulated enrichment report.</p></div>
          <form onSubmit={(event) => { event.preventDefault(); if (indicator.trim()) setSubmitted(indicator.trim()) }}>
            <div className="search-field"><Search size={18}/><input value={indicator} onChange={(event) => setIndicator(event.target.value)} placeholder="8.8.8.8 or example.com" aria-label="IP address or domain"/><button type="submit">Analyze</button></div>
          </form>
          <div className="query-foot"><LockKeyhole size={15}/> Local demonstration data · no query leaves this interface</div>
        </article>
        <article className="panel intel-result">
          <div className="result-title"><div><span>ANALYSIS RESULT</span><h3>{result.indicator}</h3></div><div className={`risk-orb risk-${result.riskLevel.toLowerCase()}`}><strong>{result.riskScore}</strong><span>RISK</span></div></div>
          <div className="result-grid">
            <div><span>TYPE</span><strong>{result.type}</strong></div><div><span>COUNTRY</span><strong>{result.country}</strong></div>
            <div><span>ISP / ASN</span><strong>{result.isp}</strong></div><div><span>BLACKLIST</span><strong>{result.blacklist}</strong></div>
            <div><span>SSL STATUS</span><strong>{result.ssl}</strong></div><div><span>OPEN PORTS</span><strong>{result.ports.join(' · ')}</strong></div>
          </div>
          <div className="geo-strip"><Globe size={18}/><span><small>APPROXIMATE GEOLOCATION</small>{result.country} · Regional datacenter</span><CheckCircle2 size={18}/></div>
        </article>
      </div>
    </section>
  )
}

export function KnowledgeHub() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<GlossaryTerm | null>(null)
  const terms = glossary.filter((item) => `${item.term} ${item.title} ${item.summary}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <section className="section-block" id="knowledge">
      <div className="section-heading">
        <div><span className="eyebrow"><BookOpen size={14}/> KNOWLEDGE BASE</span><h2>Security knowledge hub</h2></div>
        <div className="search-field small"><Search size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search concepts" aria-label="Search security glossary"/></div>
      </div>
      <div className="glossary-grid">{terms.map((item, index) => <motion.button className="glossary-card" key={item.term} onClick={() => setSelected(item)} whileHover={{ y: -4 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * .025 }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.term}</strong><h3>{item.title}</h3><p>{item.summary}</p><i>Open briefing <ArrowUpRight size={13}/></i></motion.button>)}</div>
      <AnimatePresence>{selected && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><motion.div className="knowledge-modal" initial={{ scale: .94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94 }} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close explanation"><X size={19}/></button><span>FIELD BRIEFING / {selected.term}</span><h2>{selected.title}</h2><p>{selected.detail}</p><div><BookOpen size={18}/><small>Use this concept to connect technical signals with repeatable defensive decisions.</small></div></motion.div></motion.div>}</AnimatePresence>
    </section>
  )
}

export function CveAndTools() {
  return (
    <section className="section-block">
      <div className="split-heading"><div><span className="eyebrow"><Server size={14}/> VULNERABILITY WATCH</span><h2>Latest CVEs</h2></div><a href="https://www.cve.org/" target="_blank" rel="noreferrer">Open CVE database <ExternalLink size={14}/></a></div>
      <div className="cve-grid">{cves.map((cve) => <article className="cve-card" key={cve.id}><div className="cve-top"><span className={severityClass(cve.severity)}>{cve.severity}</span><strong className={`score score-${cve.severity.toLowerCase()}`}>{cve.score}</strong></div><h3>{cve.id}</h3><p>{cve.description}</p><div className="affected"><span>AFFECTED PRODUCT</span><strong>{cve.product}</strong></div><a href={cve.reference} target="_blank" rel="noreferrer">Reference advisory <ArrowUpRight size={13}/></a></article>)}</div>
      <div className="tools-heading"><span className="eyebrow">ANALYST TOOLKIT</span><h2>Trusted research tools</h2></div>
      <div className="tools-grid">{tools.map((tool) => <a href={tool.url} target="_blank" rel="noreferrer" className="tool-card" key={tool.name}><b>{tool.code}</b><div><h3>{tool.name}</h3><p>{tool.description}</p></div><ExternalLink size={16}/></a>)}</div>
    </section>
  )
}
