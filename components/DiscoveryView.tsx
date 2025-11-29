'use client'

import { useState, useEffect } from 'react'
import { Search, TrendingUp, Music, Play, ExternalLink, Sparkles } from 'lucide-react'

export default function DiscoveryView({ onPlay }: { onPlay: (track: any) => void }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingRecs, setIsLoadingRecs] = useState(false)
  const [apiConfigured, setApiConfigured] = useState(false)

  useEffect(() => {
    // Check if API is configured
    const checkAPI = async () => {
      try {
        const res = await fetch('/api/spotify/recommendations?limit=10')
        if (res.ok) {
          setApiConfigured(true)
          const data = await res.json()
          setRecommendations(data.tracks)
        }
      } catch (error) {
        console.log('Spotify API not configured yet')
      }
    }
    checkAPI()
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    try {
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(searchQuery)}&limit=20`)
      const data = await res.json()
      setSearchResults(data.tracks || [])
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    }
    setIsSearching(false)
  }

  const loadMoreRecommendations = async () => {
    setIsLoadingRecs(true)
    try {
      const res = await fetch('/api/spotify/recommendations?limit=10')
      const data = await res.json()
      setRecommendations(data.tracks || [])
    } catch (error) {
      console.error('Failed to load recommendations:', error)
    }
    setIsLoadingRecs(false)
  }

  const playPreview = (track: any) => {
    if (track.preview_url) {
      onPlay({
        id: track.id,
        title: track.title,
        artist: track.artist,
        url: track.preview_url,
        artwork: track.artwork,
      })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Discover Music</h2>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for songs, artists, or albums..."
              className="w-full bg-dark-secondary border border-dark-tertiary rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !apiConfigured}
            className="bg-primary hover:bg-green-500 px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
        {!apiConfigured && (
          <p className="text-sm text-yellow-500 mt-2">
            ⚠️ Spotify API not configured. Add your credentials to enable search.
          </p>
        )}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Search Results</h3>
          <div className="grid gap-2">
            {searchResults.map((track) => (
              <div
                key={track.id}
                className="flex items-center justify-between bg-dark-secondary hover:bg-dark-tertiary p-4 rounded-lg transition group"
              >
                <div className="flex items-center gap-4 flex-1">
                  {track.artwork ? (
                    <img src={track.artwork} alt={track.title} className="w-12 h-12 rounded" />
                  ) : (
                    <div className="bg-dark-tertiary w-12 h-12 rounded flex items-center justify-center">
                      <Music size={24} className="text-gray-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{track.title}</h3>
                    <p className="text-sm text-gray-400">{track.artist}</p>
                    <p className="text-xs text-gray-500">{track.album}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {track.preview_url ? (
                    <button
                      onClick={() => playPreview(track)}
                      className="bg-primary hover:bg-green-500 p-2 rounded-full transition"
                      title="Play 30s preview"
                    >
                      <Play size={20} fill="white" />
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500 px-3">No preview</span>
                  )}
                  <a
                    href={track.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition"
                    title="Open in Spotify"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {apiConfigured && recommendations.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary" size={24} />
              <h3 className="text-xl font-bold">Recommended for You</h3>
            </div>
            <button
              onClick={loadMoreRecommendations}
              disabled={isLoadingRecs}
              className="text-sm text-primary hover:text-green-400 transition"
            >
              {isLoadingRecs ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          <div className="grid gap-2">
            {recommendations.map((track) => (
              <div
                key={track.id}
                className="flex items-center justify-between bg-dark-secondary hover:bg-dark-tertiary p-4 rounded-lg transition group"
              >
                <div className="flex items-center gap-4 flex-1">
                  {track.artwork ? (
                    <img src={track.artwork} alt={track.title} className="w-12 h-12 rounded" />
                  ) : (
                    <div className="bg-dark-tertiary w-12 h-12 rounded flex items-center justify-center">
                      <Music size={24} className="text-gray-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{track.title}</h3>
                    <p className="text-sm text-gray-400">{track.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {track.preview_url ? (
                    <button
                      onClick={() => playPreview(track)}
                      className="bg-primary hover:bg-green-500 p-2 rounded-full transition opacity-0 group-hover:opacity-100"
                      title="Play 30s preview"
                    >
                      <Play size={20} fill="white" />
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500 px-3 opacity-0 group-hover:opacity-100">No preview</span>
                  )}
                  <a
                    href={track.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition opacity-0 group-hover:opacity-100"
                    title="Open in Spotify"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-dark-secondary border border-primary/20 rounded-lg p-6">
        <h4 className="font-semibold mb-2 text-primary">🎵 Music Discovery Features</h4>
        {apiConfigured ? (
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✅ Search millions of songs</li>
            <li>✅ Get personalized recommendations</li>
            <li>✅ Preview 30-second clips legally</li>
            <li>✅ Discover new artists and albums</li>
            <li>✅ Open full tracks in Spotify</li>
          </ul>
        ) : (
          <div>
            <p className="text-sm text-gray-400 mb-3">
              To enable full music discovery features, add your Spotify API credentials:
            </p>
            <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://developer.spotify.com/dashboard" target="_blank" className="text-primary hover:underline">Spotify Developer Dashboard</a></li>
              <li>Create an app and get your Client ID & Secret</li>
              <li>Add them to your environment variables</li>
              <li>Redeploy your app</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
