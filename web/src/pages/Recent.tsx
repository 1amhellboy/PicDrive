// "use client"

// import type React from "react"
// import FileCard from "../components/FileCard"
// import FolderCard from "../components/FolderCard"

// const Recent: React.FC = () => {
//   // Mock data for recent items
//   const recentItems = [
//     {
//       type: "file",
//       name: "meeting-notes.docx",
//       fileType: "document" as const,
//       size: "456 KB",
//       modifiedDate: "10 minutes ago",
//     },
//     { type: "folder", name: "New Project", itemCount: 3, modifiedDate: "1 hour ago" },
//     { type: "file", name: "screenshot.png", fileType: "image" as const, size: "892 KB", modifiedDate: "2 hours ago" },
//     { type: "file", name: "budget.xlsx", fileType: "document" as const, size: "234 KB", modifiedDate: "3 hours ago" },
//     { type: "file", name: "video-call.mp4", fileType: "video" as const, size: "15.2 MB", modifiedDate: "5 hours ago" },
//     { type: "folder", name: "Archive 2024", itemCount: 45, modifiedDate: "1 day ago" },
//     { type: "file", name: "invoice.pdf", fileType: "document" as const, size: "678 KB", modifiedDate: "1 day ago" },
//     { type: "file", name: "song.mp3", fileType: "audio" as const, size: "4.1 MB", modifiedDate: "2 days ago" },
//   ]

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-6">Recent</h1>

//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {recentItems.map((item, index) =>
//           item.type === "folder" ? (
//             <FolderCard
//               key={index}
//               name={item.name}
//               itemCount={item.itemCount!}
//               modifiedDate={item.modifiedDate}
//               onClick={() => console.log(`Open recent folder: ${item.name}`)}
//             />
//           ) : (
//             <FileCard
//               key={index}
//               name={item.name}
//               type={item.fileType!}
//               size={item.size!}
//               modifiedDate={item.modifiedDate}
//               onClick={() => console.log(`Open recent file: ${item.name}`)}
//             />
//           ),
//         )}
//       </div>

//       {recentItems.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No recent activity to show.</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Recent

"use client"

import type React from "react"
import FileCard from "../components/FileCard"
import FolderCard from "../components/FolderCard"

interface RecentProps {
  viewMode: "grid" | "list"
}

const Recent: React.FC<RecentProps> = ({ viewMode }) => {
  // Mock data for recent items
  const recentItems = [
    {
      type: "file",
      name: "meeting-notes.docx",
      fileType: "document" as const,
      size: "456 KB",
      modifiedDate: "10 minutes ago",
    },
    { type: "folder", name: "New Project", itemCount: 3, modifiedDate: "1 hour ago" },
    { type: "file", name: "screenshot.png", fileType: "image" as const, size: "892 KB", modifiedDate: "2 hours ago" },
    { type: "file", name: "budget.xlsx", fileType: "document" as const, size: "234 KB", modifiedDate: "3 hours ago" },
    { type: "file", name: "video-call.mp4", fileType: "video" as const, size: "15.2 MB", modifiedDate: "5 hours ago" },
    { type: "folder", name: "Archive 2024", itemCount: 45, modifiedDate: "1 day ago" },
    { type: "file", name: "invoice.pdf", fileType: "document" as const, size: "678 KB", modifiedDate: "1 day ago" },
    { type: "file", name: "song.mp3", fileType: "audio" as const, size: "4.1 MB", modifiedDate: "2 days ago" },
  ]

  // Separate folders and files for better organization
  const folders = recentItems.filter(item => item.type === "folder")
  const files = recentItems.filter(item => item.type === "file")

  return (
    <div className="p-6 bg-white min-h-screen w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-normal text-black">Recent</h1>
          <p className="text-sm text-gray-500 mt-1">{recentItems.length} items</p>
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
            {folders.map((folder, index) => (
              <FolderCard
                key={`folder-${index}`}
                name={folder.name}
                itemCount={folder.itemCount!}
                modifiedDate={folder.modifiedDate}
                viewMode="list"
                onClick={() => console.log(`Open recent folder: ${folder.name}`)}
              />
            ))}
            {files.map((file, index) => (
              <FileCard
                key={`file-${index}`}
                name={file.name}
                type={file.fileType!}
                size={file.size!}
                modifiedDate={file.modifiedDate}
                viewMode="list"
                onClick={() => console.log(`Open recent file: ${file.name}`)}
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
              itemCount={folder.itemCount!}
              modifiedDate={folder.modifiedDate}
              viewMode="grid"
              onClick={() => console.log(`Open recent folder: ${folder.name}`)}
            />
          ))}
          {files.map((file, index) => (
            <FileCard
              key={`file-${index}`}
              name={file.name}
              type={file.fileType!}
              size={file.size!}
              modifiedDate={file.modifiedDate}
              viewMode="grid"
              onClick={() => console.log(`Open recent file: ${file.name}`)}
            />
          ))}
        </div>
      )}

      {recentItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No recent activity to show.</p>
        </div>
      )}
    </div>
  )
}

export default Recent;