"use client"

import type React from "react"
import FileCard from "../components/FileCard"
import FolderCard from "../components/FolderCard"
import { RotateCcw, Trash2 } from "lucide-react"
// import { ArrowUpTrayIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline"


const Trash: React.FC = () => {
  // Mock data for deleted items
  const deletedFolders = [
    { name: "Old Project", itemCount: 8, deletedDate: "2 days ago" },
    { name: "Temp Files", itemCount: 15, deletedDate: "1 week ago" },
  ]

  const deletedFiles = [
    { name: "old-document.docx", type: "document" as const, size: "1.2 MB", deletedDate: "1 day ago" },
    { name: "blurry-photo.jpg", type: "image" as const, size: "3.1 MB", deletedDate: "3 days ago" },
    { name: "draft-video.mp4", type: "video" as const, size: "22.5 MB", deletedDate: "5 days ago" },
    { name: "unused-file.txt", type: "other" as const, size: "45 KB", deletedDate: "1 week ago" },
  ]

  const handleRestore = (itemName: string, itemType: "file" | "folder") => {
    console.log(`Restore ${itemType}: ${itemName}`)
    // Implement restore logic
  }

  const handleDeleteForever = (itemName: string, itemType: "file" | "folder") => {
    console.log(`Delete forever ${itemType}: ${itemName}`)
    // Implement permanent delete logic
  }

  const TrashActions: React.FC<{ itemName: string; itemType: "file" | "folder" }> = ({ itemName, itemType }) => (
    <div className="flex space-x-1 mt-3 pt-2">
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleRestore(itemName, itemType)
        }}
        className="flex items-center px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
      >
        <RotateCcw className="w-3 h-3 mr-1" />
        Restore
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleDeleteForever(itemName, itemType)
        }}
        className="flex items-center px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
      >
        <Trash2 className="w-3 h-3 mr-1" />
        Delete
      </button>
    </div>
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Trash</h1>
        <button className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
          Empty Trash
        </button>
      </div>

      {deletedFolders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Deleted Folders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {deletedFolders.map((folder, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
              >
                <FolderCard name={folder.name} itemCount={folder.itemCount} modifiedDate={folder.deletedDate} />
                <TrashActions itemName={folder.name} itemType="folder" />
              </div>
            ))}
          </div>
        </div>
      )}

      {deletedFiles.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Deleted Files</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {deletedFiles.map((file, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
              >
                <FileCard name={file.name} type={file.type} size={file.size} modifiedDate={file.deletedDate} />
                <TrashActions itemName={file.name} itemType="file" />
              </div>
            ))}
          </div>
        </div>
      )}

      {deletedFolders.length === 0 && deletedFiles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Trash is empty.</p>
        </div>
      )}
    </div>
  )
}

export default Trash
