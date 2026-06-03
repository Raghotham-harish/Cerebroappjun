import { Phone, MessageCircle } from "lucide-react";

export function CrisisSupportScreen() {
  const weekData = [
    { day: "Mon", zow: 72, color: "#D4A574" },
    { day: "Tue", zow: 65, color: "#C9A06B" },
    { day: "Wed", zow: 45, color: "#D89B7C" },
    { day: "Thu", zow: 38, color: "#E0A287" },
    { day: "Fri", zow: 25, color: "#D8998A" },
    { day: "Sat", zow: 15, color: "#D0918D" },
    { day: "Sun", zow: 8, color: "#C88B8F" }
  ];

  const pathway = [
    { step: "NOTICE", status: "complete", color: "#10B981" },
    { step: "BREATHE", status: "complete", color: "#10B981" },
    { step: "GROUND", status: "active", color: "#F59E0B" },
    { step: "REFLECT", status: "upcoming", color: "#6B7280" },
    { step: "INTEGRATE", status: "upcoming", color: "#6B7280" }
  ];

  const groundingSteps = [
    { number: 5, text: "Things you can SEE", completed: true },
    { number: 4, text: "Things you can TOUCH", completed: true },
    { number: 3, text: "Things you can HEAR", completed: true },
    { number: 2, text: "Things you can SMELL", completed: false },
    { number: 1, text: "Thing you can TASTE", completed: false }
  ];

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: '#1A1825',
        padding: '16px',
        paddingBottom: '96px'
      }}
    >
      {/* Header */}
      <div className="pt-8 pb-6 px-2">
        <p 
          className="text-xs mb-2"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#A1A1AA',
            letterSpacing: '0.05em'
          }}
        >
          SUPPORT SESSION
        </p>
        <h1 
          className="text-2xl mb-1"
          style={{ 
            fontFamily: 'Lora, serif',
            fontWeight: 500,
            color: 'white',
            lineHeight: 1.3
          }}
        >
          You're not alone
        </h1>
        <p 
          className="text-sm"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#71717A'
          }}
        >
          CereBro Support Pathway
        </p>
      </div>

      {/* Alert Card */}
      <div 
        className="p-5 rounded-3xl mb-4"
        style={{
          background: 'rgba(51, 47, 68, 0.6)',
          border: '2px solid #3E3A52'
        }}
      >
        <div className="flex items-start gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: '#D89B7C' }}
          >
            <div className="w-6 h-6 rounded" style={{ background: 'white' }} />
          </div>
          <div className="flex-1">
            <h3 
              className="text-base mb-1"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: 'white',
                fontWeight: 600
              }}
            >
              Elevated Stress · 5 days
            </h3>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#A1A1AA'
              }}
            >
              ZOW dropped: 72 → 4
            </p>
          </div>
        </div>

        {/* Week Calendar */}
        <div className="flex items-end justify-between gap-1.5 h-16 mb-3">
          {weekData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full rounded-t"
                style={{ 
                  height: `${data.zow}%`,
                  background: data.color
                }}
              />
              <p 
                className="text-xs mt-2"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#71717A',
                  fontSize: '10px'
                }}
              >
                {data.day.slice(0, 1)}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <p 
          className="text-sm italic text-center"
          style={{ 
            fontFamily: 'Lora, serif',
            color: '#A1A1AA',
            lineHeight: 1.6
          }}
        >
          "I've noticed patterns that suggest you may benefit from a deeper support conversation."
        </p>
      </div>

      {/* Intervention Pathway */}
      <div className="mb-4 px-2">
        <p 
          className="text-xs mb-3"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#A1A1AA',
            letterSpacing: '0.05em'
          }}
        >
          INTERVENTION PATHWAY
        </p>

        <div className="flex items-center justify-between">
          {pathway.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2"
                style={{ 
                  background: step.status === 'active' ? step.color : 
                               step.status === 'complete' ? step.color : 
                               'rgba(255,255,255,0.05)',
                  border: step.status === 'upcoming' ? '2px solid #3E3A52' : 'none'
                }}
              >
                {step.status === 'complete' && (
                  <div className="w-5 h-5 rounded" style={{ background: 'white' }} />
                )}
                {step.status === 'active' && (
                  <div className="w-5 h-5 rounded" style={{ background: 'white' }} />
                )}
              </div>
              <span 
                className="text-xs"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: step.status === 'upcoming' ? '#52525B' : 'white',
                  fontWeight: 600,
                  fontSize: '10px'
                }}
              >
                {step.step}
              </span>
              
              {i < pathway.length - 1 && (
                <div 
                  className="absolute h-0.5"
                  style={{ 
                    width: '40px',
                    left: `${(i * 20) + 10}%`,
                    top: '24px',
                    background: step.status === 'complete' ? '#10B981' : '#E5E7EB'
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grounding Exercise */}
      <div 
        className="p-5 rounded-3xl mb-6"
        style={{
          background: 'rgba(51, 47, 68, 0.4)',
          border: '2px solid #3E3A52'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <p 
            className="text-xs"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#A1A1AA',
              letterSpacing: '0.05em'
            }}
          >
            ACTIVE EXERCISE
          </p>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'conic-gradient(#06B6D4 0% 60%, #E5E7EB 60% 100%)'
            }}
          >
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: '#1A1825' }}
            >
              <span 
                className="text-sm"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: 'white',
                  fontWeight: 600
                }}
              >
                3/5
              </span>
            </div>
          </div>
        </div>

        <h3 
          className="text-xl mb-4"
          style={{ 
            fontFamily: 'Lora, serif',
            fontWeight: 500,
            color: 'white'
          }}
        >
          5-4-3-2-1 Grounding
        </h3>

        <div className="space-y-3">
          {groundingSteps.map((step, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-2xl"
              style={{
                background: step.completed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)',
                border: step.completed ? '2px solid #10B981' : 
                        i === 3 ? '2px solid #F59E0B' : '2px solid #3E3A52'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ 
                    background: step.completed ? '#10B981' : 
                               i === 3 ? '#F59E0B' : '#3E3A52'
                  }}
                >
                  <span 
                    className="text-base"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: 'white',
                      fontWeight: 700
                    }}
                  >
                    {step.number}
                  </span>
                </div>
                <p 
                  className="text-sm"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: step.completed ? '#A7F3D0' : 
                           i === 3 ? 'white' : '#71717A',
                    fontWeight: i === 3 ? 600 : 400
                  }}
                >
                  {step.text}
                </p>
              </div>

              {step.completed ? (
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: '#10B981' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: 'white' }} />
                </div>
              ) : (
                <div 
                  className="w-5 h-5 rounded-full"
                  style={{ 
                    border: `2px solid ${i === 3 ? '#F59E0B' : '#3E3A52'}` 
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div 
        className="fixed bottom-0 left-0 right-0 p-4 flex gap-3"
        style={{ background: 'linear-gradient(to top, #1A1825 80%, transparent)' }}
      >
        <button 
          className="flex-1 py-4 rounded-full flex items-center justify-center gap-2"
          style={{
            background: '#F59E0B',
            fontFamily: 'Inter, sans-serif',
            color: 'white',
            fontWeight: 600
          }}
        >
          <Phone className="w-5 h-5" />
          Book Synthesis Coach
        </button>
        <button 
          className="flex-1 py-4 rounded-full flex items-center justify-center gap-2"
          style={{
            background: 'rgba(139, 92, 246, 0.2)',
            border: '2px solid #8B5CF6',
            fontFamily: 'Inter, sans-serif',
            color: '#C4B5FD',
            fontWeight: 600
          }}
        >
          <MessageCircle className="w-5 h-5" />
          Talk to CereBro
        </button>
      </div>
    </div>
  );
}