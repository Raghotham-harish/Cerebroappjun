import { VoiceOrb } from "./VoiceOrb";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { WaveAnimation } from "./WaveAnimation";
import { AnimatedLogo } from "./AnimatedLogo";
import { VoiceWaveOrb } from "./VoiceWaveOrb";
import { useState } from "react";

interface ListeningScreenProps {
  onClose: () => void;
  transcript?: string;
}

export function ListeningScreen({ onClose, transcript }: ListeningScreenProps) {
  const [textValue, setTextValue] = useState('');

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      // Handle text input
      setTextValue('');
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #667EEA 0%, #764BA2 100%)' }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Voice Wave Orb with Logo */}
        <div className="mb-6">
          <VoiceWaveOrb isListening={true} size={280} />
        </div>
        
        <p 
          className="mt-4 mb-8 text-2xl text-white text-center"
          style={{ fontFamily: 'Lora, serif', fontWeight: 400 }}
        >
          {transcript ? transcript : "Listening for your thoughts..."}
        </p>
        
        {/* Text Input Option */}
        <div className="w-full max-w-md">
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && textValue.trim()) {
                handleTextSubmit();
              }
            }}
            placeholder="Or type here..."
            className="w-full px-6 py-4 rounded-full text-base border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:outline-none transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>

      {/* Cancel button */}
      <div className="pb-12">
        <Button
          onClick={onClose}
          variant="outline"
          className="px-12 h-14 bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-full backdrop-blur-sm text-base"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}