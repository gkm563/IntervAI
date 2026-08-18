# IntervAI — 3D Avatar & Visual Presence

## 1. Overview
IntervAI features a realistic, responsive 3D interviewer avatar powered by **Three.js**, **React Three Fiber (@react-three/fiber)**, and **Ready Player Me (RPM) glTF** character models.

## 2. Modes & Fallbacks
- **Full 3D Avatar Mode**: WebGL renderer with idle breathing loop, eye blinking, look-at mouse tracking, and real-time viseme lip-sync matching TTS speech frames.
- **2D Animated Canvas Fallback**: Lightweight animated sprite / vector interviewer for lower-end mobile devices and battery saver mode.
- **Text-Only Focus Mode**: Minimalist distraction-free interface for low-bandwidth environments.

## 3. Performance Budget
- glTF model size compressed with Draco / Meshopt under 3.5MB.
- Lazy-loaded after hero banner interaction to maintain LCP < 2.5s.
