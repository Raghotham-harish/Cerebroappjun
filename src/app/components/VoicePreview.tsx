import { useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "./ui/button";

interface VoicePreviewProps {
  voiceName: string;
  voiceId: string;
}

export function VoicePreview({ voiceName, voiceId }: VoicePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    // Mock voice preview - in production, this would play actual ElevenLabs voice sample
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Simulate playing for 3 seconds
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handlePlayPause}
        variant="ghost"
        size="sm"
        className="h-8 px-3 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {isPlaying ? (
          <>
            <Pause className="h-3 w-3 mr-1.5" />
            <span className="text-xs">Playing...</span>
          </>
        ) : (
          <>
            <Play className="h-3 w-3 mr-1.5" />
            <span className="text-xs">Preview Voice</span>
          </>
        )}
      </Button>
      
      {isPlaying && (
        <div className="flex gap-0.5 items-center">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-0.5 bg-purple-400 rounded-full"
              style={{
                height: '12px',
                animation: 'voice-wave 0.6s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}
      
      <style>{`
        @keyframes voice-wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
