"use client"

import type React from "react"

import { useState } from "react"
// import Link from "next/link"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button1"
import { Input } from "@/components/ui/input1"
import { Label } from "@/components/ui/label1"
import { Card, CardContent } from "@/components/ui/card1"
import { Badge } from "@/components/ui/badge1"
import { CheckCircle, Upload, FolderOpen, Share2 } from "lucide-react"

function Login() {
  const navigate = useNavigate() // Add this line
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { username, password })
  }

  // Add this function
  const handleNavigateToSignup = () => {
    navigate("/signup")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Brand and features */}
      <div className="flex-1 flex flex-col justify-center px-12 py-16">
        <div className="max-w-lg">
          {/* AI Badge */}
          <Badge variant="secondary" className="mb-8 bg-blue-50 text-blue-700 border-blue-200">
            <CheckCircle className="w-4 h-4 mr-2" />
            Now with AI-powered organization
          </Badge>

          {/* Main heading */}
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            PicDrive - Your cloud,
            <br />
            your control.
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Store, sync, and share your photos and files securely in the cloud. Access your memories and documents from
            any device, anywhere in the world.
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <span className="text-gray-700 font-medium flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload files
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <span className="text-gray-700 font-medium flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Manage folders
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <span className="text-gray-700 font-medium flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share with anyone
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center px-12 py-16">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 border-gray-200 focus:border-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-gray-200 focus:border-gray-400"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium">
                login
              </Button>

              <div className="text-center">
                <span className="text-gray-600">to PicDrive</span>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button 
                  onClick={handleNavigateToSignup}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login;