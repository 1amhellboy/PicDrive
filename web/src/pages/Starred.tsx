"use client"

import type React from "react"
import FileCard from "../components/FileCard"
import FolderCard from "../components/FolderCard"

interface StarredProps {
  viewMode: "grid" | "list"
}

const Starred: React.FC<StarredProps> = ({ viewMode }) => {
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

  const allItems = [...starredFolders, ...starredFiles]
  const totalItems = allItems.length

  return (
    <div className="p-6 bg-white min-h-screen w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-normal text-black">Starred</h1>
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
            {starredFolders.map((folder, index) => (
              <FolderCard
                key={`folder-${index}`}
                name={folder.name}
                itemCount={folder.itemCount}
                modifiedDate={folder.modifiedDate}
                viewMode="list"
                onClick={() => console.log(`Open starred folder: ${folder.name}`)}
              />
            ))}
            {starredFiles.map((file, index) => (
              <FileCard
                key={`file-${index}`}
                name={file.name}
                type={file.type}
                size={file.size}
                modifiedDate={file.modifiedDate}
                viewMode="list"
                onClick={() => console.log(`Open starred file: ${file.name}`)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {starredFolders.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Starred Folders</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {starredFolders.map((folder, index) => (
                  <FolderCard
                    key={`folder-${index}`}
                    name={folder.name}
                    itemCount={folder.itemCount}
                    modifiedDate={folder.modifiedDate}
                    viewMode="grid"
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
                    key={`file-${index}`}
                    name={file.name}
                    type={file.type}
                    size={file.size}
                    modifiedDate={file.modifiedDate}
                    viewMode="grid"
                    onClick={() => console.log(`Open starred file: ${file.name}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {totalItems === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No starred items yet. Star files and folders to find them here quickly.</p>
        </div>
      )}
    </div>
  )
}

export default Starred