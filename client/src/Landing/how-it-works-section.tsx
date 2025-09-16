"use client"

import Card, { CardContent, CardHeader, CardTitle } from "./custom-ui/card"
import { useState, useEffect } from "react"

export default function HowItWorksSection() {
  const [visibleCards, setVisibleCards] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.dataset.index)
            setVisibleCards((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = document.querySelectorAll(".step-card")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      number: "1",
      title: "Report a Dirty Place",
      description: "Use our map to pin and report places that need cleaning in your neighborhood.",
      icon: "📍",
      color: "from-red-500 to-pink-500",
    },
    {
      number: "2",
      title: "Cleaner Gets Notified",
      description: "Our system alerts nearby cleaning workers about the reported location.",
      icon: "🧹",
      color: "from-yellow-500 to-orange-500",
    },
    {
      number: "3",
      title: "Place Gets Cleaned",
      description: "Professional cleaners visit the location and clean up the reported area.",
      icon: "✨",
      color: "from-purple-500 to-indigo-500",
    },
    {
      number: "4",
      title: "Earn Reward Coins",
      description: "Once verified clean, you earn special coins that can be redeemed for rewards.",
      icon: "🪙",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to make your community cleaner and earn rewards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              data-index={index}
              className={`step-card transform transition-all duration-700 delay-${index * 200} ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
              }`}
            >
              <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg group">
                <CardHeader className="pb-4">
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-2xl mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      {step.icon}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shadow-md">
                      {step.number}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="hidden lg:block relative mt-8">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <div className="flex items-center space-x-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-24 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
