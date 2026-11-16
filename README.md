# توم وجيري — المطاردة لا تنتهي أبداً! | Tom & Jerry — The Chase Never Ends! 🐱🧀🐭

تجربة ويب تفاعلية مستوحاة من عالم الكرتون الكلاسيكي **توم وجيري (Tom & Jerry)**، مصممة بدقة عالية مع دعم كامل للغتين **العربية (RTL)** و**الإنجليزية (LTR)**، رسوميات متحركة سلسة، ومؤثرات صوتية تفاعلية.

An interactive, full-width web experience celebrating the timeless world of **Tom & Jerry**, crafted with vintage 1940s animation warmth, full **Arabic (RTL)** and **English (LTR)** support, smooth animations, and synthesized cartoon sound effects.

---

## ✨ المميزات الرئيسية | Key Features

- **🌍 دعم كامل للغتين العربية والإنجليزية (Full Bilingual RTL & LTR Support)**
  - واجهة عربية أصلية من اليمين إلى اليسار (`dir="rtl"`) بشكل افتراضي مع خطوط عربية مخصصة (`Cairo` و `Marhey`)، وإمكانية التبديل الفوري إلى الإنجليزية (`dir="ltr"`) بخطوط (`Plus Jakarta Sans` و `Kaushan Script`).
  - انعكاس ذكي للرسوم التوضيحية والمسارات المنحنية والأيقونات حسب اتجاه اللغة.

- **🎬 قسم البطل التفاعلي للشاشات الكبيرة والجوال (Responsive Widescreen & Mobile Hero)**
  - تصميم متجاوب بالكامل (`100% Full-Width`) يتكيف مع الشاشات الكبيرة (`Widescreen 2000×930`)، الأجهزة اللوحية، والهواتف الذكية.
  - فقاعات كوميدية متحركة (`زوووم! 💨`، `طاااخ! 💥` / `ZOOM! 💨`, `WHAM! 💥`) عند النقر على مشهد المطاردة.

- **🔊 مؤثرات صوتية تفاعلية للشخصيات (Interactive Character Hover Sound Effects)**
  - قسم **"الثنائي الأشهر (The Duo)"** يضم بطاقتي **توم** و**جيري**.
  - تمرير المؤشر فوق بطاقة **توم** يشغّل صوت مواء كرتوني (`مياااو! / Meow!`)، وتمرير المؤشر فوق بطاقة **جيري** يشغّل صوت صرير الفأر (`سويييك! / Squeak!`) باستخدام **Web Audio API** بدون ملفات صوتية خارجية، مع زر كتم/تشغيل الصوت في شريط التنقل العلوي.
  - ملف تعريفي تفاعلي كامل (Dossier Modal) لكل شخصية يعرض الإحصائيات والقدرات والحيل المفضلة.

- **📺 حكايات كلاسيكية ومشغل حلقات تفاعلي (Classic Chronicles & Episode Player)**
  - استعراض الحلقات الكلاسيكية مع إمكانية التصفية حسب المواسم (`الموسم الأول`، `الموسم الثاني`).
  - مشغل حلقات تفاعلي (Interactive Storyboard Player) يعرض مشاهد الحلقة، أبرز اللحظات، ومعلومات سنة الإنتاج والمخرجين.

- **🖼️ معرض الفنون والبحث الفوري (Art Gallery & Instant Search)**
  - نافذة بحث فوري عن الحلقات والشخصيات باللغتين العربية والإنجليزية، بالإضافة إلى معرض اللوحات الفنية الكلاسيكية.

- **🦶 تذييل الصفحة الدائم (Persistent Footer)**
  - يتضمن روابط التواصل الاجتماعي الرسمية، روابط التنقل السريع، حقوق النشر، وزر العودة السلسة إلى أعلى الصفحة (`Back to Top`).

---

## 🛠️ التقنيات المستخدمة | Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animations:** Motion (`motion/react`)
- **Icons:** Lucide React (`lucide-react`)
- **Audio:** Native Browser Web Audio API Synthesizer

---

## 🚀 التشغيل المحلي | Getting Started Locally

1. **تثبيت الحزم | Install dependencies:**
   ```bash
   npm install
   ```

2. **تشغيل خادم التطوير | Start the development server:**
   ```bash
   npm run dev
   ```
   سيعمل التطبيق على الرابط `http://localhost:3000`.

3. **بناء نسخة الإنتاج | Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 هيكل المشروع | Project Structure

```text
├── public/
│   └── assets/
│       └── tom-and-jerry/       # الرسوم التوضيحية عالية الدقة للبطل والشخصيات والحلقات
├── src/
│   ├── components/
│   │   ├── Footer.tsx           # مكون التذييل الدائم مع روابط التواصل وزر العودة للأعلى
│   │   └── InteractiveModals.tsx# النوافذ التفاعلية (مشغل الحلقات، ملفات الشخصيات، المعرض والبحث)
│   ├── data/
│   │   └── tomAndJerryData.ts   # البيانات ثنائية اللغة (العربية والإنجليزية) للحلقات والشخصيات
│   ├── utils/
│   │   └── soundEffects.ts      # مولد المؤثرات الصوتية (مواء توم وصرير جيري) عبر Web Audio API
│   ├── App.tsx                  # المكون الرئيسي للصفحة المتجاوبة
│   ├── index.css                # إعدادات الخطوط و Tailwind CSS
│   └── main.tsx                 # نقطة دخول تطبيق React
├── index.html
├── package.json
└── README.md
```
