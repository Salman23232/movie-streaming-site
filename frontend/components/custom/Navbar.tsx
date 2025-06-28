'use client'

import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Input } from '../ui/input'
import Genre from './Genre'
import { useMovieStore } from '@/store/movieStore'

const Navbar = () => {
  const { searchValue, setSearchValue } = useMovieStore()


  return (
    <header className="w-full border-b shadow-sm px-8 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-wide text-gray-900">
          Stream Koro<span className="text-red-500">.</span>
        </div>

        {/* Center Navigation */}
        <nav className="space-x-6 text-md font-medium text-gray-700 flex items-center">
          <Link href="/movie" className="hover:text-red-500 transition">Movie</Link>
          <Link href="/tv-shows" className="hover:text-red-500 transition">TvShows</Link>
          <div className="hover:text-red-500 transition"><Genre /></div>
        </nav>

        {/* Right: Search & User */}
        <div className="flex items-center space-x-6 text-gray-700 text-xl">
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <UserButton/>
        </div>
      </div>
    </header>
  )
}

export default Navbar
