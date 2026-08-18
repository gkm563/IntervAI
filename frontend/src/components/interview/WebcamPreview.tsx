import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, User } from 'lucide-react';

interface WebcamPreviewProps {
  candidateName?: string;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const WebcamPreview: React.FC<WebcamPreviewProps> = ({
  candidateName = 'Candidate',
  isMuted = false,
  onToggleMute,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false, // Audio handled by VoiceEngine
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.warn('[WebcamPreview] Camera access denied or not available:', err);
        setHasPermission(false);
      }
    }

    if (cameraEnabled) {
      setupCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [cameraEnabled]);

  const toggleCamera = () => {
    if (cameraEnabled && streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setCameraEnabled(false);
    } else {
      setCameraEnabled(true);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shadow-xl">
      {cameraEnabled && hasPermission ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400">
            <User className="w-8 h-8" />
          </div>
          <div className="text-xs font-bold text-slate-300">{candidateName}</div>
          <p className="text-[10px] text-slate-500 max-w-[180px]">
            {cameraEnabled && hasPermission === false
              ? 'Camera permission denied or camera not found.'
              : 'Camera disabled.'}
          </p>
        </div>
      )}

      {/* Candidate Name Bar */}
      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/60 text-[11px] font-semibold text-white">
        {candidateName} (You)
      </div>

      {/* In-Preview Controls */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <button
          onClick={toggleCamera}
          className={`p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
            cameraEnabled
              ? 'bg-slate-900/80 text-white border-slate-700 hover:bg-slate-800'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
          }`}
          title={cameraEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
        >
          {cameraEnabled ? <Camera className="w-3.5 h-3.5" /> : <CameraOff className="w-3.5 h-3.5" />}
        </button>

        {onToggleMute && (
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
              !isMuted
                ? 'bg-slate-900/80 text-white border-slate-700 hover:bg-slate-800'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}
            title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          >
            {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
};
