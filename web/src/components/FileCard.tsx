// "use client"

// import type React from "react"
// import {
//   FileText,
//   ImageIcon,
//   Video,
//   Music,
//   Archive,
//   File,
//   MoreVertical,
//   FolderOpen,
//   Share,
//   Download,
//   Edit3,
//   Trash2,
// } from "lucide-react"
// import { useState, useEffect, useRef } from "react"

// interface FileCardProps {
//   name: string
//   type: "image" | "video" | "audio" | "document" | "archive" | "other" | "spreadsheet" | "presentation"
//   size: string
//   modifiedDate: string
//   thumbnail?: string
//   onClick?: () => void
//   viewMode?: "grid" | "list"
// }

// const FileCard: React.FC<FileCardProps> = ({
//   name,
//   type,
//   size,
//   modifiedDate,
//   thumbnail,
//   onClick,
//   viewMode = "grid",
// }) => {
//   const [showMenu, setShowMenu] = useState(false)
//   const menuRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setShowMenu(false)
//       }
//     }

//     if (showMenu) {
//       document.addEventListener("mousedown", handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [showMenu])

//   const getFileIcon = () => {
//     const iconSize = viewMode === "list" ? "w-5 h-5" : "w-12 h-12"
//     switch (type) {
//       case "image":
//         return <ImageIcon className={`${iconSize} text-green-500`} />
//       case "video":
//         return <Video className={`${iconSize} text-red-500`} />
//       case "audio":
//         return <Music className={`${iconSize} text-purple-500`} />
//       case "document":
//         return <FileText className={`${iconSize} text-orange-500`} />
//       case "presentation":
//         return <FileText className={`${iconSize} text-orange-500`} />
//       case "spreadsheet":
//         return <FileText className={`${iconSize} text-green-500`} />
//       case "archive":
//         return <Archive className={`${iconSize} text-yellow-600`} />
//       default:
//         return <File className={`${iconSize} text-gray-500`} />
//     }
//   }

//   const handleMenuClick = (e: React.MouseEvent, action: string) => {
//     e.stopPropagation()
//     setShowMenu(false)
//     console.log(`${action}: ${name}`)
//   }

//   if (viewMode === "list") {
//     return (
//       <div className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-100 group">
//         <div className="flex items-center flex-1 min-w-0">
//           <div className="flex-shrink-0 mr-3">{getFileIcon()}</div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm text-black truncate">{name}</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-8 text-sm text-gray-500">
//           <span className="w-24 text-left">{modifiedDate}</span>
//           <span className="w-16 text-right">{size}</span>
//           <div className="relative" ref={menuRef}>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation()
//                 setShowMenu(!showMenu)
//               }}
//               className="p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               <MoreVertical className="w-4 h-4 text-black" />
//             </button>
//             {showMenu && (
//               <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
//                 <button
//                   onClick={(e) => handleMenuClick(e, "open")}
//                   className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//                 >
//                   <FolderOpen className="w-4 h-4 mr-2" />
//                   Open
//                 </button>
//                 <button
//                   onClick={(e) => handleMenuClick(e, "share")}
//                   className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//                 >
//                   <Share className="w-4 h-4 mr-2" />
//                   Share
//                 </button>
//                 <button
//                   onClick={(e) => handleMenuClick(e, "download")}
//                   className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Download
//                 </button>
//                 <button
//                   onClick={(e) => handleMenuClick(e, "rename")}
//                   className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//                 >
//                   <Edit3 className="w-4 h-4 mr-2" />
//                   Rename
//                 </button>
//                 <button
//                   onClick={(e) => handleMenuClick(e, "delete")}
//                   className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//                 >
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Move to trash
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div
//       className="bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all cursor-pointer group relative p-4"
//       onClick={onClick}
//     >
//       <div className="flex flex-col items-center space-y-3">
//         {thumbnail ? (
//           <img src={thumbnail || "/placeholder.svg"} alt={name} className="w-16 h-16 object-cover rounded" />
//         ) : (
//           <div className="w-16 h-16 flex items-center justify-center">{getFileIcon()}</div>
//         )}
//         <div className="text-center w-full">
//           <p className="text-sm text-black truncate mb-1 font-normal" title={name}>
//             {name}
//           </p>
//           <p className="text-xs text-gray-500">{modifiedDate}</p>
//         </div>
//       </div>

//       <div className="absolute top-2 right-2" ref={menuRef}>
//         <button
//           onClick={(e) => {
//             e.stopPropagation()
//             setShowMenu(!showMenu)
//           }}
//           className="p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
//         >
//           <MoreVertical className="w-4 h-4 text-black" />
//         </button>
//         {showMenu && (
//           <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
//             <button
//               onClick={(e) => handleMenuClick(e, "open")}
//               className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//             >
//               <FolderOpen className="w-4 h-4 mr-2" />
//               Open
//             </button>
//             <button
//               onClick={(e) => handleMenuClick(e, "share")}
//               className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//             >
//               <Share className="w-4 h-4 mr-2" />
//               Share
//             </button>
//             <button
//               onClick={(e) => handleMenuClick(e, "download")}
//               className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Download
//             </button>
//             <button
//               onClick={(e) => handleMenuClick(e, "rename")}
//               className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//             >
//               <Edit3 className="w-4 h-4 mr-2" />
//               Rename
//             </button>
//             <button
//               onClick={(e) => handleMenuClick(e, "delete")}
//               className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//             >
//               <Trash2 className="w-4 h-4 mr-2" />
//               Move to trash
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default FileCard

"use client"

import type React from "react"
import {
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  File,
  MoreVertical,
  FolderOpen,
  Share,
  Download,
  Edit3,
  Trash2,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import RenameModal from "../components/RenamModel"
import ShareModal from "../components/ShareModel"
import { moveToTrash } from "../lib/item.service";


interface FileCardProps {
  id:string
  name: string
  type: "image" | "video" | "audio" | "document" | "archive" | "other" | "spreadsheet" | "presentation"
  size: string
  modifiedDate: string
  thumbnail?: string
  onClick?: () => void
  viewMode?: "grid" | "list"
  onTrashed?: () => void;
}

const FileCard: React.FC<FileCardProps> = ({
  id,
  name,
  type,
  size,
  modifiedDate,
  thumbnail,
  onClick,
  onTrashed,
  viewMode = "grid",
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [fileName, setFileName] = useState(name)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMenu])

  const getFileIcon = () => {
    const iconSize = viewMode === "list" ? "w-5 h-5" : "w-12 h-12"
    switch (type) {
      case "image":
        return <ImageIcon className={`${iconSize} text-green-500`} />
      case "video":
        return <Video className={`${iconSize} text-red-500`} />
      case "audio":
        return <Music className={`${iconSize} text-purple-500`} />
      case "document":
        return <FileText className={`${iconSize} text-orange-500`} />
      case "presentation":
        return <FileText className={`${iconSize} text-orange-500`} />
      case "spreadsheet":
        return <FileText className={`${iconSize} text-green-500`} />
      case "archive":
        return <Archive className={`${iconSize} text-yellow-600`} />
      default:
        return <File className={`${iconSize} text-gray-500`} />
    }
  }

  const handleMenuClick = async(e: React.MouseEvent, action: string) => {
    e.stopPropagation()
    setShowMenu(false)

    switch (action) {
      case "rename":
        setShowRenameModal(true)
        break
      case "share":
        setShowShareModal(true)
        break
      case "open":
      case "download":
      case "delete":
      try {
        await moveToTrash(id);
        console.log(`Moved file "${fileName}" to trash`);
        if (onTrashed) onTrashed(); //  remove from UI
      } catch (err: any) {
        alert(err.message || "Failed to move to trash");
      }
      break;
      default:
      console.log(`${action}: ${fileName}`);
      break;
    }
  }

  const handleRename = (newName: string) => {
    setFileName(newName)
    console.log(`Renamed file from "${name}" to "${newName}"`)
  }

  if (viewMode === "list") {
    return (
      <div className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-100 group">
        <div className="flex items-center flex-1 min-w-0">
          <div className="flex-shrink-0 mr-3">{getFileIcon()}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-black truncate">{fileName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-8 text-sm text-gray-500">
          <span className="w-24 text-left">{modifiedDate}</span>
          <span className="w-16 text-right">{size}</span>
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              className="p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-4 h-4 text-black" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
                <button
                  onClick={(e) => handleMenuClick(e, "open")}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Open
                </button>
                <button
                  onClick={(e) => handleMenuClick(e, "share")}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </button>
                <button
                  onClick={(e) => handleMenuClick(e, "download")}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={(e) => handleMenuClick(e, "rename")}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Rename
                </button>
                <button
                  onClick={(e) => handleMenuClick(e, "delete")}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Move to trash
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className="bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all cursor-pointer group relative p-4"
        onClick={onClick}
      >
        <div className="flex flex-col items-center space-y-3">
          {thumbnail ? (
            <img src={thumbnail || "/placeholder.svg"} alt={fileName} className="w-16 h-16 object-cover rounded" />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center">{getFileIcon()}</div>
          )}
          <div className="text-center w-full">
            <p className="text-sm text-black truncate mb-1 font-normal" title={fileName}>
              {fileName}
            </p>
            <p className="text-xs text-gray-500">{modifiedDate}</p>
          </div>
        </div>

        <div className="absolute top-2 right-2" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className="p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4 text-black" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
              <button
                onClick={(e) => handleMenuClick(e, "open")}
                className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                Open
              </button>
              <button
                onClick={(e) => handleMenuClick(e, "share")}
                className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </button>
              <button
                onClick={(e) => handleMenuClick(e, "download")}
                className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              <button
                onClick={(e) => handleMenuClick(e, "rename")}
                className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Rename
              </button>
              <button
                onClick={(e) => handleMenuClick(e, "delete")}
                className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Move to trash
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Rename Modal */}
      <RenameModal
        isOpen={showRenameModal}
        onClose={() => setShowRenameModal(false)}
        currentName={fileName}
        onRename={handleRename}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        fileName={fileName}
        fileType="file"
      />
    </>
  )
}

export default FileCard

