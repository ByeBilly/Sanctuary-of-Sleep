import React, { useState, useEffect, useRef } from 'react';
import { consultTheOracle } from '../services/geminiService.ts';
import { OracleResponse } from '../types.ts';
import { Leaf, Loader2, MessageCircle, Volume2, VolumeX, StopCircle, AlertCircle, Headphones } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'grace';
  text?: string; // For user
  data?: OracleResponse; // For Grace
  timestamp: number;
}

const TypewriterText: React.FC<{ text: string; onComplete?: () => void }> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
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
    }, 40);

    return () => clearInterval(intervalId);
  }, [text, onComplete]);

  return <span>{displayedText}</span>;
};

const MOOD_CHIPS = [
  "Anxious", "Restless", "Heavy Heart", "Seeking Clarity", "Cannot Sleep", "Grief"
];

const PlantOracle: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // TTS State
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = useRef<SpeechSynthesis | null>(null);

  // Avatar State
  const [videoError, setVideoError] = useState(false);

  // Ambience State
  const [ambienceEnabled, setAmbienceEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAmbience = () => {
    if (!audioRef.current) return;
    if (ambienceEnabled) {
      audioRef.current.pause();
      setAmbienceEnabled(false);
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      setAmbienceEnabled(true);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synth.current = window.speechSynthesis;
    }
  }, []);

  const speak = (text: string) => {
    if (!synth.current || !voiceEnabled) return;

    // Cancel current
    synth.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // Attempt to find a soothing voice
    const voices = synth.current.getVoices();
    const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English'));
    if (femaleVoice) utterance.voice = femaleVoice;

    utterance.rate = 0.9; // Slower
    utterance.pitch = 0.95; // Slightly lower

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth.current) {
      synth.current.cancel();
      setIsSpeaking(false);
    }
  };

  const consult = async (text: string) => {
    if (!text.trim()) return;

    // 1. Reset states immediately
    setError('');
    stopSpeaking();
    setLoading(true);

    // 2. Add User Message
    const userMsg: ChatMessage = { sender: 'user', text: text, timestamp: Date.now() };
    setHistory(prev => [...prev, userMsg]);
    setInput('');

    try {
      const data = await consultTheOracle(userMsg.text!);
      const graceMsg: ChatMessage = { sender: 'grace', data, timestamp: Date.now() };
      setHistory(prev => [...prev, graceMsg]);

      if (voiceEnabled) {
        speak(data.meditationSnippet);
      }
    } catch (err: any) {
      // 3. Set Specific Error Message
      console.error(err);
      if (err.message?.includes('API_KEY') || err.toString().includes('400') || err.toString().includes('403')) {
        setError("Grace's spirit is willing, but the connection key is missing. Please ensure your API_KEY is set.");
      } else {
        setError("Grace's connection is faint right now. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    consult(input);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-sanctuary-earth/10 border border-sanctuary-gold/20 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]">
      {/* Decorative background element */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-sanctuary-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-sanctuary-leaf/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header with Circular Avatar */}
      <div className="flex flex-col items-center mb-8 relative z-10 shrink-0">

        {/* The Portal Container */}
        <div className="relative group mb-6">
          {/* Outer Glow Ring */}
          <div className={`absolute -inset-4 bg-gradient-to-tr from-sanctuary-gold via-sanctuary-leaf to-sanctuary-gold opacity-30 blur-xl rounded-full transition duration-1000 ${loading || isSpeaking ? 'animate-spin-slow opacity-60' : 'animate-pulse'}`}></div>

          {/* Circular Frame */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-[3px] border-sanctuary-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-sanctuary-dark ring-4 ring-sanctuary-dark/50">
            <img
              src="/grace1.jpg"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/GraceSpirit1/400/400";
              }}
              alt="Grace Avatar"
              className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-80' : 'opacity-100'}`}
            />
          </div>

          {/* Status Indicator Dot */}
          <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-2 border-sanctuary-dark transition-colors duration-500 z-20 ${loading ? 'bg-amber-400 animate-pulse' : (isSpeaking ? 'bg-green-500' : 'bg-sanctuary-gold')}`}></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-serif text-sanctuary-mist mb-1">Meet Grace</h2>
        <p className="text-sanctuary-gold text-xs tracking-[0.25em] uppercase font-bold">Digital Guide of the Sanctuary</p>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-6 pr-2 custom-scrollbar relative z-10">
        {history.length === 0 && (
          <p className="text-sanctuary-mist/80 italic text-center max-w-lg mx-auto leading-relaxed font-light text-lg mt-4">
            "Grace is my name, and I welcome you here... to a place where the whispers of time reappear. Tell me, dear friend, what weighs upon your spirit?"
          </p>
        )}

        {history.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'user' ? (
              <div className="bg-sanctuary-dark/60 border border-sanctuary-sage/40 rounded-t-xl rounded-bl-xl px-4 py-3 text-sanctuary-mist max-w-[80%]">
                {msg.text}
              </div>
            ) : (
              <div className="bg-sanctuary-dark/80 border border-sanctuary-gold/30 rounded-lg p-6 w-full shadow-xl animate-fade-in">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-32 h-32 shrink-0 rounded-lg overflow-hidden border border-sanctuary-sage/50">
                    <img src={`https://picsum.photos/seed/${msg.data?.plantName}/200/200`} className="w-full h-full object-cover opacity-90" alt={msg.data?.plantName} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-sanctuary-gold mb-1">{msg.data?.plantName}</h3>
                    <p className="text-xs text-sanctuary-leaf uppercase tracking-widest font-bold mb-3">{msg.data?.moodAlignment}</p>
                    <p className="text-sanctuary-mist/90 text-sm mb-4 leading-relaxed">{msg.data?.botanicalFact}</p>
                    <div className="bg-sanctuary-earth/20 p-4 rounded border-l-2 border-sanctuary-gold/50 italic text-sanctuary-mist font-serif text-lg">
                      "<TypewriterText text={msg.data?.meditationSnippet || ''} />"
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-sanctuary-dark/40 rounded-xl px-4 py-3 text-sanctuary-gold text-sm flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" /> Grace is gathering the oils...
            </div>
          </div>
        )}

        {/* Prominent Error Display */}
        {error && (
          <div className="flex justify-center animate-fade-in mt-4">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 max-w-md shadow-lg backdrop-blur-sm">
              <AlertCircle className="text-red-400 w-6 h-6 shrink-0" />
              <p className="text-red-200 font-serif italic text-center">
                {error}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls Area */}
      <div className="relative z-10 mt-auto">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => isSpeaking ? stopSpeaking() : setVoiceEnabled(!voiceEnabled)}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border transition-all ${voiceEnabled ? 'bg-sanctuary-gold/10 border-sanctuary-gold text-sanctuary-gold' : 'border-sanctuary-sage text-sanctuary-sage hover:text-sanctuary-mist'}`}
          >
            {isSpeaking ? <StopCircle size={14} /> : (voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />)}
            {isSpeaking ? "Stop Voice" : (voiceEnabled ? "Voice On" : "Voice Off")}
          </button>

          <button
            onClick={toggleAmbience}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border transition-all ${ambienceEnabled ? 'bg-sanctuary-gold/10 border-sanctuary-gold text-sanctuary-gold' : 'border-sanctuary-sage text-sanctuary-sage hover:text-sanctuary-mist'}`}
          >
            <Headphones size={14} />
            {ambienceEnabled ? "Ambience On" : "Ambience Off"}
          </button>

          <audio ref={audioRef} src="/audio.mp3" loop />
        </div>



        {/* Mood Chips */}
        <div className="flex flex-wrap gap-2 mb-4 justify-end">
          {MOOD_CHIPS.map((mood) => (
            <button
              key={mood}
              onClick={() => consult(mood)}
              disabled={loading}
              className="text-xs font-serif italic text-sanctuary-mist/70 border border-sanctuary-sage/30 rounded-full px-3 py-1 hover:bg-sanctuary-gold/20 hover:text-sanctuary-gold transition-colors disabled:opacity-30"
            >
              {mood}
            </button>
          ))}
        </div>

        <form onSubmit={handleConsult} className="flex flex-col sm:flex-row gap-4 bg-sanctuary-dark/40 p-4 rounded-xl border border-sanctuary-sage/20">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How is your spirit feeling today?"
              disabled={loading}
              className="w-full bg-sanctuary-dark/80 border border-sanctuary-sage text-sanctuary-mist rounded-lg pl-4 pr-10 py-4 focus:outline-none focus:border-sanctuary-gold focus:ring-1 focus:ring-sanctuary-gold transition-all placeholder-sanctuary-sage/70"
            />
            <MessageCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sanctuary-sage/50 w-5 h-5" />
          </div>

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-sanctuary-gold/90 hover:bg-sanctuary-gold text-sanctuary-dark font-serif font-bold px-8 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-sanctuary-gold/20"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Leaf className="w-5 h-5" />}
            <span>Ask Grace</span>
          </button>
        </form>
      </div>
    </div >
  );
};

export default PlantOracle;