"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Download, Check } from "lucide-react";
import { storeAudio } from "@/lib/media-storage";
import { getOnlineStatus } from "@/lib/sync-manager";

interface Track {
  name: string;
  path: string;
  cached?: boolean;
}

interface MusicPlayerProps {
  initialTracks?: Track[];
}

export function MusicPlayer({ initialTracks = [] }: MusicPlayerProps) {
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string>("");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Erro ao reproduzir áudio:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newTracks: Track[] = [];
      setError(""); // Limpa erros anteriores
      
      for (const file of Array.from(e.target.files)) {
        try {
          const url = URL.createObjectURL(file);
          const track: Track = {
            name: file.name,
            path: url,
            cached: false
          };
          
          // Tenta armazenar o áudio para uso offline
          const stored = await storeAudio(url, { 
            title: file.name,
            artist: "Biblioteca Local"
          });
          
          if (stored) {
            track.cached = true;
            console.log(`Música ${file.name} armazenada com sucesso`);
          }
          
          newTracks.push(track);
        } catch (error) {
          console.error(`Erro ao processar arquivo ${file.name}:`, error);
          setError(`Erro ao adicionar ${file.name}. Por favor, tente novamente.`);
        }
      }
      
      if (newTracks.length > 0) {
        setTracks(prev => [...prev, ...newTracks]);
        
        // Se não houver faixa atual, defina a primeira faixa adicionada como atual
        if (currentTrackIndex === -1) {
          setCurrentTrackIndex(tracks.length);
        }
      }
    }
  };

  const handleLoadFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = value[0];
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleEnded = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  return (
    <div className="p-4 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reprodutor de Música</h2>
      
      <div className="mb-6 space-y-2">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange} 
          accept="audio/*" 
          multiple 
          className="hidden" 
        />
        <Button onClick={handleLoadFiles} className="w-full bg-primary hover:bg-primary/90">
          Selecionar Músicas do Computador
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      
      {tracks.length > 0 && (
        <div className="space-y-4">
          <div className="h-40 overflow-y-auto border rounded-md p-2">
            {tracks.map((track, index) => (
              <div 
                key={index} 
                className={`p-2 cursor-pointer hover:bg-accent rounded ${index === currentTrackIndex ? 'bg-accent text-accent-foreground' : ''} flex justify-between items-center`}
                onClick={() => {
                  setCurrentTrackIndex(index);
                  setIsPlaying(true);
                }}
              >
                <span>{track.name}</span>
                {track.cached ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Download className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="text-center font-medium">
              {currentTrackIndex >= 0 && tracks[currentTrackIndex]?.name}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="my-2"
            />
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" onClick={handlePrevious}>
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
        </div>
      )}
      
      {currentTrackIndex >= 0 && tracks[currentTrackIndex] && (
        <audio
          ref={audioRef}
          src={tracks[currentTrackIndex].path}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}
    </div>
  );
}