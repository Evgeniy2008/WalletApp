import type { Transaction } from './types'

const iconMap = [
  { icon: 'fa-credit-card', color: '#111827' },
  { icon: 'fa-wallet', color: '#111827' },
  { icon: 'fa-shopping-bag', color: '#1f2937' },
  { icon: 'fa-box', color: '#1f2937' },
  { icon: 'fa-car', color: '#111827' },
  { icon: 'fa-coffee', color: '#111827' },
  { icon: 'fa-gift', color: '#1f2937' },
  { icon: 'fa-arrow-right', color: '#111827' }
]

export const getIconData = (id: string) => {
  const index = Array.from(id).reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return iconMap[index % iconMap.length]
}

export const formatAmount = (amount: number, type: Transaction['type']) =>
  type === 'Payment' ? `+${amount.toFixed(2)}` : `-${amount.toFixed(2)}`

export const formatCurrency = (value: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export const formatDateLabel = (dateString: string) => {
  const date = new Date(`${dateString}T00:00:00`)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (daysAgo >= 0 && daysAgo < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }

  return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' })
}

export const getDailyPoints = (dayOfSeason: number) => {
  if (dayOfSeason <= 1) return 2
  if (dayOfSeason === 2) return 3
  let prev2 = 2
  let prev1 = 3
  let result = 3

  for (let day = 3; day <= dayOfSeason; day += 1) {
    result = Math.round(prev2 + 0.6 * prev1)
    prev2 = prev1
    prev1 = result
  }

  return result
}

export const formatPoints = (points: number) =>
  points > 1000 ? `${Math.round(points / 1000)}K` : `${points}`

export const getRandomBalance = () => {
  const value = Math.random() * 1400 + 50
  return Math.round(value * 100) / 100
}

export const getTransactionLabel = (transaction: Transaction) => {
  const status = transaction.pending ? 'Pending • ' : ''
  const user = transaction.authorizedUser ? `${transaction.authorizedUser} • ` : ''
  return `${status}${user}${formatDateLabel(transaction.date)}`
}
