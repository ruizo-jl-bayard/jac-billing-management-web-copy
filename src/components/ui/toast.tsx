"use client"
import React, { createContext, useContext, useCallback, useState } from 'react'

type Toast = {
  id: string
  title?: string
  description?: string
  type?: 'default' | 'success' | 'error'
}

type ToastContext = {
  toast: (t: Omit<Toast, 'id'>) => string
  dismiss: (id: string) => void
}

const ctx = createContext<ToastContext | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = String(Date.now())
    setToasts((s) => [...s, { id, ...t }])
    // auto dismiss
    setTimeout(() => setToasts((s) => s.filter(x => x.id !== id)), 4000)
    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((s) => s.filter(x => x.id !== id))
  }, [])

  return (
    <ctx.Provider value={{ toast, dismiss }}>
      {children}
      <div aria-live="polite" className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className={`max-w-sm w-full rounded-md p-3 shadow-lg text-sm text-white ${t.type === 'error' ? 'bg-red-600' : t.type === 'success' ? 'bg-green-600' : 'bg-gray-800'}`}>
            {t.title && <div className="font-medium">{t.title}</div>}
            {t.description && <div className="mt-1 opacity-90">{t.description}</div>}
          </div>
        ))}
      </div>
    </ctx.Provider>
  )
}

export function useToast() {
  const c = useContext(ctx)
  if (!c) throw new Error('useToast must be used within ToastProvider')
  return c
}

export default ToastProvider
