'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react'

export default function MusicPlayer({ track }: { track: any }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.url
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [track])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
    setIsMuted(vol === 0)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!track) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-dark-secondary border-t border-dark-tertiary p-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          Select a track to start playing
        </div>
      </div>
    )
  }

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-dark-secondary border-t border-dark-tertiary p-4">
        <div className="max-w-7xl mx-auto">
          {/* Track Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4 flex-1">
              {track.artwork && (
                <img src={track.artwork} alt={track.title} className="w-14 h-14 rounded" />
              )}
              <div>
                <h3 className="font-semibold">{track.title}</h3>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-400 w-12 text-right">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-dark-tertiary rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${(currentTime / duration) * 100}%, #282828 ${(currentTime / duration) * 100}%, #282828 100%)`
              }}
            />
            <span className="text-xs text-gray-400 w-12">{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white transition">
                <Shuffle size={20} />
              </button>
              <button className="text-gray-400 hover:text-white transition">
                <Repeat size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white transition">
                <SkipBack size={24} />
              </button>
              <button
                onClick={togglePlay}
                className="bg-primary hover:bg-green-500 text-white rounded-full p-3 transition"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>
              <button className="text-gray-400 hover:text-white transition">
                <SkipForward size={24} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-gray-400 hover:text-white transition">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-dark-tertiary rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
