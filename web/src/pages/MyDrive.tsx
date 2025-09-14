// "use client";

// import React, { useEffect, useState } from "react";
// import FileCard from "../components/FileCard";
// import FolderCard from "../components/FolderCard";
// import { getItems, Item } from "../lib/item.service";
// import { formatRelativeDate } from "../utils/formatDate";


// interface MyDriveProps {
//   viewMode: "grid" | "list";
// }

// const MyDrive: React.FC<MyDriveProps> = ({ viewMode }) => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);


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

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const data = await getItems("root"); // fetch root items
//         setItems(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load items");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   const folders = items.filter((i) => i.type === "folder");
//   const files = items.filter((i) => i.type === "file");

//   if (loading) {
//     return <div className="p-6 text-gray-500 text-center">Loading your drive...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500 text-center">{error}</div>;
//   }

//   return (
//     <div className="p-6 bg-white min-h-screen w-full">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-normal text-black">My Drive</h1>
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
//             {folders.map((folder) => (
//               <FolderCard
//                 key={folder.id}
//                 id={folder.id}
//                 name={folder.name}
//                 itemCount={0} 
//                 modifiedDate={formatRelativeDate(folder.createdAt)}
//                 viewMode="list"
//                 onTrashed={() => setItems((prev) => prev.filter((i) => i.id !== folder.id))}
//                 onClick={() => console.log(`Open folder: ${folder.name}`)}
//               />
//             ))}
//             {files.map((file) => (
//               <FileCard
//                 key={file.id}
//                 name={file.name}
//                 id={file.id}
//                 type={mapMimeToType(file.mimeType)}
//                 size={file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"}
//                 fileUrl={file.url}
//                 onTrashed={() => setItems((prev) => prev.filter((i) => i.id !== file.id))}
//                 modifiedDate={formatRelativeDate(file.createdAt)}
//                 viewMode="list"
//                 onClick={() => console.log(`Open file: ${file.name}`)}
//                 isStarred={file.isStarred} 
                
//               />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {folders.map((folder) => (
//             <FolderCard
//               key={folder.id}
//               id={folder.id}
//               name={folder.name}
//               itemCount={0}
//               modifiedDate={formatRelativeDate(folder.createdAt)}
//               viewMode="grid"
//               onTrashed={() => setItems((prev) => prev.filter((i) => i.id !== folder.id))}
//               onClick={() => console.log(`Open folder: ${folder.name}`)}
//             />
//           ))}
//           {files.map((file) => (
//             <FileCard
//               key={file.id}
//               id={file.id}
//               name={file.name}
//               type={mapMimeToType(file.mimeType)}
//               size={file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"}
//               fileUrl={file.url}
//               modifiedDate={formatRelativeDate(file.createdAt)}
//               viewMode="grid"
//               onClick={() => console.log(`Open file: ${file.name}`)}
//               onTrashed={() => setItems((prev) => prev.filter((i) => i.id !== file.id))}
//               isStarred={file.isStarred} 
//             />
//           ))}
//         </div>
//       )}

//       {items.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">Your drive is empty. Upload some files to get started!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyDrive;


"use client";

import React, { useEffect, useState } from "react";
import FileCard from "../components/FileCard";
import FolderCard from "../components/FolderCard";
import { getItems, Item } from "../lib/item.service";
import { formatRelativeDate } from "../utils/formatDate";

interface MyDriveProps {
  viewMode: "grid" | "list";
}

const MyDrive: React.FC<MyDriveProps> = ({ viewMode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems("root"); // fetch root items
        setItems(data);
      } catch (err: any) {
        setError(err.message || "Failed to load items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const folders = items.filter((i) => i.type === "folder");
  const files = items.filter((i) => i.type === "file");

  if (loading) {
    return (
      <div className="p-6 text-gray-500 dark:text-gray-400 text-center">
        Loading your drive...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 dark:text-red-400 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-normal text-black dark:text-white">
            My Drive
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {items.length} items
          </p>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg">
          <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300">
            <div className="flex-1">Name</div>
            <div className="w-32 text-left">Modified</div>
            <div className="w-20 text-left">Size</div>
            <div className="w-8"></div>
          </div>
          <div>
            {folders.map((folder) => (
              <FolderCard
                key={folder.id}
                id={folder.id}
                name={folder.name}
                itemCount={0}
                modifiedDate={formatRelativeDate(folder.createdAt)}
                viewMode="list"
                onTrashed={() =>
                  setItems((prev) => prev.filter((i) => i.id !== folder.id))
                }
                onClick={() => console.log(`Open folder: ${folder.name}`)}
              />
            ))}
            {files.map((file) => (
              <FileCard
                key={file.id}
                name={file.name}
                id={file.id}
                type={mapMimeToType(file.mimeType)}
                size={
                  file.size
                    ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                    : "—"
                }
                fileUrl={file.url}
                onTrashed={() =>
                  setItems((prev) => prev.filter((i) => i.id !== file.id))
                }
                modifiedDate={formatRelativeDate(file.createdAt)}
                viewMode="list"
                onClick={() => console.log(`Open file: ${file.name}`)}
                isStarred={file.isStarred}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {folders.map((folder) => (
            <FolderCard
              key={folder.id}
              id={folder.id}
              name={folder.name}
              itemCount={0}
              modifiedDate={formatRelativeDate(folder.createdAt)}
              viewMode="grid"
              onTrashed={() =>
                setItems((prev) => prev.filter((i) => i.id !== folder.id))
              }
              onClick={() => console.log(`Open folder: ${folder.name}`)}
            />
          ))}
          {files.map((file) => (
            <FileCard
              key={file.id}
              id={file.id}
              name={file.name}
              type={mapMimeToType(file.mimeType)}
              size={
                file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "—"
              }
              fileUrl={file.url}
              modifiedDate={formatRelativeDate(file.createdAt)}
              viewMode="grid"
              onClick={() => console.log(`Open file: ${file.name}`)}
              onTrashed={() =>
                setItems((prev) => prev.filter((i) => i.id !== file.id))
              }
              isStarred={file.isStarred}
            />
          ))}
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Your drive is empty. Upload some files to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default MyDrive;
