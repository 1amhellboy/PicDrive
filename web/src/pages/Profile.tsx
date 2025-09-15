// "use client"

// import type React from "react"
// import { useState } from "react"
// import { User, Mail, Calendar, Edit3, Camera } from "lucide-react"
// import { useAuth } from "@/context/AuthContext"
// import { Button } from "@/components/ui/button1"

// const Profile: React.FC = () => {
//   const { user, logout } = useAuth()
//   const [loading, setLoading] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [profile, setProfile] = useState({
//     name: user?.name || "John Doe",
//     email: user?.email || "abc@gmail.com",
//     joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "January 1, 2023",
//     avatar: "/placeholder.svg?height=120&width=120",
//   })

//   const [editForm, setEditForm] = useState({
//     name: profile.name,
//     email: profile.email,
//   })

//   const handleLogout = async () => {
//     try {
//       await logout()
//     } catch (err) {
//       console.error("Logout failed:", err)
//     }
//   }

//   const handleSave = () => {
//     setProfile((prev) => ({
//       ...prev,
//       name: editForm.name,
//       email: editForm.email,
//     }))
//     setIsEditing(false)
//   }

//   const handleCancel = () => {
//     setEditForm({
//       name: profile.name,
//       email: profile.email,
//     })
//     setIsEditing(false)
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Profile</h1>

//       <div className="max-w-2xl">
//         {/* Profile Card */}
//         <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
//           {/* Avatar Section */}
//           <div className="flex items-center space-x-6 mb-6">
//             <div className="relative">
//               <img
//                 src={profile.avatar || "/placeholder.svg"}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover"
//               />
//               <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
//                 <Camera className="w-4 h-4" />
//               </button>
//             </div>
//             <div className="flex-1">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{profile.name}</h2>
//               <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
//               <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
//                 <Calendar className="w-4 h-4 mr-1" />
//                 Joined {profile.joinDate}
//               </div>
//             </div>
//           </div>

//           {/* Profile Information */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
//               {!isEditing && (
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
//                 >
//                   <Edit3 className="w-4 h-4 mr-1" />
//                   Edit
//                 </button>
//               )}
//             </div>

//             {isEditing ? (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     value={editForm.name}
//                     onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
//                                bg-white dark:bg-gray-700 dark:text-white 
//                                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     value={editForm.email}
//                     onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
//                                bg-white dark:bg-gray-700 dark:text-white 
//                                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div className="flex space-x-3 pt-2">
//                   <button
//                     onClick={handleSave}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Save Changes
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 
//                                rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <div className="flex items-center">
//                   <User className="w-5 h-5 text-gray-400 dark:text-gray-300 mr-3" />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-white">Full Name</p>
//                     <p className="text-sm text-gray-600 dark:text-gray-300">{profile.name}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <Mail className="w-5 h-5 text-gray-400 dark:text-gray-300 mr-3" />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-white">Email Address</p>
//                     <p className="text-sm text-gray-600 dark:text-gray-300">{profile.email}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <form onSubmit={handleLogout}>
//             <div className="mt-6">
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-fit h-fit bg-gray-900 hover:bg-gray-800 text-white font-medium disabled:opacity-50"
//               >
//                 {loading ? "Logging out..." : "Logout"}
//               </Button>
//             </div>
//           </form>
//         </div>

//         {/* Account Statistics */}
//         <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mt-6">
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Statistics</h3>
//           <div className="grid grid-cols-3 gap-4">
//             <div className="text-center">
//               <p className="text-2xl font-semibold text-blue-600">1,234</p>
//               <p className="text-sm text-gray-600 dark:text-gray-300">Files Uploaded</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-semibold text-green-600">8.2 GB</p>
//               <p className="text-sm text-gray-600 dark:text-gray-300">Storage Used</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-semibold text-purple-600">45</p>
//               <p className="text-sm text-gray-600 dark:text-gray-300">Shared Files</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile


"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { User, Mail, Calendar, Edit3, Camera } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button1"
import { updateProfile, getAccountStats } from "@/lib/item.service" // ✅ backend services
import { useToast } from "@/context/ToastContext"


const Profile: React.FC = () => {
  const { user, logout } = useAuth()
  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "abc@gmail.com",
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "January 1, 2023",
    avatar: "/placeholder.svg?height=120&width=120",
  })

  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
  })

  //  Account Stats
  const [stats, setStats] = useState({
    filesUploaded: 0,
    storageUsed: "0 MB",
    sharedFiles: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAccountStats()
        setStats(data)
      } catch (err: any) {
        console.error("Failed to fetch stats:", err)
      }
    }
    fetchStats()
  }, [])

  const handleLogout = async () => {
    try {
      setLoading(true)
      await logout()
    } catch (err) {
      console.error("Logout failed:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const updated = await updateProfile(editForm) //  API call
      setProfile((prev) => ({
        ...prev,
        name: updated.name,
        email: updated.email,
      }))
      addToast({
        type: "success",
        title: "Profile Updated",
        description: "Your profile was updated successfully.",
      })
      setIsEditing(false)
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Update Failed",
        description: err.message || "Could not update profile",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
    })
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Profile</h1>

      <div className="max-w-2xl">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <img
                src={profile.avatar || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{profile.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {profile.joinDate}
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-gray-700 dark:text-white 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-gray-700 dark:text-white 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 
                               rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 dark:text-gray-300 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Full Name</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{profile.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 dark:text-gray-300 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Email Address</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{profile.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleLogout}>
            <div className="mt-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-fit h-fit bg-gray-900 hover:bg-gray-800 text-white font-medium disabled:opacity-50"
              >
                {loading ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </form>
        </div>

        {/* Account Statistics */}
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-blue-600">{stats.filesUploaded}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Files Uploaded</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-green-600">{stats.storageUsed}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Storage Used</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-purple-600">{stats.sharedFiles}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Shared Files</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
