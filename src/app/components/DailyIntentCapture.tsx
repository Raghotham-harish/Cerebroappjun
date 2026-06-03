import { useState } from "react";
import { AnimatedLogo } from "./AnimatedLogo";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Intent {
  id: string;
  text: string;
  category: 'daily' | 'personal' | 'spiritual' | 'creative';
}

interface IntentCard {
  text: string;
  imageUrl: string;
  color: string;
}

interface DailyIntentCaptureProps {
  userName: string;
  onComplete: (intents: Intent[]) => void;
}

export function DailyIntentCapture({ userName, onComplete }: DailyIntentCaptureProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0-3 for 4 categories
  const [selectedIntents, setSelectedIntents] = useState<Intent[]>([]);

  // Intent cards for each category with image thumbnails
  const categoryData = [
    {
      id: 'daily',
      title: 'Daily Ritual',
      subtitle: 'Regulate Your Day',
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      cards: [
        { text: 'Be more productive', imageUrl: 'https://images.unsplash.com/photo-1598978483528-fd57466ab0ad?w=400', color: '#F59E0B' },
        { text: 'Build better habits', imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400', color: '#F59E0B' },
        { text: 'Improve sleep quality', imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400', color: '#F59E0B' },
        { text: 'Practice meditation', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', color: '#F59E0B' },
        { text: 'Manage stress better', imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400', color: '#F59E0B' },
        { text: 'Learn to pause', imageUrl: 'https://images.unsplash.com/photo-1533162507191-d90c625b2640?w=400', color: '#F59E0B' },
        { text: 'Emotional regulation', imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400', color: '#F59E0B' },
        { text: 'Morning routine', imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400', color: '#F59E0B' }
      ]
    },
    {
      id: 'personal',
      title: 'Personal Development',
      subtitle: 'Strengthen Your Self',
      color: '#3B82F6',
      bgColor: '#DBEAFE',
      cards: [
        { text: 'Build confidence', imageUrl: 'https://images.unsplash.com/photo-1515191107209-c28698631303?w=400', color: '#3B82F6' },
        { text: 'Make better decisions', imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=400', color: '#3B82F6' },
        { text: 'Develop self-awareness', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400', color: '#3B82F6' },
        { text: 'Work on shadow aspects', imageUrl: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=400', color: '#3B82F6' },
        { text: 'Strengthen willpower', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', color: '#3B82F6' },
        { text: 'Set boundaries', imageUrl: 'https://images.unsplash.com/photo-1483086431886-3590a88317fe?w=400', color: '#3B82F6' },
        { text: 'Overcome fears', imageUrl: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400', color: '#3B82F6' },
        { text: 'Growth mindset', imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400', color: '#3B82F6' }
      ]
    },
    {
      id: 'spiritual',
      title: 'Spiritual Development',
      subtitle: 'Connect to Your Center',
      color: '#10B981',
      bgColor: '#D1FAE5',
      cards: [
        { text: 'Find inner peace', imageUrl: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=400', color: '#10B981' },
        { text: 'Experience more love', imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400', color: '#10B981' },
        { text: 'Reduce anxiety', imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400', color: '#10B981' },
        { text: 'Deepen spiritual practice', imageUrl: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=400', color: '#10B981' },
        { text: 'Gain deeper insights', imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400', color: '#10B981' },
        { text: 'Practice gratitude', imageUrl: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=400', color: '#10B981' },
        { text: 'Connect with nature', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', color: '#10B981' },
        { text: 'Mindful presence', imageUrl: 'https://images.unsplash.com/photo-1533162507191-d90c625b2640?w=400', color: '#10B981' }
      ]
    },
    {
      id: 'creative',
      title: 'Creative Development',
      subtitle: 'Energize Your Mind',
      color: '#8B5CF6',
      bgColor: '#EDE9FE',
      cards: [
        { text: 'Boost imagination', imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400', color: '#8B5CF6' },
        { text: 'Think more creatively', imageUrl: 'https://images.unsplash.com/photo-1580566176138-daa588058b59?w=400', color: '#8B5CF6' },
        { text: 'Improve focus', imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400', color: '#8B5CF6' },
        { text: 'Express artistically', imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400', color: '#8B5CF6' },
        { text: 'Develop intuition', imageUrl: 'https://images.unsplash.com/photo-1475319122043-5ca9eeceefaf?w=400', color: '#8B5CF6' },
        { text: 'Flow state', imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400', color: '#8B5CF6' },
        { text: 'Innovative thinking', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', color: '#8B5CF6' },
        { text: 'Creative writing', imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400', color: '#8B5CF6' }
      ]
    }
  ];

  const currentCategory = categoryData[currentStep];

  const handleToggleCard = (cardText: string) => {
    const existing = selectedIntents.find(i => i.text === cardText && i.category === currentCategory.id);

    if (existing) {
      setSelectedIntents(selectedIntents.filter(i => i.id !== existing.id));
    } else {
      setSelectedIntents([
        ...selectedIntents,
        {
          id: Date.now().toString(),
          text: cardText,
          category: currentCategory.id as 'daily' | 'personal' | 'spiritual' | 'creative'
        }
      ]);
    }
  };

  const isCardSelected = (cardText: string): boolean => {
    return selectedIntents.some(i => i.text === cardText && i.category === currentCategory.id);
  };

  const handleNext = () => {
    if (currentStep < categoryData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - complete
      onComplete(selectedIntents);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCategorySelectionCount = (categoryId: string): number => {
    return selectedIntents.filter(i => i.category === categoryId).length;
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 50%, #EBF8FF 100%)'
      }}
    >
      {/* Logo Header */}
      <div className="pt-8 pb-4 flex justify-center px-4">
        <AnimatedLogo size={48} animate={false} />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-4">
          <div className="max-w-2xl mx-auto py-6">
            {/* Header */}
            <div className="mb-6 text-center">
              <h2
                className="text-2xl mb-2"
                style={{
                  fontFamily: 'Lora, serif',
                  fontWeight: 500,
                  color: '#15113C'
                }}
              >
                Good morning, {userName}
              </h2>
              <p
                className="text-base mb-4"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280'
                }}
              >
                What do you wish to accomplish today?
              </p>

              {/* Progress Indicator */}
              <div className="flex justify-center gap-2 mb-4">
                {categoryData.map((cat, idx) => (
                  <div
                    key={cat.id}
                    className="h-1 rounded-full transition-all"
                    style={{
                      width: '60px',
                      background: idx === currentStep ? currentCategory.color : idx < currentStep ? currentCategory.color : '#E5E7EB',
                      opacity: idx === currentStep ? 1 : idx < currentStep ? 0.6 : 0.3
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Category Header */}
            <div className="mb-6 text-center">
              <p
                className="text-xs mb-2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: currentCategory.color,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Suggestions
              </p>
              <h3
                className="text-xl mb-1"
                style={{
                  fontFamily: 'Lora, serif',
                  fontWeight: 600,
                  color: currentCategory.color
                }}
              >
                {currentCategory.title}
              </h3>
              <p
                className="text-sm"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280'
                }}
              >
                {currentCategory.subtitle}
              </p>
            </div>

            {/* 2-Column Grid of Intent Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {currentCategory.cards.map((card) => {
                const selected = isCardSelected(card.text);
                return (
                  <button
                    key={card.text}
                    onClick={() => handleToggleCard(card.text)}
                    className="p-4 rounded-3xl text-center transition-all relative"
                    style={{
                      background: selected ? currentCategory.bgColor : 'white',
                      border: `2px solid ${selected ? currentCategory.color : '#E5E7EB'}`
                    }}
                  >
                    {/* Selection Checkmark */}
                    {selected && (
                      <div
                        className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: currentCategory.color }}
                      >
                        <Check className="w-4 h-4" style={{ color: 'white' }} />
                      </div>
                    )}

                    {/* Image Thumbnail */}
                    <div
                      className="mb-3 w-full h-32 rounded-2xl overflow-hidden"
                      style={{
                        background: selected ? 'rgba(255,255,255,0.6)' : `${currentCategory.color}15`
                      }}
                    >
                      <ImageWithFallback
                        src={card.imageUrl}
                        alt={card.text}
                        className="w-full h-full"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    {/* Card Text */}
                    <p
                      className="text-sm leading-snug"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: selected ? currentCategory.color : '#15113C'
                      }}
                    >
                      {card.text}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selection Summary for Current Category */}
            {getCategorySelectionCount(currentCategory.id) > 0 && (
              <div
                className="p-4 rounded-2xl text-center"
                style={{
                  background: currentCategory.bgColor,
                  border: `2px solid ${currentCategory.color}`
                }}
              >
                <p
                  className="text-sm"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: currentCategory.color,
                    fontWeight: 600
                  }}
                >
                  {getCategorySelectionCount(currentCategory.id)} intention{getCategorySelectionCount(currentCategory.id) > 1 ? 's' : ''} selected
                </p>
              </div>
            )}

            <div className="pb-24" />
          </div>
        </div>

        {/* Sticky Navigation Buttons */}
        <div
          className="flex-shrink-0 px-4 py-4"
          style={{
            background: 'linear-gradient(180deg, rgba(250, 245, 255, 0.8) 0%, rgba(250, 245, 255, 1) 100%)',
            borderTop: '1px solid rgba(229, 231, 235, 0.3)'
          }}
        >
          <div className="max-w-2xl mx-auto flex gap-3">
            {/* Back Button */}
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-6 py-4 rounded-full flex items-center gap-2 transition-all"
                style={{
                  background: 'white',
                  border: '2px solid #E5E7EB',
                  color: '#6B7280',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px'
                }}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}

            {/* Next/Continue Button */}
            <button
              onClick={handleNext}
              className="flex-1 py-4 rounded-full transition-all flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px'
              }}
            >
              {currentStep < categoryData.length - 1 ? 'Next' : selectedIntents.length === 0 ? 'Skip All' : 'Continue'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Total Selection Count */}
          {selectedIntents.length > 0 && (
            <p
              className="text-center mt-3 text-sm"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#8B5CF6',
                fontWeight: 600
              }}
            >
              {selectedIntents.length} total intention{selectedIntents.length > 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
