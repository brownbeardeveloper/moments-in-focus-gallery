'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Heart, MessageCircle } from 'lucide-react'

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
  { id: 1, src: '/placeholder.svg?height=400&width=600', likes: 10, comments: [] },
  { id: 2, src: '/placeholder.svg?height=400&width=600', likes: 15, comments: [] },
  { id: 3, src: '/placeholder.svg?height=400&width=600', likes: 8, comments: [] },
  { id: 4, src: '/placeholder.svg?height=400&width=600', likes: 20, comments: [] },
  { id: 5, src: '/placeholder.svg?height=400&width=600', likes: 12, comments: [] },
  { id: 6, src: '/placeholder.svg?height=400&width=600', likes: 18, comments: [] },
]

export default function Gallery() {
  const [accessCode, setAccessCode] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [galleryPhotos, setGalleryPhotos] = useState(photos)
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  useEffect(() => {
    // In a real application, you would fetch photos based on the category
    console.log(`Fetching photos for category: ${category}`)
  }, [category])

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would validate the access code here
    if (accessCode === '1234') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid access code')
    }
  }

  const handleLike = (id: number) => {
    setGalleryPhotos(photos =>
      photos.map(photo =>
        photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo
      )
    )
  }

  const handleComment = (id: number, comment: string) => {
    setGalleryPhotos(photos =>
      photos.map(photo =>
        photo.id === id ? { ...photo, comments: [...photo.comments, comment] } : photo
      )
    )
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
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Gallery` : 'Photo Gallery'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryPhotos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-w-4 aspect-h-3">
              <Image
                src={photo.src}
                alt={`Photo ${photo.id}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Button variant="ghost" onClick={() => handleLike(photo.id)}>
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
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      const comment = (e.target as HTMLFormElement).comment.value
                      handleComment(photo.id, comment)
                      ;(e.target as HTMLFormElement).reset()
                    }} className="mt-4">
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
  )
}

