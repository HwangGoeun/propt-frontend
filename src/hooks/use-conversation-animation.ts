import { useEffect, useState } from 'react';

interface UseConversationAnimationOptions {
  lines: string[];
  typingSpeed?: number;
  pauseBetweenLines?: number;
  pauseAfterComplete?: number;
  loop?: boolean;
}

export function useConversationAnimation({
  lines,
  typingSpeed = 30,
  pauseBetweenLines = 800,
  pauseAfterComplete = 3000,
  loop = true,
}: UseConversationAnimationOptions) {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (lines.length === 0) return;

    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        // Reset for new cycle
        setCompletedLines([]);
        setCurrentLineText('');
        setIsTyping(true);

        for (let lineIdx = 0; lineIdx < lines.length && !cancelled; lineIdx++) {
          const line = lines[lineIdx];

          // Type each character
          for (let charIdx = 0; charIdx <= line.length && !cancelled; charIdx++) {
            setCurrentLineText(line.slice(0, charIdx));
            await new Promise<void>((r) => setTimeout(r, typingSpeed));
          }
          if (cancelled) break;

          // Pause after line
          await new Promise<void>((r) => setTimeout(r, pauseBetweenLines));
          if (cancelled) break;

          // Move current line to completed
          setCompletedLines((prev) => [...prev, line]);
          setCurrentLineText('');
        }

        if (cancelled) break;
        setIsTyping(false);

        if (!loop) break;

        // Wait before restarting
        await new Promise<void>((r) => setTimeout(r, pauseAfterComplete));
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [lines, typingSpeed, pauseBetweenLines, pauseAfterComplete, loop]);

  return { completedLines, currentLineText, isTyping };
}
