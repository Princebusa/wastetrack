"use client"

import Button from "./custom-ui/button"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [counters, setCounters] = useState({ places: 0, citizens: 0, coins: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      const animateCounter = (target, key, duration = 2000) => {
        const start = 0
        const increment = target / (duration / 16)
        let current = 0

        const updateCounter = () => {
          current += increment
          if (current < target) {
            setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }))
            requestAnimationFrame(updateCounter)
          } else {
            setCounters((prev) => ({ ...prev, [key]: target }))
          }
        }
        updateCounter()
      }

      animateCounter(2847, "places")
      animateCounter(1234, "citizens")
      animateCounter(89432, "coins")
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1
            className={`text-4xl md:text-6xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Make Your City{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 animate-pulse">
              Cleaner
            </span>
          </h1>

          <p
            className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Report dirty places in your neighborhood, help cleaners find them faster, and earn reward coins when your
            reports get resolved. Together, we can build cleaner communities.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Reporting
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-50 transform hover:scale-105 transition-all duration-300 bg-transparent"
            >
              Join as Cleaner
            </Button>
          </div>

          <div
            className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="group">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 group-hover:scale-110 transition-transform duration-300">
                {counters.places.toLocaleString()}
              </div>
              <div className="text-gray-600 font-medium">Places Cleaned</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 group-hover:scale-110 transition-transform duration-300">
                {counters.citizens.toLocaleString()}
              </div>
              <div className="text-gray-600 font-medium">Active Citizens</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 group-hover:scale-110 transition-transform duration-300">
                {counters.coins.toLocaleString()}
              </div>
              <div className="text-gray-600 font-medium">Coins Earned</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
