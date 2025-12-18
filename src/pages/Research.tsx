import React, { useEffect } from 'react';

const Research: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-sanctuary-dark pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-serif text-sanctuary-mist mb-8">The Science of Deep Rest</h1>
        <div className="w-24 h-1 bg-sanctuary-gold mb-12"></div>

        <div className="space-y-16">
            <section>
                <h2 className="text-2xl font-serif text-sanctuary-gold mb-4">What we measure</h2>
                <p className="text-sanctuary-mist/80 text-lg leading-relaxed font-light">
                    Our audio journeys are not merely artistic expressions; they are calibrated instruments for the nervous system. We monitor Heart Rate Variability (HRV) and cortisol baselines to ensure that the combination of binaural frequencies and botanical narratives effectively shifts the listener from sympathetic arousal (fight or flight) to parasympathetic restoration (rest and digest).
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-serif text-sanctuary-gold mb-4">Methodology</h2>
                <p className="text-sanctuary-mist/80 text-lg leading-relaxed font-light mb-4">
                    We utilize a tri-phasic approach to sound design:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sanctuary-mist/70">
                    <li><strong>Descent:</strong> Gradual reduction of tempo to match a resting heart rate of 60 BPM.</li>
                    <li><strong>Immersion:</strong> Integration of "Green Noise"—frequencies found in nature (rustling leaves, distant water)—which have been shown to mask jarring environmental sounds without stimulating cognitive alertness.</li>
                    <li><strong>Anchor:</strong> The use of specific botanical history to engage the imagination, grounding the listener in a tangible, ancient reality rather than abstract anxiety.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-serif text-sanctuary-gold mb-4">Sources we cite</h2>
                <ul className="space-y-4 text-sanctuary-mist/70">
                    <li className="border-b border-sanctuary-sage/20 pb-2">
                        <span className="block font-bold text-sanctuary-mist/90">The effect of nature sounds on stress recovery</span>
                        <span className="italic text-sm">International Journal of Environmental Research and Public Health, 2010.</span>
                    </li>
                    <li className="border-b border-sanctuary-sage/20 pb-2">
                        <span className="block font-bold text-sanctuary-mist/90">Aromatherapy and the central nervous system</span>
                        <span className="italic text-sm">Asian Pacific Journal of Tropical Biomedicine, 2015.</span>
                    </li>
                    <li className="border-b border-sanctuary-sage/20 pb-2">
                        <span className="block font-bold text-sanctuary-mist/90">Biblical Botany: The historical use of Hyssop and Frankincense</span>
                        <span className="italic text-sm">Journal of Ethnopharmacology.</span>
                    </li>
                </ul>
            </section>

            <section className="bg-sanctuary-earth/10 p-6 rounded border border-sanctuary-sage/30">
                <h3 className="text-sm font-bold uppercase tracking-widest text-sanctuary-sage mb-2">Disclaimer</h3>
                <p className="text-sm text-sanctuary-mist/50">
                    The content provided by Sanctuary of Sleep is for relaxation and educational purposes only. It is not intended to diagnose, treat, or cure any medical condition. Please consult with a healthcare professional for medical advice.
                </p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Research;