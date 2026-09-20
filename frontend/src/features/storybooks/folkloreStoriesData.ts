// 20 Authentic Jharkhand Tribal Folklore Stories & Moral Tales
// Spanning Santhali, Ho, Mundari, Kurukh, Kudmali, Hindi & English

export interface StoryScene {
  sceneNumber: number;
  imageEmoji: string;
  hindiText: string;
  targetScriptMap: Record<string, string>;
  targetLatinMap: Record<string, string>;
  keyWords: Array<{ wordHi: string; wordTarget: string }>;
}

export interface FolkloreStory {
  id: string;
  category: 'nature' | 'heroes' | 'festivals' | 'fables';
  categoryNameHi: string;
  titleHi: string;
  moralHi: string;
  estimatedDurationMin: number;
  scenes: StoryScene[];
}

export const FOLKLORE_STORIES: FolkloreStory[] = [
  {
    id: 'story_1',
    category: 'fables',
    categoryNameHi: 'पशु-पक्षी व नीति कथाएँ',
    titleHi: 'चालाक खरगोश और वन का हाथी',
    moralHi: 'बुद्धि बल से बड़ी होती है। आपसी एकता से हर संकट दूर होता है।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🌲 🐇 🐘 🌳',
        hindiText: 'सारंडा के घने जंगल में एक नटखट खरगोश रहता था। वह रोज़ साल और महुआ के पेड़ों के बीच खुशी से कूदता था।',
        targetScriptMap: {
          sat: 'ᱥᱟᱨᱟᱱᱰᱟ ᱨᱮᱭᱟᱜ ᱜᱟᱡᱟᱲ ᱵᱤᱨ ᱨᱮ ᱢᱤᱫᱴᱟᱝ ᱪᱟᱞᱟᱠ ᱠᱩᱞᱟᱹᱭ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟᱭ᱾ ᱩᱱᱤ ᱫᱤᱱᱟᱹᱢ ᱜᱮ ᱥᱟᱨᱡᱚᱢ ᱟᱨ ᱢᱟᱛᱠᱚᱢ ᱫᱟᱨᱮ ᱛᱟᱞᱟ ᱨᱮ ᱫᱚᱱ ᱵᱟᱲᱟᱭᱟᱭ᱾',
          hoc: 'ᱥᱟᱨᱟᱱᱰᱟ ᱵᱤᱨ ᱨᱮ ᱢᱤᱫ ᱪᱟᱞᱟᱠ ᱠᱩᱞᱟᱹᱭ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟᱭ᱾ ᱩᱱᱤ ᱫᱤᱱᱟᱹᱢ ᱜᱮ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱩ ᱞᱟᱛᱟᱨ ᱨᱮ ᱮᱱᱮᱡ ᱛᱟᱦᱮᱸᱠᱟᱱᱟᱭ᱾',
          unr: 'सारंडा गाजड़ बीर रे मिद चतुर कुलाई ताहेकेना। उनी दिनम सरजोम दारू लातार रे दोंगाये ताहेकेना।',
          kyw: 'सारंडाक बोने एके चतुर खेरहा रोहो। उ नित्ये सोखुआ आर महुआ गाछक तोले खुशी मनावे।',
          kru: 'सारंडा तड़ा गदही बीर नू ओंद बोंगे चतुर खरगोश रहचा।',
          hi: 'सारंडा के घने जंगल में एक नटखट खरगोश रहता था। वह रोज़ साल और महुआ के पेड़ों के बीच खुशी से कूदता था।',
          en: 'In the dense forest of Saranda lived a witty hare. He leaped happily among the Sal and Mahua trees.'
        },
        targetLatinMap: {
          sat: 'Saranda reyag gajaṛ bir re midtang calak kulai tahe kanay. Uni dinam ge sarjom ar matkom dare tala re don baṛayay.',
          hoc: 'Saranda bir re mid calak kulai tahekanay. Uni dinam ge sarjom daru latar re enej tahekanay.',
          unr: 'Saranda gajaṛ bir re mid catur kulai tahekena.',
          en: 'In the dense forest of Saranda lived a witty hare.'
        },
        keyWords: [{ wordHi: 'खरगोश', wordTarget: 'ᱠᱩᱞᱟᱹᱭ (Kulai)' }, { wordHi: 'जंगल', wordTarget: 'ᱵᱤᱨ (Bir)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🐘 💧 🏞️ 🌿',
        hindiText: 'एक दिन एक विशाल हाथी पानी की तलाश में आया और नदी का सारा शीतल जल पी गया।',
        targetScriptMap: {
          sat: 'ᱢᱤᱫ ᱫᱤᱱ ᱢᱤᱫᱴᱟᱝ ᱢᱟᱨᱟᱝ ᱦᱟᱹᱛᱤ ᱫᱟᱜ ᱯᱟᱸᱡᱟ ᱛᱮ ᱦᱮᱡ ᱮᱱᱟᱭ ᱟᱨ ᱜᱟᱰᱟ ᱨᱮᱭᱟᱜ ᱡᱚᱛᱚ ᱫᱟᱜ ᱮ ᱧᱩ ᱠᱮᱫ-ᱟ᱾',
          hoc: 'ᱢᱤ ᱫᱤᱱ ᱢᱤᱫ ᱢᱟᱨᱟᱝ ᱦᱟᱹᱛᱤ ᱫᱟᱜ ᱧᱩ ᱞᱟᱹᱜᱤᱫ ᱜᱟᱰᱟ ᱥᱮᱱ ᱮᱱᱟᱭ ᱟᱨ ᱫᱟᱜ ᱮ ᱧᱩ ᱪᱟᱵᱟ ᱠᱮᱫ-ᱟ᱾',
          unr: 'मिद दिन मिद मरांग हाथी दाः नाला सेनोः एते सोबेन दाः णू केदा।',
          kyw: 'एके दिन एके भारी हाथी पानीक संधाने आलो आर नइयक सब पानी पी गेलो।',
          hi: 'एक दिन एक विशाल हाथी पानी की तलाश में आया और नदी का सारा शीतल जल पी गया।',
          en: 'One day, an enormous elephant arrived seeking water and drank up all the cool river water.'
        },
        targetLatinMap: {
          sat: 'Mid din midtang marang hati daag pañja te hej enay.',
          en: 'One day, an enormous elephant arrived seeking water.'
        },
        keyWords: [{ wordHi: 'हाथी', wordTarget: 'ᱦᱟᱹᱛᱤ (Hati)' }, { wordHi: 'पानी', wordTarget: 'ᱫᱟᱜ (Daag)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🌕 🐇 🗣️ 🐘',
        hindiText: 'खरगोश टीले पर चढ़ा और बोला, "हे हाथी राजा! चंदा मामा इस निर्मल जल के रक्षक हैं, वे तुमसे अप्रसन्न हैं!"',
        targetScriptMap: {
          sat: 'ᱠᱩᱞᱟᱹᱭ ᱢᱤᱫ ᱩᱥᱩᱞ ᱰᱷᱤᱯ ᱪᱮᱛᱟᱱ ᱨᱮ ᱫᱮᱡ ᱠᱟᱛᱮ ᱢᱮᱱ ᱠᱮᱫ-ᱟ, "ᱦᱮ ᱦᱟᱹᱛᱤ ᱨᱟᱡᱟ! ᱪᱟᱸᱫᱚ ᱵᱟᱵᱟ ᱱᱚᱣᱟ ᱫᱟᱜ ᱨᱤᱱᱤᱡ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱟᱱᱟᱭ!"',
          hoc: 'ᱠᱩᱞᱟᱹᱭ ᱢᱮᱱ ᱠᱮᱫ-ᱟ: "ᱦᱮ ᱦᱟᱹᱛᱤ ᱨᱟᱡᱟ! ᱪᱟᱸᱫᱚ ᱵᱟᱵᱟ ᱱᱮᱭᱟ ᱫᱟᱜ ᱨᱤᱱᱤᱡ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱛᱟᱱᱟᱭ!"',
          unr: 'कुलाई उसुल टीला रे देः केते मेनेदा, "हे हाथी राजा! सिंगबोंगा आर चांडो बाबा ने दाः रेन रखिया तनकिन!"',
          hi: 'खरगोश टीले पर चढ़ा और बोला, "हे हाथी राजा! चंदा मामा इस निर्मल जल के रक्षक हैं, वे तुमसे अप्रसन्न हैं!"',
          en: 'The hare climbed a high mound and declared: "King Elephant, Moon Father guards this water!"'
        },
        targetLatinMap: {
          sat: 'Kulai mid usul ḍhip cetan re dej kate men ked-a.',
          en: 'The hare climbed a high mound and declared.'
        },
        keyWords: [{ wordHi: 'चंद्रमा', wordTarget: 'ᱪᱟᱸᱫᱚ (Cando)' }, { wordHi: 'राजा', wordTarget: 'ᱨᱟᱡᱟ (Raja)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🤝 🌲 🕊️ ✨',
        hindiText: 'हाथी ने जल में चंद्रमा का कांपता हुआ प्रतिबिंब देखा और क्षमा मांगी। फिर सबने मिलजुलकर रहना सीखा।',
        targetScriptMap: {
          sat: 'ᱦᱟᱹᱛᱤ ᱫᱚ ᱯᱩᱠᱷᱨᱤ ᱨᱮ ᱪᱟᱸᱫᱚ ᱣᱟᱜ ᱪᱷᱟᱸᱪ ᱧᱮᱞ ᱠᱟᱛᱮ ᱤᱠᱟᱹ ᱠᱷᱚᱡᱽ ᱠᱮᱫ-ᱟᱭ᱾ ᱡᱚᱛᱚ ᱡᱤᱭᱟᱹᱞᱤ ᱥᱩᱞᱩᱠ ᱛᱮ ᱠᱚ ᱛᱟᱦᱮᱸ ᱮᱱᱟ᱾',
          hoc: 'ᱦᱟᱹᱛᱤ ᱫᱟᱜ ᱨᱮ ᱪᱟᱸᱫᱚ ᱣᱟᱜ ᱪᱷᱟᱸᱪ ᱧᱮᱞ ᱠᱮᱛᱮ ᱠᱷᱚᱢᱟ ᱠᱩᱞᱤ ᱠᱮᱫ-ᱟ᱾ ᱤᱱᱟᱹ ᱛᱟᱭᱚᱢ ᱥᱩᱞᱩᱠ ᱛᱮ ᱠᱚ ᱛᱟᱦᱮᱸ ᱮᱱᱟ᱾',
          unr: 'हाथी दाः रे चांडो आः छाया नेल केते क्षमा आसी केदा। सोबेन जीव जीयाली सुलूक ते ताहेकेना।',
          hi: 'हाथी ने जल में चंद्रमा का कांपता हुआ प्रतिबिंब देखा और क्षमा मांगी। फिर सबने मिलजुलकर रहना सीखा।',
          en: 'The elephant saw the trembling reflection of the moon and apologized. Peace returned to the forest.'
        },
        targetLatinMap: {
          sat: 'Hati do pukhri re cando wag chanch ñel kate ika khoj ked-ay.',
          en: 'The elephant saw the trembling reflection and apologized.'
        },
        keyWords: [{ wordHi: 'सुलह/शांति', wordTarget: 'ᱥᱩᱞᱩᱠ (Suluk)' }, { wordHi: 'मित्र', wordTarget: 'ᱜᱟᱛᱮ (Gate)' }]
      }
    ]
  },
  {
    id: 'story_2',
    category: 'nature',
    categoryNameHi: 'प्रकृति व पर्यावरण',
    titleHi: 'पवित्र सरजोम (साल) वृक्ष और नन्हीं गौरैया',
    moralHi: 'प्रकृति और वृक्ष ही हमारे जीवन के सच्चे संरक्षक हैं।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🌳 🐦 🌧️ 🍃',
        hindiText: 'एक नन्हीं गौरैया भारी तूफ़ान में आश्रय खोज रही थी। कोई भी पेड़ उसे शरण नहीं दे रहा था।',
        targetScriptMap: {
          sat: 'ᱢᱤᱫ ᱦᱩᱰᱤᱧ ᱪᱮᱬᱮ ᱵᱟᱹᱨᱰᱩ ᱫᱟᱜ ᱨᱮ ᱟᱥᱨᱟ ᱯᱟᱸᱡᱟ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱫ᱾ ᱡᱟᱦᱟᱸᱭ ᱫᱟᱨᱮ ᱜᱮ ᱩᱱᱤ ᱵᱟᱠᱚ ᱟᱥᱨᱟ ᱮᱢᱟᱭ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱫ᱾',
          hoc: 'ᱢᱤᱫ ᱪᱮᱬᱮ ᱦᱚᱭ ᱫᱟᱜ ᱨᱮ ᱩᱠᱩᱱ ᱴᱷᱟᱶ ᱯᱟᱸᱡᱟ ᱛᱟᱦᱮᱸᱠᱟᱱᱟᱭ᱾',
          hi: 'एक नन्हीं गौरैया भारी तूफ़ान में आश्रय खोज रही थी। कोई भी पेड़ उसे शरण नहीं दे रहा था।',
          en: 'A little sparrow was seeking shelter in a fierce storm. No tree would take her in.'
        },
        targetLatinMap: {
          sat: 'Mid hudiñ ceṇe baṛdu daag re asra pañja kan tahend.',
          en: 'A little sparrow was seeking shelter in a fierce storm.'
        },
        keyWords: [{ wordHi: 'चिड़िया', wordTarget: 'ᱪᱮᱬᱮ (Ceṇe)' }, { wordHi: 'पेड़', wordTarget: 'ᱫᱟᱨᱮ (Dare)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🌳 💚 🛡️ 🌿',
        hindiText: 'विशाल साल (सरजोम) वृक्ष ने अपनी सघन शाखाएं फैलाईं और प्यार से कहा, "मेरी छांव में आ जाओ नन्हीं चिड़िया!"',
        targetScriptMap: {
          sat: 'ᱢᱟᱨᱟᱝ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱟᱡᱟᱜ ᱰᱟᱹᱨ ᱯᱟᱥᱱᱟᱣ ᱠᱟᱛᱮ ᱢᱮᱱ ᱠᱮᱫ-ᱟ, "ᱦᱤᱡᱩᱜ ᱢᱮ ᱦᱩᱰᱤᱧ ᱪᱮᱬᱮ, ᱤᱧᱟᱜ ᱩᱢᱩᱞ ᱨᱮ ᱛᱟᱦᱮᱸᱱ ᱢᱮ!"',
          hoc: 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱩ ᱢᱮᱱ ᱠᱮᱫ-ᱟ: "ᱦᱤᱡᱩᱜ ᱢᱮ, ᱟᱞᱤᱝ ᱨᱮ ᱩᱠᱩᱱ ᱢᱮ!"',
          hi: 'विशाल साल (सरजोम) वृक्ष ने अपनी सघन शाखाएं फैलाईं और प्यार से कहा, "मेरी छांव में आ जाओ नन्हीं चिड़िया!"',
          en: 'The grand Sal tree spread its thick branches and said, "Come, find rest under my shadow!"'
        },
        targetLatinMap: {
          sat: 'Marang sarjom dare ajag ḍar pasnaw kate men ked-a.',
          en: 'The grand Sal tree spread its branches.'
        },
        keyWords: [{ wordHi: 'साल वृक्ष', wordTarget: 'ᱥᱟᱨᱡᱚᱢ (Sarjom)' }, { wordHi: 'छाया', wordTarget: 'ᱩᱢᱩᱞ (Umul)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '💨 🌧️ 🛡️ 🐦',
        hindiText: 'तूफ़ान रात भर गर्जना करता रहा, लेकिन साल के मजबूत पत्तों ने गौरैया को भीगने नहीं दिया।',
        targetScriptMap: {
          sat: 'ᱧᱤᱫᱟᱹ ᱵᱷᱩᱨ ᱵᱟᱹᱨᱰᱩ ᱦᱚᱭ ᱮᱱᱟ, ᱢᱮᱱᱠᱷᱟᱱ ᱥᱟᱨᱡᱚᱢ ᱥᱟᱠᱟᱢ ᱪᱮᱬᱮ ᱫᱚ ᱵᱟᱭ ᱞᱚᱦᱚᱫ ᱦᱚᱪᱚ ᱟᱫᱮᱭᱟ᱾',
          hoc: 'ᱦᱚᱭ ᱫᱟᱜ ᱧᱤᱫᱟᱹ ᱪᱟᱵᱟ ᱦᱩᱭ ᱮᱱᱟ, ᱢᱮᱱᱫᱚ ᱥᱟᱨᱡᱚᱢ ᱥᱟᱠᱟᱢ ᱪᱮᱬᱮ ᱵᱟᱭ ᱞᱚᱦᱚᱫ ᱠᱮᱫ-ᱟ᱾',
          hi: 'तूफ़ान रात भर गर्जना करता रहा, लेकिन साल के मजबूत पत्तों ने गौरैया को भीगने नहीं दिया।',
          en: 'The storm raged all night, yet the tough Sal leaves protected the bird from getting wet.'
        },
        targetLatinMap: {
          sat: 'Ñida bhur baṛdu hoy ena, menkhan sarjom sakam ceṇe do bay lohod hoco adeya.',
          en: 'The storm raged all night, yet the leaves protected her.'
        },
        keyWords: [{ wordHi: 'पत्ता', wordTarget: 'ᱥᱟᱠᱟᱢ (Sakam)' }, { wordHi: 'रात', wordTarget: 'ᱧᱤᱫᱟᱹ (Ñida)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '☀️ 🌸 🌺 🎶',
        hindiText: 'सुबह खिली धूप में गौरैया ने साल के पत्तों को मीठा गीत सुनाया। तभी से सरजोम को आदिवासियों का पूज्य वृक्ष माना जाता है।',
        targetScriptMap: {
          sat: 'ᱥᱮᱛᱟᱜ ᱵᱮᱲᱟ ᱪᱮᱬᱮ ᱫᱚ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱥᱮᱨᱮᱧ ᱟᱸᱡᱚᱢ ᱟᱫᱮᱭᱟ᱾ ᱚᱱᱟ ᱠᱷᱟᱹᱛᱤᱨ ᱥᱟᱨᱡᱚᱢ ᱫᱚ ᱟᱵᱚ ᱨᱤᱱᱤᱡ ᱫᱷᱚᱨᱚᱢ ᱫᱟᱨᱮ ᱠᱟᱱᱟᱭ᱾',
          hoc: 'ᱥᱮᱛᱟᱜ ᱨᱮ ᱪᱮᱬᱮ ᱥᱟᱨᱡᱚᱢ ᱞᱟᱹᱜᱤᱫ ᱥᱮᱨᱮᱧ ᱠᱮᱫ-ᱟᱭ᱾ ᱥᱟᱨᱡᱚᱢ ᱫᱚ ᱟᱹᱰᱤ ᱯᱩᱱᱟᱹᱭ ᱫᱟᱨᱩ ᱛᱟᱱᱟ᱾',
          hi: 'सुबह खिली धूप में गौरैया ने साल के पत्तों को मीठा गीत सुनाया। तभी से सरजोम को आदिवासियों का पूज्य वृक्ष माना जाता है।',
          en: 'At sunrise, the sparrow sang a melodious song of gratitude. Since then, the Sal tree is revered as sacred.'
        },
        targetLatinMap: {
          sat: 'Setag beṛa ceṇe do sarjom dare sereñ añjom adeya.',
          en: 'At sunrise, the sparrow sang a song of gratitude.'
        },
        keyWords: [{ wordHi: 'सुबह', wordTarget: 'ᱥᱮᱛᱟᱜ (Setag)' }, { wordHi: 'गीत', wordTarget: 'ᱥᱮᱨᱮᱧ (Sereñ)' }]
      }
    ]
  },
  {
    id: 'story_3',
    category: 'festivals',
    categoryNameHi: 'पर्व व सांस्कृतिक परंपरा',
    titleHi: 'करम और धरम की अमर लोककथा',
    moralHi: 'कर्म और परिश्रम से ही भाग्य बदलता है। प्रकृति का सम्मान ही सच्ची पूजा है।',
    estimatedDurationMin: 5,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '👨‍🌾 🌾 🌿 ✨',
        hindiText: 'करम और धरम दो भाई थे। करम खेतों में खूब मेहनत करता था और धरम भाग्य के भरोसे रहता था।',
        targetScriptMap: {
          sat: 'ᱠᱟᱨᱟᱢ ᱟᱨ ᱫᱷᱟᱨᱟᱢ ᱵᱟᱨ ᱵᱚᱭᱦᱟ ᱠᱤᱱ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾ ᱠᱟᱨᱟᱢ ᱫᱚ ᱠᱷᱮᱛ ᱨᱮ ᱠᱟᱹᱢᱤᱭᱟᱭ, ᱫᱷᱟᱨᱟᱢ ᱫᱚ ᱠᱷᱟᱹᱞᱤ ᱛᱟᱦᱮᱸᱱᱟᱭ᱾',
          hoc: 'ᱠᱟᱨᱟᱢ ᱟᱨ ᱫᱷᱟᱨᱟᱢ ᱵᱟᱨ ᱵᱚᱭᱦᱟ ᱛᱟᱦᱮᱸᱠᱟᱱᱟᱠᱤᱱ᱾',
          hi: 'करम और धरम दो भाई थे। करम खेतों में खूब मेहनत करता था और धरम भाग्य के भरोसे रहता था।',
          en: 'Karam and Dharam were two brothers. Karam worked hard in the fields while Dharam relied on mere luck.'
        },
        targetLatinMap: { sat: 'Karam ar Dharam bar boyha kin tahe kana.' },
        keyWords: [{ wordHi: 'भाई', wordTarget: 'ᱵᱚᱭᱦᱟ (Boyha)' }, { wordHi: 'खेत', wordTarget: 'ᱠᱷᱮᱛ (Khet)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🌱 💧 🥀 🌾',
        hindiText: 'एक बार गाँव में सूखा पड़ा। करम की लगाई धान की बालियाँ लहलहाने लगीं क्योंकि उसने नहर बनाई थी।',
        targetScriptMap: {
          sat: 'ᱢᱤᱫ ᱫᱷᱟᱣ ᱟᱹᱛᱩ ᱨᱮ ᱨᱚᱦᱚᱲ ᱮᱱᱟ᱾ ᱢᱮᱱᱠᱷᱟᱱ ᱠᱟᱨᱟᱢ ᱟᱜ ᱦᱳᱲᱳ ᱫᱚ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱜᱮ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱦᱟᱛᱩ ᱨᱮ ᱟᱠᱟᱞ ᱦᱩᱭ ᱮᱱᱟ, ᱢᱮᱱᱫᱚ ᱠᱟᱨᱟᱢ ᱟᱜ ᱵᱟᱵᱟ ᱵᱮᱥ ᱦᱩᱭ ᱮᱱᱟ᱾',
          hi: 'एक बार गाँव में सूखा पड़ा। करम की लगाई धान की बालियाँ लहलहाने लगीं क्योंकि उसने नहर बनाई थी।',
          en: 'A drought hit the village. Yet Karam’s golden paddy thrived because he had dug irrigation channels.'
        },
        targetLatinMap: { sat: 'Mid dhaw atu re rohoṛ ena.' },
        keyWords: [{ wordHi: 'धान', wordTarget: 'ᱦᱳᱲᱳ (Hoṛo)' }, { wordHi: 'गाँव', wordTarget: 'ᱟᱹᱛᱩ (Atu)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🌳 🥁 💃 🕺',
        hindiText: 'भाद्रपद की एकादशी को करम की डाल लाकर पूरे गाँव ने मांदर की थाप पर नृत्य किया और करम देवता को नमन किया।',
        targetScriptMap: {
          sat: 'ᱠᱟᱨᱟᱢ ᱰᱟᱹᱨ ᱟᱹᱜᱩ ᱠᱟᱛᱮ ᱡᱚᱛᱚ ᱟᱹᱛᱩ ᱦᱚᱲ ᱴᱟᱢᱟᱠ-ᱛᱩᱢᱫᱟᱜ ᱨᱩ ᱥᱟᱶ ᱠᱚ ᱮᱱᱮᱡ ᱠᱮᱫ-ᱟ᱾',
          hoc: 'ᱠᱟᱨᱟᱢ ᱫᱟᱨᱩ ᱰᱟᱹᱨ ᱟᱹᱜᱩ ᱠᱮᱛᱮ ᱨᱩ-ᱛᱩᱨᱤ ᱛᱮ ᱮᱱᱮᱡ ᱠᱮᱫ-ᱟᱠᱚ᱾',
          hi: 'भाद्रपद की एकादशी को करम की डाल लाकर पूरे गाँव ने मांदर की थाप पर नृत्य किया और करम देवता को नमन किया।',
          en: 'On Bhadra Ekadashi, bringing the sacred Karam branch, the village danced to the rhythm of Tumdak drums.'
        },
        targetLatinMap: { sat: 'Karam ḍar agu kate joto atu hoṛ enej ked-a.' },
        keyWords: [{ wordHi: 'नृत्य', wordTarget: 'ᱮᱱᱮᱡ (Enej)' }, { wordHi: 'मांदर', wordTarget: 'ᱛᱩᱢᱫᱟᱜ (Tumdak)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🌾 🤝 🌟 🎊',
        hindiText: 'धरम ने समझ लिया कि कर्म ही सबसे बड़ा धर्म है। दोनों भाइयों ने मिलकर खेतों को फिर हरा-भरा कर दिया।',
        targetScriptMap: {
          sat: 'ᱫᱷᱟᱨᱟᱢ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫ-ᱟᱭ ᱡᱮ ᱠᱟᱹᱢᱤ ᱜᱮ ᱢᱟᱨᱟᱝ ᱫᱷᱚᱨᱚᱢ ᱠᱟᱱᱟ᱾ ᱵᱟᱱᱟᱨ ᱵᱚᱭᱦᱟ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱪᱟᱥ ᱠᱮᱫ-ᱟᱠᱤᱱ᱾',
          hoc: 'ᱫᱷᱟᱨᱟᱢ ᱵᱩᱡᱷᱟᱹᱣ ᱮᱱᱟ ᱡᱮ ᱯᱟᱹᱨᱤᱥᱨᱚᱢ ᱜᱮ ᱢᱟᱨᱟᱝ ᱛᱟᱱᱟ᱾',
          hi: 'धरम ने समझ लिया कि कर्म ही सबसे बड़ा धर्म है। दोनों भाइयों ने मिलकर खेतों को फिर हरा-भरा कर दिया।',
          en: 'Dharam realized that diligent work is the greatest worship. Together, they made the land green again.'
        },
        targetLatinMap: { sat: 'Dharam bujhaw ked-ay je kami ge marang dhorom kanay.' },
        keyWords: [{ wordHi: 'परिश्रम/कार्य', wordTarget: 'ᱠᱟᱹᱢᱤ (Kami)' }]
      }
    ]
  },
  {
    id: 'story_4',
    category: 'festivals',
    categoryNameHi: 'पर्व व सांस्कृतिक परंपरा',
    titleHi: 'सरहुल का पर्व और वसंत के साल फूल',
    moralHi: 'धरती माता और प्रकृति के प्रति आभार व्यक्त करना ही हमारी संस्कृति है।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🌸 🌺 🌲 🌞',
        hindiText: 'फागुन बीतने पर जब साल के पेड़ों पर सफेद-पीले फूल खिलते हैं, तो सारंडा और छोटानागपुर में सरहुल का पर्व आता है।',
        targetScriptMap: {
          sat: 'ᱵᱟᱦᱟ ᱵᱚᱝᱜᱟ ᱦᱮᱡ ᱮᱱ ᱠᱷᱟᱱ ᱥᱟᱨᱡᱚᱢ ᱵᱟᱦᱟ ᱯᱷᱩᱴᱟᱹᱣᱜ-ᱟ ᱟᱨ ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵ ᱦᱤᱡᱩᱜ-ᱟ᱾',
          hoc: 'ᱵᱟᱦᱟ ᱯᱟᱨᱟᱵᱽ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱵᱟᱦᱟ ᱛᱮ ᱦᱟᱛᱩ ᱥᱟᱡᱟᱣᱜ-ᱟ᱾',
          hi: 'फागुन बीतने पर जब साल के पेड़ों पर सफेद-पीले फूल खिलते हैं, तो सारंडा और छोटानागपुर में सरहुल का पर्व आता है।',
          en: 'With the arrival of spring, when Sal flowers bloom, Chotanagpur celebrates the joyous Sarhul festival.'
        },
        targetLatinMap: { sat: 'Baha bonga hej en khan sarjom baha phuṭawg-a.' },
        keyWords: [{ wordHi: 'फूल', wordTarget: 'ᱵᱟᱦᱟ (Baha)' }, { wordHi: 'त्योहार', wordTarget: 'ᱯᱚᱨᱚᱵ (Porob)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🪔 🍃 🏺 🙏',
        hindiText: 'गाँव के पाहन (नायके) जाहेर थान में मिट्टी के घड़े में जल देखकर भविष्य की वर्षा का अनुमान लगाते हैं।',
        targetScriptMap: {
          sat: 'ᱟᱹᱛᱩ ᱨᱤᱱᱤᱡ ᱱᱟᱭᱠᱮ ᱵᱟᱵᱟ ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ ᱨᱮ ᱫᱟᱜ ᱧᱮᱞ ᱠᱟᱛᱮ ᱫᱟᱜ-ᱡᱟᱹᱲᱤ ᱨᱮᱭᱟᱜ ᱠᱟᱛᱷᱟᱭ ᱞᱟᱹᱭᱟ᱾',
          hoc: 'ᱫᱮᱣᱨᱤ ᱵᱟᱵᱟ ᱫᱟᱜ ᱧᱮᱞ ᱠᱮᱛᱮ ᱦᱚᱭ-ᱫᱟᱜ ᱨᱮᱭᱟᱜ ᱵᱩᱫᱷᱤ ᱮᱢᱟᱭ᱾',
          hi: 'गाँव के पाहन (नायके) जाहेर थान में मिट्टी के घड़े में जल देखकर भविष्य की वर्षा का अनुमान लगाते हैं।',
          en: 'The priest inspects sacred water pots at Jaher Than to forecast the coming monsoon rainfall.'
        },
        targetLatinMap: { sat: 'Atu rinij nayke baba jaher than re daag ñel kate...' },
        keyWords: [{ wordHi: 'पुजारी', wordTarget: 'ᱱᱟᱭᱠᱮ (Nayke)' }, { wordHi: 'जल', wordTarget: 'ᱫᱟᱜ (Daag)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🌸 🧕 🧒 🌺',
        hindiText: 'पाहन हर घर में साल के फूल भेंट करते हैं। स्त्रियाँ जूड़े में और पुरुष कानों पर साल के फूल सजाते हैं।',
        targetScriptMap: {
          sat: 'ᱡᱚᱛᱚ ᱚᱲᱟᱜ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱵᱟᱦᱟ ᱠᱚ ᱦᱟᱹᱴᱤᱧᱟ ᱟᱨ ᱡᱚᱛᱚ ᱦᱚᱲ ᱨᱟᱹᱥᱠᱟᱹ ᱛᱮ ᱠᱚ ᱥᱟᱡᱟᱣᱜ-ᱟ᱾',
          hoc: 'ᱥᱟᱨᱡᱚᱢ ᱵᱟᱦᱟ ᱡᱚᱛᱚ ᱦᱚᱲ ᱞᱩᱛᱩᱨ ᱨᱮᱠᱚ ᱜᱚᱫ-ᱟ᱾',
          hi: 'पाहन हर घर में साल के फूल भेंट करते हैं। स्त्रियाँ जूड़े में और पुरुष कानों पर साल के फूल सजाते हैं।',
          en: 'Sacred Sal blossoms are distributed to every home, worn proudly in hair and above ears.'
        },
        targetLatinMap: { sat: 'Joto oṛag re sarjom baha ko hatiña.' },
        keyWords: [{ wordHi: 'घर', wordTarget: 'ᱚᱲᱟᱜ (Oṛag)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🥁 🎶 💃 🌾',
        hindiText: 'मांदर की गूंज पर माटी और प्रकृति का आभार माना जाता है। इसके बाद ही खेतों में नई बुवाई शुरू होती है।',
        targetScriptMap: {
          sat: 'ᱛᱩᱢᱫᱟᱜ-ᱴᱟᱢᱟᱠ ᱨᱩ ᱥᱟᱶ ᱫᱷᱟᱹᱨᱛᱤ ᱟᱭᱳ ᱠᱚ ᱡᱚᱦᱟᱨ ᱟᱭᱟ ᱟᱨ ᱱᱟᱣᱟ ᱪᱟᱥ ᱠᱚ ᱮᱦᱚᱵᱟ᱾',
          hoc: 'ᱫᱷᱟᱹᱨᱛᱤ ᱮᱸᱜᱟ ᱠᱮ ᱡᱚᱦᱟᱨ ᱠᱮᱛᱮ ᱱᱟᱣᱟ ᱦᱮᱨ-ᱡᱮᱛᱮ ᱮᱦᱚᱵ-ᱟ᱾',
          hi: 'मांदर की गूंज पर माटी और प्रकृति का आभार माना जाता है। इसके बाद ही खेतों में नई बुवाई शुरू होती है।',
          en: 'With echoing drums, Mother Earth is honored before farmers begin sowing seeds in the fertile fields.'
        },
        targetLatinMap: { sat: 'Dharti ayo ko johar aya ar nawa cas ko ehoba.' },
        keyWords: [{ wordHi: 'धरती माता', wordTarget: 'ᱫᱷᱟᱹᱨᱛᱤ ᱟᱭᱳ (Dharti Ayo)' }]
      }
    ]
  },
  {
    id: 'story_5',
    category: 'heroes',
    categoryNameHi: 'वीर गाथाएँ व ऐतिहासिक नायक',
    titleHi: 'धरती आबा बिरसा मुंडा की गाथा',
    moralHi: 'जल, जंगल, जमीन और अपनी संस्कृति की रक्षा करना हमारा परम कर्तव्य है।',
    estimatedDurationMin: 5,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🏹 🌲 🧒 🏞️',
        hindiText: 'उलिहातू गाँव में जन्मे बालक बिरसा ने बचपन से ही जंगल और अपने आदिवासी समाज के अधिकारों को समझा।',
        targetScriptMap: {
          sat: 'ᱩᱞᱤᱦᱟᱹᱛᱩ ᱨᱮ ᱡᱟᱱᱟᱢ ᱞᱮᱱ ᱵᱤᱨᱥᱟᱹ ᱫᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱷᱚᱱ ᱜᱮ ᱵᱤᱨ-ᱵᱩᱨᱩ ᱟᱨ ᱦᱚᱲ ᱠᱚᱣᱟᱜ ᱦᱚᱠ ᱮ ᱵᱟᱰᱟᱭ ᱠᱮᱫ-ᱟ᱾',
          hoc: 'ᱩᱞᱤᱦᱟᱛᱩ ᱨᱮ ᱡᱟᱱᱟᱢ ᱠᱮᱱ ᱵᱤᱨᱥᱟ ᱢᱩᱱᱰᱟ ᱦᱟᱛᱩ-ᱫᱤᱥᱩᱢ ᱞᱟᱹᱜᱤᱫ ᱞᱟᱹᱰᱷᱟᱹᱭ ᱠᱮᱫ-ᱟᱭ᱾',
          hi: 'उलिहातू गाँव में जन्मे बालक बिरसा ने बचपन से ही जंगल और अपने आदिवासी समाज के अधिकारों को समझा।',
          en: 'Born in Ulihatu village, young Birsa understood the sacred forest rights of his tribal community.'
        },
        targetLatinMap: { sat: 'Ulihatu re janam len Birsa do...' },
        keyWords: [{ wordHi: 'बच्चा', wordTarget: 'ᱜᱤᱫᱽᱨᱟᱹ (Gidra)' }, { wordHi: 'अधिकार', wordTarget: 'ᱦᱚᱠ (Hok)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '✊ 🌲 🛡️ 🏹',
        hindiText: 'उन्होंने "उलगुलान" (महाक्रांति) का शंखनाद किया और कहा: "अबुआ दिशुम रे अबुआ राज" (हमारे देश में हमारा राज)।',
        targetScriptMap: {
          sat: 'ᱩᱱᱤ ᱫᱚ "ᱩᱞᱜᱩᱞᱟᱱ" ᱮ ᱦᱚᱦᱚ ᱠᱮᱫ-ᱟ: "ᱟᱵᱩᱣᱟᱜ ᱫᱤᱥᱚᱢ ᱨᱮ ᱟᱵᱩᱣᱟᱜ ᱨᱟᱡᱽ" ᱦᱩᱭᱩᱜ-ᱟ᱾',
          hoc: 'ᱵᱤᱨᱥᱟ ᱢᱮᱱ ᱠᱮᱫ-ᱟ: "ᱟᱵᱩᱣᱟᱜ ᱫᱤᱥᱩᱢ ᱨᱮ ᱟᱵᱩᱣᱟᱜ ᱨᱟᱡᱽ" ᱛᱟᱦᱮᱸᱱ-ᱟ᱾',
          hi: 'उन्होंने "उलगुलान" (महाक्रांति) का शंखनाद किया और कहा: "अबुआ दिशुम रे अबुआ राज" (हमारे देश में हमारा राज)।',
          en: 'He proclaimed the great "Ulgulan" revolution: "Abuā dishum re abuā rāj" (Our rule in our land).'
        },
        targetLatinMap: { sat: 'Uni do Ulgulan e hoho ked-a: Abuwag disom re abuwag raj.' },
        keyWords: [{ wordHi: 'देश/माटी', wordTarget: 'ᱫᱤᱥᱚᱢ (Disom)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🏔️ 🏹 🛡️ ⚔️',
        hindiText: 'डोंबारी बुरु की पहाड़ियों में उन्होंने तीर-धनुष से अत्याचारियों का डटकर मुकाबला किया।',
        targetScriptMap: {
          sat: 'ᱰᱳᱢᱵᱟᱨᱤ ᱵᱩᱨᱩ ᱨᱮ ᱟᱡᱟᱜ ᱟᱜ-ᱥᱟᱨ ᱛᱮ ᱵᱟᱹᱭᱨᱤ ᱠᱚ ᱥᱟᱶ ᱞᱟᱹᱰᱷᱟᱹᱭ ᱠᱮᱫ-ᱟᱭ᱾',
          hoc: 'ᱰᱳᱢᱵᱟᱨᱤ ᱵᱩᱨᱩ ᱨᱮ ᱟᱜ-ᱥᱟᱨ ᱛᱮ ᱫᱤᱥᱩᱢ ᱮ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱮᱫ-ᱟ᱾',
          hi: 'डोंबारी बुरु की पहाड़ियों में उन्होंने तीर-धनुष से अत्याचारियों का डटकर मुकाबला किया।',
          en: 'At Dombari Buru hills, he fearlessly defended the indigenous soil with traditional bows and arrows.'
        },
        targetLatinMap: { sat: 'Dombari buru re ajag aag-sar te laṛhay ked-ay.' },
        keyWords: [{ wordHi: 'धनुष-बाण', wordTarget: 'ᱟᱜ-ᱥᱟᱨ (Aag-Sar)' }, { wordHi: 'पहाड़', wordTarget: 'ᱵᱩᱨᱩ (Buru)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🌟 🌺 🇮🇳 🙏',
        hindiText: 'आज भी झारखंड का बच्चा-बच्चा धरती आबा बिरसा मुंडा के त्याग और साहस को नमन करता है।',
        targetScriptMap: {
          sat: 'ᱛᱮᱦᱮᱧ ᱦᱚᱸ ᱫᱷᱟᱹᱨᱛᱤ ᱟᱵᱟ ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱟᱜ ᱧᱩᱛᱩᱢ ᱡᱚᱛᱚ ᱦᱚᱲ ᱢᱟᱱᱟᱣ ᱮᱫᱟᱠᱚ᱾',
          hoc: 'ᱫᱷᱟᱹᱨᱛᱤ ᱟᱵᱟ ᱵᱤᱨᱥᱟ ᱢᱩᱱᱰᱟ ᱟᱵᱩᱣᱟᱜ ᱢᱚᱱᱮ ᱨᱮ ᱡᱤᱣᱤᱫ ᱢᱮᱱᱟᱭᱟ᱾',
          hi: 'आज भी झारखंड का बच्चा-बच्चा धरती आबा बिरसा मुंडा के त्याग और साहस को नमन करता है।',
          en: 'To this day, every child of Jharkhand salutes Dharti Aaba Birsa Munda for his heroic courage.'
        },
        targetLatinMap: { sat: 'Teheñ hoñ Dharti Aba Birsa Munda ag ñutum joto hoṛ manaw edako.' },
        keyWords: [{ wordHi: 'साहस', wordTarget: 'ᱥᱟᱦᱟᱥ (Sahas)' }]
      }
    ]
  },
  {
    id: 'story_6',
    category: 'nature',
    categoryNameHi: 'प्रकृति व पर्यावरण',
    titleHi: 'स्वर्णरेखा नदी और सोने की रेत',
    moralHi: 'प्रकृति की नदियाँ हमारी जीवनरेखा हैं, उन्हें स्वच्छ रखना हमारा धर्म है।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🏞️ ✨ 💧 🌲',
        hindiText: 'नगड़ी गाँव से निकली स्वर्णरेखा नदी छोटानागपुर के वनों को सींचती हुई बहती है।',
        targetScriptMap: {
          sat: 'ᱱᱟᱜᱽᱲᱤ ᱠᱷᱚᱱ ᱚᱰᱚᱠ ᱟᱠᱟᱱ ᱥᱚᱱᱟ ᱜᱟᱰᱟ ᱫᱚ ᱵᱤᱨ-ᱵᱩᱨᱩ ᱥᱟᱡᱟᱣ ᱠᱟᱛᱮ ᱞᱤᱸᱜᱤᱱ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱥᱚᱱᱟ ᱜᱟᱰᱟ ᱦᱟᱛᱩ-ᱫᱤᱥᱩᱢ ᱞᱟᱹᱜᱤᱫ ᱡᱤᱣᱤ ᱫᱟᱜ ᱠᱟᱱᱟ᱾',
          hi: 'नगड़ी गाँव से निकली स्वर्णरेखा नदी छोटानागपुर के वनों को सींचती हुई बहती है।',
          en: 'Originating at Nagri, the Subarnarekha River flows gracefully, nourishing the plateau.'
        },
        targetLatinMap: { sat: 'Nagri khon oḍok akan sona gaḍa...' },
        keyWords: [{ wordHi: 'नदी', wordTarget: 'ᱜᱟᱰᱟ (Gaḍa)' }, { wordHi: 'सोना', wordTarget: 'ᱥᱚᱱᱟ (Sona)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '✨ 🌊 🌾 🤲',
        hindiText: 'प्राचीन समय में लोग इस नदी की रेत को छानकर सोने के छोटे कण प्राप्त करते थे।',
        targetScriptMap: {
          sat: 'ᱥᱮᱫᱟᱭ ᱦᱚᱲ ᱱᱚᱣᱟ ᱜᱟᱰᱟ ᱨᱮᱭᱟᱜ ᱜᱤᱛᱤᱞ ᱪᱷᱟᱹᱱᱤ ᱠᱟᱛᱮ ᱥᱚᱱᱟ ᱠᱚ ᱧᱟᱢᱮᱫ ᱛᱟᱦᱮᱸᱫ᱾',
          hoc: 'ᱜᱤᱛᱤᱞ ᱠᱷᱚᱱ ᱥᱚᱱᱟ ᱧᱟᱢᱚᱜ ᱛᱟᱦᱮᱸᱠᱟᱱᱟ᱾',
          hi: 'प्राचीन समय में लोग इस नदी की रेत को छानकर सोने के छोटे कण प्राप्त करते थे।',
          en: 'In ancient days, villagers gently sifted the river sands to discover tiny grains of real gold.'
        },
        targetLatinMap: { sat: 'Seday hoṛ nowa gaḍa reyag gitil chhani kate...' },
        keyWords: [{ wordHi: 'रेत', wordTarget: 'ᱜᱤᱛᱤᱞ (Gitil)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🌊 💧 🏞️ 🐟',
        hindiText: 'हुंडरू जलप्रपात पर यह नदी विशाल ऊँचाई से गिरकर जलधारा का मनमोहक रूप बनाती है।',
        targetScriptMap: {
          sat: 'ᱦᱩᱱᱰᱨᱩ ᱫᱟᱜ-ᱡᱷᱟᱨᱱᱟ ᱨᱮ ᱱᱚᱣᱟ ᱫᱟᱜ ᱟᱹᱰᱤ ᱩᱥᱩᱞ ᱠᱷᱚᱱ ᱧᱩᱨᱩᱜ-ᱟ ᱟᱨ ᱪᱚᱨᱚᱠ ᱧᱮᱞᱚᱜ-ᱟ᱾',
          hoc: 'ᱦᱩᱱᱰᱨᱩ ᱡᱷᱟᱨᱱᱟ ᱨᱮ ᱫᱟᱜ ᱟᱹᱰᱤ ᱵᱮᱥ ᱧᱮᱞᱚᱜ-ᱟ᱾',
          hi: 'हुंडरू जलप्रपात पर यह नदी विशाल ऊँचाई से गिरकर जलधारा का मनमोहक रूप बनाती है।',
          en: 'At Hundru Falls, the river cascades from a breathtaking height into a misty gorge.'
        },
        targetLatinMap: { sat: 'Hundru daag-jharna re nowa daag...' },
        keyWords: [{ wordHi: 'झरना', wordTarget: 'ᱡᱷᱟᱨᱱᱟ (Jharna)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🌿 🤝 💧 🌟',
        hindiText: 'गाँव वालों ने प्रण लिया कि नदी में कचरा नहीं फेंकेंगे और नदी को सदा निर्मल रखेंगे।',
        targetScriptMap: {
          sat: 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱠᱤᱨᱭᱟᱹ ᱠᱚ ᱦᱟᱛᱟᱣ ᱠᱮᱫ-ᱟ ᱡᱮ ᱜᱟᱰᱟ ᱫᱚ ᱥᱟᱯᱷᱟ ᱜᱮᱵᱚᱱ ᱫᱚᱦᱚᱭᱟ᱾',
          hoc: 'ᱜᱟᱰᱟ ᱫᱟᱜ ᱥᱟᱯᱷᱟ ᱫᱚᱦᱚ ᱟᱵᱩᱣᱟᱜ ᱠᱟᱹᱢᱤ ᱛᱟᱱᱟ᱾',
          hi: 'गाँव वालों ने प्रण लिया कि नदी में कचरा नहीं फेंकेंगे और नदी को सदा निर्मल रखेंगे।',
          en: 'The villagers pledged never to pollute the river, protecting the pristine waters forever.'
        },
        targetLatinMap: { sat: 'Atu hoṛ kirya ko hataw ked-a je gaḍa do sapha gebon dohoya.' },
        keyWords: [{ wordHi: 'साफ़', wordTarget: 'ᱥᱟᱯᱷᱟ (Sapha)' }]
      }
    ]
  },
  {
    id: 'story_7',
    category: 'fables',
    categoryNameHi: 'पशु-पक्षी व नीति कथाएँ',
    titleHi: 'सात भाइयों और चम्पा बहन की लोककथा',
    moralHi: 'सच्चा प्रेम और निर्दोषता हर प्रकार की ईर्ष्या और छल पर विजय पाती है।',
    estimatedDurationMin: 5,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '👧 👨‍🌾 🌳 🌸',
        hindiText: 'सात भाइयों की एक प्यारी बहन थी जिसका नाम चम्पा था। वह वन के फूलों जैसी सरल थी।',
        targetScriptMap: {
          sat: 'ᱮᱭᱟᱭ ᱵᱚᱭᱦᱟ ᱨᱤᱱᱤᱡ ᱢᱤᱫ ᱢᱤᱥᱨᱟ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟᱭ, ᱡᱟᱦᱟᱸᱭᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱟᱢᱯᱟ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱮᱭᱟᱭ ᱵᱚᱭᱦᱟ ᱟᱜ ᱢᱤᱫ ᱢᱤᱥᱤ ᱪᱟᱢᱯᱟ ᱛᱟᱦᱮᱸᱠᱟᱱᱟᱭ᱾',
          hi: 'सात भाइयों की एक प्यारी बहन थी जिसका नाम चम्पा था। वह वन के फूलों जैसी सरल थी।',
          en: 'Seven brothers had a beloved sister named Champa, gentle like forest blossoms.'
        },
        targetLatinMap: { sat: 'Eyay boyha rinij mid misra tahe kanay...' },
        keyWords: [{ wordHi: 'बहन', wordTarget: 'ᱢᱤᱥᱨᱟ (Misra)' }, { wordHi: 'सात', wordTarget: 'ᱮᱭᱟᱭ (Eyay)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🎋 🎶 🎵 🌿',
        hindiText: 'ईर्ष्यालु भाभियों ने चम्पा को वन में छिपा दिया, जहाँ वह बांस के एक सुरीले पौधे में बदल गई।',
        targetScriptMap: {
          sat: 'ᱦᱤᱥᱠᱟᱹ ᱛᱮ ᱩᱱᱤ ᱫᱚ ᱵᱤᱨ ᱨᱮ ᱠᱚ ᱩᱠᱩ ᱠᱮᱫᱮᱭᱟ, ᱡᱟᱦᱟᱸ ᱨᱮ ᱩᱱᱤ ᱢᱟᱫ ᱫᱟᱨᱮ ᱵᱮᱱᱟᱣ ᱮᱱᱟᱭ᱾',
          hoc: 'ᱩᱱᱤ ᱵᱤᱨ ᱨᱮ ᱢᱟᱫ ᱫᱟᱨᱩ ᱵᱮᱱᱟᱣ ᱮᱱᱟᱭ᱾',
          hi: 'ईर्ष्यालु भाभियों ने चम्पा को वन में छिपा दिया, जहाँ वह बांस के एक सुरीले पौधे में बदल गई।',
          en: 'Jealous relatives hid Champa in the forest, where she transformed into a singing bamboo plant.'
        },
        targetLatinMap: { sat: 'Hiska te uni do bir re ko uku kedeya...' },
        keyWords: [{ wordHi: 'बांस', wordTarget: 'ᱢᱟᱫ (Mad)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🪈 🎶 🎵 😭',
        hindiText: 'एक चरवाहे ने उस बांस की बांसुरी बनाई। जब भी वह बजाता, बांसुरी से बहन की मधुर पुकार सुनाई देती।',
        targetScriptMap: {
          sat: 'ᱢᱤᱫ ᱜᱩᱯᱤ ᱠᱚᱲᱟ ᱚᱱᱟ ᱢᱟᱫ ᱨᱮᱭᱟᱜ ᱛᱤᱨᱤᱭᱚ ᱵᱮᱱᱟᱣ ᱠᱮᱫ-ᱟᱭ᱾ ᱛᱤᱨᱤᱭᱚ ᱨᱟᱹᱲ ᱨᱮ ᱢᱤᱥᱨᱟ ᱣᱟᱜ ᱨᱟᱜ ᱟᱸᱡᱚᱢᱚᱜ-ᱟ᱾',
          hoc: 'ᱨᱩᱛᱩ ᱠᱷᱚᱱ ᱢᱤᱥᱤ ᱟᱜ ᱥᱮᱨᱮᱧ ᱟᱸᱡᱚᱢ ᱮᱱᱟ᱾',
          hi: 'एक चरवाहे ने उस बांस की बांसुरी बनाई। जब भी वह बजाता, बांसुरी से बहन की मधुर पुकार सुनाई देती।',
          en: 'A flute maker crafted a bamboo flute. Whenever played, it sang of the lost sister.'
        },
        targetLatinMap: { sat: 'Mid gupi koṛa ona mad reyag tiriyo benaw ked-ay.' },
        keyWords: [{ wordHi: 'बांसुरी', wordTarget: 'ᱛᱤᱨᱤᱭᱚ (Tiriyo)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🤝 👧 👨‍🌾 💖',
        hindiText: 'भाइयों ने बांसुरी की धुन पहचानी और अपनी बहन को वापस पा लिया। सत्य की विजय हुई।',
        targetScriptMap: {
          sat: 'ᱵᱚᱭᱦᱟ ᱠᱚ ᱛᱤᱨᱤᱭᱚ ᱨᱟᱹᱲ ᱠᱚ ᱪᱤᱱᱦᱟᱹᱣ ᱠᱮᱫ-ᱟ ᱟᱨ ᱟᱠᱚᱣᱟᱜ ᱢᱤᱥᱨᱟ ᱠᱚ ᱧᱟᱢ ᱨᱩᱣᱟᱹᱲ ᱠᱮᱫᱮᱭᱟ᱾',
          hoc: 'ᱵᱚᱭᱦᱟ ᱠᱚ ᱟᱠᱚᱣᱟᱜ ᱢᱤᱥᱤ ᱠᱚ ᱧᱟᱢ ᱠᱮᱫᱮᱭᱟ᱾',
          hi: 'भाइयों ने बांसुरी की धुन पहचानी और अपनी बहन को वापस पा लिया। सत्य की विजय हुई।',
          en: 'The brothers recognized the flute melody and embraced their sister once again.'
        },
        targetLatinMap: { sat: 'Boyha ko tiriyo raṛ ko cinhaw ked-a.' },
        keyWords: [{ wordHi: 'सत्य', wordTarget: 'ᱥᱟᱹᱨᱤ (Sari)' }]
      }
    ]
  },
  {
    id: 'story_8',
    category: 'fables',
    categoryNameHi: 'पशु-पक्षी व नीति कथाएँ',
    titleHi: 'जंगल का राजा बाघ और चतुर सियार',
    moralHi: 'अहंकार हमेशा पतन का कारण बनता है; समझदारी ही जीवन रक्षा करती है।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🐯 👑 🌲 🐾',
        hindiText: 'दलमा के जंगल में एक घमंडी बाघ सबको डराता था और पशुओं को परेशान करता था।',
        targetScriptMap: {
          sat: 'ᱫᱟᱞᱢᱟ ᱵᱤᱨ ᱨᱮ ᱢᱤᱫ ᱜᱚᱨᱚᱵᱽ ᱛᱟᱹᱨᱩᱵ ᱡᱚᱛᱚ ᱡᱤᱭᱟᱹᱞᱤ ᱠᱚᱭ ᱵᱚᱛᱚᱨ ᱚᱪᱚ ᱮᱫ ᱠᱚ ᱛᱟᱦᱮᱸᱫ᱾',
          hoc: 'ᱫᱟᱞᱢᱟ ᱵᱤᱨ ᱨᱮ ᱢᱤᱫ ᱠᱩᱞ ᱡᱚᱛᱚ ᱦᱚᱲ ᱠᱮ ᱵᱚᱛᱚᱨ ᱮᱢᱟᱭ ᱛᱟᱦᱮᱸᱠᱟᱱᱟ᱾',
          hi: 'दलमा के जंगल में एक घमंडी बाघ सबको डराता था और पशुओं को परेशान करता था।',
          en: 'In the Dalma forests, an arrogant tiger terrified all the smaller animals.'
        },
        targetLatinMap: { sat: 'Dalma bir re mid gorob tarub...' },
        keyWords: [{ wordHi: 'बाघ', wordTarget: 'ᱛᱟᱹᱨᱩᱵ (Tarub)' }, { wordHi: 'डर', wordTarget: 'ᱵᱚᱛᱚᱨ (Botor)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🦊 🧠 🐾 🌿',
        hindiText: 'एक चतुर सियार ने बाघ को कुएँ के पास ले जाकर कहा: "महाराज! कुएँ में एक और बड़ा बाघ रहता है!"',
        targetScriptMap: {
          sat: 'ᱢᱤᱫ ᱪᱟᱞᱟᱠ ᱛᱩᱭᱩ ᱛᱟᱹᱨᱩᱵ ᱫᱚ ᱠᱩᱸᱭ ᱴᱷᱮᱱ ᱤᱫᱤ ᱠᱟᱛᱮ ᱢᱮᱱ ᱠᱮᱫ-ᱟ, "ᱠᱩᱸᱭ ᱨᱮ ᱟᱨ ᱢᱤᱫᱴᱟᱝ ᱢᱟᱨᱟᱝ ᱛᱟᱹᱨᱩᱵ ᱢᱮᱱᱟᱭᱟ!"',
          hoc: 'ᱛᱩᱭᱩ ᱠᱩᱞ ᱠᱮ ᱢᱮᱱ ᱠᱮᱫ-ᱟ: "ᱠᱩᱸᱭ ᱨᱮ ᱟᱨ ᱢᱤᱫ ᱠᱩᱞ ᱢᱮᱱᱟᱭᱟ!"',
          hi: 'एक चतुर सियार ने बाघ को कुएँ के पास ले जाकर कहा: "महाराज! कुएँ में एक और बड़ा बाघ रहता है!"',
          en: 'A clever jackal led the tiger to an old well: "Majesty, another tiger lurks below!"'
        },
        targetLatinMap: { sat: 'Mid calak tuyu tarub do kuyi ṭhen idi kate men ked-a...' },
        keyWords: [{ wordHi: 'सियार', wordTarget: 'ᱛᱩᱭᱩ (Tuyu)' }, { wordHi: 'कुआँ', wordTarget: 'ᱠᱩᱸᱭ (Kuyi)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🕳️ 🐯 💧 💥',
        hindiText: 'बाघ ने कुएँ के पानी में अपनी ही परछाईं देखी और दहाड़ते हुए कुएँ में कूद पड़ा।',
        targetScriptMap: {
          sat: 'ᱛᱟᱹᱨᱩᱵ ᱫᱟᱜ ᱨᱮ ᱟᱡᱟᱜ ᱪᱷᱟᱸᱪ ᱧᱮᱞ ᱠᱟᱛᱮ ᱠᱩᱸᱭ ᱨᱮ ᱫᱚᱱ ᱠᱮᱫ-ᱟᱭ᱾',
          hoc: 'ᱠᱩᱞ ᱫᱟᱜ ᱨᱮ ᱟᱡᱟᱜ ᱨᱩᱯ ᱧᱮᱞ ᱠᱮᱛᱮ ᱫᱚᱱ ᱠᱮᱫ-ᱟᱭ᱾',
          hi: 'बाघ ने कुएँ के पानी में अपनी ही परछाईं देखी और दहाड़ते हुए कुएँ में कूद पड़ा।',
          en: 'Seeing his own reflection in the water, the roaring tiger leapt blindly into the well.'
        },
        targetLatinMap: { sat: 'Tarub daag re ajag chanch ñel kate kuyi re don ked-ay.' },
        keyWords: [{ wordHi: 'परछाईं', wordTarget: 'ᱪᱷᱟᱸᱪ (Chanch)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🎉 🐇 🦌 🌲',
        hindiText: 'सियार की चतुराई से पूरे जंगल के पशु स्वतंत्र और सुरक्षित हो गए।',
        targetScriptMap: {
          sat: 'ᱛᱩᱭᱩ ᱣᱟᱜ ᱵᱩᱫᱷᱤ ᱛᱮ ᱵᱤᱨ ᱨᱤᱱ ᱡᱚᱛᱚ ᱡᱤᱭᱟᱹᱞᱤ ᱠᱚ ᱨᱟᱹᱥᱠᱟᱹ ᱮᱱᱟ᱾',
          hoc: 'ᱡᱚᱛᱚ ᱡᱤᱭᱟᱹᱞᱤ ᱥᱩᱠ ᱛᱮ ᱠᱚ ᱛᱟᱦᱮᱸ ᱮᱱᱟ᱾',
          hi: 'सियार की चतुराई से पूरे जंगल के पशु स्वतंत्र और सुरक्षित हो गए।',
          en: 'Thanks to the jackal’s quick wits, the jungle animals lived in harmony.'
        },
        targetLatinMap: { sat: 'Tuyu wag buddhi te bir rin joto jiyali ko raska ena.' },
        keyWords: [{ wordHi: 'बुद्धि', wordTarget: 'ᱵᱩᱫᱷᱤ (Buddhi)' }]
      }
    ]
  },
  {
    id: 'story_9',
    category: 'nature',
    categoryNameHi: 'प्रकृति व पर्यावरण',
    titleHi: 'पारसनाथ पर्वत और वन देवता मारांग बुरु',
    moralHi: 'पर्वत और वन्य जीवन हमारी सांस्कृतिक धरोहर हैं, इनका संरक्षण हमारा दायित्व है।',
    estimatedDurationMin: 5,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '⛰️ ☁️ 🌲 🦅',
        hindiText: 'झारखंड का सबसे ऊँचा पर्वत पारसनाथ है, जिसे संथाली समाज मारांग बुरु (महान पहाड़) कहता है।',
        targetScriptMap: {
          sat: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱭᱟᱜ ᱡᱚᱛᱚ ᱠᱷᱚᱱ ᱩᱥᱩᱞ ᱵᱩᱨᱩ ᱫᱚ ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ ᱟᱵᱩᱣᱟᱜ ᱯᱟᱹᱣᱤᱛᱨᱚ ᱵᱩᱨᱩ ᱛᱟᱱᱟ᱾',
          hi: 'झारखंड का सबसे ऊँचा पर्वत पारसनाथ है, जिसे संथाली समाज मारांग बुरु (महान पहाड़) कहता है।',
          en: 'The highest mountain in Jharkhand is revered as Marang Buru (The Great Mountain).'
        },
        targetLatinMap: { sat: 'Jharkhand reyag joto khon usul buru do Marang Buru kana.' },
        keyWords: [{ wordHi: 'पहाड़', wordTarget: 'ᱵᱩᱨᱩ (Buru)' }, { wordHi: 'ऊँचा', wordTarget: 'ᱩᱥᱩᱞ (Usul)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🌿 🐆 🌺 🦜',
        hindiText: 'इस पर्वत की गोद में दुर्लभ औषधीय पौधे, चीते और सुंदर पक्षी निवास करते हैं।',
        targetScriptMap: {
          sat: 'ᱱᱚᱣᱟ ᱵᱩᱨᱩ ᱨᱮ ᱟᱭᱢᱟ ᱨᱟᱱ-ᱫᱟᱨᱮ, ᱛᱟᱹᱨᱩᱵ ᱟᱨ ᱪᱮᱬᱮ ᱠᱚ ᱛᱟᱦᱮᱸᱱᱟ᱾',
          hoc: 'ᱨᱟᱱ ᱫᱟᱨᱩ ᱟᱨ ᱡᱤᱭᱟᱹᱞᱤ ᱠᱚ ᱱᱮᱱᱟᱜ ᱵᱩᱨᱩ ᱨᱮ ᱢᱮᱱᱟᱜ ᱠᱚᱣᱟ᱾',
          hi: 'इस पर्वत की गोद में दुर्लभ औषधीय पौधे, चीते और सुंदर पक्षी निवास करते हैं।',
          en: 'Upon its slopes flourish rare medicinal herbs, leopards, and vibrant mountain birds.'
        },
        targetLatinMap: { sat: 'Nowa buru re ayma ran-dare...' },
        keyWords: [{ wordHi: 'दवा/औषधि', wordTarget: 'ᱨᱟᱱ (Ran)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🌧️ 💧 🌾 🏞️',
        hindiText: 'मारांग बुरु बादलों को रोककर समय पर वर्षा लाते हैं, जिससे खेत-खलिहान लहलहा उठते हैं।',
        targetScriptMap: {
          sat: 'ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ ᱨᱤᱢᱤᱞ ᱮ ᱟᱴᱠᱟᱣ ᱠᱟᱛᱮ ᱫᱟᱜ-ᱡᱟᱹᱲᱤ ᱮ ᱟᱹᱜᱩᱭᱟ᱾',
          hoc: 'ᱵᱩᱨᱩ ᱨᱤᱢᱤᱞ ᱮ ᱟᱹᱜᱩᱭᱟ ᱟᱨ ᱪᱟᱥ ᱵᱮᱥ ᱦᱩᱭᱩᱜ-ᱟ᱾',
          hi: 'मारांग बुरु बादलों को रोककर समय पर वर्षा लाते हैं, जिससे खेत-खलिहान लहलहा उठते हैं।',
          en: 'The high peaks intercept clouds, blessing the plateau valleys with rain.'
        },
        targetLatinMap: { sat: 'Marang Buru rimil e aṭkaw kate daag-jaṛi e aguiya.' },
        keyWords: [{ wordHi: 'बादल', wordTarget: 'ᱨᱤᱢᱤᱞ (Rimil)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🙏 🌳 ✨ 💚',
        hindiText: 'पर्वत देवता को नमन कर लोग प्रतिज्ञा करते हैं कि वे पेड़ों को नहीं काटेंगे और वन को हरा-भरा रखेंगे।',
        targetScriptMap: {
          sat: 'ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ ᱡᱚᱦᱟᱨ ᱠᱟᱛᱮ ᱫᱟᱨᱮ ᱵᱟᱝ ᱢᱟᱜ ᱨᱮᱭᱟᱜ ᱠᱟᱛᱷᱟ ᱠᱚ ᱮᱢᱟ᱾',
          hoc: 'ᱫᱟᱨᱩ ᱵᱟᱵᱚᱱ ᱢᱟᱜ-ᱟ, ᱵᱤᱨ ᱵᱚᱱ ᱨᱩᱠᱷᱤᱭᱟᱹᱭᱟ᱾',
          hi: 'पर्वत देवता को नमन कर लोग प्रतिज्ञा करते हैं कि वे पेड़ों को नहीं काटेंगे और वन को हरा-भरा रखेंगे।',
          en: 'Paying homage to the mountain spirit, communities pledge to protect the virgin forests.'
        },
        targetLatinMap: { sat: 'Marang Buru johar kate dare bang mag reyag katha ko ema.' },
        keyWords: [{ wordHi: 'प्रणाम', wordTarget: 'ᱡᱚᱦᱟᱨ (Johar)' }]
      }
    ]
  },
  {
    id: 'story_10',
    category: 'nature',
    categoryNameHi: 'प्रकृति व पर्यावरण',
    titleHi: 'महुआ के मीठे फूल और तितलियाँ',
    moralHi: 'प्रकृति हर मौसम में हमारे लिए उपहार लेकर आती है, उसका आदर करें।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🌼 🦋 🌳 ☀️',
        hindiText: 'चैत्र के महीने में महुआ के पेड़ों से मीठी सुगंध फैलती है और पीले-सफेद फूल टपकने लगते हैं।',
        targetScriptMap: {
          sat: 'ᱢᱟᱛᱠᱚᱢ ᱫᱟᱨᱮ ᱠᱷᱚᱱ ᱥᱤᱵᱤᱞ ᱥᱚ ᱦᱤᱡᱩᱜ-ᱟ ᱟᱨ ᱢᱟᱛᱠᱚᱢ ᱵᱟᱦᱟ ᱧᱩᱨᱩᱜ-ᱟ᱾',
          hoc: 'ᱢᱟᱫᱠᱚᱢ ᱵᱟᱦᱟ ᱥᱤᱵᱤᱞ ᱥᱚ ᱟᱨ ᱧᱩᱨᱩᱜ ᱛᱟᱱᱟ᱾',
          hi: 'चैत्र के महीने में महुआ के पेड़ों से मीठी सुगंध फैलती है और पीले-सफेद फूल टपकने लगते हैं।',
          en: 'In spring, sweet fragrance drifts from Mahua trees as fleshy blossoms fall like dew.'
        },
        targetLatinMap: { sat: 'Matkom dare khon sibil so hijug-a.' },
        keyWords: [{ wordHi: 'महुआ', wordTarget: 'ᱢᱟᱛᱠᱚᱢ (Matkom)' }, { wordHi: 'सुगंध', wordTarget: 'ᱥᱚ (So)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🧺 🧕 🧒 🌺',
        hindiText: 'गाँव के बच्चे और महिलाएँ भोर में ही डलिया लेकर महुआ चुनने वन में जाते हैं।',
        targetScriptMap: {
          sat: 'ᱥᱮᱛᱟᱜ ᱨᱮ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱨ ᱟᱭᱳ ᱠᱚ ᱴᱩᱠᱤ ᱤᱫᱤ ᱠᱟᱛᱮ ᱢᱟᱛᱠᱚᱢ ᱦᱟᱞᱟᱝ ᱠᱚ ᱥᱮᱱᱚᱜ-ᱟ᱾',
          hoc: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱢᱟᱫᱠᱚᱢ ᱦᱟᱞᱟᱝ ᱠᱚ ᱥᱮᱱᱚᱜ-ᱟ᱾',
          hi: 'गाँव के बच्चे और महिलाएँ भोर में ही डलिया लेकर महुआ चुनने वन में जाते हैं।',
          en: 'At dawn, mothers and children carry bamboo baskets into the forest to gather Mahua.'
        },
        targetLatinMap: { sat: 'Setag re gidra ar ayo ko ṭuki idi kate...' },
        keyWords: [{ wordHi: 'डलिया/टोकरी', wordTarget: 'ᱴᱩᱠᱤ (Tuki)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🦋 🐝 🐦 🌼',
        hindiText: 'रंग-बिरंगी तितलियाँ और पक्षी भी महुआ का रस पीकर खुशी से चहकते हैं।',
        targetScriptMap: {
          sat: 'ᱯᱤᱯᱤᱲᱤᱭᱟᱹᱝ ᱟᱨ ᱪᱮᱬᱮ ᱠᱚ ᱦᱚᱸ ᱢᱟᱛᱠᱚᱢ ᱨᱟᱥᱟ ᱧᱩ ᱠᱟᱛᱮ ᱠᱚ ᱨᱟᱹᱥᱠᱟᱹᱜ-ᱟ᱾',
          hoc: 'ᱯᱤᱯᱤᱲᱤ ᱠᱚ ᱢᱟᱫᱠᱚᱢ ᱨᱟᱥᱟ ᱠᱚ ᱧᱩᱭᱟ᱾',
          hi: 'रंग-बिरंगी तितलियाँ और पक्षी भी महुआ का रस पीकर खुशी से चहकते हैं।',
          en: 'Fluttering butterflies and birds drink the sweet nectar and chirp in delight.'
        },
        targetLatinMap: { sat: 'Pipiṛiañ ar ceṇe ko hoñ matkom rasa ñu kate...' },
        keyWords: [{ wordHi: 'तितली', wordTarget: 'ᱯᱤᱯᱤᱲᱤᱭᱟᱹᱝ (Pipiṛiañ)' }, { wordHi: 'रस', wordTarget: 'ᱨᱟᱥᱟ (Rasa)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🍲 🍪 🤝 🏡',
        hindiText: 'महुआ सुखाकर स्वादिष्ट रोटी और लड्डू बनते हैं। यह प्रकृति का अनमोल पोषक उपहार है।',
        targetScriptMap: {
          sat: 'ᱢᱟᱛᱠᱚᱢ ᱨᱚᱦᱚᱲ ᱠᱟᱛᱮ ᱥᱤᱵᱤᱞ ᱯᱤᱴᱷᱟᱹ ᱠᱚ ᱵᱮᱱᱟᱣᱟ᱾ ᱱᱚᱣᱟ ᱫᱚ ᱵᱤᱨ ᱨᱮᱭᱟᱜ ᱫᱟᱱ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱢᱟᱫᱠᱚᱢ ᱞᱟᱹᱰᱩ ᱟᱹᱰᱤ ᱥᱤᱵᱤᱞ ᱛᱟᱱᱟ᱾',
          hi: 'महुआ सुखाकर स्वादिष्ट रोटी और लड्डू बनते हैं। यह प्रकृति का अनमोल पोषक उपहार है।',
          en: 'Dried Mahua is baked into nutritious cakes, a cherished gift of the forest.'
        },
        targetLatinMap: { sat: 'Matkom rohoṛ kate sibil piṭha ko benawa.' },
        keyWords: [{ wordHi: 'रोटी/केक', wordTarget: 'ᱯᱤᱴᱷᱟᱹ (Piṭha)' }]
      }
    ]
  },
  {
    id: 'story_11',
    category: 'fables',
    categoryNameHi: 'पशु-पक्षी व नीति कथाएँ',
    titleHi: 'बाँसुरी वादक और जादुई मोर',
    moralHi: 'सच्चा संगीत और प्रकृति की सुंदरता का मेल हृदय को पवित्र कर देता है।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🪈 👦 🦚 🌲',
        hindiText: 'जंगल किनारे एक चरवाहा लड़का रहता था जो अपनी बांसुरी में जादू जैसी मधुर धुन बजाता था।',
        targetScriptMap: {
          sat: 'ᱵᱤᱨ ᱟᱲᱮ ᱨᱮ ᱢᱤᱫ ᱜᱩᱯᱤ ᱠᱚᱲᱟ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟᱭ, ᱡᱟᱦᱟᱸᱭ ᱟᱹᱰᱤ ᱪᱚᱨᱚᱠ ᱛᱤᱨᱤᱭᱚᱭ ᱚᱨᱚᱝ ᱛᱟᱦᱮᱸᱫ᱾',
          hoc: 'ᱢᱤᱫ ᱜᱩᱯᱤ ᱠᱚᱲᱟ ᱵᱮᱥ ᱨᱩᱛᱩ ᱚᱨᱚᱝ ᱛᱟᱦᱮᱸᱠᱟᱱᱟᱭ᱾',
          hi: 'जंगल किनारे एक चरवाहा लड़का रहता था जो अपनी बांसुरी में जादू जैसी मधुर धुन बजाता था।',
          en: 'At the forest edge lived a young cowherd who played magical tunes on his bamboo flute.'
        },
        targetLatinMap: { sat: 'Bir aṛe re mid gupi koṛa tahe kanay...' },
        keyWords: [{ wordHi: 'बांसुरी', wordTarget: 'ᱛᱤᱨᱤᱭᱚ (Tiriyo)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🦚 💃 🌈 🌿',
        hindiText: 'बांसुरी की धुन सुनकर जंगल का एक सुंदर मोर अपने पंख फैलाकर नृत्य करने लगा।',
        targetScriptMap: {
          sat: 'ᱛᱤᱨᱤᱭᱚ ᱨᱟᱹᱲ ᱟᱸᱡᱚᱢ ᱛᱮ ᱢᱤᱫ ᱢᱟᱨᱟᱜ ᱟᱡᱟᱜ ᱤᱞ ᱯᱟᱥᱱᱟᱣ ᱠᱟᱛᱮ ᱮᱱᱮᱡ ᱮᱦᱚᱵ ᱠᱮᱫ-ᱟᱭ᱾',
          hoc: 'ᱢᱟᱨᱟᱜ ᱤᱞ ᱯᱟᱥᱱᱟᱣ ᱠᱮᱛᱮ ᱮᱱᱮᱡ ᱠᱮᱫ-ᱟᱭ᱾',
          hi: 'बांसुरी की धुन सुनकर जंगल का एक सुंदर मोर अपने पंख फैलाकर नृत्य करने लगा।',
          en: 'Drawn by the melody, a splendid peacock spread its iridescent feathers and danced.'
        },
        targetLatinMap: { sat: 'Tiriyo raṛ añjom te mid marag ajag il pasnaw kate...' },
        keyWords: [{ wordHi: 'मोर', wordTarget: 'ᱢᱟᱨᱟᱜ (Marag)' }, { wordHi: 'पंख', wordTarget: 'ᱤᱞ (Il)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🌧️ 🌈 💧 🪈',
        hindiText: 'दोनों की जुगलबंदी देखकर काले मेघ बरस पड़े और सूखी धरती हरी-भरी हो गई।',
        targetScriptMap: {
          sat: 'ᱵᱟᱱᱟᱨ ᱦᱚᱲᱟᱜ ᱮᱱᱮᱡ-ᱥᱮᱨᱮᱧ ᱧᱮᱞᱛᱮ ᱨᱤᱢᱤᱞ ᱫᱟᱜ ᱮ ᱡᱟᱹᱲᱤ ᱠᱮᱫ-ᱟ᱾',
          hoc: 'ᱦᱚᱭ-ᱫᱟᱜ ᱦᱮᱡ ᱮᱱᱟ ᱟᱨ ᱫᱷᱟᱹᱨᱛᱤ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱮᱱᱟ᱾',
          hi: 'दोनों की जुगलबंदी देखकर काले मेघ बरस पड़े और सूखी धरती हरी-भरी हो गई।',
          en: 'Moved by their harmony, rain clouds showered water over the parched hills.'
        },
        targetLatinMap: { sat: 'Banar hoṛag enej-sereñ ñelte rimil daag e jaṛi ked-a.' },
        keyWords: [{ wordHi: 'वर्षा', wordTarget: 'ᱫᱟᱜ-ᱡᱟᱹᱲᱤ (Daag-Jaṛi)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🤝 🦚 👦 ✨',
        hindiText: 'मोर ने कृतज्ञ होकर लड़के को अपना एक चमकीला पंख दिया, जिसे उसने अपनी पगड़ी में सजाया।',
        targetScriptMap: {
          sat: 'ᱢᱟᱨᱟᱜ ᱫᱚ ᱠᱚᱲᱟ ᱢᱤᱫᱴᱟᱝ ᱪᱚᱨᱚᱠ ᱤᱞ ᱮᱢᱟᱫᱮᱭᱟ, ᱡᱟᱦᱟᱸᱭ ᱯᱟᱜᱽᱲᱤ ᱨᱮ ᱜᱚᱫ ᱠᱮᱫ-ᱟᱭ᱾',
          hoc: 'ᱢᱟᱨᱟᱜ ᱤᱞ ᱠᱚᱲᱟ ᱠᱮ ᱮᱢ ᱠᱮᱫ-ᱟᱭ᱾',
          hi: 'मोर ने कृतज्ञ होकर लड़के को अपना एक चमकीला पंख दिया, जिसे उसने अपनी पगड़ी में सजाया।',
          en: 'Grateful, the peacock gifted him a radiant feather, which he wore proudly on his turban.'
        },
        targetLatinMap: { sat: 'Marag do koṛa midtang corok il emadeya.' },
        keyWords: [{ wordHi: 'पगड़ी', wordTarget: 'ᱯᱟᱜᱽᱲᱤ (Pagṛi)' }]
      }
    ]
  },
  {
    id: 'story_12',
    category: 'festivals',
    categoryNameHi: 'पर्व व सांस्कृतिक परंपरा',
    titleHi: 'सोहराई और कोहबर भित्ति चित्रकला की कथा',
    moralHi: 'कला और संस्कृति हमारी पहचान हैं, इन्हें सहेज कर रखना चाहिए।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🎨 🏡 🐂 🌾',
        hindiText: 'दीपावली के बाद जब धान कटता है, तो सोहराई पर्व पर पशुधन की पूजा होती है।',
        targetScriptMap: {
          sat: 'ᱥᱚᱦᱨᱟᱭ ᱯᱚᱨᱚᱵ ᱨᱮ ᱰᱟᱝᱜᱽᱨᱟ-ᱠᱟᱰᱟ ᱠᱚ ᱡᱚᱛᱚᱱ ᱠᱚᱣᱟ ᱟᱨ ᱚᱲᱟᱜ ᱠᱚ ᱥᱟᱡᱟᱣᱟ᱾',
          hoc: 'ᱥᱚᱦᱨᱟᱭ ᱨᱮ ᱜᱟᱹᱭ-ᱠᱟᱰᱟ ᱠᱮ ᱠᱚ ᱡᱚᱦᱟᱨ ᱮᱢᱟ ᱠᱚᱣᱟ᱾',
          hi: 'दीपावली के बाद जब धान कटता है, तो सोहराई पर्व पर पशुधन की पूजा होती है।',
          en: 'After the harvest, the Sohrai festival honors domestic cattle and livestock.'
        },
        targetLatinMap: { sat: 'Sohray porob re ḍangra-kaḍa ko joton kowa.' },
        keyWords: [{ wordHi: 'पशु', wordTarget: 'ᱰᱟᱝᱜᱽᱨᱟ (Ḍangra)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🖌️ 🏺 🎨 🌿',
        hindiText: 'माताएं मिट्टी की दीवारों पर लाल, काली, पीली और सफेद प्राकृतिक मिट्टी से सुंदर चित्र बनाती हैं।',
        targetScriptMap: {
          sat: 'ᱟᱭᱳ ᱠᱚ ᱦᱟᱥᱟ ᱚᱲᱟᱜ ᱠᱟᱸᱛ ᱨᱮ ᱟᱭᱢᱟ ᱨᱚᱝ ᱦᱟᱥᱟ ᱛᱮ ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱵᱮᱱᱟᱣᱟ᱾',
          hoc: 'ᱠᱟᱸᱛ ᱨᱮ ᱪᱮᱦᱨᱟ ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱚᱞ-ᱟ᱾',
          hi: 'माताएं मिट्टी की दीवारों पर लाल, काली, पीली और सफेद प्राकृतिक मिट्टी से सुंदर चित्र बनाती हैं।',
          en: 'Mothers paint clay walls with natural ochres, creating majestic tribal murals.'
        },
        targetLatinMap: { sat: 'Ayo ko hasa oṛag kant re ayma rong hasa te...' },
        keyWords: [{ wordHi: 'मिट्टी', wordTarget: 'ᱦᱟᱥᱟ (Hasa)' }, { wordHi: 'दीवार', wordTarget: 'ᱠᱟᱸᱛ (Kant)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🦚 🦌 🐟 🌺',
        hindiText: 'दीवारों पर मोर, हिरण, हाथी, मछली और कमल के फूल जीवंत हो उठते हैं।',
        targetScriptMap: {
          sat: 'ᱠᱟᱸᱛ ᱨᱮ ᱢᱟᱨᱟᱜ, ᱡᱤᱞ, ᱦᱟᱹᱛᱤ ᱟᱨ ᱦᱟᱹᱠᱩ ᱠᱚᱣᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱧᱮᱞᱚᱜ-ᱟ᱾',
          hoc: 'ᱢᱟᱨᱟᱜ, ᱦᱟᱹᱛᱤ ᱟᱨ ᱦᱟᱹᱠᱩ ᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱮᱱᱟ᱾',
          hi: 'दीवारों पर मोर, हिरण, हाथी, मछली और कमल के फूल जीवंत हो उठते हैं।',
          en: 'Peacocks, deer, fish, and lotus flowers come to life on the painted walls.'
        },
        targetLatinMap: { sat: 'Kant re marag, jil, hati ar haku kowag citar...' },
        keyWords: [{ wordHi: 'मछली', wordTarget: 'ᱦᱟᱹᱠᱩ (Haku)' }, { wordHi: 'हिरण', wordTarget: 'ᱡᱤᱞ (Jil)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🏆 🌍 ✨ 🏡',
        hindiText: 'झारखंड की सोहराई चित्रकला को जीआई टैग मिला है और यह विश्व भर में प्रसिद्ध है।',
        targetScriptMap: {
          sat: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱭᱟᱜ ᱥᱚᱦᱨᱟᱭ ᱪᱤᱛᱟᱹᱨ ᱫᱚ ᱜᱚᱴᱟ ᱫᱷᱟᱹᱨᱛᱤ ᱨᱮ ᱧᱩᱛᱩᱢᱟᱱ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱥᱚᱦᱨᱟᱭ ᱪᱤᱛᱟᱹᱨ ᱫᱤᱥᱩᱢ-ᱫᱤᱥᱩᱢ ᱨᱮ ᱧᱩᱛᱩᱢ ᱮ ᱧᱟᱢ ᱠᱮᱫ-ᱟ᱾',
          hi: 'झारखंड की सोहराई चित्रकला को जीआई टैग मिला है और यह विश्व भर में प्रसिद्ध है।',
          en: 'Jharkhand’s Sohrai art holds GI status and is celebrated across the world.'
        },
        targetLatinMap: { sat: 'Jharkhand reyag Sohray citar do gota dharti re...' },
        keyWords: [{ wordHi: 'विश्व', wordTarget: 'ᱫᱷᱟᱹᱨᱛᱤ (Dharti)' }]
      }
    ]
  },
  {
    id: 'story_13',
    category: 'nature',
    categoryNameHi: 'प्रकृति व पर्यावरण',
    titleHi: 'जाहेर थान और पवित्र उपवन के प्रहरी',
    moralHi: 'पेड़ों की रक्षा ही आने वाली पीढ़ियों के जीवन की गारंटी है।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🌲 🌳 🕊️ 🌿',
        hindiText: 'प्रत्येक आदिवासी गाँव के बाहर साल के पेड़ों का एक पवित्र झुरमुट होता है जिसे जाहेर थान कहते हैं।',
        targetScriptMap: {
          sat: 'ᱡᱚᱛᱚ ᱟᱹᱛᱩ ᱵᱟᱦᱨᱮ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱨᱮᱭᱟᱜ ᱯᱟᱹᱣᱤᱛᱨᱚ ᱵᱤᱨ ᱛᱟᱦᱮᱸᱱᱟ ᱡᱟᱦᱟᱸ ᱫᱚ ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾',
          hoc: 'ᱦᱟᱛᱩ ᱵᱟᱦᱨᱮ ᱨᱮ ᱡᱟᱦᱮᱨ ᱜᱟᱲ ᱢᱮᱱᱟᱜ-ᱟ᱾',
          hi: 'प्रत्येक आदिवासी गाँव के बाहर साल के पेड़ों का एक पवित्र झुरमुट होता है जिसे जाहेर थान कहते हैं।',
          en: 'Outside every village lies a sacred grove of virgin Sal trees called Jaher Than.'
        },
        targetLatinMap: { sat: 'Joto atu bahre re sarjom dare reyag...' },
        keyWords: [{ wordHi: 'पवित्र वन', wordTarget: 'ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ (Jaher Than)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🪓 🚫 🌳 🛑',
        hindiText: 'नियम है कि जाहेर थान के एक भी पत्ते या लकड़ी को काटा नहीं जाता, यहाँ प्रकृति शांत रहती है।',
        targetScriptMap: {
          sat: 'ᱡᱟᱦᱮᱨ ᱨᱮᱭᱟᱜ ᱢᱤᱫᱴᱟᱝ ᱥᱟᱠᱟᱢ ᱦᱚᱸ ᱵᱟᱠᱚ ᱢᱟᱜ-ᱟ, ᱚᱸᱰᱮ ᱫᱚ ᱵᱚᱝᱜᱟ ᱠᱚ ᱛᱟᱦᱮᱸᱱᱟ᱾',
          hoc: 'ᱡᱟᱦᱮᱨ ᱨᱮ ᱫᱟᱨᱩ ᱢᱟᱜ ᱢᱟᱱᱟ ᱜᱮᱭᱟ᱾',
          hi: 'नियम है कि जाहेर थान के एक भी पत्ते या लकड़ी को काटा नहीं जाता, यहाँ प्रकृति शांत रहती है।',
          en: 'Custom forbids cutting even a single twig from Jaher Than; peace reigns within.'
        },
        targetLatinMap: { sat: 'Jaher reyag midtang sakam hoñ bako mag-a.' },
        keyWords: [{ wordHi: 'काटना', wordTarget: 'ᱢᱟᱜ (Mag)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🦅 🦌 💧 🌾',
        hindiText: 'वहाँ पक्षी घोंसले बनाते हैं, औषधीय लताएं फलती हैं और भूमिगत जल का स्तर ऊंचा रहता है।',
        targetScriptMap: {
          sat: 'ᱚᱸᱰᱮ ᱪᱮᱬᱮ ᱠᱚ ᱛᱩᱠᱟᱹ ᱠᱚ ᱵᱮᱱᱟᱣᱟ ᱟᱨ ᱫᱟᱜ ᱨᱮᱭᱟᱜ ᱥᱤᱵᱤᱞ ᱡᱷᱟᱨᱱᱟ ᱛᱟᱦᱮᱸᱱᱟ᱾',
          hoc: 'ᱪᱮᱬᱮ ᱠᱚ ᱛᱩᱠᱟᱹ ᱠᱚ ᱵᱮᱱᱟᱣᱟ ᱟᱨ ᱡᱷᱟᱨᱱᱟ ᱞᱤᱸᱜᱤᱱ-ᱟ᱾',
          hi: 'वहाँ पक्षी घोंसले बनाते हैं, औषधीय लताएं फलती हैं और भूमिगत जल का स्तर ऊंचा रहता है।',
          en: 'Birds nest safely, medicinal plants flourish, and ground water springs remain pure.'
        },
        targetLatinMap: { sat: 'Onde ceṇe ko tuka ko benawa...' },
        keyWords: [{ wordHi: 'घोंसला', wordTarget: 'ᱛᱩᱠᱟᱹ (Tuka)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🌱 🤝 🌏 💚',
        hindiText: 'यह आदिवासियों का प्राचीन वैज्ञानिक तरीका है जिससे सदियों से जैव विविधता बची रही है।',
        targetScriptMap: {
          sat: 'ᱱᱚᱣᱟ ᱫᱚ ᱥᱮᱫᱟᱭ ᱦᱚᱲᱟᱜ ᱵᱩᱫᱷᱤ ᱠᱟᱱᱟ ᱡᱟᱦᱟᱸ ᱛᱮ ᱵᱤᱨ ᱫᱚ ᱵᱟᱧᱪᱟᱣ ᱢᱮᱱᱟᱜ-ᱟ᱾',
          hoc: 'ᱱᱮᱭᱟ ᱛᱮ ᱵᱤᱨ-ᱵᱩᱨᱩ ᱵᱟᱧᱪᱟᱣ ᱛᱟᱱᱟ᱾',
          hi: 'यह आदिवासियों का प्राचीन वैज्ञानिक तरीका है जिससे सदियों से जैव विविधता बची रही है।',
          en: 'This indigenous ecological wisdom has conserved forest biodiversity for centuries.'
        },
        targetLatinMap: { sat: 'Nowa do seday hoṛag buddhi kana...' },
        keyWords: [{ wordHi: 'बचाना', wordTarget: 'ᱵᱟᱧᱪᱟᱣ (Bañcaw)' }]
      }
    ]
  },
  {
    id: 'story_14',
    category: 'fables',
    categoryNameHi: 'पशु-पक्षी व नीति कथाएँ',
    titleHi: 'दयालु शिकारी और कृतज्ञ हिरण',
    moralHi: 'दया और करुणा में वह शक्ति है जो कठोर से कठोर मन को भी पिघला देती है।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🏹 🦌 🌲 🌿',
        hindiText: 'एक शिकारी ने जंगल में एक सुंदर हिरण पर बाण साधा। हिरण ने कातर नयनों से दया की याचना की।',
        targetScriptMap: {
          sat: 'ᱢᱤᱫ ᱥᱮᱸᱫᱽᱨᱟ ᱠᱚᱲᱟ ᱵᱤᱨ ᱨᱮ ᱡᱤᱞ ᱪᱮᱛᱟᱱ ᱨᱮ ᱟᱜ ᱮ ᱜᱚᱦᱚᱲ ᱠᱮᱫ-ᱟ᱾ ᱡᱤᱞ ᱫᱚ ᱫᱟᱭᱟ ᱠᱷᱚᱡᱽ ᱠᱮᱫ-ᱟᱭ᱾',
          hoc: 'ᱥᱮᱸᱫᱽᱨᱟ ᱦᱚᱲ ᱡᱤᱞ ᱠᱮ ᱜᱚᱡ ᱥᱟᱱᱟᱭᱮ ᱛᱟᱦᱮᱸᱠᱟᱱᱟ, ᱡᱤᱞ ᱫᱟᱭᱟ ᱠᱩᱞᱤ ᱠᱮᱫ-ᱟᱭ᱾',
          hi: 'एक शिकारी ने जंगल में एक सुंदर हिरण पर बाण साधा। हिरण ने कातर नयनों से दया की याचना की।',
          en: 'A hunter drew his bow at a gentle deer. The deer looked at him with imploring eyes.'
        },
        targetLatinMap: { sat: 'Mid sendra koṛa bir re jil cetan re aag e gohoṛ ked-a.' },
        keyWords: [{ wordHi: 'शिकारी', wordTarget: 'ᱥᱮᱸᱫᱽᱨᱟ (Sendra)' }, { wordHi: 'हिरण', wordTarget: 'ᱡᱤᱞ (Jil)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🦌 🥺 🍼 🤱',
        hindiText: 'हिरण ने कहा: "मुझे कुछ समय दें, मैं अपने नन्हे बच्चों को दूध पिलाकर वापस आ जाऊँगा।"',
        targetScriptMap: {
          sat: 'ᱡᱤᱞ ᱮ ᱢᱮᱱ ᱠᱮᱫ-ᱟ, "ᱤᱧ ᱤᱧᱨᱤᱱ ᱦᱩᱰᱤᱧ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱳᱣᱟ ᱧᱩ ᱦᱚᱪᱚ ᱠᱟᱛᱮ ᱤᱧ ᱨᱩᱣᱟᱹᱲ ᱦᱤᱡᱩᱜ-ᱟ᱾"',
          hoc: 'ᱡᱤᱞ ᱢᱮᱱ ᱠᱮᱫ-ᱟ: "ᱦᱩᱰᱤᱧ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱳᱣᱟ ᱮᱢ ᱠᱮᱛᱮ ᱦᱤᱡᱩᱜ-ᱟᱹᱧ᱾"',
          hi: 'हिरण ने कहा: "मुझे कुछ समय दें, मैं अपने नन्हे बच्चों को दूध पिलाकर वापस आ जाऊँगा।"',
          en: 'The deer pleaded: "Grant me time to nurse my young fawns; I promise to return."'
        },
        targetLatinMap: { sat: 'Jil e men ked-a: Iñ iñrin hudiñ gidra...' },
        keyWords: [{ wordHi: 'दूध', wordTarget: 'ᱛᱳᱣᱟ (Towa)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🦌 🏃‍♂️ 🏹 🤝',
        hindiText: 'शिकारी हैरान रह गया जब कुछ देर बाद हिरण अपना वचन निभाते हुए सचमुच लौट आया।',
        targetScriptMap: {
          sat: 'ᱥᱮᱸᱫᱽᱨᱟ ᱠᱚᱲᱟ ᱟᱹᱰᱤ ᱦᱟᱦᱟᱲᱟᱭ ᱮᱱᱟ ᱡᱚᱠᱷᱚᱱ ᱡᱤᱞ ᱫᱚ ᱠᱟᱛᱷᱟ ᱫᱚᱦᱚ ᱠᱟᱛᱮ ᱨᱩᱣᱟᱹᱲ ᱦᱮᱡ ᱮᱱᱟᱭ᱾',
          hoc: 'ᱡᱤᱞ ᱟᱡᱟᱜ ᱠᱟᱛᱷᱟ ᱫᱚᱦᱚ ᱠᱮᱛᱮ ᱨᱩᱣᱟᱹᱲ ᱦᱮᱡ ᱮᱱᱟᱭ᱾',
          hi: 'शिकारी हैरान रह गया जब कुछ देर बाद हिरण अपना वचन निभाते हुए सचमुच लौट आया।',
          en: 'The hunter was stunned when the deer kept her word and returned to face the arrow.'
        },
        targetLatinMap: { sat: 'Sendra koṛa aḍi hahaṛay ena...' },
        keyWords: [{ wordHi: 'वचन/सत्य', wordTarget: 'ᱠᱟᱛᱷᱟ (Katha)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🏹 🚫 🦌 💖 🌲',
        hindiText: 'शिकारी का हृदय पिघल गया। उसने धनुष तोड़ दिया और प्रण लिया कि वह कभी जीवों की हत्या नहीं करेगा।',
        targetScriptMap: {
          sat: 'ᱥᱮᱸᱫᱽᱨᱟ ᱠᱚᱲᱟ ᱟᱜ ᱢᱚᱱᱮ ᱵᱚᱫᱚᱞ ᱮᱱᱟ᱾ ᱟᱜ ᱮ ᱨᱟᱹᱯᱩᱫ ᱠᱮᱫ-ᱟ ᱟᱨ ᱡᱤᱣᱤ ᱵᱟᱝ ᱜᱚᱡ ᱨᱮᱭᱟᱜ ᱠᱤᱨᱭᱟᱹᱭ ᱦᱟᱛᱟᱣ ᱠᱮᱫ-ᱟ᱾',
          hoc: 'ᱥᱮᱸᱫᱽᱨᱟ ᱦᱚᱲ ᱟᱜ ᱨᱟᱹᱯᱩᱫ ᱠᱮᱛᱮ ᱫᱟᱭᱟ ᱮᱦᱚᱵ ᱠᱮᱫ-ᱟᱭ᱾',
          hi: 'शिकारी का हृदय पिघल गया। उसने धनुष तोड़ दिया और प्रण लिया कि वह कभी जीवों की हत्या नहीं करेगा।',
          en: 'Moved to tears, the hunter broke his bow and vowed never to harm living beings.'
        },
        targetLatinMap: { sat: 'Sendra koṛa ag mone bodol ena. Aag e raput ked-a.' },
        keyWords: [{ wordHi: 'हृदय', wordTarget: 'ᱢᱚᱱᱮ (Mone)' }]
      }
    ]
  },
  {
    id: 'story_15',
    category: 'nature',
    categoryNameHi: 'प्रकृति व पर्यावरण',
    titleHi: 'बादाम पहाड़ की गुफा और लौह अयस्क का रहस्य',
    moralHi: 'खनिज संपदा हमारे राज्य का गौरव है, इसका बुद्धिमानी से उपयोग होना चाहिए।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '⛰️ ⛏️ 🔴 🌲',
        hindiText: 'सिंहभूम के बादाम पहाड़ में लाल रंग के भारी पत्थर बहुतायत में पाए जाते थे।',
        targetScriptMap: {
          sat: 'ᱥᱤᱝᱵᱷᱩᱢ ᱨᱮᱭᱟᱜ ᱵᱟᱫᱟᱢ ᱵᱩᱨᱩ ᱨᱮ ᱟᱨᱟᱜ ᱦᱟᱢᱟᱞ ᱫᱷᱤᱨᱤ ᱟᱭᱢᱟ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱵᱟᱫᱟᱢ ᱵᱩᱨᱩ ᱨᱮ ᱟᱨᱟᱜ ᱢᱮᱬᱦᱮᱫ ᱫᱷᱤᱨᱤ ᱛᱟᱦᱮᱸᱠᱟᱱᱟ᱾',
          hi: 'सिंहभूम के बादाम पहाड़ में लाल रंग के भारी पत्थर बहुतायत में पाए जाते थे।',
          en: 'Upon Badam Pahar in Singhbhum lay rich deposits of heavy reddish stones.'
        },
        targetLatinMap: { sat: 'Singhbhum reyag Badam buru re...' },
        keyWords: [{ wordHi: 'पत्थर', wordTarget: 'ᱫᱷᱤᱨᱤ (Dhiri)' }, { wordHi: 'लाल', wordTarget: 'ᱟᱨᱟᱜ (Arag)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🔥 🔨 🛡️ ⛏️',
        hindiText: 'असुर जनजाति के कारीगरों ने मिट्टी की भट्ठियाँ बनाकर इन पत्थरों से शुद्ध लोहा गलाना सीखा।',
        targetScriptMap: {
          sat: 'ᱟᱥᱩᱨ ᱦᱚᱲ ᱠᱚ ᱦᱟᱥᱟ ᱨᱮᱭᱟᱜ ᱪᱩᱞᱦᱟᱹ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱫᱷᱤᱨᱤ ᱠᱷᱚᱱ ᱢᱮᱬᱦᱮᱫ ᱠᱚ ᱜᱟᱞᱟᱣ ᱠᱮᱫ-ᱟ᱾',
          hoc: 'ᱟᱥᱩᱨ ᱡᱟᱹᱛᱤ ᱫᱷᱤᱨᱤ ᱠᱷᱚᱱ ᱢᱮᱬᱦᱮᱫ ᱚᱰᱚᱠ ᱠᱮᱫ-ᱟᱠᱚ᱾',
          hi: 'असुर जनजाति के कारीगरों ने मिट्टी की भट्ठियाँ बनाकर इन पत्थरों से शुद्ध लोहा गलाना सीखा।',
          en: 'Artisans of the Asur tribe built clay kilns to smelt rust-free iron from the ore.'
        },
        targetLatinMap: { sat: 'Asur hoṛ ko hasa reyag culha benaw kate...' },
        keyWords: [{ wordHi: 'लोहा', wordTarget: 'ᱢᱮᱬᱦᱮᱫ (Meṇhed)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🗡️ 🌾 🏹 🛠️',
        hindiText: 'उस लोहे से हल की फाल, हंसिया और कुल्हाड़ी बनी, जिससे खेती और जीवन आसान हो गया।',
        targetScriptMap: {
          sat: 'ᱚᱱᱟ ᱢᱮᱬᱦᱮᱫ ᱛᱮ ᱱᱟᱦᱮᱞ, ᱠᱟᱹᱯᱤ ᱟᱨ ᱴᱟᱸᱜᱟ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱪᱟᱥ-ᱵᱟᱥ ᱞᱟᱦᱟ ᱮᱱᱟ᱾',
          hoc: 'ᱢᱮᱬᱦᱮᱫ ᱛᱮ ᱱᱟᱦᱮᱞ ᱟᱨ ᱠᱟᱹᱯᱤ ᱛᱮᱭᱟᱨ ᱮᱱᱟ᱾',
          hi: 'उस लोहे से हल की फाल, हंसिया और कुल्हाड़ी बनी, जिससे खेती और जीवन आसान हो गया।',
          en: 'From this metal they forged ploughshares and sickles, advancing agriculture.'
        },
        targetLatinMap: { sat: 'Ona meṇhed te nahel, kapi ar ṭanga benaw kate...' },
        keyWords: [{ wordHi: 'हल', wordTarget: 'ᱱᱟᱦᱮᱞ (Nahel)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🏭 🚂 🇮🇳 🌟',
        hindiText: 'यही बादाम पहाड़ आज देश के आधुनिक इस्पात उद्योग की नींव बना हुआ है।',
        targetScriptMap: {
          sat: 'ᱱᱚᱣᱟ ᱵᱟᱫᱟᱢ ᱵᱩᱨᱩ ᱜᱮ ᱛᱮᱦᱮᱧ ᱫᱤᱥᱚᱢ ᱨᱮᱭᱟᱜ ᱢᱟᱨᱟᱝ ᱢᱮᱬᱦᱮᱫ ᱠᱟᱹᱨᱜᱟᱲ ᱨᱮᱭᱟᱜ ᱡᱤᱣᱤ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱱᱮᱭᱟ ᱢᱮᱬᱦᱮᱫ ᱛᱮ ᱫᱤᱥᱩᱢ ᱞᱟᱦᱟᱜ ᱛᱟᱱᱟ᱾',
          hi: 'यही बादाम पहाड़ आज देश के आधुनिक इस्पात उद्योग की नींव बना हुआ है।',
          en: 'Badam Pahar thus laid the historical foundation for India’s steel industry.'
        },
        targetLatinMap: { sat: 'Nowa Badam buru ge teheñ disom reyag...' },
        keyWords: [{ wordHi: 'देश', wordTarget: 'ᱫᱤᱥᱚᱢ (Disom)' }]
      }
    ]
  },
  {
    id: 'story_16',
    category: 'fables',
    categoryNameHi: 'पशु-पक्षी व नीति कथाएँ',
    titleHi: 'धैर्यवान कछुआ और घमंडी लोमड़ी',
    moralHi: 'धैर्य और निरंतर प्रयास करने वाला ही अंततः सफल होता है।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🐢 🦊 🏞️ 🌲',
        hindiText: 'तालाब किनारे एक धीमा कछुआ और एक तेज दौड़ने वाली घमंडी लोमड़ी रहते थे।',
        targetScriptMap: {
          sat: 'ᱯᱩᱠᱷᱨᱤ ᱟᱲᱮ ᱨᱮ ᱢᱤᱫ ᱦᱚᱨᱚ ᱟᱨ ᱢᱤᱫ ᱜᱚᱨᱚᱵᱽ ᱛᱩᱭᱩ ᱠᱤᱱ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱯᱩᱠᱷᱨᱤ ᱡᱟᱯᱟᱜ ᱨᱮ ᱦᱚᱨᱚ ᱟᱨ ᱛᱩᱭᱩ ᱛᱟᱦᱮᱸᱠᱟᱱᱟᱠᱤᱱ᱾',
          hi: 'तालाब किनारे एक धीमा कछुआ और एक तेज दौड़ने वाली घमंडी लोमड़ी रहते थे।',
          en: 'Beside a quiet pond lived a patient tortoise and a boastful fox.'
        },
        targetLatinMap: { sat: 'Pukhri aṛe re mid horo ar mid gorob tuyu kin tahe kana.' },
        keyWords: [{ wordHi: 'कछुआ', wordTarget: 'ᱦᱚᱨᱚ (Horo)' }, { wordHi: 'तालाब', wordTarget: 'ᱯᱩᱠᱷᱨᱤ (Pukhri)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🏁 🐢 🦊 🏃',
        hindiText: 'लोमड़ी ने कछुए को पहाड़ी तक दौड़ने की चुनौती दी। लोमड़ी हवा की तरह आगे निकल गई।',
        targetScriptMap: {
          sat: 'ᱛᱩᱭᱩ ᱫᱚ ᱦᱚᱨᱚ ᱫᱟᱹᱲ ᱦᱮᱯᱨᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱮ ᱦᱚᱦᱚ ᱟᱫᱮᱭᱟ ᱟᱨ ᱞᱟᱦᱟ ᱮᱱᱟᱭ᱾',
          hoc: 'ᱛᱩᱭᱩ ᱫᱟᱹᱲ ᱠᱮᱛᱮ ᱟᱹᱰᱤ ᱥᱟᱺᱜᱤᱧ ᱥᱮᱱ ᱮᱱᱟᱭ᱾',
          hi: 'लोमड़ी ने कछुए को पहाड़ी तक दौड़ने की चुनौती दी। लोमड़ी हवा की तरह आगे निकल गई।',
          en: 'The fox challenged the tortoise to a race to the hill and sprinted ahead.'
        },
        targetLatinMap: { sat: 'Tuyu do horo daṛ hepraw lagid e hoho adeya.' },
        keyWords: [{ wordHi: 'दौड़', wordTarget: 'ᱫᱟᱹᱲ (Daṛ)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '😴 🌳 🐢 🚶‍♂️',
        hindiText: 'लोमड़ी पेड़ की छांव में सो गई, पर कछुआ बिना रुके धीरे-धीरे कदम बढ़ाता रहा।',
        targetScriptMap: {
          sat: 'ᱛᱩᱭᱩ ᱫᱟᱨᱮ ᱩᱢᱩᱞ ᱨᱮ ᱡᱟᱹᱯᱤᱫ ᱠᱮᱫ-ᱟᱭ, ᱢᱮᱱᱠᱷᱟᱱ ᱦᱚᱨᱚ ᱫᱚ ᱛᱟᱲᱟᱢ ᱛᱮᱜᱮ ᱛᱟᱦᱮᱸ ᱮᱱᱟᱭ᱾',
          hoc: 'ᱛᱩᱭᱩ ᱜᱤᱛᱤᱡ ᱮᱱᱟᱭ, ᱦᱚᱨᱚ ᱛᱟᱲᱟᱢ ᱛᱮᱜᱮ ᱥᱮᱱ ᱮᱱᱟᱭ᱾',
          hi: 'लोमड़ी पेड़ की छांव में सो गई, पर कछुआ बिना रुके धीरे-धीरे कदम बढ़ाता रहा।',
          en: 'Confident, the fox napped under shade while the tortoise kept moving step by step.'
        },
        targetLatinMap: { sat: 'Tuyu dare umul re japid ked-ay, menkhan horo do...' },
        keyWords: [{ wordHi: 'सोना', wordTarget: 'ᱡᱟᱹᱯᱤᱫ (Japid)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🏆 🐢 🎉 🦊 😳',
        hindiText: 'जब लोमड़ी जागी, कछुआ विजय रेखा पार कर चुका था। धैर्य की जीत हुई।',
        targetScriptMap: {
          sat: 'ᱛᱩᱭᱩ ᱡᱚᱠᱷᱚᱱ ᱵᱮᱨᱮᱫ ᱮᱱᱟᱭ, ᱦᱚᱨᱚ ᱫᱚ ᱡᱤᱛᱠᱟᱹᱨ ᱦᱩᱭ ᱞᱮᱱᱟᱭ᱾',
          hoc: 'ᱦᱚᱨᱚ ᱡᱤᱛᱟᱹᱣ ᱮᱱᱟᱭ, ᱛᱩᱭᱩ ᱞᱟᱡᱟᱣ ᱮᱱᱟᱭ᱾',
          hi: 'जब लोमड़ी जागी, कछुआ विजय रेखा पार कर चुका था। धैर्य की जीत हुई।',
          en: 'When the fox woke, the tortoise had already crossed the finish line.'
        },
        targetLatinMap: { sat: 'Tuyu jokhon bered enay, horo do jitkar huy lenay.' },
        keyWords: [{ wordHi: 'जीत', wordTarget: 'ᱡᱤᱛᱠᱟᱹᱨ (Jitkar)' }]
      }
    ]
  },
  {
    id: 'story_17',
    category: 'heroes',
    categoryNameHi: 'वीर गाथाएँ व ऐतिहासिक नायक',
    titleHi: 'मुंडा राजा और सुनहरी धान की बालियाँ',
    moralHi: 'राजा वही श्रेष्ठ है जो अपनी प्रजा के अन्न और सम्मान की रक्षा करे।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '👑 🌾 🏰 🏞️',
        hindiText: 'प्राचीन छोटानागपुर में मदरा मुंडा एक दयालु और न्यायप्रिय राजा थे।',
        targetScriptMap: {
          sat: 'ᱥᱮᱫᱟᱭ ᱪᱷᱳᱴᱟᱱᱟᱜᱽᱯᱩᱨ ᱨᱮ ᱢᱟᱫᱽᱨᱟ ᱢᱩᱱᱰᱟ ᱢᱤᱫ ᱫᱟᱭᱟᱵᱟᱱ ᱨᱟᱡᱟᱭ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱢᱟᱫᱽᱨᱟ ᱢᱩᱱᱰᱟ ᱟᱹᱰᱤ ᱱᱮᱭᱟᱭ ᱨᱟᱡᱟ ᱛᱟᱦᱮᱸᱠᱟᱱᱟᱭ᱾',
          hi: 'प्राचीन छोटानागपुर में मदरा मुंडा एक दयालु और न्यायप्रिय राजा थे।',
          en: 'In ancient Chotanagpur, King Madra Munda ruled with compassion and justice.'
        },
        targetLatinMap: { sat: 'Seday Chotanagpur re Madra Munda mid dayaban rajay tahe kana.' },
        keyWords: [{ wordHi: 'राजा', wordTarget: 'ᱨᱟᱡᱟ (Raja)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🌾 🤝 👨‍🌾 🏡',
        hindiText: 'वे स्वयं किसानों के साथ खेतों में हल चलाते और धान की पहली फसल का हिस्सा गरीबों में बाँटते थे।',
        targetScriptMap: {
          sat: 'ᱩᱱᱤ ᱟᱡ ᱛᱮ ᱪᱟᱥᱤ ᱠᱚ ᱥᱟᱶ ᱱᱟᱦᱮᱞ ᱮ ᱥᱤᱭᱟ ᱟᱨ ᱦᱳᱲᱳ ᱫᱚ ᱨᱮᱸᱜᱮᱡ ᱦᱚᱲ ᱮ ᱦᱟᱹᱴᱤᱧᱟᱫ ᱠᱚᱣᱟ᱾',
          hoc: 'ᱨᱟᱡᱟ ᱦᱚᱲ ᱠᱚ ᱥᱟᱶ ᱪᱟᱥ ᱠᱮᱫ-ᱟᱭ᱾',
          hi: 'वे स्वयं किसानों के साथ खेतों में हल चलाते और धान की पहली फसल का हिस्सा गरीबों में बाँटते थे।',
          en: 'He ploughed alongside farmers and distributed the first harvest to the needy.'
        },
        targetLatinMap: { sat: 'Uni aj te casi ko saw nahel e siya...' },
        keyWords: [{ wordHi: 'गरीब', wordTarget: 'ᱨᱮᱸᱜᱮᱡ (Reñgej)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🌧️ 🌾 ✨ 💛',
        hindiText: 'उनके शासनकाल में वर्षा कभी कम नहीं हुई और छोटानागपुर का हर घर अन्न से भरा रहा।',
        targetScriptMap: {
          sat: 'ᱩᱱᱤᱭᱟᱜ ᱥᱟᱥᱚᱱ ᱨᱮ ᱫᱟᱜ-ᱡᱟᱹᱲᱤ ᱵᱮᱥ ᱦᱩᱭ ᱮᱱᱟ ᱟᱨ ᱡᱚᱛᱚ ᱚᱲᱟᱜ ᱨᱮ ᱫᱟᱠᱟ-ᱩᱛᱩ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱫᱤᱥᱩᱢ ᱨᱮ ᱫᱟᱠᱟ-ᱢᱟᱺᱰᱤ ᱨᱮᱭᱟᱜ ᱟᱱᱟᱴ ᱵᱟᱝ ᱦᱩᱭ ᱮᱱᱟ᱾',
          hi: 'उनके शासनकाल में वर्षा कभी कम नहीं हुई और छोटानागपुर का हर घर अन्न से भरा रहा।',
          en: 'Under his reign, rains fell abundantly and granaries remained full of grain.'
        },
        targetLatinMap: { sat: 'Uniyag sason re daag-jaṛi bes huy ena...' },
        keyWords: [{ wordHi: 'भोजन', wordTarget: 'ᱫᱟᱠᱟ (Daka)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🌟 📜 🙏 💖',
        hindiText: 'आज भी लोकगीतों में मदरा मुंडा के सुनहरे शासन की प्रशंसा गाई जाती है।',
        targetScriptMap: {
          sat: 'ᱛᱮᱦᱮᱧ ᱦᱚᱸ ᱥᱮᱨᱮᱧ ᱨᱮ ᱢᱟᱫᱽᱨᱟ ᱢᱩᱱᱰᱟ ᱟᱜ ᱧᱩᱛᱩᱢ ᱠᱚ ᱥᱟᱨᱦᱟᱣᱟ᱾',
          hoc: 'ᱥᱮᱨᱮᱧ ᱨᱮ ᱨᱟᱡᱟ ᱟᱜ ᱧᱩᱛᱩᱢ ᱡᱤᱣᱤᱫ ᱢᱮᱱᱟᱜ-ᱟ᱾',
          hi: 'आज भी लोकगीतों में मदरा मुंडा के सुनहरे शासन की प्रशंसा गाई जाती है।',
          en: 'Folksongs still resonate across villages in honor of his benevolent reign.'
        },
        targetLatinMap: { sat: 'Teheñ hoñ sereñ re Madra Munda ag ñutum ko sarhawa.' },
        keyWords: [{ wordHi: 'प्रशंसा', wordTarget: 'ᱥᱟᱨᱦᱟᱣ (Sarhaw)' }]
      }
    ]
  },
  {
    id: 'story_18',
    category: 'heroes',
    categoryNameHi: 'वीर गाथाएँ व ऐतिहासिक नायक',
    titleHi: 'बाबा तिलका मांझी का तीर और धनुष',
    moralHi: 'अन्याय के विरुद्ध आवाज़ उठाना ही सच्ची वीरता है।',
    estimatedDurationMin: 5,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🏹 🌲 🧒 🌳',
        hindiText: 'संथाल परगना के जंगलों में बाबा तिलका मांझी ने आदिवासियों के स्वाभिमान को जगाया।',
        targetScriptMap: {
          sat: 'ᱥᱟᱱᱛᱟᱲ ᱯᱟᱨᱜᱟᱱᱟ ᱨᱮ ᱛᱤᱞᱠᱟᱹ ᱢᱟᱹᱡᱷᱤ ᱫᱚ ᱦᱚᱲ ᱠᱚᱣᱟᱜ ᱢᱟᱹᱱ ᱵᱟᱧᱪᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱞᱟᱹᱰᱷᱟᱹᱭ ᱠᱮᱫ-ᱟᱭ᱾',
          hoc: 'ᱛᱤᱞᱠᱟ ᱢᱟᱹᱡᱷᱤ ᱵᱤᱨ ᱦᱚᱲ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱛᱤᱸᱜᱩ ᱮᱱᱟᱭ᱾',
          hi: 'संथाल परगना के जंगलों में बाबा तिलका मांझी ने आदिवासियों के स्वाभिमान को जगाया।',
          en: 'In the hills of Santhal Pargana, Baba Tilka Majhi awakened the tribal spirit of freedom.'
        },
        targetLatinMap: { sat: 'Santal Pargana re Tilka Majhi do...' },
        keyWords: [{ wordHi: 'स्वाभिमान', wordTarget: 'ᱢᱟᱹᱱ (Man)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🌴 🏹 🎯 ⚔️',
        hindiText: 'उन्होंने ताड़ के पेड़ पर छिपकर अपने एक ही तीर से अत्याचारी अंग्रेज कलेक्टर क्लीवलैंड को मार गिराया।',
        targetScriptMap: {
          sat: 'ᱩᱱᱤ ᱫᱚ ᱛᱟᱞᱮ ᱫᱟᱨᱮ ᱪᱮᱛᱟᱱ ᱠᱷᱚᱱ ᱟᱜ-ᱥᱟᱨ ᱛᱮ ᱵᱟᱹᱭᱨᱤ ᱠᱚᱞᱮᱠᱴᱚᱨ ᱮ ᱜᱚᱡ ᱠᱮᱫᱮᱭᱟ᱾',
          hoc: 'ᱛᱟᱞᱮ ᱫᱟᱨᱩ ᱠᱷᱚᱱ ᱟᱜ-ᱥᱟᱨ ᱛᱮ ᱞᱟᱹᱰᱷᱟᱹᱭ ᱠᱮᱫ-ᱟᱭ᱾',
          hi: 'उन्होंने ताड़ के पेड़ पर छिपकर अपने एक ही तीर से अत्याचारी अंग्रेज कलेक्टर क्लीवलैंड को मार गिराया।',
          en: 'Concealed high upon a palm tree, his single arrow felled the tyrannical magistrate.'
        },
        targetLatinMap: { sat: 'Uni do tale dare cetan khon aag-sar te...' },
        keyWords: [{ wordHi: 'ताड़ का पेड़', wordTarget: 'ᱛᱟᱞᱮ ᱫᱟᱨᱮ (Tale Dare)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '⛓️ 🌲 ✊ 🌟',
        hindiText: 'उन्हें बंदी बनाकर घोड़ों से घसीटा गया, फिर भी उनके चेहरे पर कोई भय नहीं था।',
        targetScriptMap: {
          sat: 'ᱩᱱᱤ ᱠᱚ ᱛᱚᱞ ᱠᱮᱫᱮ ᱨᱮᱦᱚᱸ, ᱟᱡᱟᱜ ᱢᱮᱫᱦᱟ ᱨᱮ ᱪᱮᱫ ᱵᱚᱛᱚᱨ ᱦᱚᱸ ᱵᱟᱝ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾',
          hoc: 'ᱩᱱᱤ ᱵᱟᱭ ᱵᱚᱛᱚᱨ ᱮᱱᱟ, ᱵᱤᱨ ᱞᱮᱠᱟ ᱛᱤᱸᱜᱩ ᱮᱱᱟᱭ᱾',
          hi: 'उन्हें बंदी बनाकर घोड़ों से घसीटा गया, फिर भी उनके चेहरे पर कोई भय नहीं था।',
          en: 'Bound and dragged by horses, not a trace of fear crossed the hero’s face.'
        },
        targetLatinMap: { sat: 'Uni ko tol kede rehoñ, ajag medha re ced botor hoñ...' },
        keyWords: [{ wordHi: 'भय', wordTarget: 'ᱵᱚᱛᱚᱨ (Botor)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '🌳 🇮🇳 🌺 🌟',
        hindiText: 'भागलपुर के बरगद पर वे शहीद हुए। वे भारत के प्रथम आदिवासी स्वतंत्रता सेनानी थे।',
        targetScriptMap: {
          sat: 'ᱵᱟᱲᱮ ᱫᱟᱨᱮ ᱨᱮ ᱩᱱᱤ ᱫᱚ ᱡᱤᱣᱤ ᱮᱢ ᱠᱮᱫ-ᱟᱭ᱾ ᱩᱱᱤ ᱫᱚ ᱟᱵᱚ ᱨᱤᱱᱤᱡ ᱯᱩᱭᱞᱩ ᱵᱤᱨ ᱠᱟᱱᱟᱭ᱾',
          hoc: 'ᱛᱤᱞᱠᱟ ᱢᱟᱹᱡᱷᱤ ᱟᱵᱩ ᱞᱟᱹᱜᱤᱫ ᱡᱤᱣᱤ ᱮᱢ ᱠᱮᱫ-ᱟᱭ᱾',
          hi: 'भागलपुर के बरगद पर वे शहीद हुए। वे भारत के प्रथम आदिवासी स्वतंत्रता सेनानी थे।',
          en: 'Martyred beneath an ancient Banyan tree, he remains India’s first tribal freedom fighter.'
        },
        targetLatinMap: { sat: 'Baṛe dare re uni do jiwi em ked-ay.' },
        keyWords: [{ wordHi: 'बरगद', wordTarget: 'ᱵᱟᱲᱮ ᱫᱟᱨᱮ (Baṛe Dare)' }]
      }
    ]
  },
  {
    id: 'story_19',
    category: 'fables',
    categoryNameHi: 'पशु-पक्षी व नीति कथाएँ',
    titleHi: 'जादुई मिट्टी का घड़ा और शीतल जल',
    moralHi: 'सच्चा धन वही है जो प्यासे और भूखे की सेवा में काम आए।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🏺 👵 🏡 💧',
        hindiText: 'एक निर्धन वृद्धा के पास मिट्टी का एक पुराना घड़ा था जो कभी खाली नहीं होता था।',
        targetScriptMap: {
          sat: 'ᱢᱤᱫ ᱨᱮᱸᱜᱮᱡ ᱵᱩᱰᱷᱤ ᱴᱷᱮᱱ ᱢᱤᱫ ᱦᱟᱥᱟ ᱴᱩᱠᱩᱡ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ ᱡᱟᱦᱟᱸ ᱫᱚ ᱛᱤᱥ ᱦᱚᱸ ᱵᱟᱝ ᱟᱧᱡᱮᱫᱚᱜ ᱛᱟᱦᱮᱸᱫ᱾',
          hoc: 'ᱢᱤᱫ ᱵᱩᱰᱷᱤ ᱟᱜ ᱦᱟᱥᱟ ᱴᱩᱠᱩᱡ ᱨᱮ ᱫᱤᱱᱟᱹᱢ ᱫᱟᱜ ᱛᱟᱦᱮᱸᱠᱟᱱᱟ᱾',
          hi: 'एक निर्धन वृद्धा के पास मिट्टी का एक पुराना घड़ा था जो कभी खाली नहीं होता था।',
          en: 'A humble elderly woman possessed an earthen pitcher that never ran dry.'
        },
        targetLatinMap: { sat: 'Mid reñgej buḍhi ṭhen mid hasa ṭukuj tahe kana...' },
        keyWords: [{ wordHi: 'घड़ा', wordTarget: 'ᱴᱩᱠᱩᱡ (Ṭukuj)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🚶‍♂️ ☀️ 💧 🤲',
        hindiText: 'जो भी थका-हारा राहगीर धूप में आता, वृद्धा उसे घड़े से अमृत जैसा शीतल जल पिलाती।',
        targetScriptMap: {
          sat: 'ᱡᱟᱦᱟᱸᱭ ᱦᱚᱲ ᱜᱮ ᱥᱤᱛᱩᱝ ᱨᱮ ᱦᱤᱡᱩᱜ-ᱟ, ᱩᱱᱤ ᱫᱚ ᱚᱱᱟ ᱴᱩᱠᱩᱡ ᱠᱷᱚᱱ ᱥᱤᱵᱤᱞ ᱫᱟᱜ ᱮ ᱧᱩ ᱚᱪᱚᱭᱮᱭᱟ᱾',
          hoc: 'ᱨᱮᱸᱜᱮᱡ ᱦᱚᱲ ᱠᱚ ᱚᱸᱰᱮ ᱫᱟᱜ ᱠᱚ ᱧᱩᱭᱟ᱾',
          hi: 'जो भी थका-हारा राहगीर धूप में आता, वृद्धा उसे घड़े से अमृत जैसा शीतल जल पिलाती।',
          en: 'Weary travelers passing in the heat drank pure, refreshing water from her pot.'
        },
        targetLatinMap: { sat: 'Jahay hoṛ ge situng re hijug-a...' },
        keyWords: [{ wordHi: 'धूप', wordTarget: 'ᱥᱤᱛᱩᱝ (Situng)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '💰 😠 🏺 🚫',
        hindiText: 'एक लोभी व्यापारी ने वह घड़ा चुरा लिया, लेकिन उसके छूते ही घड़ा साधारण सूखी मिट्टी बन गया।',
        targetScriptMap: {
          sat: 'ᱢᱤᱫ ᱞᱟᱞᱚᱪᱤ ᱵᱮᱯᱟᱨᱤ ᱚᱱᱟ ᱴᱩᱠᱩᱡ ᱮ ᱠᱩᱢᱵᱽᱲᱩ ᱠᱮᱫ-ᱟ, ᱢᱮᱱᱠᱷᱟᱱ ᱚᱱᱟ ᱫᱚ ᱨᱚᱦᱚᱲ ᱦᱟᱥᱟ ᱵᱮᱱᱟᱣ ᱮᱱᱟ᱾',
          hoc: 'ᱠᱩᱢᱵᱽᱲᱩ ᱦᱚᱲ ᱴᱩᱠᱩᱡ ᱤᱫᱤ ᱠᱮᱫ-ᱟᱭ ᱢᱮᱱᱫᱚ ᱫᱟᱜ ᱵᱟᱝ ᱚᱰᱚᱠ ᱮᱱᱟ᱾',
          hi: 'एक लोभी व्यापारी ने वह घड़ा चुरा लिया, लेकिन उसके छूते ही घड़ा साधारण सूखी मिट्टी बन गया।',
          en: 'A greedy merchant stole the pitcher, but in his selfish hands it turned to dry dust.'
        },
        targetLatinMap: { sat: 'Mid laloci bepari ona ṭukuj e kumbṛu ked-a...' },
        keyWords: [{ wordHi: 'चोरी', wordTarget: 'ᱠᱩᱢᱵᱽᱲᱩ (Kumbṛu)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '💖 🏺 👵 💧 ✨',
        hindiText: 'जब घड़ा वृद्धा के पास लौटा, उसमें फिर से अमृत जैसा शीतल जल भर गया। निस्वार्थ सेवा ही अमर है।',
        targetScriptMap: {
          sat: 'ᱡᱚᱠᱷᱚᱱ ᱴᱩᱠᱩᱡ ᱵᱩᱰᱷᱤ ᱴᱷᱮᱱ ᱨᱩᱣᱟᱹᱲ ᱦᱮᱡ ᱮᱱᱟ, ᱟᱨᱦᱚᱸ ᱫᱟᱜ ᱛᱮ ᱯᱮᱨᱮᱡ ᱮᱱᱟ᱾',
          hoc: 'ᱵᱩᱰᱷᱤ ᱴᱷᱮᱱ ᱦᱮᱡ ᱮᱱ ᱠᱷᱟᱱ ᱴᱩᱠᱩᱡ ᱨᱮ ᱫᱟᱜ ᱦᱮᱡ ᱮᱱᱟ᱾',
          hi: 'जब घड़ा वृद्धा के पास लौटा, उसमें फिर से अमृत जैसा शीतल जल भर गया। निस्वार्थ सेवा ही अमर है।',
          en: 'Returned to the selfless grandmother, the pitcher filled once again with sweet water.'
        },
        targetLatinMap: { sat: 'Jokhon ṭukuj buḍhi ṭhen ruwaṛ hej ena, arhoñ daag te perez ena.' },
        keyWords: [{ wordHi: 'भरा हुआ', wordTarget: 'ᱯᱮᱨᱮᱡ (Perez)' }]
      }
    ]
  },
  {
    id: 'story_20',
    category: 'nature',
    categoryNameHi: 'प्रकृति व पर्यावरण',
    titleHi: 'दलमा की नन्हीं गिलहरी और वन सुरक्षा',
    moralHi: 'कोई भी प्रयास छोटा नहीं होता; हर छोटा जीव प्रकृति का रक्षक बन सकता है।',
    estimatedDurationMin: 4,
    scenes: [
      {
        sceneNumber: 1,
        imageEmoji: '🐿️ 🌲 🌰 🍃',
        hindiText: 'दलमा की पहाड़ियों में एक नन्हीं गिलहरी साल और महुआ के बीजों को मिट्टी में गाड़ कर रखती थी।',
        targetScriptMap: {
          sat: 'ᱫᱟᱞᱢᱟ ᱵᱩᱨᱩ ᱨᱮ ᱢᱤᱫ ᱦᱩᱰᱤᱧ ᱛᱩᱲᱩ ᱫᱚ ᱥᱟᱨᱡᱚᱢ ᱟᱨ ᱢᱟᱛᱠᱚᱢ ᱡᱟᱝ ᱦᱟᱥᱟ ᱨᱮ ᱛᱚᱯᱟ ᱛᱟᱦᱮᱸᱫ᱾',
          hoc: 'ᱫᱟᱞᱢᱟ ᱵᱩᱨᱩ ᱨᱮ ᱛᱩᱲᱩ ᱡᱟᱝ ᱠᱚ ᱦᱟᱥᱟ ᱨᱮ ᱩᱠᱩᱭ ᱛᱟᱦᱮᱸᱠᱟᱱᱟᱭ᱾',
          hi: 'दलमा की पहाड़ियों में एक नन्हीं गिलहरी साल और महुआ के बीजों को मिट्टी में गाड़ कर रखती थी।',
          en: 'Upon Dalma hills, a tiny squirrel buried Sal and Mahua seeds deep in fertile earth.'
        },
        targetLatinMap: { sat: 'Dalma buru re mid hudiñ tuṛu do...' },
        keyWords: [{ wordHi: 'गिलहरी', wordTarget: 'ᱛᱩᱲᱩ (Tuṛu)' }, { wordHi: 'बीज', wordTarget: 'ᱡᱟᱝ (Jang)' }]
      },
      {
        sceneNumber: 2,
        imageEmoji: '🌱 🌿 🌳 🌳',
        hindiText: 'बरसात आते ही वे बीज अंकुरित होकर नन्हे पौधे बन गए और दलमा का जंगल और घना हो गया।',
        targetScriptMap: {
          sat: 'ᱫᱟᱜ ᱦᱮᱡ ᱮᱱ ᱠᱷᱟᱱ ᱚᱱᱟ ᱡᱟᱝ ᱠᱚ ᱢᱚᱞᱚᱝ ᱮᱱᱟ ᱟᱨ ᱵᱤᱨ ᱫᱚ ᱟᱨᱦᱚᱸ ᱜᱟᱡᱟᱲ ᱮᱱᱟ᱾',
          hoc: 'ᱫᱟᱜ ᱛᱮ ᱡᱟᱝ ᱠᱚ ᱦᱟᱨᱟ ᱮᱱᱟ ᱟᱨ ᱫᱟᱨᱩ ᱵᱮᱱᱟᱣ ᱮᱱᱟ᱾',
          hi: 'बरसात आते ही वे बीज अंकुरित होकर नन्हे पौधे बन गए और दलमा का जंगल और घना हो गया।',
          en: 'With summer rains, the buried seeds sprouted into saplings, enriching the lush forest.'
        },
        targetLatinMap: { sat: 'Daag hej en khan ona jang ko molong ena...' },
        keyWords: [{ wordHi: 'पौधा', wordTarget: 'ᱫᱟᱨᱮ (Dare)' }]
      },
      {
        sceneNumber: 3,
        imageEmoji: '🔥 🌲 ⚠️ 🐿️',
        hindiText: 'एक दिन जंगल में आग की लपटें उठीं। गिलहरी ने शोर मचाकर पूरे गाँव और पशुओं को सचेत कर दिया।',
        targetScriptMap: {
          sat: 'ᱢᱤᱫ ᱫᱤᱱ ᱵᱤᱨ ᱨᱮ ᱥᱮᱸᱜᱮᱞ ᱞᱟᱜᱟᱣ ᱮᱱᱟ᱾ ᱛᱩᱲᱩ ᱫᱚ ᱦᱚᱦᱚ ᱠᱟᱛᱮ ᱡᱚᱛᱚ ᱦᱚᱲ ᱮ ᱪᱮᱛᱟᱣ ᱠᱮᱫ ᱠᱚᱣᱟ᱾',
          hoc: 'ᱵᱤᱨ ᱨᱮ ᱥᱮᱸᱜᱮᱞ ᱡᱩᱞ ᱮᱱᱟ, ᱛᱩᱲᱩ ᱡᱚᱛᱚ ᱡᱤᱭᱟᱹᱞᱤ ᱠᱮ ᱪᱮᱛᱟᱣ ᱠᱮᱫ-ᱟᱭ᱾',
          hi: 'एक दिन जंगल में आग की लपटें उठीं। गिलहरी ने शोर मचाकर पूरे गाँव और पशुओं को सचेत कर दिया।',
          en: 'One afternoon a wildfire broke out; the squirrel’s shrill alarm alerted all animals and villagers.'
        },
        targetLatinMap: { sat: 'Mid din bir re sengel lagaw ena. Tuṛu do hoho kate...' },
        keyWords: [{ wordHi: 'आग', wordTarget: 'ᱥᱮᱸᱜᱮᱞ (Señgel)' }]
      },
      {
        sceneNumber: 4,
        imageEmoji: '💧 🚒 🌲 💚 🤝',
        hindiText: 'गाँव वालों ने मिलकर आग बुझा ली। नन्हीं गिलहरी को पूरे वन का सच्चा रक्षक माना गया।',
        targetScriptMap: {
          sat: 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱥᱮᱸᱜᱮᱞ ᱠᱚ ᱤᱬᱤᱡ ᱠᱮᱫ-ᱟ᱾ ᱦᱩᱰᱤᱧ ᱛᱩᱲᱩ ᱫᱚ ᱵᱤᱨ ᱨᱤᱱᱤᱡ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱮ ᱵᱮᱱᱟᱣ ᱮᱱᱟ᱾',
          hoc: 'ᱦᱟᱛᱩ ᱦᱚᱲ ᱥᱮᱸᱜᱮᱞ ᱠᱚ ᱤᱬᱤᱡ ᱠᱮᱫ-ᱟ᱾ ᱛᱩᱲᱩ ᱵᱤᱨ ᱮ ᱵᱟᱧᱪᱟᱣ ᱠᱮᱫ-ᱟᱭ᱾',
          hi: 'गाँव वालों ने मिलकर आग बुझा ली। नन्हीं गिलहरी को पूरे वन का सच्चा रक्षक माना गया।',
          en: 'Working together, villagers quelled the blaze, hailing the brave squirrel as the forest guardian.'
        },
        targetLatinMap: { sat: 'Atu hoṛ mesa kate señgel ko iñij ked-a.' },
        keyWords: [{ wordHi: 'रक्षक', wordTarget: 'ᱨᱩᱠᱷᱤᱭᱟᱹ (Rukhiya)' }]
      }
    ]
  }
];
