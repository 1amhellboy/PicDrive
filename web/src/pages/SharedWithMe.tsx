// "use client"

// import type React from "react"
// import FileCard from "../components/FileCard"
// import FolderCard from "../components/FolderCard"

// interface SharedWithMeProps {
//   viewMode: "grid" | "list"
// }

// const SharedWithMe: React.FC<SharedWithMeProps> = ({ viewMode }) => {
//   const sharedFolders = [
//     { name: "Team Project", itemCount: 25, modifiedDate: "1 day ago" },
//     { name: "Marketing Assets", itemCount: 18, modifiedDate: "3 days ago" },
//   ]

//   const sharedFiles = [
//     { name: "quarterly-report.pdf", type: "document" as const, size: "1.2 MB", modifiedDate: "2 hours ago" },
//     { name: "team-photo.jpg", type: "image" as const, size: "2.1 MB", modifiedDate: "1 day ago" },
//     { name: "presentation.pptx", type: "document" as const, size: "3.4 MB", modifiedDate: "2 days ago" },
//     { name: "demo-video.mp4", type: "video" as const, size: "28.5 MB", modifiedDate: "1 week ago" },
//   ]

//   const allItems = [...sharedFolders, ...sharedFiles]
//   const totalItems = allItems.length

//   return (
//     <div className="p-6 bg-white min-h-screen w-full">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-normal text-black">Shared with me</h1>
//           <p className="text-sm text-gray-500 mt-1">{totalItems} items</p>
//         </div>
//       </div>

//       {viewMode === "list" ? (
//         <div className="bg-white">
//           <div className="flex items-center px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-600">
//             <div className="flex-1">Name</div>
//             <div className="w-32 text-left">Modified</div>
//             <div className="w-20 text-left">Size</div>
//             <div className="w-8"></div>
//           </div>
//           <div>
//             {sharedFolders.map((folder, index) => (
//               <FolderCard
//                 key={`folder-${index}`}
//                 name={folder.name}
//                 itemCount={folder.itemCount}
//                 modifiedDate={folder.modifiedDate}
//                 viewMode="list"
//                 onClick={() => console.log(`Open shared folder: ${folder.name}`)}
//               />
//             ))}
//             {sharedFiles.map((file, index) => (
//               <FileCard
//                 key={`file-${index}`}
//                 name={file.name}
//                 type={file.type}
//                 size={file.size}
//                 modifiedDate={file.modifiedDate}
//                 viewMode="list"
//                 onClick={() => console.log(`Open shared file: ${file.name}`)}
//               />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div>
//           {sharedFolders.length > 0 && (
//             <div className="mb-8">
//               <h2 className="text-lg font-medium text-gray-700 mb-4">Shared Folders</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                 {sharedFolders.map((folder, index) => (
//                   <FolderCard
//                     key={`folder-${index}`}
//                     name={folder.name}
//                     itemCount={folder.itemCount}
//                     modifiedDate={folder.modifiedDate}
//                     viewMode="grid"
//                     onClick={() => console.log(`Open shared folder: ${folder.name}`)}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {sharedFiles.length > 0 && (
//             <div>
//               <h2 className="text-lg font-medium text-gray-700 mb-4">Shared Files</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                 {sharedFiles.map((file, index) => (
//                   <FileCard
//                     key={`file-${index}`}
//                     name={file.name}
//                     type={file.type}
//                     size={file.size}
//                     modifiedDate={file.modifiedDate}
//                     viewMode="grid"
//                     onClick={() => console.log(`Open shared file: ${file.name}`)}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {totalItems === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No files have been shared with you yet.</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default SharedWithMe

// "use client"

// import { useEffect, useState } from "react"
// import FileCard from "../components/FileCard"
// import FolderCard from "../components/FolderCard"
// import { getSharedWithMe } from "../lib/item.service"

// interface SharedWithMeProps {
//   viewMode: "grid" | "list"
// }

// const SharedWithMe: React.FC<SharedWithMeProps> = ({ viewMode }) => {
//   const [items, setItems] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchShared = async () => {
//       try {
//         const res = await getSharedWithMe()
//         setItems(res)
//       } catch (err: any) {
//         alert(err.message || "Failed to load shared items")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchShared()
//   }, [])

//   if (loading) {
//     return <div className="p-6 text-gray-500">Loading shared items...</div>
//   }

//   const sharedFolders = items.filter((i) => i.type === "folder")
//   const sharedFiles = items.filter((i) => i.type === "file")

//   const totalItems = items.length

//   return (
//     <div className="p-6 bg-white min-h-screen w-full">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-normal text-black">Shared with me</h1>
//           <p className="text-sm text-gray-500 mt-1">{totalItems} items</p>
//         </div>
//       </div>

//       {/* same rendering logic you already have */}
//       {viewMode === "list" ? (
//         <div className="bg-white">
//           <div className="flex items-center px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-600">
//             <div className="flex-1">Name</div>
//             <div className="w-32 text-left">Modified</div>
//             <div className="w-20 text-left">Size</div>
//             <div className="w-8"></div>
//           </div>
//           <div>
//             {sharedFolders.map((folder) => (
//               <FolderCard
//                 key={folder.id}
//                 name={folder.name}
//                 itemCount={folder.children?.length || 0}
//                 modifiedDate={folder.modifiedDate}
//                 viewMode="list"
//                 onClick={() => console.log(`Open shared folder: ${folder.name}`)}
//               />
//             ))}
//             {sharedFiles.map((file) => (
//               <FileCard
//                 key={file.id}
//                 id={file.id}
//                 name={file.name}
//                 type="document" // you may map mimeType → type
//                 size={file.size + " KB"}
//                 modifiedDate={file.modifiedDate}
//                 viewMode="list"
//               />
//             ))}
//           </div>
//         </div>
//       ) : (
//         // same grid version you already had
//         <div>
//           {/* folders + files grid */}
//         </div>
//       )}

//       {totalItems === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No files have been shared with you yet.</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default SharedWithMe

// "use client"

// import { useEffect, useState } from "react"
// import FileCard from "../components/FileCard"
// import FolderCard from "../components/FolderCard"
// import { getSharedWithMe } from "../lib/item.service" // <-- API call

// interface SharedWithMeProps {
//   viewMode: "grid" | "list"
// }

// const SharedWithMe: React.FC<SharedWithMeProps> = ({ viewMode }) => {
//   const [items, setItems] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchShared = async () => {
//       try {
//         const data = await getSharedWithMe()
//         console.log("📩 Shared with me:", data)
//         setItems(data)
//       } catch (err: any) {
//         alert(err.message || "Failed to fetch shared items")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchShared()
//   }, [])

//   if (loading) {
//     return <div className="p-6 text-gray-500">Loading shared items...</div>
//   }

//   if (items.length === 0) {
//     return (
//       <div className="p-6 text-center text-gray-500">
//         No files have been shared with you yet.
//       </div>
//     )
//   }

//   return (
//     <div className="p-6 bg-white min-h-screen w-full">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-normal text-black">Shared with me</h1>
//           <p className="text-sm text-gray-500 mt-1">{items.length} items</p>
//         </div>
//       </div>

//       {viewMode === "list" ? (
//         <div className="bg-white">
//           <div className="flex items-center px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-600">
//             <div className="flex-1">Name</div>
//             <div className="w-32 text-left">Modified</div>
//             <div className="w-20 text-left">Size</div>
//             <div className="w-8"></div>
//           </div>
//           <div>
//             {items.map((item) =>
//               item.type === "folder" ? (
//                 <FolderCard
//                   key={item.id}
//                   name={item.name}
//                   itemCount={item.children?.length || 0}
//                   modifiedDate={new Date(item.createdAt).toLocaleDateString()}
//                   viewMode="list"
//                   onClick={() => console.log(`Open shared folder: ${item.name}`)}
//                 />
//               ) : (
//                 <FileCard
//                   key={item.id}
//                   id={item.id}
//                   name={item.name}
//                   type={item.type}
//                   size={item.size ? `${(item.size / 1024).toFixed(1)} KB` : "-"}
//                   modifiedDate={new Date(item.createdAt).toLocaleDateString()}
//                   viewMode="list"
//                   onClick={() => console.log(`Open shared file: ${item.name}`)}
//                 />
//               )
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {items.map((item) =>
//             item.type === "folder" ? (
//               <FolderCard
//                 key={item.id}
//                 name={item.name}
//                 itemCount={item.children?.length || 0}
//                 modifiedDate={new Date(item.createdAt).toLocaleDateString()}
//                 viewMode="grid"
//                 onClick={() => console.log(`Open shared folder: ${item.name}`)}
//               />
//             ) : (
//               <FileCard
//                 key={item.id}
//                 id={item.id}
//                 name={item.name}
//                 type={item.type}
//                 size={item.size ? `${(item.size / 1024).toFixed(1)} KB` : "-"}
//                 modifiedDate={new Date(item.createdAt).toLocaleDateString()}
//                 viewMode="grid"
//                 onClick={() => console.log(`Open shared file: ${item.name}`)}
//               />
//             )
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default SharedWithMe

"use client"

import { useEffect, useState } from "react"
import FileCard from "../components/FileCard"
import FolderCard from "../components/FolderCard"
import { getSharedWithMe } from "../lib/item.service" // <-- API call

interface SharedWithMeProps {
  viewMode: "grid" | "list"
}

const SharedWithMe: React.FC<SharedWithMeProps> = ({ viewMode }) => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

const mapMimeToType = (mimeType?: string) => {
  if (!mimeType) return "other" as const;
  if (mimeType.startsWith("image/")) return "image" as const;
  if (mimeType.startsWith("video/")) return "video" as const;
  if (mimeType.startsWith("audio/")) return "audio" as const;
  if (mimeType === "application/pdf" || mimeType.includes("msword")) return "document" as const;
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return "spreadsheet" as const;
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "presentation" as const;
  if (mimeType === "application/zip" || mimeType.includes("tar") || mimeType.includes("gzip")) return "archive" as const;
  return "other" as const;
};

  useEffect(() => {
    const fetchShared = async () => {
      try {
        const data = await getSharedWithMe()
        console.log("📩 Shared with me:", data)
        setItems(data)
      } catch (err: any) {
        alert(err.message || "Failed to fetch shared items")
      } finally {
        setLoading(false)
      }
    }

    fetchShared()
  }, [])

  const handleTrashed = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  if (loading) {
    return <div className="p-6 text-gray-500">Loading shared items...</div>
  }

  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No files have been shared with you yet.
      </div>
    )
  }

  return (
    <div className="p-6 bg-white min-h-screen w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-normal text-black">Shared with me</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} items</p>
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
            {items.map((item) =>
              item.type === "folder" ? (
                <FolderCard
                  key={item.id}
                  name={item.name}
                  itemCount={item.children?.length || 0}
                  modifiedDate={new Date(item.createdAt).toLocaleDateString()}
                  viewMode="list"
                  onClick={() => console.log(`Open shared folder: ${item.name}`)}
                />
              ) : (
                <FileCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  // type={item.type}
                  type={mapMimeToType(item.mimeType)}
                  size={item.size ? `${(item.size / 1024).toFixed(1)} KB` : "-"}
                  modifiedDate={new Date(item.createdAt).toLocaleDateString()}
                  viewMode="list"
                  onClick={() => console.log(`Open shared file: ${item.name}`)}
                  onTrashed={() => handleTrashed(item.id)} // ✅ remove immediately
                  canStar={false}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) =>
            item.type === "folder" ? (
              <FolderCard
                key={item.id}
                name={item.name}
                itemCount={item.children?.length || 0}
                modifiedDate={new Date(item.createdAt).toLocaleDateString()}
                viewMode="grid"
                onClick={() => console.log(`Open shared folder: ${item.name}`)}
              />
            ) : (
              <FileCard
                key={item.id}
                id={item.id}
                name={item.name}
                // type={item.type}
                type={mapMimeToType(item.mimeType)}
                size={item.size ? `${(item.size / 1024).toFixed(1)} KB` : "-"}
                modifiedDate={new Date(item.createdAt).toLocaleDateString()}
                viewMode="grid"
                onClick={() => console.log(`Open shared file: ${item.name}`)}
                onTrashed={() => handleTrashed(item.id)} // ✅ remove immediately
                canRename={false}
                canStar={false}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}

export default SharedWithMe
