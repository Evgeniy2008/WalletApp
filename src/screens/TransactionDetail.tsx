import { useMemo } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import transactionsData from '../data/transactions.json'
import type { Transaction } from '../types'
import { formatAmount, formatCurrency, formatDateLabel } from '../utils'

export default function TransactionDetail() {
  const params = useParams()
  const location = useLocation()
  const stateTransaction = location.state && (location.state as { transaction?: Transaction }).transaction
  const transaction = useMemo(
    () => stateTransaction ?? (transactionsData as Transaction[]).find((item) => item.id === params.id),
    [params.id, stateTransaction],
  )

  if (!transaction) {
    return (
      <main className="app-shell">
        <div className="detail-card">
          <Link to="/" className="back-link">
            <i className="fa-solid fa-arrow-left"></i>
            Back
          </Link>
          <div className="empty-state">Transaction not found.</div>
        </div>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <div className="detail-header">
        <Link to="/" className="back-link">
          <i className="fa-solid fa-arrow-left"></i>
          Back
        </Link>
      </div>
      <section className="detail-hero">
        <div className="detail-amount">{formatAmount(transaction.amount, transaction.type)}</div>
        <div className="detail-name">{transaction.name}</div>
        <div className="detail-meta">{formatDateLabel(transaction.date)}</div>
      </section>
      <section className="detail-card detail-info-card">
        <div className="detail-card-row">
          <span className="detail-card-label">Status</span>
          <span className="detail-card-value">Approved</span>
        </div>
        <div className="detail-card-subtext">RBC Bank Debit Card</div>
      </section>
      <section className="detail-card detail-fields-card">
        <div className="field-row">
          <span className="field-label">Transaction</span>
          <span>{transaction.type}</span>
        </div>
        <div className="field-row">
          <span className="field-label">Description</span>
          <span>{transaction.description}</span>
        </div>
        <div className="field-row">
          <span className="field-label">Authorized User</span>
          <span>{transaction.authorizedUser ?? '—'}</span>
        </div>
        <div className="field-row">
          <span className="field-label">Pending</span>
          <span>{transaction.pending ? 'Yes' : 'No'}</span>
        </div>
        <div className="field-row">
          <span className="field-label">Total</span>
          <span>{formatCurrency(transaction.amount)}</span>
        </div>
      </section>
    </main>
  )
}
