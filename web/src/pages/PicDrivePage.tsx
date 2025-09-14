"use client"

import { useState,useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import MyDrive from "./MyDrive"
import SharedWithMe from "./SharedWithMe"
import Recent from "./Recent"
import Starred from "./Starred"
import Trash from "./Trash"
import Upload from "./Upload1"
import NewFolder from "./NewFolder"
import Settings from "./Settings"
import Profile from "./Profile"

export default function PicDrivePage() {
  const [currentPage, setCurrentPage] = useState("mydrive")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [darkMode, setDarkMode] = useState<boolean>(() => {
  // Load saved theme from localStorage on first load
  const saved = localStorage.getItem("theme")
  return saved === "dark"
})

  const handleNavigation = (page: string) => setCurrentPage(page)
  const handleUploadClick = () => setCurrentPage("upload")
  const handleNewFolderClick = () => setCurrentPage("newfolder")
  const handleSettingsClick = () => setCurrentPage("settings")
  const handleProfileClick = () => setCurrentPage("profile")
  const handleViewModeChange = (mode: "grid" | "list") => setViewMode(mode)

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "mydrive":
        return <MyDrive viewMode={viewMode} />
      case "shared":
        return <SharedWithMe viewMode={viewMode} />
      case "recent":
        return <Recent viewMode={viewMode} />
      case "starred":
        return <Starred viewMode={viewMode}/>
      case "trash":
        return <Trash viewMode={viewMode}/>
      case "upload":
        return <Upload />
      case "newfolder":
        return <NewFolder />
      case "settings":
        // return <Settings />
        return <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
      case "profile":
        return <Profile />
      default:
        return <MyDrive viewMode={viewMode} />
    }
  }


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  // restore on load
  // useEffect(() => {
  //   const stored = localStorage.getItem("theme")
  //   if (stored === "dark") setDarkMode(true)
  // }, [])


  return (
    // <div className="h-screen flex bg-gray-50 w-full">
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900 text-black dark:text-white w-full">
      {/* Sidebar */}
      <Sidebar activeItem={currentPage} onItemClick={handleNavigation} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <Topbar
          onUploadClick={handleUploadClick}
          onNewFolderClick={handleNewFolderClick}
          onSettingsClick={handleSettingsClick}
          onProfileClick={handleProfileClick}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />

        {/* Page Content */}
        {/* <main className="flex-1 h-full w-full bg-gray-50 overflow-hidden"> */}
        <main className="flex-1 h-full w-full bg-gray-50 dark:bg-gray-900 dark:text-white overflow-hidden">
          <div className="h-full w-full overflow-y-auto">
            {renderCurrentPage()}
          </div>
        </main>
      </div>
    </div>
  )
}
