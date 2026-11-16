export type Language = 'ar' | 'en';

export interface Episode {
  id: string;
  title: string;
  titleAr: string;
  code: string;
  codeAr: string;
  season: 1 | 2;
  episodeNumber: number;
  year: number;
  duration: string;
  thumbnail: string;
  synopsis: string;
  synopsisAr: string;
  director: string;
  directorAr: string;
  iconicGag: string;
  iconicGagAr: string;
  soundEffect: string;
  soundEffectAr: string;
  frames: {
    timestamp: string;
    caption: string;
    captionAr: string;
    actionTag: string;
    actionTagAr: string;
  }[];
}

export interface CharacterProfile {
  id: 'tom' | 'jerry';
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  shortBio: string;
  shortBioAr: string;
  fullBio: string;
  fullBioAr: string;
  cardBg: string;
  accentColor: string;
  image: string;
  signatureMove: string;
  signatureMoveAr: string;
  favoriteItem: string;
  favoriteItemAr: string;
  winRate: string;
  winRateAr: string;
  firstAppearance: string;
  firstAppearanceAr: string;
  traits: string[];
  traitsAr: string[];
  iconicMoments: string[];
  iconicMomentsAr: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  titleAr: string;
  episodeCode: string;
  episodeCodeAr: string;
  year: string;
  image: string;
  caption: string;
  captionAr: string;
  category: 'Chase Scenes' | 'Character Portraits' | 'Slapstick Gags';
  categoryAr: string;
}

export const EPISODES: Episode[] = [
  {
    id: 'cheese-chase',
    title: 'Cheese Chase',
    titleAr: 'مطاردة الجبنة',
    code: 'S1 · Ep 03',
    codeAr: 'م1 · حلقة 03',
    season: 1,
    episodeNumber: 3,
    year: 1942,
    duration: '07:42',
    thumbnail: '/assets/tom-and-jerry/ep1-cheese-chase.png',
    synopsis:
      'Jerry sets his sights on a prized wedge of aged Swiss cheese on the kitchen counter, while Tom devises an elaborate string-and-anvil trap that backfires spectacularly.',
    synopsisAr:
      'يضع جيري عينه على قطعة شهية من الجبن السويسري الفاخر فوق طاولة المطبخ، بينما ينصب توم فخاً معقداً بالحبال والسندان ينقلب عليه بطريقة كوميدية مذهلة.',
    director: 'William Hanna & Joseph Barbera',
    directorAr: 'ويليام هانا وجوزيف باربيرا',
    iconicGag: 'Spring-loaded mousetrap switcheroo under the kitchen floorboards',
    iconicGagAr: 'خدعة تبديل مصيدة الفئران الزنبركية تحت ألواح أرضية المطبخ',
    soundEffect: 'SNAP! BOING!',
    soundEffectAr: 'طاااخ! بوينغ!',
    frames: [
      {
        timestamp: '01:14',
        caption: 'Jerry tiptoes past a sleeping Tom holding a wedge of golden Swiss cheese twice his size.',
        captionAr: 'يتسلل جيري على أطراف أصابعه بجانب توم النائم حاملاً قطعة جبن سويسري ذهبية تفوق حجمه مرتين.',
        actionTag: 'Stealth Heist',
        actionTagAr: 'تسلل ذكي',
      },
      {
        timestamp: '03:48',
        caption: 'Tom corners Jerry at the mousehole, squinting right at the cheese wedge before Jerry pulls the rug!',
        captionAr: 'يحاصر توم جيري عند جحره محدقاً في قطعة الجبن مباشرة قبل أن يسحب جيري البساط من تحته!',
        actionTag: 'Face-Off',
        actionTagAr: 'مواجهة حاسمة',
      },
      {
        timestamp: '06:20',
        caption: 'Jerry enjoys his cheese in a miniature armchair while Tom gets tangled in his own pulley rope.',
        captionAr: 'يستمتع جيري بقطعة الجبن فوق كرسيه الصغير بينما يتشابك توم في حبال البكرة التي نصبها بنفسه.',
        actionTag: 'Grand Finale',
        actionTagAr: 'النهاية السعيدة',
      },
    ],
  },
  {
    id: 'kitchen-chaos',
    title: 'Kitchen Chaos',
    titleAr: 'فوضى المطبخ',
    code: 'S1 · Ep 07',
    codeAr: 'م1 · حلقة 07',
    season: 1,
    episodeNumber: 7,
    year: 1943,
    duration: '08:05',
    thumbnail: '/assets/tom-and-jerry/ep2-kitchen-chaos.png',
    synopsis:
      'Wearing miniature and oversized chef hats, Jerry and Tom turn midnight baking into a full-scale culinary duel with cast-iron skillets, flying pie dough, and runaway rolling pins.',
    synopsisAr:
      'بقبعات الطهاة البيضاء، يحوّل جيري وتوم خَبز منتصف الليل إلى مبارزة طهي شاملة بالمقالي الحديدية وعجين الفطائر الطائر والشوبك المتدحرج.',
    director: 'William Hanna & Joseph Barbera',
    directorAr: 'ويليام هانا وجوزيف باربيرا',
    iconicGag: 'Synchronized chef-hat standoff with a cast-iron frying pan',
    iconicGagAr: 'مواجهة قبعات الطهاة الشهيرة مع المقلاة الحديدية',
    soundEffect: 'CLANG! SPLAT!',
    soundEffectAr: 'كلااانغ! تشاااخ!',
    frames: [
      {
        timestamp: '00:52',
        caption: 'Chef Jerry seasons a miniature pancake before Tom barges in wearing a towering baker toque.',
        captionAr: 'الشيف جيري يُعد فطيرة صغيرة شهية قبل أن يقتحم توم المطبخ مرتدياً قبعة طاهٍ عملاقة.',
        actionTag: 'Pastry Duel',
        actionTagAr: 'مبارزة المعجنات',
      },
      {
        timestamp: '04:15',
        caption: 'Jerry brandishes a miniature frying pan as Tom gasps in disbelief across the kitchen island.',
        captionAr: 'يلوّح جيري بمقلاة صغيرة بثقة بينما يشهق توم في ذهول على الجانب الآخر من طاولة المطبخ.',
        actionTag: 'Skillet Standoff',
        actionTagAr: 'مواجهة المقلاة',
      },
      {
        timestamp: '07:30',
        caption: 'A triple-layer custard pie lands squarely on Tom, crowning him Chef of the Night.',
        captionAr: 'فطيرة كاسترد من ثلاث طبقات تهبط مباشرة على وجه توم لتتوّجه شيف الليلة.',
        actionTag: 'Custard Finale',
        actionTagAr: 'ختام الكاسترد',
      },
    ],
  },
  {
    id: 'vacation-caper',
    title: 'Vacation Caper',
    titleAr: 'مغامرة العطلة',
    code: 'S2 · Ep 01',
    codeAr: 'م2 · حلقة 01',
    season: 2,
    episodeNumber: 1,
    year: 1945,
    duration: '07:55',
    thumbnail: '/assets/tom-and-jerry/ep3-vacation-caper.png',
    synopsis:
      'Tom tries to enjoy a peaceful afternoon lounging in dark sunglasses by the beach, only for Jerry to commandeer his striped sun umbrella and launch a seaside prank war.',
    synopsisAr:
      'يحاول توم الاستمتاع بظهيرة هادئة مسترخياً بنظاراته الشمسية على الشاطئ، لكن جيري يستولي على مظلته الشمسية ويشعل حرب مقالب بحرية لا تُنسى.',
    director: 'William Hanna & Joseph Barbera',
    directorAr: 'ويليام هانا وجوزيف باربيرا',
    iconicGag: 'Folding deck-chair catapult into a crab bucket',
    iconicGagAr: 'مقلاع كرسي الشاطئ القابل للطي مباشرة نحو دلو السلطعونات',
    soundEffect: 'SPLASH! ZIP!',
    soundEffectAr: 'تشلاااش! زيييب!',
    frames: [
      {
        timestamp: '01:30',
        caption: 'Tom reclines on a wooden deck chair with cool shades while Jerry waves cheerfully from the sand.',
        captionAr: 'يسترخي توم على كرسي الشاطئ الخشبي بنظارته الأنيقة بينما يلوّح له جيري بمرح من فوق الرمال.',
        actionTag: 'Beachside Truce',
        actionTagAr: 'هدنة الشاطئ',
      },
      {
        timestamp: '04:40',
        caption: 'Jerry replaces Tom’s coconut drink straw with a mischievous hermit crab.',
        captionAr: 'يستبدل جيري ماصة عصير جوز الهند الخاصة بتوم بسلطعون بحر مشاغب.',
        actionTag: 'Umbrella Hijinks',
        actionTagAr: 'مقالب المظلة',
      },
      {
        timestamp: '07:10',
        caption: 'Jerry sails across the waves on a surfboard made from Tom’s sunglasses.',
        captionAr: 'يبحر جيري فوق الأمواج مستخدماً نظارة توم الشمسية كلوح ركوب أمواج.',
        actionTag: 'Sunset Escape',
        actionTagAr: 'هروب الغروب',
      },
    ],
  },
  {
    id: 'midnight-concerto',
    title: 'Midnight Concerto',
    titleAr: 'كونشيرتو منتصف الليل',
    code: 'S1 · Ep 09',
    codeAr: 'م1 · حلقة 09',
    season: 1,
    episodeNumber: 9,
    year: 1946,
    duration: '07:58',
    thumbnail: '/assets/tom-and-jerry/ep1-cheese-chase.png',
    synopsis:
      'Concert pianist Tom performs Hungarian Rhapsody No. 2 until a sleepy Jerry wakes up inside the grand piano hammers and steals the spotlight.',
    synopsisAr:
      'يعزف توم مقطوعة كلاسيكية ببراعة على البيانو الكبير حتى يستيقظ جيري داخل أوتار البيانو ويسرق الأضواء والتصفيق.',
    director: 'William Hanna & Joseph Barbera',
    directorAr: 'ويليام هانا وجوزيف باربيرا',
    iconicGag: 'Jerry playing lightning-fast arpeggios with piano felt hammers',
    iconicGagAr: 'عزف جيري السريع كالبرق باستخدام مطارق البيانو الداخلية',
    soundEffect: 'PLINK! CRASH!',
    soundEffectAr: 'تررررن! بوووم!',
    frames: [
      {
        timestamp: '01:05',
        caption: 'Tom adjusts his tuxedo tails and begins a dramatic classical solo.',
        captionAr: 'يضبط توم بدلته الرسمية ويبدأ عزفاً منفرداً درامياً.',
        actionTag: 'Opening Movement',
        actionTagAr: 'الافتتاحية الموسيقية',
      },
      {
        timestamp: '04:22',
        caption: 'Jerry dances across the ivory keys, speeding up the tempo beyond Tom’s reach.',
        captionAr: 'يرقص جيري فوق مفاتيح البيانو مسرّعاً الإيقاع يفوق قدرة توم.',
        actionTag: 'Keyed Up',
        actionTagAr: 'إيقاع متسارع',
      },
      {
        timestamp: '07:45',
        caption: 'Jerry takes the final bow to thunderous applause while Tom collapses over the keyboard.',
        captionAr: 'ينحني جيري لتحية الجمهور وسط تصفيق حار بينما ينهار توم من التعب فوق المفاتيح.',
        actionTag: 'Standing Ovation',
        actionTagAr: 'تحية الجمهور',
      },
    ],
  },
  {
    id: 'pantry-patrol',
    title: 'Pantry Patrol',
    titleAr: 'دورية خزانة الطعام',
    code: 'S2 · Ep 04',
    codeAr: 'م2 · حلقة 04',
    season: 2,
    episodeNumber: 4,
    year: 1947,
    duration: '07:19',
    thumbnail: '/assets/tom-and-jerry/ep2-kitchen-chaos.png',
    synopsis:
      'Tasked with guarding the holiday banquet table without a single crumb going missing, Tom faces Jerry’s most ingenious catapult and pulley contraptions.',
    synopsisAr:
      'يُكلَّف توم بحراسة مائدة الوليمة الفاخرة دون ضياع فتات واحد، ليواجه أذكى اختراعات جيري من المقاليع والبكرات.',
    director: 'William Hanna & Joseph Barbera',
    directorAr: 'ويليام هانا وجوزيف باربيرا',
    iconicGag: 'Celery-stalk pole vault over a tower of porcelain plates',
    iconicGagAr: 'القفز بالزانة بعود الكرفس فوق برج من الأطباق الصينية',
    soundEffect: 'WHOOSH! DING!',
    soundEffectAr: 'فوووش! دييينغ!',
    frames: [
      {
        timestamp: '02:00',
        caption: 'Jerry uses a soup ladle as a medieval trebuchet to launch olives across the dining room.',
        captionAr: 'يستخدم جيري مغرفة الحساء كمنجنيق لإطلاق حبات الزيتون عبر غرفة الطعام.',
        actionTag: 'Banquet Siege',
        actionTagAr: 'حصار الوليمة',
      },
      {
        timestamp: '05:12',
        caption: 'Tom juggles twelve spinning china dishes while skating on spilled butter.',
        captionAr: 'يوازن توم اثني عشر طبقاً دواراً بينما يتزحلق فوق الزبدة المنسكبة.',
        actionTag: 'Plate Spin',
        actionTagAr: 'توازن الأطباق',
      },
      {
        timestamp: '06:58',
        caption: 'Jerry hosts a miniature feast inside the grandfather clock.',
        captionAr: 'يقيم جيري وليمة مصغرة فاخرة داخل ساعة الحائط الكبيرة.',
        actionTag: 'Midnight Feast',
        actionTagAr: 'وليمة منتصف الليل',
      },
    ],
  },
  {
    id: 'boardwalk-breeze',
    title: 'Boardwalk Breeze',
    titleAr: 'نسيم الكورنيش',
    code: 'S2 · Ep 08',
    codeAr: 'م2 · حلقة 08',
    season: 2,
    episodeNumber: 8,
    year: 1948,
    duration: '07:34',
    thumbnail: '/assets/tom-and-jerry/ep3-vacation-caper.png',
    synopsis:
      'A sunny afternoon on the coastal boardwalk turns into a high-speed roller-skate chase past cotton candy carts, parasols, and diving boards.',
    synopsisAr:
      'تتحول نزهة مشمسة على الكورنيش الساحلي إلى مطاردة فائقة السرعة بزلاجات العجلات بين عربات غزل البنات والمظلات.',
    director: 'William Hanna & Joseph Barbera',
    directorAr: 'ويليام هانا وجوزيف باربيرا',
    iconicGag: 'Runaway striped beach umbrella parachute landing',
    iconicGagAr: 'الهبوط بالمظلة الشمسية المخططة مثل المظليين',
    soundEffect: 'ZOOM! HONK!',
    soundEffectAr: 'زوووم! بيب بيب!',
    frames: [
      {
        timestamp: '01:40',
        caption: 'Tom spots Jerry lounging under a golden beach umbrella with a chilled lemonade.',
        captionAr: 'يلمح توم جيري مسترخياً تحت مظلة شاطئية ذهبية مع كوب ليموناضة مثلج.',
        actionTag: 'Sun & Sand',
        actionTagAr: 'شمس ورمال',
      },
      {
        timestamp: '04:05',
        caption: 'A gust of ocean wind lifts Tom into the sky holding the yellow parasol.',
        captionAr: 'تهب رياح البحر لترفع توم عالياً في السماء وهو ممسك بالمظلة الصفراء.',
        actionTag: 'Airborne Cat',
        actionTagAr: 'تحليق في الهواء',
      },
      {
        timestamp: '07:15',
        caption: 'Jerry waves goodbye from the pier while Tom paddles back on a rubber duck.',
        captionAr: 'يلوّح جيري مودعاً من الرصيف البحري بينما يجدف توم عائداً فوق بطة مطاطية.',
        actionTag: 'Pier Farewell',
        actionTagAr: 'وداع الرصيف',
      },
    ],
  },
];

export const CHARACTERS: Record<'tom' | 'jerry', CharacterProfile> = {
  tom: {
    id: 'tom',
    name: 'Tom',
    nameAr: 'توم',
    role: 'The Scheming House Cat',
    roleAr: 'القط المنزلي صاحب الخطط',
    shortBio: 'The ever-persistent cat with big plans (and bigger failures)!',
    shortBioAr: 'القط المثابر دائماً صاحب الخطط الكبيرة (والإخفاقات الأكبر)!',
    fullBio:
      'Thomas "Tom" Cat is a grey-and-white domestic shorthair with boundless ambition, theatrical flair, and an encyclopedic knowledge of Rube Goldberg traps. Whether he is daydreaming on his elbows or lunging across the living room rug, Tom never gives up the chase—even though his elaborate contraptions almost always backfire on him.',
    fullBioAr:
      'توماس "توم" هو قط منزلي رمادي وأبيض يتمتع بطموح لا حدود له، وحسّ مسرحي فكاهي، وخبرة واسعة في نصب المصائد المعقدة. سواء كان شارداً في أحلام اليقظة مسنداً ذقنه على كفّيه أو منقضّاً عبر سجادة غرفة المعيشة، لا يستسلم توم أبداً في المطاردة—حتى وإن كانت خططه المتقنة تنقلب عليه دائماً في النهاية!',
    cardBg: '#DCE0E9',
    accentColor: '#6D7A96',
    image: '/assets/tom-and-jerry/tom-card-v3.png',
    signatureMove: 'Elaborate Rube Goldberg Mousetrap & Dramatic Tiptoe',
    signatureMoveAr: 'المصائد المبتكرة المعقدة والتسلل الدرامي على أطراف الأصابع',
    favoriteItem: 'Saucer of Warm Milk & Classical Piano',
    favoriteItemAr: 'طبق الحليب الدافئ وعزف البيانو الكلاسيكي',
    winRate: '8% (Moral victories included)',
    winRateAr: '8% (شاملة الانتصارات المعنوية)',
    firstAppearance: 'Puss Gets the Boot (1940)',
    firstAppearanceAr: 'القط ينال الجزاء (1940)',
    traits: ['Relentless', 'Dramatic', 'Secretly Soft-Hearted', 'Master Pianist'],
    traitsAr: ['مثابر لا ييأس', 'استعراضي', 'طيب القلب سراً', 'عازف بيانو ماهر'],
    iconicMoments: [
      'Performing Liszt’s Hungarian Rhapsody No. 2 in full concert tails',
      'Daydreaming with chin in paws while plotting his next kitchen ambush',
      'Teaming up with Jerry whenever an outside rival threatens their home',
    ],
    iconicMomentsAr: [
      'عزف الرابسودية المجرية الثانية ببراعة في الحفل الموسيقي',
      'الاستغراق في أحلام اليقظة مسنداً ذقنه على كفّيه أثناء التخطيط لكمين جديد',
      'التحالف مع جيري فوراً عندما يهدد منافس خارجي منزلهما المشترك',
    ],
  },
  jerry: {
    id: 'jerry',
    name: 'Jerry',
    nameAr: 'جيري',
    role: 'The Quick-Witted Mouse',
    roleAr: 'الفأر الذكي سريع البديهة',
    shortBio: 'The small mouse with a big brain and endless tricks!',
    shortBioAr: 'الفأر الصغير ذو العقل الكبير والحيل التي لا تنتهي!',
    fullBio:
      'Jerome "Jerry" Mouse may be pocket-sized, but he possesses lightning reflexes, unflappable confidence, and a genius knack for turning Tom’s own traps against him. Living comfortably behind the baseboard mousehole—complete with a cheese-wedge bed and sardine-can armchair—Jerry treats every chase like the best game in town.',
    fullBioAr:
      'قد يكون "جيري" صغير الحجم، لكنه يمتلك سرعة بديهة خاطفة، وثقة لا تهتز، وعبقرية مدهشة في قلب مصائد توم ضده. يعيش جيري برفاهية داخل جحره الصغير المجهز بسرير من الجبن وكرسي من علبة السردين، ويتعامل مع كل مطاردة وكأنها أمتع لعبة في العالم!',
    cardBg: '#FCE6C1',
    accentColor: '#F5C729',
    image: '/assets/tom-and-jerry/jerry-card-v2.png',
    signatureMove: 'Last-Second Sidestep & Counter-Trap Reversal',
    signatureMoveAr: 'المراوغة في اللحظة الأخيرة وقلب الفخ على صاحبه',
    favoriteItem: 'Aged Golden Swiss Cheese Wedge',
    favoriteItemAr: 'قطعة الجبن السويسري الذهبي الفاخر',
    winRate: '92% Undisputed Champion',
    winRateAr: '92% بطل المطاردة بلا منازع',
    firstAppearance: 'Puss Gets the Boot (1940)',
    firstAppearanceAr: 'القط ينال الجزاء (1940)',
    traits: ['Quick-Witted', 'Fearless', 'Cheerful', 'Resourceful'],
    traitsAr: ['سريع البديهة', 'شجاع', 'مرح دائماً', 'واسع الحيلة'],
    iconicMoments: [
      'Sprinting effortlessly along the golden chase trail with a wide grin',
      'Outsmarting Tom in the kitchen while wearing a miniature chef toque',
      'Sharing a sneaky slice of Swiss cheese with Nibbles after a successful heist',
    ],
    iconicMomentsAr: [
      'الانطلاق بخفة وابتسامة عريضة على المسار الذهبي متقدماً على توم بخطوة دائماً',
      'التفوق على توم في المطبخ وهو يرتدي قبعة الطاهي الصغيرة وحاملاً المقلاة',
      'مشاركة شريحة الجبن السويسري الشهية بعد نجاح الخطة بامتياز',
    ],
  },
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Classic Lunge',
    titleAr: 'القفزة الكلاسيكية',
    episodeCode: 'Hero Key Art',
    episodeCodeAr: 'اللوحة الرئيسية',
    year: '1942',
    image: '/assets/tom-and-jerry/hero-chase-v3.png',
    caption: 'Tom lunges at full speed while Jerry stays one joyful stride ahead along the golden trail.',
    captionAr: 'توم ينقضّ بأقصى سرعته بينما يسبقه جيري بخطوة مرحة على المسار الذهبي.',
    category: 'Chase Scenes',
    categoryAr: 'مشاهد المطاردة',
  },
  {
    id: 'gal-2',
    title: 'Cheese Stand-Off',
    titleAr: 'مواجهة الجبنة',
    episodeCode: 'S1 · Ep 03',
    episodeCodeAr: 'م1 · حلقة 03',
    year: '1942',
    image: '/assets/tom-and-jerry/ep1-cheese-chase.png',
    caption: 'Eye-to-eye over a prized wedge of Swiss cheese right outside Jerry’s mousehole.',
    captionAr: 'وجهاً لوجه أمام قطعة الجبن السويسري الشهية بالقرب من جحر جيري.',
    category: 'Slapstick Gags',
    categoryAr: 'مقالب كوميدية',
  },
  {
    id: 'gal-3',
    title: 'Chef Hat Duel',
    titleAr: 'مبارزة قبعات الطهاة',
    episodeCode: 'S1 · Ep 07',
    episodeCodeAr: 'م1 · حلقة 07',
    year: '1943',
    image: '/assets/tom-and-jerry/ep2-kitchen-chaos.png',
    caption: 'Jerry brandishes a cast-iron skillet in full culinary uniform during Kitchen Chaos.',
    captionAr: 'جيري يرفع المقلاة الحديدية بزي الطاهي الكامل في حلقة فوضى المطبخ.',
    category: 'Slapstick Gags',
    categoryAr: 'مقالب كوميدية',
  },
  {
    id: 'gal-4',
    title: 'Seaside Lounging',
    titleAr: 'استرخاء على الشاطئ',
    episodeCode: 'S2 · Ep 01',
    episodeCodeAr: 'م2 · حلقة 01',
    year: '1945',
    image: '/assets/tom-and-jerry/ep3-vacation-caper.png',
    caption: 'Cool shades and sunny skies before the seaside mischief begins in Vacation Caper.',
    captionAr: 'نظارات شمسية وأجواء صيفية مشمسة قبل أن تبدأ مقالب الشاطئ في مغامرة العطلة.',
    category: 'Chase Scenes',
    categoryAr: 'مشاهد المطاردة',
  },
  {
    id: 'gal-5',
    title: 'Daydreaming Tom',
    titleAr: 'توم الحالم',
    episodeCode: 'Character Study',
    episodeCodeAr: 'بورتريه الشخصية',
    year: '1944',
    image: '/assets/tom-and-jerry/tom-card-v3.png',
    caption: 'A rare moment of blissful contentment as Tom imagines his latest foolproof plan succeeding.',
    captionAr: 'لحظة نادرة من الهدوء والسعادة بينما يتخيل توم نجاح خطته الجديدة.',
    category: 'Character Portraits',
    categoryAr: 'صور الشخصيات',
  },
  {
    id: 'gal-6',
    title: 'Triumphant Jerry',
    titleAr: 'جيري المنتصر',
    episodeCode: 'Character Study',
    episodeCodeAr: 'بورتريه الشخصية',
    year: '1944',
    image: '/assets/tom-and-jerry/jerry-card-v2.png',
    caption: 'Arms wide open in celebration after another narrow escape and a full pantry raid.',
    captionAr: 'يفتح ذراعيه فرحاً واحتفالاً بعد نجاة ذكية أخرى وغنيمة وفيرة من الجبن.',
    category: 'Character Portraits',
    categoryAr: 'صور الشخصيات',
  },
];
