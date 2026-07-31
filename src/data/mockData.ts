import type { CveItem, GlossaryTerm, MapThreat, NewsItem, ThreatEvent } from '@/types'

export const stats = [
  { label: 'Active Threat Alerts', value: 1847, suffix: '', delta: '+12.4%', tone: 'danger' },
  { label: 'Critical Vulnerabilities', value: 42, suffix: '', delta: '+6 today', tone: 'warning' },
  { label: 'Latest Security News', value: 286, suffix: '', delta: '18 new', tone: 'primary' },
  { label: 'Threat Severity', value: 73, suffix: '%', delta: 'Elevated', tone: 'danger' },
  { label: 'Global Risk Score', value: 68, suffix: '/100', delta: '-2.1%', tone: 'violet' },
  { label: 'Feeds Updated', value: 128, suffix: '', delta: '14 sec ago', tone: 'success' },
]

export const news: NewsItem[] = [
  { id: 1, title: 'Ransomware operators shift to hypervisor-level encryption', description: 'Incident responders report a rise in campaigns targeting virtualization infrastructure to increase operational impact.', source: 'CyberShield Research', published: '31 Jul 2026', category: 'Ransomware', tone: 'red' },
  { id: 2, title: 'Critical identity bypass affects multi-cloud environments', description: 'A newly documented trust-chain weakness can permit privilege escalation across misconfigured cloud tenants.', source: 'CloudSec Dispatch', published: '31 Jul 2026', category: 'Cloud Security', tone: 'violet' },
  { id: 3, title: 'Security teams track adaptive phishing kit powered by AI', description: 'The campaign rewrites lures in real time and dynamically mirrors regional authentication portals.', source: 'Signal Wire', published: '30 Jul 2026', category: 'AI Security', tone: 'cyan' },
  { id: 4, title: 'Public sector supply chain campaign expands targeting', description: 'Threat intelligence links a cluster of signed loader activity to attacks against government contractors.', source: 'CivicCERT', published: '30 Jul 2026', category: 'Government', tone: 'amber' },
  { id: 5, title: 'Credential stealer adds browser wallet discovery module', description: 'A modular malware family now inventories extensions and session tokens before exfiltration.', source: 'Malware Atlas', published: '29 Jul 2026', category: 'Malware', tone: 'green' },
  { id: 6, title: 'Healthcare data exposure traced to API authorization gap', description: 'Researchers identified an object-level authorization issue in a widely deployed patient portal.', source: 'Breach Monitor', published: '28 Jul 2026', category: 'Data Breaches', tone: 'red' },
  { id: 7, title: 'Exploit activity follows disclosure of edge gateway flaw', description: 'Scanning and proof-of-concept reuse increased within hours of the coordinated vulnerability advisory.', source: 'Vulnerability Signal', published: '28 Jul 2026', category: 'Vulnerabilities', tone: 'amber' },
]

export const threatEvents: ThreatEvent[] = [
  { id: 'EVT-7F2A', threat: 'Cobalt Strike beacon', source: '185.220.101.14', target: 'Finance API', severity: 'Critical', time: '14:32:08' },
  { id: 'EVT-18BC', threat: 'Credential stuffing', source: '45.142.212.61', target: 'Identity Gateway', severity: 'High', time: '14:31:51' },
  { id: 'EVT-9D01', threat: 'Suspicious PowerShell', source: '10.44.8.12', target: 'ENG-WS-044', severity: 'Medium', time: '14:31:26' },
  { id: 'EVT-3CC8', threat: 'DNS tunneling', source: '91.214.124.87', target: 'Research VLAN', severity: 'High', time: '14:30:58' },
  { id: 'EVT-A821', threat: 'Port reconnaissance', source: '103.27.186.19', target: 'Edge Cluster', severity: 'Low', time: '14:30:41' },
]

export const glossary: GlossaryTerm[] = [
  { term: 'SIEM', title: 'Security Information & Event Management', summary: 'Centralized collection, correlation, and analysis of security telemetry.', detail: 'A SIEM ingests logs and signals from infrastructure, identities, endpoints, and applications. Detection rules, analytics, and investigation workflows help analysts identify suspicious activity at scale.' },
  { term: 'SOC', title: 'Security Operations Center', summary: 'The people, processes, and technology defending an organization.', detail: 'A SOC continuously monitors the environment, triages alerts, investigates incidents, coordinates response, and improves defensive coverage using threat intelligence and lessons learned.' },
  { term: 'XDR', title: 'Extended Detection & Response', summary: 'Detection and response spanning multiple security domains.', detail: 'XDR combines endpoint, identity, email, cloud, and network signals into cross-domain detections and coordinated response actions.' },
  { term: 'EDR', title: 'Endpoint Detection & Response', summary: 'Continuous endpoint telemetry, detection, and containment.', detail: 'EDR platforms record process, file, network, and identity activity on endpoints to detect malicious behavior and support response actions such as isolation.' },
  { term: 'MITRE ATT&CK', title: 'Adversary Tactics & Techniques', summary: 'A knowledge base describing observed attacker behavior.', detail: 'MITRE ATT&CK organizes adversary behavior into tactics and techniques, helping teams map detections, emulate threats, analyze incidents, and identify defensive gaps.' },
  { term: 'CVE', title: 'Common Vulnerabilities & Exposures', summary: 'A standardized identifier for publicly known vulnerabilities.', detail: 'CVE records provide a consistent way to reference a vulnerability across vendors, tools, advisories, and security teams.' },
  { term: 'CVSS', title: 'Common Vulnerability Scoring System', summary: 'A framework for communicating vulnerability severity.', detail: 'CVSS scores technical characteristics such as exploitability and impact. Organizations should combine the score with asset exposure and business context.' },
  { term: 'Zero Trust', title: 'Never Trust, Always Verify', summary: 'An access model based on explicit, continuous verification.', detail: 'Zero Trust reduces implicit trust by validating identity, device health, context, and authorization for every access decision while enforcing least privilege.' },
  { term: 'Ransomware', title: 'Extortion-driven Malware', summary: 'Malware and operations that deny access or threaten disclosure.', detail: 'Modern ransomware operations frequently combine data theft, encryption, service disruption, and public pressure to compel payment.' },
  { term: 'Malware', title: 'Malicious Software', summary: 'Software designed to disrupt, spy, steal, or gain unauthorized access.', detail: 'Malware includes loaders, stealers, trojans, worms, rootkits, ransomware, and other code used to achieve attacker objectives.' },
  { term: 'Phishing', title: 'Deceptive Social Engineering', summary: 'Messages or experiences designed to steal access or trigger actions.', detail: 'Phishing can target credentials, sessions, payments, malware execution, or sensitive data using email, SMS, voice, social media, and malicious sites.' },
  { term: 'APT', title: 'Advanced Persistent Threat', summary: 'A capable, sustained intrusion campaign pursuing strategic goals.', detail: 'APT activity often involves patient access, tailored tooling, operational security, and long-term collection aligned with espionage or strategic objectives.' },
]

export const cves: CveItem[] = [
  { id: 'CVE-2026-41872', severity: 'Critical', description: 'Remote code execution in a widely deployed edge management appliance.', product: 'Aegis Edge Controller 8.x', score: 9.8, reference: 'https://www.cve.org/' },
  { id: 'CVE-2026-39711', severity: 'High', description: 'Authentication token replay under specific proxy configurations.', product: 'Nimbus Identity Broker', score: 8.7, reference: 'https://www.cve.org/' },
  { id: 'CVE-2026-36204', severity: 'High', description: 'Path traversal permits access to restricted service configuration.', product: 'Orion DevOps Gateway', score: 8.1, reference: 'https://www.cve.org/' },
  { id: 'CVE-2026-34490', severity: 'Medium', description: 'Stored cross-site scripting in administrative audit views.', product: 'Sentinel Log Console', score: 6.4, reference: 'https://www.cve.org/' },
]

export const mapThreats: MapThreat[] = [
  { country: 'United States', count: 486, severity: 'High', x: 20, y: 39 },
  { country: 'Brazil', count: 184, severity: 'Medium', x: 34, y: 67 },
  { country: 'Germany', count: 278, severity: 'High', x: 51, y: 32 },
  { country: 'South Africa', count: 92, severity: 'Low', x: 55, y: 72 },
  { country: 'India', count: 354, severity: 'Critical', x: 69, y: 47 },
  { country: 'Singapore', count: 227, severity: 'High', x: 78, y: 60 },
  { country: 'Japan', count: 194, severity: 'Medium', x: 87, y: 39 },
  { country: 'Australia', count: 118, severity: 'Low', x: 84, y: 76 },
]

export const incidentTrend = [
  { month: 'Aug', incidents: 320, blocked: 272 }, { month: 'Sep', incidents: 410, blocked: 351 },
  { month: 'Oct', incidents: 388, blocked: 340 }, { month: 'Nov', incidents: 520, blocked: 461 },
  { month: 'Dec', incidents: 476, blocked: 429 }, { month: 'Jan', incidents: 608, blocked: 538 },
  { month: 'Feb', incidents: 547, blocked: 498 }, { month: 'Mar', incidents: 702, blocked: 642 },
  { month: 'Apr', incidents: 668, blocked: 604 }, { month: 'May', incidents: 784, blocked: 719 },
  { month: 'Jun', incidents: 731, blocked: 678 }, { month: 'Jul', incidents: 862, blocked: 801 },
]

export const attackTypes = [
  { name: 'Phishing', value: 31 }, { name: 'Malware', value: 24 }, { name: 'Ransomware', value: 18 },
  { name: 'Exploitation', value: 15 }, { name: 'DDoS', value: 12 },
]

export const tools = [
  { name: 'VirusTotal', description: 'Analyze suspicious files, domains, IPs, and URLs.', url: 'https://www.virustotal.com/', code: 'VT' },
  { name: 'Shodan', description: 'Search internet-connected devices and exposed services.', url: 'https://www.shodan.io/', code: 'SH' },
  { name: 'AbuseIPDB', description: 'Check and report malicious IP address activity.', url: 'https://www.abuseipdb.com/', code: 'AB' },
  { name: 'CVE Database', description: 'Research standardized vulnerability records.', url: 'https://www.cve.org/', code: 'CV' },
  { name: 'MITRE ATT&CK', description: 'Explore adversary tactics, techniques, and procedures.', url: 'https://attack.mitre.org/', code: 'MA' },
  { name: 'OWASP Top 10', description: 'Review critical web application security risks.', url: 'https://owasp.org/www-project-top-ten/', code: 'OW' },
]
