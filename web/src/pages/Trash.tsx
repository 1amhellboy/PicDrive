
// "use client"

// import type React from "react"
// import FileCard from "../components/FileCard"
// import FolderCard from "../components/FolderCard"
// import { RotateCcw, Trash2 } from "lucide-react"

// interface TrashProps {
//   viewMode: "grid" | "list"
// }

// const Trash: React.FC<TrashProps> = ({ viewMode }) => {
//   const deletedFolders = [
//     { name: "Old Project", itemCount: 8, deletedDate: "2 days ago" },
//     { name: "Temp Files", itemCount: 15, deletedDate: "1 week ago" },
//   ]

//   const deletedFiles = [
//     { name: "old-document.docx", type: "document" as const, size: "1.2 MB", deletedDate: "1 day ago" },
//     { name: "blurry-photo.jpg", type: "image" as const, size: "3.1 MB", deletedDate: "3 days ago" },
//     { name: "draft-video.mp4", type: "video" as const, size: "22.5 MB", deletedDate: "5 days ago" },
//     { name: "unused-file.txt", type: "other" as const, size: "45 KB", deletedDate: "1 week ago" },
//   ]

//   const allItems = [...deletedFolders, ...deletedFiles]
//   const totalItems = allItems.length

//   const handleRestore = (itemName: string, itemType: "file" | "folder") => {
//     console.log(`Restore ${itemType}: ${itemName}`)
//   }

//   const handleDeleteForever = (itemName: string, itemType: "file" | "folder") => {
//     console.log(`Delete forever ${itemType}: ${itemName}`)
//   }

//   const TrashActions: React.FC<{ itemName: string; itemType: "file" | "folder" }> = ({ itemName, itemType }) => (
//     <div className="flex space-x-1">
//       <button
//         onClick={(e) => {
//           e.stopPropagation()
//           handleRestore(itemName, itemType)
//         }}
//         className="flex items-center px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors mt-2 mr-6"
//       >
//         <RotateCcw className="w-3 h-3 mr-1" />
//         Restore
//       </button>
//       <button
//         onClick={(e) => {
//           e.stopPropagation()
//           handleDeleteForever(itemName, itemType)
//         }}
//         className="flex items-center px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors mt-2"
//       >
//         <Trash2 className="w-3 h-3 mr-1" />
//         Delete
//       </button>
//     </div>
//   )

//   return (
//     <div className="p-6 bg-white min-h-screen w-full">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-normal text-black">Trash</h1>
//           <p className="text-sm text-gray-500 mt-1">{totalItems} items</p>
//         </div>
//         <button className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
//           Empty Trash
//         </button>
//       </div>

//       {viewMode === "list" ? (
//         <div className="bg-white border border-gray-200 rounded-md">
//           {/* Header Row */}
//           <div className="flex items-center px-4 py-2 border-b border-gray-100 text-sm font-medium text-gray-600">
//             <div className="flex-1">Name</div>
//             <div className="w-28">Items</div>
//             <div className="w-32">Deleted</div>
//             <div className="w-24">Size</div>
//             <div className="w-40 text-center">Actions</div>
//           </div>

//           {/* Folders */}
//           {deletedFolders.map((folder, index) => (
//             <div
//               key={`folder-${index}`}
//               className="flex items-center px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50"
//             >
//               <div className="flex-1">
//                 <FolderCard name={folder.name} viewMode="list" />
//               </div>
//               <div className="w-28 text-gray-500">{folder.itemCount} Items</div>
//               <div className="w-32 text-gray-500">{folder.deletedDate}</div>
//               <div className="w-24 text-gray-500">—</div>
//               <div className="w-40 flex justify-end">
//                 <TrashActions itemName={folder.name} itemType="folder" />
//               </div>
//             </div>
//           ))}

//           {/* Files */}
//           {deletedFiles.map((file, index) => (
//             <div
//               key={`file-${index}`}
//               className="flex items-center px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50"
//             >
//               <div className="flex-1">
//                 <FileCard name={file.name} type={file.type} viewMode="list" />
//               </div>
//               <div className="w-28 text-gray-500">—</div>
//               <div className="w-32 text-gray-500">{file.deletedDate}</div>
//               <div className="w-24 text-gray-500">{file.size}</div>
//               <div className="w-40 flex justify-end">
//                 <TrashActions itemName={file.name} itemType="file" />
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>
//           {/* Grid View */}
//           {deletedFolders.length > 0 && (
//             <div className="mb-8">
//               <h2 className="text-lg font-medium text-gray-700 mb-4">Deleted Folders</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                 {deletedFolders.map((folder, index) => (
//                   <div
//                     key={`folder-${index}`}
//                     className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
//                   >
//                     <FolderCard 
//                       name={folder.name} 
//                       itemCount={folder.itemCount} 
//                       modifiedDate={folder.deletedDate}
//                       viewMode="grid"
//                     />
//                     <TrashActions itemName={folder.name} itemType="folder" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {deletedFiles.length > 0 && (
//             <div>
//               <h2 className="text-lg font-medium text-gray-700 mb-4">Deleted Files</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                 {deletedFiles.map((file, index) => (
//                   <div
//                     key={`file-${index}`}
//                     className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
//                   >
//                     <FileCard 
//                       name={file.name} 
//                       type={file.type} 
//                       size={file.size} 
//                       modifiedDate={file.deletedDate}
//                       viewMode="grid"
//                     />
//                     <TrashActions itemName={file.name} itemType="file" />
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
//   )
// }

// export default Trash

// "use client";

// import React, { useEffect, useState } from "react";
// import FileCard from "../components/FileCard";
// import FolderCard from "../components/FolderCard";
// import { RotateCcw, Trash2 } from "lucide-react";
// import { getTrashedItems, restoreItem, deleteForever, Item } from "../lib/item.service";
// import { formatRelativeDate } from "../utils/formatDate";

// interface TrashProps {
//   viewMode: "grid" | "list";
// }

// const Trash: React.FC<TrashProps> = ({ viewMode }) => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

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

//   if (loading) return <div className="p-6 text-gray-500 text-center">Loading trash...</div>;
//   if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

//   const folders = items.filter((i) => i.type === "folder");
//   const files = items.filter((i) => i.type === "file");

//   return (
//     <div className="p-6 bg-white min-h-screen w-full">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-normal text-black">Trash</h1>
//           <p className="text-sm text-gray-500 mt-1">{items.length} items</p>
//         </div>
//         <button
//           onClick={async () => {
//             for (const i of items) await deleteForever(i.id);
//             setItems([]);
//           }}
//           className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
//         >
//           Empty Trash
//         </button>
//       </div>

//       {viewMode === "list" ? (
//         <div className="bg-white border border-gray-200 rounded-md">
//           <div className="flex items-center px-4 py-2 border-b border-gray-100 text-sm font-medium text-gray-600">
//             <div className="flex-1">Name</div>
//             <div className="w-32">Deleted</div>
//             <div className="w-24">Size</div>
//             <div className="w-40 text-center">Actions</div>
//           </div>

//           {folders.map((folder) => (
//             <div key={folder.id} className="flex items-center px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50">
//               <div className="flex-1">
//                 <FolderCard id={folder.id} name={folder.name} itemCount={0} modifiedDate={formatRelativeDate(folder.createdAt)} viewMode="list" />
//               </div>
//               <div className="w-32 text-gray-500">{formatRelativeDate(folder.createdAt)}</div>
//               <div className="w-24 text-gray-500">—</div>
//               <div className="w-40 flex justify-end space-x-2">
//                 <button onClick={() => handleRestore(folder.id)} className="text-blue-600 hover:underline">Restore</button>
//                 <button onClick={() => handleDeleteForever(folder.id)} className="text-red-600 hover:underline">Delete</button>
//               </div>
//             </div>
//           ))}

//           {files.map((file) => (
//             <div key={file.id} className="flex items-center px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50">
//               <div className="flex-1">
//                 <FileCard id={file.id} name={file.name} type="file" size={file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"} modifiedDate={formatRelativeDate(file.createdAt)} viewMode="list" />
//               </div>
//               <div className="w-32 text-gray-500">{formatRelativeDate(file.createdAt)}</div>
//               <div className="w-24 text-gray-500">{file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"}</div>
//               <div className="w-40 flex justify-end space-x-2">
//                 <button onClick={() => handleRestore(file.id)} className="text-blue-600 hover:underline">Restore</button>
//                 <button onClick={() => handleDeleteForever(file.id)} className="text-red-600 hover:underline">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {folders.map((folder) => (
//             <div key={folder.id} className="bg-white border rounded-lg p-3">
//               <FolderCard id={folder.id} name={folder.name} itemCount={0} modifiedDate={formatRelativeDate(folder.createdAt)} viewMode="grid" />
//               <div className="flex justify-between mt-2">
//                 <button onClick={() => handleRestore(folder.id)} className="text-xs text-blue-600 hover:underline">Restore</button>
//                 <button onClick={() => handleDeleteForever(folder.id)} className="text-xs text-red-600 hover:underline">Delete</button>
//               </div>
//             </div>
//           ))}
//           {files.map((file) => (
//             <div key={file.id} className="bg-white border rounded-lg p-3">
//               <FileCard id={file.id} name={file.name} type="file" size={file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"} modifiedDate={formatRelativeDate(file.createdAt)} viewMode="grid" />
//               <div className="flex justify-between mt-2">
//                 <button onClick={() => handleRestore(file.id)} className="text-xs text-blue-600 hover:underline">Restore</button>
//                 <button onClick={() => handleDeleteForever(file.id)} className="text-xs text-red-600 hover:underline">Delete</button>
//               </div>
//             </div>
//           ))}
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
import { RotateCcw, Trash2 } from "lucide-react";
import { getTrashedItems, restoreItem, deleteForever, Item } from "../lib/item.service";
import { formatRelativeDate } from "../utils/formatDate";

interface TrashProps {
  viewMode: "grid" | "list";
}

const Trash: React.FC<TrashProps> = ({ viewMode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const TrashActions: React.FC<{ id: string; type: "file" | "folder" }> = ({ id, type }) => (
    <div className="flex space-x-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRestore(id);
        }}
        className="flex items-center px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors mt-2 mr-6"
      >
        <RotateCcw className="w-3 h-3 mr-1" />
        Restore
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteForever(id);
        }}
        className="flex items-center px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors mt-2"
      >
        <Trash2 className="w-3 h-3 mr-1" />
        Delete
      </button>
    </div>
  );

  if (loading) return <div className="p-6 text-gray-500 text-center">Loading trash...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  const folders = items.filter((i) => i.type === "folder");
  const files = items.filter((i) => i.type === "file");
  const totalItems = items.length;

  return (
    <div className="p-6 bg-white min-h-screen w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-normal text-black">Trash</h1>
          <p className="text-sm text-gray-500 mt-1">{totalItems} items</p>
        </div>
        <button
          onClick={async () => {
            for (const i of items) await deleteForever(i.id);
            setItems([]);
          }}
          className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
        >
          Empty Trash
        </button>
      </div>

      {viewMode === "list" ? (
        <div className="bg-white border border-gray-200 rounded-md">
          {/* Header Row */}
          <div className="flex items-center px-4 py-2 border-b border-gray-100 text-sm font-medium text-gray-600">
            <div className="flex-1">Name</div>
            <div className="w-28">Items</div>
            <div className="w-32">Deleted</div>
            <div className="w-24">Size</div>
            <div className="w-40 text-center">Actions</div>
          </div>

          {/* Folders */}
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="flex items-center px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="flex-1">
                <FolderCard name={folder.name} viewMode="list" />
              </div>
              <div className="w-28 text-gray-500">0 Items</div>
              <div className="w-32 text-gray-500">{formatRelativeDate(folder.createdAt)}</div>
              <div className="w-24 text-gray-500">—</div>
              <div className="w-40 flex justify-end">
                <TrashActions id={folder.id} type="folder" />
              </div>
            </div>
          ))}

          {/* Files */}
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="flex-1">
                <FileCard name={file.name} type="file" viewMode="list" />
              </div>
              <div className="w-28 text-gray-500">—</div>
              <div className="w-32 text-gray-500">{formatRelativeDate(file.createdAt)}</div>
              <div className="w-24 text-gray-500">
                {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"}
              </div>
              <div className="w-40 flex justify-end">
                <TrashActions id={file.id} type="file" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Grid View */}
          {folders.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Deleted Folders</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
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
              <h2 className="text-lg font-medium text-gray-700 mb-4">Deleted Files</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
                  >
                    <FileCard
                      name={file.name}
                      type="file"
                      size={file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"}
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
          <p className="text-gray-500">Trash is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Trash;
