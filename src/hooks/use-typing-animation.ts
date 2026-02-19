import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTypingAnimationOptions {
  sequences: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

export function useTypingAnimation({
  sequences,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
  loop = true,
}: UseTypingAnimationOptions) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (sequences.length === 0) return;

    const currentText = sequences[currentSequenceIndex];
    let phase: 'typing' | 'pausing' | 'deleting' = 'typing';
    let charIndex = 0;

    const tick = () => {
      if (phase === 'typing') {
        setIsTyping(true);
        if (charIndex <= currentText.length) {
          setDisplayText(currentText.slice(0, charIndex));
          charIndex++;
          timeoutRef.current = setTimeout(tick, typingSpeed);
        } else {
          phase = 'pausing';
          timeoutRef.current = setTimeout(tick, pauseDuration);
        }
      } else if (phase === 'pausing') {
        phase = 'deleting';
        setIsTyping(false);
        timeoutRef.current = setTimeout(tick, deletingSpeed);
      } else if (phase === 'deleting') {
        if (charIndex > 0) {
          charIndex--;
          setDisplayText(currentText.slice(0, charIndex));
          timeoutRef.current = setTimeout(tick, deletingSpeed);
        } else {
          const nextIndex = currentSequenceIndex + 1;
          if (nextIndex < sequences.length || loop) {
            setCurrentSequenceIndex(loop ? nextIndex % sequences.length : nextIndex);
          }
        }
      }
    };

    tick();
    return clear;
  }, [sequences, currentSequenceIndex, typingSpeed, deletingSpeed, pauseDuration, loop, clear]);

  return { displayText, isTyping, currentSequenceIndex };
}
