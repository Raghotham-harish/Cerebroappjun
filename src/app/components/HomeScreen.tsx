import { useState } from "react";
import { MessageCircle, BookOpen, Brain, Settings, User, Keyboard } from "lucide-react";
import { CreBroLogo } from "./CreBroLogo";
import { VoiceWaveOrb } from "./VoiceWaveOrb";
import { ResponseScreen } from "./ResponseScreen";

interface HomeScreenProps {
  userName: string;
  onStartChat: (mode: string) => void;
}

export function HomeScreen({ userName, onStartChat }: HomeScreenProps) {
  const [isListening, setIsListening] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [textValue, setTextValue] = useState('');

  const handleOrbClick = () => {
    setIsListening(!isListening);
    // Simulate listening for 3 seconds
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setShowResponse(true);
      }, 3000);
    }
  };

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      setShowResponse(true);
      setTextValue('');
    }
  };

  if (showResponse) {
    return <ResponseScreen onBack={() => setShowResponse(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)' }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreBroLogo size={32} variant="icon" />
          <h1 className="text-xl" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
            CereBro
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Settings className="w-4 h-4 text-gray-700" />
          </button>
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <User className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Main content - Centered Voice Action */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4" style={{ fontFamily: 'Lora, serif', fontWeight: 500, lineHeight: 1.2, color: '#15113C' }}>
            Hello {userName}
          </h2>
          <p className="text-base text-gray-600 max-w-xs mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Tap to share your thoughts with your AI Oracle
          </p>
        </div>

        {/* Large Voice Orb - Primary Action */}
        <div className="mb-6 relative">
          <button
            onClick={handleOrbClick}
            className="relative"
            style={{ width: '240px', height: '240px' }}
          >
            <VoiceWaveOrb isListening={isListening} size={240} />
          </button>
        </div>

        {isListening ? (
          <p className="text-base text-gray-800 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            I'm listening with full attention...
          </p>
        ) : (
          <p className="text-base text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            Share what's on your mind
          </p>
        )}

        {/* Text Input - Always visible */}
        <div className="w-full max-w-md mb-4 px-6">
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Whatever's on your mind, I'm here for you..."
            rows={4}
            className="w-full px-6 py-4 rounded-3xl text-base border-2 border-purple-200 focus:border-purple-400 focus:outline-none resize-none transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', color: '#15113C' }}
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textValue.trim()}
            className="w-full h-14 mt-3 rounded-full transition-colors disabled:opacity-40"
            style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontWeight: 500,
              background: textValue.trim() ? '#EDE9FE' : '#F3F4F6',
              color: textValue.trim() ? '#15113C' : '#9CA3AF',
              border: textValue.trim() ? 'none' : '2px solid #D1D5DB'
            }}
          >
            Share
          </button>
        </div>
      </div>

      {/* Secondary Actions - Flat Bottom Section */}
      <div className="px-6 pb-8">
        <p className="text-xs text-gray-600 mb-4 px-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, letterSpacing: '0.5px' }}>
          QUICK ACTIONS
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onStartChat('chat')}
            className="flex flex-col items-center gap-3 p-5 bg-white border border-gray-200 hover:bg-gray-50 rounded-3xl transition-colors"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-indigo-700" />
            </div>
            <span className="text-sm text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Text Chat
            </span>
          </button>
          
          <button 
            onClick={() => onStartChat('book')}
            className="flex flex-col items-center gap-3 p-5 bg-white border border-gray-200 hover:bg-gray-50 rounded-3xl transition-colors"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-pink-700" />
            </div>
            <span className="text-sm text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Read Book
            </span>
          </button>
          
          <button 
            onClick={() => onStartChat('therapy')}
            className="flex flex-col items-center gap-3 p-5 bg-white border border-gray-200 hover:bg-gray-50 rounded-3xl transition-colors"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-700" />
            </div>
            <span className="text-sm text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Therapy
            </span>
          </button>
          
          <button 
            onClick={() => onStartChat('explore')}
            className="flex flex-col items-center gap-3 p-5 bg-white border border-gray-200 hover:bg-gray-50 rounded-3xl transition-colors"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-sm text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Explore
            </span>
          </button>
          
          <button 
            onClick={() => onStartChat('keyboard')}
            className="flex flex-col items-center gap-3 p-5 bg-white border border-gray-200 hover:bg-gray-50 rounded-3xl transition-colors"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full flex items-center justify-center">
              <Keyboard className="w-6 h-6 text-gray-700" />
            </div>
            <span className="text-sm text-gray-900" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Keyboard
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}