'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type ToastPayload = { title: string; description: string }
type ToastContextValue = { showToast: (toast: ToastPayload) => void }

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastPayload | null>(null)
  const showToast = useCallback((nextToast: ToastPayload) => {
    setToast(nextToast)
    window.setTimeout(() => setToast(null), 3200)
  }, [])
  const value = useMemo(() => ({ showToast }), [showToast])

  return <ToastContext.Provider value={value}>
    {children}
    {toast && <div className="bk-toast" role="status" aria-live="polite">
      <div><strong>{toast.title}</strong><p>{toast.description}</p></div>
      <button type="button" onClick={() => setToast(null)} aria-label="Fermer la notification">×</button>
    </div>}
  </ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}
