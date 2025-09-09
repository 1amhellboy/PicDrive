// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '@/lib/api'; // make sure this exists

// // React Login componenet
// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const response = await loginUser(email, password);
//       localStorage.setItem('token', response.token);
//       localStorage.setItem('user', JSON.stringify(response.user));
//       navigate('/dashboard');
//     } catch (err: any) {
//       console.error(err); // 👈 log actual error
//       setError(err.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

//         {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { loginUser } from "@/lib/api" // make sure this exists

// function Login() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const navigate = useNavigate()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const response = await loginUser(email, password)
//       localStorage.setItem("token", response.token)
//       localStorage.setItem("user", JSON.stringify(response.user))
//       navigate("/dashboard")
//     } catch (err: any) {
//       console.error(err)
//       setError(err.message || "Login failed")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-6 py-12">
//         <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
//           {/* Left Section - Branding */}
//           <div className="space-y-8">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <span className="text-lg">✨</span>
//               <span>Now with AI-powered organization</span>
//             </div>

//             <div className="space-y-6">
//               <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
//                 PicDrive - Your cloud, your control.
//               </h1>

//               <p className="text-lg text-gray-600 leading-relaxed max-w-md">
//                 Store, sync, and share your photos and files securely in the cloud. Access your memories and documents
//                 from any device, anywhere in the world.
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-2 h-2 bg-black rounded-full"></div>
//                 <span className="text-gray-700">Upload files</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-2 h-2 bg-black rounded-full"></div>
//                 <span className="text-gray-700">Manage folders</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-2 h-2 bg-black rounded-full"></div>
//                 <span className="text-gray-700">Share with anyone</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Login Form */}
//           <div className="flex justify-center lg:justify-end">
//             <div className="w-full max-w-md">
//               <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//                 <h2 className="text-2xl font-semibold mb-6 text-gray-900">Welcome back</h2>

//                 {error && (
//                   <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                     <p className="text-red-600 text-sm">{error}</p>
//                   </div>
//                 )}

//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                       Email
//                     </label>
//                     <input
//                       id="email"
//                       type="email"
//                       placeholder="Enter your email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                       Password
//                     </label>
//                     <input
//                       id="password"
//                       type="password"
//                       placeholder="Enter your password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full mt-6 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//                 >
//                   {loading ? "Signing in..." : "Sign In"}
//                 </button>

//                 <p className="mt-6 text-center text-sm text-gray-600">
//                   Don't have an account?{" "}
//                   <a href="/signup" className="text-black hover:underline font-medium">
//                     Sign up
//                   </a>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login


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