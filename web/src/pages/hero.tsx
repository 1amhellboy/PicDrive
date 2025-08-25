import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Zap } from "lucide-react"
import Image from "next/image"


export default function Component() {
  return (
    <section className="w-full py-8 md:py-16 lg:py-20 xl:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge variant="secondary" className="w-fit">
                <Zap className="w-3 h-3 mr-1" />
                Now with AI-powered organization
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <span className="text-primary">PicDrive</span> - Your cloud, your control.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Store, sync, and share your photos and files securely in the cloud. Access your memories and documents
                from any device, anywhere in the world.
              </p>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="h-12 px-8">
                Sign Up
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent">
                Login
              </Button>
            </div>

            <div className="flex flex-col space-y-3 pt-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">Upload files</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">Manage folders</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">Share with anyone</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500"
                width="500"
                height="500"
                alt="PicDrive file storage interface showing organized folders and documents"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 border">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Syncing...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-60">
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium">Trusted by 10M+ users</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium">99.9% uptime</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium">SOC 2 compliant</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium">24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  )
}
