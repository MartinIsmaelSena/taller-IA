import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'],
    });
  } catch {
    // Graceful fallback if canvas is not supported
  }
};
