export const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value)

export const severityClass = (severity: string) => `severity severity-${severity.toLowerCase()}`
