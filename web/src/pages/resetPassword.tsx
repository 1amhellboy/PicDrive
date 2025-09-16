"use client";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button1";
import { Input } from "@/components/ui/input1";
import { Label } from "@/components/ui/label1";
import { Card, CardContent } from "@/components/ui/card1";
import { useAuth } from "../context/AuthContext";
import { Badge } from "@/components/ui/badge1";
import { CheckCircle, Upload, FolderOpen, Share2 } from "lucide-react";


function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // extract token + email from URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token") || "";
  const email = queryParams.get("email") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(token, newPassword, email);
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
    //   <Card className="w-full max-w-md border-0 shadow-lg">
    //     <CardContent className="p-8">
    //       <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
    //         Reset Password
    //       </h2>

    //       {error && (
    //         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
    //           <p className="text-red-600 text-sm">{error}</p>
    //         </div>
    //       )}

    //       {message && (
    //         <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
    //           <p className="text-green-600 text-sm">{message}</p>
    //         </div>
    //       )}

    //       <form onSubmit={handleResetSubmit} className="space-y-6">
    //         <div className="space-y-2">
    //           <Label htmlFor="newPassword">New Password</Label>
    //           <Input
    //             id="newPassword"
    //             type="password"
    //             value={newPassword}
    //             onChange={(e) => setNewPassword(e.target.value)}
    //             required
    //             className="h-12 border-gray-200 focus:border-gray-400"
    //           />
    //         </div>

    //         <div className="space-y-2">
    //           <Label htmlFor="confirmPassword">Confirm Password</Label>
    //           <Input
    //             id="confirmPassword"
    //             type="password"
    //             value={confirmPassword}
    //             onChange={(e) => setConfirmPassword(e.target.value)}
    //             required
    //             className="h-12 border-gray-200 focus:border-gray-400"
    //           />
    //         </div>

    //         <Button
    //           type="submit"
    //           disabled={loading}
    //           className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium disabled:opacity-50"
    //         >
    //           {loading ? "Resetting..." : "Reset Password"}
    //         </Button>
    //       </form>
    //     </CardContent>
    //   </Card>
    // </div>
    <div className="min-h-screen bg-gray-50 flex">
  {/* Left side */}
  <div className="flex-1 flex flex-col justify-center px-12 py-16">
    <div className="max-w-lg">
      <Badge variant="secondary" className="mb-8 bg-blue-50 text-blue-700 border-blue-200">
        <CheckCircle className="w-4 h-4 mr-2" />
        Now with AI-powered organization
      </Badge>

      <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
        PicDrive - Your cloud,<br />
        your control.
      </h1>

      <p className="text-lg text-gray-600 mb-12 leading-relaxed">
        Store, sync, and share your photos and files securely in the cloud. 
        Access your memories and documents from any device, anywhere in the world.
      </p>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
          <span className="text-gray-700 font-medium flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload files
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
          <span className="text-gray-700 font-medium flex items-center gap-2">
            <FolderOpen className="w-4 h-4" /> Manage folders
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
          <span className="text-gray-700 font-medium flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share with anyone
          </span>
        </div>
      </div>
    </div>
  </div>

  {/* Right side - Reset Form */}
  <div className="flex-1 flex items-center justify-center px-12 py-16">
    <Card className="w-full max-w-md border-0 shadow-lg">
      <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
            Reset Password
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleResetSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="h-12 border-gray-200 focus:border-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-12 border-gray-200 focus:border-gray-400"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
      </CardContent>
    </Card>
  </div>
</div>

  );
}

export default ResetPassword;


