import { useMemo } from 'react'
import transactionsDataRaw from '../data/transactions.json'
import type { Transaction } from '../types'
import { formatCurrency, formatPoints, getDailyPoints, getRandomBalance } from '../utils'
import { TransactionItem } from '../components/TransactionItem'

const transactionsData = transactionsDataRaw as Transaction[]
const limit = 1500

export default function TransactionsList() {
  const balance = useMemo(() => getRandomBalance(), [])
  const available = useMemo(() => Math.max(limit - balance, 0), [balance])
  const today = new Date().getDate()
  const points = getDailyPoints(today)

  return (
    <main className="app-shell">
      <section className="overview-grid">
        <div className="overview-left">
          <div className="card balance-card">
            <div className="card-label">Card Balance</div>
            <div className="card-amount">{formatCurrency(balance)}</div>
            <div className="card-subtitle">{formatCurrency(available)} Available</div>
          </div>
          <div className="card points-card">
            <div className="card-label">Daily Points</div>
            <div className="points-value">{formatPoints(points)}</div>
            <div className="points-subtitle">Today</div>
          </div>
        </div>
        <div className="card due-card">
          <div>
            <div className="card-label">No Payment Due</div>
            <div className="due-copy">You've paid your balance.</div>
          </div>
          <div className="due-status" bis_skin_checked="1">
            <i className="fa-solid fa-check" aria-hidden="true"></i>
          </div>
        </div>
      </section>

      <section className="transactions-panel">
        <div className="transactions-heading">
          <h1>Latest Transactions</h1>
        </div>
        <div className="transaction-list">
          {transactionsData.slice(0, 10).map((transaction: Transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </section>
    </main>
  )
}
