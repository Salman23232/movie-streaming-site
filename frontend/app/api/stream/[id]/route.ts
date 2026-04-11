import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const videoId = searchParams.get('videoId')

  if (!videoId) {
    return NextResponse.json({ error: 'Video ID is required' }, { status: 400 })
  }

  const TARGET_URL = `https://vsembed.ru/video/${videoId}`

  try {
    const response = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://vsembed.ru/',
      },
      timeout: 5000, // 5 second timeout to prevent hanging
    })

    const html = response.data

    // Use a more robust regex to catch variations in quoting or naming
    // This looks for 'file', 'src', or 'url' followed by an m3u8 link
    const regex = /(?:file|src|url)\s*[:=]\s*["'](https?:\/\/[^"']+\.m3u8[^"']*)["']/
    const match = html.match(regex)

    if (match && match[1]) {
      return NextResponse.json({ streamUrl: match[1] })
    }

    return NextResponse.json({ error: 'Direct stream link not found' }, { status: 404 })
  } catch (error: any) {
    console.error('Extraction Error:', error.message)
    return NextResponse.json({ error: 'Failed to extract stream' }, { status: 500 })
  }
}
