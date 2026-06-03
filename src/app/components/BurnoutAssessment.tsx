import { useState } from "react";
import { useBurnout } from "../contexts/BurnoutContext";
import { ChevronRight } from "lucide-react";

interface BurnoutAssessmentProps {
  onComplete: () => void;
}

const QUESTIONS = [
  // Section A: Emotional Exhaustion (Questions 1-7)
  { id: 1, section: 'A', sectionTitle: 'Emotional Exhaustion', text: 'I feel emotionally drained by my work.' },
  { id: 2, section: 'A', sectionTitle: 'Emotional Exhaustion', text: 'Working with colleagues, clients, or stakeholders all day requires a great deal of effort.' },
  { id: 3, section: 'A', sectionTitle: 'Emotional Exhaustion', text: 'I feel like my job is breaking me down.' },
  { id: 4, section: 'A', sectionTitle: 'Emotional Exhaustion', text: 'I feel frustrated by my work.' },
  { id: 5, section: 'A', sectionTitle: 'Emotional Exhaustion', text: 'I feel I work too hard at my job.' },
  { id: 6, section: 'A', sectionTitle: 'Emotional Exhaustion', text: 'It stresses me too much to work in direct contact with people.' },
  { id: 7, section: 'A', sectionTitle: 'Emotional Exhaustion', text: "I feel like I'm at the end of my rope." },

  // Section B: Apathy/Cynicism (Questions 8-14)
  { id: 8, section: 'B', sectionTitle: 'Apathy / Cynicism', text: 'I feel I interact with colleagues or clients impersonally, as if they are tasks rather than people.' },
  { id: 9, section: 'B', sectionTitle: 'Apathy / Cynicism', text: 'I feel tired when I get up in the morning and have to face another workday.' },
  { id: 10, section: 'B', sectionTitle: 'Apathy / Cynicism', text: "I have the impression that colleagues or clients make me responsible for problems that aren't mine." },
  { id: 11, section: 'B', sectionTitle: 'Apathy / Cynicism', text: 'I am at the end of my patience by the end of the workday.' },
  { id: 12, section: 'B', sectionTitle: 'Apathy / Cynicism', text: "I really don't care what happens with certain tasks, projects, or client situations." },
  { id: 13, section: 'B', sectionTitle: 'Apathy / Cynicism', text: 'I have become more insensitive toward people since I started this job.' },
  { id: 14, section: 'B', sectionTitle: 'Apathy / Cynicism', text: "I'm afraid this job is making me less caring or less empathetic." },

  // Section C: Personal Achievement (Questions 15-22)
  { id: 15, section: 'C', sectionTitle: 'Personal Achievement', text: 'I accomplish many worthwhile things in my job.' },
  { id: 16, section: 'C', sectionTitle: 'Personal Achievement', text: 'I feel full of energy at work.' },
  { id: 17, section: 'C', sectionTitle: 'Personal Achievement', text: 'I am easily able to understand what colleagues or clients are feeling.' },
  { id: 18, section: 'C', sectionTitle: 'Personal Achievement', text: 'I handle my responsibilities and tasks effectively.' },
  { id: 19, section: 'C', sectionTitle: 'Personal Achievement', text: 'I manage emotionally challenging situations at work calmly.' },
  { id: 20, section: 'C', sectionTitle: 'Personal Achievement', text: 'Through my work, I feel I have a positive influence on people or outcomes.' },
  { id: 21, section: 'C', sectionTitle: 'Personal Achievement', text: 'I am able to create a relaxed and constructive atmosphere with colleagues or clients.' },
  { id: 22, section: 'C', sectionTitle: 'Personal Achievement', text: 'I feel refreshed after meaningful interactions at work.' }
];

const RESPONSE_OPTIONS = [
  { label: 'Never', value: 0 },
  { label: 'A Few Times per Year', value: 1 },
  { label: 'Once a Month', value: 2 },
  { label: 'A Few Times per Month', value: 3 },
  { label: 'Once a Week', value: 4 },
  { label: 'A Few Times per Week', value: 5 },
  { label: 'Every Day', value: 6 }
];

export function BurnoutAssessment({ onComplete }: BurnoutAssessmentProps) {
  const { currentQuestionIndex, addResponse, currentResponses, completeAssessment, setQuestionIndex } = useBurnout();
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleSelectOption = (value: number) => {
    setSelectedValue(value);
  };

  const handleNext = () => {
    if (selectedValue === null) return;

    addResponse(currentQuestion.id, selectedValue);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(currentQuestionIndex + 1);
      setSelectedValue(null);
    } else {
      // Complete assessment
      completeAssessment();
      onComplete();
    }
  };

  // Check if current question already has a response
  const existingResponse = currentResponses.find(r => r.questionId === currentQuestion.id);
  if (existingResponse && selectedValue === null) {
    setSelectedValue(existingResponse.value);
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-2xl mx-auto py-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p
                className="text-xs"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#8B5CF6',
                  fontWeight: 600,
                  letterSpacing: '0.05em'
                }}
              >
                BURNOUT ASSESSMENT
              </p>
              <p
                className="text-xs"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280',
                  fontWeight: 600
                }}
              >
                {currentQuestionIndex + 1} / {QUESTIONS.length}
              </p>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: '#E5E7EB' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)'
                }}
              />
            </div>
          </div>

          {/* Section Header */}
          <div className="mb-3 text-center">
            <p
              className="text-xs mb-1"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#9CA3AF',
                fontWeight: 600
              }}
            >
              Section {currentQuestion.section}
            </p>
            <p
              className="text-sm"
              style={{
                fontFamily: 'Lora, serif',
                color: '#8B5CF6',
                fontWeight: 500
              }}
            >
              {currentQuestion.sectionTitle}
            </p>
          </div>

          {/* Question */}
          <div
            className="p-4 rounded-3xl mb-4"
            style={{
              background: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 100%)',
              border: '2px solid #C4B5FD'
            }}
          >
            <p
              className="text-base leading-relaxed text-center"
              style={{
                fontFamily: 'Lora, serif',
                color: '#15113C',
                fontWeight: 500
              }}
            >
              {currentQuestion.text}
            </p>
          </div>

          {/* Response Options */}
          <div className="space-y-2 mb-4">
            {RESPONSE_OPTIONS.map((option) => {
              const isSelected = selectedValue === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelectOption(option.value)}
                  className="w-full p-3 rounded-2xl text-left transition-all"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #EDE9FE 0%, #E0E7FF 100%)'
                      : 'white',
                    border: `2px solid ${isSelected ? '#8B5CF6' : '#E5E7EB'}`,
                    fontFamily: 'Inter, sans-serif',
                    color: isSelected ? '#8B5CF6' : '#15113C',
                    fontWeight: isSelected ? 600 : 500,
                    fontSize: '14px'
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="pb-4" />
        </div>
      </div>

      {/* Continue Button */}
      <div
        className="flex-shrink-0 px-4 py-3"
        style={{
          background: 'linear-gradient(180deg, rgba(250, 245, 255, 0.8) 0%, rgba(250, 245, 255, 1) 100%)',
          borderTop: '1px solid rgba(229, 231, 235, 0.3)'
        }}
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleNext}
            disabled={selectedValue === null}
            className="w-full py-3 rounded-full transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            style={{
              background: selectedValue !== null
                ? 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)'
                : '#E5E7EB',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '15px'
            }}
          >
            {currentQuestionIndex < QUESTIONS.length - 1 ? 'Next' : 'Complete Assessment'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
