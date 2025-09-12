"use client";

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // context handles all API + storage
import { Button } from "@/components/ui/button1";
import { Input } from "@/components/ui/input1";
import { Label } from "@/components/ui/label1";
import { Card, CardContent } from "@/components/ui/card1";
import { Badge } from "@/components/ui/badge1";
import { CheckCircle, Upload, FolderOpen, Share2 } from "lucide-react";

function Auth() {
  const { login, register } = useAuth(); // ✅ now using both from context
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  // Form states
  const [signupData, setSignupData] = useState({ email: "", password: "", name: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Signup handler
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(signupData.name, signupData.email, signupData.password);
      // optional: auto-login is already handled by context `register`
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(loginData.email, loginData.password);
      navigate("/dashboard"); // always go to dashboard
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    setError("");
    navigate("/login");
  };

  const handleNavigateToSignup = () => {
    setError("");
    navigate("/signup");
  };

  return (
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

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-12 py-16">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                {isSignup ? "Sign Up" : "Login"}
              </h2>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {isSignup ? (
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <Input
                    id="name" name="name" type="text" value={signupData.name} onChange={handleSignupChange}
                    className="h-12 border-gray-200 focus:border-gray-400" required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email" name="email" type="email" value={signupData.email} onChange={handleSignupChange}
                    className="h-12 border-gray-200 focus:border-gray-400" required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password" name="password" type="password" value={signupData.password} onChange={handleSignupChange}
                    className="h-12 border-gray-200 focus:border-gray-400" required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium disabled:opacity-50">
                  {loading ? "Signing up..." : "Create Account"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email" name="email" type="email" value={loginData.email} onChange={handleLoginChange}
                    className="h-12 border-gray-200 focus:border-gray-400" required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password" name="password" type="password" value={loginData.password} onChange={handleLoginChange}
                    className="h-12 border-gray-200 focus:border-gray-400" required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium disabled:opacity-50">
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isSignup ? (
                  <>Already have an account?{" "}
                    <button onClick={handleNavigateToLogin} className="text-blue-600 hover:text-blue-700 font-medium">
                      Login
                    </button>
                  </>
                ) : (
                  <>Don't have an account?{" "}
                    <button onClick={handleNavigateToSignup} className="text-blue-600 hover:text-blue-700 font-medium">
                      Sign up
                    </button>
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Auth;
