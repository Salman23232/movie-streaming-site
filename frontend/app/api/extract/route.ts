import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const videoId = searchParams.get('videoId') || '1171145'

  try {
    // STEP 1: Fetch the initial embed page
    const embedResponse = await axios.get(`https://vsembed.ru/embed/movie/${videoId}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        Referer: 'https://vsembed.ru/',
      },
    })

    const html = embedResponse.data

    // STEP 2: Extract the Token from the 'src' attribute using Regex
    // This finds: src: '/prorcp/TOKEN_STRING'
    const tokenMatch = html.match(/src:\s*'\/prorcp\/([^']+)'/)

    if (!tokenMatch || !tokenMatch[1]) {
      return NextResponse.json({ error: 'Token extraction failed' }, { status: 404 })
    }

    const sessionToken = tokenMatch[1]

    const playerResponse = await axios.get(`https://cloudnestra.com/rcp/${sessionToken}`, {
      headers: {
        Referer: 'https://vsembed.ru/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      },
    })

    const playerHtml = playerResponse.data

    // STEP 4: Find the final video file link
    // It's usually inside a JS variable: file:"BASE64_LINK"
    const fileMatch = playerHtml.match(/file:"([^"]+)"/)

    if (fileMatch && fileMatch[1]) {
      // Decode the final link from Base64
      const finalM3u8 = Buffer.from(fileMatch[1], 'base64').toString('utf-8')

      return NextResponse.json({
        success: true,
        streamUrl: finalM3u8,
      })
    }

    return NextResponse.json({ error: 'Final stream link not found in player' }, { status: 404 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
