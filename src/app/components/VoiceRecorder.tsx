import { useState, useRef } from "react";
import { Mic, MicOff, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { MockPermissionDialog } from "./MockPermissionDialog";

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  variant?: "button" | "orb";
}

export function VoiceRecorder({ onTranscript, disabled = false, variant = "button" }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleStartRecording = () => {
    if (!permissionGranted) {
      setShowPermissionDialog(true);
      return;
    }
    
    startRecording();
  };

  const handlePermissionAllow = () => {
    setPermissionGranted(true);
    setShowPermissionDialog(false);
    startRecording();
  };

  const handlePermissionDeny = () => {
    setShowPermissionDialog(false);
  };

  const startRecording = () => {
    setIsRecording(true);
    setTranscript("");
    
    // Mock recording - simulate voice capture
    // In production, this would use Web Speech API or ElevenLabs API
    setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    // Mock processing - simulate transcription
    setTimeout(() => {
      const mockTranscripts = [
        "I'm feeling a bit anxious today and need some guidance",
        "I had a great meditation session this morning",
        "Can you help me with my breathing exercises?",
        "I'm struggling with focus and concentration",
        "I feel grateful for the support I have in my life"
      ];
      
      const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
      setTranscript(randomTranscript);
      setIsProcessing(false);
      onTranscript(randomTranscript);
    }, 1000);
  };

  if (variant === "orb") {
    return (
      <>
        <button
          onClick={isRecording ? stopRecording : handleStartRecording}
          disabled={disabled || isProcessing}
          className={`relative rounded-full transition-all ${
            isRecording 
              ? "w-32 h-32 bg-gradient-to-br from-red-300 to-pink-300 animate-pulse" 
              : "w-28 h-28 bg-gradient-to-br from-purple-300 via-indigo-300 to-pink-300 hover:scale-105"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          style={{ boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3)' }}
        >
          {isProcessing ? (
            <Loader2 className="w-8 h-8 text-white animate-spin absolute inset-0 m-auto" />
          ) : isRecording ? (
            <MicOff className="w-8 h-8 text-white absolute inset-0 m-auto" />
          ) : (
            <Mic className="w-8 h-8 text-white absolute inset-0 m-auto" />
          )}
        </button>
        
        {showPermissionDialog && (
          <MockPermissionDialog 
            onAllow={handlePermissionAllow}
            onDeny={handlePermissionDeny}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Button
        onClick={isRecording ? stopRecording : handleStartRecording}
        disabled={disabled || isProcessing}
        variant={isRecording ? "default" : "ghost"}
        size="icon"
        className={`rounded-xl shrink-0 ${
          isRecording 
            ? "bg-gradient-to-r from-red-300 to-pink-300 text-gray-800 animate-pulse" 
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {isProcessing ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isRecording ? (
          <MicOff className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </Button>
      
      {showPermissionDialog && (
        <MockPermissionDialog 
          onAllow={handlePermissionAllow}
          onDeny={handlePermissionDeny}
        />
      )}
    </>
  );
}
