import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  ArrowLeft,
  Search,
  CheckCircle2,
} from 'lucide-react';
import {
  Episode,
  CharacterProfile,
  EPISODES,
  GALLERY_ITEMS,
  GalleryItem,
  Language,
} from '../data/tomAndJerryData';

interface EpisodeModalProps {
  episode: Episode | null;
  onClose: () => void;
  onSelectEpisode: (ep: Episode) => void;
  lang: Language;
}

export const EpisodePlayerModal: React.FC<EpisodeModalProps> = ({
  episode,
  onClose,
  onSelectEpisode,
  lang,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFrameIdx, setActiveFrameIdx] = useState(0);
  const [showComicPop, setShowComicPop] = useState(false);

  const isAr = lang === 'ar';

  useEffect(() => {
    setActiveFrameIdx(0);
    setIsPlaying(true);
  }, [episode?.id]);

  useEffect(() => {
    if (!episode || !isPlaying) return;
    const timer = setInterval(() => {
      setActiveFrameIdx((prev) => (prev + 1) % episode.frames.length);
      setShowComicPop(true);
      setTimeout(() => setShowComicPop(false), 900);
    }, 3500);
    return () => clearInterval(timer);
  }, [episode, isPlaying]);

  return (
    <AnimatePresence>
      {episode && (
        <motion.div
          key="episode-modal-backdrop"
          dir={isAr ? 'rtl' : 'ltr'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#27272F]/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="episode-modal-card"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="relative w-full max-w-3xl rounded-3xl bg-[#FCF3EC] border border-[#27272F]/10 shadow-2xl overflow-hidden text-[#27272F]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#F8EFDE] border-b border-[#27272F]/10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#27272F]/65">
                  {isAr ? episode.codeAr : episode.code} · {episode.year}
                </span>
                <span className="text-[#27272F]/30">·</span>
                <span className="text-xs font-semibold text-[#27272F]/80">
                  {isAr ? `إخراج: ${episode.directorAr}` : `Directed by ${episode.director}`}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label={isAr ? 'إغلاق المشغل' : 'Close episode player'}
                className="w-9 h-9 rounded-full bg-white/80 hover:bg-[#F5C729] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-[#27272F]" />
              </button>
            </div>

            {/* Theater Stage */}
            <div className="relative bg-[#1E1E24] aspect-[16/9] w-full overflow-hidden select-none">
              <img
                src={episode.thumbnail}
                alt={isAr ? episode.titleAr : episode.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Comic Onomatopoeia Pop */}
              <AnimatePresence>
                {showComicPop && !isMuted && (
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0, rotate: -14 }}
                    animate={{ scale: 1, opacity: 1, rotate: -6 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    className="absolute top-5 right-6 bg-[#F5C729] text-[#27272F] font-script text-xl sm:text-2xl px-4 py-1.5 rounded-2xl shadow-lg"
                  >
                    {isAr ? episode.soundEffectAr : episode.soundEffect}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Scrubber & Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#F5C729] mb-1">
                      {isAr
                        ? `المشهد ${activeFrameIdx + 1} من ${episode.frames.length} · ${
                            (episode.frames[activeFrameIdx] || episode.frames[0]).actionTagAr
                          } (${(episode.frames[activeFrameIdx] || episode.frames[0]).timestamp})`
                        : `Scene ${activeFrameIdx + 1} of ${episode.frames.length} · ${
                            (episode.frames[activeFrameIdx] || episode.frames[0]).actionTag
                          } (${(episode.frames[activeFrameIdx] || episode.frames[0]).timestamp})`}
                    </div>
                    <p className="text-white text-sm sm:text-base font-medium max-w-xl">
                      {isAr
                        ? (episode.frames[activeFrameIdx] || episode.frames[0]).captionAr
                        : (episode.frames[activeFrameIdx] || episode.frames[0]).caption}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                      className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-4 py-2 rounded-full bg-[#F5C729] hover:bg-[#f7d04b] text-[#27272F] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                      {isPlaying
                        ? isAr
                          ? 'إيقاف مؤقت'
                          : 'Pause Chase'
                        : isAr
                        ? 'متابعة المطاردة'
                        : 'Resume Chase'}
                    </button>
                  </div>
                </div>

                {/* Scene Step Bars */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {episode.frames.map((frame, idx) => (
                    <button
                      key={frame.timestamp}
                      onClick={() => setActiveFrameIdx(idx)}
                      className="group text-start cursor-pointer"
                    >
                      <div className="h-1.5 rounded-full overflow-hidden bg-white/25">
                        <div
                          className={`h-full transition-all duration-300 ${
                            idx === activeFrameIdx
                              ? 'w-full bg-[#F5C729]'
                              : idx < activeFrameIdx
                              ? 'w-full bg-white/70'
                              : 'w-0'
                          }`}
                        />
                      </div>
                      <span className="text-[11px] text-white/75 group-hover:text-white mt-1 inline-block">
                        {frame.timestamp} · {isAr ? frame.actionTagAr : frame.actionTag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Episode Details & Quick Switcher */}
            <div className="p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-[#27272F]">
                    {isAr ? episode.titleAr : episode.title}
                  </h3>
                  <p className="text-sm text-[#27272F]/80 mt-1.5 leading-relaxed max-w-xl">
                    {isAr ? episode.synopsisAr : episode.synopsis}
                  </p>
                </div>
                <div className="bg-[#F8EFDE] rounded-2xl p-3.5 shrink-0 sm:max-w-[240px]">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#27272F]/55">
                    {isAr ? 'المقلب الأبرز' : 'Signature Gag'}
                  </div>
                  <div className="text-xs font-bold text-[#27272F] mt-1">
                    {isAr ? episode.iconicGagAr : episode.iconicGag}
                  </div>
                </div>
              </div>

              {/* Up Next Strip */}
              <div className="pt-3 border-t border-[#27272F]/10">
                <div className="text-xs font-bold uppercase tracking-wider text-[#27272F]/55 mb-2.5">
                  {isAr ? 'اختر حلقة أخرى للمشاهدة' : 'Switch Chronicle Episode'}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {EPISODES.slice(0, 3).map((ep) => {
                    const active = ep.id === episode.id;
                    return (
                      <button
                        key={ep.id}
                        onClick={() => onSelectEpisode(ep)}
                        className={`flex items-center gap-2.5 p-2 rounded-xl text-start transition-all cursor-pointer ${
                          active
                            ? 'bg-[#FCE4B6] ring-2 ring-[#F5C729]'
                            : 'bg-[#F8EFDE]/70 hover:bg-[#FCE4B6]/60'
                        }`}
                      >
                        <img
                          src={ep.thumbnail}
                          alt={isAr ? ep.titleAr : ep.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-8 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#27272F] truncate">
                            {isAr ? ep.titleAr : ep.title}
                          </div>
                          <div className="text-[10px] text-[#27272F]/65">
                            {isAr ? ep.codeAr : ep.code}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface CharacterModalProps {
  character: CharacterProfile | null;
  onClose: () => void;
  onSwitchCharacter: (id: 'tom' | 'jerry') => void;
  onWatchFeatured: () => void;
  lang: Language;
}

export const CharacterDossierModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
  onSwitchCharacter,
  onWatchFeatured,
  lang,
}) => {
  const isAr = lang === 'ar';

  return (
    <AnimatePresence>
      {character && (
        <motion.div
          key="character-modal-backdrop"
          dir={isAr ? 'rtl' : 'ltr'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#27272F]/65 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key={character.id}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="relative w-full max-w-2xl rounded-3xl bg-[#FCF3EC] border border-[#27272F]/10 shadow-2xl overflow-hidden text-[#27272F]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Banner */}
            <div
              className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6"
              style={{ backgroundColor: character.cardBg }}
            >
              <button
                onClick={onClose}
                aria-label={isAr ? 'إغلاق البطاقة' : 'Close character profile'}
                className={`absolute top-4 ${
                  isAr ? 'left-4' : 'right-4'
                } w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors cursor-pointer`}
              >
                <X className="w-4 h-4 text-[#27272F]" />
              </button>

              <div className="w-48 sm:w-56 shrink-0">
                <img
                  src={character.image}
                  alt={isAr ? character.nameAr : character.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>

              <div className="text-center sm:text-start">
                <div className="text-xs font-bold uppercase tracking-wider text-[#27272F]/65">
                  {isAr ? character.roleAr : character.role}
                </div>
                <h2 className="font-script text-4xl sm:text-5xl text-[#27272F] mt-1">
                  {isAr ? character.nameAr : character.name}
                </h2>
                <p className="text-sm text-[#27272F]/85 mt-2 font-semibold">
                  {isAr ? character.shortBioAr : character.shortBio}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3 text-xs font-bold text-[#27272F]/75">
                  {(isAr ? character.traitsAr : character.traits).map((trait, index, arr) => (
                    <React.Fragment key={trait}>
                      <span>{trait}</span>
                      {index < arr.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm sm:text-base text-[#27272F]/85 leading-relaxed">
                {isAr ? character.fullBioAr : character.fullBio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#F8EFDE] p-4 rounded-2xl">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#27272F]/55">
                    {isAr ? 'أول ظهور' : 'Debut Short'}
                  </div>
                  <div className="text-xs font-bold text-[#27272F] mt-0.5">
                    {isAr ? character.firstAppearanceAr : character.firstAppearance}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#27272F]/55">
                    {isAr ? 'الشيء المفضل' : 'Favorite Prize'}
                  </div>
                  <div className="text-xs font-bold text-[#27272F] mt-0.5">
                    {isAr ? character.favoriteItemAr : character.favoriteItem}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#27272F]/55">
                    {isAr ? 'سجل المطاردة' : 'Chase Record'}
                  </div>
                  <div className="text-xs font-bold text-[#27272F] mt-0.5 tabular-nums">
                    {isAr ? character.winRateAr : character.winRate}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#27272F]/60 mb-2.5">
                  {isAr ? 'أبرز اللحظات الكلاسيكية' : 'Classic Highlights'}
                </h4>
                <ul className="space-y-2">
                  {(isAr ? character.iconicMomentsAr : character.iconicMoments).map((moment) => (
                    <li
                      key={moment}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#27272F]/85"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#F5C729] fill-[#F5C729]/20 shrink-0 mt-0.5" />
                      <span>{moment}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#27272F]/10">
                <button
                  onClick={() => onSwitchCharacter(character.id === 'tom' ? 'jerry' : 'tom')}
                  className="px-4 py-2.5 rounded-full border border-[#27272F]/30 hover:border-[#27272F] text-xs font-bold text-[#27272F] flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>
                    {isAr
                      ? `تعرّف على ${character.id === 'tom' ? 'جيري' : 'توم'} أيضاً`
                      : `Meet ${character.id === 'tom' ? 'Jerry' : 'Tom'} Next`}
                  </span>
                  {isAr ? (
                    <ArrowLeft className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onWatchFeatured();
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#F5C729] hover:bg-[#f0be19] text-xs font-bold text-[#27272F] flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {isAr
                      ? `شاهد مغامرات ${character.nameAr}`
                      : `Watch ${character.name} in Action`}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearch?: boolean;
  onSelectEpisode: (ep: Episode) => void;
  lang: Language;
}

export const SearchAndGalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  initialSearch = false,
  onSelectEpisode,
  lang,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStill, setSelectedStill] = useState<GalleryItem | null>(null);

  const isAr = lang === 'ar';

  const categories = [
    { id: 'All', labelAr: 'الكل', labelEn: 'All' },
    { id: 'Chase Scenes', labelAr: 'مشاهد المطاردة', labelEn: 'Chase Scenes' },
    { id: 'Slapstick Gags', labelAr: 'مقالب كوميدية', labelEn: 'Slapstick Gags' },
    { id: 'Character Portraits', labelAr: 'صور الشخصيات', labelEn: 'Character Portraits' },
  ];

  const filteredEpisodes = EPISODES.filter(
    (ep) =>
      ep.title.toLowerCase().includes(query.toLowerCase()) ||
      ep.titleAr.includes(query) ||
      ep.synopsis.toLowerCase().includes(query.toLowerCase()) ||
      ep.synopsisAr.includes(query) ||
      ep.code.toLowerCase().includes(query.toLowerCase()) ||
      ep.codeAr.includes(query)
  );

  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.titleAr.includes(query) ||
      item.caption.toLowerCase().includes(query.toLowerCase()) ||
      item.captionAr.includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gallery-modal-backdrop"
          dir={isAr ? 'rtl' : 'ltr'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#27272F]/65 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="gallery-modal-card"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="relative w-full max-w-4xl max-h-[88vh] flex flex-col rounded-3xl bg-[#FCF3EC] border border-[#27272F]/10 shadow-2xl overflow-hidden text-[#27272F]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header & Search Input */}
            <div className="p-6 bg-[#F8EFDE] border-b border-[#27272F]/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#27272F]/55">
                    {isAr ? 'أرشيف توم وجيري الكلاسيكي' : 'TOM & JERRY ARCHIVE'}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#27272F]">
                    {initialSearch
                      ? isAr
                        ? 'البحث في الحلقات والصور الكلاسيكية'
                        : 'Search Episodes & Classic Stills'
                      : isAr
                      ? 'معرض الرسوم واللقطات الكلاسيكية'
                      : 'Classic Art & Gag Gallery'}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  aria-label={isAr ? 'إغلاق المعرض' : 'Close gallery'}
                  className="w-9 h-9 rounded-full bg-white/80 hover:bg-[#F5C729] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-[#27272F]" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                  <Search
                    className={`w-4 h-4 text-[#27272F]/50 absolute ${
                      isAr ? 'right-3.5' : 'left-3.5'
                    } top-1/2 -translate-y-1/2`}
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                      isAr
                        ? 'ابحث عن حلقة ("مطاردة الجبنة"، "فوضى المطبخ"، "مغامرة العطلة")...'
                        : "Search episodes ('Cheese Chase', 'Kitchen Chaos', 'Vacation Caper')..."
                    }
                    autoFocus={initialSearch}
                    className={`w-full ${
                      isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'
                    } py-2.5 rounded-full bg-white border border-[#27272F]/15 text-sm text-[#27272F] placeholder:text-[#27272F]/45 focus:outline-none focus:border-[#27272F]`}
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-[#FCF3EC] p-1 rounded-full border border-[#27272F]/10 overflow-x-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        selectedCategory === cat.id
                          ? 'bg-[#FCE4B6] text-[#27272F]'
                          : 'text-[#27272F]/65 hover:text-[#27272F]'
                      }`}
                    >
                      {isAr ? cat.labelAr : cat.labelEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {selectedStill ? (
                <div className="bg-[#F8EFDE] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#27272F]/60">
                        {isAr ? selectedStill.episodeCodeAr : selectedStill.episodeCode} ·{' '}
                        {selectedStill.year}
                      </span>
                      <h4 className="text-xl font-extrabold text-[#27272F]">
                        {isAr ? selectedStill.titleAr : selectedStill.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedStill(null)}
                      className="px-3.5 py-1.5 rounded-full bg-white text-xs font-bold text-[#27272F] hover:bg-[#F5C729] transition-colors cursor-pointer"
                    >
                      {isAr ? 'العودة للمعرض' : 'Back to Grid'}
                    </button>
                  </div>
                  <div className="rounded-2xl overflow-hidden bg-[#FCF3EC] border border-[#27272F]/10 max-h-[340px] flex items-center justify-center">
                    <img
                      src={selectedStill.image}
                      alt={isAr ? selectedStill.titleAr : selectedStill.title}
                      referrerPolicy="no-referrer"
                      className="max-h-[340px] w-auto object-contain"
                    />
                  </div>
                  <p className="text-sm text-[#27272F]/80">
                    {isAr ? selectedStill.captionAr : selectedStill.caption}
                  </p>
                </div>
              ) : (
                <>
                  {/* Matching Episodes */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#27272F]/55 mb-3">
                      {isAr
                        ? `الحلقات المطابقة (${filteredEpisodes.length})`
                        : `Matching Episodes (${filteredEpisodes.length})`}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {filteredEpisodes.map((ep) => (
                        <button
                          key={ep.id}
                          onClick={() => {
                            onClose();
                            onSelectEpisode(ep);
                          }}
                          className="group flex items-center gap-3 p-2.5 rounded-2xl bg-[#F8EFDE] hover:bg-[#FCE4B6] transition-colors text-start cursor-pointer"
                        >
                          <img
                            src={ep.thumbnail}
                            alt={isAr ? ep.titleAr : ep.title}
                            referrerPolicy="no-referrer"
                            className="w-16 h-11 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-extrabold text-[#27272F] group-hover:underline truncate">
                              {isAr ? ep.titleAr : ep.title}
                            </div>
                            <div className="text-[11px] text-[#27272F]/65">
                              {isAr ? ep.codeAr : ep.code}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Artwork Stills Grid */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#27272F]/55 mb-3">
                      {isAr
                        ? `الرسوم واللقطات الأصلية (${filteredGallery.length})`
                        : `Original Illustration Stills (${filteredGallery.length})`}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {filteredGallery.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedStill(item)}
                          className="group text-start rounded-2xl bg-[#F8EFDE] p-3 hover:bg-[#FCE4B6]/60 transition-all cursor-pointer"
                        >
                          <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#FCF3EC] mb-2.5">
                            <img
                              src={item.image}
                              alt={isAr ? item.titleAr : item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="text-xs font-extrabold text-[#27272F]">
                            {isAr ? item.titleAr : item.title}
                          </div>
                          <div className="text-[11px] text-[#27272F]/60 mt-0.5">
                            {isAr ? item.categoryAr : item.category} · {item.year}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
