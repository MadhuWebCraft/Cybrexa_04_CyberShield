# CyberShield

CyberShield is a premium, responsive cyber threat intelligence dashboard built to resemble a modern Security Operations Center command surface. It gives cybersecurity professionals and students a polished way to explore threat telemetry, security news, vulnerabilities, global activity, and defensive concepts.

## Highlights

- Animated SOC overview with live statistics and rotating alert notifications
- Auto-refreshing terminal-style threat monitor
- Recharts analytics for incidents, attack types, and severity distribution
- Searchable, filterable cyber intelligence news feed
- Simulated IP and domain enrichment workflow
- Interactive cybersecurity glossary and vulnerability watchlist
- Animated global threat map with geographic risk markers
- Analyst tools directory, accessibility states, responsive navigation, and interface settings

## Technology

- React 19 and TypeScript
- TanStack Start and TanStack Router
- Vite and Tailwind CSS 4
- Framer Motion
- Recharts
- Lucide React
- Netlify

## Local Development

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

The Vite application runs on the port reported in the terminal. For Netlify platform emulation, use Netlify Dev with the project configuration.

## Customization

Edit `src/data/mockData.ts` to replace placeholder intelligence with your own content. API-backed news or threat feeds can be introduced through `src/services/` without changing the presentation components. Brand colors, typography, spacing, and responsive behavior are centralized in `src/styles.css`.

The included CVEs, incidents, scores, and indicator results are demonstration data and should not be treated as current security advisories.
