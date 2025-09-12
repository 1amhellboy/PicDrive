"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface RenameModalProps {
  isOpen: boolean
  onClose: () => void
  currentName: string
  onRename: (newName: string) => void
}

const RenameModal: React.FC<RenameModalProps> = ({ isOpen, onClose, currentName, onRename }) => {
  const [newName, setNewName] = useState(currentName)

  useEffect(() => {
    if (isOpen) {
      setNewName(currentName)
    }
  }, [isOpen, currentName])

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (newName.trim() && newName !== currentName) {
  //     onRename(newName.trim())
  //   }
  //   onClose()
  // }

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  const trimmed = newName.trim()
  if (!trimmed || trimmed === currentName) {
    return onClose() // don't allow empty or unchanged
  }
  onRename(trimmed)
  onClose()
}


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0  flex items-center backdrop-blur-none justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-black">Rename</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black background-white"
            autoFocus
            selectOnFocus
          />

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded font-medium"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RenameModal
