// Voice Engine utilizing standard browser Web Speech API (STT SpeechRecognition + TTS SpeechSynthesis)

export interface VoiceEngineCallbacks {
  onTranscriptChange: (transcript: string, isFinal: boolean) => void;
  onListeningStateChange: (isListening: boolean) => void;
  onSpeechStart: () => void;
  onSpeechEnd: () => void;
  onViseme: (mouthOpenAmount: number) => void; // 0 (closed) to 1 (wide open)
}

export class VoiceEngine {
  private recognition: any = null;
  private isListening = false;
  private synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private visemeInterval: number | null = null;
  private callbacks: VoiceEngineCallbacks;

  constructor(callbacks: VoiceEngineCallbacks) {
    this.callbacks = callbacks;
    this.initRecognition();
  }

  private initRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('[VoiceEngine] Web SpeechRecognition API is not supported in this browser.');
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.callbacks.onListeningStateChange(true);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.callbacks.onListeningStateChange(false);
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptChunk;
          } else {
            interimTranscript += transcriptChunk;
          }
        }

        const fullText = finalTranscript || interimTranscript;
        if (fullText) {
          this.callbacks.onTranscriptChange(fullText, Boolean(finalTranscript));
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn('[VoiceEngine] Recognition error:', event.error);
        if (event.error !== 'no-speech') {
          this.isListening = false;
          this.callbacks.onListeningStateChange(false);
        }
      };
    } catch (err) {
      console.error('[VoiceEngine] Failed to initialize SpeechRecognition:', err);
    }
  }

  public startListening(): boolean {
    if (!this.recognition) {
      this.initRecognition();
    }
    if (!this.recognition) return false;

    try {
      this.recognition.start();
      return true;
    } catch (err: any) {
      if (err.name !== 'InvalidStateError') {
        console.error('[VoiceEngine] startListening error:', err);
      }
      return false;
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.warn('[VoiceEngine] stopListening error:', err);
      }
    }
    this.isListening = false;
    this.callbacks.onListeningStateChange(false);
  }

  public speak(text: string, onComplete?: () => void) {
    if (!this.synth) {
      onComplete?.();
      return;
    }

    // Cancel any active utterance
    this.synth.cancel();
    if (this.visemeInterval) {
      clearInterval(this.visemeInterval);
      this.visemeInterval = null;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick natural voice if available
    const voices = this.synth.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      this.callbacks.onSpeechStart();
      // Start simulated viseme animation loop based on rhythm
      this.visemeInterval = window.setInterval(() => {
        // Vary mouth opening naturally between 0.2 and 0.85
        const mouthOpen = 0.2 + Math.random() * 0.65;
        this.callbacks.onViseme(mouthOpen);
      }, 90);
    };

    utterance.onend = () => {
      if (this.visemeInterval) {
        clearInterval(this.visemeInterval);
        this.visemeInterval = null;
      }
      this.callbacks.onViseme(0);
      this.callbacks.onSpeechEnd();
      onComplete?.();
    };

    utterance.onerror = () => {
      if (this.visemeInterval) {
        clearInterval(this.visemeInterval);
        this.visemeInterval = null;
      }
      this.callbacks.onViseme(0);
      this.callbacks.onSpeechEnd();
      onComplete?.();
    };

    this.synth.speak(utterance);
  }

  public stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.visemeInterval) {
      clearInterval(this.visemeInterval);
      this.visemeInterval = null;
    }
    this.callbacks.onViseme(0);
    this.callbacks.onSpeechEnd();
  }

  public destroy() {
    this.stopListening();
    this.stopSpeaking();
  }
}
