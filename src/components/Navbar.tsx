'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            PhotoGallery
          </Link>
          <div className="space-x-4">
            <Link href="/gallery" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-gray-300`}>
              Gallery
            </Link>
            <Link href="/#categories" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-gray-300`}>
              Categories
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

