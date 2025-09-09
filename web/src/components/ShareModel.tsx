"use client"

import type React from "react"
import { useState } from "react"
import { X, Link, ChevronDown, Settings } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  fileName: string
  fileType: "file" | "folder"
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, fileName, fileType }) => {
  const [accessLevel, setAccessLevel] = useState("Restricted")
  const [showAccessDropdown, setShowAccessDropdown] = useState(false)

  const handleCopyLink = () => {
    // Simulate copying link to clipboard
    navigator.clipboard.writeText(`https://picdrive.com/share/${fileName}`)
    console.log("Link copied to clipboard")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[500px] max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-medium text-black">Share "{fileName}"</h2>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Add people input */}
          <div>
            <input
              type="text"
              placeholder="Add people, groups, and calendar events"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* People with access */}
          <div>
            <h3 className="text-sm font-medium text-black mb-3">People with access</h3>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                U
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-black">USER (you)</p>
                <p className="text-xs text-gray-500">user@picdrive.com</p>
              </div>
              <span className="text-sm text-gray-500">Owner</span>
            </div>
          </div>

          {/* General access */}
          <div>
            <h3 className="text-sm font-medium text-black mb-3">General access</h3>
            <div className="relative">
              <button
                onClick={() => setShowAccessDropdown(!showAccessDropdown)}
                className="flex items-center space-x-2 p-2 border border-gray-300 rounded hover:bg-gray-50 w-full"
              >
                <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-black">{accessLevel}</p>
                  <p className="text-xs text-gray-500">Only people with access can open with the link</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showAccessDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      setAccessLevel("Restricted")
                      setShowAccessDropdown(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-black"
                  >
                    Restricted
                  </button>
                  <button
                    onClick={() => {
                      setAccessLevel("Anyone with the link")
                      setShowAccessDropdown(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-black"
                  >
                    Anyone with the link
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-black"
            >
              <Link className="w-4 h-4" />
              <span>Copy link</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
