'use client'

import { useState } from 'react'
import { Radio, Music, Play, ExternalLink } from 'lucide-react'

export default function StreamingView({ onPlay }: { onPlay: (track: any) => void }) {
  // Demo free music sources
  const freeSources = [
    {
      id: 1,
      name: 'SoundCloud',
      description: 'Discover independent artists and free tracks',
      icon: '🎵',
      url: 'https://soundcloud.com',
    },
    {
      id: 2,
      name: 'Jamendo',
      description: '180,000+ free tracks for personal use',
      icon: '🎸',
      url: 'https://jamendo.com',
    },
    {
      id: 3,
      name: 'Free Music Archive',
      description: 'High-quality, legal audio downloads',
      icon: '📻',
      url: 'https://freemusicarchive.org',
    },
    {
      id: 4,
      name: 'YouTube Audio Library',
      description: 'Royalty-free music for creators',
      icon: '🎬',
      url: 'https://youtube.com/audiolibrary',
    },
  ]

  const demoStations = [
    { id: 1, name: 'Chill Vibes', genre: 'Lo-fi / Chill', listeners: '2.5K' },
    { id: 2, name: 'Electronic Beats', genre: 'Electronic', listeners: '1.8K' },
    { id: 3, name: 'Indie Rock', genre: 'Rock / Indie', listeners: '3.2K' },
    { id: 4, name: 'Jazz Classics', genre: 'Jazz', listeners: '1.2K' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Free Streaming</h2>

      {/* Free Music Sources */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Legal Free Music Sources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {freeSources.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark-secondary hover:bg-dark-tertiary p-6 rounded-lg transition group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{source.icon}</div>
                <ExternalLink size={20} className="text-gray-400 group-hover:text-primary transition" />
              </div>
              <h4 className="font-semibold text-lg mb-1">{source.name}</h4>
              <p className="text-sm text-gray-400">{source.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Radio Stations */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Radio className="text-primary" size={24} />
          <h3 className="text-xl font-bold">Live Radio Stations</h3>
        </div>
        <div className="grid gap-2">
          {demoStations.map((station) => (
            <div
              key={station.id}
              className="flex items-center justify-between bg-dark-secondary hover:bg-dark-tertiary p-4 rounded-lg transition group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-primary to-green-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <Radio size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">{station.name}</h3>
                  <p className="text-sm text-gray-400">{station.genre}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{station.listeners} listening</span>
                <button className="bg-primary hover:bg-green-500 p-2 rounded-full transition opacity-0 group-hover:opacity-100">
                  <Play size={20} fill="white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-dark-secondary border border-primary/20 rounded-lg p-6">
          <h4 className="font-semibold mb-2 text-primary">✅ What's Included</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Access to free music platforms</li>
            <li>• Live radio streaming</li>
            <li>• Independent artist content</li>
            <li>• Royalty-free music</li>
            <li>• Background playback</li>
          </ul>
        </div>
        <div className="bg-dark-secondary border border-blue-500/20 rounded-lg p-6">
          <h4 className="font-semibold mb-2 text-blue-400">🔧 Coming Soon</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Direct SoundCloud integration</li>
            <li>• Jamendo API streaming</li>
            <li>• Internet radio directory</li>
            <li>• Podcast support</li>
            <li>• Custom station creation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
