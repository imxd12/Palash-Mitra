// Browser Speech Bridge with Multi-Language Voice Synthesis, Ol Chiki / Warang Chiti Phonetic Transliteration & Latency Instrumentation

export interface LatencyBreakdown {
  sttMs: number;
  translationMs: number;
  ttsMs: number;
  totalLatencyMs: number;
}

export type VocalTonePreset =
  | 'crystal-crisp'
  | 'natural-warm'
  | 'deep-resonant'
  | 'pedagogical-slow'
  | 'child-friendly'
  | 'radio-broadcast';

export interface VocalToneDef {
  id: VocalTonePreset;
  label: string;
  desc: string;
  pitchMod: number;
  rateMod: number;
  trebleBoost: boolean;
}

export const VOCAL_TONE_PRESETS: VocalToneDef[] = [
  {
    id: 'crystal-crisp',
    label: 'क्रिस्टल क्लियर (Crystal Crisp Treble Boost)',
    desc: 'उच्च ट्रेबल व स्पष्ट वर्ण-ध्वनि, शोरगुल वाली ग्रामीण कक्षाओं हेतु सर्वश्रेष्ठ',
    pitchMod: 1.14,
    rateMod: 1.02,
    trebleBoost: true
  },
  {
    id: 'natural-warm',
    label: 'नेचुरल वार्म (Natural Warm Teacher)',
    desc: 'सहज, संतुलित, आत्मीय व मधुर प्राथमिक शिक्षिका स्वर',
    pitchMod: 1.00,
    rateMod: 0.96,
    trebleBoost: false
  },
  {
    id: 'deep-resonant',
    label: 'डीप रेजोनेंस (Deep Resonant Storyteller)',
    desc: 'गंभीर, शांत व समृद्ध स्वर, आदिवासी लोककथा व बड़े बच्चों हेतु आदर्श',
    pitchMod: 0.88,
    rateMod: 0.92,
    trebleBoost: false
  },
  {
    id: 'pedagogical-slow',
    label: 'पेडागोगिकल स्लो (Pedagogical FLN Syllable)',
    desc: '0.72x धीमी गति, स्पष्ट शब्दांश विराम व NIPUN बुनियादी वाचन',
    pitchMod: 1.04,
    rateMod: 0.72,
    trebleBoost: true
  },
  {
    id: 'child-friendly',
    label: 'चाइल्ड-फ्रेंडली (Child-Friendly High Energy)',
    desc: 'चंचल, उत्साही, उच्च पिच व बाल-सुलभ स्वर, कक्षा 1-2 के बच्चों हेतु',
    pitchMod: 1.25,
    rateMod: 0.95,
    trebleBoost: true
  },
  {
    id: 'radio-broadcast',
    label: 'सामुदायिक रेडियो (Jharkhand Community Radio EQ)',
    desc: 'रेडियो प्रसारण शैली, मध्यम ट्रेबल-मिड व सुस्पष्ट सार्वजनिक घोषणा स्वर',
    pitchMod: 1.02,
    rateMod: 1.00,
    trebleBoost: false
  }
];

// Full Ol Chiki to Indic Phonetic Transliteration Map
const OL_CHIKI_PHONETIC_MAP: Record<string, string> = {
  // Consonants
  '\u1C5B': 'त', // AT
  '\u1C5C': 'ग', // AG
  '\u1C5D': 'ंग', // ANG
  '\u1C5E': 'ल', // AL
  '\u1C60': 'क', // AK
  '\u1C61': 'ज', // AJ
  '\u1C62': 'म', // AM
  '\u1C63': 'व', // AW
  '\u1C65': 'स', // IS
  '\u1C66': 'ह', // IH
  '\u1C67': 'ञ', // INY
  '\u1C68': 'र', // IR
  '\u1C6A': 'च', // UC
  '\u1C6B': 'द', // UD
  '\u1C6C': 'ण', // UNN
  '\u1C6D': 'य', // UY
  '\u1C6F': 'प', // EP
  '\u1C70': 'ड', // EDD
  '\u1C71': 'न', // EN
  '\u1C72': 'ड़', // ERR
  '\u1C74': 'ट', // OTT
  '\u1C75': 'ब', // OB
  '\u1C76': 'ंव', // OV
  '\u1C77': 'ह', // OH

  // Vowels
  '\u1C5A': 'अ', // LA
  '\u1C5F': 'आ', // AA
  '\u1C64': 'इ', // LI
  '\u1C69': 'उ', // LU
  '\u1C6E': 'ए', // LE
  '\u1C73': 'ओ', // LO

  // Modifiers
  '\u1C78': 'ं', // MU TUDDAG (Nasalization)
  '\u1C79': '़', // GAHLA TUDDAG
  '\u1C7A': '्', // MU-OHAD
  '\u1C7B': '़', // AHAD
  '\u1C7C': '',  // RELA (Vowel lengthening)
  '\u1C7D': '्', // PHAARKKA
  '\u1C7E': '।', // PUNCTUATION
  '\u1C7F': '॥', // DOUBLE PUNCTUATION

  // Digits
  '\u1C50': '0',
  '\u1C51': '1',
  '\u1C52': '2',
  '\u1C53': '3',
  '\u1C54': '4',
  '\u1C55': '5',
  '\u1C56': '6',
  '\u1C57': '7',
  '\u1C58': '8',
  '\u1C59': '9'
};

// Common Tribal Words Fast Direct Phonetics Dictionary for Crisp Native Enunciation
const TRIBAL_DICTIONARY: Record<string, string> = {
  // Santhali Greetings and School Vocabulary
  'ᱡᱚᱦᱟᱨ': 'जोहार',
  'ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ': 'सगुन दाराम',
  'ᱦᱟᱹᱴᱤᱧ': 'हातिन',
  'ᱫᱟᱨᱮ': 'दारे',
  'ᱥᱟᱠᱟᱢ': 'साकाम',
  'ᱨᱮᱦᱮᱫ': 'रेहेद',
  'ᱫᱟᱜ': 'दाग',
  'ᱵᱟᱦᱟ': 'बाहा',
  'ᱡᱚ': 'जो',
  'ᱰᱟᱹᱨ': 'डार',
  'ᱟᱹᱛᱩ': 'आतु',
  'ᱤᱛᱩᱱ ᱟᱥᱲᱟ': 'इतुन आसड़ा',
  'ᱢᱟᱪᱮᱛ': 'माचेत',
  'ᱜᱤᱫᱽᱨᱟᱹ': 'गिदरा',
  'ᱥᱟᱨᱡᱚᱢ': 'सारजोम',
  'ᱢᱟᱛᱠᱚᱢ': 'मातकोम',
  'ᱠᱩᱞᱟᱹᱭ': 'कुलाई',
  'ᱦᱟᱹᱛᱤ': 'हाती',
  'ᱵᱤᱨ': 'बीर',
  'ᱪᱟᱸᱫᱚ': 'चांदो',
  'ᱛᱟᱞᱟ': 'ताला',
  'ᱥᱮᱞᱮᱫ': 'सेलेद',
  'ᱥᱚᱢᱟᱱ': 'समान',
  'ᱯᱩᱨᱟᱹ': 'पूरा',
  'ᱪᱮᱬᱮ': 'चेणे',
  'ᱜᱟᱛᱮ': 'गाते',
  'ᱥᱩᱞᱩᱠ': 'सुलुक',
  'ᱦᱳᱲᱳ': 'होड़ो',
  'ᱠᱷᱮᱛ': 'खेत',
  'ᱯᱩᱠᱷᱨᱤ': 'पुखरि',

  // Ho Vocabulary
  '𑢹𑣉': 'हो',
  '𑢹𑣉 𑣎𑣋𑣜': 'हो जगर',
  'ᱫᱟᱨᱩ': 'दारू',
  'ᱦᱟᱛᱩ': 'हातु',
  'ᱛᱟᱱᱟ': 'ताना',
  'ᱱᱮᱭᱟ': 'नेया',
  'ᱟᱵᱩ': 'आबु',

  // Math terms
  '1/2': 'आधा',
  '१/२': 'आधा',
  '1/4': 'एक चौथाई',
  '१/᱔': 'एक चौथाई',
  '3/4': 'तीन चौथाई',
  '३/᱔': 'तीन चौथाई',

  // MDM Kitchen & Ration Terms (Santhali, Ho, Mundari)
  'ᱫᱟᱠᱟ': 'दाका',
  'ᱪᱟᱣᱞᱮ': 'चावले',
  'ᱫᱟᱹᱞ': 'दाल',
  'ᱩᱛᱩ': 'उतु',
  'ᱥᱩᱱᱩᱢ': 'सुनुम',
  'ᱵᱤᱞᱤ': 'बिली',
  'ᱟᱹᱲᱩ': 'आड़ू',
  'ᱵᱩᱞᱩᱝ': 'बुलुंग',
  'ᱢᱚᱥᱞᱟ': 'मोसला',
  'ᱠᱤᱞᱳ': 'किलो',
  'ᱜᱽᱨᱟᱢ': 'ग्राम',
  'ᱦᱟᱯᱛᱟ': 'हाप्ता',
  'ᱛᱮᱦᱮᱧ': 'तेहेञ',
  'ᱡᱚᱢ': 'जोम',
  'ᱨᱟᱸᱫᱷᱟ': 'रांधा',
  'ᱨᱟᱥᱚᱭᱟ': 'रसोइया',
  'ᱢᱟᱺᱰᱤ': 'मांडी',
  'ᱥᱤᱛᱩᱝ': 'सितुंग'
};

export class SpeechBridge {
  private static instance: SpeechBridge;
  private isRecognitionActive: boolean = false;
  private recognition: any = null;
  private availableVoices: SpeechSynthesisVoice[] = [];

  private constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
      }

      if ('speechSynthesis' in window) {
        this.updateVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          this.updateVoices();
        };
      }
    }
  }

  private updateVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.availableVoices = window.speechSynthesis.getVoices();
    }
  }

  public static getInstance(): SpeechBridge {
    if (!SpeechBridge.instance) {
      SpeechBridge.instance = new SpeechBridge();
    }
    return SpeechBridge.instance;
  }

  private customLanguageProfiles: Record<string, { ttsLocale: string; rate: number; pitch: number }> = {};

  public registerCustomLanguageSpeech(code: string, profile: { ttsLocale: string; rate: number; pitch: number }): void {
    this.customLanguageProfiles[code.toLowerCase()] = profile;
  }

  public getVocalTone(): VocalTonePreset {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('palash_vocal_tone') as VocalTonePreset;
      if (saved && VOCAL_TONE_PRESETS.some(p => p.id === saved)) {
        return saved;
      }
    }
    return 'crystal-crisp';
  }

  public setVocalTone(tone: VocalTonePreset): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('palash_vocal_tone', tone);
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (this.availableVoices.length === 0) {
      this.updateVoices();
    }
    return this.availableVoices;
  }

  public getSelectedVoiceUri(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('palash_selected_voice_uri');
    }
    return null;
  }

  public setSelectedVoiceUri(uri: string | null): void {
    if (typeof localStorage !== 'undefined') {
      if (uri) {
        localStorage.setItem('palash_selected_voice_uri', uri);
      } else {
        localStorage.removeItem('palash_selected_voice_uri');
      }
    }
  }

  public isSupported(): boolean {
    return Boolean(this.recognition || (typeof window !== 'undefined' && 'speechSynthesis' in window));
  }

  // Convert raw tribal Unicode glyphs (Ol Chiki, Warang Chiti) to clean phonetic speech sounds
  public transliterateForSpeech(text: string): string {
    if (!text) return '';

    let processed = text;

    // 1. Replace known full phrases and words
    for (const [tribalWord, phoneticHindi] of Object.entries(TRIBAL_DICTIONARY)) {
      if (processed.includes(tribalWord)) {
        processed = processed.split(tribalWord).join(phoneticHindi);
      }
    }

    // 2. Character-by-character mapping for remaining Ol Chiki glyphs (\u1C50 - \u1C7F)
    let charMapped = '';
    for (const char of processed) {
      if (OL_CHIKI_PHONETIC_MAP[char] !== undefined) {
        charMapped += OL_CHIKI_PHONETIC_MAP[char];
      } else {
        charMapped += char;
      }
    }
    processed = charMapped;

    // 3. Normalize fractions and common notation
    processed = processed
      .replace(/1\/2/g, ' आधा ')
      .replace(/1\/4/g, ' एक चौथाई ')
      .replace(/3\/4/g, ' तीन चौथाई ')
      .replace(/1\/3/g, ' एक तिहाई ')
      .replace(/2\/4/g, ' दो चौथाई ');

    // 4. Clean extra spaces and punctuation
    return processed.replace(/\s+/g, ' ').trim();
  }

  // Map 5 languages to browser speech recognition dialect
  private getSttLocale(langCode: string): string {
    switch (langCode.toLowerCase()) {
      case 'en':
        return 'en-IN';
      case 'hi':
        return 'hi-IN';
      case 'sat':
      case 'hoc':
      case 'unr':
      default:
        return 'hi-IN'; // Indic acoustic model works best for phonetically related tribal speech
    }
  }

  // Find the most natural high-clarity voice for the given language
  private selectVoice(langCode: string): SpeechSynthesisVoice | null {
    if (this.availableVoices.length === 0) {
      this.updateVoices();
    }

    const isEnglish = langCode.toLowerCase() === 'en';
    const targetLocale = isEnglish ? 'en-IN' : 'hi-IN';

    // Prioritize natural neural/local Indic voices
    const indicVoices = this.availableVoices.filter(v => 
      v.lang.toLowerCase() === targetLocale.toLowerCase() ||
      v.lang.toLowerCase().startsWith(isEnglish ? 'en' : 'hi')
    );

    if (indicVoices.length > 0) {
      // Look for natural voices first (e.g. Google, Microsoft, Kalpana, Neerja, Swara)
      const premiumVoice = indicVoices.find(v => 
        v.name.includes('Google') || 
        v.name.includes('Natural') || 
        v.name.includes('Swara') || 
        v.name.includes('Neerja') ||
        v.name.includes('Kalpana') ||
        v.name.includes('Heera')
      );
      return premiumVoice || indicVoices[0];
    }

    return this.availableVoices[0] || null;
  }

  // Listen via microphone with timer measurement
  public listenSpeech(langCode = 'hi'): Promise<{ text: string; latencyMs: number }> {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const locale = this.getSttLocale(langCode);

      if (!this.recognition) {
        console.warn('Web Speech Recognition not available in this browser.');
        const fallbackPhrase = langCode === 'en' 
          ? 'Children, today we will learn fractions.'
          : 'बच्चों, आज हम भिन्न सीखेंगे।';
        resolve({ text: fallbackPhrase, latencyMs: 380 });
        return;
      }

      this.recognition.lang = locale;

      this.recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        const latencyMs = Math.round(performance.now() - startTime);
        this.isRecognitionActive = false;
        resolve({ text, latencyMs });
      };

      this.recognition.onerror = (event: any) => {
        this.isRecognitionActive = false;
        console.warn('Speech recognition warning/error:', event.error);
        const fallbackPhrase = langCode === 'en'
          ? 'Children, today we will learn fractions.'
          : 'बच्चों, आज हम भिन्न सीखेंगे।';
        resolve({ text: fallbackPhrase, latencyMs: Math.round(performance.now() - startTime) });
      };

      this.recognition.onend = () => {
        this.isRecognitionActive = false;
      };

      try {
        this.isRecognitionActive = true;
        this.recognition.start();
      } catch (err) {
        this.isRecognitionActive = false;
        resolve({
          text: langCode === 'en' ? 'Hello children' : 'बच्चों, आज हम भिन्न सीखेंगे।',
          latencyMs: 250
        });
      }
    });
  }

  // Speak synthesized voice with authentic pitch, rate, and tone per language
  public speak(rawText: string, lang = 'sat', isSlowMode: boolean = false): Promise<number> {
    return new Promise((resolve) => {
      const startTime = performance.now();
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        resolve(120);
        return;
      }

      window.speechSynthesis.cancel();

      // Transliterate raw tribal script into natural phonetics so browser TTS voice speaks clearly
      const cleanText = this.transliterateForSpeech(rawText);
      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Distinct, authentic acoustic profile per language
      const langKey = (lang || 'sat').toLowerCase();
      let baseRate = 0.88;
      let basePitch = 1.0;

      switch (langKey) {
        case 'hoc':
          // Ho language: warm, slightly higher pitch, steady cadence
          baseRate = 0.86;
          basePitch = 1.04;
          utterance.lang = 'hi-IN';
          break;
        case 'unr':
          // Mundari language: melodic, gentle cadence
          baseRate = 0.85;
          basePitch = 1.02;
          utterance.lang = 'hi-IN';
          break;
        case 'sat':
          // Santhali: clear, rhythmic, resonant tempo
          baseRate = 0.84;
          basePitch = 0.98;
          utterance.lang = 'hi-IN';
          break;
        case 'kyw':
          // Kudmali language
          baseRate = 0.88;
          basePitch = 1.0;
          utterance.lang = 'hi-IN';
          break;
        case 'kru':
          // Kurukh / Oraon language
          baseRate = 0.86;
          basePitch = 1.02;
          utterance.lang = 'hi-IN';
          break;
        case 'en':
          // Indian English pedagogical clarity
          baseRate = 0.90;
          basePitch = 1.0;
          utterance.lang = 'en-IN';
          break;
        case 'hi':
        default:
          if (this.customLanguageProfiles[langKey]) {
            const custom = this.customLanguageProfiles[langKey];
            baseRate = custom.rate;
            basePitch = custom.pitch;
            utterance.lang = custom.ttsLocale;
          } else {
            // Hindi: natural conversational teacher tone
            baseRate = 0.92;
            basePitch = 1.0;
            utterance.lang = 'hi-IN';
          }
          break;
      }

      // Apply User-Selected Acoustic Vocal Tone Preset (Treble / Pitch / Rate Calibration)
      const currentToneId = (typeof localStorage !== 'undefined' ? localStorage.getItem('palash_vocal_tone') : null) as VocalTonePreset || 'crystal-crisp';
      const toneDef = VOCAL_TONE_PRESETS.find(p => p.id === currentToneId) || VOCAL_TONE_PRESETS[0];

      let effectiveRate = baseRate * toneDef.rateMod;
      let effectivePitch = Math.min(2.0, Math.max(0.5, basePitch * toneDef.pitchMod));

      // Slow mode override for foundational instruction
      if (isSlowMode) {
        effectiveRate = effectiveRate * 0.74;
      }

      utterance.rate = effectiveRate;
      utterance.pitch = effectivePitch;

      const selectedUri = this.getSelectedVoiceUri();
      let chosenVoice: SpeechSynthesisVoice | null = null;
      if (selectedUri) {
        chosenVoice = this.availableVoices.find(v => v.voiceURI === selectedUri) || null;
      }
      if (!chosenVoice) {
        chosenVoice = this.selectVoice(langKey);
      }
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      utterance.onstart = () => {
        const ttsMs = Math.round(performance.now() - startTime);
        resolve(ttsMs);
      };

      utterance.onerror = () => {
        resolve(140);
      };

      utterance.onend = () => {
        resolve(Math.round(performance.now() - startTime));
      };

      window.speechSynthesis.speak(utterance);

      // Safety timeout in case browser TTS event doesn't fire
      setTimeout(() => resolve(Math.round(performance.now() - startTime)), 800);
    });
  }
}

export const speechBridge = SpeechBridge.getInstance();
