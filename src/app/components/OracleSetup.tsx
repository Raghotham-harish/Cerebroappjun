import { useState, useRef, useEffect } from "react";
import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight, Upload, Camera, Sparkles, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";
import { CreBroLogo } from "./CreBroLogo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { VoiceWaveOrb } from "./VoiceWaveOrb";

interface OracleSetupProps {
  userName: string;
  onComplete: (config: OracleConfig) => void;
  permissionGranted: boolean;
  onPermissionGranted: (granted: boolean) => void;
}

export interface OracleConfig {
  name: string;
  avatarUrl: string;
  voiceType: string;
}

const voiceOptions = [
  {
    id: 'calm-soothing',
    name: 'Calm & Soothing',
    gradient: 'linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)',
    waveColor: '#A78BFA'
  },
  {
    id: 'wise-grounded',
    name: 'Wise & Grounded',
    gradient: 'linear-gradient(135deg, #A7F3D0 0%, #6EE7B7 100%)',
    waveColor: '#34D399'
  },
  {
    id: 'uplifting-energetic',
    name: 'Uplifting & Energetic',
    gradient: 'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)',
    waveColor: '#FB923C'
  },
  {
    id: 'meditative-soft',
    name: 'Meditative & Soft',
    gradient: 'linear-gradient(135deg, #BFDBFE 0%, #93C5FD 100%)',
    waveColor: '#60A5FA'
  },
  {
    id: 'empathetic-caring',
    name: 'Empathetic & Caring',
    gradient: 'linear-gradient(135deg, #FBCFE8 0%, #F9A8D4 100%)',
    waveColor: '#F472B6'
  },
  {
    id: 'confident-strong',
    name: 'Confident & Strong',
    gradient: 'linear-gradient(135deg, #C7D2FE 0%, #A5B4FC 100%)',
    waveColor: '#818CF8'
  }
];

export function OracleSetup({ userName, onComplete, permissionGranted, onPermissionGranted }: OracleSetupProps) {
  const [step, setStep] = useState<'welcome' | 'name' | 'avatar' | 'voice'>('welcome');
  const [oracleName, setOracleName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(voiceOptions[0].id);
  const [selectedTheme, setSelectedTheme] = useState("purple-lavender");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Voice capturing state
  const [isListening, setIsListening] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [textValue, setTextValue] = useState("");
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  const themeOptions = [
    {
      id: 'purple-lavender',
      name: 'Lavender Dream',
      gradient: 'radial-gradient(circle at center, #E9D5FF 0%, #F3E8FF 100%)'
    },
    {
      id: 'blue-sky',
      name: 'Sky Serenity',
      gradient: 'radial-gradient(circle at center, #BFDBFE 0%, #DBEAFE 100%)'
    },
    {
      id: 'peach-pink',
      name: 'Soft Blossom',
      gradient: 'radial-gradient(circle at center, #FECACA 0%, #FED7AA 100%)'
    },
    {
      id: 'mint-green',
      name: 'Gentle Mint',
      gradient: 'radial-gradient(circle at center, #A7F3D0 0%, #D1FAE5 100%)'
    },
    {
      id: 'rose-pink',
      name: 'Rose Whisper',
      gradient: 'radial-gradient(circle at center, #FBCFE8 0%, #FCE7F3 100%)'
    },
    {
      id: 'cyan-aqua',
      name: 'Aqua Calm',
      gradient: 'radial-gradient(circle at center, #A5F3FC 0%, #CFFAFE 100%)'
    }
  ];

  const questions = {
    name: "What would you like to name your oracle?",
    avatar: "Would you like to add a face to your oracle?",
    voice: "Which voice personality speaks to you?"
  };

  // Text-to-Speech function
  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window && speakerEnabled) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Karen') ||
        voice.name.includes('Google US English')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speak question when step changes (only for setup steps, not welcome)
  useEffect(() => {
    if (step !== 'welcome' && 'speechSynthesis' in window && speakerEnabled) {
      const loadVoices = () => {
        setTimeout(() => {
          const question = step === 'name' ? questions.name : step === 'avatar' ? questions.avatar : questions.voice;
          speakQuestion(question);
        }, 500);
      };
      
      if (window.speechSynthesis.getVoices().length > 0) {
        loadVoices();
      } else {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, [step, speakerEnabled]);

  // Stop speech when speaker is disabled
  useEffect(() => {
    if (!speakerEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [speakerEnabled]);

  // Auto-start voice listening when permission is already granted and entering name step
  useEffect(() => {
    if (step === 'name' && permissionGranted && micEnabled && !isListening) {
      // Small delay to allow the question to be spoken first
      setTimeout(() => {
        startVoiceCapture();
      }, 1500);
    }
  }, [step, permissionGranted]);

  const startVoiceCapture = () => {
    setIsListening(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      const mockResponses = {
        name: ["Luna", "Sage", "Aurora", "Aura", "Zen"],
        avatar: [],
        voice: []
      };
      
      if (step === 'name') {
        const randomResponse = mockResponses.name[Math.floor(Math.random() * mockResponses.name.length)];
        setTextValue(randomResponse);
        setOracleName(randomResponse);
      }
      setIsListening(false);
    }, 2500);
  };

  const handleStartListening = () => {
    if (!permissionGranted) {
      setShowPermissionDialog(true);
    } else {
      startVoiceCapture();
    }
  };

  const handlePermissionAllow = () => {
    onPermissionGranted(true);
    setShowPermissionDialog(false);
    startVoiceCapture();
  };

  const handlePermissionDeny = () => {
    setShowPermissionDialog(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step === 'welcome') {
      setStep('name');
    } else if (step === 'name' && oracleName.trim()) {
      setStep('avatar');
    } else if (step === 'avatar') {
      setStep('voice');
    } else if (step === 'voice') {
      onComplete({
        name: oracleName,
        avatarUrl: avatarUrl || selectedTheme,
        voiceType: selectedVoice
      });
    }
  };

  const handleBack = () => {
    if (step === 'voice') {
      setStep('avatar');
    } else if (step === 'avatar') {
      setStep('name');
    } else if (step === 'name') {
      setStep('welcome');
    }
  };

  const handlePlayVoice = (voiceId: string) => {
    if (playingVoice === voiceId) {
      // Stop playing
      setPlayingVoice(null);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      // Start playing
      setPlayingVoice(voiceId);
      const voice = voiceOptions.find(v => v.id === voiceId);
      if (voice && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(`Hello, I am ${voice.name}.`);
        
        // Different voice characteristics for each voice type
        const voiceSettings: Record<string, { rate: number; pitch: number; voiceName?: string }> = {
          'calm-soothing': { rate: 0.85, pitch: 1.1 },
          'wise-grounded': { rate: 0.75, pitch: 0.85 },
          'uplifting-energetic': { rate: 1.1, pitch: 1.3 },
          'meditative-soft': { rate: 0.7, pitch: 1.2 },
          'empathetic-caring': { rate: 0.9, pitch: 1.15 },
          'confident-strong': { rate: 0.95, pitch: 0.9 }
        };
        
        const settings = voiceSettings[voiceId] || { rate: 0.9, pitch: 1.0 };
        utterance.rate = settings.rate;
        utterance.pitch = settings.pitch;
        utterance.volume = 1;
        
        // Try to select different system voices for variety
        const voices = window.speechSynthesis.getVoices();
        let selectedVoice;
        
        switch(voiceId) {
          case 'calm-soothing':
            selectedVoice = voices.find(v => 
              v.name.includes('Samantha') || 
              v.name.includes('Karen') || 
              v.name.includes('Google US English Female')
            );
            break;
          case 'wise-grounded':
            selectedVoice = voices.find(v => 
              v.name.includes('Victoria') || 
              v.name.includes('Serena') ||
              v.name.includes('Google UK English Female')
            );
            break;
          case 'uplifting-energetic':
            selectedVoice = voices.find(v => 
              v.name.includes('Tessa') || 
              v.name.includes('Moira') ||
              v.name.includes('Google US English')
            );
            break;
          case 'meditative-soft':
            selectedVoice = voices.find(v => 
              v.name.includes('Fiona') || 
              v.name.includes('Ava') ||
              v.name.includes('Google UK English')
            );
            break;
          case 'empathetic-caring':
            selectedVoice = voices.find(v => 
              v.name.includes('Nicky') || 
              v.name.includes('Allison') ||
              v.name.includes('Female')
            );
            break;
          case 'confident-strong':
            selectedVoice = voices.find(v => 
              v.name.includes('Susan') || 
              v.name.includes('Veena') ||
              v.name.includes('Google US English')
            );
            break;
        }
        
        // Fallback to any female voice
        if (!selectedVoice) {
          selectedVoice = voices.find(v => 
            v.name.includes('Female') || 
            v.name.includes('female')
          );
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        
        window.speechSynthesis.speak(utterance);
        
        // Auto-stop after speaking
        utterance.onend = () => {
          setPlayingVoice(null);
        };
        
        // Fallback timeout
        setTimeout(() => {
          setPlayingVoice(null);
        }, 5000);
      }
    }
  };

  const currentStepNumber = step === 'welcome' ? 0 : step === 'name' ? 1 : step === 'avatar' ? 2 : 3;
  const canProceed = step === 'welcome' || (step === 'name' && oracleName.trim()) || step === 'avatar' || step === 'voice';

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center" 
      style={{ 
        background: 'transparent',
        padding: '16px'
      }}
    >
      {/* Mock Permission Dialog */}
      {showPermissionDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 border border-gray-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Mic className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-2" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
                CereBro would like to access your microphone
              </h3>
              <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                This allows CereBro to capture your voice for a more personalized experience.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handlePermissionDeny}
                  className="flex-1 h-11 rounded-2xl border-2 border-gray-200 hover:border-gray-300 bg-white transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, color: '#15113C' }}
                >
                  Don't Allow
                </button>
                <button
                  onClick={handlePermissionAllow}
                  className="flex-1 h-11 rounded-2xl border-0 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, background: '#EDE9FE', color: '#15113C' }}
                >
                  Allow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Screen */}
      {step === 'welcome' && (
        <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-12">
            <CreBroLogo size={60} variant="icon" />
          </div>

          {/* Welcome Message */}
          <h1 
            className="text-5xl mb-4 leading-tight" 
            style={{ 
              fontFamily: 'Lora, serif', 
              fontWeight: 500, 
              color: '#15113C'
            }}
          >
            Welcome.
          </h1>
          
          <p 
            className="text-xl mb-8 max-w-sm leading-relaxed" 
            style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontWeight: 400,
              color: '#6B7280'
            }}
          >
            Let's create your personal oracle - a mirror to reflect your thoughts and guide your wellness journey.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleNext}
            className="px-8 py-4 rounded-full transition-all"
            style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontWeight: 500,
              background: '#EDE9FE',
              color: '#15113C',
              border: 'none'
            }}
          >
            Let's get started
          </button>
        </div>
      )}

      {/* Setup Screens */}
      {step !== 'welcome' && (
        <div className="relative z-10 w-full max-w-2xl">
          {/* Mic & Speaker Toggles */}
          {permissionGranted && (
            <div className="absolute top-0 right-0 z-20 flex gap-3">
              {/* Speaker Toggle */}
              <button
                onClick={() => setSpeakerEnabled(!speakerEnabled)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: speakerEnabled ? 'rgba(237, 233, 254, 0.8)' : 'rgba(243, 244, 246, 0.8)',
                  border: speakerEnabled ? '2px solid #A78BFA' : '2px solid #E5E7EB'
                }}
              >
                {speakerEnabled ? (
                  <Volume2 className="w-5 h-5" style={{ color: '#6366F1' }} />
                ) : (
                  <VolumeX className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                )}
              </button>

              {/* Mic Toggle */}
              <button
                onClick={() => {
                  setMicEnabled(!micEnabled);
                  if (!micEnabled && permissionGranted && step === 'name') {
                    startVoiceCapture();
                  } else if (micEnabled) {
                    setIsListening(false);
                  }
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: micEnabled ? 'rgba(237, 233, 254, 0.8)' : 'rgba(243, 244, 246, 0.8)',
                  border: micEnabled ? '2px solid #A78BFA' : '2px solid #E5E7EB'
                }}
              >
                {micEnabled ? (
                  <Mic className="w-5 h-5" style={{ color: '#6366F1' }} />
                ) : (
                  <MicOff className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                )}
              </button>
            </div>
          )}

          <div className="py-6">
            {/* Animated Logo at top */}
            <div className="flex justify-center mb-6">
              <AnimatedLogo size={64} animate={true} />
            </div>
            
            <div className="flex flex-col items-center text-center">
              {/* Progress indicator */}
              <div className="flex gap-2 mb-6">
                {[1, 2, 3].map((stepNum) => (
                  <div
                    key={stepNum}
                    className={`h-1.5 w-12 rounded-full transition-all ${
                      stepNum <= currentStepNumber ? 'bg-purple-400' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Step title */}
              <h2 className="text-3xl mb-3" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
                {currentStepNumber === 1 && "Name Your Oracle"}
                {currentStepNumber === 2 && "Give Your Oracle a Face"}
                {currentStepNumber === 3 && "Choose Your Oracle's Voice"}
              </h2>
              
              {step === 'name' && (
                <>
                  <p className="text-sm text-gray-600 mb-8 max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Give your oracle a name that resonates with you. This will be your companion on your wellness journey.
                  </p>
                  
                  {/* Voice Wave Orb */}
                  <div className="mb-8">
                    {!permissionGranted ? (
                      <button
                        onClick={handleStartListening}
                        disabled={isListening}
                        className="relative"
                      >
                        <VoiceWaveOrb isListening={isListening} size={200} showMicIcon={true} />
                      </button>
                    ) : (
                      <div className="relative">
                        <VoiceWaveOrb isListening={isListening && micEnabled} size={200} showMicIcon={false} />
                      </div>
                    )}
                  </div>

                  {/* Status text */}
                  {isListening && micEnabled && (
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Listening...
                      </p>
                    </div>
                  )}
                  
                  <div className="w-full max-w-md mb-8">
                    <input
                      type="text"
                      placeholder="Enter oracle name..."
                      value={oracleName}
                      onChange={(e) => {
                        setOracleName(e.target.value);
                        setTextValue(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && oracleName.trim()) {
                          handleNext();
                        }
                      }}
                      className="w-full px-6 py-4 rounded-full text-center text-base border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition-colors bg-white"
                      style={{ fontFamily: 'Inter, sans-serif', color: '#15113C' }}
                      autoFocus
                    />
                  </div>
                </>
              )}

              {step === 'avatar' && (
                <>
                  <p className="text-sm text-gray-600 mb-8 max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Upload a photo or choose a color theme that represents your oracle's personality.
                  </p>
                  
                  <div className="mb-8 w-full flex flex-col items-center">
                    {/* "Choose a color theme" text - Above slider */}
                    <p className="text-sm text-gray-600 mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Choose a color theme
                    </p>

                    {/* Theme Selector Cards with integrated avatar */}
                    <div className="w-full max-w-3xl mb-8">
                      <div 
                        className="relative pb-6" 
                        style={{ 
                          perspective: '1200px',
                          perspectiveOrigin: 'center center'
                        }}
                      >
                        <div 
                          className="flex gap-6 items-end overflow-x-auto scrollbar-hide" 
                          style={{ 
                            minWidth: '100%',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch',
                            paddingLeft: '20px',
                            paddingRight: '20px'
                          }}
                        >
                          {themeOptions.map((theme, index) => {
                            const centerIndex = themeOptions.findIndex(t => t.id === selectedTheme);
                            const distance = Math.abs(index - centerIndex);
                            const isCenter = selectedTheme === theme.id;
                            const scale = isCenter ? 1.08 : 0.85;
                            const opacity = isCenter ? 1 : 0.5;
                            
                            return (
                              <button
                                key={theme.id}
                                onClick={() => setSelectedTheme(theme.id)}
                                className="flex-shrink-0 transition-all duration-500 ease-out"
                                style={{
                                  transform: `scale(${scale}) translateZ(${isCenter ? '40px' : '0px'})`,
                                  opacity: opacity,
                                  transformStyle: 'preserve-3d',
                                  zIndex: isCenter ? 10 : 5 - distance
                                }}
                              >
                                <div
                                  className="relative rounded-3xl p-6 flex flex-col items-center justify-start transition-all duration-500"
                                  style={{
                                    width: '180px',
                                    height: '220px',
                                    background: theme.gradient,
                                    border: isCenter ? '3px solid #A78BFA' : '2px solid rgba(167, 139, 250, 0.3)',
                                    boxShadow: isCenter 
                                      ? '0 0 0 6px rgba(167, 139, 250, 0.2), 0 12px 32px rgba(167, 139, 250, 0.4)' 
                                      : '0 4px 12px rgba(0, 0, 0, 0.08)'
                                  }}
                                >
                                  {/* Profile image or initial inside card */}
                                  <div className="mt-4 mb-4">
                                    {avatarUrl ? (
                                      <div 
                                        className="w-20 h-20 rounded-full border-3 overflow-hidden"
                                        style={{ 
                                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                          border: '3px solid rgba(255, 255, 255, 0.9)'
                                        }}
                                      >
                                        <img src={avatarUrl} alt={oracleName} className="w-full h-full object-cover" />
                                      </div>
                                    ) : (
                                      <div 
                                        className="w-20 h-20 rounded-full flex items-center justify-center"
                                        style={{
                                          background: 'rgba(255, 255, 255, 0.7)',
                                          backdropFilter: 'blur(10px)',
                                          border: '3px solid rgba(255, 255, 255, 0.9)',
                                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                      >
                                        <span 
                                          className="text-3xl" 
                                          style={{ 
                                            fontFamily: 'Lora, serif',
                                            fontWeight: 400,
                                            color: '#9CA3AF'
                                          }}
                                        >
                                          {oracleName[0]?.toUpperCase()}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Oracle name - darker for better visibility */}
                                  <p 
                                    className="text-lg mb-2" 
                                    style={{ 
                                      fontFamily: 'Lora, serif',
                                      fontWeight: 500,
                                      color: '#6B7280'
                                    }}
                                  >
                                    {oracleName || 'Oracle'}
                                  </p>

                                  {/* Theme name - subtitle */}
                                  <p 
                                    className="text-xs px-3 py-1 rounded-full" 
                                    style={{ 
                                      fontFamily: 'Inter, sans-serif',
                                      fontWeight: 400,
                                      color: '#9CA3AF',
                                      background: 'rgba(255, 255, 255, 0.5)'
                                    }}
                                  >
                                    {theme.name}
                                  </p>

                                  {/* Selected indicator */}
                                  {isCenter && (
                                    <div 
                                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full"
                                      style={{ background: '#A78BFA' }}
                                    />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Scroll indicator dots */}
                      <div className="flex justify-center gap-1.5 mt-2">
                        {themeOptions.map((theme) => (
                          <div
                            key={theme.id}
                            className="w-1.5 h-1.5 rounded-full transition-all"
                            style={{
                              background: selectedTheme === theme.id ? '#A78BFA' : '#E5E7EB'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    {/* Upload/Take Photo buttons - Purple outlined style */}
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-12 py-3 rounded-full border-2 border-purple-400 hover:border-purple-500 transition-colors bg-white flex items-center gap-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, color: '#15113C' }}
                      >
                        <Upload className="w-5 h-5" />
                        <div className="flex flex-col items-start leading-tight">
                          <span>Upload</span>
                          <span>Photo</span>
                        </div>
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-12 py-3 rounded-full border-2 border-purple-400 hover:border-purple-500 transition-colors bg-white flex items-center gap-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, color: '#15113C' }}
                      >
                        <Camera className="w-5 h-5" />
                        <div className="flex flex-col items-start leading-tight">
                          <span>Take</span>
                          <span>Photo</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {step === 'voice' && (
                <>
                  <p className="text-base text-gray-600 mb-10 max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Choose a voice that resonates with you
                  </p>
                  
                  {/* Voice Grid - 2 rows x 3 columns */}
                  <div className="w-full max-w-2xl mb-12">
                    <div className="grid grid-cols-3 gap-6">
                      {voiceOptions.map((voice) => {
                        const isSelected = selectedVoice === voice.id;
                        const isPlaying = playingVoice === voice.id;
                        
                        return (
                          <div
                            key={voice.id}
                            onClick={() => setSelectedVoice(voice.id)}
                            className="relative rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer"
                            style={{
                              background: voice.gradient,
                              border: isSelected ? '3px solid #A78BFA' : '3px solid transparent',
                              boxShadow: isSelected 
                                ? '0 8px 32px rgba(167, 139, 250, 0.4)' 
                                : '0 4px 16px rgba(0, 0, 0, 0.08)',
                              transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                              width: '100%',
                              aspectRatio: '1',
                              minHeight: '160px'
                            }}
                          >
                            {/* Waveform visualization in center */}
                            <div className="absolute inset-0 flex items-center justify-center px-4">
                              <div className="flex items-center justify-center gap-[3px]">
                                {[...Array(16)].map((_, i) => {
                                  // Create a bell curve for heights
                                  const normalizedIndex = (i - 7.5) / 7.5;
                                  const bellCurve = Math.exp(-Math.pow(normalizedIndex * 2, 2));
                                  const baseHeight = 12 + bellCurve * 40;
                                  
                                  let opacity;
                                  if (isPlaying) {
                                    const time = Date.now() / 300;
                                    opacity = 0.2 + Math.abs(Math.sin(time + i * 0.4)) * 0.6;
                                  } else {
                                    opacity = 0.25 + bellCurve * 0.35;
                                  }
                                  
                                  return (
                                    <div
                                      key={i}
                                      className="rounded-full transition-all duration-200"
                                      style={{
                                        width: '4px',
                                        height: `${baseHeight}px`,
                                        background: voice.waveColor,
                                        opacity: opacity
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            </div>

                            {/* Play button - centered */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlayVoice(voice.id);
                                }}
                                className="w-14 h-14 rounded-full flex items-center justify-center transition-all pointer-events-auto"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.95)',
                                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                                  border: '2px solid rgba(255, 255, 255, 0.8)'
                                }}
                              >
                                {isPlaying ? (
                                  <div className="flex gap-1 items-center">
                                    <div 
                                      className="w-1 rounded-full"
                                      style={{ 
                                        height: '16px',
                                        background: voice.waveColor,
                                        animation: 'pulse 0.6s ease-in-out infinite'
                                      }}
                                    />
                                    <div 
                                      className="w-1 rounded-full"
                                      style={{ 
                                        height: '16px',
                                        background: voice.waveColor,
                                        animation: 'pulse 0.6s ease-in-out 0.2s infinite'
                                      }}
                                    />
                                    <div 
                                      className="w-1 rounded-full"
                                      style={{ 
                                        height: '16px',
                                        background: voice.waveColor,
                                        animation: 'pulse 0.6s ease-in-out 0.4s infinite'
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <svg 
                                    width="18" 
                                    height="18" 
                                    viewBox="0 0 24 24" 
                                    fill="none"
                                    style={{ marginLeft: '3px' }}
                                  >
                                    <path 
                                      d="M8 5v14l11-7L8 5z" 
                                      fill={voice.waveColor}
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>

                            {/* Selected indicator dot */}
                            {isSelected && (
                              <div 
                                className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
                                style={{ background: '#A78BFA' }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-3 w-full max-w-md">
                {currentStepNumber > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 h-14 rounded-full border-2 border-purple-200 hover:border-purple-300 bg-white transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, color: '#15113C' }}
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex-1 py-4 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    fontWeight: 600,
                    fontSize: '16px',
                    background: canProceed ? 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)' : '#E5E7EB',
                    color: 'white',
                    border: canProceed ? 'none' : '2px solid #D1D5DB'
                  }}
                >
                  {currentStepNumber === 3 ? "Complete Setup" : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}