// "use client"

// import type React from "react"
// import { createContext, useContext, useState, useCallback } from "react"

// export type ToastType = "success" | "error" | "info"

// export interface Toast {
//   id: string
//   type: ToastType
//   title: string
//   description: string
//   duration?: number
// }

// interface ToastContextType {
//   toasts: Toast[]
//   addToast: (toast: Omit<Toast, "id">) => void
//   removeToast: (id: string) => void
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined)

// export function ToastProvider({ children }: { children: React.ReactNode }) {
//   const [toasts, setToasts] = useState<Toast[]>([])

//   const addToast = useCallback((toast: Omit<Toast, "id">) => {
//     const id = Math.random().toString(36).substr(2, 9)
//     const newToast = { ...toast, id }

//     setToasts((prev) => [...prev, newToast])

//     // Auto-dismiss after specified duration or 3 seconds
//     setTimeout(() => {
//       removeToast(id)
//     }, toast.duration || 3000)
//   }, [])

//   const removeToast = useCallback((id: string) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id))
//   }, [])

//   return <ToastContext.Provider value={{ toasts, addToast, removeToast }}>{children}</ToastContext.Provider>
// }

// export function useToast() {
//   const context = useContext(ToastContext)
//   if (context === undefined) {
//     throw new Error("useToast must be used within a ToastProvider")
//   }
//   return context
// }

"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export type ToastType = "success" | "error" | "info"

export interface Toast {
  id: string
  type: ToastType
  title: string
  description: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const pushEnabled = JSON.parse(localStorage.getItem("pushEnabled") || "true")
    if (!pushEnabled) return //  don’t show toast if disabled

    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    // Auto-dismiss after specified duration or 3 seconds
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
