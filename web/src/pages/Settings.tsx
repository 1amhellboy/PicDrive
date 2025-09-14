// "use client"

// import type React from "react"
// import { useState } from "react"
// import { HardDrive, Moon, Sun, Bell, Shield, Download } from "lucide-react"

// const Settings: React.FC = () => {
//   const [darkMode, setDarkMode] = useState(false)
//   const [notifications, setNotifications] = useState(true)
//   const [autoSync, setAutoSync] = useState(true)

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

//       <div className="max-w-2xl space-y-6">
//         {/* Storage Usage */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <div className="flex items-center mb-4">
//             <HardDrive className="w-5 h-5 text-gray-500 mr-3" />
//             <h2 className="text-lg font-medium text-gray-900">Storage Usage</h2>
//           </div>
//           <div className="space-y-3">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Used</span>
//               <span className="font-medium">8.2 GB of 15 GB</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div className="bg-blue-600 h-2 rounded-full" style={{ width: "55%" }}></div>
//             </div>
//             <div className="flex justify-between text-xs text-gray-500">
//               <span>Documents: 2.1 GB</span>
//               <span>Photos: 4.8 GB</span>
//               <span>Videos: 1.3 GB</span>
//             </div>
//             <button className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//               Upgrade Storage
//             </button>
//           </div>
//         </div>

//         {/* Appearance */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <div className="flex items-center mb-4">
//             {darkMode ? (
//               <Moon className="w-5 h-5 text-gray-500 mr-3" />
//             ) : (
//               <Sun className="w-5 h-5 text-gray-500 mr-3" />
//             )}
//             <h2 className="text-lg font-medium text-gray-900">Appearance</h2>
//           </div>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-900">Dark Mode</p>
//               <p className="text-sm text-gray-500">Switch to dark theme</p>
//             </div>
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                 darkMode ? "bg-blue-600" : "bg-gray-200"
//               }`}
//             >
//               <span
//                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                   darkMode ? "translate-x-6" : "translate-x-1"
//                 }`}
//               />
//             </button>
//           </div>
//         </div>

//         {/* Notifications */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <div className="flex items-center mb-4">
//             <Bell className="w-5 h-5 text-gray-500 mr-3" />
//             <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
//           </div>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Push Notifications</p>
//                 <p className="text-sm text-gray-500">Get notified about file changes</p>
//               </div>
//               <button
//                 onClick={() => setNotifications(!notifications)}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   notifications ? "bg-blue-600" : "bg-gray-200"
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     notifications ? "translate-x-6" : "translate-x-1"
//                   }`}
//                 />
//               </button>
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Auto Sync</p>
//                 <p className="text-sm text-gray-500">Automatically sync files across devices</p>
//               </div>
//               <button
//                 onClick={() => setAutoSync(!autoSync)}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   autoSync ? "bg-blue-600" : "bg-gray-200"
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     autoSync ? "translate-x-6" : "translate-x-1"
//                   }`}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Privacy & Security */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <div className="flex items-center mb-4">
//             <Shield className="w-5 h-5 text-gray-500 mr-3" />
//             <h2 className="text-lg font-medium text-gray-900">Privacy & Security</h2>
//           </div>
//           <div className="space-y-3">
//             <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
//               Change Password
//             </button>
//             <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
//               Two-Factor Authentication
//             </button>
//             <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
//               Privacy Settings
//             </button>
//           </div>
//         </div>

//         {/* Data Export */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <div className="flex items-center mb-4">
//             <Download className="w-5 h-5 text-gray-500 mr-3" />
//             <h2 className="text-lg font-medium text-gray-900">Data Export</h2>
//           </div>
//           <p className="text-sm text-gray-600 mb-4">Download a copy of all your data stored in PicDrive</p>
//           <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//             Request Data Export
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Settings

"use client"

import React, { useEffect, useState } from "react"
import { HardDrive, Moon, Sun, Bell, Shield, Download } from "lucide-react"
import { getStorageUsage, StorageUsage, requestDataExport } from "../lib/item.service"

interface SettingsProps {
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const Settings: React.FC<SettingsProps> = ({ darkMode, setDarkMode }) => {
  const [notifications, setNotifications] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const [message, setMessage] = useState<string | null>(null)

  // 🔑 new state for storage usage
  const [usage, setUsage] = useState<StorageUsage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const data = await getStorageUsage()
        setUsage(data)
      } catch (err: any) {
        console.error("Failed to fetch storage usage:", err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsage()
  }, [])

  const formatSize = (bytes: number) => {
    if (!bytes) return "0 B"
    const units = ["B", "KB", "MB", "GB", "TB"]
    let i = 0
    let size = bytes
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024
      i++
    }
    return `${size.toFixed(1)} ${units[i]}`
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Settings</h1>

      <div className="max-w-2xl space-y-6">
        {/* Storage Usage */}
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <HardDrive className="w-5 h-5 text-gray-500 mr-3" />
            <h2 className="text-lg font-medium">Storage Usage</h2>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : usage ? (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium">
                  {formatSize(usage.used)} of {formatSize(usage.total)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(usage.used / usage.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Documents: {formatSize(usage.documents)}</span>
                <span>Photos: {formatSize(usage.photos)}</span>
                <span>Videos: {formatSize(usage.videos)}</span>
              </div>
              <button className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Upgrade Storage
              </button>
            </div>
          ) : (
            <p className="text-sm text-red-500">Failed to load storage data.</p>
          )}
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center mb-4">
            {darkMode ? (
              <Moon className="w-5 h-5 text-gray-500 mr-3" />
            ) : (
              <Sun className="w-5 h-5 text-gray-500 mr-3" />
            )}
            <h2 className="text-lg font-medium">Appearance</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Switch to dark theme</p>
            </div>
            {/* <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button> */}
            <button
  onClick={() => setDarkMode(!darkMode)}
  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
    darkMode ? "bg-blue-600" : "bg-gray-200"
  }`}
>
  <span
    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
      darkMode ? "translate-x-6" : "translate-x-1"
    }`}
  />
</button>
          </div>
        </div>

        {/* Notifications */}
        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-gray-500 mr-3" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about file changes</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Auto Sync</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Automatically sync files across devices</p>
              </div>
              <button
                onClick={() => setAutoSync(!autoSync)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoSync ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoSync ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-gray-500 mr-3" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Privacy & Security</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Two-Factor Authentication
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Privacy Settings
            </button>
          </div>
        </div>

        {/* Data Export */}
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Download className="w-5 h-5 text-gray-500 mr-3" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Data Export</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Download a copy of all your data stored in PicDrive
          </p>

          <button
            onClick={async () => {
              setLoading(true)
              try {
                await requestDataExport()
                setMessage("Export started! Check your downloads.")
              } catch (err: any) {
                setMessage(err.message || "Export failed")
              } finally {
                setLoading(false)
              }
            }}
            disabled={loading}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              loading
                ? "bg-gray-200 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                : "border bg-blue-50 dark:bg-blue-600 dark:text-white border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {loading ? "Exporting..." : "Request Data Export"}
          </button>

          {message && (
            <p className={`mt-2 text-sm ${message.includes("Export") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Settings
