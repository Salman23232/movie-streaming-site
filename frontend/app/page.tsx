'use client'

import Hero from '@/components/custom/Hero'
import MovieList from '@/components/custom/MovieList'
import Footer from '@/components/custom/Footer'
import Navbar from '@/components/custom/Navbar' // Assuming you have one

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#141414] text-white overflow-x-hidden">
      <Navbar />
      <Hero />

      <div className="relative z-10 -mt-32 pb-20 space-y-12">
        <section className="px-4 md:px-12">
          <h2 className="text-2xl font-semibold mb-4 ml-1">Trending Now</h2>
          <MovieList />
        </section>

        <section className="px-4 md:px-12">
          <h2 className="text-2xl font-semibold mb-4 ml-1">New Releases</h2>
          <MovieList />
        </section>
      </div>

      <Footer />
    </main>
  )
}
