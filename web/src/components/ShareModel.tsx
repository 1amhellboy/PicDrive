// // "use client"

// // import type React from "react"
// // import { useState } from "react"
// // import { X, Link, ChevronDown, Settings } from "lucide-react"

// // interface ShareModalProps {
// //   isOpen: boolean
// //   onClose: () => void
// //   fileName: string
// //   fileType: "file" | "folder"
// // }

// // const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, fileName, fileType }) => {
// //   const [accessLevel, setAccessLevel] = useState("Restricted")
// //   const [showAccessDropdown, setShowAccessDropdown] = useState(false)

// //   const handleCopyLink = () => {
// //     // Simulate copying link to clipboard
// //     navigator.clipboard.writeText(`https://picdrive.com/share/${fileName}`)
// //     console.log("Link copied to clipboard")
// //   }

// //   if (!isOpen) return null

// //   return (
// //     <div className="fixed inset-0  flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg shadow-xl w-[500px] max-w-md mx-4">
// //         <div className="flex items-center justify-between p-6 border-b border-gray-200">
// //           <div className="flex items-center space-x-3">
// //             <h2 className="text-lg font-medium text-black">Share "{fileName}"</h2>
// //             <button className="p-1 hover:bg-gray-100 rounded">
// //               <Settings className="w-4 h-4 text-gray-500" />
// //             </button>
// //           </div>
// //           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
// //             <X className="w-5 h-5 text-gray-500" />
// //           </button>
// //         </div>

// //         <div className="p-6 space-y-6">
// //           {/* Add people input */}
// //           <div>
// //             <input
// //               type="text"
// //               placeholder="Add people, groups, and calendar events"
// //               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
// //             />
// //           </div>

// //           {/* People with access */}
// //           <div>
// //             <h3 className="text-sm font-medium text-black mb-3">People with access</h3>
// //             <div className="flex items-center space-x-3">
// //               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
// //                 U
// //               </div>
// //               <div className="flex-1">
// //                 <p className="text-sm font-medium text-black">USER (you)</p>
// //                 <p className="text-xs text-gray-500">user@picdrive.com</p>
// //               </div>
// //               <span className="text-sm text-gray-500">Owner</span>
// //             </div>
// //           </div>

// //           {/* General access */}
// //           <div>
// //             <h3 className="text-sm font-medium text-black mb-3">General access</h3>
// //             <div className="relative">
// //               <button
// //                 onClick={() => setShowAccessDropdown(!showAccessDropdown)}
// //                 className="flex items-center space-x-2 p-2 border border-gray-300 rounded hover:bg-gray-50 w-full"
// //               >
// //                 <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
// //                   <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
// //                 </div>
// //                 <div className="flex-1 text-left">
// //                   <p className="text-sm font-medium text-black">{accessLevel}</p>
// //                   <p className="text-xs text-gray-500">Only people with access can open with the link</p>
// //                 </div>
// //                 <ChevronDown className="w-4 h-4 text-gray-500" />
// //               </button>

// //               {showAccessDropdown && (
// //                 <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
// //                   <button
// //                     onClick={() => {
// //                       setAccessLevel("Restricted")
// //                       setShowAccessDropdown(false)
// //                     }}
// //                     className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-black"
// //                   >
// //                     Restricted
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       setAccessLevel("Anyone with the link")
// //                       setShowAccessDropdown(false)
// //                     }}
// //                     className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-black"
// //                   >
// //                     Anyone with the link
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Action buttons */}
// //           <div className="flex justify-between">
// //             <button
// //               onClick={handleCopyLink}
// //               className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-black"
// //             >
// //               <Link className="w-4 h-4" />
// //               <span>Copy link</span>
// //             </button>
// //             <button
// //               onClick={onClose}
// //               className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
// //             >
// //               Done
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ShareModal

// // "use client"

// // import type React from "react"
// // import { useState } from "react"
// // import { X, Link, ChevronDown, Settings } from "lucide-react"
// // import { shareItem } from "../lib/item.service" // 🔑 call backend API

// // interface ShareModalProps {
// //   isOpen: boolean
// //   onClose: () => void
// //   fileId: string
// //   fileName: string
// //   itemId: string
// //   fileType: "file" | "folder"
// // }

// // const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, fileId, fileName, fileType }) => {
// //   const [recipientEmail, setRecipientEmail] = useState("")
// //   const [accessLevel, setAccessLevel] = useState("Restricted")
// //   const [showAccessDropdown, setShowAccessDropdown] = useState(false)
// //   const [loading, setLoading] = useState(false)

// //   // const handleShare = async () => {
// //   //   if (!recipientEmail.trim() && accessLevel === "Restricted") {
// //   //     alert("Please enter recipient email")
// //   //     return
// //   //   }

// //   //   try {
// //   //     setLoading(true)

// //   //     const isPublic = accessLevel === "Anyone with the link"

// //   //     // 🔑 call backend API
// //   //     const res = await shareItem({
// //   //       itemId: fileId,
// //   //       sharedWith: recipientEmail,
// //   //       isPublic,
// //   //       permission: "view", // or "edit", later we can make this dynamic
// //   //     })

// //   //     console.log("Share success:", res)
// //   //     alert(`File shared with ${isPublic ? "anyone" : recipientEmail}`)

// //   //     setRecipientEmail("")
// //   //     onClose()
// //   //   } catch (err: any) {
// //   //     alert(err.message || "Failed to share")
// //   //   } finally {
// //   //     setLoading(false)
// //   //   }
// //   // }

// //   const handleShare = async () => {
// //   if (!recipientEmail.trim() && accessLevel === "Restricted") {
// //     alert("Please enter recipient email")
// //     return
// //   }

// //   try {
// //     setLoading(true)

// //     const isPublic = accessLevel === "Anyone with the link"

// //     // ✅ Pass 4 arguments
// //     const res = await shareItem(
// //       itemId,
// //       // fileId,
// //       recipientEmail,
// //       isPublic,
// //       "viewer"
// //     )

// //     console.log("Share success:", res)
// //     alert(`File shared with ${isPublic ? "anyone" : recipientEmail}`)

// //     setRecipientEmail("")
// //     onClose()
// //   } catch (err: any) {
// //     alert(err.message || "Failed to share")
// //   } finally {
// //     setLoading(false)
// //   }
// // }


// //   const handleCopyLink = () => {
// //     navigator.clipboard.writeText(`https://picdrive.com/share/${fileId}`)
// //     alert("Link copied to clipboard")
// //   }

// //   if (!isOpen) return null

// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg shadow-xl w-[500px] max-w-md mx-4">
// //         <div className="flex items-center justify-between p-6 border-b border-gray-200">
// //           <div className="flex items-center space-x-3">
// //             <h2 className="text-lg font-medium text-black">Share "{fileName}"</h2>
// //             <button className="p-1 hover:bg-gray-100 rounded">
// //               <Settings className="w-4 h-4 text-gray-500" />
// //             </button>
// //           </div>
// //           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
// //             <X className="w-5 h-5 text-gray-500" />
// //           </button>
// //         </div>

// //         <div className="p-6 space-y-6">
// //           {/* Add people input */}
// //           {accessLevel === "Restricted" && (
// //             <div>
// //               <input
// //                 type="email"
// //                 placeholder="Enter recipient email"
// //                 value={recipientEmail}
// //                 onChange={(e) => setRecipientEmail(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
// //               />
// //             </div>
// //           )}

// //           {/* People with access */}
// //           <div>
// //             <h3 className="text-sm font-medium text-black mb-3">People with access</h3>
// //             <div className="flex items-center space-x-3">
// //               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
// //                 U
// //               </div>
// //               <div className="flex-1">
// //                 <p className="text-sm font-medium text-black">USER (you)</p>
// //                 <p className="text-xs text-gray-500">user@picdrive.com</p>
// //               </div>
// //               <span className="text-sm text-gray-500">Owner</span>
// //             </div>
// //           </div>

// //           {/* General access */}
// //           <div>
// //             <h3 className="text-sm font-medium text-black mb-3">General access</h3>
// //             <div className="relative">
// //               <button
// //                 onClick={() => setShowAccessDropdown(!showAccessDropdown)}
// //                 className="flex items-center space-x-2 p-2 border border-gray-300 rounded hover:bg-gray-50 w-full"
// //               >
// //                 <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
// //                   <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
// //                 </div>
// //                 <div className="flex-1 text-left">
// //                   <p className="text-sm font-medium text-black">{accessLevel}</p>
// //                   <p className="text-xs text-gray-500">
// //                     {accessLevel === "Restricted"
// //                       ? "Only people with access can open"
// //                       : "Anyone with the link can open"}
// //                   </p>
// //                 </div>
// //                 <ChevronDown className="w-4 h-4 text-gray-500" />
// //               </button>

// //               {showAccessDropdown && (
// //                 <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
// //                   <button
// //                     onClick={() => {
// //                       setAccessLevel("Restricted")
// //                       setShowAccessDropdown(false)
// //                     }}
// //                     className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-black"
// //                   >
// //                     Restricted
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       setAccessLevel("Anyone with the link")
// //                       setShowAccessDropdown(false)
// //                     }}
// //                     className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-black"
// //                   >
// //                     Anyone with the link
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Action buttons */}
// //           <div className="flex justify-between">
// //             <button
// //               onClick={handleCopyLink}
// //               className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-black"
// //             >
// //               <Link className="w-4 h-4" />
// //               <span>Copy link</span>
// //             </button>
// //             <button
// //               onClick={handleShare}
// //               disabled={loading}
// //               className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
// //             >
// //               {loading ? "Sharing..." : "Done"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ShareModal

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { X, Link, ChevronDown, Settings } from "lucide-react"
// import { shareItem } from "../lib/item.service"

// interface ShareModalProps {
//   isOpen: boolean
//   onClose: () => void
//   fileName: string
//   fileType: "file" | "folder"
//   itemId: string   // ✅ add this
// }

// const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, fileName, fileType, itemId }) => {
//   const [recipientEmail, setRecipientEmail] = useState("")
//   const [accessLevel, setAccessLevel] = useState<"Restricted" | "Anyone with the link">("Restricted")
//   const [showAccessDropdown, setShowAccessDropdown] = useState(false)

//   const handleShare = async () => {
//     try {
//       const isPublic = accessLevel === "Anyone with the link"
//       await shareItem(itemId, recipientEmail, isPublic, "viewer") // ✅ uses all args
//       alert("File shared successfully!")
//       onClose()
//     } catch (err: any) {
//       alert(err.message || "Failed to share item")
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-[500px] max-w-md mx-4">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-lg font-medium text-black">Share "{fileName}"</h2>
//           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-6 space-y-6">
//           {/* Recipient input */}
//           <div>
//             <input
//               type="email"
//               value={recipientEmail}
//               onChange={(e) => setRecipientEmail(e.target.value)}
//               placeholder="Enter recipient's email"
//               className="w-full px-3 py-2 border border-gray-300 rounded text-black"
//             />
//           </div>

//           {/* Access level dropdown */}
//           <div>
//             <h3 className="text-sm font-medium text-black mb-3">General access</h3>
//             <div className="relative">
//               <button
//                 onClick={() => setShowAccessDropdown(!showAccessDropdown)}
//                 className="flex items-center space-x-2 p-2 border border-gray-300 rounded hover:bg-gray-50 w-full"
//               >
//                 <span className="flex-1 text-left">{accessLevel}</span>
//                 <ChevronDown className="w-4 h-4 text-gray-500" />
//               </button>
//               {showAccessDropdown && (
//                 <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
//                   <button
//                     onClick={() => {
//                       setAccessLevel("Restricted")
//                       setShowAccessDropdown(false)
//                     }}
//                     className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-black"
//                   >
//                     Restricted
//                   </button>
//                   <button
//                     onClick={() => {
//                       setAccessLevel("Anyone with the link")
//                       setShowAccessDropdown(false)
//                     }}
//                     className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-black"
//                   >
//                     Anyone with the link
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between p-6 border-t border-gray-200">
//           <button
//             onClick={handleShare}
//             className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
//           >
//             Share
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ShareModal

"use client"

import type React from "react"
import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import { shareItem } from "../lib/item.service"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  fileName: string
  fileType: "file" | "folder"
  itemId: string
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, fileName, itemId }) => {
  const [recipientEmail, setRecipientEmail] = useState("")
  const [accessLevel, setAccessLevel] = useState<"Restricted" | "Anyone with the link">("Restricted")
  const [showAccessDropdown, setShowAccessDropdown] = useState(false)

  const handleShare = async () => {
    try {
      const isPublic = accessLevel === "Anyone with the link"
      await shareItem(itemId, recipientEmail, isPublic, "viewer")
      alert("File shared successfully!")
      onClose()
    } catch (err: any) {
      alert(err.message || "Failed to share item")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-[500px] max-w-md mx-4">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Share "{fileName}"</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Recipient input */}
          <div>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Enter recipient's email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Access level dropdown */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">General access</h3>
            <div className="relative">
              <button
                onClick={() => setShowAccessDropdown(!showAccessDropdown)}
                className="flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <span className="flex-1 text-left text-gray-900 dark:text-gray-100">{accessLevel}</span>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-300" />
              </button>
              {showAccessDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      setAccessLevel("Restricted")
                      setShowAccessDropdown(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Restricted
                  </button>
                  <button
                    onClick={() => {
                      setAccessLevel("Anyone with the link")
                      setShowAccessDropdown(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Anyone with the link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleShare}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
