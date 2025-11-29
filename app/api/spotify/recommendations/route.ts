import { NextRequest, NextResponse } from 'next/server'
import { getRecommendations } from '@/lib/spotify'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const seeds = searchParams.get('seeds')?.split(',') || []
  const limit = parseInt(searchParams.get('limit') || '20')

  try {
    const tracks = await getRecommendations(seeds, limit)
    return NextResponse.json({ tracks })
  } catch (error) {
    console.error('Recommendations API error:', error)
    return NextResponse.json({ error: 'Failed to get recommendations' }, { status: 500 })
  }
}
