"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const slides = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-1-8Pd79nazziTiv49dtrgwVmT4n2o2VV.png",
    title: "Meet Sappy, your new water saving plant",
    description: "This productive tool is designed to help you save more water",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-2-hts5C7ujLz2uFSxBcaipJMQ1dyCBDY.png",
    title: "Watch Sappy grow as you save water",
    description: "Every litre of water you save, means more water for your plant",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welcome-3-xRVx8sHHRkMXyjgGzWjBD72SRBeVuO.png",
    title: "Buy new items to keep Sappy happy",
    description: "As you get more points, there are lots of cool items to buy Sappy",
  },
]

export function OnboardingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleGetStarted = () => {
    router.push("/questionnaire")
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#A8D8EA] via-[#7EC8E3] to-[#5AB9D8] px-6 py-12">
      {/* Navigation Arrows - Desktop Only */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30 md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30 md:block"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Main Content */}
      <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center">
        {/* Image Container with Circular Background */}
        <div className="relative mb-12 flex items-center justify-center">
          <div className="absolute h-[280px] w-[280px] rounded-full bg-white/30 backdrop-blur-sm md:h-[320px] md:w-[320px]" />
          <img
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            className="relative z-10 h-[240px] w-[240px] object-contain transition-all duration-500 md:h-[280px] md:w-[280px]"
          />
        </div>

        {/* Text Content */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-balance text-2xl font-bold leading-tight text-[#2C3E50] md:text-3xl">
            {slides[currentSlide].title}
          </h1>
          <p className="text-pretty text-base leading-relaxed text-[#34495E] md:text-lg">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Pagination Dots */}
        <div className="mb-8 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-[#3498DB]" : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full max-w-md space-y-4">
        <Button
          onClick={handleGetStarted}
          className="h-14 w-full rounded-2xl bg-[#3498DB] text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#2980B9] hover:shadow-xl"
        >
          {"Let's start"}
        </Button>
        <p className="text-center text-sm text-[#34495E]">
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold text-[#3498DB] hover:underline">
            Sign-in here
          </Link>
        </p>
      </div>
    </div>
  )
}
