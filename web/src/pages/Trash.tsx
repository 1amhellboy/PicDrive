// "use client";

// import React, { useEffect, useState } from "react";
// import FileCard from "../components/FileCard";
// import FolderCard from "../components/FolderCard";
// import { RotateCcw, Trash2, CheckCircle2 } from "lucide-react";
// import { getTrashedItems, restoreItem, deleteForever, Item, emptyTrash } from "../lib/item.service";
// import { formatRelativeDate } from "../utils/formatDate";

// // 🔹 same simple type-mapping logic as MyDrive
// const mapMimeToType = (mimeType?: string) => {
//   if (!mimeType) return "other" as const;
//   if (mimeType.startsWith("image/")) return "image" as const;
//   if (mimeType.startsWith("video/")) return "video" as const;
//   if (mimeType.startsWith("audio/")) return "audio" as const;
//   if (mimeType === "application/pdf" || mimeType.includes("msword")) return "document" as const;
//   if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return "spreadsheet" as const;
//   if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "presentation" as const;
//   if (mimeType === "application/zip" || mimeType.includes("tar") || mimeType.includes("gzip")) return "archive" as const;
//   return "other" as const;
// };

// interface TrashProps {
//   viewMode: "grid" | "list";
// }

// const Trash: React.FC<TrashProps> = ({ viewMode }) => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // ✅ New states for Empty Trash action
//   const [emptying, setEmptying] = useState(false);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchTrashed = async () => {
//       try {
//         const data = await getTrashedItems();
//         setItems(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load trash");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTrashed();
//   }, []);

//   const handleRestore = async (id: string) => {
//     try {
//       await restoreItem(id);
//       setItems((prev) => prev.filter((i) => i.id !== id));
//     } catch (err: any) {
//       alert(err.message || "Restore failed");
//     }
//   };

//   const handleDeleteForever = async (id: string) => {
//     try {
//       await deleteForever(id);
//       setItems((prev) => prev.filter((i) => i.id !== id));
//     } catch (err: any) {
//       alert(err.message || "Delete failed");
//     }
//   };

//   const handleEmptyTrash = async () => {
//     setEmptying(true);
//     try {
//       await emptyTrash();
//       setItems([]);
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 2000);
//     } catch (err: any) {
//       alert(err.message || "Failed to empty trash");
//     } finally {
//       setEmptying(false);
//     }
//   };

//   const TrashActions: React.FC<{ id: string; type: "file" | "folder" }> = ({ id, type }) => (
//     <div className="flex space-x-1">
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           handleRestore(id);
//         }}
//         className="flex items-center px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors mt-2 mr-6"
//       >
//         <RotateCcw className="w-3 h-3 mr-1" />
//         Restore
//       </button>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           handleDeleteForever(id);
//         }}
//         className="flex items-center px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors mt-2"
//       >
//         <Trash2 className="w-3 h-3 mr-1" />
//         Delete
//       </button>
//     </div>
//   );

//   if (loading) return <div className="p-6 text-gray-500 text-center">Loading trash...</div>;
//   if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
//   if (emptying) {
//     return (
//       <div className="p-6 text-center">
//         <div className="p-6 text-gray-500 text-center">Emptying trash...</div>
//         <div>
//           <p className="text-gray-500">Please wait while we permanently delete your trashed items.</p>
//         </div>
//       </div>
//     );
//   }
//   if (success) {
//     return (
//       <div className="p-6 text-center">
//         <CheckCircle2 className="w-12 h-12 text-black mx-auto mb-3" />
//         <h1 className="text-2xl font-semibold text-black mb-2">Trash Emptied!</h1>
//         <p className="text-gray-500">All trashed items were deleted successfully.</p>
//       </div>
//     );
//   }

//   const folders = items.filter((i) => i.type === "folder");
//   const files = items.filter((i) => i.type === "file");
//   const totalItems = items.length;

//   return (
//     <div className="p-6 bg-white min-h-screen w-full">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-normal text-black">Trash</h1>
//           <p className="text-sm text-gray-500 mt-1">{totalItems} items</p>
//         </div>
//         <button
//           onClick={handleEmptyTrash}
//           className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
//         >
//           Empty Trash
//         </button>
//       </div>

//       {viewMode === "list" ? (
//         <div className="bg-white border border-gray-200 rounded-md">
//           <div className="flex items-center px-4 py-2 border-b border-gray-100 text-sm font-medium text-gray-600">
//             <div className="flex-1">Name</div>
//             <div className="w-28">Items</div>
//             <div className="w-32">Deleted</div>
//             <div className="w-24">Size</div>
//             <div className="w-40 text-center">Actions</div>
//           </div>

//           {folders.map((folder) => (
//             <div key={folder.id} className="flex items-center px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50">
//               <div className="flex-1">
//                 <FolderCard name={folder.name} viewMode="list" />
//               </div>
//               <div className="w-28 text-gray-500">0 Items</div>
//               <div className="w-32 text-gray-500">{formatRelativeDate(folder.createdAt)}</div>
//               <div className="w-24 text-gray-500">—</div>
//               <div className="w-40 flex justify-end">
//                 <TrashActions id={folder.id} type="folder" />
//               </div>
//             </div>
//           ))}

//           {files.map((file) => (
//             <div key={file.id} className="flex items-center px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50">
//               <div className="flex-1">
//                 <FileCard
//                   id={file.id}
//                   name={file.name}
//                   type={mapMimeToType(file.mimeType)} 
//                   size={file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"}
//                   modifiedDate={formatRelativeDate(file.createdAt)}
//                   viewMode="list"
//                 />
//               </div>
//               <div className="w-28 text-gray-500">—</div>
//               <div className="w-32 text-gray-500">{formatRelativeDate(file.createdAt)}</div>
//               <div className="w-24 text-gray-500">
//                 {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"}
//               </div>
//               <div className="w-40 flex justify-end">
//                 <TrashActions id={file.id} type="file" />
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>
//           {folders.length > 0 && (
//             <div className="mb-8">
//               <h2 className="text-lg font-medium text-gray-700 mb-4">Deleted Folders</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                 {folders.map((folder) => (
//                   <div key={folder.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
//                     <FolderCard name={folder.name} itemCount={0} modifiedDate={formatRelativeDate(folder.createdAt)} viewMode="grid" />
//                     <TrashActions id={folder.id} type="folder" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {files.length > 0 && (
//             <div>
//               <h2 className="text-lg font-medium text-gray-700 mb-4">Deleted Files</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                 {files.map((file) => (
//                   <div key={file.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
//                     <FileCard
//                       id={file.id}
//                       name={file.name}
//                       type={mapMimeToType(file.mimeType)} 
//                       size={file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"}
//                       modifiedDate={formatRelativeDate(file.createdAt)}
//                       viewMode="grid"
//                     />
//                     <TrashActions id={file.id} type="file" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {totalItems === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">Trash is empty.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Trash;

// "use client";

// import React, { useEffect, useState } from "react";
// import FileCard from "../components/FileCard";
// import FolderCard from "../components/FolderCard";
// import { RotateCcw, Trash2, CheckCircle2 } from "lucide-react";
// import {
//   getTrashedItems,
//   restoreItem,
//   deleteForever,
//   emptyTrash,
//   Item,
// } from "../lib/item.service";
// import { formatRelativeDate } from "../utils/formatDate";

// const mapMimeToType = (mimeType?: string) => {
//   if (!mimeType) return "other" as const;
//   if (mimeType.startsWith("image/")) return "image" as const;
//   if (mimeType.startsWith("video/")) return "video" as const;
//   if (mimeType.startsWith("audio/")) return "audio" as const;
//   if (mimeType === "application/pdf" || mimeType.includes("msword"))
//     return "document" as const;
//   if (mimeType.includes("spreadsheet") || mimeType.includes("excel"))
//     return "spreadsheet" as const;
//   if (mimeType.includes("presentation") || mimeType.includes("powerpoint"))
//     return "presentation" as const;
//   if (
//     mimeType === "application/zip" ||
//     mimeType.includes("tar") ||
//     mimeType.includes("gzip")
//   )
//     return "archive" as const;
//   return "other" as const;
// };

// interface TrashProps {
//   viewMode: "grid" | "list";
// }

// const Trash: React.FC<TrashProps> = ({ viewMode }) => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [emptying, setEmptying] = useState(false);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchTrashed = async () => {
//       try {
//         const data = await getTrashedItems();
//         setItems(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load trash");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTrashed();
//   }, []);

//   const handleRestore = async (id: string) => {
//     try {
//       await restoreItem(id);
//       setItems((prev) => prev.filter((i) => i.id !== id));
//     } catch (err: any) {
//       alert(err.message || "Restore failed");
//     }
//   };

//   const handleDeleteForever = async (id: string) => {
//     try {
//       await deleteForever(id);
//       setItems((prev) => prev.filter((i) => i.id !== id));
//     } catch (err: any) {
//       alert(err.message || "Delete failed");
//     }
//   };

//   const handleEmptyTrash = async () => {
//     setEmptying(true);
//     try {
//       await emptyTrash();
//       setItems([]);
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 2000);
//     } catch (err: any) {
//       alert(err.message || "Failed to empty trash");
//     } finally {
//       setEmptying(false);
//     }
//   };

//   const TrashActions: React.FC<{ id: string }> = ({ id }) => (
//     <div className="flex space-x-2 mt-2">
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           handleRestore(id);
//         }}
//         className="flex items-center px-2 py-1 text-xs text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-gray-700 rounded transition-colors"
//       >
//         <RotateCcw className="w-3 h-3 mr-1" />
//         Restore
//       </button>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           handleDeleteForever(id);
//         }}
//         className="flex items-center px-2 py-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-gray-700 rounded transition-colors"
//       >
//         <Trash2 className="w-3 h-3 mr-1" />
//         Delete
//       </button>
//     </div>
//   );

//   if (loading)
//     return (
//       <div className="p-6 text-gray-500 dark:text-gray-400 text-center">
//         Loading trash...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="p-6 text-red-500 dark:text-red-400 text-center">
//         {error}
//       </div>
//     );

//   if (emptying)
//     return (
//       <div className="p-6 text-center text-gray-500 dark:text-gray-400">
//         Emptying trash...
//       </div>
//     );

//   if (success)
//     return (
//       <div className="p-6 text-center">
//         <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
//         <h1 className="text-2xl font-semibold text-black dark:text-white mb-2">
//           Trash Emptied!
//         </h1>
//         <p className="text-gray-500 dark:text-gray-400">
//           All trashed items were deleted successfully.
//         </p>
//       </div>
//     );

//   const folders = items.filter((i) => i.type === "folder");
//   const files = items.filter((i) => i.type === "file");
//   const totalItems = items.length;

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 min-h-screen w-full">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-normal text-black dark:text-white">
//             Trash
//           </h1>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             {totalItems} items
//           </p>
//         </div>
//         <button
//           onClick={handleEmptyTrash}
//           className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-gray-800 transition-colors"
//         >
//           Empty Trash
//         </button>
//       </div>

//       {viewMode === "list" ? (
//         <div className="bg-white dark:bg-gray-800 rounded-md">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
//             >
//               <div className="flex-1">
//                 {item.type === "folder" ? (
//                   <FolderCard
//                     name={item.name}
//                     itemCount={0}
//                     modifiedDate={formatRelativeDate(item.createdAt)}
//                     viewMode="list"
//                   />
//                 ) : (
//                   <FileCard
//                     id={item.id}
//                     name={item.name}
//                     type={mapMimeToType(item.mimeType)}
//                     size={
//                       item.size
//                         ? `${(item.size / 1024 / 1024).toFixed(2)} MB`
//                         : "—"
//                     }
//                     modifiedDate={formatRelativeDate(item.createdAt)}
//                     viewMode="list"
//                   />
//                 )}
//               </div>
//               <TrashActions id={item.id} />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-sm transition-shadow"
//             >
//               {item.type === "folder" ? (
//                 <FolderCard
//                   name={item.name}
//                   itemCount={0}
//                   modifiedDate={formatRelativeDate(item.createdAt)}
//                   viewMode="grid"
//                 />
//               ) : (
//                 <FileCard
//                   id={item.id}
//                   name={item.name}
//                   type={mapMimeToType(item.mimeType)}
//                   size={
//                     item.size
//                       ? `${(item.size / 1024 / 1024).toFixed(2)} MB`
//                       : "—"
//                   }
//                   modifiedDate={formatRelativeDate(item.createdAt)}
//                   viewMode="grid"
//                 />
//               )}
//               <TrashActions id={item.id} />
//             </div>
//           ))}
//         </div>
//       )}

//       {totalItems === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 dark:text-gray-400">
//             Trash is empty.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Trash;

// "use client";

// import React, { useEffect, useState } from "react";
// import { RotateCcw, Trash2, CheckCircle2 } from "lucide-react";
// import FileCard from "../components/FileCard";
// import FolderCard from "../components/FolderCard";
// import {
//   getTrashedItems,
//   restoreItem,
//   deleteForever,
//   emptyTrash,
//   Item,
// } from "../lib/item.service";
// import { formatRelativeDate } from "../utils/formatDate";

// const mapMimeToType = (mimeType?: string) => {
//   if (!mimeType) return "other" as const;
//   if (mimeType.startsWith("image/")) return "image" as const;
//   if (mimeType.startsWith("video/")) return "video" as const;
//   if (mimeType.startsWith("audio/")) return "audio" as const;
//   if (mimeType === "application/pdf" || mimeType.includes("msword"))
//     return "document" as const;
//   if (mimeType.includes("spreadsheet") || mimeType.includes("excel"))
//     return "spreadsheet" as const;
//   if (mimeType.includes("presentation") || mimeType.includes("powerpoint"))
//     return "presentation" as const;
//   if (
//     mimeType === "application/zip" ||
//     mimeType.includes("tar") ||
//     mimeType.includes("gzip")
//   )
//     return "archive" as const;
//   return "other" as const;
// };

// interface TrashProps {
//   viewMode: "grid" | "list";
// }

// const Trash: React.FC<TrashProps> = ({ viewMode }) => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [emptying, setEmptying] = useState(false);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchTrashed = async () => {
//       try {
//         const data = await getTrashedItems();
//         setItems(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load trash");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTrashed();
//   }, []);

//   const handleRestore = async (id: string) => {
//     try {
//       await restoreItem(id);
//       setItems((prev) => prev.filter((i) => i.id !== id));
//     } catch (err: any) {
//       alert(err.message || "Restore failed");
//     }
//   };

//   const handleDeleteForever = async (id: string) => {
//     try {
//       await deleteForever(id);
//       setItems((prev) => prev.filter((i) => i.id !== id));
//     } catch (err: any) {
//       alert(err.message || "Delete failed");
//     }
//   };

//   const handleEmptyTrash = async () => {
//     setEmptying(true);
//     try {
//       await emptyTrash();
//       setItems([]);
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 2000);
//     } catch (err: any) {
//       alert(err.message || "Failed to empty trash");
//     } finally {
//       setEmptying(false);
//     }
//   };

//   const TrashActions: React.FC<{ id: string }> = ({ id }) => (
//     <div className="flex space-x-3">
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           handleRestore(id);
//         }}
//         className="flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline"
//       >
//         <RotateCcw className="w-3 h-3 mr-1" />
//         Restore
//       </button>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           handleDeleteForever(id);
//         }}
//         className="flex items-center text-xs text-red-600 dark:text-red-400 hover:underline"
//       >
//         <Trash2 className="w-3 h-3 mr-1" />
//         Delete
//       </button>
//     </div>
//   );

//   if (loading)
//     return (
//       <div className="p-6 text-gray-500 dark:text-gray-400 text-center">
//         Loading trash...
//       </div>
//     );
//   if (error)
//     return (
//       <div className="p-6 text-red-500 dark:text-red-400 text-center">
//         {error}
//       </div>
//     );

//   const totalItems = items.length;

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 min-h-screen w-full">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-normal text-black dark:text-white">
//             Trash
//           </h1>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             {totalItems} items
//           </p>
//         </div>
//         {totalItems > 0 && (
//           <button
//             onClick={handleEmptyTrash}
//             className="px-4 py-2 text-sm text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//           >
//             Empty Trash
//           </button>
//         )}
//       </div>

//       {viewMode === "list" ? (
//         <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
//           {/* ✅ Proper Header Row */}
//           <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300">
//             <div className="flex-1">Name</div>
//             <div className="w-32">Deleted</div>
//             <div className="w-24">Size</div>
//             <div className="w-32 text-right">Actions</div>
//           </div>

//           {items.map((file) => (
//             <div
//               key={file.id}
//               className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
//             >
//               <div className="flex-1">
//                 <FileCard
//                   id={file.id}
//                   name={file.name}
//                   type={mapMimeToType(file.mimeType)}
//                   size={
//                     file.size
//                       ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
//                       : "—"
//                   }
//                   modifiedDate={formatRelativeDate(file.createdAt)}
//                   viewMode="list"
//                 />
//               </div>
//               <div className="w-32 text-gray-500 dark:text-gray-400">
//                 {formatRelativeDate(file.createdAt)}
//               </div>
//               <div className="w-24 text-gray-500 dark:text-gray-400">
//                 {file.size
//                   ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
//                   : "—"}
//               </div>
//               <div className="w-32 flex justify-end">
//                 <TrashActions id={file.id} />
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {items.map((file) => (
//             <div
//               key={file.id}
//               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3"
//             >
//               <FileCard
//                 id={file.id}
//                 name={file.name}
//                 type={mapMimeToType(file.mimeType)}
//                 size={
//                   file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"
//                 }
//                 modifiedDate={formatRelativeDate(file.createdAt)}
//                 viewMode="grid"
//               />
//               {/* ✅ Always show Restore + Delete under card */}
//               <div className="flex justify-between mt-3">
//                 <TrashActions id={file.id} />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {totalItems === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 dark:text-gray-400">Trash is empty.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Trash;

"use client";

import React, { useEffect, useState } from "react";
import FileCard from "../components/FileCard";
import FolderCard from "../components/FolderCard";
import { RotateCcw, Trash2, CheckCircle2 } from "lucide-react";
import {
  getTrashedItems,
  restoreItem,
  deleteForever,
  Item,
  emptyTrash,
} from "../lib/item.service";
import { formatRelativeDate } from "../utils/formatDate";

// 🔹 same simple type-mapping logic as MyDrive
const mapMimeToType = (mimeType?: string) => {
  if (!mimeType) return "other" as const;
  if (mimeType.startsWith("image/")) return "image" as const;
  if (mimeType.startsWith("video/")) return "video" as const;
  if (mimeType.startsWith("audio/")) return "audio" as const;
  if (mimeType === "application/pdf" || mimeType.includes("msword"))
    return "document" as const;
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel"))
    return "spreadsheet" as const;
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint"))
    return "presentation" as const;
  if (
    mimeType === "application/zip" ||
    mimeType.includes("tar") ||
    mimeType.includes("gzip")
  )
    return "archive" as const;
  return "other" as const;
};

interface TrashProps {
  viewMode: "grid" | "list";
}

const Trash: React.FC<TrashProps> = ({ viewMode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ New states for Empty Trash action
  const [emptying, setEmptying] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchTrashed = async () => {
      try {
        const data = await getTrashedItems();
        setItems(data);
      } catch (err: any) {
        setError(err.message || "Failed to load trash");
      } finally {
        setLoading(false);
      }
    };
    fetchTrashed();
  }, []);

  const handleRestore = async (id: string) => {
    try {
      await restoreItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err: any) {
      alert(err.message || "Restore failed");
    }
  };

  const handleDeleteForever = async (id: string) => {
    try {
      await deleteForever(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  };

  const handleEmptyTrash = async () => {
    setEmptying(true);
    try {
      await emptyTrash();
      setItems([]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err: any) {
      alert(err.message || "Failed to empty trash");
    } finally {
      setEmptying(false);
    }
  };

  const TrashActions: React.FC<{ id: string; type: "file" | "folder" }> = ({
    id,
    type,
  }) => (
    <div className="flex space-x-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRestore(id);
        }}
        className="flex items-center px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors mt-2 mr-12"
      >
        <RotateCcw className="w-3 h-3 mr-1" />
        Restore
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteForever(id);
        }}
        className="flex items-center px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors mt-2 "
      >
        <Trash2 className="w-3 h-3 mr-1" />
        Delete
      </button>
    </div>
  );

  if (loading)
    return (
      <div className="p-6 text-gray-500 dark:text-gray-400 text-center">
        Loading trash...
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-red-500 dark:text-red-400 text-center">
        {error}
      </div>
    );
  if (emptying) {
    return (
      <div className="p-6 text-center">
        <div className="p-6 text-gray-500 dark:text-gray-400 text-center">
          Emptying trash...
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">
            Please wait while we permanently delete your trashed items.
          </p>
        </div>
      </div>
    );
  }
  if (success) {
    return (
      <div className="p-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-black dark:text-white mx-auto mb-3" />
        <h1 className="text-2xl font-semibold text-black dark:text-white mb-2">
          Trash Emptied!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          All trashed items were deleted successfully.
        </p>
      </div>
    );
  }

  const folders = items.filter((i) => i.type === "folder");
  const files = items.filter((i) => i.type === "file");
  const totalItems = items.length;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-normal text-black dark:text-white">
            Trash
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {totalItems} items
          </p>
        </div>
        <button
          onClick={handleEmptyTrash}
          className="px-4 py-2 text-sm text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
        >
          Empty Trash
        </button>
      </div>

      {viewMode === "list" ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
          <div className="flex items-center px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300">
            <div className="flex-1">Name</div>
            <div className="w-28">Items</div>
            <div className="w-32">Deleted</div>
            <div className="w-24">Size</div>
            <div className="w-40 text-center">Actions</div>
          </div>

          {folders.map((folder) => (
            <div
              key={folder.id}
              className="flex items-center px-4 py-2 text-sm border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex-1">
                <FolderCard name={folder.name} viewMode="list" />
              </div>
              <div className="w-28 text-gray-500 dark:text-gray-400">0 Items</div>
              <div className="w-32 text-gray-500 dark:text-gray-400">
                {formatRelativeDate(folder.createdAt)}
              </div>
              <div className="w-24 text-gray-500 dark:text-gray-400">—</div>
              <div className="w-40 flex justify-end">
                <TrashActions id={folder.id} type="folder" />
              </div>
            </div>
          ))}

          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center px-4 py-2 text-sm border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex-1">
                <FileCard
                  id={file.id}
                  name={file.name}
                  type={mapMimeToType(file.mimeType)}
                  size={
                    file.size
                      ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                      : "—"
                  }
                  modifiedDate={formatRelativeDate(file.createdAt)}
                  viewMode="list"
                />
              </div>
              <div className="w-28 text-gray-500 dark:text-gray-400">—</div>
              <div className="w-32 text-gray-500 dark:text-gray-400">
                {formatRelativeDate(file.createdAt)}
              </div>
              <div className="w-24 text-gray-500 dark:text-gray-400">
                {file.size
                  ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                  : "—"}
              </div>
              <div className="w-40 flex justify-end">
                <TrashActions id={file.id} type="file" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {folders.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                Deleted Folders
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-sm transition-shadow"
                  >
                    <FolderCard
                      name={folder.name}
                      itemCount={0}
                      modifiedDate={formatRelativeDate(folder.createdAt)}
                      viewMode="grid"
                    />
                    <TrashActions id={folder.id} type="folder" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {files.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                Deleted Files
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-sm transition-shadow"
                  >
                    <FileCard
                      id={file.id}
                      name={file.name}
                      type={mapMimeToType(file.mimeType)}
                      size={
                        file.size
                          ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                          : "—"
                      }
                      modifiedDate={formatRelativeDate(file.createdAt)}
                      viewMode="grid"
                    />
                    <TrashActions id={file.id} type="file" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {totalItems === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Trash is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Trash;
