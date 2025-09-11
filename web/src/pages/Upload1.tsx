// "use client"

// import type React from "react"
// import { useState, useRef } from "react"
// import { UploadIcon, File, X } from "lucide-react"
// import { uploadFile } from "../lib/item.service";
// // import { useRouter } from "next/navigation";   // ✅ import router
// import { useNavigate } from "react-router-dom";



// const Upload: React.FC = () => {
//   const [dragActive, setDragActive] = useState(false)
//   const [files, setFiles] = useState<File[]>([])
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   //  const router = useRouter(); // ✅ initialize router
//   const navigate = useNavigate();

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true)
//     } else if (e.type === "dragleave") {
//       setDragActive(false)
//     }
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setDragActive(false)

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const newFiles = Array.from(e.dataTransfer.files)
//       setFiles((prev) => [...prev, ...newFiles])
//     }
//   }

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const newFiles = Array.from(e.target.files)
//       setFiles((prev) => [...prev, ...newFiles])
//     }
//   }

//   const removeFile = (index: number) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index))
//   }

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes"
//     const k = 1024
//     const sizes = ["Bytes", "KB", "MB", "GB"]
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
//   }

//   // const handleUpload = () => {
//   //   console.log("Uploading files:", files)
//   //   // Implement upload logic here
//   //   setFiles([])
//   // }

// //   const handleUpload = async () => {
// //   if (files.length === 0) return;

// //   try {
// //     for (const file of files) {
// //       // Call your service
// //       const uploaded = await uploadFile(file);

// //       console.log("Uploaded:", uploaded);
// //       // TODO: Optionally notify parent to refresh items in MyDrive
// //     }

// //     setFiles([]); // Clear selected files
// //     alert("Files uploaded successfully!");
// //   } catch (err: any) {
// //     console.error("Error uploading:", err);
// //     alert(err.message || "Upload failed");
// //   }
// // };

//   const handleUpload = async () => {
//     if (files.length === 0) return;

//     try {
//       for (const file of files) {
//         await uploadFile(file); // ✅ call service for each file
//       }

//       setFiles([]); 
//       alert("Files uploaded successfully!");

//       navigate("/dashboard") // ✅ redirect to MyDrive
//     } catch (error: any) {
//       console.error("Error uploading:", error);
//       alert(error.message || "Upload failed");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-6">Upload Files</h1>

//       <div className="max-w-2xl mx-auto">
//         <div
//           className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//             dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
//           }`}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here to upload</h3>
//           <p className="text-gray-500 mb-4">or click to select files from your computer</p>
//           <button
//             onClick={() => fileInputRef.current?.click()}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Select Files
//           </button>
//           <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />
//         </div>

//         {files.length > 0 && (
//           <div className="mt-6">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Files ({files.length})</h3>
//             <div className="space-y-2">
//               {files.map((file, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center">
//                     <File className="w-5 h-5 text-gray-500 mr-3" />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{file.name}</p>
//                       <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => removeFile(index)}
//                     className="p-1 text-gray-400 hover:text-red-500 transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-end space-x-3">
//               <button
//                 onClick={() => setFiles([])}
//                 className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Clear All
//               </button>
//               <button
//                 onClick={handleUpload}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Upload Files
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Upload

// "use client";

// import type React from "react";
// import { useState, useRef } from "react";
// import { UploadIcon, File, X } from "lucide-react";
// import { uploadFile } from "../lib/item.service";
// import { useNavigate } from "react-router-dom"; // ✅ Vite uses react-router

// const Upload: React.FC = () => {
//   const [dragActive, setDragActive] = useState(false);
//   const [files, setFiles] = useState<File[]>([]);
//   const [uploading, setUploading] = useState(false); // ✅ new state
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const newFiles = Array.from(e.dataTransfer.files);
//       setFiles((prev) => [...prev, ...newFiles]);
//     }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const newFiles = Array.from(e.target.files);
//       setFiles((prev) => [...prev, ...newFiles]);
//     }
//   };

//   const removeFile = (index: number) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   const handleUpload = async () => {
//     if (files.length === 0) return;

//     try {
//       setUploading(true); // ✅ show uploading UI

//       for (const file of files) {
//         await uploadFile(file);
//       }

//       setFiles([]);
//       // Instead of alert, use smooth transition
//       setTimeout(() => {
//         navigate("/dashboard"); // ✅ redirect to MyDrive
//       }, 1000); // short delay for smooth UX
//     } catch (error: any) {
//       console.error("Error uploading:", error);
//       alert(error.message || "Upload failed");
//       setUploading(false);
//     }
//   };

//   // ✅ Show uploading screen if in progress
//   if (uploading) {
//     return (
//       <div className="p-6 text-gray-500 text-center">
//         <h1 className="text-xl font-semibold">Uploading...</h1>
//         <p className="mt-2 text-sm">Please wait while we upload your files.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-6">Upload Files</h1>

//       <div className="max-w-2xl mx-auto">
//         <div
//           className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//             dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
//           }`}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here to upload</h3>
//           <p className="text-gray-500 mb-4">or click to select files from your computer</p>
//           <button
//             onClick={() => fileInputRef.current?.click()}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Select Files
//           </button>
//           <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />
//         </div>

//         {files.length > 0 && (
//           <div className="mt-6">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Files ({files.length})</h3>
//             <div className="space-y-2">
//               {files.map((file, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center">
//                     <File className="w-5 h-5 text-gray-500 mr-3" />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{file.name}</p>
//                       <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => removeFile(index)}
//                     className="p-1 text-gray-400 hover:text-red-500 transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-end space-x-3">
//               <button
//                 onClick={() => setFiles([])}
//                 className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Clear All
//               </button>
//               <button
//                 onClick={handleUpload}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Upload Files
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Upload;

// "use client";

// import type React from "react";
// import { useState, useRef } from "react";
// import { UploadIcon, File, X, CheckCircle2 } from "lucide-react";
// import { uploadFile } from "../lib/item.service";

// const Upload: React.FC = () => {
//   const [dragActive, setDragActive] = useState(false);
//   const [files, setFiles] = useState<File[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [success, setSuccess] = useState(false); // ✅ new success state
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const newFiles = Array.from(e.dataTransfer.files);
//       setFiles((prev) => [...prev, ...newFiles]);
//     }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const newFiles = Array.from(e.target.files);
//       setFiles((prev) => [...prev, ...newFiles]);
//     }
//   };

//   const removeFile = (index: number) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   const handleUpload = async () => {
//     if (files.length === 0) return;

//     try {
//       setUploading(true);

//       for (const file of files) {
//         await uploadFile(file);
//       }

//       setFiles([]);
//       setUploading(false);
//       setSuccess(true); // ✅ show success message

//       // Hide success after 2s and reset to default form
//       setTimeout(() => {
//         setSuccess(false);
//       }, 2000);
//     } catch (error: any) {
//       console.error("Error uploading:", error);
//       alert(error.message || "Upload failed");
//       setUploading(false);
//     }
//   };

//   // ✅ Uploading state
//   if (uploading) {
//     return (
//       <div className="p-6 text-center">
//         <div className="p-6 text-gray-500 text-center">Uploading...</div>
//         <div><p className="text-gray-500">Please wait while we upload your files.</p></div>
//       </div>
//     );
//   }

//   // ✅ Success state
//   if (success) {
//     return (
//       <div className="p-6 text-center">
//         <CheckCircle2 className="w-12 h-12 text-black mx-auto mb-3" />
//         <h1 className="text-2xl font-semibold text-black mb-2">Upload Complete!</h1>
//         <p className="text-gray-500">Your files were uploaded successfully.</p>
//       </div>
//     );
//   }

//   // ✅ Default upload UI
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-6">Upload Files</h1>

//       <div className="max-w-2xl mx-auto">
//         <div
//           className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//             dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
//           }`}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here to upload</h3>
//           <p className="text-gray-500 mb-4">or click to select files from your computer</p>
//           <button
//             onClick={() => fileInputRef.current?.click()}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Select Files
//           </button>
//           <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />
//         </div>

//         {files.length > 0 && (
//           <div className="mt-6">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Files ({files.length})</h3>
//             <div className="space-y-2">
//               {files.map((file, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center">
//                     <File className="w-5 h-5 text-gray-500 mr-3" />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{file.name}</p>
//                       <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => removeFile(index)}
//                     className="p-1 text-gray-400 hover:text-red-500 transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-end space-x-3">
//               <button
//                 onClick={() => setFiles([])}
//                 className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Clear All
//               </button>
//               <button
//                 onClick={handleUpload}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Upload Files
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Upload;


// "use client";

// import type React from "react";
// import { useState, useRef } from "react";
// import { UploadIcon, File, X, CheckCircle2, Folder } from "lucide-react";
// import { uploadFile,uploadFolder } from "../lib/item.service";

// interface UploadFile {
//   file: File;
//   relativePath: string;
// }

// const Upload: React.FC = () => {
//   const [dragActive, setDragActive] = useState(false);
//   const [files, setFiles] = useState<UploadFile[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       const newFiles = Array.from(e.dataTransfer.files).map((f) => ({
//         file: f,
//         relativePath: (f as any).webkitRelativePath || f.name,
//       }));
//       setFiles((prev) => [...prev, ...newFiles]);
//     }
//   };

//   // const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files && e.target.files.length > 0) {
//   //     const newFiles = Array.from(e.target.files).map((f) => ({
//   //       file: f,
//   //       relativePath: (f as any).webkitRelativePath || f.name,
//   //     }));
//   //     setFiles((prev) => [...prev, ...newFiles]);
//   //   }
//   // };

// const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (e.target.files && e.target.files.length > 0) {
//     const firstFile = e.target.files[0] as any;

//     // ✅ If user selected a folder, `webkitRelativePath` will be non-empty
//     if (firstFile.webkitRelativePath) {
//       try {
//         await uploadFolder(e.target.files, null); // pass parentId if needed
//         alert("Folder uploaded successfully");
//       } catch (err: any) {
//         alert(err.message || "Folder upload failed");
//       }
//     } else {
//       // Normal file upload
//       const newFiles = Array.from(e.target.files);
//       setFiles((prev) => [...prev, ...newFiles]);
//     }
//   }
// };

//   const removeFile = (index: number) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   const handleUpload = async () => {
//     if (files.length === 0) return;

//     try {
//       setUploading(true);

//       for (const { file, relativePath } of files) {
//         await uploadFile(file, relativePath); // ✅ send relativePath too
//       }

//       setFiles([]);
//       setUploading(false);
//       setSuccess(true);

//       setTimeout(() => setSuccess(false), 2000);
//     } catch (error: any) {
//       console.error("Error uploading:", error);
//       alert(error.message || "Upload failed");
//       setUploading(false);
//     }
//   };

//   // ✅ Uploading state
//   if (uploading) {
//     return (
//       <div className="p-6 text-center">
//         <div className="p-6 text-gray-500 text-center">Uploading...</div>
//         <div><p className="text-gray-500">Please wait while we upload your files.</p></div>
//       </div>
//     );
//   }

//   // ✅ Success state
//   if (success) {
//     return (
//       <div className="p-6 text-center">
//         <CheckCircle2 className="w-12 h-12 text-black mx-auto mb-3" />
//         <h1 className="text-2xl font-semibold text-black mb-2">Upload Complete!</h1>
//         <p className="text-gray-500">Your files were uploaded successfully.</p>
//       </div>
//     );
//   }

//   // ✅ Default upload UI
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-6">Upload Files or Folders</h1>

//       <div className="max-w-2xl mx-auto">
//         <div
//           className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//             dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
//           }`}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files or folders here</h3>
//           <p className="text-gray-500 mb-4">or click to select from your computer</p>
//           <button
//             onClick={() => fileInputRef.current?.click()}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Select Files/Folders
//           </button>
//           {/* ✅ allow folders */}
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             webkitdirectory=""
//             directory=""
//             onChange={handleFileSelect}
//             className="hidden"
//           />
//           {/* <input
//             type="file"
//              webkitdirectory="true"   // ✅ allows selecting folders
//               directory=""             // ✅ needed for Firefox
//               multiple
//               onChange={(e) => {
//                 if (e.target.files) {
//                  uploadFolder(e.target.files, currentParentId || null)
//                 .then(() => alert("Folder uploaded successfully"))
//                 .catch((err) => alert(err.message));
//                 }
//               }}
//           /> */}

//         </div>

//         {files.length > 0 && (
//           <div className="mt-6">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Items ({files.length})</h3>
//             <div className="space-y-2">
//               {files.map(({ file, relativePath }, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center">
//                     {relativePath.includes("/") ? (
//                       <Folder className="w-5 h-5 text-yellow-600 mr-3" />
//                     ) : (
//                       <File className="w-5 h-5 text-gray-500 mr-3" />
//                     )}
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{relativePath}</p>
//                       <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => removeFile(index)}
//                     className="p-1 text-gray-400 hover:text-red-500 transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-end space-x-3">
//               <button
//                 onClick={() => setFiles([])}
//                 className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Clear All
//               </button>
//               <button
//                 onClick={handleUpload}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Upload
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Upload;



"use client";

import type React from "react";
import { useState, useRef } from "react";
import { UploadIcon, File, X, CheckCircle2, Folder } from "lucide-react";
import { uploadFile,uploadFolder } from "../lib/item.service";

interface UploadFile {
  file: File;
  relativePath: string;
}

const Upload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  // Drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((f) => ({
        file: f,
        relativePath: (f as any).webkitRelativePath || f.name,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // File/folder select
  // const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const newFiles = Array.from(e.target.files).map((f) => ({
  //       file: f,
  //       relativePath: (f as any).webkitRelativePath || f.name,
  //     }));
  //     setFiles((prev) => [...prev, ...newFiles]);
  //   }
  // };

const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    const newFiles = Array.from(e.target.files).map((f) => ({
      file: f,
      relativePath: (f as any).webkitRelativePath || f.name, // preserve folder path
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }
};


  // Remove from preview
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Size formatter
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Upload handler
  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      setUploading(true);

      for (const { file, relativePath } of files) {
        await uploadFile(file, relativePath); // ✅ send file + relativePath
      }

      setFiles([]);
      setUploading(false);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 2000);
    } catch (error: any) {
      console.error("Error uploading:", error);
      alert(error.message || "Upload failed");
      setUploading(false);
    }
  };

  // States
  if (uploading) {
    return (
      <div className="p-6 text-center">
        <div className="p-6 text-gray-500 text-center">Uploading...</div>
        <div>
          <p className="text-gray-500">Please wait while we upload your files.</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="p-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-black mx-auto mb-3" />
        <h1 className="text-2xl font-semibold text-black mb-2">Upload Complete!</h1>
        <p className="text-gray-500">Your files were uploaded successfully.</p>
      </div>
    );
  }

  // Default UI
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Upload Files or Folders</h1>

      <div className="max-w-2xl mx-auto">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files or folders here</h3>
          <p className="text-gray-500 mb-4">or select from your computer</p>

          {/* ✅ Two buttons */}
          <div className="flex gap-3 justify-center">
            {/* File button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Select Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Folder button */}
            <label className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              Select Folder
              <input
                ref={folderInputRef}
                type="file"
                multiple
                // @ts-ignore ✅ TS doesn’t know about webkitdirectory
                webkitdirectory=""
                directory=""
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* ✅ Preview list */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Selected Items ({files.length})
            </h3>
            <div className="space-y-2">
              {files.map(({ file, relativePath }, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    {relativePath.includes("/") ? (
                      <Folder className="w-5 h-5 text-yellow-600 mr-3" />
                    ) : (
                      <File className="w-5 h-5 text-gray-500 mr-3" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{relativePath}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setFiles([])}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleUpload}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
