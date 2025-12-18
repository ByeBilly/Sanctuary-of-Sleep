import React, { useState } from 'react';
import { Play, Clock, ArrowRight, Check } from 'lucide-react';
import { JOURNEYS } from '../src/content/journeys.ts';
import { LINKS } from '../src/config/links.ts';

const YouTubeSection: React.FC = () => {
  // Add safety check in case import fails or array is empty
  const latest = JOURNEYS && JOURNEYS.length > 0 ? JOURNEYS[0] : null;
  const popular = JOURNEYS && JOURNEYS.length > 1 ? JOURNEYS.slice(1, 4) : [];

  const [playlistAdded, setPlaylistAdded] = useState<string | null>(null);

  const handleAddToPlaylist = (id: string) => {
    setPlaylistAdded(id);
    setTimeout(() => setPlaylistAdded(null), 2000);
  };

  if (!latest) return null;

  return (
    <div className="w-full">
      {/* Latest Video Spotlight */}
      <div className="bg-sanctuary-earth/10 border-y border-sanctuary-sage/20 py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <span className="h-px w-8 bg-sanctuary-gold"></span>
            <span className="text-sanctuary-gold text-sm tracking-[0.2em] uppercase font-bold">Latest Release</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video Thumbnail / Player Placeholder */}
            <div className="relative group aspect-video rounded-lg overflow-hidden border border-sanctuary-sage/40 shadow-2xl">
              <img
                src={latest.imageUrl}
                alt="Latest Video Thumbnail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              {/* We Are The Ark Video Corner Badge */}
              <a
                href={LINKS.WE_ARE_THE_ARK}
                target="_blank"
                rel="noreferrer"
                className="absolute top-4 left-4 z-20 bg-sanctuary-dark/80 backdrop-blur border border-sanctuary-gold/40 px-3 py-1.5 rounded flex items-center gap-2 shadow-lg hover:bg-sanctuary-dark transition-colors cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-sanctuary-gold animate-pulse"></div>
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-sanctuary-mist">We Are The Ark</span>
                  <span className="text-[7px] text-sanctuary-sage">Supporter</span>
                </div>
              </a>

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <a
                  href={latest.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-20 h-20 bg-sanctuary-gold/90 rounded-full flex items-center justify-center text-sanctuary-dark hover:bg-white transition-all transform hover:scale-110 shadow-lg backdrop-blur-sm"
                >
                  <Play fill="currentColor" className="ml-1 w-8 h-8" />
                </a>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded text-xs font-bold text-white flex items-center gap-2">
                <Clock size={12} /> {latest.duration}
              </div>
            </div>

            {/* Video Details */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-sanctuary-mist mb-6 leading-tight">
                {latest.title} <br />
                {latest.subtitle && <span className="text-sanctuary-gold italic">{latest.subtitle}</span>}
              </h2>
              <p className="text-sanctuary-mist/70 text-lg leading-relaxed mb-8">
                {latest.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={latest.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-sanctuary-gold text-sanctuary-dark font-serif font-bold text-lg px-8 py-3 rounded hover:bg-white transition-colors flex items-center gap-2"
                >
                  <Play size={20} fill="currentColor" /> Watch Now
                </a>
                <button
                  onClick={() => handleAddToPlaylist(latest.id)}
                  className="text-sanctuary-mist hover:text-sanctuary-gold border border-sanctuary-sage px-6 py-3 rounded transition-colors uppercase tracking-widest text-xs font-bold flex items-center gap-2"
                >
                  {playlistAdded === latest.id ? <Check size={16} /> : "Add to Playlist"}
                  {playlistAdded === latest.id && <span className="text-[10px] ml-1">Added!</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Videos Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-2xl font-serif text-sanctuary-mist mb-2">Most Popular Journeys</h3>
            <p className="text-sanctuary-mist/50 text-sm">Curated paths to tranquility.</p>
          </div>
          <a href={LINKS.YOUTUBE_CHANNEL} className="hidden md:flex items-center gap-2 text-sanctuary-gold hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
            View Channel <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {popular.map((video, idx) => (
            <div key={idx} className="group cursor-pointer">
              <a href={video.youtubeUrl} target="_blank" rel="noreferrer">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4 border border-sanctuary-sage/30">
                  <img
                    src={video.imageUrl}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-white">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-sanctuary-gold/90 p-3 rounded-full text-sanctuary-dark">
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </a>
              <h4 className="text-lg font-serif text-sanctuary-mist group-hover:text-sanctuary-gold transition-colors mb-2">
                {video.title}
              </h4>
              <p className="text-sm text-sanctuary-mist/60 mb-2 line-clamp-2">{video.description}</p>
              {video.views && <span className="text-xs text-sanctuary-sage uppercase tracking-wider font-bold">{video.views}</span>}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a href={LINKS.YOUTUBE_CHANNEL} className="inline-flex items-center gap-2 text-sanctuary-gold hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
            View Channel <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default YouTubeSection;