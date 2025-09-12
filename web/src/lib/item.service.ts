// src/services/item.service.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export type Item = {
  id: string;
  name: string;
  type: "folder" | "file";
  size?: number;
  mimeType?: string;
  url?: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
};

// Helper to get token
const getToken = () => localStorage.getItem("accessToken");

// ----------------- CRUD -----------------

// Get items by parent
// export const getItems = async (
//   parentId: string | "root" = "root"
// ): Promise<Item[]> => {
//   const token = getToken();
//   const res = await fetch(`${API_BASE}/items/${parentId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || data.message || "Failed to fetch items");

//   return data;
// };
// Get items by parent
export const getItems = async (parentId: string | "root" = "root"): Promise<Item[]> => {
  const token = localStorage.getItem("accessToken");

  const url = parentId === "root"
    ? `${API_BASE}/items/null`   // null = root
    : `${API_BASE}/items/${parentId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to fetch items");

  return data;
};



// Create item (folder or file metadata)
export const createItem = async (item: {
  name: string;
  type: "file" | "folder";
  parentId?: string | null;
  mimeType?: string;
  size?: number;
  url?: string;
}) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(item),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to create item");

  return data;
};

// Rename item
export const renameItem = async (id: string, name: string) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({ name }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to rename item");

  return data;
};

// Delete item
export const deleteItem = async (id: string) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || data.message || "Failed to delete item");
  }

  return { message: "Item deleted successfully" };
};

// ----------------- FILE UPLOAD -----------------

export const uploadFile = async (file: File, parentId?: string | null) => {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);
  if (parentId) formData.append("parentId", parentId);

  const res = await fetch(`${API_BASE}/items/upload`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Upload failed");

  return data;
};

// ----------------- SHARING -----------------

export type SharePayload = {
  itemId: string;
  sharedWith?: string;
  isPublic?: boolean;
  permission: "view" | "edit";
};

export const shareItem = async (payload: SharePayload) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/items/share`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to share item");

  return data;
};


// Move item to trash
export const moveToTrash = async (id: string) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/items/${id}/trash`, {
    method: "PATCH",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to move item to trash");

  return data;
};

// // Restore item from trash
// export const restoreItem = async (id: string) => {
//   const token = getToken();
//   const res = await fetch(`${API_BASE}/items/${id}/restore`, {
//     method: "PATCH",
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || data.message || "Failed to restore item");

//   return data;
// };


// Get trashed items
export const getTrashedItems = async (): Promise<Item[]> => {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE}/items/trash`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to fetch trashed items");

  return data;
};

// Restore item
export const restoreItem = async (id: string) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/items/${id}/restore`, {
    method: "PATCH",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to restore item");

  return data;
};


// Delete forever
export const deleteForever = async (id: string) => {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to delete item");

  return data;
};


export const emptyTrash = async () => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/items/trash/empty`, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to empty trash");

  return data;
};


// UPLOAD FOLDER

//  Uploads a folder (with nested files) to the backend.
//  Uses `webkitdirectory` from <input> to preserve folder structure.

// export const uploadFolder = async (files: FileList, parentId?: string | null) => {
//   const token = getToken();
//   const formData = new FormData();

//   // append all files with their relative paths
//   Array.from(files).forEach((file) => {
//     // preserve folder hierarchy for backend
//     formData.append("files", file, (file as any).webkitRelativePath || file.name);
//   });

//   if (parentId) formData.append("parentId", parentId);

//   const res = await fetch(`${API_BASE}/items/upload-folder`, {
//     method: "POST",
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//     body: formData,
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || data.message || "Folder upload failed");

//   return data;
// };

// item.service.ts
export const uploadFolder = async (formData: FormData) => {
  const token = getToken();

  const res = await fetch(`${API_BASE}/items/upload-folder`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Folder upload failed");

  return data;
};


// export const getFileUrl = async (id: string) => {
//   const token = getToken(); // make sure this returns the JWT
//   const res = await fetch(`${API_BASE}/items/${id}/url`, {
//     method: "GET",
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || "Failed to fetch file URL");

//   return data.url;
// };

export const getFileUrl = async (id: string): Promise<string> => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/items/${id}/url`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to fetch file URL");

  return data.url; // 🔑 ensures FileCard gets only the URL
};
