"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useToast, type Toast, type ToastType } from "../context/ToastContext"
import { CheckCircle, XCircle, Info, X } from "lucide-react"

const ToastIcon = ({ type }: { type: ToastType }) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-500" />
    case "error":
      return <XCircle className="w-5 h-5 text-red-500" />
    case "info":
      return <Info className="w-5 h-5 text-blue-500" />
  }
}

const ToastItem = ({ toast }: { toast: Toast }) => {
  const { removeToast } = useToast()

  const getAccentColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "border-l-green-500"
      case "error":
        return "border-l-red-500"
      case "info":
        return "border-l-blue-500"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`
        w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
        rounded-lg shadow-lg border-l-4 ${getAccentColor(toast.type)}
        p-4 mb-3 relative
      `}
    >
      <button
        onClick={() => removeToast(toast.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <ToastIcon type={toast.type} />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{toast.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{toast.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
