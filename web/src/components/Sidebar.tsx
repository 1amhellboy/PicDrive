"use client"

import type React from "react"
import { HardDrive, Users, Clock, Star, Trash2 } from "lucide-react"

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

  return (
    <div className="w-60 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-3">
        <div className="w-full bg-black text-white px-3 py-2 rounded-lg font-large text-left text-sm">PicDrive</div>
      </div>

      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeItem === item.id ? "bg-gray-100 text-black" : "text-black hover:bg-gray-50"
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

      <div className="px-4 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-600 mb-2">Storage</div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>15 GB</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div className="bg-black h-2 rounded-full" style={{ width: "68%" }}></div>
        </div>
        <div className="text-xs text-gray-500 mb-3">10.2 GB of 15 GB used</div>
        <button className="flex items-center text-sm text-gray-700 hover:text-black transition-colors">
          <div className="w-4 h-4 border border-gray-400 rounded mr-2"></div>
          Get more storage
        </button>
      </div>
    </div>
  )
}

export default Sidebar
