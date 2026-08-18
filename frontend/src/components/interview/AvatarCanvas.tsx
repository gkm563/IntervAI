import React, { useEffect, useRef } from 'react';

interface AvatarCanvasProps {
  mouthOpen: number; // 0 to 1
  isSpeaking: boolean;
  interviewerName?: string;
}

export const AvatarCanvas: React.FC<AvatarCanvasProps> = ({
  mouthOpen,
  isSpeaking,
  interviewerName = 'Alex (AI Technical Bar-Raiser)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const stateRef = useRef({
    time: 0,
    blinkProgress: 0, // 0 = open, 1 = fully closed
    isBlinking: false,
    nextBlinkTime: 2.5,
    mouthCurrent: 0,
    headTilt: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTimestamp = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;
      const state = stateRef.current;
      state.time += delta;

      // Smooth mouth interpolation
      const targetMouth = isSpeaking ? Math.max(0.15, mouthOpen) : 0;
      state.mouthCurrent += (targetMouth - state.mouthCurrent) * Math.min(1, delta * 15);

      // Random natural blinking logic
      if (!state.isBlinking && state.time > state.nextBlinkTime) {
        state.isBlinking = true;
        state.blinkProgress = 0;
      }

      if (state.isBlinking) {
        state.blinkProgress += delta * 7; // Fast blink
        if (state.blinkProgress >= 1) {
          state.blinkProgress = 0;
          state.isBlinking = false;
          state.nextBlinkTime = state.time + 2 + Math.random() * 4;
        }
      }

      // Micro head motion / breathing
      state.headTilt = Math.sin(state.time * 1.5) * 0.02;
      const breathOffsetY = Math.sin(state.time * 2) * 3;

      // Canvas dimensions
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2 + breathOffsetY + 10;

      // 1. Clear background with deep futuristic radial gradient
      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createRadialGradient(centerX, centerY - 20, 10, centerX, centerY, width * 0.7);
      bgGrad.addColorStop(0, '#0f244c');
      bgGrad.addColorStop(0.7, '#070F22');
      bgGrad.addColorStop(1, '#050a17');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle background cyber grid particles
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 20, 140, 0, Math.PI * 2);
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(state.headTilt);

      // 2. Avatar Torso / Collar
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(0, 140, 90, 60, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Shirt collar accent
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(-30, 100);
      ctx.lineTo(0, 130);
      ctx.lineTo(30, 100);
      ctx.closePath();
      ctx.fill();

      // 3. Neck
      const neckGrad = ctx.createLinearGradient(-20, 40, 20, 90);
      neckGrad.addColorStop(0, '#cbd5e1');
      neckGrad.addColorStop(1, '#94a3b8');
      ctx.fillStyle = neckGrad;
      ctx.fillRect(-22, 40, 44, 60);

      // 4. Head Base (Face)
      const faceGrad = ctx.createRadialGradient(0, -10, 10, 0, 0, 80);
      faceGrad.addColorStop(0, '#f8fafc');
      faceGrad.addColorStop(0.8, '#e2e8f0');
      faceGrad.addColorStop(1, '#cbd5e1');

      ctx.fillStyle = faceGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 62, 75, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head Outline & Subtle Shadow
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 5. Stylized Hair
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(0, -25, 66, Math.PI * 0.85, Math.PI * 2.15);
      ctx.bezierCurveTo(45, -80, -45, -80, -58, -10);
      ctx.fill();

      // Modern glasses / AI HUD visor
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 2.5;
      // Left glass frame
      ctx.strokeRect(-42, -18, 34, 22);
      // Right glass frame
      ctx.strokeRect(8, -18, 34, 22);
      // Bridge
      ctx.beginPath();
      ctx.moveTo(-8, -8);
      ctx.lineTo(8, -8);
      ctx.stroke();

      // 6. Eyes (Inside Visor with Blinking)
      const blinkScale = 1 - Math.sin(state.blinkProgress * Math.PI); // 1 = open, 0 = closed

      // Left Eye
      ctx.save();
      ctx.translate(-25, -7);
      ctx.scale(1, Math.max(0.08, blinkScale));
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(2, -2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Right Eye
      ctx.save();
      ctx.translate(25, -7);
      ctx.scale(1, Math.max(0.08, blinkScale));
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(2, -2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Eyebrows
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-40, -26);
      ctx.lineTo(-12, -24);
      ctx.moveTo(12, -24);
      ctx.lineTo(40, -26);
      ctx.stroke();

      // Nose
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-4, 16);
      ctx.lineTo(4, 16);
      ctx.stroke();

      // 7. Dynamic Viseme Mouth
      const mouthHeight = Math.max(2, state.mouthCurrent * 22);
      const mouthWidth = 24 + state.mouthCurrent * 8;

      ctx.fillStyle = '#991b1b'; // Inner mouth
      ctx.beginPath();
      ctx.ellipse(0, 36, mouthWidth / 2, mouthHeight / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lips outline
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-mouthWidth / 2, 36);
      ctx.quadraticCurveTo(0, 36 - mouthHeight * 0.3, mouthWidth / 2, 36);
      ctx.quadraticCurveTo(0, 36 + mouthHeight * 0.7, -mouthWidth / 2, 36);
      ctx.stroke();

      ctx.restore();

      // Audio waveform halo pulse when speaking
      if (isSpeaking) {
        const pulse = (Math.sin(state.time * 8) + 1) / 2;
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.3 + pulse * 0.4})`;
        ctx.lineWidth = 2 + pulse * 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 10, 110 + pulse * 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [mouthOpen, isSpeaking]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#0B1B3A] to-[#070F22] border border-slate-700/80 shadow-2xl">
      <canvas
        ref={canvasRef}
        width={480}
        height={360}
        className="w-full h-auto max-h-[380px] object-contain"
      />

      {/* Overlay Status Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs shadow-lg">
          <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-sky-400 animate-ping' : 'bg-emerald-400'}`}></span>
          <span className="font-bold text-white text-[11px]">{interviewerName}</span>
        </div>

        {isSpeaking && (
          <div className="flex items-center gap-1 bg-sky-500/20 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-sky-500/40 text-sky-300 text-[10px] font-bold">
            <span className="inline-block w-1 h-3 bg-sky-400 animate-bounce"></span>
            <span className="inline-block w-1 h-4 bg-sky-400 animate-bounce [animation-delay:0.15s]"></span>
            <span className="inline-block w-1 h-2 bg-sky-400 animate-bounce [animation-delay:0.3s]"></span>
            <span className="ml-1">Speaking</span>
          </div>
        )}
      </div>
    </div>
  );
};
