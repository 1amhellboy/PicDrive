"use client"

import type React from "react"
import FileCard from "../components/FileCard"
import FolderCard from "../components/FolderCard"

interface MyDriveProps {
  viewMode: "grid" | "list"
}

const MyDrive: React.FC<MyDriveProps> = ({ viewMode }) => {
  const folders = [
    { name: "Marketing Assets", itemCount: 12, modifiedDate: "Yesterday" },
    { name: "Documents", itemCount: 8, modifiedDate: "2 weeks ago" },
  ]

  const files = [
    { name: "Project Presentation.pptx", type: "presentation" as const, size: "2.4 MB", modifiedDate: "2 hours ago" },
    { name: "Budget 2024.xlsx", type: "spreadsheet" as const, size: "1.2 MB", modifiedDate: "3 days ago" },
    { name: "Team Photo.jpg", type: "image" as const, size: "4.8 MB", modifiedDate: "1 week ago" },
    { name: "Meeting Recording.mp4", type: "video" as const, size: "156 MB", modifiedDate: "1 week ago" },
  ]

  const allItems = [
    ...folders.map((folder) => ({ ...folder, type: "folder" as const })),
    ...files.map((file) => ({ ...file, type: "file" as const })),
  ]

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-normal text-black">My Drive</h1>
          <p className="text-sm text-gray-500 mt-1">{allItems.length} items</p>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="bg-white">
          <div className="flex items-center px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-600">
            <div className="flex-1">Name</div>
            <div className="w-32 text-right">Modified</div>
            <div className="w-20 text-right">Size</div>
            <div className="w-8"></div>
          </div>
          <div>
            {folders.map((folder, index) => (
              <FolderCard
                key={`folder-${index}`}
                name={folder.name}
                itemCount={folder.itemCount}
                modifiedDate={folder.modifiedDate}
                viewMode="list"
                onClick={() => console.log(`Open folder: ${folder.name}`)}
              />
            ))}
            {files.map((file, index) => (
              <FileCard
                key={`file-${index}`}
                name={file.name}
                type={file.type}
                size={file.size}
                modifiedDate={file.modifiedDate}
                viewMode="list"
                onClick={() => console.log(`Open file: ${file.name}`)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {folders.map((folder, index) => (
            <FolderCard
              key={`folder-${index}`}
              name={folder.name}
              itemCount={folder.itemCount}
              modifiedDate={folder.modifiedDate}
              viewMode="grid"
              onClick={() => console.log(`Open folder: ${folder.name}`)}
            />
          ))}
          {files.map((file, index) => (
            <FileCard
              key={`file-${index}`}
              name={file.name}
              type={file.type}
              size={file.size}
              modifiedDate={file.modifiedDate}
              viewMode="grid"
              onClick={() => console.log(`Open file: ${file.name}`)}
            />
          ))}
        </div>
      )}

      {allItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Your drive is empty. Upload some files to get started!</p>
        </div>
      )}
    </div>
  )
}

export default MyDrive
