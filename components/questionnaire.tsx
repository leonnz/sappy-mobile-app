"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type Question = {
  id: string
  question: string
  options: string[]
  multiSelect: boolean
}

const questions: Question[] = [
  {
    id: "residency",
    question: "What is your residency type?",
    options: ["Flat", "Single family", "Other"],
    multiSelect: true,
  },
  {
    id: "assets",
    question: "Do you have any of these assets at home?",
    options: ["Pool", "Irrigation system", "Garden"],
    multiSelect: true,
  },
  {
    id: "appliances",
    question: "Which water-using appliances do you have?",
    options: ["Dishwasher", "Washing machine", "Both"],
    multiSelect: false,
  }
]

export function Questionnaire() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const question = questions[currentQuestion]
  const currentAnswers = answers[question.id] || []

  const handleOptionToggle = (option: string) => {
    if (question.multiSelect) {
      // Multi-select: toggle option
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((a) => a !== option)
        : [...currentAnswers, option]
      setAnswers({ ...answers, [question.id]: newAnswers })
    } else {
      // Single select: replace answer
      setAnswers({ ...answers, [question.id]: [option] })
    }
  }

  const submitQuestionnaire = async () => {
    setIsSubmitting(true)
    
    // Map answers to API payload
    const residency = answers.residency || []
    const assets = answers.assets || []
    const appliances = answers.appliances || []

    const payload = {
      customer_data: {
        household_size: 200,
        household_garden_area: 20,
        household_pool: assets.includes("Pool") ? 1 : 0,
        household_garden: assets.includes("Garden") ? 1 : 0,
        number_bathrooms: 0,
        irrigation_system: assets.includes("Irrigation system") ? 1 : 0,
        house_plants: 1,
        balcony_plants: 0,
        Bathtub: 0,
        Dishwasher: appliances.includes("Dishwasher") || appliances.includes("Both") ? 1 : 0,
        Shower: 0,
        Sink: 1,
        Toilet: 0,
        Tub_Shower: 0,
        Washing_Machine: appliances.includes("Washing machine") || appliances.includes("Both") ? 1 : 0,
        residency_Flat: residency.includes("Flat") ? 1 : 0,
        residency_Other: residency.includes("Other") ? 1 : 0,
        residency_Single_Family: residency.includes("Single family") ? 1 : 0,
        env_attitude_High_sensitivity: 0,
        env_attitude_Low_sensitivity: 0,
        env_attitude_Medium_sensitivity: 0,
      },
    }

    try {
      const response = await fetch('/api/inference?smart_meter_id=T284', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      console.log('API Response:', data)
      
      router.push("/dashboard")
    } catch (error) {
      console.error('Error submitting questionnaire:', error)
      // Still navigate to dashboard even if API fails
      router.push("/dashboard")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      console.log("[v0] Questionnaire completed:", answers)
      submitQuestionnaire()
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#A8D8EA] via-[#7EC8E3] to-[#5AB9D8] px-6 py-8">
      {/* Progress Bar */}
      <div className="mb-12 flex gap-2">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              index <= currentQuestion ? "bg-[#3498DB]" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Question Content */}
      <div className="flex flex-1 flex-col">
        <div className="mb-12">
          <h1 className="mb-6 text-balance text-2xl font-bold leading-tight text-[#2C3E50] md:text-3xl">
            {"Let's get to know you"}
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-[#34495E]">{question.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option) => {
            const isSelected = currentAnswers.includes(option)
            return (
              <button
                key={option}
                onClick={() => handleOptionToggle(option)}
                className="flex w-full items-center gap-4 rounded-2xl bg-transparent p-4 text-left transition-all hover:bg-white/10"
              >
                <div
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    isSelected ? "border-[#3498DB] bg-[#3498DB]" : "border-white/50 bg-white/20 backdrop-blur-sm"
                  }`}
                >
                  {isSelected && <div className="h-3 w-3 rounded-full bg-white" />}
                </div>
                <span className="text-lg text-[#2C3E50]">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Next Button */}
      <div className="mt-8">
        <Button
          onClick={handleNext}
          disabled={currentAnswers.length === 0 || isSubmitting}
          className="h-14 w-full rounded-2xl bg-[#3498DB] text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#2980B9] hover:shadow-xl disabled:opacity-50 disabled:hover:bg-[#3498DB]"
        >
          {isSubmitting 
            ? "Submitting..." 
            : currentQuestion < questions.length - 1 
            ? "Next question" 
            : "Complete"}
        </Button>
      </div>
    </div>
  )
}
