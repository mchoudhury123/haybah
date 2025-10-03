import { Suspense } from 'react'
import ReceiptClient from './ReceiptClient'

export default function ReceiptPage() {
  return (
    <Suspense fallback={<div>Loading receipt...</div>}>
      <ReceiptClient />
    </Suspense>
  )
}
