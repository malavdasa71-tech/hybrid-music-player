'use client'

import { useState, useRef } from 'react'
import { Upload, Music, Play, Trash2, Plus } from 'lucide-react'

export default function LibraryView({ onPlay }: { onPlay: (track: any) => void }) {
  const [library, setLibrary] = useState<any[]>([])
  const [playlists, setPlaylists] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file)
        const track = {
          id: Date.now() + Math.random(),
          title: file.name.replace(/\.[^/.]+$/, ''),
          artist: 'Unknown Artist',
          url: url,
          file: file,
        }
        setLibrary((prev) => [...prev, track])
      }
    })
  }

  const removeTrack = (id: number) => {
    setLibrary((prev) => prev.filter((track) => track.id !== id))
  }

  const createPlaylist = () => {
    const name = prompt('Enter playlist name:')
    if (name) {
      setPlaylists((prev) => [...prev, { id: Date.now(), name, tracks: [] }])
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Library</h2>
        <div className="flex gap-2">
          <button
            onClick={createPlaylist}
            className="flex items-center gap-2 bg-dark-tertiary hover:bg-dark-tertiary/80 px-4 py-2 rounded-lg transition"
          >
            <Plus size={20} />
            New Playlist
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-primary hover:bg-green-500 px-4 py-2 rounded-lg transition"
          >
            <Upload size={20} />
            Upload Music
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      {library.length === 0 ? (
        <div className="text-center py-20">
          <Music size={64} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your library is empty</h3>
          <p className="text-gray-400 mb-6">Upload your music files to get started</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary hover:bg-green-500 px-6 py-3 rounded-lg transition"
          >
            Upload Your First Track
          </button>
        </div>
      ) : (
        <div className="grid gap-2">
          {library.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between bg-dark-secondary hover:bg-dark-tertiary p-4 rounded-lg transition group"
            >
              <div className="flex items-center gap-4 flex-1">
                <button
                  onClick={() => onPlay(track)}
                  className="bg-primary hover:bg-green-500 p-2 rounded-full transition opacity-0 group-hover:opacity-100"
                >
                  <Play size={20} fill="white" />
                </button>
                <div>
                  <h3 className="font-semibold">{track.title}</h3>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
              </div>
              <button
                onClick={() => removeTrack(track.id)}
                className="text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {playlists.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Playlists</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-dark-secondary hover:bg-dark-tertiary p-4 rounded-lg cursor-pointer transition"
              >
                <div className="bg-dark-tertiary w-full aspect-square rounded mb-3 flex items-center justify-center">
                  <Music size={48} className="text-gray-600" />
                </div>
                <h4 className="font-semibold">{playlist.name}</h4>
                <p className="text-sm text-gray-400">{playlist.tracks.length} tracks</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
