import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { name: 'Nature', image: '/placeholder.svg?height=300&width=400' },
  { name: 'Portraits', image: '/placeholder.svg?height=300&width=400' },
  { name: 'Urban', image: '/placeholder.svg?height=300&width=400' },
  { name: 'Events', image: '/placeholder.svg?height=300&width=400' },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative h-screen">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Featured photograph"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold text-center">Welcome to My Photography Gallery</h1>
        </div>
      </div>
      <section id="categories" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={`/gallery?category=${category.name.toLowerCase()}`} className="group">
                <div className="relative overflow-hidden rounded-lg shadow-md aspect-w-4 aspect-h-3">
                  <Image
                    src={category.image}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

