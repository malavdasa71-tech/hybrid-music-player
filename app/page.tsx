'use client'

import { useState } from 'react'
import { Music, Search, Library, Radio, Upload } from 'lucide-react'
import MusicPlayer from '@/components/MusicPlayer'
import LibraryView from '@/components/LibraryView'
import DiscoveryView from '@/components/DiscoveryView'
import StreamingView from '@/components/StreamingView'

export default function Home() {
  const [activeTab, setActiveTab] = useState('library')
  const [currentTrack, setCurrentTrack] = useState<any>(null)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-dark-secondary border-b border-dark-tertiary p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Music className="text-primary" size={32} />
            Hybrid Music Player
          </h1>
          <p className="text-gray-400 mt-1">Your complete music experience</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-dark-secondary border-b border-dark-tertiary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'library'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Library size={20} />
              My Library
            </button>
            <button
              onClick={() => setActiveTab('discovery')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'discovery'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Search size={20} />
              Discover
            </button>
            <button
              onClick={() => setActiveTab('streaming')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'streaming'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Radio size={20} />
              Free Streaming
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-32">
        <div className="max-w-7xl mx-auto p-6">
          {activeTab === 'library' && <LibraryView onPlay={setCurrentTrack} />}
          {activeTab === 'discovery' && <DiscoveryView onPlay={setCurrentTrack} />}
          {activeTab === 'streaming' && <StreamingView onPlay={setCurrentTrack} />}
        </div>
      </main>

      {/* Music Player */}
      <MusicPlayer track={currentTrack} />
    </div>
  )
}
