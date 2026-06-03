import { Brain, Heart, Puzzle, Sparkles, Wind } from "lucide-react";

interface Game {
  id: string;
  name: string;
  description: string;
  builds: string;
  category: string;
  imageUrl: string;
  categoryColor: string;
}

interface GamesHubProps {
  onSelectGame: (gameId: string) => void;
}

export function GamesHub({ onSelectGame }: GamesHubProps) {
  const games: Game[] = [
    // Focus & Attention Games
    {
      id: "color-tap",
      name: "Color Tap",
      description: "Tap only the target color while distractions appear",
      builds: "Selective attention, impulse control",
      category: "Focus & Attention",
      imageUrl: "https://images.unsplash.com/photo-1590597290919-92928e631071?w=400",
      categoryColor: "#3B82F6"
    },
    {
      id: "breathing-rhythm",
      name: "Breathing Rhythm",
      description: "Follow expanding circles with breathing patterns",
      builds: "Calm focus, emotional regulation",
      category: "Focus & Attention",
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
      categoryColor: "#3B82F6"
    },
    {
      id: "sound-hunter",
      name: "Sound Hunter",
      description: "Listen for specific sounds among background noise",
      builds: "Auditory focus, concentration",
      category: "Focus & Attention",
      imageUrl: "https://images.unsplash.com/photo-1533162507191-d90c625b2640?w=400",
      categoryColor: "#3B82F6"
    },
    {
      id: "freeze-switch",
      name: "Freeze Switch",
      description: "Quickly switch between move and freeze commands",
      builds: "Reaction control, attention shifting",
      category: "Focus & Attention",
      imageUrl: "https://images.unsplash.com/photo-1638201546205-694b62d989cb?w=400",
      categoryColor: "#3B82F6"
    },
    {
      id: "distraction-dodge",
      name: "Distraction Dodge",
      description: "Complete tasks while popups try to interrupt",
      builds: "Sustained attention",
      category: "Focus & Attention",
      imageUrl: "https://images.unsplash.com/photo-1761034036989-24640be78e90?w=400",
      categoryColor: "#3B82F6"
    },

    // Memory Games
    {
      id: "pattern-recall",
      name: "Pattern Recall",
      description: "Memorize sequences of lights, symbols, or sounds",
      builds: "Working memory",
      category: "Memory",
      imageUrl: "https://images.unsplash.com/photo-1590845947667-381579052389?w=400",
      categoryColor: "#8B5CF6"
    },
    {
      id: "object-tray",
      name: "Object Tray",
      description: "Memorize objects before they disappear",
      builds: "Visual memory",
      category: "Memory",
      imageUrl: "https://images.unsplash.com/photo-1743767588082-e754fc9874be?w=400",
      categoryColor: "#8B5CF6"
    },
    {
      id: "story-builder",
      name: "Story Builder",
      description: "Remember and repeat details from growing stories",
      builds: "Sequential memory",
      category: "Memory",
      imageUrl: "https://images.unsplash.com/photo-1559713043-2563d981f58d?w=400",
      categoryColor: "#8B5CF6"
    },
    {
      id: "path-memory",
      name: "Path Memory",
      description: "Watch a path through maze then recreate it",
      builds: "Spatial memory",
      category: "Memory",
      imageUrl: "https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?w=400",
      categoryColor: "#8B5CF6"
    },
    {
      id: "emotion-match",
      name: "Emotion Match",
      description: "Match facial expressions after brief viewing",
      builds: "Social awareness + memory",
      category: "Memory",
      imageUrl: "https://images.unsplash.com/photo-1518708909080-704599b19972?w=400",
      categoryColor: "#8B5CF6"
    },

    // Resilience & Emotional Strength Games
    {
      id: "storm-balance",
      name: "Storm Balance",
      description: "Keep a boat balanced through waves",
      builds: "Emotional regulation, resilience",
      category: "Resilience & Emotional Strength",
      imageUrl: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=400",
      categoryColor: "#10B981"
    },
    {
      id: "thought-sort",
      name: "Thought Sort",
      description: "Sort thoughts into helpful, unhelpful, or unknown",
      builds: "Cognitive reframing",
      category: "Resilience & Emotional Strength",
      imageUrl: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400",
      categoryColor: "#10B981"
    },
    {
      id: "growth-garden",
      name: "Growth Garden",
      description: "Plants grow as you complete calming tasks",
      builds: "Consistency, positive habits",
      category: "Resilience & Emotional Strength",
      imageUrl: "https://images.unsplash.com/photo-1458501534264-7d326fa0ca04?w=400",
      categoryColor: "#10B981"
    },
    {
      id: "emotion-compass",
      name: "Emotion Compass",
      description: "Identify emotions and choose coping responses",
      builds: "Emotional intelligence",
      category: "Resilience & Emotional Strength",
      imageUrl: "https://images.unsplash.com/photo-1602192509154-0b900ee1f851?w=400",
      categoryColor: "#10B981"
    },

    // Cognitive Flexibility & Problem Solving
    {
      id: "rule-switch",
      name: "Rule Switch",
      description: "Game rules change mid-round unexpectedly",
      builds: "Adaptability, mental flexibility",
      category: "Cognitive Flexibility",
      imageUrl: "https://images.unsplash.com/photo-1605106702842-01a887a31122?w=400",
      categoryColor: "#F59E0B"
    },
    {
      id: "shape-shift-puzzle",
      name: "Shape Shift Puzzle",
      description: "Pieces change function or orientation",
      builds: "Flexible thinking",
      category: "Cognitive Flexibility",
      imageUrl: "https://images.unsplash.com/photo-1769162019638-cbe843e00a2b?w=400",
      categoryColor: "#F59E0B"
    },
    {
      id: "multi-task-relay",
      name: "Multi-Task Relay",
      description: "Handle two tasks at once without overload",
      builds: "Divided attention",
      category: "Cognitive Flexibility",
      imageUrl: "https://images.unsplash.com/photo-1680102231961-d80897db6543?w=400",
      categoryColor: "#F59E0B"
    },

    // Calmness & Mindfulness Games
    {
      id: "zen-sand",
      name: "Zen Sand",
      description: "Create patterns in sand with slow movements",
      builds: "Relaxation, mindfulness",
      category: "Calmness & Mindfulness",
      imageUrl: "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=400",
      categoryColor: "#EC4899"
    },
    {
      id: "cloud-drift",
      name: "Cloud Drift",
      description: "Guide clouds slowly through obstacles",
      builds: "Patience, stress reduction",
      category: "Calmness & Mindfulness",
      imageUrl: "https://images.unsplash.com/reserve/YEc7WB6ASDydBTw6GDlF_antalya-beach-lulu.jpg?w=400",
      categoryColor: "#EC4899"
    }
  ];

  const categories = [
    { name: "Focus & Attention", color: "#3B82F6", icon: Brain, count: 5 },
    { name: "Memory", color: "#8B5CF6", icon: Sparkles, count: 5 },
    { name: "Resilience & Emotional Strength", color: "#10B981", icon: Heart, count: 4 },
    { name: "Cognitive Flexibility", color: "#F59E0B", icon: Puzzle, count: 3 },
    { name: "Calmness & Mindfulness", color: "#EC4899", icon: Wind, count: 2 }
  ];

  return (
    <div
      className="min-h-screen pb-32"
      style={{
        background: 'linear-gradient(180deg, #FAF9F7 0%, #FFFFFF 100%)',
        padding: '16px',
        paddingBottom: '128px'
      }}
    >
      {/* Header */}
      <div className="pt-8 pb-6 px-2">
        <h1
          className="text-3xl mb-1"
          style={{
            fontFamily: 'Lora, serif',
            fontWeight: 500,
            color: '#15113C'
          }}
        >
          Mindful Games
        </h1>
        <p
          className="text-sm"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#9CA3AF'
          }}
        >
          Build focus, memory & emotional strength through play
        </p>
      </div>

      {/* Categories Summary */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.name}
              className="flex-shrink-0 px-3 py-2 rounded-full flex items-center gap-2"
              style={{
                background: `${cat.color}15`,
                border: `1px solid ${cat.color}40`
              }}
            >
              <Icon className="w-4 h-4" style={{ color: cat.color }} />
              <span
                className="text-xs whitespace-nowrap"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: cat.color,
                  fontWeight: 600
                }}
              >
                {cat.name} ({cat.count})
              </span>
            </div>
          );
        })}
      </div>

      {/* Game Cards by Category */}
      {categories.map((category) => {
        const categoryGames = games.filter(g => g.category === category.name);
        const Icon = category.icon;

        return (
          <div key={category.name} className="mb-6">
            {/* Category Header */}
            <div className="flex items-center gap-2 mb-3 px-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${category.color}20` }}
              >
                <Icon className="w-4 h-4" style={{ color: category.color }} />
              </div>
              <h2
                className="text-lg"
                style={{
                  fontFamily: 'Lora, serif',
                  fontWeight: 500,
                  color: '#15113C'
                }}
              >
                {category.name}
              </h2>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-2 gap-3">
              {categoryGames.map((game) => (
                <button
                  key={game.id}
                  onClick={() => onSelectGame(game.id)}
                  className="text-left rounded-3xl overflow-hidden transition-all active:scale-95"
                  style={{
                    background: 'white',
                    border: `2px solid ${category.color}20`
                  }}
                >
                  {/* Game Image */}
                  <div
                    className="w-full h-32 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url(${game.imageUrl})`,
                      backgroundColor: `${category.color}20`
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, transparent 0%, ${category.color}40 100%)`
                      }}
                    />
                  </div>

                  {/* Game Info */}
                  <div className="p-3">
                    <h3
                      className="text-sm mb-1"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: '#15113C',
                        lineHeight: 1.3
                      }}
                    >
                      {game.name}
                    </h3>
                    <p
                      className="text-xs mb-2"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#6B7280',
                        lineHeight: 1.4
                      }}
                    >
                      {game.description}
                    </p>
                    <div
                      className="inline-block px-2 py-1 rounded-full text-xs"
                      style={{
                        background: `${category.color}15`,
                        color: category.color,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600
                      }}
                    >
                      {game.builds}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
