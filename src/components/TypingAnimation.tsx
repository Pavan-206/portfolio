import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface TypingAnimationProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      const fullText = texts[currentTextIndex];

      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentTextIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className={`${
      isDark ? 'text-gray-300' : 'text-gray-700'
    } text-2xl md:text-3xl`}>
      {currentText}
      <span className={`${
        isDark ? 'text-cyan-400' : 'text-blue-600'
      } animate-pulse`}>|</span>
    </span>
  );
};

export default TypingAnimation;