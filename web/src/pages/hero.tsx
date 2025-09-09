import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"


export default function Component() {
  const navigate = useNavigate()

  const handleNavigateToLogin = () => {
    navigate("/login")
  }

  const handleNavigateToSignup = () => {
    navigate("/signup")
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* AI-powered organization badge */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">Now with AI-powered organization</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
            PicDrive - Your cloud, your control.
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
            Store, sync, and share your photos and files securely in the cloud. Access your memories and documents from
            any device, anywhere in the world.
          </p>

          {/* Action buttons */}
          <div className="flex gap-4 mb-12">
            <Button onClick={handleNavigateToSignup} size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium">
              Sign Up
            </Button>
            <Button
              onClick={handleNavigateToLogin}
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium bg-transparent"
            >
              Login
            </Button>
          </div>

          {/* Feature bullets */}
          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span>Upload files</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span>Manage folders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span>Share with anyone</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom trust indicators */}
      <div className="border-t border-gray-200 bg-white px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-8 text-sm text-gray-600">
          <div className="font-medium">Trusted by many users</div>
          <div className="font-medium">99.9% uptime</div>
          <div className="font-medium">SOC 2 compliant</div>
          <div className="font-medium">24/7 support</div>
        </div>
      </div>

      {/* Syncing indicator */}
      <div className="fixed bottom-6 right-6">
        <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">Syncing...</span>
        </div>
      </div>
    </div>
  )
}
