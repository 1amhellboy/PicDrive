"use client"

import { useState } from "react"
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

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  const handleUploadClick = () => {
    setCurrentPage("upload")
  }

  const handleNewFolderClick = () => {
    setCurrentPage("newfolder")
  }

  const handleSettingsClick = () => {
    setCurrentPage("settings")
  }

  const handleProfileClick = () => {
    setCurrentPage("profile")
  }

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "mydrive":
        return <MyDrive viewMode={viewMode} />
      case "shared":
        return <SharedWithMe />
      case "recent":
        return <Recent />
      case "starred":
        return <Starred />
      case "trash":
        return <Trash />
      case "upload":
        return <Upload />
      case "newfolder":
        return <NewFolder />
      case "settings":
        return <Settings />
      case "profile":
        return <Profile />
      default:
        return <MyDrive viewMode={viewMode} />
    }
  }

  return (
    <div className="h-screen flex bg-gray-50">
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
        <main className="flex-1 overflow-auto">{renderCurrentPage()}</main>
      </div>
    </div>
  )
}
