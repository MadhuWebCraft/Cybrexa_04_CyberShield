import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'CyberShield | Advanced Cyber Threat Intelligence Dashboard',
      },
      {
        name: 'description',
        content: 'CyberShield is an advanced dashboard for monitoring cyber threats, vulnerabilities, security news, and global risk.',
      },
      {
        name: 'theme-color',
        content: '#0B1120',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.svg',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
