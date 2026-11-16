import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Check } from 'lucide-react';
import { Language } from '../data/tomAndJerryData';

interface FooterProps {
  lang: Language;
  onNavigate: (tab: 'Home' | 'Episodes' | 'Characters' | 'Gallery') => void;
}

interface SocialItem {
  id: string;
  nameAr: string;
  nameEn: string;
  handle: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialItem[] = [
  {
    id: 'youtube',
    nameAr: 'يوتيوب',
    nameEn: 'YouTube',
    handle: '@TomAndJerryOfficial',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    nameAr: 'إنستغرام',
    nameEn: 'Instagram',
    handle: '@tomandjerry',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    id: 'x',
    nameAr: 'منصة إكس',
    nameEn: 'X (Twitter)',
    handle: '@TomAndJerry',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    nameAr: 'تيك توك',
    nameEn: 'TikTok',
    handle: '@tomandjerry.official',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
];

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const [activeSocialToast, setActiveSocialToast] = useState<SocialItem | null>(null);
  const isAr = lang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSocialClick = (social: SocialItem) => {
    setActiveSocialToast(social);
    setTimeout(() => {
      setActiveSocialToast((prev) => (prev?.id === social.id ? null : prev));
    }, 2800);
  };

  const navItems: { tab: 'Home' | 'Episodes' | 'Characters' | 'Gallery'; ar: string; en: string }[] =
    [
      { tab: 'Home', ar: 'الرئيسية', en: 'Home' },
      { tab: 'Episodes', ar: 'الحلقات', en: 'Episodes' },
      { tab: 'Characters', ar: 'الشخصيات', en: 'Characters' },
      { tab: 'Gallery', ar: 'المعرض', en: 'Gallery' },
    ];

  return (
    <footer
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative w-full bg-[#F3E7D3] border-t border-[#27272F]/10 text-[#27272F] px-4 sm:px-8 md:px-[5%] py-10 sm:py-12"
    >
      {/* Interactive Social Feedback Toast */}
      <AnimatePresence>
        {activeSocialToast && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className={`fixed bottom-6 ${
              isAr ? 'left-6' : 'right-6'
            } z-40 bg-[#28292E] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#F5C729]/40`}
          >
            <span className="w-7 h-7 rounded-full bg-[#F5C729] text-[#27272F] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </span>
            <div className="text-xs sm:text-sm">
              <div className="font-extrabold text-[#F5C729]">
                {isAr ? activeSocialToast.nameAr : activeSocialToast.nameEn}
              </div>
              <div className="text-white/85 font-medium">
                {isAr
                  ? `الحساب الرسمي: ${activeSocialToast.handle}`
                  : `Official channel: ${activeSocialToast.handle}`}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full flex flex-col gap-8">
        {/* Top Row: Brand Wordmark, Navigation Mirror, and Back to Top Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Lockup */}
          <div className="flex flex-col items-center md:items-start text-center md:text-start">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-[#27272F] whitespace-nowrap flex items-baseline select-none"
            >
              {isAr ? (
                <>
                  <span>توم</span>
                  <span className="font-arabic-script text-[#F5C729] text-2xl sm:text-[32px] mx-1 font-bold">
                    و
                  </span>
                  <span>جيري</span>
                  <sup className="text-[9px] font-bold text-[#27272F]/70 mr-0.5 -top-3">TM</sup>
                </>
              ) : (
                <>
                  <span>Tom</span>
                  <span className="font-script text-[#F5C729] text-2xl sm:text-[32px] mx-0.5 font-normal">
                    &amp;
                  </span>
                  <span>Jerry</span>
                  <sup className="text-[9px] font-bold text-[#27272F]/70 ml-0.5 -top-3">TM</sup>
                </>
              )}
            </a>
            <p className="text-xs sm:text-sm text-[#27272F]/75 font-semibold mt-1.5 max-w-sm">
              {isAr
                ? 'عالم المرح والمقالب الكلاسيكية التي لا تنتهي بين أشهر ثنائي في تاريخ الرسوم المتحركة.'
                : 'The timeless world of mischief, slapstick comedy, and the classic cat-and-mouse chase.'}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav
            aria-label={isAr ? 'روابط التذييل' : 'Footer Navigation'}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4"
          >
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => onNavigate(item.tab)}
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-[#27272F]/80 hover:text-[#27272F] hover:bg-[#FCE4B6]/70 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {isAr ? item.ar : item.en}
              </button>
            ))}
          </nav>

          {/* Back to Top Button */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToTop}
            aria-label={isAr ? 'العودة إلى أعلى الصفحة' : 'Back to top'}
            className="group bg-[#28292E] hover:bg-[#F5C729] text-white hover:text-[#27272F] text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>{isAr ? 'العودة للأعلى' : 'Back to Top'}</span>
            <span className="w-6 h-6 rounded-full bg-white/15 group-hover:bg-[#27272F]/15 flex items-center justify-center transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </motion.button>
        </div>

        {/* Hairline Divider */}
        <div className="h-px w-full bg-[#27272F]/10" />

        {/* Bottom Row: Copyright Notice & Social Media Links */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          {/* Copyright Notice */}
          <p className="text-xs sm:text-sm text-[#27272F]/70 font-semibold text-center sm:text-start">
            {isAr
              ? `© ${new Date().getFullYear()} توم وجيري — جميع الحقوق محفوظة. المطاردة لا تنتهي أبداً.`
              : `© ${new Date().getFullYear()} Tom & Jerry — All rights reserved. The Chase Never Ends.`}
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-[#27272F]/60 hidden sm:inline-block mx-1">
              {isAr ? 'تابعنا على:' : 'Follow Us:'}
            </span>
            {SOCIAL_LINKS.map((social) => (
              <motion.button
                key={social.id}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleSocialClick(social)}
                aria-label={isAr ? `تابعنا على ${social.nameAr}` : `Follow on ${social.nameEn}`}
                title={`${isAr ? social.nameAr : social.nameEn} (${social.handle})`}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FCF3EC] hover:bg-[#F5C729] text-[#27272F] border border-[#27272F]/10 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                {social.icon}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
