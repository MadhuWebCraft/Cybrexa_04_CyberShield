import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Globe, Search, ShieldAlert, ArrowUpRight, Fingerprint, LockKeyhole, CheckCircle2, BookOpen, X, Server, ExternalLink, ShieldCheck, Activity, Radar, ChartNoAxesCombined, Bell, Settings, Menu, Crosshair, Radio, Globe2, Shield, LayoutDashboard, Terminal, ArrowDown, MousePointer2, ArrowUp, Zap, Gauge, RefreshCw, CircleDot, ChevronRight, Moon, Sparkles, Volume2, VolumeX, Headphones, BellRing } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, BarChart, Bar, Cell, PieChart, Pie } from "recharts";
const stats = [
  { label: "Active Threat Alerts", value: 1847, suffix: "", delta: "+12.4%", tone: "danger" },
  { label: "Critical Vulnerabilities", value: 42, suffix: "", delta: "+6 today", tone: "warning" },
  { label: "Latest Security News", value: 286, suffix: "", delta: "18 new", tone: "primary" },
  { label: "Threat Severity", value: 73, suffix: "%", delta: "Elevated", tone: "danger" },
  { label: "Global Risk Score", value: 68, suffix: "/100", delta: "-2.1%", tone: "violet" },
  { label: "Feeds Updated", value: 128, suffix: "", delta: "14 sec ago", tone: "success" }
];
const news = [
  { id: 1, title: "Ransomware operators shift to hypervisor-level encryption", description: "Incident responders report a rise in campaigns targeting virtualization infrastructure to increase operational impact.", source: "CyberShield Research", published: "31 Jul 2026", category: "Ransomware", tone: "red" },
  { id: 2, title: "Critical identity bypass affects multi-cloud environments", description: "A newly documented trust-chain weakness can permit privilege escalation across misconfigured cloud tenants.", source: "CloudSec Dispatch", published: "31 Jul 2026", category: "Cloud Security", tone: "violet" },
  { id: 3, title: "Security teams track adaptive phishing kit powered by AI", description: "The campaign rewrites lures in real time and dynamically mirrors regional authentication portals.", source: "Signal Wire", published: "30 Jul 2026", category: "AI Security", tone: "cyan" },
  { id: 4, title: "Public sector supply chain campaign expands targeting", description: "Threat intelligence links a cluster of signed loader activity to attacks against government contractors.", source: "CivicCERT", published: "30 Jul 2026", category: "Government", tone: "amber" },
  { id: 5, title: "Credential stealer adds browser wallet discovery module", description: "A modular malware family now inventories extensions and session tokens before exfiltration.", source: "Malware Atlas", published: "29 Jul 2026", category: "Malware", tone: "green" },
  { id: 6, title: "Healthcare data exposure traced to API authorization gap", description: "Researchers identified an object-level authorization issue in a widely deployed patient portal.", source: "Breach Monitor", published: "28 Jul 2026", category: "Data Breaches", tone: "red" },
  { id: 7, title: "Exploit activity follows disclosure of edge gateway flaw", description: "Scanning and proof-of-concept reuse increased within hours of the coordinated vulnerability advisory.", source: "Vulnerability Signal", published: "28 Jul 2026", category: "Vulnerabilities", tone: "amber" }
];
const threatEvents = [
  { id: "EVT-7F2A", threat: "Cobalt Strike beacon", source: "185.220.101.14", target: "Finance API", severity: "Critical", time: "14:32:08" },
  { id: "EVT-18BC", threat: "Credential stuffing", source: "45.142.212.61", target: "Identity Gateway", severity: "High", time: "14:31:51" },
  { id: "EVT-9D01", threat: "Suspicious PowerShell", source: "10.44.8.12", target: "ENG-WS-044", severity: "Medium", time: "14:31:26" },
  { id: "EVT-3CC8", threat: "DNS tunneling", source: "91.214.124.87", target: "Research VLAN", severity: "High", time: "14:30:58" },
  { id: "EVT-A821", threat: "Port reconnaissance", source: "103.27.186.19", target: "Edge Cluster", severity: "Low", time: "14:30:41" }
];
const glossary = [
  { term: "SIEM", title: "Security Information & Event Management", summary: "Centralized collection, correlation, and analysis of security telemetry.", detail: "A SIEM ingests logs and signals from infrastructure, identities, endpoints, and applications. Detection rules, analytics, and investigation workflows help analysts identify suspicious activity at scale." },
  { term: "SOC", title: "Security Operations Center", summary: "The people, processes, and technology defending an organization.", detail: "A SOC continuously monitors the environment, triages alerts, investigates incidents, coordinates response, and improves defensive coverage using threat intelligence and lessons learned." },
  { term: "XDR", title: "Extended Detection & Response", summary: "Detection and response spanning multiple security domains.", detail: "XDR combines endpoint, identity, email, cloud, and network signals into cross-domain detections and coordinated response actions." },
  { term: "EDR", title: "Endpoint Detection & Response", summary: "Continuous endpoint telemetry, detection, and containment.", detail: "EDR platforms record process, file, network, and identity activity on endpoints to detect malicious behavior and support response actions such as isolation." },
  { term: "MITRE ATT&CK", title: "Adversary Tactics & Techniques", summary: "A knowledge base describing observed attacker behavior.", detail: "MITRE ATT&CK organizes adversary behavior into tactics and techniques, helping teams map detections, emulate threats, analyze incidents, and identify defensive gaps." },
  { term: "CVE", title: "Common Vulnerabilities & Exposures", summary: "A standardized identifier for publicly known vulnerabilities.", detail: "CVE records provide a consistent way to reference a vulnerability across vendors, tools, advisories, and security teams." },
  { term: "CVSS", title: "Common Vulnerability Scoring System", summary: "A framework for communicating vulnerability severity.", detail: "CVSS scores technical characteristics such as exploitability and impact. Organizations should combine the score with asset exposure and business context." },
  { term: "Zero Trust", title: "Never Trust, Always Verify", summary: "An access model based on explicit, continuous verification.", detail: "Zero Trust reduces implicit trust by validating identity, device health, context, and authorization for every access decision while enforcing least privilege." },
  { term: "Ransomware", title: "Extortion-driven Malware", summary: "Malware and operations that deny access or threaten disclosure.", detail: "Modern ransomware operations frequently combine data theft, encryption, service disruption, and public pressure to compel payment." },
  { term: "Malware", title: "Malicious Software", summary: "Software designed to disrupt, spy, steal, or gain unauthorized access.", detail: "Malware includes loaders, stealers, trojans, worms, rootkits, ransomware, and other code used to achieve attacker objectives." },
  { term: "Phishing", title: "Deceptive Social Engineering", summary: "Messages or experiences designed to steal access or trigger actions.", detail: "Phishing can target credentials, sessions, payments, malware execution, or sensitive data using email, SMS, voice, social media, and malicious sites." },
  { term: "APT", title: "Advanced Persistent Threat", summary: "A capable, sustained intrusion campaign pursuing strategic goals.", detail: "APT activity often involves patient access, tailored tooling, operational security, and long-term collection aligned with espionage or strategic objectives." }
];
const cves = [
  { id: "CVE-2026-41872", severity: "Critical", description: "Remote code execution in a widely deployed edge management appliance.", product: "Aegis Edge Controller 8.x", score: 9.8, reference: "https://www.cve.org/" },
  { id: "CVE-2026-39711", severity: "High", description: "Authentication token replay under specific proxy configurations.", product: "Nimbus Identity Broker", score: 8.7, reference: "https://www.cve.org/" },
  { id: "CVE-2026-36204", severity: "High", description: "Path traversal permits access to restricted service configuration.", product: "Orion DevOps Gateway", score: 8.1, reference: "https://www.cve.org/" },
  { id: "CVE-2026-34490", severity: "Medium", description: "Stored cross-site scripting in administrative audit views.", product: "Sentinel Log Console", score: 6.4, reference: "https://www.cve.org/" }
];
const mapThreats = [
  { country: "United States", count: 486, severity: "High", x: 20, y: 39 },
  { country: "Brazil", count: 184, severity: "Medium", x: 34, y: 67 },
  { country: "Germany", count: 278, severity: "High", x: 51, y: 32 },
  { country: "South Africa", count: 92, severity: "Low", x: 55, y: 72 },
  { country: "India", count: 354, severity: "Critical", x: 69, y: 47 },
  { country: "Singapore", count: 227, severity: "High", x: 78, y: 60 },
  { country: "Japan", count: 194, severity: "Medium", x: 87, y: 39 },
  { country: "Australia", count: 118, severity: "Low", x: 84, y: 76 }
];
const incidentTrend = [
  { month: "Aug", incidents: 320, blocked: 272 },
  { month: "Sep", incidents: 410, blocked: 351 },
  { month: "Oct", incidents: 388, blocked: 340 },
  { month: "Nov", incidents: 520, blocked: 461 },
  { month: "Dec", incidents: 476, blocked: 429 },
  { month: "Jan", incidents: 608, blocked: 538 },
  { month: "Feb", incidents: 547, blocked: 498 },
  { month: "Mar", incidents: 702, blocked: 642 },
  { month: "Apr", incidents: 668, blocked: 604 },
  { month: "May", incidents: 784, blocked: 719 },
  { month: "Jun", incidents: 731, blocked: 678 },
  { month: "Jul", incidents: 862, blocked: 801 }
];
const attackTypes = [
  { name: "Phishing", value: 31 },
  { name: "Malware", value: 24 },
  { name: "Ransomware", value: 18 },
  { name: "Exploitation", value: 15 },
  { name: "DDoS", value: 12 }
];
const tools = [
  { name: "VirusTotal", description: "Analyze suspicious files, domains, IPs, and URLs.", url: "https://www.virustotal.com/", code: "VT" },
  { name: "Shodan", description: "Search internet-connected devices and exposed services.", url: "https://www.shodan.io/", code: "SH" },
  { name: "AbuseIPDB", description: "Check and report malicious IP address activity.", url: "https://www.abuseipdb.com/", code: "AB" },
  { name: "CVE Database", description: "Research standardized vulnerability records.", url: "https://www.cve.org/", code: "CV" },
  { name: "MITRE ATT&CK", description: "Explore adversary tactics, techniques, and procedures.", url: "https://attack.mitre.org/", code: "MA" },
  { name: "OWASP Top 10", description: "Review critical web application security risks.", url: "https://owasp.org/www-project-top-ten/", code: "OW" }
];
function getThreatSnapshot(offset) {
  return threatEvents.map((event, index) => ({
    ...event,
    time: new Date(Date.now() - (index * 19e3 + offset * 3e3)).toLocaleTimeString("en-US", { hour12: false })
  }));
}
function analyzeIndicator(indicator) {
  const normalized = indicator.trim().toLowerCase();
  const checksum = [...normalized].reduce((total, character) => total + character.charCodeAt(0), 0);
  const isDomain = /[a-z]/i.test(normalized);
  const riskScore = 18 + checksum % 71;
  return {
    indicator: normalized,
    type: isDomain ? "Domain" : "IPv4 Address",
    country: ["United States", "Netherlands", "Singapore", "Germany"][checksum % 4],
    isp: ["Cloud Transit Networks", "Atlas Hosting BV", "Meridian Systems", "Northstar Telecom"][checksum % 4],
    riskScore,
    riskLevel: riskScore > 70 ? "High" : riskScore > 42 ? "Medium" : "Low",
    blacklist: riskScore > 62 ? "Listed on 3 feeds" : "No active listings",
    ssl: isDomain ? checksum % 3 === 0 ? "Certificate warning" : "Valid / TLS 1.3" : "Not applicable",
    ports: checksum % 2 ? ["22", "80", "443"] : ["53", "443", "8443"]
  };
}
const formatNumber = (value) => new Intl.NumberFormat("en-US").format(value);
const severityClass = (severity) => `severity severity-${severity.toLowerCase()}`;
const categories = ["All", "Malware", "Ransomware", "Data Breaches", "Vulnerabilities", "Government", "Cloud Security", "AI Security"];
function NewsHub() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const visibleNews = useMemo(() => news.filter((item) => (category === "All" || item.category === category) && `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return /* @__PURE__ */ jsxs("section", { className: "section-block", id: "news", children: [
    /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "eyebrow", children: [
          /* @__PURE__ */ jsx(Globe, { size: 14 }),
          " OPEN-SOURCE INTELLIGENCE"
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "Real-time cyber news" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "search-field small", children: [
        /* @__PURE__ */ jsx(Search, { size: 16 }),
        /* @__PURE__ */ jsx("input", { value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search intelligence", "aria-label": "Search cyber news" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "filter-row", role: "group", "aria-label": "News categories", children: categories.map((item) => /* @__PURE__ */ jsx("button", { className: category === item ? "active" : "", onClick: () => setCategory(item), children: item }, item)) }),
    /* @__PURE__ */ jsxs(motion.div, { className: "news-grid", layout: true, children: [
      /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleNews.map((item, index) => /* @__PURE__ */ jsxs(motion.article, { className: "news-card", layout: true, initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, scale: 0.96 }, transition: { delay: index * 0.04 }, children: [
        /* @__PURE__ */ jsxs("div", { className: `news-visual visual-${item.tone}`, children: [
          /* @__PURE__ */ jsx("span", { className: "visual-grid" }),
          /* @__PURE__ */ jsx("span", { className: "visual-orbit" }),
          /* @__PURE__ */ jsx(ShieldAlert, { size: 28 }),
          /* @__PURE__ */ jsx("b", { children: String(item.id).padStart(2, "0") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "news-body", children: [
          /* @__PURE__ */ jsxs("div", { className: "news-meta", children: [
            /* @__PURE__ */ jsx("span", { children: item.category }),
            /* @__PURE__ */ jsx("time", { children: item.published })
          ] }),
          /* @__PURE__ */ jsx("h3", { children: item.title }),
          /* @__PURE__ */ jsx("p", { children: item.description }),
          /* @__PURE__ */ jsxs("div", { className: "news-footer", children: [
            /* @__PURE__ */ jsx("span", { children: item.source }),
            /* @__PURE__ */ jsxs("button", { children: [
              "Read report ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 14 })
            ] })
          ] })
        ] })
      ] }, item.id)) }),
      !visibleNews.length && /* @__PURE__ */ jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsx(Search, { size: 28 }),
        /* @__PURE__ */ jsx("h3", { children: "No signals matched" }),
        /* @__PURE__ */ jsx("p", { children: "Try a wider phrase or reset the category filter." })
      ] })
    ] })
  ] });
}
function IndicatorIntelligence() {
  const [indicator, setIndicator] = useState("185.220.101.14");
  const [submitted, setSubmitted] = useState("185.220.101.14");
  const result = analyzeIndicator(submitted);
  return /* @__PURE__ */ jsxs("section", { className: "section-block", id: "intelligence", children: [
    /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "eyebrow", children: [
          /* @__PURE__ */ jsx(Fingerprint, { size: 14 }),
          " INDICATOR ENRICHMENT"
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "IP & domain intelligence" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Rapid contextual analysis for suspicious infrastructure." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "intel-layout", children: [
      /* @__PURE__ */ jsxs("article", { className: "panel intel-query", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "panel-kicker", children: "OBSERVABLE LOOKUP" }),
          /* @__PURE__ */ jsx("h3", { children: "Investigate an indicator" }),
          /* @__PURE__ */ jsx("p", { children: "Submit an IPv4 address or domain to generate a simulated enrichment report." })
        ] }),
        /* @__PURE__ */ jsx("form", { onSubmit: (event) => {
          event.preventDefault();
          if (indicator.trim()) setSubmitted(indicator.trim());
        }, children: /* @__PURE__ */ jsxs("div", { className: "search-field", children: [
          /* @__PURE__ */ jsx(Search, { size: 18 }),
          /* @__PURE__ */ jsx("input", { value: indicator, onChange: (event) => setIndicator(event.target.value), placeholder: "8.8.8.8 or example.com", "aria-label": "IP address or domain" }),
          /* @__PURE__ */ jsx("button", { type: "submit", children: "Analyze" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "query-foot", children: [
          /* @__PURE__ */ jsx(LockKeyhole, { size: 15 }),
          " Local demonstration data · no query leaves this interface"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "panel intel-result", children: [
        /* @__PURE__ */ jsxs("div", { className: "result-title", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "ANALYSIS RESULT" }),
            /* @__PURE__ */ jsx("h3", { children: result.indicator })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `risk-orb risk-${result.riskLevel.toLowerCase()}`, children: [
            /* @__PURE__ */ jsx("strong", { children: result.riskScore }),
            /* @__PURE__ */ jsx("span", { children: "RISK" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "result-grid", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "TYPE" }),
            /* @__PURE__ */ jsx("strong", { children: result.type })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "COUNTRY" }),
            /* @__PURE__ */ jsx("strong", { children: result.country })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "ISP / ASN" }),
            /* @__PURE__ */ jsx("strong", { children: result.isp })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "BLACKLIST" }),
            /* @__PURE__ */ jsx("strong", { children: result.blacklist })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "SSL STATUS" }),
            /* @__PURE__ */ jsx("strong", { children: result.ssl })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "OPEN PORTS" }),
            /* @__PURE__ */ jsx("strong", { children: result.ports.join(" · ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "geo-strip", children: [
          /* @__PURE__ */ jsx(Globe, { size: 18 }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("small", { children: "APPROXIMATE GEOLOCATION" }),
            result.country,
            " · Regional datacenter"
          ] }),
          /* @__PURE__ */ jsx(CheckCircle2, { size: 18 })
        ] })
      ] })
    ] })
  ] });
}
function KnowledgeHub() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const terms = glossary.filter((item) => `${item.term} ${item.title} ${item.summary}`.toLowerCase().includes(query.toLowerCase()));
  return /* @__PURE__ */ jsxs("section", { className: "section-block", id: "knowledge", children: [
    /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "eyebrow", children: [
          /* @__PURE__ */ jsx(BookOpen, { size: 14 }),
          " KNOWLEDGE BASE"
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "Security knowledge hub" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "search-field small", children: [
        /* @__PURE__ */ jsx(Search, { size: 16 }),
        /* @__PURE__ */ jsx("input", { value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search concepts", "aria-label": "Search security glossary" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "glossary-grid", children: terms.map((item, index) => /* @__PURE__ */ jsxs(motion.button, { className: "glossary-card", onClick: () => setSelected(item), whileHover: { y: -4 }, initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { delay: index * 0.025 }, children: [
      /* @__PURE__ */ jsx("span", { children: String(index + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsx("strong", { children: item.term }),
      /* @__PURE__ */ jsx("h3", { children: item.title }),
      /* @__PURE__ */ jsx("p", { children: item.summary }),
      /* @__PURE__ */ jsxs("i", { children: [
        "Open briefing ",
        /* @__PURE__ */ jsx(ArrowUpRight, { size: 13 })
      ] })
    ] }, item.term)) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selected && /* @__PURE__ */ jsx(motion.div, { className: "modal-backdrop", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setSelected(null), children: /* @__PURE__ */ jsxs(motion.div, { className: "knowledge-modal", initial: { scale: 0.94, y: 20 }, animate: { scale: 1, y: 0 }, exit: { scale: 0.94 }, onClick: (event) => event.stopPropagation(), children: [
      /* @__PURE__ */ jsx("button", { className: "modal-close", onClick: () => setSelected(null), "aria-label": "Close explanation", children: /* @__PURE__ */ jsx(X, { size: 19 }) }),
      /* @__PURE__ */ jsxs("span", { children: [
        "FIELD BRIEFING / ",
        selected.term
      ] }),
      /* @__PURE__ */ jsx("h2", { children: selected.title }),
      /* @__PURE__ */ jsx("p", { children: selected.detail }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(BookOpen, { size: 18 }),
        /* @__PURE__ */ jsx("small", { children: "Use this concept to connect technical signals with repeatable defensive decisions." })
      ] })
    ] }) }) })
  ] });
}
function CveAndTools() {
  return /* @__PURE__ */ jsxs("section", { className: "section-block", children: [
    /* @__PURE__ */ jsxs("div", { className: "split-heading", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "eyebrow", children: [
          /* @__PURE__ */ jsx(Server, { size: 14 }),
          " VULNERABILITY WATCH"
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "Latest CVEs" })
      ] }),
      /* @__PURE__ */ jsxs("a", { href: "https://www.cve.org/", target: "_blank", rel: "noreferrer", children: [
        "Open CVE database ",
        /* @__PURE__ */ jsx(ExternalLink, { size: 14 })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "cve-grid", children: cves.map((cve) => /* @__PURE__ */ jsxs("article", { className: "cve-card", children: [
      /* @__PURE__ */ jsxs("div", { className: "cve-top", children: [
        /* @__PURE__ */ jsx("span", { className: severityClass(cve.severity), children: cve.severity }),
        /* @__PURE__ */ jsx("strong", { className: `score score-${cve.severity.toLowerCase()}`, children: cve.score })
      ] }),
      /* @__PURE__ */ jsx("h3", { children: cve.id }),
      /* @__PURE__ */ jsx("p", { children: cve.description }),
      /* @__PURE__ */ jsxs("div", { className: "affected", children: [
        /* @__PURE__ */ jsx("span", { children: "AFFECTED PRODUCT" }),
        /* @__PURE__ */ jsx("strong", { children: cve.product })
      ] }),
      /* @__PURE__ */ jsxs("a", { href: cve.reference, target: "_blank", rel: "noreferrer", children: [
        "Reference advisory ",
        /* @__PURE__ */ jsx(ArrowUpRight, { size: 13 })
      ] })
    ] }, cve.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "tools-heading", children: [
      /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "ANALYST TOOLKIT" }),
      /* @__PURE__ */ jsx("h2", { children: "Trusted research tools" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "tools-grid", children: tools.map((tool) => /* @__PURE__ */ jsxs("a", { href: tool.url, target: "_blank", rel: "noreferrer", className: "tool-card", children: [
      /* @__PURE__ */ jsx("b", { children: tool.code }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { children: tool.name }),
        /* @__PURE__ */ jsx("p", { children: tool.description })
      ] }),
      /* @__PURE__ */ jsx(ExternalLink, { size: 16 })
    ] }, tool.name)) })
  ] });
}
const navItems = [
  { label: "Overview", href: "#overview", icon: Activity },
  { label: "Threat Feed", href: "#threat-feed", icon: Radar },
  { label: "Analytics", href: "#analytics", icon: ChartNoAxesCombined },
  { label: "Intelligence", href: "#intelligence", icon: Search },
  { label: "Knowledge", href: "#knowledge", icon: BookOpen }
];
function Navigation({ onOpenSettings }) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "topbar", children: [
      /* @__PURE__ */ jsxs("a", { className: "brand", href: "#top", "aria-label": "CyberShield home", children: [
        /* @__PURE__ */ jsx("span", { className: "brand-mark", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 22 }) }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("strong", { children: "CYBER" }),
          "SHIELD",
          /* @__PURE__ */ jsx("small", { children: "THREAT INTELLIGENCE" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "desktop-nav", "aria-label": "Primary navigation", children: navItems.map((item) => /* @__PURE__ */ jsx("a", { href: item.href, children: item.label }, item.href)) }),
      /* @__PURE__ */ jsxs("div", { className: "topbar-actions", children: [
        /* @__PURE__ */ jsxs("span", { className: "system-online", children: [
          /* @__PURE__ */ jsx("i", {}),
          " SYSTEMS OPERATIONAL"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "icon-button", "aria-label": "Notifications", children: [
          /* @__PURE__ */ jsx(Bell, { size: 18 }),
          /* @__PURE__ */ jsx("b", { children: "3" })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "icon-button", onClick: onOpenSettings, "aria-label": "Open settings", children: /* @__PURE__ */ jsx(Settings, { size: 18 }) }),
        /* @__PURE__ */ jsx("button", { className: "icon-button mobile-only", onClick: () => setOpen(true), "aria-label": "Open menu", children: /* @__PURE__ */ jsx(Menu, { size: 20 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, { className: "mobile-menu", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: /* @__PURE__ */ jsxs(motion.div, { className: "mobile-menu-panel", initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" }, transition: { type: "spring", damping: 28 }, children: [
      /* @__PURE__ */ jsxs("div", { className: "mobile-menu-head", children: [
        /* @__PURE__ */ jsx("span", { children: "COMMAND INDEX" }),
        /* @__PURE__ */ jsx("button", { className: "icon-button", onClick: () => setOpen(false), children: /* @__PURE__ */ jsx(X, { size: 20 }) })
      ] }),
      navItems.map((item) => /* @__PURE__ */ jsxs("a", { href: item.href, onClick: () => setOpen(false), children: [
        /* @__PURE__ */ jsx(item.icon, { size: 18 }),
        item.label,
        /* @__PURE__ */ jsx("span", { children: "↗" })
      ] }, item.href)),
      /* @__PURE__ */ jsxs("button", { className: "mobile-settings", onClick: () => {
        setOpen(false);
        onOpenSettings();
      }, children: [
        /* @__PURE__ */ jsx(Settings, { size: 18 }),
        " Console settings"
      ] })
    ] }) }) })
  ] });
}
const colors = ["#00e5ff", "#7c3aed", "#ff4d6d", "#ffc857", "#00ff88"];
const severityData = [
  { name: "Critical", value: 18, color: "#ff4d6d" },
  { name: "High", value: 31, color: "#ffc857" },
  { name: "Medium", value: 34, color: "#00e5ff" },
  { name: "Low", value: 17, color: "#00ff88" }
];
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return /* @__PURE__ */ jsxs("div", { className: "chart-tooltip", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    payload.map((item) => /* @__PURE__ */ jsxs("strong", { style: { color: item.color }, children: [
      item.name,
      ": ",
      item.value
    ] }, item.name))
  ] });
}
function ThreatAnalytics() {
  return /* @__PURE__ */ jsxs("section", { className: "section-block", id: "analytics", children: [
    /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "eyebrow", children: [
          /* @__PURE__ */ jsx(Activity, { size: 14 }),
          " SIGNAL ANALYTICS"
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "Threat landscape telemetry" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Correlated activity across endpoint, identity, network, and cloud sensors." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "analytics-grid", children: [
      /* @__PURE__ */ jsxs(motion.article, { className: "panel chart-wide", whileHover: { y: -3 }, children: [
        /* @__PURE__ */ jsxs("div", { className: "panel-head", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "INCIDENT VELOCITY" }),
            /* @__PURE__ */ jsx("h3", { children: "Monthly incident trend" })
          ] }),
          /* @__PURE__ */ jsx("small", { children: "12 MONTHS" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: incidentTrend, margin: { top: 12, right: 8, left: -25, bottom: 0 }, children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "incidents", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#00e5ff", stopOpacity: 0.35 }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#00e5ff", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsx(CartesianGrid, { stroke: "#17243a", vertical: false }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "month", tick: { fill: "#6f829f", fontSize: 11 }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(YAxis, { tick: { fill: "#6f829f", fontSize: 11 }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(ChartTooltip, {}) }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "incidents", stroke: "#00e5ff", fill: "url(#incidents)", strokeWidth: 2, animationDuration: 1300 }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "blocked", stroke: "#00ff88", fill: "transparent", strokeWidth: 1.5, strokeDasharray: "5 4", animationDuration: 1600 })
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "chart-legend", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("i", { className: "cyan" }),
            "Observed incidents"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("i", { className: "green" }),
            "Blocked incidents"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(motion.article, { className: "panel", whileHover: { y: -3 }, children: [
        /* @__PURE__ */ jsxs("div", { className: "panel-head", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "THREAT DISTRIBUTION" }),
            /* @__PURE__ */ jsx("h3", { children: "Attack types" })
          ] }),
          /* @__PURE__ */ jsx(Crosshair, { size: 18 })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "chart-wrap compact-chart", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: attackTypes, layout: "vertical", margin: { left: 6, right: 12 }, children: [
          /* @__PURE__ */ jsx(XAxis, { type: "number", hide: true }),
          /* @__PURE__ */ jsx(YAxis, { type: "category", dataKey: "name", width: 72, tick: { fill: "#95a5bd", fontSize: 10 }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(Tooltip, { cursor: { fill: "rgba(0,229,255,.04)" }, content: /* @__PURE__ */ jsx(ChartTooltip, {}) }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "value", radius: [0, 5, 5, 0], barSize: 9, children: attackTypes.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: colors[index] }, entry.name)) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(motion.article, { className: "panel", whileHover: { y: -3 }, children: [
        /* @__PURE__ */ jsxs("div", { className: "panel-head", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: "RISK PROFILE" }),
            /* @__PURE__ */ jsx("h3", { children: "Severity breakdown" })
          ] }),
          /* @__PURE__ */ jsx(Radio, { size: 18 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "donut-layout", children: [
          /* @__PURE__ */ jsxs("div", { className: "donut-chart", children: [
            /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
              /* @__PURE__ */ jsx(Pie, { data: severityData, dataKey: "value", innerRadius: 55, outerRadius: 74, paddingAngle: 4, animationDuration: 1400, children: severityData.map((item) => /* @__PURE__ */ jsx(Cell, { fill: item.color }, item.name)) }),
              /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(ChartTooltip, {}) })
            ] }) }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "1,847" }),
              "signals"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "severity-list", children: severityData.map((item) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("i", { style: { background: item.color } }),
            /* @__PURE__ */ jsx("span", { children: item.name }),
            /* @__PURE__ */ jsxs("strong", { children: [
              item.value,
              "%"
            ] })
          ] }, item.name)) })
        ] })
      ] })
    ] })
  ] });
}
function GlobalThreatMap() {
  return /* @__PURE__ */ jsxs("section", { className: "section-block", id: "map", children: [
    /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "eyebrow", children: [
          /* @__PURE__ */ jsx(Globe2, { size: 14 }),
          " GLOBAL ATTACK SURFACE"
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "Live geographic pressure" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "live-label", children: [
        /* @__PURE__ */ jsx("i", {}),
        " LIVE TELEMETRY"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "map-panel panel", children: [
      /* @__PURE__ */ jsxs("div", { className: "world-map", role: "img", "aria-label": "Stylized world threat map", children: [
        /* @__PURE__ */ jsx("svg", { viewBox: "0 0 1000 470", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M90 111l58-48 99 5 62 46-23 48-62 13-21 51-63-6-25-49-58-24zM246 251l72 23 28 78-34 101-39-14-13-83-37-65zM433 87l70-32 86 31 64 4 73 49-20 34-87 1-34 44-69-3-35-47-53-22zM573 227l71-17 42 55-16 112-61 57-39-71-26-76zM731 120l102-49 106 51-30 74-73 16-36 57-64-26-37-56zM794 321l95-28 57 55-31 74-89-3-53-47z" }) }),
        /* @__PURE__ */ jsx("div", { className: "map-grid" }),
        mapThreats.map((threat, index) => /* @__PURE__ */ jsxs(
          motion.button,
          {
            className: `map-marker marker-${threat.severity.toLowerCase()}`,
            style: { left: `${threat.x}%`, top: `${threat.y}%` },
            initial: { scale: 0 },
            whileInView: { scale: 1 },
            transition: { delay: index * 0.08 },
            "aria-label": `${threat.country}: ${threat.count} threats, ${threat.severity} severity`,
            children: [
              /* @__PURE__ */ jsx("i", {}),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: threat.country }),
                threat.count,
                " detected"
              ] })
            ]
          },
          threat.country
        )),
        /* @__PURE__ */ jsx("div", { className: "map-scanline" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "map-stats", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { children: "TOP ORIGIN" }),
          /* @__PURE__ */ jsx("strong", { children: "United States" }),
          /* @__PURE__ */ jsx("small", { children: "486 signals" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { children: "FASTEST GROWTH" }),
          /* @__PURE__ */ jsx("strong", { children: "South Asia" }),
          /* @__PURE__ */ jsx("small", { children: "+18.7% / 24h" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { children: "ACTIVE REGIONS" }),
          /* @__PURE__ */ jsx("strong", { children: "42" }),
          /* @__PURE__ */ jsx("small", { children: "across 6 continents" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { children: "BLOCK RATE" }),
          /* @__PURE__ */ jsx("strong", { children: "93.1%" }),
          /* @__PURE__ */ jsx("small", { children: "automated response" })
        ] })
      ] })
    ] })
  ] });
}
function useCounter(target, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, target]);
  return value;
}
const statIcons = [ShieldAlert, Zap, Radar, Activity, Gauge, RefreshCw];
const notifications = [
  { title: "New ransomware campaign", detail: "Hypervisor targets observed across finance sector.", tone: "critical" },
  { title: "Critical CVE released", detail: "Edge appliance RCE added to priority watchlist.", tone: "warning" },
  { title: "Phishing alert", detail: "Adaptive identity lures detected in three regions.", tone: "primary" },
  { title: "Cloud security update", detail: "Identity posture feed completed synchronization.", tone: "success" }
];
function StatCard({ item, index }) {
  const count = useCounter(item.value, 900 + index * 80);
  const Icon = statIcons[index];
  return /* @__PURE__ */ jsxs(motion.article, { className: `stat-card tone-${item.tone}`, initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 + index * 0.07 }, children: [
    /* @__PURE__ */ jsxs("div", { className: "stat-top", children: [
      /* @__PURE__ */ jsx("span", { children: item.label }),
      /* @__PURE__ */ jsx(Icon, { size: 17 })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "stat-value", children: [
      formatNumber(count),
      /* @__PURE__ */ jsx("small", { children: item.suffix })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "stat-bottom", children: [
      /* @__PURE__ */ jsx("span", { children: item.delta }),
      /* @__PURE__ */ jsx("i", { children: /* @__PURE__ */ jsx("b", { style: { width: `${35 + index * 9}%` } }) })
    ] })
  ] });
}
function LiveMonitor() {
  const [tick, setTick] = useState(0);
  const events = useMemo(() => getThreatSnapshot(tick), [tick]);
  useEffect(() => {
    const interval = window.setInterval(() => setTick((value) => value + 1), 3e3);
    return () => window.clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "monitor-grid", id: "threat-feed", children: [
    /* @__PURE__ */ jsxs("article", { className: "terminal-panel panel", children: [
      /* @__PURE__ */ jsxs("div", { className: "terminal-bar", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("i", {}),
          /* @__PURE__ */ jsx("i", {}),
          /* @__PURE__ */ jsx("i", {})
        ] }),
        /* @__PURE__ */ jsx("span", { children: "cybershield://live-monitor" }),
        /* @__PURE__ */ jsxs("b", { children: [
          /* @__PURE__ */ jsx(CircleDot, { size: 12 }),
          " STREAMING"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "terminal-status", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("small", { children: "SENSOR MESH" }),
          /* @__PURE__ */ jsx("strong", { children: "128 / 128 ONLINE" })
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("small", { children: "PACKETS ANALYZED" }),
          /* @__PURE__ */ jsx("strong", { children: "2.48M / MIN" })
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("small", { children: "RESPONSE LATENCY" }),
          /* @__PURE__ */ jsx("strong", { children: "18.7 MS" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "terminal-table", children: [
        /* @__PURE__ */ jsxs("div", { className: "terminal-row terminal-head", children: [
          /* @__PURE__ */ jsx("span", { children: "TIME" }),
          /* @__PURE__ */ jsx("span", { children: "EVENT" }),
          /* @__PURE__ */ jsx("span", { children: "SOURCE" }),
          /* @__PURE__ */ jsx("span", { children: "TARGET" }),
          /* @__PURE__ */ jsx("span", { children: "SEVERITY" })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "popLayout", children: events.map((event, index) => /* @__PURE__ */ jsxs(motion.div, { className: "terminal-row", initial: { opacity: 0, x: -12 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.06 }, children: [
          /* @__PURE__ */ jsx("time", { children: event.time }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("i", { className: "event-dot" }),
            " ",
            event.threat
          ] }),
          /* @__PURE__ */ jsx("code", { children: event.source }),
          /* @__PURE__ */ jsx("span", { children: event.target }),
          /* @__PURE__ */ jsx("b", { className: severityClass(event.severity), children: event.severity })
        ] }, `${event.id}-${tick}`)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "terminal-command", children: [
        /* @__PURE__ */ jsx("span", { children: "root@cs-soc:~$" }),
        /* @__PURE__ */ jsx("b", { children: "monitor --stream --correlate" }),
        /* @__PURE__ */ jsx("i", {})
      ] }),
      /* @__PURE__ */ jsx("div", { className: "scanner-line" })
    ] }),
    /* @__PURE__ */ jsxs("aside", { className: "status-stack", children: [
      /* @__PURE__ */ jsxs("article", { className: "panel posture-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "posture-head", children: [
          /* @__PURE__ */ jsx("span", { children: "DEFENSE POSTURE" }),
          /* @__PURE__ */ jsx(Shield, { size: 18 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "posture-score", children: [
          /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 120 120", children: [
            /* @__PURE__ */ jsx("circle", { cx: "60", cy: "60", r: "50" }),
            /* @__PURE__ */ jsx(motion.circle, { cx: "60", cy: "60", r: "50", initial: { pathLength: 0 }, animate: { pathLength: 0.86 }, transition: { duration: 1.5 } })
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("strong", { children: "86" }),
            "/100"
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "Strong posture" }),
        /* @__PURE__ */ jsx("p", { children: "Three controls need analyst review." }),
        /* @__PURE__ */ jsxs("button", { children: [
          "View recommendations ",
          /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "panel source-card", children: [
        /* @__PURE__ */ jsx("span", { children: "FEED HEALTH" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("i", { className: "ok" }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Commercial Intel" }),
            /* @__PURE__ */ jsx("small", { children: "32 sources · synced" })
          ] }),
          /* @__PURE__ */ jsx("b", { children: "100%" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("i", { className: "ok" }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Open Source" }),
            /* @__PURE__ */ jsx("small", { children: "74 sources · synced" })
          ] }),
          /* @__PURE__ */ jsx("b", { children: "98%" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("i", { className: "warn" }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Dark Web" }),
            /* @__PURE__ */ jsx("small", { children: "22 sources · delayed" })
          ] }),
          /* @__PURE__ */ jsx("b", { children: "87%" })
        ] })
      ] })
    ] })
  ] });
}
function SettingsPanel({ open, onClose, settings, setSettings }) {
  const rows = [{ key: "theme", icon: Moon, label: "Blackout theme", detail: "Increase contrast and reduce ambient color." }, { key: "animations", icon: Sparkles, label: "Interface motion", detail: "Enable transitions and telemetry movement." }, { key: "compact", icon: LayoutDashboard, label: "Compact mode", detail: "Reduce spacing for high-density monitoring." }, { key: "sound", icon: settings.sound ? Volume2 : VolumeX, label: "Alert sound", detail: "Audio cues for critical notifications." }];
  return /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, { className: "settings-backdrop", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, children: /* @__PURE__ */ jsxs(motion.aside, { className: "settings-panel", initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" }, transition: { type: "spring", damping: 28 }, onClick: (event) => event.stopPropagation(), children: [
    /* @__PURE__ */ jsxs("div", { className: "settings-head", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { children: "CONSOLE PREFERENCES" }),
        /* @__PURE__ */ jsx("h2", { children: "Settings" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "icon-button", onClick: onClose, children: /* @__PURE__ */ jsx(X, { size: 20 }) })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "settings-intro", children: "Tune the CyberShield interface for your workspace and focus level." }),
    /* @__PURE__ */ jsx("div", { className: "settings-list", children: rows.map((row) => /* @__PURE__ */ jsxs("button", { onClick: () => setSettings({ ...settings, [row.key]: !settings[row.key] }), children: [
      /* @__PURE__ */ jsx(row.icon, { size: 19 }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("strong", { children: row.label }),
        /* @__PURE__ */ jsx("small", { children: row.detail })
      ] }),
      /* @__PURE__ */ jsx("i", { className: settings[row.key] ? "active" : "", children: /* @__PURE__ */ jsx("b", {}) })
    ] }, row.key)) }),
    /* @__PURE__ */ jsxs("div", { className: "settings-footer", children: [
      /* @__PURE__ */ jsx(Headphones, { size: 18 }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Analyst profile" }),
        /* @__PURE__ */ jsx("small", { children: "Tier 2 · Global operations" })
      ] })
    ] })
  ] }) }) });
}
function AmbientUI() {
  const [cursor, setCursor] = useState({ x: -30, y: -30 });
  const [notification, setNotification] = useState(0);
  useEffect(() => {
    const move = (event) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move);
    const timer = window.setInterval(() => setNotification((value) => (value + 1) % notifications.length), 4500);
    return () => {
      window.removeEventListener("mousemove", move);
      window.clearInterval(timer);
    };
  }, []);
  const item = notifications[notification];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(motion.div, { className: "custom-cursor", animate: { x: cursor.x - 7, y: cursor.y - 7 }, transition: { type: "spring", stiffness: 900, damping: 45 } }),
    /* @__PURE__ */ jsxs(motion.div, { className: `notification-toast notice-${item.tone}`, initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, children: [
      /* @__PURE__ */ jsx(BellRing, { size: 18 }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("strong", { children: item.title }),
        /* @__PURE__ */ jsx("small", { children: item.detail })
      ] }),
      /* @__PURE__ */ jsx("i", {})
    ] }, notification)
  ] });
}
function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({ theme: false, animations: true, compact: false, sound: false });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 950);
    return () => window.clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", { id: "top", className: `app ${settings.theme ? "theme-blackout" : ""} ${settings.compact ? "compact-mode" : ""} ${settings.animations ? "" : "reduce-motion"}`, children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: loading && /* @__PURE__ */ jsxs(motion.div, { className: "loading-screen", exit: { opacity: 0 }, children: [
      /* @__PURE__ */ jsxs("div", { className: "loader-shield", children: [
        /* @__PURE__ */ jsx(Shield, { size: 38 }),
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("b", {})
      ] }),
      /* @__PURE__ */ jsx("strong", { children: "CYBERSHIELD" }),
      /* @__PURE__ */ jsx("span", { children: "INITIALIZING THREAT INTELLIGENCE" }),
      /* @__PURE__ */ jsx("div", { className: "loading-track", children: /* @__PURE__ */ jsx(motion.i, { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 0.8 } }) }),
      /* @__PURE__ */ jsxs("div", { className: "loading-skeleton", children: [
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("i", {})
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(motion.div, { className: "scroll-progress", style: { scaleX: progress } }),
    /* @__PURE__ */ jsx("div", { className: "noise-layer" }),
    /* @__PURE__ */ jsx("div", { className: "ambient-grid" }),
    /* @__PURE__ */ jsx("div", { className: "particle-field", children: Array.from({ length: 18 }).map((_, index) => /* @__PURE__ */ jsx("i", { style: { "--x": `${index * 37 % 100}%`, "--y": `${index * 61 % 100}%`, "--delay": `${index * -0.4}s` } }, index)) }),
    /* @__PURE__ */ jsx(Navigation, { onOpenSettings: () => setSettingsOpen(true) }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "hero", id: "overview", children: [
        /* @__PURE__ */ jsxs("div", { className: "hero-copy", children: [
          /* @__PURE__ */ jsxs(motion.span, { className: "hero-status", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.25 }, children: [
            /* @__PURE__ */ jsx("i", {}),
            " LIVE THREAT INTELLIGENCE ",
            /* @__PURE__ */ jsx("b", { children: "GLOBAL / 14:32 UTC" })
          ] }),
          /* @__PURE__ */ jsxs(motion.h1, { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.32 }, children: [
            "See the attack",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { children: "before it lands." })
          ] }),
          /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.45 }, children: "Advanced cyber threat intelligence for analysts who need context, not noise. Monitor signals, investigate infrastructure, and understand risk from one command surface." }),
          /* @__PURE__ */ jsxs(motion.div, { className: "hero-actions", initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.55 }, children: [
            /* @__PURE__ */ jsxs("a", { className: "button button-primary", href: "#dashboard", children: [
              /* @__PURE__ */ jsx(LayoutDashboard, { size: 17 }),
              " View Dashboard"
            ] }),
            /* @__PURE__ */ jsxs("a", { className: "button button-ghost", href: "#threat-feed", children: [
              /* @__PURE__ */ jsx(Terminal, { size: 17 }),
              " Threat Feed"
            ] }),
            /* @__PURE__ */ jsxs("a", { className: "text-link", href: "#knowledge", children: [
              "Knowledge Hub ",
              /* @__PURE__ */ jsx(ArrowDown, { size: 15 })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hero-metrics", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "42" }),
              " countries monitored"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "128" }),
              " intelligence feeds"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "18.7ms" }),
              " detection latency"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { className: "hero-radar", initial: { opacity: 0, scale: 0.88 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1, delay: 0.3 }, children: [
          /* @__PURE__ */ jsx("div", { className: "radar-orbit orbit-one" }),
          /* @__PURE__ */ jsx("div", { className: "radar-orbit orbit-two" }),
          /* @__PURE__ */ jsx("div", { className: "radar-sweep" }),
          /* @__PURE__ */ jsxs("div", { className: "radar-core", children: [
            /* @__PURE__ */ jsx(Shield, { size: 44 }),
            /* @__PURE__ */ jsx("span", { children: "CS" })
          ] }),
          ["CVE", "APT", "IOC", "C2"].map((label, index) => /* @__PURE__ */ jsxs("i", { className: `radar-node node-${index + 1}`, children: [
            /* @__PURE__ */ jsx("b", {}),
            label
          ] }, label)),
          /* @__PURE__ */ jsxs("div", { className: "radar-caption", children: [
            /* @__PURE__ */ jsx("span", { children: "SIGNAL CORRELATION" }),
            /* @__PURE__ */ jsx("strong", { children: "ACTIVE SCAN" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-section", id: "dashboard", children: [
        /* @__PURE__ */ jsxs("div", { className: "dashboard-label", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx(MousePointer2, { size: 14 }),
            " COMMAND OVERVIEW"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Last synchronized 14 seconds ago" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "stats-grid", children: stats.map((item, index) => /* @__PURE__ */ jsx(StatCard, { item, index }, item.label)) }),
        /* @__PURE__ */ jsx(LiveMonitor, {})
      ] }),
      /* @__PURE__ */ jsx(ThreatAnalytics, {}),
      /* @__PURE__ */ jsx(NewsHub, {}),
      /* @__PURE__ */ jsx(IndicatorIntelligence, {}),
      /* @__PURE__ */ jsx(GlobalThreatMap, {}),
      /* @__PURE__ */ jsx(KnowledgeHub, {}),
      /* @__PURE__ */ jsx(CveAndTools, {})
    ] }),
    /* @__PURE__ */ jsxs("footer", { children: [
      /* @__PURE__ */ jsxs("a", { className: "brand footer-brand", href: "#top", children: [
        /* @__PURE__ */ jsx("span", { className: "brand-mark", children: /* @__PURE__ */ jsx(Shield, { size: 20 }) }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("strong", { children: "CYBER" }),
          "SHIELD",
          /* @__PURE__ */ jsx("small", { children: "ADVANCED THREAT INTELLIGENCE" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Built for cybersecurity awareness and threat intelligence.",
        /* @__PURE__ */ jsx("br", {}),
        "Designed & Developed by ",
        /* @__PURE__ */ jsx("strong", { children: "Challa Madhumitha" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("a", { href: "https://github.com/MadhuWebCraft", target: "_blank", rel: "noreferrer", children: "GitHub" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/in/challa-madhumitha-a9667b335/", target: "_blank", rel: "noreferrer", children: "LinkedIn" }),
        /* @__PURE__ */ jsx("span", { children: "© 2026" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("button", { className: "fab", onClick: () => setSettingsOpen(true), "aria-label": "Open quick settings", children: [
      /* @__PURE__ */ jsx(Settings, { size: 20 }),
      /* @__PURE__ */ jsx("span", { children: "Console settings" })
    ] }),
    /* @__PURE__ */ jsx("a", { className: "scroll-top", href: "#top", "aria-label": "Scroll to top", children: /* @__PURE__ */ jsx(ArrowUp, { size: 18 }) }),
    /* @__PURE__ */ jsx(SettingsPanel, { open: settingsOpen, onClose: () => setSettingsOpen(false), settings, setSettings }),
    /* @__PURE__ */ jsx(AmbientUI, {})
  ] });
}
const SplitComponent = DashboardPage;
export {
  SplitComponent as component
};
