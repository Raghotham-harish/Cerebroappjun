export function AnimatedBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Floating Gradient Orbs */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(196, 181, 253, 0.4) 0%, rgba(196, 181, 253, 0) 70%)',
          top: '10%',
          left: '20%',
          animation: 'float1 20s ease-in-out infinite'
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(251, 207, 232, 0.4) 0%, rgba(251, 207, 232, 0) 70%)',
          top: '60%',
          right: '15%',
          animation: 'float2 25s ease-in-out infinite'
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(191, 219, 254, 0.4) 0%, rgba(191, 219, 254, 0) 70%)',
          bottom: '20%',
          left: '10%',
          animation: 'float3 30s ease-in-out infinite'
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(254, 215, 170, 0.4) 0%, rgba(254, 215, 170, 0) 70%)',
          top: '40%',
          right: '40%',
          animation: 'float4 22s ease-in-out infinite'
        }}
      />

      {/* Morphing Background Blobs */}
      <div
        className="absolute w-full h-full opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(237, 233, 254, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(254, 243, 199, 0.2) 0%, transparent 50%)',
          animation: 'morph 40s ease-in-out infinite'
        }}
      />

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.1); }
          66% { transform: translate(-20px, 30px) scale(0.9); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(0.9); }
          66% { transform: translate(25px, -25px) scale(1.1); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(35px, 25px) scale(1.05); }
          66% { transform: translate(-30px, -20px) scale(0.95); }
        }
        
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, -30px) scale(0.9); }
          66% { transform: translate(40px, 20px) scale(1.1); }
        }
        
        @keyframes morph {
          0%, 100% {
            background: radial-gradient(ellipse at 30% 20%, rgba(237, 233, 254, 0.3) 0%, transparent 50%), 
                        radial-gradient(ellipse at 70% 80%, rgba(254, 243, 199, 0.2) 0%, transparent 50%);
          }
          50% {
            background: radial-gradient(ellipse at 70% 30%, rgba(254, 243, 199, 0.3) 0%, transparent 50%), 
                        radial-gradient(ellipse at 30% 70%, rgba(237, 233, 254, 0.2) 0%, transparent 50%);
          }
        }
      `}</style>
    </div>
  );
}
