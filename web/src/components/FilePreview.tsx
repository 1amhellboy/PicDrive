// "use client"

// import type React from "react"
// import { X, Download, AlertCircle } from "lucide-react"
// import { downloadFile } from "../lib/item.service"
// import { useToast } from "../context/ToastContext"

// interface FilePreviewProps {
//   isOpen: boolean
//   onClose: () => void
//   fileName: string
//   fileType: "image" | "video" | "audio" | "document" | "archive" | "other" | "spreadsheet" | "presentation"
//   fileUrl?: string
//   fileId?: string
// }

// const FilePreview: React.FC<FilePreviewProps> = ({
//   isOpen,
//   onClose,
//   fileName,
//   fileType,
//   fileUrl = "/document-preview.png",
//   fileId,
  
// }) => {
//   if (!isOpen) return null

//   const getFileExtension = (name: string) => {
//     return name.split(".").pop()?.toLowerCase() || ""
//   }

//   const extension = getFileExtension(fileName)
//   const isImage = ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)
//   const isPdf = extension === "pdf"
//   const { addToast } = useToast()

//     const handleDownload = async () => {
//     try {
//       if (fileId) {
//         await downloadFile(fileId) // ✅ trigger backend download
//         addToast({
//           type: "info",
//           title: "Download Started",
//           description: `${fileName} is being downloaded`,
//         })
//       } else if (fileUrl) {
//         // fallback: direct browser download if we only have a URL
//         const link = document.createElement("a")
//         link.href = fileUrl
//         link.download = fileName
//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link)

//         addToast({
//           type: "info",
//           title: "Download Started",
//           description: `${fileName} is being downloaded`,
//         })
//       }
//     } catch (err: any) {
//       addToast({
//         type: "error",
//         title: "Download Failed",
//         description: err.message || "Unable to download file",
//       })
//     }
//   }

//   const renderPreview = () => {
//     console.log("Previewing:", fileName, "url:", fileUrl);
//     if (isImage) {
//       return (
//         <div className="flex items-center justify-center h-full">
//           <img
//             src={fileUrl || "/placeholder.svg"}
//             alt={fileName}
//             className="max-w-full max-h-full object-contain rounded"
//           />
//         </div>
//       )
//     }

//     if (isPdf) {
//       return (
//         <div className="h-full">
//           <iframe src={fileUrl} className="w-full h-full rounded" title={fileName} />
//         </div>
//       )
//     }

//     // For other file types, show no preview available
//     return (
//       <div className="flex flex-col items-center justify-center h-full text-gray-500">
//         <AlertCircle className="w-16 h-16 mb-4" />
//         <h3 className="text-lg font-medium mb-2">No preview available</h3>
//         <p className="text-sm mb-4">This file type cannot be previewed</p>
//         {/* <button
//           onClick={() => console.log(`Download: ${fileName}`)}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Download className="w-4 h-4 mr-2" />
//           Download instead
//         </button> */}
//       </div>
//     )
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
//       <div className="bg-white rounded-lg shadow-xl w-[90vw] h-[90vh] max-w-4xl flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <h2 className="text-lg font-medium text-gray-900 truncate">{fileName}</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Preview Content */}
//         <div className="flex-1 p-4 overflow-hidden">{renderPreview()}</div>

//         {/* Footer */}
//         <div className="flex items-center justify-between p-4 border-t border-gray-200">
//           <span className="text-sm text-gray-500">
//             {fileType.charAt(0).toUpperCase() + fileType.slice(1)} • {extension.toUpperCase()}
//           </span>
//           <button
//             onClick={() => console.log(`Download: ${fileName}`)}
//             className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//           >
//             <Download className="w-4 h-4 mr-1" />
//             Download
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FilePreview

// "use client";

// import { X, Download, AlertCircle } from "lucide-react";

// interface FilePreviewProps {
//   isOpen: boolean;
//   onClose: () => void;
//   fileName: string;
//   fileType: "image" | "video" | "audio" | "document" | "archive" | "other" | "spreadsheet" | "presentation";
//   fileUrl?: string;
// }

// const FilePreview: React.FC<FilePreviewProps> = ({
//   isOpen,
//   onClose,
//   fileName,
//   fileType,
//   fileUrl,
// }) => {
//   if (!isOpen) return null;

//   const extension = fileName.split(".").pop()?.toLowerCase();

//   const renderPreview = () => {
//     if (fileType === "image") {
//       return (
//         <img
//           src={fileUrl}
//           alt={fileName}
//           className="max-w-full max-h-full object-contain rounded"
//         />
//       );
//     }

//     if (extension === "pdf") {
//       return (
//         <iframe
//           src={fileUrl}
//           title={fileName}
//           className="w-full h-full rounded"
//         />
//       );
//     }

//     return (
//       <div className="flex flex-col items-center justify-center h-full text-gray-500">
//         <AlertCircle className="w-16 h-16 mb-4" />
//         <h3 className="text-lg font-medium mb-2">No preview available</h3>
//         <p className="text-sm mb-4">This file type cannot be previewed</p>
//         <a
//           href={fileUrl}
//           download={fileName}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           <Download className="w-4 h-4 mr-2 inline" />
//           Download
//         </a>
//       </div>
//     );
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-lg shadow-xl w-[90vw] h-[90vh] max-w-4xl flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <h2 className="text-lg font-medium text-gray-900 truncate">{fileName}</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
//           {renderPreview()}
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between p-4 border-t border-gray-200">
//           <span className="text-sm text-gray-500">{fileType.toUpperCase()}</span>
//           {fileUrl && (
//             <a
//               href={fileUrl}
//               download={fileName}
//               className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg"
//             >
//               <Download className="w-4 h-4 inline mr-1" />
//               Download
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilePreview;

"use client"

import type React from "react"
import { X, Download, AlertCircle } from "lucide-react"
import { downloadFile } from "../lib/item.service" // ✅ import download service
import { useToast } from "../context/ToastContext" // ✅ toast for feedback

interface FilePreviewProps {
  isOpen: boolean
  onClose: () => void
  fileName: string
  fileType:
    | "image"
    | "video"
    | "audio"
    | "document"
    | "archive"
    | "other"
    | "spreadsheet"
    | "presentation"
  fileUrl?: string
  fileId?: string // ✅ added so we can download via backend
}

const FilePreview: React.FC<FilePreviewProps> = ({
  isOpen,
  onClose,
  fileName,
  fileType,
  fileUrl = "/document-preview.png",
  fileId,
}) => {
  const { addToast } = useToast()

  if (!isOpen) return null

  const getFileExtension = (name: string) => {
    return name.split(".").pop()?.toLowerCase() || ""
  }

  const extension = getFileExtension(fileName)
  const isImage = ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)
  const isPdf = extension === "pdf"

  const handleDownload = async () => {
    try {
      if (fileId) {
        await downloadFile(fileId) //  trigger backend download
        addToast({
          type: "info",
          title: "Download Started",
          description: `${fileName} is being downloaded`,
        })
      } else if (fileUrl) {
        // fallback: direct browser download if we only have a URL
        const link = document.createElement("a")
        link.href = fileUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        addToast({
          type: "info",
          title: "Download Started",
          description: `${fileName} is being downloaded`,
        })
      }
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Download Failed",
        description: err.message || "Unable to download file",
      })
    }
  }

  const renderPreview = () => {
    if (isImage) {
      return (
        <div className="flex items-center justify-center h-full">
          <img
            src={fileUrl || "/placeholder.svg"}
            alt={fileName}
            className="max-w-full max-h-full object-contain rounded"
          />
        </div>
      )
    }

    if (isPdf) {
      return (
        <div className="h-full">
          <iframe src={fileUrl} className="w-full h-full rounded" title={fileName} />
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <AlertCircle className="w-16 h-16 mb-4" />
        <h3 className="text-lg font-medium mb-2">No preview available</h3>
        <p className="text-sm mb-4">This file type cannot be previewed</p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] h-[90vh] max-w-4xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white truncate">{fileName}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-4 overflow-hidden">{renderPreview()}</div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {fileType.charAt(0).toUpperCase() + fileType.slice(1)} • {extension.toUpperCase()}
          </span>
          <button
            onClick={handleDownload}
            className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilePreview
