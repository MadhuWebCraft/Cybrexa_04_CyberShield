import { motion } from 'framer-motion'
import { Activity, Crosshair, Globe2, Radio } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { attackTypes, incidentTrend, mapThreats } from '@/data/mockData'

const colors = ['#00e5ff', '#7c3aed', '#ff4d6d', '#ffc857', '#00ff88']
const severityData = [
  { name: 'Critical', value: 18, color: '#ff4d6d' },
  { name: 'High', value: 31, color: '#ffc857' },
  { name: 'Medium', value: 34, color: '#00e5ff' },
  { name: 'Low', value: 17, color: '#00ff88' },
]

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color?: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return <div className="chart-tooltip"><span>{label}</span>{payload.map((item) => <strong key={item.name} style={{ color: item.color }}>{item.name}: {item.value}</strong>)}</div>
}

export function ThreatAnalytics() {
  return (
    <section className="section-block" id="analytics">
      <div className="section-heading">
        <div><span className="eyebrow"><Activity size={14} /> SIGNAL ANALYTICS</span><h2>Threat landscape telemetry</h2></div>
        <p>Correlated activity across endpoint, identity, network, and cloud sensors.</p>
      </div>
      <div className="analytics-grid">
        <motion.article className="panel chart-wide" whileHover={{ y: -3 }}>
          <div className="panel-head"><div><span>INCIDENT VELOCITY</span><h3>Monthly incident trend</h3></div><small>12 MONTHS</small></div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incidentTrend} margin={{ top: 12, right: 8, left: -25, bottom: 0 }}>
                <defs><linearGradient id="incidents" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00e5ff" stopOpacity={0.35}/><stop offset="100%" stopColor="#00e5ff" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid stroke="#17243a" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#6f829f', fontSize: 11 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill: '#6f829f', fontSize: 11 }} axisLine={false} tickLine={false}/>
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="incidents" stroke="#00e5ff" fill="url(#incidents)" strokeWidth={2} animationDuration={1300}/>
                <Area type="monotone" dataKey="blocked" stroke="#00ff88" fill="transparent" strokeWidth={1.5} strokeDasharray="5 4" animationDuration={1600}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend"><span><i className="cyan"/>Observed incidents</span><span><i className="green"/>Blocked incidents</span></div>
        </motion.article>

        <motion.article className="panel" whileHover={{ y: -3 }}>
          <div className="panel-head"><div><span>THREAT DISTRIBUTION</span><h3>Attack types</h3></div><Crosshair size={18}/></div>
          <div className="chart-wrap compact-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attackTypes} layout="vertical" margin={{ left: 6, right: 12 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={72} tick={{ fill: '#95a5bd', fontSize: 10 }} axisLine={false} tickLine={false}/>
                <Tooltip cursor={{ fill: 'rgba(0,229,255,.04)' }} content={<ChartTooltip />}/>
                <Bar dataKey="value" radius={[0, 5, 5, 0]} barSize={9}>{attackTypes.map((entry, index) => <Cell key={entry.name} fill={colors[index]}/>)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article className="panel" whileHover={{ y: -3 }}>
          <div className="panel-head"><div><span>RISK PROFILE</span><h3>Severity breakdown</h3></div><Radio size={18}/></div>
          <div className="donut-layout">
            <div className="donut-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={severityData} dataKey="value" innerRadius={55} outerRadius={74} paddingAngle={4} animationDuration={1400}>{severityData.map((item) => <Cell key={item.name} fill={item.color}/>)}</Pie><Tooltip content={<ChartTooltip />}/></PieChart></ResponsiveContainer><span><strong>1,847</strong>signals</span></div>
            <div className="severity-list">{severityData.map((item) => <div key={item.name}><i style={{ background: item.color }}/><span>{item.name}</span><strong>{item.value}%</strong></div>)}</div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}

export function GlobalThreatMap() {
  return (
    <section className="section-block" id="map">
      <div className="section-heading">
        <div><span className="eyebrow"><Globe2 size={14} /> GLOBAL ATTACK SURFACE</span><h2>Live geographic pressure</h2></div>
        <span className="live-label"><i/> LIVE TELEMETRY</span>
      </div>
      <div className="map-panel panel">
        <div className="world-map" role="img" aria-label="Stylized world threat map">
          <svg viewBox="0 0 1000 470" preserveAspectRatio="none" aria-hidden="true">
            <path d="M90 111l58-48 99 5 62 46-23 48-62 13-21 51-63-6-25-49-58-24zM246 251l72 23 28 78-34 101-39-14-13-83-37-65zM433 87l70-32 86 31 64 4 73 49-20 34-87 1-34 44-69-3-35-47-53-22zM573 227l71-17 42 55-16 112-61 57-39-71-26-76zM731 120l102-49 106 51-30 74-73 16-36 57-64-26-37-56zM794 321l95-28 57 55-31 74-89-3-53-47z"/>
          </svg>
          <div className="map-grid" />
          {mapThreats.map((threat, index) => (
            <motion.button
              className={`map-marker marker-${threat.severity.toLowerCase()}`}
              style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
              key={threat.country}
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: index * .08 }}
              aria-label={`${threat.country}: ${threat.count} threats, ${threat.severity} severity`}
            ><i/><span><strong>{threat.country}</strong>{threat.count} detected</span></motion.button>
          ))}
          <div className="map-scanline"/>
        </div>
        <div className="map-stats">
          <div><span>TOP ORIGIN</span><strong>United States</strong><small>486 signals</small></div>
          <div><span>FASTEST GROWTH</span><strong>South Asia</strong><small>+18.7% / 24h</small></div>
          <div><span>ACTIVE REGIONS</span><strong>42</strong><small>across 6 continents</small></div>
          <div><span>BLOCK RATE</span><strong>93.1%</strong><small>automated response</small></div>
        </div>
      </div>
    </section>
  )
}
