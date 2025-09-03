"use client"

import type React from "react"
import FileCard from "../components/FileCard"
import FolderCard from "../components/FolderCard"

const SharedWithMe: React.FC = () => {
  const sharedFolders = [
    { name: "Team Project", itemCount: 25, modifiedDate: "1 day ago" },
    { name: "Marketing Assets", itemCount: 18, modifiedDate: "3 days ago" },
  ]

  const sharedFiles = [
    { name: "quarterly-report.pdf", type: "document" as const, size: "1.2 MB", modifiedDate: "2 hours ago" },
    { name: "team-photo.jpg", type: "image" as const, size: "2.1 MB", modifiedDate: "1 day ago" },
    { name: "presentation.pptx", type: "document" as const, size: "3.4 MB", modifiedDate: "2 days ago" },
    { name: "demo-video.mp4", type: "video" as const, size: "28.5 MB", modifiedDate: "1 week ago" },
  ]

  return (
    <div className="h-full w-full p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Shared with me</h1>

      {sharedFolders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Shared Folders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {sharedFolders.map((folder, index) => (
              <FolderCard
                key={index}
                name={folder.name}
                itemCount={folder.itemCount}
                modifiedDate={folder.modifiedDate}
                onClick={() => console.log(`Open shared folder: ${folder.name}`)}
              />
            ))}
          </div>
        </div>
      )}

      {sharedFiles.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Shared Files</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {sharedFiles.map((file, index) => (
              <FileCard
                key={index}
                name={file.name}
                type={file.type}
                size={file.size}
                modifiedDate={file.modifiedDate}
                onClick={() => console.log(`Open shared file: ${file.name}`)}
              />
            ))}
          </div>
        </div>
      )}

      {sharedFolders.length === 0 && sharedFiles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No files have been shared with you yet.</p>
        </div>
      )}
    </div>
  )
}

export default SharedWithMe
