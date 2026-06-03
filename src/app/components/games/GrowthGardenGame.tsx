import { useState } from "react";
import { Trophy, RotateCcw, X, Flower2, Check } from "lucide-react";

interface GrowthGardenGameProps {
  onClose: () => void;
  onComplete: (score: number) => void;
}

interface GrowthTask {
  text: string;
  plantEmoji: string;
  growthStages: string[];
}

const GROWTH_TASKS: GrowthTask[] = [
  {
    text: "Take 3 deep breaths",
    plantEmoji: "🌱",
    growthStages: ["🌱", "🪴", "🌿", "🌻"]
  },
  {
    text: "Think of something you're grateful for",
    plantEmoji: "🌱",
    growthStages: ["🌱", "🪴", "🌺", "🌸"]
  },
  {
    text: "Stretch your body for 30 seconds",
    plantEmoji: "🌱",
    growthStages: ["🌱", "🪴", "🌷", "🌹"]
  },
  {
    text: "Drink a glass of water",
    plantEmoji: "🌱",
    growthStages: ["🌱", "🪴", "🌼", "🏵️"]
  },
  {
    text: "Say one kind thing to yourself",
    plantEmoji: "🌱",
    growthStages: ["🌱", "🪴", "🌵", "🌴"]
  },
  {
    text: "Name an emotion you're feeling",
    plantEmoji: "🌱",
    growthStages: ["🌱", "🪴", "🌾", "🪷"]
  },
  {
    text: "Stand up and move for 20 seconds",
    plantEmoji: "🌱",
    growthStages: ["🌱", "🪴", "🍀", "🌲"]
  },
  {
    text: "Think of someone who cares about you",
    plantEmoji: "🌱",
    growthStages: ["🌱", "🪴", "🌳", "🎋"]
  }
];

type GamePhase = "task" | "growing" | "finished";

export function GrowthGardenGame({ onClose, onComplete }: GrowthGardenGameProps) {
  const [phase, setPhase] = useState<GamePhase>("task");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<GrowthTask[]>([]);
  const [growthProgress, setGrowthProgress] = useState(0);

  const TOTAL_TASKS = 6;
  const selectedTasks = useState(() =>
    [...GROWTH_TASKS].sort(() => Math.random() - 0.5).slice(0, TOTAL_TASKS)
  )[0];

  const currentTask = selectedTasks[currentTaskIndex];

  const handleCompleteTask = () => {
    setPhase("growing");

    const growthInterval = setInterval(() => {
      setGrowthProgress(prev => {
        if (prev >= 3) {
          clearInterval(growthInterval);

          setTimeout(() => {
            const newCompleted = [...completedTasks, currentTask];
            setCompletedTasks(newCompleted);
            setGrowthProgress(0);

            if (currentTaskIndex < TOTAL_TASKS - 1) {
              setCurrentTaskIndex(prev => prev + 1);
              setPhase("task");
            } else {
              setPhase("finished");
            }
          }, 500);

          return 3;
        }
        return prev + 1;
      });
    }, 400);
  };

  const handleRestart = () => {
    setPhase("task");
    setCurrentTaskIndex(0);
    setCompletedTasks([]);
    setGrowthProgress(0);
  };

  if (phase === "finished") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)' }}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(229, 231, 235, 0.5)' }}>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)', border: '2px solid #E5E7EB' }}>
            <X className="w-5 h-5" style={{ color: '#6B7280' }} />
          </button>
          <h2 className="text-lg" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>Growth Garden</h2>
          <div className="w-10" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-y-auto">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)' }}>
            <Trophy className="w-12 h-12" style={{ color: 'white' }} />
          </div>

          <h1 className="text-4xl mb-2" style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: '#15113C' }}>Garden Complete!</h1>
          <p className="text-base mb-6" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280' }}>You nurtured your wellbeing</p>

          <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm w-full">
            {completedTasks.map((task, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl flex flex-col items-center"
                style={{ background: 'rgba(255,255,255,0.9)', border: '2px solid #10B981' }}
              >
                <span className="text-5xl">{task.growthStages[3]}</span>
              </div>
            ))}
          </div>

          <div className="w-full max-w-sm mb-8">
            <div className="p-4 rounded-3xl mb-3" style={{ background: 'white', border: '2px solid #E5E7EB' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280' }}>Self-care actions</span>
                <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#15113C', fontWeight: 600 }}>{completedTasks.length}</span>
              </div>
            </div>

            <p className="text-center text-sm px-4" style={{ fontFamily: 'Inter, sans-serif', color: '#10B981', fontWeight: 500 }}>
              Each small action helps you grow stronger! 🌱✨
            </p>
          </div>

          <div className="w-full max-w-sm space-y-3">
            <button onClick={handleRestart} className="w-full py-3 rounded-full flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)', color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              <RotateCcw className="w-5 h-5" />
              Plant New Garden
            </button>
            <button onClick={onClose} className="w-full py-3 rounded-full" style={{ background: 'white', border: '2px solid #E5E7EB', color: '#6B7280', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "growing") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)' }}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(229, 231, 235, 0.5)' }}>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)', border: '2px solid #E5E7EB' }}>
            <X className="w-5 h-5" style={{ color: '#6B7280' }} />
          </button>
          <div className="flex items-center gap-2">
            <Flower2 className="w-4 h-4" style={{ color: '#10B981' }} />
            <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#10B981', fontWeight: 600 }}>Growing...</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div
            className="mb-6 p-12 rounded-full animate-pulse"
            style={{ background: 'rgba(255,255,255,0.9)', border: '3px solid #10B981' }}
          >
            <span className="text-9xl">{currentTask.growthStages[growthProgress]}</span>
          </div>

          <h2 className="text-2xl text-center" style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: '#15113C' }}>
            Your plant is growing!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)' }}>
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(229, 231, 235, 0.5)' }}>
        <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)', border: '2px solid #E5E7EB' }}>
          <X className="w-5 h-5" style={{ color: '#6B7280' }} />
        </button>
        <div className="flex items-center gap-2">
          <Flower2 className="w-4 h-4" style={{ color: '#10B981' }} />
          <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#10B981', fontWeight: 600 }}>
            Plant {currentTaskIndex + 1}/{TOTAL_TASKS}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
            {selectedTasks.slice(0, TOTAL_TASKS).map((task, index) => {
              const completed = index < completedTasks.length;
              const current = index === currentTaskIndex;

              return (
                <div
                  key={index}
                  className="aspect-square rounded-2xl flex items-center justify-center"
                  style={{
                    background: completed ? 'rgba(255,255,255,0.9)' : current ? 'rgba(139, 92, 246, 0.1)' : 'rgba(229, 231, 235, 0.5)',
                    border: completed ? '2px solid #10B981' : current ? '2px dashed #8B5CF6' : '2px solid #E5E7EB'
                  }}
                >
                  <span className="text-4xl">
                    {completed ? task.growthStages[3] : current ? task.plantEmoji : "🌱"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <p className="text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif', color: '#10B981', fontWeight: 600 }}>
            Complete this self-care action:
          </p>

          <div className="p-6 rounded-3xl mb-8 max-w-md" style={{ background: 'rgba(255,255,255,0.9)', border: '3px solid #10B981' }}>
            <p className="text-xl text-center leading-relaxed mb-4" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
              {currentTask.text}
            </p>

            <div className="flex justify-center">
              <span className="text-6xl">{currentTask.plantEmoji}</span>
            </div>
          </div>

          <button
            onClick={handleCompleteTask}
            className="w-full max-w-sm py-4 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)', color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            <Check className="w-5 h-5" />
            I Did It!
          </button>

          <p className="text-xs mt-4 text-center px-6" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280' }}>
            Take your time — each small action counts 🌱
          </p>
        </div>
      </div>
    </div>
  );
}
