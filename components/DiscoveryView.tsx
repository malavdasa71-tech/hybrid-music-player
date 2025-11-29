'use client'

import { useState } from 'react'
import { Search, TrendingUp, Music, Play } from 'lucide-react'

export default function DiscoveryView({ onPlay }: { onPlay: (track: any) => void }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Demo trending tracks
  const trendingTracks = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', preview: true },
    { id: 2, title: 'Shape of You', artist: 'Ed Sheeran', preview: true },
    { id: 3, title: 'Someone Like You', artist: 'Adele', preview: true },
    { id: 4, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', preview: true },
  ]

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    // In a real app, you would call Spotify API here
    // For demo purposes, showing placeholder
    setTimeout(() => {
      setSearchResults([
        { id: 1, title: searchQuery, artist: 'Search Result', preview: true },
      ])
      setIsSearching(false)
    }, 1000)
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
            disabled={isSearching}
            className="bg-primary hover:bg-green-500 px-6 py-3 rounded-lg transition disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          💡 To enable full search, connect your Spotify account in settings
        </p>
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
                <div className="flex items-center gap-4">
                  <div className="bg-dark-tertiary w-12 h-12 rounded flex items-center justify-center">
                    <Music size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{track.title}</h3>
                    <p className="text-sm text-gray-400">{track.artist}</p>
                  </div>
                </div>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                  Preview
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-primary" size={24} />
          <h3 className="text-xl font-bold">Trending Now</h3>
        </div>
        <div className="grid gap-2">
          {trendingTracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between bg-dark-secondary hover:bg-dark-tertiary p-4 rounded-lg transition group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-dark-tertiary w-12 h-12 rounded flex items-center justify-center">
                  <Music size={24} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{track.title}</h3>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
              </div>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                30s Preview
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-dark-secondary border border-primary/20 rounded-lg p-6">
        <h4 className="font-semibold mb-2 text-primary">🎵 Music Discovery Features</h4>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Search millions of songs (requires Spotify API key)</li>
          <li>• Get personalized recommendations</li>
          <li>• Preview 30-second clips legally</li>
          <li>• Discover new artists and albums</li>
          <li>• View trending charts</li>
        </ul>
      </div>
    </div>
  )
}
