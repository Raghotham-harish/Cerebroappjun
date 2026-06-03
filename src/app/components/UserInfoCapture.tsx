import { useState, useEffect } from "react";
import * as React from "react";
import { VoiceRecorder } from "./VoiceRecorder";
import { Button } from "./ui/button";
import { Mic, MicOff, Keyboard } from "lucide-react";
import { WaveAnimation } from "./WaveAnimation";
import { AnimatedLogo } from "./AnimatedLogo";
import { VoiceWaveOrb } from "./VoiceWaveOrb";
import { Volume2, VolumeX } from "lucide-react";

interface UserInfo {
  name: string;
  gender: string;
}

interface UserInfoCaptureProps {
  onComplete: (userInfo: UserInfo) => void;
  permissionGranted: boolean;
  onPermissionGranted: (granted: boolean) => void;
}

// Mock Permission Dialog Component
function MockPermissionDialog({ onAllow, onDeny }: { onAllow: () => void; onDeny: () => void }) {
  return (
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
            This will allow CereBro to capture your voice responses for a more personalized experience.
          </p>
          <div className="flex gap-3 w-full">
            <Button
              onClick={onDeny}
              variant="outline"
              className="flex-1 h-11 bg-white border-gray-200 rounded-2xl text-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Don't Allow
            </Button>
            <Button
              onClick={onAllow}
              className="flex-1 h-11 bg-purple-100 hover:bg-purple-200 text-gray-900 rounded-2xl border-0"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Allow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UserInfoCapture({ onComplete, permissionGranted, onPermissionGranted }: UserInfoCaptureProps) {
  const [step, setStep] = useState<'name' | 'gender'>('name');
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [textValue, setTextValue] = useState('');
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [hasStartedVoice, setHasStartedVoice] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    gender: ''
  });

  const genderOptions = ['Male', 'Female', 'Prefer not to say'];

  const questions = {
    name: "Let's start with something simple - what should I call you?",
    gender: "Perfect! And how do you identify?"
  };

  const currentQuestion = questions[step];

  // Text-to-Speech function
  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window && speakerEnabled) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.1; // Slightly higher pitch for warmth
      utterance.volume = 1;
      
      // Try to use a female voice if available
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

  // Speak question when step changes
  useEffect(() => {
    // Wait for voices to load
    if ('speechSynthesis' in window && speakerEnabled) {
      const loadVoices = () => {
        setTimeout(() => {
          speakQuestion(currentQuestion);
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

  const handlePermissionAllow = () => {
    onPermissionGranted(true);
    setShowPermissionDialog(false);
    setHasStartedVoice(true);
    startVoiceCapture();
  };

  const handlePermissionDeny = () => {
    setShowPermissionDialog(false);
  };

  const startVoiceCapture = () => {
    setIsListening(true);
    
    // Simulate voice recognition with mock data
    setTimeout(() => {
      const mockResponses = {
        name: ["Alex", "Jordan", "Sam", "Taylor", "Morgan"],
        gender: ["Male", "Female", "Non-binary", "Prefer not to say"]
      };
      
      const randomResponse = mockResponses[step][Math.floor(Math.random() * mockResponses[step].length)];
      setUserInput(randomResponse);
      setIsListening(false);
      
      // Auto-submit after showing transcript
      setTimeout(() => {
        handleAnswer(randomResponse);
      }, 1000);
    }, 2500);
  };

  const handleVoiceTranscript = (transcript: string) => {
    setUserInput(transcript);
    handleAnswer(transcript);
  };

  const handleAnswer = (answer: string) => {
    const updatedInfo = { ...userInfo, [step]: answer };
    setUserInfo(updatedInfo);

    if (step === 'name') {
      setStep('gender');
      setUserInput("");
      setTextValue("");
    } else if (step === 'gender') {
      setTimeout(() => {
        onComplete(updatedInfo);
      }, 500);
    }
  };

  const handleGenderSelect = (gender: string) => {
    setUserInput(gender);
    setTextValue(gender);
    // Auto-submit after selection
    setTimeout(() => {
      handleAnswer(gender);
    }, 300);
  };

  const handleStartListening = () => {
    if (!permissionGranted) {
      setShowPermissionDialog(true);
    } else {
      startVoiceCapture();
    }
  };

  const handleContinue = () => {
    const input = textValue || userInput;
    if (!input) return;

    const updatedInfo = { ...userInfo, [step]: input };
    setUserInfo(updatedInfo);

    if (step === 'name') {
      setStep('gender');
      setUserInput('');
      setTextValue('');
      // Auto-start listening for next question if mic is enabled and voice was started
      if (micEnabled && hasStartedVoice && permissionGranted) {
        setTimeout(() => startVoiceCapture(), 500);
      }
    } else {
      onComplete(updatedInfo);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textValue.trim()) {
      setUserInput(textValue);
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center" 
      style={{ 
        background: 'transparent',
        padding: '16px'
      }}
    >
      {/* Mock permission dialog */}
      {showPermissionDialog && (
        <MockPermissionDialog 
          onAllow={handlePermissionAllow}
          onDeny={handlePermissionDeny}
        />
      )}

      {/* Mic Toggle - Only show after voice has been started */}
      {hasStartedVoice && (
        <div className="absolute top-6 right-6 z-20 flex gap-3">
          {/* Speaker Toggle */}
          <button
            onClick={() => setSpeakerEnabled(!speakerEnabled)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: speakerEnabled ? '#EDE9FE' : '#F3F4F6',
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
              if (!micEnabled && permissionGranted) {
                startVoiceCapture();
              } else if (micEnabled) {
                setIsListening(false);
              }
            }}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: micEnabled ? '#EDE9FE' : '#F3F4F6',
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
      
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        {/* Question text */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-3" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
            {currentQuestion}
          </h1>
          <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            {step === 'name' ? 'Speak or type - whatever feels comfortable' : 'I\'m listening, take your time'}
          </p>
        </div>

        {/* Voice wave orb - Only show mic icon on first question and not started */}
        <div className="mb-8">
          {step === 'name' && !hasStartedVoice ? (
            <button
              onClick={handleStartListening}
              disabled={isListening}
              className="relative"
            >
              <VoiceWaveOrb isListening={isListening} size={240} showMicIcon={true} />
            </button>
          ) : (
            <div className="relative">
              <VoiceWaveOrb isListening={isListening && micEnabled} size={240} showMicIcon={false} />
            </div>
          )}
        </div>

        {/* Status text */}
        {isListening && micEnabled && (
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              I'm all ears...
            </p>
          </div>
        )}

        {/* Display captured input */}
        {(userInput || textValue) && step === 'name' && (
          <p className="mb-6 text-base italic max-w-md text-center" style={{ fontFamily: 'Inter, sans-serif', color: '#15113C' }}>
            "{textValue || userInput}"
          </p>
        )}

        {/* Gender Selection Buttons - Only show on gender step */}
        {step === 'gender' ? (
          <div className="w-full max-w-md mb-6">
            <div className="flex flex-col gap-3">
              {genderOptions.map((gender) => (
                <button
                  key={gender}
                  onClick={() => handleGenderSelect(gender)}
                  className="w-full px-6 py-4 rounded-full text-center text-base border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 focus:border-purple-400 focus:outline-none transition-colors bg-white"
                  style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    fontWeight: 500,
                    color: '#15113C'
                  }}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Text Input - Show only on name step */}
            <div className="w-full max-w-md mb-6">
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && textValue.trim()) {
                    handleContinue();
                  }
                }}
                placeholder="Enter your name..."
                className="w-full px-6 py-4 rounded-full text-center text-base border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition-colors"
                style={{ fontFamily: 'Inter, sans-serif', color: '#15113C' }}
              />
            </div>

            {/* Continue button - Only on name step */}
            <button
              onClick={handleContinue}
              disabled={!textValue && !userInput}
              className="w-full max-w-md h-14 rounded-full transition-colors disabled:opacity-40"
              style={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: 500,
                background: textValue || userInput ? '#EDE9FE' : '#F3F4F6',
                color: textValue || userInput ? '#15113C' : '#9CA3AF',
                border: textValue || userInput ? 'none' : '2px solid #D1D5DB'
              }}
            >
              Continue
            </button>
          </>
        )}
        
        {/* Progress indicator */}
        <div className="flex gap-2 mt-8">
          <div className={`w-2 h-2 rounded-full ${step === 'name' ? 'bg-purple-400' : 'bg-gray-400'}`} />
          <div className={`w-2 h-2 rounded-full ${step === 'gender' ? 'bg-purple-400' : 'bg-gray-400'}`} />
        </div>
      </div>
    </div>
  );
}