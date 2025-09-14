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
// import RenameModal from "../components/RenamModel"
// import ShareModal from "../components/ShareModel"
// import { moveToTrash } from "../lib/item.service";
// import FilePreview from "../components/FilePreview";
// import { getFileUrl,downloadFile } from "../lib/item.service";
// import { CheckCircle2 } from "lucide-react";
// import { renameItem } from "../lib/item.service";


// interface FileCardProps {
//   id:string
//   name: string
//   type: "file" | "folder" | "image" | "video" | "audio" | "document" | "archive" | "other" | "spreadsheet" | "presentation"
//   size: string
//   modifiedDate: string
//   thumbnail?: string
//   fileUrl?: string
//   onClick?: () => void
//   viewMode?: "grid" | "list"
//   onTrashed?: () => void;
// }

// const FileCard: React.FC<FileCardProps> = ({
//   id,
//   name,
//   type,
//   size,
//   modifiedDate,
//   thumbnail,
//   fileUrl,
//   onClick,
//   onTrashed,
//   viewMode = "grid",
// }) => {
//   const [showMenu, setShowMenu] = useState(false)
//   const [showRenameModal, setShowRenameModal] = useState(false)
//   const [showShareModal, setShowShareModal] = useState(false)
//   const [fileName, setFileName] = useState(name)
//   const menuRef = useRef<HTMLDivElement>(null)
//   const [showFilePreview, setShowFilePreview] = useState(false)
//   const [signedUrl, setSignedUrl] = useState<string | null>(null);
//   const [downloading, setDownloading] = useState(false);
//   const [downloadSuccess, setDownloadSuccess] = useState(false);
  


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

//   const handleMenuClick = async(e: React.MouseEvent, action: string) => {
//     e.stopPropagation()
//     setShowMenu(false)

//     switch (action) {
//       case "rename":
//         setShowRenameModal(true)
//         break
//       case "share":
//         setShowShareModal(true)
//         break
//       // case "open":
//       //   setShowFilePreview(true)
//       //   break
//       case "open":
//       try {
//         console.log(`Fetching signed URL for: ${fileName}`);
//         const url = await getFileUrl(id);   // 🔑 call backend
//         setSignedUrl(url);
//         setShowFilePreview(true);
//       } catch (err: any) {
//         alert(err.message || "Failed to fetch file preview");
//       }
//       break;
// case "download":
//   try {
//     setDownloading(true);
//     await downloadFile(id); // your service function that triggers <a> download
//     setDownloading(false);
//     setDownloadSuccess(true);

//     // Hide success after 1.5s
//     setTimeout(() => setDownloadSuccess(false), 1500);
//   } catch (err: any) {
//     setDownloading(false);
//     alert(err.message || "Download failed");
//   }
//   break;

//       case "delete":
//       try {
//         await moveToTrash(id);
//         console.log(`Moved file "${fileName}" to trash`);
//         if (onTrashed) onTrashed(); //  remove from UI
//       } catch (err: any) {
//         alert(err.message || "Failed to move to trash");
//       }
//       break;
//       default:
//       console.log(`${action}: ${fileName}`);
//       break;
//     }
//   }

//   const handleRename = (newName: string) => {
//     setFileName(newName)
//     console.log(`Renamed file from "${name}" to "${newName}"`)
//   }


//   if (viewMode === "list") {
//     return (
//       <div className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-100 group">
//         <div className="flex items-center flex-1 min-w-0">
//           <div className="flex-shrink-0 mr-3">{getFileIcon()}</div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm text-black truncate">{fileName}</p>
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

//   if (downloading) {
//   return (
//     <div className="p-6 text-center">
//       <div className="p-6 text-gray-500 text-center">Downloading...</div>
//       <div>
//         <p className="text-gray-500">Please wait while we download your file.</p>
//       </div>
//     </div>
//   );
// }

// if (downloadSuccess) {
//   return (
//     <div className="p-6 text-center">
//       <CheckCircle2 className="w-8 h-8 text-black mx-auto mb-3" />
//       <h1 className="text-xl font-semibold text-black mb-2">Download Complete!</h1>
//       {/* <p className="text-gray-500">Your file was downloaded successfully.</p> */}
//     </div>
//   );
// }

//   return (
//     <>
//       <div
//         className="bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all cursor-pointer group relative p-4"
//         onClick={onClick}
//       >
//         <div className="flex flex-col items-center space-y-3">
//           {thumbnail ? (
//             <img src={thumbnail || "/placeholder.svg"} alt={fileName} className="w-16 h-16 object-cover rounded" />
//           ) : (
//             <div className="w-16 h-16 flex items-center justify-center">{getFileIcon()}</div>
//           )}
//           <div className="text-center w-full">
//             <p className="text-sm text-black truncate mb-1 font-normal" title={fileName}>
//               {fileName}
//             </p>
//             <p className="text-xs text-gray-500">{modifiedDate}</p>
//           </div>
//         </div>

//         <div className="absolute top-2 right-2" ref={menuRef}>
//           <button
//             onClick={(e) => {
//               e.stopPropagation()
//               setShowMenu(!showMenu)
//             }}
//             className="p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
//           >
//             <MoreVertical className="w-4 h-4 text-black" />
//           </button>
//           {showMenu && (
//             <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
//               <button
//                 onClick={(e) => handleMenuClick(e, "open")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <FolderOpen className="w-4 h-4 mr-2" />
//                 Open
//               </button>
//               <button
//                 onClick={(e) => handleMenuClick(e, "share")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <Share className="w-4 h-4 mr-2" />
//                 Share
//               </button>
//               <button
//                 onClick={(e) => handleMenuClick(e, "download")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <Download className="w-4 h-4 mr-2" />
//                 Download
//               </button>
//               <button
//                 onClick={(e) => handleMenuClick(e, "rename")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <Edit3 className="w-4 h-4 mr-2" />
//                 Rename
//               </button>
//               <button
//                 onClick={(e) => handleMenuClick(e, "delete")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <Trash2 className="w-4 h-4 mr-2" />
//                 Move to trash
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Rename Modal */}
//       <RenameModal
//         isOpen={showRenameModal}
//         onClose={() => setShowRenameModal(false)}
//         currentName={fileName}
//         onRename={handleRename}
//       />

//       {/* Share Modal */}
//       <ShareModal
//         isOpen={showShareModal}
//         onClose={() => setShowShareModal(false)}
//         fileName={fileName}
//         fileType="file"
//       />
         
//       <FilePreview
//         isOpen={showFilePreview}
//         onClose={() => setShowFilePreview(false)}
//         fileName={fileName}
//         fileType={type}
//         fileUrl={signedUrl || undefined}   
//       />
//       {showFilePreview && console.log("Previewing file:", fileName, signedUrl)}
//     </>
//   )
// }

// export default FileCard


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
//   CheckCircle2,
// } from "lucide-react"
// import { useState, useEffect, useRef } from "react"
// import RenameModal from "../components/RenamModel"
// import ShareModal from "../components/ShareModel"
// import FilePreview from "../components/FilePreview"
// import { moveToTrash, getFileUrl, downloadFile, renameItem } from "../lib/item.service"


// interface FileCardProps {
//   id: string
//   name: string
//   type:
//     | "file"
//     | "folder"
//     | "image"
//     | "video"
//     | "audio"
//     | "document"
//     | "archive"
//     | "other"
//     | "spreadsheet"
//     | "presentation"
//   size: string
//   canRename?: boolean   // 👈 new
//   modifiedDate: string
//   thumbnail?: string
//   fileUrl?: string
//   onClick?: () => void
//   viewMode?: "grid" | "list"
//   onTrashed?: () => void
// }

// const FileCard: React.FC<FileCardProps> = ({
//   id,
//   name,
//   type,
//   size,
//   modifiedDate,
//   thumbnail,
//   fileUrl,
//   onClick,
//   onTrashed,
//   canRename = true,   // 👈 new
//   viewMode = "grid",
// }) => {
//   const [showMenu, setShowMenu] = useState(false)
//   const [showRenameModal, setShowRenameModal] = useState(false)
//   const [showShareModal, setShowShareModal] = useState(false)
//   const [fileName, setFileName] = useState(name)
//   const menuRef = useRef<HTMLDivElement>(null)
//   const [showFilePreview, setShowFilePreview] = useState(false)
//   const [signedUrl, setSignedUrl] = useState<string | null>(null)
//   const [downloading, setDownloading] = useState(false)
//   const [downloadSuccess, setDownloadSuccess] = useState(false)

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

//   const handleMenuClick = async (e: React.MouseEvent, action: string) => {
//     e.stopPropagation()
//     setShowMenu(false)

//     switch (action) {
//       case "rename":
//         setShowRenameModal(true)
//         break
//       case "share":
//         setShowShareModal(true)
//         break
//       case "open":
//         try {
//           console.log(`Fetching signed URL for: ${fileName}`)
//           const url = await getFileUrl(id)
//           setSignedUrl(url)
//           setShowFilePreview(true)
//         } catch (err: any) {
//           alert(err.message || "Failed to fetch file preview")
//         }
//         break
//       case "download":
//         try {
//           setDownloading(true)
//           await downloadFile(id)
//           setDownloading(false)
//           setDownloadSuccess(true)

//           setTimeout(() => setDownloadSuccess(false), 1500)
//         } catch (err: any) {
//           setDownloading(false)
//           alert(err.message || "Download failed")
//         }
//         break
//       case "delete":
//         try {
//           await moveToTrash(id)
//           console.log(`Moved file "${fileName}" to trash`)
//           if (onTrashed) onTrashed()
//         } catch (err: any) {
//           alert(err.message || "Failed to move to trash")
//         }
//         break
//       default:
//         console.log(`${action}: ${fileName}`)
//         break
//     }
//   }


// const handleRename = async (newName: string) => {
//   const trimmed = newName.trim();
//   if (!trimmed || trimmed === fileName) {
//     alert("Invalid or unchanged name");
//     return;
//   }

//   // Save old name in case backend fails
//   const oldName = fileName;

//   // Optimistically update UI
//   setFileName(trimmed);

//   try {
//     await renameItem(id, trimmed); // backend call
//     console.log(`Renamed file "${oldName}" → "${trimmed}"`);
//   } catch (err: any) {
//     // Rollback on error
//     setFileName(oldName);
//     alert(err.message || "Rename failed");
//   }
// };



//   if (viewMode === "list") {
//     return (
//       <div className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-100 group">
//         <div className="flex items-center flex-1 min-w-0">
//           <div className="flex-shrink-0 mr-3">{getFileIcon()}</div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm text-black truncate">{fileName}</p>
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

//   if (downloading) {
//     return (
//       <div className="p-6 text-center">
//         <div className="p-6 text-gray-500 text-center">Downloading...</div>
//         <div>
//           <p className="text-gray-500">Please wait while we download your file.</p>
//         </div>
//       </div>
//     )
//   }

//   if (downloadSuccess) {
//     return (
//       <div className="p-6 text-center">
//         <CheckCircle2 className="w-8 h-8 text-black mx-auto mb-3" />
//         <h1 className="text-xl font-semibold text-black mb-2">Download Complete!</h1>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div
//         className="bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all cursor-pointer group relative p-4"
//         onClick={onClick}
//       >
//         <div className="flex flex-col items-center space-y-3">
//           {thumbnail ? (
//             <img src={thumbnail || "/placeholder.svg"} alt={fileName} className="w-16 h-16 object-cover rounded" />
//           ) : (
//             <div className="w-16 h-16 flex items-center justify-center">{getFileIcon()}</div>
//           )}
//           <div className="text-center w-full">
//             <p className="text-sm text-black truncate mb-1 font-normal" title={fileName}>
//               {fileName}
//             </p>
//             <p className="text-xs text-gray-500">{modifiedDate}</p>
//           </div>
//         </div>

//         <div className="absolute top-2 right-2" ref={menuRef}>
//           <button
//             onClick={(e) => {
//               e.stopPropagation()
//               setShowMenu(!showMenu)
//             }}
//             className="p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
//           >
//             <MoreVertical className="w-4 h-4 text-black" />
//           </button>
//           {showMenu && (
//             <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
//               <button
//                 onClick={(e) => handleMenuClick(e, "open")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <FolderOpen className="w-4 h-4 mr-2" />
//                 Open
//               </button>
//               <button
//                 onClick={(e) => handleMenuClick(e, "share")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <Share className="w-4 h-4 mr-2" />
//                 Share
//               </button>
//               <button
//                 onClick={(e) => handleMenuClick(e, "download")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <Download className="w-4 h-4 mr-2" />
//                 Download
//               </button>
//               {/* <button
//                 onClick={(e) => handleMenuClick(e, "rename")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <Edit3 className="w-4 h-4 mr-2" />
//                 Rename
//               </button> */}
//               {canRename && (
//                 <button
//                   onClick={(e) => handleMenuClick(e, "rename")}
//                   className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//                 >
//                   <Edit3 className="w-4 h-4 mr-2" />
//                   Rename
//                 </button>
//             )}

//               <button
//                 onClick={(e) => handleMenuClick(e, "delete")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <Trash2 className="w-4 h-4 mr-2" />
//                 Move to trash
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Rename Modal */}
//       {/* <RenameModal
//         isOpen={showRenameModal}
//         onClose={() => setShowRenameModal(false)}
//         currentName={fileName}
//         onRename={handleRename}
//       /> */}
//       {canRename && (
//       <RenameModal
//         isOpen={showRenameModal}
//         onClose={() => setShowRenameModal(false)}
//         currentName={fileName}
//         onRename={handleRename}
//          />
//       )}

//       {/* Share Modal */}
//       <ShareModal
//         isOpen={showShareModal}
//         onClose={() => setShowShareModal(false)}
//         fileName={fileName}
//         fileType="file"
//         itemId={id}
//       />

//       {/* File Preview */}
//       <FilePreview
//         isOpen={showFilePreview}
//         onClose={() => setShowFilePreview(false)}
//         fileName={fileName}
//         fileType={type}
//         fileUrl={signedUrl || undefined}
//       />
//     </>
//   )
// }

// export default FileCard



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
//   CheckCircle2,
//   Star,
//   StarOff,   // ⭐ icons
// } from "lucide-react"
// import { useState, useEffect, useRef } from "react"
// import RenameModal from "../components/RenamModel"
// import ShareModal from "../components/ShareModel"
// import FilePreview from "../components/FilePreview"
// import { moveToTrash, getFileUrl, downloadFile, renameItem, toggleStar, } from "../lib/item.service"

// interface FileCardProps {
//   id: string
//   name: string
//   type:
//     | "file"
//     | "folder"
//     | "image"
//     | "video"
//     | "audio"
//     | "document"
//     | "archive"
//     | "other"
//     | "spreadsheet"
//     | "presentation"
//   size: string
//   modifiedDate: string
//   isStarred?: boolean   // ⭐ NEW
//   thumbnail?: string
//   fileUrl?: string
//   onClick?: () => void
//   viewMode?: "grid" | "list"
//   onTrashed?: () => void
//   canRename?: boolean
//   onStarToggled?: (newStarred: boolean) => void // <-- add this line
//   canStar : boolean,
// }

// const FileCard: React.FC<FileCardProps> = ({
//   id,
//   name,
//   type,
//   size,
//   modifiedDate,
//   thumbnail,
//   fileUrl,
//   onClick,
//   onTrashed,
//   canRename = true,
//   isStarred = false,   // ⭐ default false
//   onStarToggled,       // ⭐ new prop
//   viewMode = "grid",
//   canStar = true,
// }) => {
//   const [showMenu, setShowMenu] = useState(false)
//   const [showRenameModal, setShowRenameModal] = useState(false)
//   const [showShareModal, setShowShareModal] = useState(false)
//   const [fileName, setFileName] = useState(name)
//   const [starred, setStarred] = useState(isStarred) // ⭐ local state
//   const menuRef = useRef<HTMLDivElement>(null)
//   const [showFilePreview, setShowFilePreview] = useState(false)
//   const [signedUrl, setSignedUrl] = useState<string | null>(null)
//   const [downloading, setDownloading] = useState(false)
//   const [downloadSuccess, setDownloadSuccess] = useState(false)

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

//   const handleMenuClick = async (e: React.MouseEvent, action: string) => {
//     e.stopPropagation()
//     setShowMenu(false)

//     switch (action) {
//       case "rename":
//         setShowRenameModal(true)
//         break
//       case "share":
//         setShowShareModal(true)
//         break
//       case "open":
//         try {
//           const url = await getFileUrl(id)
//           setSignedUrl(url)
//           setShowFilePreview(true)
//         } catch (err: any) {
//           alert(err.message || "Failed to fetch file preview")
//         }
//         break
//       case "download":
//         try {
//           setDownloading(true)
//           await downloadFile(id)
//           setDownloading(false)
//           setDownloadSuccess(true)
//           setTimeout(() => setDownloadSuccess(false), 1500)
//         } catch (err: any) {
//           setDownloading(false)
//           alert(err.message || "Download failed")
//         }
//         break
//       case "delete":
//         try {
//           await moveToTrash(id)
//           if (onTrashed) onTrashed()
//         } catch (err: any) {
//           alert(err.message || "Failed to move to trash")
//         }
//         break
//       // case "star": // ⭐ toggle
//       //   try {
//       //     const updated = await toggleStar(id)
//       //     setStarred(updated.isStarred)
//       //   } catch (err: any) {
//       //     alert(err.message || "Failed to toggle star")
//       //   }
//       //   break
//       case "star":
//   try {
//     const updated = await toggleStar(id)
//     setStarred(updated.isStarred)
//     if (onStarToggled) onStarToggled(updated.isStarred) // ✅ notify parent
//   } catch (err: any) {
//     alert(err.message || "Failed to toggle star")
//   }
//   break

//       default:
//         console.log(`${action}: ${fileName}`)
//         break
//     }
//   }

//   return (
//     <>
//       <div
//         className="bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all cursor-pointer group relative p-4"
//         onClick={onClick}
//       >
//         <div className="flex flex-col items-center space-y-3">
//           {thumbnail ? (
//             <img src={thumbnail} alt={fileName} className="w-16 h-16 object-cover rounded" />
//           ) : (
//             <div className="w-16 h-16 flex items-center justify-center">{getFileIcon()}</div>
//           )}
//           <div className="text-center w-full">
//             <p className="text-sm text-black truncate mb-1 font-normal" title={fileName}>
//               {fileName}
//             </p>
//             <p className="text-xs text-gray-500">{modifiedDate}</p>
//           </div>
//         </div>

//         <div className="absolute top-2 right-2" ref={menuRef}>
//           <button
//             onClick={(e) => {
//               e.stopPropagation()
//               setShowMenu(!showMenu)
//             }}
//             className="p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
//           >
//             <MoreVertical className="w-4 h-4 text-black" />
//           </button>
//           {showMenu && (
//             <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
//               <button
//                 onClick={(e) => handleMenuClick(e, "open")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <FolderOpen className="w-4 h-4 mr-2" />
//                 Open
//               </button>
//               <button
//                 onClick={(e) => handleMenuClick(e, "share")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <Share className="w-4 h-4 mr-2" />
//                 Share
//               </button>
//               <button
//                 onClick={(e) => handleMenuClick(e, "download")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <Download className="w-4 h-4 mr-2" />
//                 Download
//               </button>
//               {canRename && (
//                 <button
//                   onClick={(e) => handleMenuClick(e, "rename")}
//                   className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//                 >
//                   <Edit3 className="w-4 h-4 mr-2" />
//                   Rename
//                 </button>
//               )}
//               <button
//                 onClick={(e) => handleMenuClick(e, "delete")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 <Trash2 className="w-4 h-4 mr-2" />
//                 Move to trash
//               </button>
//               {/* <button
//                 onClick={(e) => handleMenuClick(e, "star")}
//                 className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//               >
//                 {starred ? (
//                   <Star className="w-4 h-4 mr-2 text-yellow-500" />
//                 ) : (
//                   <StarOff className="w-4 h-4 mr-2" />
//                 )}
//                 {starred ? "Unstar" : "Star"}
//               </button> */}
//               {canStar && (
//                 <button
//                   onClick={(e) => handleMenuClick(e, "star")}
//                   className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//                 >
//                   {starred ? (
//                   <Star className="w-4 h-4 mr-2 text-yellow-500" />
//                 ) : (
//                   <StarOff className="w-4 h-4 mr-2" />
//                 )}
//                   {starred ? "Unstar" : "Star"}
//                 </button>
//               )}

//             </div>
//           )}
//         </div>
//       </div>

//       {/* Rename Modal */}
//       <RenameModal
//         isOpen={showRenameModal}
//         onClose={() => setShowRenameModal(false)}
//         currentName={fileName}
//         onRename={(newName) => setFileName(newName)}
//       />

//       {/* Share Modal */}
//       <ShareModal
//         isOpen={showShareModal}
//         onClose={() => setShowShareModal(false)}
//         fileName={fileName}
//         fileType="file"
//         itemId={id}
//       />

//       {/* File Preview */}
//       <FilePreview
//         isOpen={showFilePreview}
//         onClose={() => setShowFilePreview(false)}
//         fileName={fileName}
//         fileType={type}
//         fileUrl={signedUrl || undefined}
//       />
//     </>
//   )
// }

// export default FileCard


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
//   CheckCircle2,
//   Star,
//   StarOff,
// } from "lucide-react"
// import { useState, useEffect, useRef } from "react"
// import RenameModal from "../components/RenamModel"
// import ShareModal from "../components/ShareModel"
// import FilePreview from "../components/FilePreview"
// import { moveToTrash, getFileUrl, downloadFile, renameItem, toggleStar } from "../lib/item.service"

// interface FileCardProps {
//   id: string
//   name: string
//   type:
//     | "file"
//     | "folder"
//     | "image"
//     | "video"
//     | "audio"
//     | "document"
//     | "archive"
//     | "other"
//     | "spreadsheet"
//     | "presentation"
//   size: string
//   canRename?: boolean
//   canStar?: boolean        // ⭐ NEW
//   isStarred?: boolean      // ⭐ NEW
//   modifiedDate: string
//   thumbnail?: string
//   fileUrl?: string
//   onClick?: () => void
//   viewMode?: "grid" | "list"
//   onTrashed?: () => void
// }

// const FileCard: React.FC<FileCardProps> = ({
//   id,
//   name,
//   type,
//   size,
//   modifiedDate,
//   thumbnail,
//   fileUrl,
//   onClick,
//   onTrashed,
//   canRename = true,
//   canStar = true,        // ⭐ default true
//   isStarred = false,     // ⭐ default false
//   viewMode = "grid",
// }) => {
//   const [showMenu, setShowMenu] = useState(false)
//   const [showRenameModal, setShowRenameModal] = useState(false)
//   const [showShareModal, setShowShareModal] = useState(false)
//   const [fileName, setFileName] = useState(name)
//   const [starred, setStarred] = useState(isStarred)  // ⭐ local state
//   const menuRef = useRef<HTMLDivElement>(null)
//   const [showFilePreview, setShowFilePreview] = useState(false)
//   const [signedUrl, setSignedUrl] = useState<string | null>(null)
//   const [downloading, setDownloading] = useState(false)
//   const [downloadSuccess, setDownloadSuccess] = useState(false)

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

//   const handleMenuClick = async (e: React.MouseEvent, action: string) => {
//     e.stopPropagation()
//     setShowMenu(false)

//     switch (action) {
//       case "rename":
//         setShowRenameModal(true)
//         break
//       case "share":
//         setShowShareModal(true)
//         break
//       case "open":
//         try {
//           const url = await getFileUrl(id)
//           setSignedUrl(url)
//           setShowFilePreview(true)
//         } catch (err: any) {
//           alert(err.message || "Failed to fetch file preview")
//         }
//         break
//       case "download":
//         try {
//           setDownloading(true)
//           await downloadFile(id)
//           setDownloading(false)
//           setDownloadSuccess(true)
//           setTimeout(() => setDownloadSuccess(false), 1500)
//         } catch (err: any) {
//           setDownloading(false)
//           alert(err.message || "Download failed")
//         }
//         break
//       case "delete":
//         try {
//           await moveToTrash(id)
//           if (onTrashed) onTrashed()
//         } catch (err: any) {
//           alert(err.message || "Failed to move to trash")
//         }
//         break
//       case "star": // ⭐ toggle
//         try {
//           const updated = await toggleStar(id)
//           setStarred(updated.isStarred)
//         } catch (err: any) {
//           alert(err.message || "Failed to toggle star")
//         }
//         break
//       default:
//         console.log(`${action}: ${fileName}`)
//         break
//     }
//   }

//   const handleRename = async (newName: string) => {
//     const trimmed = newName.trim()
//     if (!trimmed || trimmed === fileName) return

//     const oldName = fileName
//     setFileName(trimmed)

//     try {
//       await renameItem(id, trimmed)
//     } catch (err: any) {
//       setFileName(oldName)
//       alert(err.message || "Rename failed")
//     }
//   }

//   // ---------------------------
//   // List View
//   // ---------------------------
//   if (viewMode === "list") {
//     return (
//       <div className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-100 group">
//         <div className="flex items-center flex-1 min-w-0">
//           <div className="flex-shrink-0 mr-3">{getFileIcon()}</div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm text-black truncate">{fileName}</p>
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
//                 <button onClick={(e) => handleMenuClick(e, "open")} className="menu-btn">
//                   <FolderOpen className="w-4 h-4 mr-2" /> Open
//                 </button>
//                 <button onClick={(e) => handleMenuClick(e, "share")} className="menu-btn">
//                   <Share className="w-4 h-4 mr-2" /> Share
//                 </button>
//                 <button onClick={(e) => handleMenuClick(e, "download")} className="menu-btn">
//                   <Download className="w-4 h-4 mr-2" /> Download
//                 </button>
//                 {canRename && (
//                   <button onClick={(e) => handleMenuClick(e, "rename")} className="menu-btn">
//                     <Edit3 className="w-4 h-4 mr-2" /> Rename
//                   </button>
//                 )}
//                 <button onClick={(e) => handleMenuClick(e, "delete")} className="menu-btn">
//                   <Trash2 className="w-4 h-4 mr-2" /> Move to trash
//                 </button>
//                 {canStar && (
//                   <button onClick={(e) => handleMenuClick(e, "star")} className="menu-btn">
//                     {starred ? (
//                       <Star className="w-4 h-4 mr-2 text-yellow-500" />
//                     ) : (
//                       <StarOff className="w-4 h-4 mr-2" />
//                     )}
//                     {starred ? "Unstar" : "Star"}
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // ---------------------------
//   // Grid View
//   // ---------------------------
//   return (
//     <>
//       <div
//         className="bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all cursor-pointer group relative p-4"
//         onClick={onClick}
//       >
//         <div className="flex flex-col items-center space-y-3">
//           {thumbnail ? (
//             <img src={thumbnail || "/placeholder.svg"} alt={fileName} className="w-16 h-16 object-cover rounded" />
//           ) : (
//             <div className="w-16 h-16 flex items-center justify-center">{getFileIcon()}</div>
//           )}
//           <div className="text-center w-full">
//             <p className="text-sm text-black truncate mb-1 font-normal" title={fileName}>
//               {fileName}
//             </p>
//             <p className="text-xs text-gray-500">{modifiedDate}</p>
//           </div>
//         </div>

//         <div className="absolute top-2 right-2" ref={menuRef}>
//           <button
//             onClick={(e) => {
//               e.stopPropagation()
//               setShowMenu(!showMenu)
//             }}
//             className="p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
//           >
//             <MoreVertical className="w-4 h-4 text-black" />
//           </button>
//           {showMenu && (
//             <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
//               <button onClick={(e) => handleMenuClick(e, "open")} className="menu-btn">
//                 <FolderOpen className="w-4 h-4 mr-2" /> Open
//               </button>
//               <button onClick={(e) => handleMenuClick(e, "share")} className="menu-btn">
//                 <Share className="w-4 h-4 mr-2" /> Share
//               </button>
//               <button onClick={(e) => handleMenuClick(e, "download")} className="menu-btn">
//                 <Download className="w-4 h-4 mr-2" /> Download
//               </button>
//               {canRename && (
//                 <button onClick={(e) => handleMenuClick(e, "rename")} className="menu-btn">
//                   <Edit3 className="w-4 h-4 mr-2" /> Rename
//                 </button>
//               )}
//               <button onClick={(e) => handleMenuClick(e, "delete")} className="menu-btn">
//                 <Trash2 className="w-4 h-4 mr-2" /> Move to trash
//               </button>
//               {canStar && (
//                 <button onClick={(e) => handleMenuClick(e, "star")} className="menu-btn">
//                   {starred ? (
//                     <Star className="w-4 h-4 mr-2 text-yellow-500" />
//                   ) : (
//                     <StarOff className="w-4 h-4 mr-2" />
//                   )}
//                   {starred ? "Unstar" : "Star"}
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Rename Modal */}
//       {canRename && (
//         <RenameModal
//           isOpen={showRenameModal}
//           onClose={() => setShowRenameModal(false)}
//           currentName={fileName}
//           onRename={handleRename}
//         />
//       )}

//       {/* Share Modal */}
//       <ShareModal
//         isOpen={showShareModal}
//         onClose={() => setShowShareModal(false)}
//         fileName={fileName}
//         fileType="file"
//         itemId={id}
//       />

//       {/* File Preview */}
//       <FilePreview
//         isOpen={showFilePreview}
//         onClose={() => setShowFilePreview(false)}
//         fileName={fileName}
//         fileType={type}
//         fileUrl={signedUrl || undefined}
//       />
//     </>
//   )
// }

// export default FileCard


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
//   CheckCircle2,
//   Star,
//   StarOff,
// } from "lucide-react"
// import { useState, useEffect, useRef } from "react"
// import RenameModal from "../components/RenamModel"
// import ShareModal from "../components/ShareModel"
// import FilePreview from "../components/FilePreview"
// import { moveToTrash, getFileUrl, downloadFile, renameItem, toggleStar } from "../lib/item.service"

// interface FileCardProps {
//   id: string
//   name: string
//   type:
//     | "file"
//     | "folder"
//     | "image"
//     | "video"
//     | "audio"
//     | "document"
//     | "archive"
//     | "other"
//     | "spreadsheet"
//     | "presentation"
//   size: string
//   modifiedDate: string
//   isStarred?: boolean
//   thumbnail?: string
//   fileUrl?: string
//   onClick?: () => void
//   viewMode?: "grid" | "list"
//   onTrashed?: () => void
//   canRename?: boolean
//   onStarToggled?: (newStarred: boolean) => void
//   canStar?: boolean
// }

// const FileCard: React.FC<FileCardProps> = ({
//   id,
//   name,
//   type,
//   size,
//   modifiedDate,
//   thumbnail,
//   fileUrl,
//   onClick,
//   onTrashed,
//   canRename = true,
//   isStarred = false,
//   onStarToggled,
//   viewMode = "grid",
//   canStar = true,
// }) => {
//   const [showMenu, setShowMenu] = useState(false)
//   const [showRenameModal, setShowRenameModal] = useState(false)
//   const [showShareModal, setShowShareModal] = useState(false)
//   const [fileName, setFileName] = useState(name)
//   const [starred, setStarred] = useState(isStarred)
//   const menuRef = useRef<HTMLDivElement>(null)
//   const [showFilePreview, setShowFilePreview] = useState(false)
//   const [signedUrl, setSignedUrl] = useState<string | null>(null)
//   const [downloading, setDownloading] = useState(false)
//   const [downloadSuccess, setDownloadSuccess] = useState(false)

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

//   const handleMenuClick = async (e: React.MouseEvent, action: string) => {
//     e.stopPropagation()
//     setShowMenu(false)

//     switch (action) {
//       case "rename":
//         setShowRenameModal(true)
//         break
//       case "share":
//         setShowShareModal(true)
//         break
//       case "open":
//         try {
//           const url = await getFileUrl(id)
//           setSignedUrl(url)
//           setShowFilePreview(true)
//         } catch (err: any) {
//           alert(err.message || "Failed to fetch file preview")
//         }
//         break
//       case "download":
//         try {
//           setDownloading(true)
//           await downloadFile(id)
//           setDownloading(false)
//           setDownloadSuccess(true)
//           setTimeout(() => setDownloadSuccess(false), 1500)
//         } catch (err: any) {
//           setDownloading(false)
//           alert(err.message || "Download failed")
//         }
//         break
//       case "delete":
//         try {
//           await moveToTrash(id)
//           if (onTrashed) onTrashed()
//         } catch (err: any) {
//           alert(err.message || "Failed to move to trash")
//         }
//         break
//       case "star":
//         try {
//           const updated = await toggleStar(id)
//           setStarred(updated.isStarred)
//           if (onStarToggled) onStarToggled(updated.isStarred)
//         } catch (err: any) {
//           alert(err.message || "Failed to toggle star")
//         }
//         break
//       default:
//         console.log(`${action}: ${fileName}`)
//         break
//     }
//   }

//   const Menu = () => (
//     <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
//       <button
//         onClick={(e) => handleMenuClick(e, "open")}
//         className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//       >
//         <FolderOpen className="w-4 h-4 mr-2" />
//         Open
//       </button>
//       <button
//         onClick={(e) => handleMenuClick(e, "share")}
//         className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//       >
//         <Share className="w-4 h-4 mr-2" />
//         Share
//       </button>
//       <button
//         onClick={(e) => handleMenuClick(e, "download")}
//         className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//       >
//         <Download className="w-4 h-4 mr-2" />
//         Download
//       </button>
//       {canRename && (
//         <button
//           onClick={(e) => handleMenuClick(e, "rename")}
//           className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//         >
//           <Edit3 className="w-4 h-4 mr-2" />
//           Rename
//         </button>
//       )}
//       <button
//         onClick={(e) => handleMenuClick(e, "delete")}
//         className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//       >
//         <Trash2 className="w-4 h-4 mr-2" />
//         Move to trash
//       </button>
//       {canStar && (
//         <button
//           onClick={(e) => handleMenuClick(e, "star")}
//           className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center text-black"
//         >
//           {starred ? (
//             <Star className="w-4 h-4 mr-2 text-gray-500" />
//           ) : (
//             <StarOff className="w-4 h-4 mr-2 text-gray-500" />
//           )}
//           {starred ? "Unstar" : "Star"}
//         </button>
//       )}
//     </div>
//   )

//   if (viewMode === "list") {
//     return (
//       <div className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-100 group">
//         <div className="flex items-center flex-1 min-w-0">
//           <div className="flex-shrink-0 mr-3">{getFileIcon()}</div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm text-black truncate">{fileName}</p>
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
//             {showMenu && <Menu />}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div
//         className="bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all cursor-pointer group relative p-4"
//         onClick={onClick}
//       >
//         <div className="flex flex-col items-center space-y-3">
//           {thumbnail ? (
//             <img src={thumbnail} alt={fileName} className="w-16 h-16 object-cover rounded" />
//           ) : (
//             <div className="w-16 h-16 flex items-center justify-center">{getFileIcon()}</div>
//           )}
//           <div className="text-center w-full">
//             <p className="text-sm text-black truncate mb-1 font-normal" title={fileName}>
//               {fileName}
//             </p>
//             <p className="text-xs text-gray-500">{modifiedDate}</p>
//           </div>
//         </div>

//         <div className="absolute top-2 right-2" ref={menuRef}>
//           <button
//             onClick={(e) => {
//               e.stopPropagation()
//               setShowMenu(!showMenu)
//             }}
//             className="p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
//           >
//             <MoreVertical className="w-4 h-4 text-black" />
//           </button>
//           {showMenu && <Menu />}
//         </div>
//       </div>

//       {canRename && (
//         <RenameModal
//           isOpen={showRenameModal}
//           onClose={() => setShowRenameModal(false)}
//           currentName={fileName}
//           onRename={(newName) => setFileName(newName)}
//         />
//       )}

//       <ShareModal
//         isOpen={showShareModal}
//         onClose={() => setShowShareModal(false)}
//         fileName={fileName}
//         fileType="file"
//         itemId={id}
//       />

//       <FilePreview
//         isOpen={showFilePreview}
//         onClose={() => setShowFilePreview(false)}
//         fileName={fileName}
//         fileType={type}
//         fileUrl={signedUrl || undefined}
//       />
//     </>
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
  Star,
  StarOff,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import RenameModal from "../components/RenamModel"
import ShareModal from "../components/ShareModel"
import FilePreview from "../components/FilePreview"
import { moveToTrash, getFileUrl, downloadFile, renameItem, toggleStar } from "../lib/item.service"

interface FileCardProps {
  id: string
  name: string
  type:
    | "file"
    | "folder"
    | "image"
    | "video"
    | "audio"
    | "document"
    | "archive"
    | "other"
    | "spreadsheet"
    | "presentation"
  size: string
  modifiedDate: string
  isStarred?: boolean
  thumbnail?: string
  fileUrl?: string
  onClick?: () => void
  viewMode?: "grid" | "list"
  onTrashed?: () => void
  canRename?: boolean
  onStarToggled?: (newStarred: boolean) => void
  canStar?: boolean
}

const FileCard: React.FC<FileCardProps> = ({
  id,
  name,
  type,
  size,
  modifiedDate,
  thumbnail,
  fileUrl,
  onClick,
  onTrashed,
  canRename = true,
  isStarred = false,
  onStarToggled,
  viewMode = "grid",
  canStar = true,
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [fileName, setFileName] = useState(name)
  const [starred, setStarred] = useState(isStarred)
  const menuRef = useRef<HTMLDivElement>(null)
  const [showFilePreview, setShowFilePreview] = useState(false)
  const [signedUrl, setSignedUrl] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

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

  const handleMenuClick = async (e: React.MouseEvent, action: string) => {
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
        try {
          const url = await getFileUrl(id)
          setSignedUrl(url)
          setShowFilePreview(true)
        } catch (err: any) {
          alert(err.message || "Failed to fetch file preview")
        }
        break
      case "download":
        try {
          setDownloading(true)
          await downloadFile(id)
          setDownloading(false)
          setDownloadSuccess(true)
          setTimeout(() => setDownloadSuccess(false), 1500)
        } catch (err: any) {
          setDownloading(false)
          alert(err.message || "Download failed")
        }
        break
      case "delete":
        try {
          await moveToTrash(id)
          if (onTrashed) onTrashed()
        } catch (err: any) {
          alert(err.message || "Failed to move to trash")
        }
        break
      case "star":
        try {
          const updated = await toggleStar(id)
          setStarred(updated.isStarred)
          if (onStarToggled) onStarToggled(updated.isStarred)
        } catch (err: any) {
          alert(err.message || "Failed to toggle star")
        }
        break
      default:
        console.log(`${action}: ${fileName}`)
        break
    }
  }

  const Menu = () => (
    <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
      <button
        onClick={(e) => handleMenuClick(e, "open")}
        className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-black dark:text-white"
      >
        <FolderOpen className="w-4 h-4 mr-2" />
        Open
      </button>
      <button
        onClick={(e) => handleMenuClick(e, "share")}
        className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-black dark:text-white"
      >
        <Share className="w-4 h-4 mr-2" />
        Share
      </button>
      <button
        onClick={(e) => handleMenuClick(e, "download")}
        className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-black dark:text-white"
      >
        <Download className="w-4 h-4 mr-2" />
        Download
      </button>
      {canRename && (
        <button
          onClick={(e) => handleMenuClick(e, "rename")}
          className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-black dark:text-white"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Rename
        </button>
      )}
      <button
        onClick={(e) => handleMenuClick(e, "delete")}
        className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-black dark:text-white"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Move to trash
      </button>
      {canStar && (
        <button
          onClick={(e) => handleMenuClick(e, "star")}
          className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-black dark:text-white"
        >
          {starred ? (
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
          ) : (
            <StarOff className="w-4 h-4 mr-2 text-gray-500" />
          )}
          {starred ? "Unstar" : "Star"}
        </button>
      )}
    </div>
  )

  if (viewMode === "list") {
    return (
      <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 group">
        <div className="flex items-center flex-1 min-w-0">
          <div className="flex-shrink-0 mr-3">{getFileIcon()}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-black dark:text-white truncate">{fileName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
          <span className="w-24 text-left">{modifiedDate}</span>
          <span className="w-16 text-right">{size}</span>
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-4 h-4 text-black dark:text-white" />
            </button>
            {showMenu && <Menu />}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-all cursor-pointer group relative p-4"
        onClick={onClick}
      >
        <div className="flex flex-col items-center space-y-3">
          {thumbnail ? (
            <img src={thumbnail} alt={fileName} className="w-16 h-16 object-cover rounded" />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center">{getFileIcon()}</div>
          )}
          <div className="text-center w-full">
            <p className="text-sm text-black dark:text-white truncate mb-1 font-normal" title={fileName}>
              {fileName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{modifiedDate}</p>
          </div>
        </div>

        <div className="absolute top-2 right-2" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4 text-black dark:text-white" />
          </button>
          {showMenu && <Menu />}
        </div>
      </div>

      {canRename && (
        <RenameModal
          isOpen={showRenameModal}
          onClose={() => setShowRenameModal(false)}
          currentName={fileName}
          onRename={(newName) => setFileName(newName)}
        />
      )}

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        fileName={fileName}
        fileType="file"
        itemId={id}
      />

      <FilePreview
        isOpen={showFilePreview}
        onClose={() => setShowFilePreview(false)}
        fileName={fileName}
        fileType={type}
        fileUrl={signedUrl || undefined}
      />
    </>
  )
}

export default FileCard
