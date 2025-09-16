// "use client"

// import type React from "react"
// import { HardDrive, Users, Clock, Star, Trash2 } from "lucide-react"

// interface SidebarProps {
//   activeItem: string
//   onItemClick: (item: string) => void
// }

// const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
//   const menuItems = [
//     { id: "mydrive", label: "My Drive", icon: HardDrive },
//     { id: "shared", label: "Shared with me", icon: Users },
//     { id: "recent", label: "Recent", icon: Clock },
//     { id: "starred", label: "Starred", icon: Star },
//     { id: "trash", label: "Trash", icon: Trash2 },
//   ]

//   return (
//     <div className="w-60 bg-white border-r border-gray-200 h-full flex flex-col ">
//       <div className="p-3">
//         <div className="w-full bg-black text-white px-3 py-2 rounded-lg font-large text-left text-m ">PicDrive</div>
        
//       </div>

//       <nav className="flex-1 px-2">
//         <ul className="space-y-1">
//           {menuItems.map((item) => {
//             const Icon = item.icon
//             return (
//               <li key={item.id}>
//                 <button
//                   onClick={() => onItemClick(item.id)}
//                   className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
//                     activeItem === item.id ? "bg-gray-100 text-black" : "text-black hover:bg-gray-50"
//                   }`}
//                 >
//                   <Icon className="w-5 h-5 mr-3" />
//                   {item.label}
//                 </button>
//               </li>
//             )
//           })}
//         </ul>
//       </nav>

//       <div className="px-4 py-3 border-t border-gray-200">
//         <div className="text-sm text-gray-600 mb-2">Storage</div>
//         <div className="flex justify-between text-sm text-gray-600 mb-2">
//           <span>15 GB</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//           <div className="bg-black h-2 rounded-full" style={{ width: "68%" }}></div>
//         </div>
//         <div className="text-xs text-gray-500 mb-3">10.2 GB of 15 GB used</div>
//         <button className="flex items-center text-sm text-gray-700 hover:text-black transition-colors">
//           <div className="w-4 h-4 border border-gray-400 rounded mr-2"></div>
//           Get more storage
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Sidebar


"use client"

import type React from "react"
import { HardDrive, Users, Clock, Star, Trash2 } from "lucide-react"
import { getAccountStats } from "@/lib/item.service"
import { useEffect, useState } from "react"

interface SidebarProps {
  activeItem: string
  onItemClick: (item: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  const menuItems = [
    { id: "mydrive", label: "My Drive", icon: HardDrive },
    { id: "shared", label: "Shared with me", icon: Users },
    { id: "recent", label: "Recent", icon: Clock },
    { id: "starred", label: "Starred", icon: Star },
    { id: "trash", label: "Trash", icon: Trash2 },
  ]
  const [used, setUsed] = useState("0 B")
  const [total, setTotal] = useState("1 GB") // assume default quota
  const [percentUsed, setPercentUsed] = useState(0)


  useEffect(()=>{
    const fetchStats = async ()=>{
      try{
        const stats = await getAccountStats();
        setUsed(stats.storageUsed);

        const quotaBytes = 1 * 1024 * 1024 * 1024 // 1GB
        setTotal("1 GB")


        // calculate %
        const usedValue = parseFloat(stats.storageUsed)
        const isGB = stats.storageUsed.includes("GB")
        const isMB = stats.storageUsed.includes("MB")
        const isKB = stats.storageUsed.includes("KB")

        let usedBytes = 0
        if (isGB) usedBytes = usedValue * 1024 * 1024 * 1024
        else if (isMB) usedBytes = usedValue * 1024 * 1024
        else if (isKB) usedBytes = usedValue * 1024
        else usedBytes = usedValue

        setPercentUsed(Math.min(100, (usedBytes / quotaBytes) * 100))
      }catch(err){
        console.error("Failed to load storage:", err)
      }
    }
    fetchStats()
  },[])

  return (
    <div className="w-60 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Logo */}
      <div className="p-3">
        <div className="w-full bg-black text-white px-3 py-2 rounded-lg font-large text-left text-m ">
          PicDrive
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors 
                    ${
                      activeItem === item.id
                        ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                        : "text-black dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Storage */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Storage</div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>{total}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
          <div
            className="bg-black dark:bg-blue-500 h-2 rounded-full"
            style={{ width:   `${percentUsed}` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {used} of {total} used
        </div>
        <button className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
          <div className="w-4 h-4 border border-gray-400 dark:border-gray-600 rounded mr-2"></div>
          Get more storage
        </button>
      </div>
    </div>
  )
}

export default Sidebar
