"use client"

import type React from "react"
import FileCard from "../components/FileCard"
import FolderCard from "../components/FolderCard"

const Starred: React.FC = () => {
  // Mock data for starred items
  const starredFolders = [
    { name: "Important Documents", itemCount: 12, modifiedDate: "1 week ago" },
    { name: "Favorite Photos", itemCount: 67, modifiedDate: "2 weeks ago" },
  ]

  const starredFiles = [
    { name: "contract.pdf", type: "document" as const, size: "1.8 MB", modifiedDate: "3 days ago" },
    { name: "family-photo.jpg", type: "image" as const, size: "2.4 MB", modifiedDate: "1 week ago" },
    { name: "presentation-final.pptx", type: "document" as const, size: "4.2 MB", modifiedDate: "2 weeks ago" },
    { name: "favorite-song.mp3", type: "audio" as const, size: "3.8 MB", modifiedDate: "1 month ago" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Starred</h1>

      {starredFolders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Starred Folders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {starredFolders.map((folder, index) => (
              <FolderCard
                key={index}
                name={folder.name}
                itemCount={folder.itemCount}
                modifiedDate={folder.modifiedDate}
                onClick={() => console.log(`Open starred folder: ${folder.name}`)}
              />
            ))}
          </div>
        </div>
      )}

      {starredFiles.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Starred Files</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {starredFiles.map((file, index) => (
              <FileCard
                key={index}
                name={file.name}
                type={file.type}
                size={file.size}
                modifiedDate={file.modifiedDate}
                onClick={() => console.log(`Open starred file: ${file.name}`)}
              />
            ))}
          </div>
        </div>
      )}

      {starredFolders.length === 0 && starredFiles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No starred items yet. Star files and folders to find them here quickly.</p>
        </div>
      )}
    </div>
  )
}

export default Starred
