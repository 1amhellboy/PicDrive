"use client"

import type React from "react"
import { useState } from "react"
import { Folder, Check, X } from "lucide-react"

const NewFolder: React.FC = () => {
  const [folderName, setFolderName] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!folderName.trim()) return

    setIsCreating(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Creating folder:", folderName)
      // Implement folder creation logic here
      setFolderName("")
      setIsCreating(false)
    }, 1000)
  }

  const handleCancel = () => {
    setFolderName("")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create New Folder</h1>

      <div className="max-w-md mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <Folder className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <form onSubmit={handleCreateFolder}>
            <div className="mb-6">
              <label htmlFor="folderName" className="block text-sm font-medium text-gray-700 mb-2">
                Folder Name
              </label>
              <input
                type="text"
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isCreating}
                autoFocus
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isCreating}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={!folderName.trim() || isCreating}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Check className="w-4 h-4 mr-2" />
                {isCreating ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">The folder will be created in your current location</p>
        </div>
      </div>
    </div>
  )
}

export default NewFolder
