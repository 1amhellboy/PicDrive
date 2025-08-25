"use client"

import type React from "react"
import { Search, Upload, FolderPlus, Settings, Grid3X3, List, User } from "lucide-react"

interface TopbarProps {
  onUploadClick: () => void
  onNewFolderClick: () => void
  onSettingsClick: () => void
  onProfileClick: () => void // Added profile click handler
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

const Topbar: React.FC<TopbarProps> = ({
  onUploadClick,
  onNewFolderClick,
  onSettingsClick,
  onProfileClick, // Added profile click handler
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search in Drive"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-full focus:bg-white focus:ring-1 focus:ring-gray-300 focus:border-transparent border border-gray-200 transition-all text-black placeholder-gray-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-6">
          <button
            onClick={onUploadClick}
            className="flex items-center px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </button>

          <button
            onClick={onNewFolderClick}
            className="flex items-center px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            New folder
          </button>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"} transition-colors`}
            >
              <List className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"} transition-colors`}
            >
              <Grid3X3 className="w-5 h-5 text-black" />
            </button>
            <button onClick={onSettingsClick} className="p-2 rounded hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 text-black" />
            </button>
            <button onClick={onProfileClick} className="p-2 rounded hover:bg-gray-50 transition-colors">
              <User className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
