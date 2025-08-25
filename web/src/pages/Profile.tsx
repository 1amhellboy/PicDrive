"use client"

import type React from "react"
import { useState } from "react"
import { User, Mail, Calendar, Edit3, Camera } from "lucide-react"

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2023",
    avatar: "/placeholder.svg?height=120&width=120",
  })

  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
  })

  const handleSave = () => {
    setProfile((prev) => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
    }))
    setIsEditing(false)
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
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h1>

      <div className="max-w-2xl">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
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
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {profile.joinDate}
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Full Name</p>
                    <p className="text-sm text-gray-600">{profile.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Address</p>
                    <p className="text-sm text-gray-600">{profile.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Statistics */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-blue-600">1,234</p>
              <p className="text-sm text-gray-600">Files Uploaded</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-green-600">8.2 GB</p>
              <p className="text-sm text-gray-600">Storage Used</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-purple-600">45</p>
              <p className="text-sm text-gray-600">Shared Files</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
