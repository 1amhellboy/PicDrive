import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/lib/api'; // 👈 Make sure path matches your project

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await registerUser(email, password, name);

      // Store auth info (if backend returns it)
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      // Redirect to dashboard (or login if you prefer)
      navigate('/login');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}


        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
          required
        />

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
          required
        />        

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;

// export default Signup;
// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { registerUser } from "@/lib/api" // Make sure path matches your project

// function Signup() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [name, setName] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const navigate = useNavigate()

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const response = await registerUser(email, password, name)

//       // Store auth info (if backend returns it)
//       if (response.token) {
//         localStorage.setItem("token", response.token)
//       }
//       if (response.user) {
//         localStorage.setItem("user", JSON.stringify(response.user))
//       }

//       // Redirect to dashboard (or login if you prefer)
//       navigate("/login")
//     } catch (err: any) {
//       console.error(err)
//       setError(err.message || "Signup failed")
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
//               {/* <span className="text-lg">✨</span> */}
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

//           {/* Right Section - Signup Form */}
//           <div className="flex justify-center lg:justify-end">
//             <div className="w-full max-w-md">
//               <form onSubmit={handleSignup} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//                 <h2 className="text-2xl font-semibold mb-6 text-gray-900">Create your account</h2>

//                 {error && (
//                   <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                     <p className="text-red-600 text-sm">{error}</p>
//                   </div>
//                 )}

//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name
//                     </label>
//                     <input
//                       id="name"
//                       type="text"
//                       placeholder="Enter your full name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
//                       required
//                     />
//                   </div>

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
//                       placeholder="Create a password"
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
//                   {loading ? "Creating account..." : "Create Account"}
//                 </button>

//                 <p className="mt-6 text-center text-sm text-gray-600">
//                   Already have an account?{" "}
//                   <a href="/login" className="text-black hover:underline font-medium">
//                     Sign in
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

// export default Signup


// "use client"

// import type React from "react"

// import { useState } from "react"
// // import Link from "next/link"
// import { useNavigate } from "react-router-dom"
// import { Button } from "@/components/ui/button1"
// import { Input } from "@/components/ui/input1"
// import { Label } from "@/components/ui/label1"
// import { Card, CardContent } from "@/components/ui/card1"
// import { Badge } from "@/components/ui/badge1"
// import { CheckCircle, Upload, FolderOpen, Share2 } from "lucide-react"

// function Signup() {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Handle signup logic here
//     console.log("Signup attempt:", formData)
//   }

//   const handleNavigateToLogin = () => {
//     navigate("/login")
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Left side - Brand and features */}
//       <div className="flex-1 flex flex-col justify-center px-12 py-16">
//         <div className="max-w-lg">
//           {/* AI Badge */}
//           <Badge variant="secondary" className="mb-8 bg-blue-50 text-blue-700 border-blue-200">
//             <CheckCircle className="w-4 h-4 mr-2" />
//             Now with AI-powered organization
//           </Badge>

//           {/* Main heading */}
//           <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
//             PicDrive - Your cloud,
//             <br />
//             your control.
//           </h1>

//           {/* Description */}
//           <p className="text-lg text-gray-600 mb-12 leading-relaxed">
//             Store, sync, and share your photos and files securely in the cloud. Access your memories and documents from
//             any device, anywhere in the world.
//           </p>

//           {/* Features */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
//               <span className="text-gray-700 font-medium flex items-center gap-2">
//                 <Upload className="w-4 h-4" />
//                 Upload files
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
//               <span className="text-gray-700 font-medium flex items-center gap-2">
//                 <FolderOpen className="w-4 h-4" />
//                 Manage folders
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
//               <span className="text-gray-700 font-medium flex items-center gap-2">
//                 <Share2 className="w-4 h-4" />
//                 Share with anyone
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right side - Signup form */}
//       <div className="flex-1 flex items-center justify-center px-12 py-16">
//         <Card className="w-full max-w-md border-0 shadow-lg">
//           <CardContent className="p-8">
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-semibold text-gray-900">Sign Up</h2>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="fullName" className="text-gray-700">
//                   Full Name
//                 </Label>
//                 <Input
//                   id="fullName"
//                   name="fullName"
//                   type="text"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="h-12 border-gray-200 focus:border-gray-400"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-gray-700">
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="h-12 border-gray-200 focus:border-gray-400"
//                   required
//                 />
//               </div>
// {/* 
//               <div className="space-y-2">
//                 <Label htmlFor="username" className="text-gray-700">
//                   Username
//                 </Label>
//                 <Input
//                   id="username"
//                   name="username"
//                   type="text"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="h-12 border-gray-200 focus:border-gray-400"
//                   required
//                 />
//               </div> */}

//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-gray-700">
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="h-12 border-gray-200 focus:border-gray-400"
//                   required
//                 />
//               </div>

//               {/* <div className="space-y-2">
//                 <Label htmlFor="confirmPassword" className="text-gray-700">
//                   Confirm Password
//                 </Label>
//                 <Input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="h-12 border-gray-200 focus:border-gray-400"
//                   required
//                 />
//               </div> */}

//               <Button type="submit" className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium">
//                 Create Account
//               </Button>

//               {/* <div className="text-center">
//                 <span className="text-gray-600">Join PicDrive today</span>
//               </div> */}
//             </form>

//             <div className="mt-8 text-center">
//               <p className="text-gray-600">
//                 Already have an account?{" "}
//                 <button 
//                   onClick={handleNavigateToLogin}
//                   className="text-blue-600 hover:text-blue-700 font-medium"
//                 >
//                   Login
//                 </button>
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default Signup;