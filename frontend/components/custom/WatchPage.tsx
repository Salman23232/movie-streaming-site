'use client'

import { useEffect, useRef, useState } from 'react'
import Artplayer from 'artplayer'
import Hls from 'hls.js'

// Define the shape of your Next.js dynamic route params
interface WatchPageProps {
  params: {
    id: string
  }
}

// Define the API response shape
interface StreamResponse {
  url?: string
  error?: string
}

export default function WatchPage({ params }: WatchPageProps) {
  // Explicitly type the ref as HTMLDivElement
  const artRef = useRef<HTMLDivElement | null>(null)
  const [streamUrl, setStreamUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const res = await fetch(`/api/stream/${params.id}`)
        const data: StreamResponse = await res.json()
        if (data.url) {
          setStreamUrl(data.url)
        }
      } catch (err) {
        console.error('Failed to fetch stream:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStream()
  }, [params.id])

  useEffect(() => {
    // Only initialize if we have a URL and the container ref is ready
    if (!streamUrl || !artRef.current) return

    const art = new Artplayer({
      container: artRef.current,
      url: streamUrl,
      type: 'm3u8',
      customType: {
        m3u8: function (video: HTMLVideoElement, url: string) {
          if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(url)
            hls.attachMedia(video)

            // Cleanup HLS instance when Artplayer destroys
            art.on('destroy', () => {
              hls.destroy()
            })
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Support for Safari which plays HLS natively
            video.src = url
          }
        },
      },
      // Netflix-style settings
      fullscreen: true,
      setting: true,
      playbackRate: true,
      pip: true,
      autoSize: true,
      autoMini: true, // Mini player when scrolling
      screenshot: true,
      hotkey: true,
      theme: '#E50914', // Netflix Red
      icons: {
        loading: '<img src="/loading.svg">', // You can add a custom loader here
      },
    })

    return () => {
      if (art && typeof art.destroy === 'function') {
        art.destroy(true)
      }
    }
  }, [streamUrl])

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-4">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          {/* A simple Tailwind skeleton for Netflix feel */}
          <div className="w-[80vw] aspect-video bg-zinc-900 animate-pulse rounded-xl" />
          <p className="text-zinc-500 font-medium animate-pulse">Initializing Stream...</p>
        </div>
      ) : streamUrl ? (
        <div ref={artRef} className="w-full max-w-6xl aspect-video shadow-2xl shadow-red-900/10" />
      ) : (
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold">Content Unavailable</h1>
          <p className="text-zinc-400">We couldn't resolve the stream for this title.</p>
        </div>
      )}
    </div>
  )
}
