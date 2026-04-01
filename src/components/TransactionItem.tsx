import { Link } from 'react-router-dom'
import type { Transaction } from '../types'
import { formatAmount, formatDateLabel, getIconData } from '../utils'

type Props = {
  transaction: Transaction
}

export function TransactionItem({ transaction }: Props) {
  const iconData = getIconData(transaction.id)
  const amountClass = transaction.type === 'Payment' ? 'transaction-amount positive' : 'transaction-amount negative'
  const descriptionPrefix = transaction.pending ? 'Pending – ' : ''
  const userPrefix = transaction.authorizedUser ? `${transaction.authorizedUser} · ` : ''

  return (
    <Link to={`/tx/${transaction.id}`} state={{ transaction }} className="transaction-card">
      <div className="transaction-icon" style={{ background: iconData.color }}>
        <i className={`fa-solid ${iconData.icon}`} aria-hidden="true"></i>
      </div>
      <div className="transaction-copy">
        <div className="transaction-headline">
          <span className="transaction-name">{transaction.name}</span>
          <span className={amountClass}>{formatAmount(transaction.amount, transaction.type)}</span>
        </div>
        <div className="transaction-meta">
          <span>{descriptionPrefix}{transaction.description}</span>
          <span>{userPrefix}{formatDateLabel(transaction.date)}</span>
        </div>
      </div>
      <div className="transaction-arrow">
        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
      </div>
    </Link>
  )
}
