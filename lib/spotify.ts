const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'
const RECOMMENDATIONS_ENDPOINT = 'https://api.spotify.com/v1/recommendations'

let cachedToken: { access_token: string; expires_at: number } | null = null

async function getAccessToken() {
  // Return cached token if still valid
  if (cachedToken && cachedToken.expires_at > Date.now()) {
    return cachedToken.access_token
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  const data = await response.json()
  
  // Cache token with expiration
  cachedToken = {
    access_token: data.access_token,
    expires_at: Date.now() + (data.expires_in * 1000) - 60000, // Refresh 1 min early
  }

  return data.access_token
}

export async function searchTracks(query: string, limit = 20) {
  try {
    const access_token = await getAccessToken()

    const response = await fetch(
      `${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )

    const data = await response.json()
    
    return data.tracks.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      artwork: track.album.images[0]?.url,
      preview_url: track.preview_url,
      spotify_url: track.external_urls.spotify,
      duration_ms: track.duration_ms,
    }))
  } catch (error) {
    console.error('Spotify search error:', error)
    return []
  }
}

export async function getRecommendations(seedTracks: string[] = [], limit = 20) {
  try {
    const access_token = await getAccessToken()

    // Default seed tracks if none provided
    const seeds = seedTracks.length > 0 
      ? seedTracks.slice(0, 5).join(',') 
      : '0c6xIDDpzE81m2q797ordA' // Default: Imagine by John Lennon

    const response = await fetch(
      `${RECOMMENDATIONS_ENDPOINT}?seed_tracks=${seeds}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )

    const data = await response.json()
    
    return data.tracks.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      artwork: track.album.images[0]?.url,
      preview_url: track.preview_url,
      spotify_url: track.external_urls.spotify,
      duration_ms: track.duration_ms,
    }))
  } catch (error) {
    console.error('Spotify recommendations error:', error)
    return []
  }
}

export async function getTrackDetails(trackId: string) {
  try {
    const access_token = await getAccessToken()

    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )

    const track = await response.json()
    
    return {
      id: track.id,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      artwork: track.album.images[0]?.url,
      preview_url: track.preview_url,
      spotify_url: track.external_urls.spotify,
      duration_ms: track.duration_ms,
    }
  } catch (error) {
    console.error('Spotify track details error:', error)
    return null
  }
}
