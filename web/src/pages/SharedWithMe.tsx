"use client"

import type React from "react"
import FileCard from "../components/FileCard"
import FolderCard from "../components/FolderCard"

interface SharedWithMeProps {
  viewMode: "grid" | "list"
}

const SharedWithMe: React.FC<SharedWithMeProps> = ({ viewMode }) => {
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

  const allItems = [...sharedFolders, ...sharedFiles]
  const totalItems = allItems.length

  return (
    <div className="p-6 bg-white min-h-screen w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-normal text-black">Shared with me</h1>
          <p className="text-sm text-gray-500 mt-1">{totalItems} items</p>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="bg-white">
          <div className="flex items-center px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-600">
            <div className="flex-1">Name</div>
            <div className="w-32 text-left">Modified</div>
            <div className="w-20 text-left">Size</div>
            <div className="w-8"></div>
          </div>
          <div>
            {sharedFolders.map((folder, index) => (
              <FolderCard
                key={`folder-${index}`}
                name={folder.name}
                itemCount={folder.itemCount}
                modifiedDate={folder.modifiedDate}
                viewMode="list"
                onClick={() => console.log(`Open shared folder: ${folder.name}`)}
              />
            ))}
            {sharedFiles.map((file, index) => (
              <FileCard
                key={`file-${index}`}
                name={file.name}
                type={file.type}
                size={file.size}
                modifiedDate={file.modifiedDate}
                viewMode="list"
                onClick={() => console.log(`Open shared file: ${file.name}`)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {sharedFolders.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Shared Folders</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {sharedFolders.map((folder, index) => (
                  <FolderCard
                    key={`folder-${index}`}
                    name={folder.name}
                    itemCount={folder.itemCount}
                    modifiedDate={folder.modifiedDate}
                    viewMode="grid"
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
                    key={`file-${index}`}
                    name={file.name}
                    type={file.type}
                    size={file.size}
                    modifiedDate={file.modifiedDate}
                    viewMode="grid"
                    onClick={() => console.log(`Open shared file: ${file.name}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {totalItems === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No files have been shared with you yet.</p>
        </div>
      )}
    </div>
  )
}

export default SharedWithMe