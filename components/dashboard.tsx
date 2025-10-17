"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Calendar, Plus, FileText, Users } from "lucide-react"
import Image from "next/image"
import { StoreModal } from "./store-modal"

type SappyState = "wilted" | "starting" | "growing" | "thriving"

export function Dashboard() {
  const [userName] = useState("Nick")
  const [waterLimit] = useState(150) // Daily water limit in liters
  const [waterUsed, setWaterUsed] = useState(0) // Current water usage
  const [todayPoints, setTodayPoints] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [isStoreOpen, setIsStoreOpen] = useState(false)

  // Calculate water saved and Sappy's state
  const waterSaved = Math.max(0, waterLimit - waterUsed)
  const usagePercentage = (waterUsed / waterLimit) * 100

  const getSappyState = (): SappyState => {
    if (waterUsed === 0) return "starting"
    if (waterUsed > waterLimit) return "wilted"
    if (waterSaved >= 10) return "thriving"
    return "growing"
  }

  const sappyState = getSappyState()

  const getSappyImage = () => {
    switch (sappyState) {
      case "wilted":
        return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-1-8Pd79nazziTiv49dtrgwVmT4n2o2VV.png" // Small wilted sapling
      case "starting":
        return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-1-8Pd79nazziTiv49dtrgwVmT4n2o2VV.png" // Small starting sapling
      case "growing":
        return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-2-hts5C7ujLz2uFSxBcaipJMQ1dyCBDY.png" // Medium succulent
      case "thriving":
        return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-3-xRVx8sHHRkMXyjgGzWjBD72SRBeVuO.png" // Large thriving succulent
    }
  }

  const getSappyMessage = () => {
    switch (sappyState) {
      case "wilted":
        return "Sappy is looking a bit sad today. Save some water to help him grow."
      case "starting":
        return "Welcome and meet Sappy!"
      case "growing":
        return "Sappy is growing nicely!"
      case "thriving":
        return "Sappy is looking happy today!"
    }
  }

  const getGaugeColor = () => {
    if (waterUsed === 0) return "#3498DB"
    return waterUsed > waterLimit ? "#E74C3C" : "#3498DB"
  }

  // Calculate gauge arc
  const gaugePercentage = Math.min((waterUsed / waterLimit) * 100, 100)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (gaugePercentage / 100) * circumference

  const handlePurchase = (items: any[], totalCost: number) => {
    setTotalPoints((prev) => prev - totalCost)
    setIsStoreOpen(false)
    // Here you would also apply the item effects to Sappy
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#A8D8EA] via-[#7EC8E3] to-[#5AB9D8] pb-24">
      {/* Header */}
      <div className="px-6 pt-8">
        <h1 className="mb-2 text-2xl font-bold text-[#2C3E50]">Hello {userName},</h1>
        <p className="text-pretty leading-relaxed text-[#34495E]">{getSappyMessage()}</p>
      </div>

      {/* Sappy Plant Display */}
      <div className="relative mx-auto my-8 flex h-80 w-80 items-center justify-center">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm" />
        {/* Plant image */}
        <div className="relative z-10">
          <Image
            src={getSappyImage() || "/placeholder.svg"}
            alt="Sappy the plant"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      </div>

      {/* Water Usage Card */}
      <div className="mx-6 mb-4 rounded-3xl bg-white/30 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-6">
          {/* Circular Gauge */}
          <div className="relative flex h-32 w-32 flex-shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform">
              {/* Background circle */}
              <circle cx="64" cy="64" r={radius} stroke="rgba(255, 255, 255, 0.3)" strokeWidth="8" fill="none" />
              {/* Progress arc */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke={getGaugeColor()}
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-[#2C3E50]">{waterUsed}L</div>
              <div className="text-xs text-[#34495E]">(out of {waterLimit}L)</div>
            </div>
          </div>

          {/* Water Stats */}
          <div className="flex-1">
            {waterUsed === 0 ? (
              <>
                <p className="mb-3 text-pretty leading-relaxed text-[#2C3E50]">Start tracking your water usage now.</p>
                <Button className="h-10 rounded-xl bg-[#3498DB] px-6 font-semibold text-white hover:bg-[#2980B9]">
                  Start now
                </Button>
              </>
            ) : (
              <>
                <p className="mb-1 text-pretty leading-relaxed text-[#2C3E50]">
                  {"You've saved"} <span className="font-bold">{waterSaved} litres</span> of water today.
                </p>
                <p className="text-pretty leading-relaxed text-[#2C3E50]">
                  {"That's"} <span className="font-bold">{todayPoints} points</span> earned.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Points Card */}
      <div className="mx-6 mb-6 rounded-3xl bg-white/30 p-6 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg text-[#2C3E50]">{"Today's points"}</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#2C3E50]">{todayPoints}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9B59B6]">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg text-[#2C3E50]">Total points</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#2C3E50]">{totalPoints}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9B59B6]">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setIsStoreOpen(true)}
          className="h-14 w-full rounded-2xl bg-[#3498DB] text-lg font-semibold text-white hover:bg-[#2980B9]"
        >
          Buy new items
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/40 backdrop-blur-md">
        <div className="relative flex items-center justify-around px-6 py-4">
          <button className="flex flex-col items-center gap-1 text-[#3498DB]">
            <Home className="h-6 w-6 fill-current" />
          </button>
          <button className="flex flex-col items-center gap-1 text-[#7F8C8D]">
            <Calendar className="h-6 w-6" />
          </button>
          {/* Floating Plus Button */}
          <button className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#3498DB] shadow-lg transition-transform hover:scale-110">
            <Plus className="h-7 w-7 text-white" />
          </button>
          <button className="flex flex-col items-center gap-1 text-[#7F8C8D]">
            <FileText className="h-6 w-6" />
          </button>
          <button className="flex flex-col items-center gap-1 text-[#7F8C8D]">
            <Users className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Store Modal */}
      <StoreModal
        isOpen={isStoreOpen}
        onClose={() => setIsStoreOpen(false)}
        totalPoints={totalPoints}
        onPurchase={handlePurchase}
      />
    </div>
  )
}
