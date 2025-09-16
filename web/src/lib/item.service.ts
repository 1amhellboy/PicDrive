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
  isStarred?: boolean;
};

// Helper to get token
const getToken = () => localStorage.getItem("accessToken");


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

// export type SharePayload = {
//   itemId: string;
//   sharedWith?: string;
//   isPublic?: boolean;
//   permission: "view" | "edit";
// };

// export const shareItem = async (payload: SharePayload) => {
//   const token = getToken();
//   const res = await fetch(`${API_BASE}/items/share`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || data.message || "Failed to share item");

//   return data;
// };

// Share an item
export const shareItem = async (
  itemId: string,
  recipientEmail: string,
  isPublic: boolean,
  permission: "viewer" | "editor"
) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/items/share`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      itemId,
      sharedWith: recipientEmail,
      isPublic,
      permission,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to share");

  return data;
};

// Get all items shared with logged-in user
export const getSharedWithMe = async () => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/items/shared/me`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Failed to fetch shared items");

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


export const downloadFile = async (id: string, name: string) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/items/${id}/download`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Download failed");
  }

  const { url } = await res.json();

  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
};


export const getRecentItems = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE}/items/recent`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch recent items");
  return data;
};




// item.service.ts

//  Toggle star
export const toggleStar = async (id: string) => {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE}/items/${id}/star`, {
    method: "PATCH",
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to toggle star");

  return data;
};

//  Get starred items
export const getStarredItems = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE}/items/starred/me`, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch starred items");

  return data;
};


export interface StorageUsage {
  used: number
  total: number
  documents: number
  photos: number
  videos: number
}

export const getStorageUsage = async (): Promise<StorageUsage> => {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE}/items/storage`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch storage usage");

  return data;
};



// export const requestDataExport = async () => {
//   const token = getToken()

//   const res = await fetch(`${API_BASE}/items/export`, {
//     method: "GET",
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   })

//   if (!res.ok) {
//     const errorText = await res.text()
//     throw new Error(errorText || "Failed to export data")
//   }

//   //  Convert response stream to Blob
//   const blob = await res.blob()
//   const url = window.URL.createObjectURL(blob)

//   //  Trigger download
//   const link = document.createElement("a")
//   link.href = url
//   link.download = "data-export.zip"
//   document.body.appendChild(link)
//   link.click()
//   link.remove()

//   //  Cleanup URL after some time
//   setTimeout(() => window.URL.revokeObjectURL(url), 1000)
// }

export const requestDataExport = async (): Promise<boolean> => {
  const token = localStorage.getItem("accessToken")

  const res = await fetch(`${API_BASE}/items/export`, {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(errorText || "Failed to export data")
  }

  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = "data-export.zip"
  document.body.appendChild(link)
  link.click()
  link.remove()

  setTimeout(() => window.URL.revokeObjectURL(url), 1000)

  return true //  signal success
}


// Profile Update
export async function updateProfile(data: { name: string; email: string }) {
  const token = localStorage.getItem("accessToken");
  try {
    const res = await fetch(`${API_BASE}/items/update`, {
      method: "PUT",
      
      headers: {
        "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || "Failed to update profile")
    }

    return await res.json()
  } catch (err: any) {
    throw new Error(err.message || "Update request failed")
  }
}

// Account Statistics
export async function getAccountStats() {
  const token = localStorage.getItem("accessToken");
  try {
    const res = await fetch(`${API_BASE}/items/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || "Failed to fetch account stats")
    }

    return await res.json()
  } catch (err: any) {
    throw new Error(err.message || "Stats request failed")
  }
}


