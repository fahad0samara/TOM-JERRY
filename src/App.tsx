/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Play, ArrowRight, ArrowLeft, Globe, Volume2, VolumeX } from 'lucide-react';
import {
  EPISODES,
  CHARACTERS,
  Episode,
  CharacterProfile,
  Language,
} from './data/tomAndJerryData';
import {
  EpisodePlayerModal,
  CharacterDossierModal,
  SearchAndGalleryModal,
} from './components/InteractiveModals';
import { Footer } from './components/Footer';
import { playTomMeow, playJerrySqueak } from './utils/soundEffects';

type NavTab = 'Home' | 'Episodes' | 'Characters' | 'Gallery';

const HERO_COMIC_POPS = {
  ar: ['زوووم! 💨', 'طاااخ! 💥', 'مستحيل تمسكني! 🧀', 'بوينغ! ⭐'],
  en: ['ZOOM! 💨', 'WHAM! 💥', 'CATCH ME IF YOU CAN! 🧀', 'BOING! ⭐'],
};

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeNav, setActiveNav] = useState<NavTab>('Home');
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<CharacterProfile | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const [seasonFilter, setSeasonFilter] = useState<'all' | 1 | 2>('all');
  const [comicPopIdx, setComicPopIdx] = useState<number | null>(null);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [hoveredDuoCard, setHoveredDuoCard] = useState<'tom' | 'jerry' | null>(null);

  const isAr = lang === 'ar';

  const navLabels: Record<NavTab, { ar: string; en: string }> = {
    Home: { ar: 'الرئيسية', en: 'Home' },
    Episodes: { ar: 'الحلقات', en: 'Episodes' },
    Characters: { ar: 'الشخصيات', en: 'Characters' },
    Gallery: { ar: 'المعرض', en: 'Gallery' },
  };

  const handleNavClick = (tab: NavTab) => {
    setActiveNav(tab);
    if (tab === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'Characters') {
      document.getElementById('the-duo')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'Episodes') {
      document.getElementById('classic-chronicles')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'Gallery') {
      setIsSearchMode(false);
      setIsGalleryOpen(true);
    }
  };

  const triggerHeroPop = () => {
    setComicPopIdx((prev) => (prev === null ? 0 : (prev + 1) % HERO_COMIC_POPS.ar.length));
    setTimeout(() => {
      setComicPopIdx(null);
    }, 1400);
  };

  const displayedEpisodes = showAllEpisodes
    ? EPISODES.filter((ep) => seasonFilter === 'all' || ep.season === seasonFilter)
    : EPISODES.slice(0, 3);

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`min-h-screen w-full bg-[#FBF2E9] text-[#27272F] overflow-x-hidden selection:bg-[#F5C729]/40 ${
        isAr ? 'font-arabic' : ''
      }`}
    >
      {/* Full-Width Artboard spanning 100% of the screen width */}
      <div className="w-full bg-[#FBF2E9] relative">
        {/* ================= RESPONSIVE TOP NAVIGATION BAR ================= */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 w-full px-4 sm:px-8 md:px-[5%] pt-4 sm:pt-6 pb-2"
        >
          <div className="w-full flex items-center justify-between gap-3">
            {/* Zone 1: Brand Wordmark */}
            <motion.a
              href="#top"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('Home');
              }}
              className="text-xl sm:text-2xl lg:text-[30px] font-extrabold tracking-tight text-[#27272F] whitespace-nowrap shrink-0 flex items-baseline select-none"
            >
              {isAr ? (
                <>
                  <span>توم</span>
                  <span className="font-arabic-script text-[#F5C729] text-2xl sm:text-[28px] lg:text-[34px] mx-1 font-bold">
                    و
                  </span>
                  <span>جيري</span>
                  <sup className="text-[8px] sm:text-[10px] font-bold text-[#27272F]/70 mr-0.5 -top-2.5 sm:-top-3">
                    TM
                  </sup>
                </>
              ) : (
                <>
                  <span>Tom</span>
                  <span className="font-script text-[#F5C729] text-2xl sm:text-[30px] lg:text-[34px] mx-0.5 font-normal">
                    &amp;
                  </span>
                  <span>Jerry</span>
                  <sup className="text-[8px] sm:text-[10px] font-bold text-[#27272F]/70 ml-0.5 -top-2.5 sm:-top-3">
                    TM
                  </sup>
                </>
              )}
            </motion.a>

            {/* Zone 2: Desktop & Tablet Navigation Links */}
            <nav
              aria-label={isAr ? 'القائمة الرئيسية' : 'Primary Navigation'}
              className="hidden md:flex items-center gap-2 lg:gap-5 text-sm lg:text-[15px] font-bold text-[#27272F]"
            >
              {(['Home', 'Episodes', 'Characters', 'Gallery'] as NavTab[]).map((tab) => {
                const isActive = activeNav === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleNavClick(tab)}
                    className={`relative px-4 lg:px-5 py-1.5 lg:py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-[#27272F] font-extrabold'
                        : 'text-[#27272F]/80 hover:text-[#27272F]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPillDesktop"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-[#FCE4B6] -z-10"
                      />
                    )}
                    <span>{isAr ? navLabels[tab].ar : navLabels[tab].en}</span>
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Language Switcher, Sound Toggle, Search & Watch Now Action */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setLang(isAr ? 'en' : 'ar')}
                aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#FCE4B6]/80 hover:bg-[#F5C729] text-[#27272F] text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{isAr ? 'EN' : 'عربي'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsSoundMuted((prev) => !prev)}
                title={
                  isSoundMuted
                    ? isAr
                      ? 'تشغيل المؤثرات الصوتية'
                      : 'Unmute sound effects'
                    : isAr
                    ? 'كتم المؤثرات الصوتية'
                    : 'Mute sound effects'
                }
                aria-label={
                  isSoundMuted
                    ? isAr
                      ? 'تشغيل المؤثرات الصوتية'
                      : 'Unmute sound effects'
                    : isAr
                    ? 'كتم المؤثرات الصوتية'
                    : 'Mute sound effects'
                }
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isSoundMuted
                    ? 'bg-[#27272F]/10 text-[#27272F]/60 hover:bg-[#FCE4B6]/70 hover:text-[#27272F]'
                    : 'hover:bg-[#FCE4B6]/70 text-[#27272F]'
                }`}
              >
                {isSoundMuted ? (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  setIsSearchMode(true);
                  setIsGalleryOpen(true);
                }}
                aria-label={isAr ? 'بحث في الحلقات والشخصيات' : 'Search episodes and characters'}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-[#FCE4B6]/70 flex items-center justify-center text-[#27272F] transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveEpisode(EPISODES[0])}
                className="bg-[#28292E] hover:bg-[#18191C] text-white text-xs sm:text-sm font-bold px-3.5 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-full flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
              >
                <Play
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white ${
                    isAr ? 'rotate-180' : ''
                  }`}
                />
                <span>{isAr ? 'شاهد الآن' : 'Watch Now'}</span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation Pill Strip (< 768px) so links never squish or disappear */}
          <nav
            aria-label={isAr ? 'قائمة الجوال' : 'Mobile Navigation'}
            className="flex md:hidden items-center justify-center gap-1.5 pt-3 pb-1 overflow-x-auto"
          >
            {(['Home', 'Episodes', 'Characters', 'Gallery'] as NavTab[]).map((tab) => {
              const isActive = activeNav === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleNavClick(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#FCE4B6] text-[#27272F]'
                      : 'text-[#27272F]/75 hover:bg-[#FCE4B6]/40'
                  }`}
                >
                  {isAr ? navLabels[tab].ar : navLabels[tab].en}
                </button>
              );
            })}
          </nav>
        </motion.header>

        {/* ================= RESPONSIVE HERO SECTION ================= */}
        {/* 1. MOBILE HERO (< 768px): Stacked layout so text & buttons are large and readable */}
        <section className="block md:hidden w-full pt-3 pb-4">
          <div className="px-5 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-xs font-extrabold uppercase text-[#27272F]/85">
                {isAr ? 'الثنائي الأصلي' : 'THE ORIGINAL DUO'}
              </span>
              <span className="w-10 h-[2px] bg-[#F5C729] inline-block" />
            </div>

            {isAr ? (
              <h1 className="text-3xl sm:text-4xl font-black text-[#27272F] leading-[1.2]">
                <span>المطاردة لا تنتهي </span>
                <span className="relative inline-block font-arabic-script font-bold text-[#F5C729] text-3xl sm:text-4xl mr-1">
                  أبداً!
                  <svg
                    viewBox="0 0 180 22"
                    fill="none"
                    className="w-full h-auto absolute -bottom-1.5 right-0 -scale-x-100"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 15C48 6 112 4 172 9"
                      stroke="#F5C729"
                      strokeWidth="6.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            ) : (
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#27272F] tracking-tight leading-[1.1]">
                <span>The Chase Never </span>
                <span className="relative inline-block font-script font-normal text-[#F5C729] text-4xl sm:text-5xl ml-1">
                  Ends!
                  <svg
                    viewBox="0 0 180 22"
                    fill="none"
                    className="w-full h-auto absolute -bottom-1 left-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 15C48 6 112 4 172 9"
                      stroke="#F5C729"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            )}

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#27272F]/85 font-semibold max-w-md">
              {isAr
                ? 'انطلق في عالم توم وجيري الخالد — حيث المقالب، الضحك، والمطاردة الكلاسيكية بين القط والفأر لا تتوقف!'
                : 'Dive into the timeless world of Tom and Jerry — where mischief, laughter and the classic cat-and-mouse chase live on!'}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveEpisode(EPISODES[0])}
                className="bg-[#F5C729] hover:bg-[#efb914] text-[#27272F] text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
              >
                <Play
                  className={`w-3.5 h-3.5 fill-[#27272F] text-[#27272F] ${
                    isAr ? 'rotate-180' : ''
                  }`}
                />
                <span>{isAr ? 'شاهد الحلقات' : 'Watch Episodes'}</span>
              </button>

              <button
                onClick={() =>
                  document.getElementById('the-duo')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-[#FBF2E9] hover:bg-[#FCE4B6]/50 border border-[#27272F]/80 text-[#27272F] text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full cursor-pointer whitespace-nowrap shrink-0"
              >
                {isAr ? 'استكشف المزيد' : 'Explore More'}
              </button>
            </div>
          </div>

          <div onClick={triggerHeroPop} className="relative w-full mt-2">
            <img
              src="/assets/tom-and-jerry/hero-chase-v3.png"
              alt={isAr ? 'توم يطارد جيري' : 'Tom chasing Jerry'}
              width={1472}
              height={930}
              referrerPolicy="no-referrer"
              className={`w-full h-auto block select-none ${
                isAr ? '-scale-x-100' : ''
              }`}
            />
          </div>
        </section>

        {/* 2. DESKTOP, LAPTOP & LARGE SCREEN HERO (>= 768px): Widescreen full-bleed stage (2000x930) */}
        <section className="hidden md:block @container relative w-full">
          <div
            onClick={triggerHeroPop}
            title={isAr ? 'اضغط لتشغيل مؤثر المطاردة!' : 'Click for chase action!'}
            className="w-full cursor-pointer"
          >
            <img
              src="/assets/tom-and-jerry/hero-chase-wide.png"
              alt={
                isAr
                  ? 'توم يطارد جيري على المسار الذهبي المنحني'
                  : 'Tom chasing Jerry along a golden curved trail'
              }
              width={2000}
              height={930}
              referrerPolicy="no-referrer"
              className={`w-full h-auto block select-none ${
                isAr ? '-scale-x-100' : ''
              }`}
            />
          </div>

          {/* Interactive Comic Sound Pop when clicking Tom & Jerry in the Hero */}
          <AnimatePresence>
            {comicPopIdx !== null && (
              <motion.div
                key={comicPopIdx}
                initial={{ opacity: 0, scale: 0.4, y: 15, rotate: isAr ? 12 : -12 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: isAr ? 6 : -6 }}
                exit={{ opacity: 0, scale: 0.5, y: -10 }}
                transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                className={`absolute top-[16%] ${
                  isAr ? 'left-[34%]' : 'right-[34%]'
                } z-20 bg-[#F5C729] text-[#27272F] font-extrabold text-[clamp(14px,1.5cqw,26px)] px-[1.6cqw] py-[0.6cqw] rounded-2xl shadow-lg border-2 border-[#27272F] pointer-events-none whitespace-nowrap`}
              >
                {isAr ? HERO_COMIC_POPS.ar[comicPopIdx] : HERO_COMIC_POPS.en[comicPopIdx]}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Editorial Hero Typography & CTAs: Placed on the RIGHT in Arabic, on the LEFT in English */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 32 : -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-[7%] ${
              isAr
                ? 'right-[5%] items-start text-right'
                : 'left-[5%] items-start text-left'
            } w-[42%] z-10 flex flex-col`}
          >
            {/* Kicker with Golden Line */}
            <div className="flex items-center gap-[1.1cqw] mb-[0.8cqw]">
              <span
                className={`text-[clamp(10px,1.05cqw,18px)] font-extrabold ${
                  isAr ? 'tracking-normal' : 'tracking-[0.26em]'
                } uppercase text-[#27272F]/85 whitespace-nowrap`}
              >
                {isAr ? 'الثنائي الأصلي' : 'THE ORIGINAL DUO'}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-[clamp(28px,3.8cqw,68px)] h-[2px] bg-[#F5C729] inline-block origin-center"
              />
            </div>

            {/* Display Headline */}
            {isAr ? (
              <h1 className="text-[clamp(24px,3.6cqw,64px)] font-black text-[#27272F] leading-[1.15]">
                <span className="block">المطاردة</span>
                <span className="block mt-[0.2cqw]">
                  لا تنتهي{' '}
                  <span className="relative inline-block font-arabic-script font-bold text-[#F5C729] text-[clamp(26px,3.85cqw,68px)] mr-[0.3cqw]">
                    أبداً!
                    <svg
                      viewBox="0 0 180 22"
                      fill="none"
                      className="w-[95%] h-auto absolute -bottom-[0.55cqw] right-0 -scale-x-100"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M4 15C48 6 112 4 172 9"
                        stroke="#F5C729"
                        strokeWidth="6.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                      />
                    </svg>
                  </span>
                </span>
              </h1>
            ) : (
              <h1 className="text-[clamp(26px,3.9cqw,68px)] font-extrabold text-[#27272F] tracking-tight leading-[1.06]">
                <span className="block">The Chase</span>
                <span className="block mt-[0.15cqw]">
                  Never{' '}
                  <span className="relative inline-block font-script font-normal text-[#F5C729] text-[clamp(30px,4.5cqw,78px)] tracking-normal ml-[0.3cqw]">
                    Ends!
                    <svg
                      viewBox="0 0 180 22"
                      fill="none"
                      className="w-[88%] h-auto absolute -bottom-[0.4cqw] left-[2%]"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M4 15C48 6 112 4 172 9"
                        stroke="#F5C729"
                        strokeWidth="6"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                      />
                    </svg>
                  </span>
                </span>
              </h1>
            )}

            {/* Subtitle Copy */}
            <p className="mt-[1.4cqw] text-[clamp(12px,1.18cqw,20px)] leading-[1.55] text-[#27272F]/85 font-semibold max-w-[33cqw]">
              {isAr
                ? 'انطلق في عالم توم وجيري الخالد — حيث المقالب، الضحك، والمطاردة الكلاسيكية بين القط والفأر لا تتوقف!'
                : 'Dive into the timeless world of Tom and Jerry — where mischief, laughter and the classic cat-and-mouse chase live on!'}
            </p>

            {/* CTA Buttons */}
            <div className="mt-[1.8cqw] flex items-center gap-[1cqw]">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveEpisode(EPISODES[0])}
                className="bg-[#F5C729] hover:bg-[#efb914] text-[#27272F] text-[clamp(11px,1.08cqw,18px)] font-extrabold px-[clamp(14px,1.7cqw,30px)] py-[clamp(7px,0.82cqw,14px)] rounded-full flex items-center gap-[0.6cqw] cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
              >
                <Play
                  className={`w-[clamp(10px,0.95cqw,16px)] h-[clamp(10px,0.95cqw,16px)] fill-[#27272F] text-[#27272F] ${
                    isAr ? 'rotate-180' : ''
                  }`}
                />
                <span>{isAr ? 'شاهد الحلقات' : 'Watch Episodes'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  document.getElementById('the-duo')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-[#FBF2E9]/95 hover:bg-[#FCE4B6]/50 border border-[#27272F]/80 text-[#27272F] text-[clamp(11px,1.08cqw,18px)] font-extrabold px-[clamp(14px,1.7cqw,30px)] py-[clamp(7px,0.82cqw,14px)] rounded-full cursor-pointer whitespace-nowrap shrink-0"
              >
                {isAr ? 'استكشف المزيد' : 'Explore More'}
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* ================= RESPONSIVE THE DUO SECTION ================= */}
        <section
          id="the-duo"
          className="relative z-20 w-full px-4 sm:px-8 md:px-[5%] pt-2 md:pt-0 md:-mt-[2.5%] pb-14 sm:pb-20"
        >
          {/* Centered Section Header with Animated Twinkling Comic Spark Lines */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto text-center relative"
          >
            <div
              className={`text-xs sm:text-sm font-extrabold ${
                isAr ? 'tracking-normal' : 'tracking-[0.28em]'
              } uppercase text-[#27272F]/80 mb-1`}
            >
              {isAr ? 'توم وجيري' : 'TOM & JERRY'}
            </div>

            <div className="relative inline-flex items-center justify-center">
              {/* 3 Yellow Spark Rays (On the RIGHT in Arabic RTL, on the LEFT in English LTR) */}
              <motion.svg
                viewBox="0 0 42 42"
                fill="none"
                animate={{ scale: [1, 1.14, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className={`w-7 h-7 sm:w-9 sm:h-9 lg:w-11 lg:h-11 absolute ${
                  isAr
                    ? '-right-10 sm:-right-14 -scale-x-100'
                    : '-left-10 sm:-left-14'
                } -top-1 text-[#F5C729]`}
                aria-hidden="true"
              >
                <line
                  x1="28"
                  y1="10"
                  x2="17"
                  y2="2"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <line
                  x1="23"
                  y1="20"
                  x2="9"
                  y2="13"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <line
                  x1="22"
                  y1="30"
                  x2="8"
                  y2="29"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </motion.svg>

              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-[#27272F] leading-tight">
                {isAr ? (
                  <>
                    الثنائي <span className="text-[#F5C729]">الأشهر</span>
                  </>
                ) : (
                  <>
                    The <span className="text-[#F5C729]">Duo</span>
                  </>
                )}
              </h2>
            </div>

            <div className="relative mt-2.5">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#27272F]/85 font-semibold max-w-md mx-auto">
                {isAr ? (
                  <>
                    ثنائي خالد عبر الأجيال — القط الذكي (والأخرق أحياناً)
                    <br className="hidden sm:inline" /> والفأر الصغير سريع البديهة!
                  </>
                ) : (
                  <>
                    A timeless pair — the clever (and sometimes clumsy) cat
                    <br className="hidden sm:inline" /> and the quick-witted mouse!
                  </>
                )}
              </p>

              {/* Bottom 3 Yellow Spark Rays */}
              <motion.svg
                viewBox="0 0 36 30"
                fill="none"
                animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2.5, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                className={`w-6 h-6 sm:w-8 sm:h-8 absolute ${
                  isAr ? 'left-2 sm:left-6 -scale-x-100' : 'right-2 sm:right-6'
                } -bottom-5 text-[#F5C729]`}
                aria-hidden="true"
              >
                <line
                  x1="6"
                  y1="18"
                  x2="11"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <line
                  x1="14"
                  y1="21"
                  x2="24"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <line
                  x1="21"
                  y1="26"
                  x2="32"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </motion.svg>
            </div>
          </motion.div>

          {/* Two Character Cards (Tom & Jerry) — Stacks 1-col on mobile, 2-col on tablet/desktop */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-end">
            {/* TOM CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onMouseEnter={() => {
                setHoveredDuoCard('tom');
                playTomMeow(isSoundMuted);
              }}
              onMouseLeave={() => setHoveredDuoCard((prev) => (prev === 'tom' ? null : prev))}
              onFocus={() => {
                setHoveredDuoCard('tom');
                playTomMeow(isSoundMuted);
              }}
              onBlur={() => setHoveredDuoCard((prev) => (prev === 'tom' ? null : prev))}
              onClick={() => setActiveCharacter(CHARACTERS.tom)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveCharacter(CHARACTERS.tom);
                }
              }}
              className="@container group relative w-full cursor-pointer select-none"
            >
              {/* Subtle Floating "Meow!" Sound Pill on Hover */}
              <AnimatePresence>
                {hoveredDuoCard === 'tom' && !isSoundMuted && (
                  <motion.span
                    initial={{ opacity: 0, y: 8, scale: 0.75, rotate: isAr ? 8 : -8 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: isAr ? 5 : -5 }}
                    exit={{ opacity: 0, y: -6, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                    className={`absolute top-[4%] ${
                      isAr ? 'right-[40%]' : 'left-[40%]'
                    } z-20 inline-flex items-center gap-1 px-[2.4cqw] py-[0.8cqw] rounded-full bg-[#FAF3EB] border-2 border-[#27272F] text-[#27272F] text-[clamp(11px,2.6cqw,16px)] font-extrabold shadow-sm pointer-events-none whitespace-nowrap`}
                  >
                    <Volume2 className="w-[3cqw] h-[3cqw] text-[#F5C729] fill-[#F5C729]" />
                    <span>{isAr ? 'مياااو!' : 'Meow!'}</span>
                  </motion.span>
                )}
              </AnimatePresence>

              <img
                src="/assets/tom-and-jerry/tom-card-v3.png"
                alt={isAr ? 'توم يستند بذقنه على كفّيه' : 'Tom daydreaming with chin resting in his paws'}
                width={676}
                height={360}
                referrerPolicy="no-referrer"
                className={`w-full h-auto block ${isAr ? '-scale-x-100' : ''}`}
              />

              {/* Text & Arrow Overlay scaled relative to the card container */}
              <div
                className={`absolute top-[19%] bottom-[10%] ${
                  isAr
                    ? 'right-[62.5%] left-[5%] text-right items-start'
                    : 'left-[62.5%] right-[5%] text-left items-start'
                } flex flex-col justify-between`}
              >
                <div className="w-full">
                  <h3
                    className={`${
                      isAr
                        ? 'font-arabic-script text-[clamp(18px,8.5cqw,48px)]'
                        : 'font-script text-[clamp(20px,9.4cqw,52px)]'
                    } leading-none text-[#27272F]`}
                  >
                    {isAr ? CHARACTERS.tom.nameAr : CHARACTERS.tom.name}
                  </h3>
                  <p className="mt-[2cqw] text-[clamp(10px,3.1cqw,18px)] leading-[1.38] text-[#27272F]/85 font-semibold">
                    {isAr ? CHARACTERS.tom.shortBioAr : CHARACTERS.tom.shortBio}
                  </p>
                </div>

                <span
                  aria-label={isAr ? 'استكشف شخصية توم' : 'Explore Tom profile'}
                  className="inline-flex items-center justify-center w-[11.5cqw] h-[6.8cqw] rounded-full bg-[#FAF3EB] group-hover:bg-[#F5C729] text-[#27272F] transition-all duration-200 group-hover:scale-110 shadow-2xs shrink-0"
                >
                  {isAr ? (
                    <ArrowLeft className="w-[3.6cqw] h-[3.6cqw] stroke-[2.2] transition-transform group-hover:-translate-x-0.5" />
                  ) : (
                    <ArrowRight className="w-[3.6cqw] h-[3.6cqw] stroke-[2.2] transition-transform group-hover:translate-x-0.5" />
                  )}
                </span>
              </div>
            </motion.div>

            {/* JERRY CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onMouseEnter={() => {
                setHoveredDuoCard('jerry');
                playJerrySqueak(isSoundMuted);
              }}
              onMouseLeave={() => setHoveredDuoCard((prev) => (prev === 'jerry' ? null : prev))}
              onFocus={() => {
                setHoveredDuoCard('jerry');
                playJerrySqueak(isSoundMuted);
              }}
              onBlur={() => setHoveredDuoCard((prev) => (prev === 'jerry' ? null : prev))}
              onClick={() => setActiveCharacter(CHARACTERS.jerry)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveCharacter(CHARACTERS.jerry);
                }
              }}
              className="@container group relative w-full cursor-pointer select-none"
            >
              {/* Subtle Floating "Squeak!" Sound Pill on Hover */}
              <AnimatePresence>
                {hoveredDuoCard === 'jerry' && !isSoundMuted && (
                  <motion.span
                    initial={{ opacity: 0, y: 8, scale: 0.75, rotate: isAr ? -8 : 8 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: isAr ? -5 : 5 }}
                    exit={{ opacity: 0, y: -6, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                    className={`absolute top-[4%] ${
                      isAr ? 'right-[40%]' : 'left-[40%]'
                    } z-20 inline-flex items-center gap-1 px-[2.4cqw] py-[0.8cqw] rounded-full bg-[#FAF3EB] border-2 border-[#27272F] text-[#27272F] text-[clamp(11px,2.6cqw,16px)] font-extrabold shadow-sm pointer-events-none whitespace-nowrap`}
                  >
                    <Volume2 className="w-[3cqw] h-[3cqw] text-[#F5C729] fill-[#F5C729]" />
                    <span>{isAr ? 'سويييك!' : 'Squeak!'}</span>
                  </motion.span>
                )}
              </AnimatePresence>

              <img
                src="/assets/tom-and-jerry/jerry-card-v2.png"
                alt={isAr ? 'جيري يبتسم فاتحاً ذراعيه' : 'Jerry cheering with arms wide open'}
                width={648}
                height={360}
                referrerPolicy="no-referrer"
                className={`w-full h-auto block ${isAr ? '-scale-x-100' : ''}`}
              />

              {/* Text & Arrow Overlay scaled relative to the card container */}
              <div
                className={`absolute top-[19%] bottom-[10%] ${
                  isAr
                    ? 'right-[63%] left-[5%] text-right items-start'
                    : 'left-[63%] right-[5%] text-left items-start'
                } flex flex-col justify-between`}
              >
                <div className="w-full">
                  <h3
                    className={`${
                      isAr
                        ? 'font-arabic-script text-[clamp(18px,8.8cqw,48px)]'
                        : 'font-script text-[clamp(20px,9.8cqw,52px)]'
                    } leading-none text-[#27272F]`}
                  >
                    {isAr ? CHARACTERS.jerry.nameAr : CHARACTERS.jerry.name}
                  </h3>
                  <p className="mt-[2cqw] text-[clamp(10px,3.2cqw,18px)] leading-[1.38] text-[#27272F]/85 font-semibold">
                    {isAr ? CHARACTERS.jerry.shortBioAr : CHARACTERS.jerry.shortBio}
                  </p>
                </div>

                <span
                  aria-label={isAr ? 'استكشف شخصية جيري' : 'Explore Jerry profile'}
                  className="inline-flex items-center justify-center w-[12cqw] h-[7cqw] rounded-full bg-[#FAF3EB] group-hover:bg-[#F5C729] text-[#27272F] transition-all duration-200 group-hover:scale-110 shadow-2xs shrink-0"
                >
                  {isAr ? (
                    <ArrowLeft className="w-[3.8cqw] h-[3.8cqw] stroke-[2.2] transition-transform group-hover:-translate-x-0.5" />
                  ) : (
                    <ArrowRight className="w-[3.8cqw] h-[3.8cqw] stroke-[2.2] transition-transform group-hover:translate-x-0.5" />
                  )}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= RESPONSIVE CLASSIC CHRONICLES SECTION ================= */}
        <section
          id="classic-chronicles"
          className="relative w-full bg-[#F8EFDE] pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-8 md:px-[5%]"
        >
          {/* Seamless Full-Width Organic Wave SVG Top Divider */}
          <div className="absolute -top-8 sm:-top-12 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
            <svg
              viewBox="0 0 1440 72"
              fill="none"
              preserveAspectRatio="none"
              className={`w-full h-9 sm:h-14 ${isAr ? '-scale-x-100' : ''}`}
            >
              <path
                d="M0 54C220 78 460 12 760 28C1050 44 1240 6 1440 24V72H0V54Z"
                fill="#F8EFDE"
              />
            </svg>
          </div>

          {/* Animated Transparent Swiss Cheese Wedge (On the RIGHT edge in Arabic RTL, on the LEFT edge in English LTR) */}
          <motion.button
            onClick={() => setActiveEpisode(EPISODES[0])}
            title={isAr ? 'تشغيل حلقة مطاردة الجبنة' : 'Play Cheese Chase (S1 · Ep 03)'}
            aria-label={isAr ? 'تشغيل حلقة مطاردة الجبنة' : 'Play Cheese Chase episode'}
            animate={{ y: [0, -6, 0], rotate: isAr ? [0, -3, 0] : [0, 3, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className={`absolute -top-11 sm:-top-16 lg:-top-20 ${
              isAr ? 'right-0' : 'left-0'
            } w-20 sm:w-28 lg:w-36 z-20 cursor-pointer focus:outline-none`}
          >
            <img
              src="/assets/tom-and-jerry/cheese-transparent.png"
              alt={isAr ? 'قطعة الجبن السويسري' : 'Swiss cheese wedge'}
              referrerPolicy="no-referrer"
              className={`w-full h-auto object-contain select-none ${isAr ? '-scale-x-100' : ''}`}
            />
          </motion.button>

          {/* Classic Chronicles Responsive Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10"
          >
            {/* Start spacer on desktop */}
            <div className="hidden md:block w-44" />

            {/* Centered Classic Chronicles Title */}
            <div className="text-center relative">
              <div className="relative inline-flex items-baseline justify-center gap-2">
                {/* 3 Golden Spark Lines */}
                <motion.svg
                  viewBox="0 0 36 36"
                  fill="none"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
                  className={`w-6 h-6 sm:w-8 sm:h-8 absolute ${
                    isAr
                      ? '-right-9 sm:-right-12 -scale-x-100'
                      : '-left-9 sm:-left-12'
                  } top-0 text-[#F5C729]`}
                  aria-hidden="true"
                >
                  <line
                    x1="26"
                    y1="9"
                    x2="16"
                    y2="2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="22"
                    y1="18"
                    x2="10"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="22"
                    y1="27"
                    x2="10"
                    y2="27"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </motion.svg>

                {isAr ? (
                  <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#27272F] leading-none">
                    حكايات{' '}
                    <span className="font-arabic-script font-bold text-[#F5C729] text-3xl sm:text-4xl lg:text-[48px] mr-1">
                      كلاسيكية
                    </span>
                  </h2>
                ) : (
                  <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#27272F] leading-none">
                    Classic{' '}
                    <span className="font-script font-normal text-[#F5C729] text-3xl sm:text-4xl lg:text-[50px] ml-1">
                      Chronicles
                    </span>
                  </h2>
                )}
              </div>

              <p className="text-xs sm:text-sm lg:text-base text-[#27272F]/80 font-semibold mt-2">
                {isAr
                  ? 'استمتع بأجمل مغامرات وحلقات توم وجيري المفضلة لديك.'
                  : 'Relive your favourite Tom and Jerry adventures.'}
              </p>
            </div>

            {/* End-aligned View All Episodes Trigger */}
            <div className="md:w-44 flex justify-center md:justify-end">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowAllEpisodes(!showAllEpisodes)}
                className="text-xs sm:text-sm lg:text-[15px] font-extrabold text-[#27272F] hover:text-[#b88c00] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>
                  {showAllEpisodes
                    ? isAr
                      ? 'الحلقات المختارة (3)'
                      : 'Featured (3)'
                    : isAr
                    ? 'عرض كل الحلقات'
                    : 'View All Episodes'}
                </span>
                {isAr ? (
                  <ArrowLeft
                    className={`w-4 h-4 transition-transform ${
                      showAllEpisodes ? '-rotate-90' : ''
                    }`}
                  />
                ) : (
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      showAllEpisodes ? 'rotate-90' : ''
                    }`}
                  />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Optional Season Filter Bar when View All Episodes is expanded */}
          <AnimatePresence>
            {showAllEpisodes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center justify-center gap-2 mb-7 overflow-hidden"
              >
                {(
                  [
                    { id: 'all', labelAr: 'كل المواسم (6)', labelEn: 'All Seasons (6)' },
                    { id: 1, labelAr: 'الموسم الأول', labelEn: 'Season 1' },
                    { id: 2, labelAr: 'الموسم الثاني', labelEn: 'Season 2' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={String(tab.id)}
                    onClick={() => setSeasonFilter(tab.id)}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      seasonFilter === tab.id
                        ? 'bg-[#F5C729] text-[#27272F]'
                        : 'bg-[#FBF2E9] text-[#27272F]/70 hover:text-[#27272F]'
                    }`}
                  >
                    {isAr ? tab.labelAr : tab.labelEn}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Responsive Episode Cards Grid: 1 col mobile, 2 col small tablet, 3 col desktop */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedEpisodes.map((ep, idx) => (
              <motion.article
                key={ep.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveEpisode(ep)}
                className="group cursor-pointer select-none"
              >
                {/* Episode Thumbnail Container */}
                <div className="relative w-full aspect-[206/101] rounded-2xl overflow-hidden bg-[#E9DEC9] shadow-xs">
                  <img
                    src={ep.thumbnail}
                    alt={isAr ? ep.titleAr : ep.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      isAr ? '-scale-x-100' : ''
                    }`}
                  />

                  {/* Single Aligned Play Button Circle (Bottom-Left in Arabic RTL, Bottom-Right in English LTR) */}
                  <button
                    type="button"
                    aria-label={isAr ? `تشغيل ${ep.titleAr}` : `Play ${ep.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveEpisode(ep);
                    }}
                    className={`absolute bottom-[5.8%] ${
                      isAr ? 'left-[3.3%]' : 'right-[3.3%]'
                    } w-[14.8%] aspect-square rounded-full bg-[#FCF4EB] group-hover:bg-[#F5C729] text-[#27272F] flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-sm cursor-pointer`}
                  >
                    <Play
                      className={`w-[42%] h-[42%] fill-[#27272F] text-[#27272F] ${
                        isAr ? 'rotate-180 mr-[4%]' : 'ml-[4%]'
                      }`}
                    />
                  </button>
                </div>

                {/* Episode Title & Clean Unboxed Season/Episode Metadata */}
                <div className={isAr ? 'text-right' : 'text-left'}>
                  <h3 className="mt-3 text-base sm:text-lg lg:text-xl font-extrabold text-[#27272F] group-hover:text-[#b58900] transition-colors leading-snug">
                    {isAr ? ep.titleAr : ep.title}
                  </h3>
                  <div className="mt-0.5 text-xs sm:text-sm font-semibold text-[#27272F]/70 tabular-nums">
                    {isAr ? ep.codeAr : ep.code}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Golden Wave Corner Accent (Bottom-Right in Arabic RTL, Bottom-Left in English LTR) */}
          <svg
            viewBox="0 0 220 48"
            fill="none"
            className={`w-40 sm:w-56 lg:w-72 h-auto absolute bottom-0 ${
              isAr ? 'right-0 -scale-x-100' : 'left-0'
            } pointer-events-none`}
            aria-hidden="true"
          >
            <path d="M0 10C65 14 140 28 215 48H0V10Z" fill="#F5C729" />
          </svg>

          {/* Animated Warm Tan Paw Print Accent (Bottom-Left in Arabic RTL, Bottom-Right in English LTR) */}
          <motion.svg
            viewBox="0 0 64 64"
            fill="none"
            animate={{ scale: [1, 1.07, 1], rotate: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 absolute bottom-3 ${
              isAr ? 'left-4 sm:left-8 -scale-x-100' : 'right-4 sm:right-8'
            } text-[#F1DEC0] pointer-events-none`}
            aria-hidden="true"
          >
            <ellipse
              cx="34"
              cy="40"
              rx="13"
              ry="10"
              transform="rotate(-18 34 40)"
              fill="currentColor"
            />
            <ellipse
              cx="16"
              cy="28"
              rx="5"
              ry="6.5"
              transform="rotate(-25 16 28)"
              fill="currentColor"
            />
            <ellipse
              cx="26"
              cy="19"
              rx="5"
              ry="7"
              transform="rotate(-12 26 19)"
              fill="currentColor"
            />
            <ellipse
              cx="38"
              cy="19"
              rx="5"
              ry="7"
              transform="rotate(8 38 19)"
              fill="currentColor"
            />
            <ellipse
              cx="48"
              cy="27"
              rx="5"
              ry="6.5"
              transform="rotate(24 48 27)"
              fill="currentColor"
            />
          </motion.svg>
        </section>

        {/* ================= PERSISTENT FOOTER ================= */}
        <Footer lang={lang} onNavigate={handleNavClick} />
      </div>

      {/* ================= INTERACTIVE MODALS ================= */}
      <EpisodePlayerModal
        episode={activeEpisode}
        onClose={() => setActiveEpisode(null)}
        onSelectEpisode={(ep) => setActiveEpisode(ep)}
        lang={lang}
      />

      <CharacterDossierModal
        character={activeCharacter}
        onClose={() => setActiveCharacter(null)}
        onSwitchCharacter={(id) => setActiveCharacter(CHARACTERS[id])}
        onWatchFeatured={() => setActiveEpisode(EPISODES[0])}
        lang={lang}
      />

      <SearchAndGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialSearch={isSearchMode}
        onSelectEpisode={(ep) => setActiveEpisode(ep)}
        lang={lang}
      />
    </div>
  );
}
