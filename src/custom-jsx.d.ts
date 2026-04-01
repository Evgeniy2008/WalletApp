import type * as React from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends React.HTMLAttributes<T> {
    bis_skin_checked?: string
  }
}
