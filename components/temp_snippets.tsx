// Typewriter Component
import React, { useState, useEffect, useRef } from 'react';

const TypewriterText: React.FC<{ text: string; onComplete?: () => void }> = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        // Reset if text changes
        setDisplayedText('');
        indexRef.current = 0;

        const intervalId = setInterval(() => {
            if (indexRef.current < text.length) {
                setDisplayedText((prev) => prev + text.charAt(indexRef.current));
                indexRef.current += 1;
            } else {
                clearInterval(intervalId);
                if (onComplete) onComplete();
            }
        }, 40); // Speed of typing

        return () => clearInterval(intervalId);
    }, [text, onComplete]);

    return <span>{displayedText}</span>;
};

// Mood Chips Data
const MOOD_CHIPS = [
    "Anxious", "Restless", "Heavy Hearted", "Seeking Clarity", "Cannot Sleep", "Grief"
];
