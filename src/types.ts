export type Transaction = {
  id: string
  type: 'Payment' | 'Credit'
  amount: number
  name: string
  description: string
  date: string
  pending?: boolean
  authorizedUser?: string
}
