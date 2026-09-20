import { LanguageTerm } from '../core/language/ILanguageProvider';

export const initialTerminologySeed: LanguageTerm[] = [
  // Mathematics Terminology
  {
    hindi: 'भिन्न',
    targetScript: 'ᱦᱟᱹᱴᱤᱧ',
    targetLatin: 'Hāṭiñ',
    phoneticIpa: '/ha.ʈiɲ/',
    meaningHindi: 'किसी पूरी वस्तु का एक समान भाग',
    subject: 'Mathematics',
    grade: 4,
    category: 'MATHEMATICS',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'अंश',
    targetScript: 'ᱪᱮᱛᱟᱱ ᱦᱟᱹᱴᱤᱧ',
    targetLatin: 'Cetan hāṭiñ',
    phoneticIpa: '/ce.tan ha.ʈiɲ/',
    meaningHindi: 'भिन्न में रेखा के ऊपर की संख्या (Numerator)',
    subject: 'Mathematics',
    grade: 4,
    category: 'MATHEMATICS',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'हर',
    targetScript: 'ᱞᱟᱛᱟᱨ ᱦᱟᱹᱴᱤᱧ',
    targetLatin: 'Latar hāṭiñ',
    phoneticIpa: '/la.tar ha.ʈiɲ/',
    meaningHindi: 'भिन्न में कुल बराबर भागों की संख्या (Denominator)',
    subject: 'Mathematics',
    grade: 4,
    category: 'MATHEMATICS',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'समान भिन्न',
    targetScript: 'ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ',
    targetLatin: 'Soman hāṭiñ',
    phoneticIpa: '/so.man ha.ʈiɲ/',
    meaningHindi: 'वे भिन्न जिनका मान एक समान हो (Equivalent Fractions)',
    subject: 'Mathematics',
    grade: 4,
    category: 'MATHEMATICS',
    verificationStatus: 'LANGUAGE_EXPERT_VERIFIED'
  },
  {
    hindi: 'जोड़',
    targetScript: 'ᱥᱮᱞᱮᱫ',
    targetLatin: 'Seled',
    phoneticIpa: '/se.led/',
    meaningHindi: 'संख्याओं को एकत्र करना',
    subject: 'Mathematics',
    grade: 1,
    category: 'MATHEMATICS',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'घटाव',
    targetScript: 'ᱵᱷᱮᱜᱟᱨ / ᱜᱮᱫ',
    targetLatin: 'Bhegar / Ged',
    phoneticIpa: '/bʰe.gar/',
    meaningHindi: 'संख्याओं में से कम करना या निकालना',
    subject: 'Mathematics',
    grade: 1,
    category: 'MATHEMATICS',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'स्थानीय मान',
    targetScript: 'ᱴᱷᱟᱶ ᱮᱞ',
    targetLatin: 'Ṭhaõ el',
    phoneticIpa: '/ʈʰa.õ el/',
    meaningHindi: 'संख्या में अंक की स्थिति के अनुसार उसका मान (Place Value)',
    subject: 'Mathematics',
    grade: 2,
    category: 'MATHEMATICS',
    verificationStatus: 'LANGUAGE_EXPERT_VERIFIED'
  },
  {
    hindi: 'इकाई',
    targetScript: 'ᱢᱤᱫᱟᱱ',
    targetLatin: 'Midan',
    phoneticIpa: '/mi.dan/',
    meaningHindi: 'संख्या में पहले स्थान का अंक (Units/Ones)',
    subject: 'Mathematics',
    grade: 2,
    category: 'MATHEMATICS',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'दहाई',
    targetScript: 'ᱜᱮᱞᱟᱱ',
    targetLatin: 'Gelan',
    phoneticIpa: '/ge.lan/',
    meaningHindi: 'दस का समूह (Tens)',
    subject: 'Mathematics',
    grade: 2,
    category: 'MATHEMATICS',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'सैकड़ा',
    targetScript: 'ᱥᱟᱭᱟᱱ',
    targetLatin: 'Sayan',
    phoneticIpa: '/sa.jan/',
    meaningHindi: 'सौ का समूह (Hundreds)',
    subject: 'Mathematics',
    grade: 3,
    category: 'MATHEMATICS',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },

  // Science & Nature Terminology
  {
    hindi: 'पौधा',
    targetScript: 'ᱫᱟᱨᱮ',
    targetLatin: 'Dare',
    phoneticIpa: '/da.re/',
    meaningHindi: 'छोटा पादप',
    subject: 'Science',
    grade: 3,
    category: 'SCIENCE',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'पत्ता',
    targetScript: 'ᱥᱟᱠᱟᱢ',
    targetLatin: 'Sakam',
    phoneticIpa: '/sa.kam/',
    meaningHindi: 'पेड़-पौधों का हरा पत्ता',
    subject: 'Science',
    grade: 3,
    category: 'SCIENCE',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'जड़',
    targetScript: 'ᱨᱮᱦᱮᱫ',
    targetLatin: 'Rehed',
    phoneticIpa: '/re.hed/',
    meaningHindi: 'पौधे का भूमिगत आधार',
    subject: 'Science',
    grade: 3,
    category: 'SCIENCE',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'फूल',
    targetScript: 'ᱵᱟᱦᱟ',
    targetLatin: 'Baha',
    phoneticIpa: '/ba.ha/',
    meaningHindi: 'पुष्प / फूल',
    subject: 'Science',
    grade: 3,
    category: 'SCIENCE',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'जल चक्र',
    targetScript: 'ᱫᱟᱜ ᱟᱹᱪᱩᱨ',
    targetLatin: 'Daag acur',
    phoneticIpa: '/daɡ a.cur/',
    meaningHindi: 'जल का वाष्पीकरण, बादल बनना और वर्षा के रूप में लौटना',
    subject: 'Science',
    grade: 5,
    category: 'SCIENCE',
    verificationStatus: 'TEACHER_REVIEWED'
  },
  {
    hindi: 'वाष्पीकरण',
    targetScript: 'ᱵᱟᱯᱷ ᱵᱮᱱᱟᱣ',
    targetLatin: 'Baph benaw',
    phoneticIpa: '/bapʰ be.naw/',
    meaningHindi: 'जल का गर्मी से भाप में बदलना',
    subject: 'Science',
    grade: 5,
    category: 'SCIENCE',
    verificationStatus: 'TEACHER_REVIEWED'
  },

  // Classroom Instructions & Everyday Pedagogy
  {
    hindi: 'नमस्ते',
    targetScript: 'ᱡᱚᱦᱟᱨ',
    targetLatin: 'Johar',
    phoneticIpa: '/dʒo.har/',
    meaningHindi: 'अभिवादन',
    category: 'CLASSROOM',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'बैठ जाओ',
    targetScript: 'ᱫᱩᱲᱩᱵ ᱯᱮ',
    targetLatin: 'Duṛub pe',
    phoneticIpa: '/du.ɽub pe/',
    meaningHindi: 'कक्षा में बैठने का निर्देश',
    category: 'CLASSROOM',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'किताब खोलो',
    targetScript: 'ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ',
    targetLatin: 'Puthi jhij pe',
    phoneticIpa: '/pu.tʰi ɟʰiɟ pe/',
    meaningHindi: 'किताब खोलने का निर्देश',
    category: 'CLASSROOM',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'शाबाश',
    targetScript: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ',
    targetLatin: 'Aḍi napay',
    phoneticIpa: '/a.ɽi na.paj/',
    meaningHindi: 'बहुत अच्छा / शाबाशी',
    category: 'CLASSROOM',
    verificationStatus: 'OFFICIALLY_APPROVED'
  },
  {
    hindi: 'कक्षा में शांत रहो',
    targetScript: 'ᱠᱞᱟᱥ ᱨᱮ ᱛᱷᱤᱨ ᱛᱟᱦᱮᱸᱱ ᱯᱮ',
    targetLatin: 'Klas re thir tahen pe',
    phoneticIpa: '/klas re tʰir ta.hen pe/',
    meaningHindi: 'कक्षा में शांति का निर्देश',
    category: 'CLASSROOM',
    verificationStatus: 'TEACHER_REVIEWED'
  }
];
