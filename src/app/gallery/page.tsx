'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Heart, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Mock data for photos
const photos = [
  { id: 1, src: '/images/startpage_cover.webp', likes: 10, comments: [] },
  { id: 2, src: '/images/startpage_cover.webp', likes: 15, comments: [] },
  { id: 3, src: '/images/startpage_cover.webp', likes: 8, comments: [] },
  { id: 4, src: '/images/startpage_cover.webp', likes: 20, comments: [] },
  { id: 5, src: '/images/startpage_cover.webp', likes: 12, comments: [] },
  { id: 6, src: '/images/startpage_cover.webp', likes: 18, comments: [] },
]

export default function Gallery() {
  const [accessCode, setAccessCode] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [galleryPhotos, setGalleryPhotos] = useState(photos)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreenOpen) return

      if (e.key === 'ArrowLeft') {
        navigateImage('prev')
      } else if (e.key === 'ArrowRight') {
        navigateImage('next')
      } else if (e.key === 'Escape') {
        setIsFullscreenOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreenOpen])

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessCode === '') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid access code')
    }
  }

  const openFullscreen = (index: number) => {
    setSelectedPhotoIndex(index)
    setIsFullscreenOpen(true)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedPhotoIndex === null) return

    let newIndex
    if (direction === 'prev') {
      newIndex = selectedPhotoIndex === 0 ? galleryPhotos.length - 1 : selectedPhotoIndex - 1
    } else {
      newIndex = selectedPhotoIndex === galleryPhotos.length - 1 ? 0 : selectedPhotoIndex + 1
    }
    setSelectedPhotoIndex(newIndex)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleAccessSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Enter Access Code</h2>
          <Input
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter access code"
            className="mb-4"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Gallery` : 'Photo Gallery'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryPhotos.map((photo, index) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                className="relative w-full h-64 cursor-pointer"
                onClick={() => openFullscreen(index)}
              >
                <Image
                  src={photo.src}
                  alt={`Photo ${photo.id}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Button variant="ghost" onClick={() => (null)}>
                    <Heart className="mr-2" /> {photo.likes}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost">
                        <MessageCircle className="mr-2" /> {photo.comments.length}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Comments</DialogTitle>
                        <DialogDescription>
                          View and add comments for this photo.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4 space-y-2">
                        {photo.comments.map((comment, index) => (
                          <p key={index} className="bg-gray-100 p-2 rounded">{comment}</p>
                        ))}
                      </div>
                      <form onSubmit={(e) => { e.preventDefault() }} className="mt-4">
                        <Input name="comment" placeholder="Add a comment" className="mb-2" />
                        <Button type="submit">Post Comment</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {isFullscreenOpen && selectedPhotoIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreenOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            aria-label="Close fullscreen view"
          >
            <X size={24} />
          </button>

          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-4 text-white hover:text-gray-300 z-50"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={galleryPhotos[selectedPhotoIndex].src}
              alt={`Photo ${galleryPhotos[selectedPhotoIndex].id}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={() => navigateImage('next')}
            className="absolute right-4 text-white hover:text-gray-300 z-50"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  )
}
