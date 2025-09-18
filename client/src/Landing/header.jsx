"use client"

import { useState } from "react"
import Button from "./custom-ui/button"
import { Link } from "react-router-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-semibold text-[20px] flex "><p className="bg-green-800 text-white flex justify-center block w-[30px] h-[30px] rounded-[4px] mr-2">S</p><p className="font-bold">ScoreBin</p> </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium"
            >
              How it Works
            </a>
            <a
              href="#community"
              className="text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium"
            >
              Community
            </a>
            <a
              href="#rewards"
              className="text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium"
            >
              Rewards
            </a>
            <Button variant="outline" className="hover:scale-105 transition-transform duration-200 bg-transparent">
               <Link to="/signin"  >
                  Sign In
                </Link>
               
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
               <Link to="/signup" >
                  Get Started
                </Link>
            </Button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4">
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium py-2"
              >
                How it Works
              </a>
              <a
                href="#community"
                className="text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium py-2"
              >
                Community
              </a>
              <a
                href="#rewards"
                className="text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium py-2"
              >
                Rewards
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Sign In
                </Button>
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
