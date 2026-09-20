import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { VernacularText } from '../../components/OlChikiText';
import { getAvailableSubjectsForGrade } from '../../core/curriculum/curriculumData';
import { Printer, Sparkles, FileText, CheckCircle2, Award } from 'lucide-react';

interface ExamQuestion {
  number: number;
  type: 'MCQ' | 'FILL_BLANK' | 'SHORT_ANSWER';
  marks: number;
  questionHi: string;
  questionTarget: string;
  options?: Array<{ hi: string; target: string }>;
  answerKeyHi: string;
  learningOutcome: string;
}

export const ExamGeneratorView: React.FC = () => {
  const {
    selectedGrade,
    setSelectedGrade,
    selectedSubject,
    setSelectedSubject,
    availableSubjects,
    targetLanguage,
    targetLanguageName,
    targetScript
  } = useApp();

  const [examType, setExamType] = useState<'WEEKLY' | 'UNIT' | 'TERM'>('UNIT');
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);

  const isPlants = selectedSubject.toLowerCase().includes('science') || selectedSubject.toLowerCase().includes('evs');
  const isLiteracy = selectedSubject.toLowerCase().includes('literacy') || selectedSubject.toLowerCase().includes('भाषा');

  const getQuestionsForLanguage = (): ExamQuestion[] => {
    if (isPlants) {
      if (targetLanguage === 'hoc') {
        return [
          {
            number: 1,
            type: 'MCQ',
            marks: 1,
            questionHi: 'पौधे का कौन सा अंग जमीन के अंदर रहकर पानी सोखता है?',
            questionTarget: 'ᱫᱟᱨᱩ ᱨᱮᱭᱟᱜ ᱚᱠᱟ ᱦᱟᱹᱴᱤᱧ ᱦᱟᱥᱟ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱛᱟᱦᱮᱸ ᱠᱟᱛᱮ ᱫᱟᱜ ᱮ ᱦᱟᱛᱟᱣᱟ?',
            options: [
              { hi: 'पत्ती (Leaf)', target: 'ᱥᱟᱠᱟᱢ' },
              { hi: 'जड़ (Root)', target: 'ᱨᱮᱦᱮᱫ' },
              { hi: 'फूल (Flower)', target: 'ᱵᱟᱦᱟ' },
              { hi: 'फल (Fruit)', target: 'ᱡᱚ' }
            ],
            answerKeyHi: 'ख) जड़ (Ho: Rehed / ᱨᱮᱦᱮᱫ)',
            learningOutcome: 'LO-E304: पौधे के अंगों और उनके कार्यों की पहचान'
          },
          {
            number: 2,
            type: 'FILL_BLANK',
            marks: 2,
            questionHi: 'पत्तियां सूर्य के प्रकाश और ________ की सहायता से पौधे के लिए भोजन बनाती हैं।',
            questionTarget: 'ᱥᱟᱠᱟᱢ ᱫᱚ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱟᱨ ________ ᱜᱚᱲᱚ ᱛᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱟᱭ-ᱟ᱾',
            answerKeyHi: 'जल / पानी (Ho: Daag / ᱫᱟᱜ)',
            learningOutcome: 'LO-E305: प्रकाश संश्लेषण की बुनियादी अवधारणा'
          },
          {
            number: 3,
            type: 'SHORT_ANSWER',
            marks: 3,
            questionHi: 'गाँव में साल (सरजोम) और महुआ (मातकोम) के पेड़ हमारे दैनिक जीवन में किस प्रकार उपयोगी हैं? दो कारण लिखिए।',
            questionTarget: 'ᱦᱟᱛᱩ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱟᱨ ᱢᱟᱛᱠᱚᱢ ᱫᱟᱨᱩ ᱟᱵᱩᱣᱟᱜ ᱫᱤᱱᱟᱹᱢ ᱡᱤᱭᱚᱱ ᱨᱮ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱞᱟᱜᱟᱜ-ᱟ? ᱵᱟᱨᱭᱟ ᱚᱞ ᱢᱮ᱾',
            answerKeyHi: '1. शीतल छाया एवं शुद्ध वायु प्रदान करना। 2. महुआ व साल लकड़ी, दातुन व फल प्रदान करते हैं।',
            learningOutcome: 'LO-E308: स्थानीय वनस्पतियों का सांस्कृतिक व पर्यावरणीय महत्व'
          }
        ];
      } else if (targetLanguage === 'unr') {
        return [
          {
            number: 1,
            type: 'MCQ',
            marks: 1,
            questionHi: 'पौधे का कौन सा अंग जमीन के अंदर रहकर पानी सोखता है?',
            questionTarget: 'ᱫᱟᱨᱩ ᱨᱮᱭᱟᱜ ᱚᱠᱟ ᱦᱟᱹᱴᱤᱧ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱮ ᱚᱨ-ᱟ?',
            options: [
              { hi: 'पत्ती', target: 'ᱥᱟᱠᱟᱢ' },
              { hi: 'जड़', target: 'ᱨᱮᱦᱮᱫ' },
              { hi: 'फूल', target: 'ᱵᱟᱦᱟ' },
              { hi: 'फल', target: 'ᱡᱚ' }
            ],
            answerKeyHi: 'ख) जड़ (Mundari: Rehed / ᱨᱮᱦᱮᱫ)',
            learningOutcome: 'LO-E304: पौधे के अंगों की पहचान'
          },
          {
            number: 2,
            type: 'FILL_BLANK',
            marks: 2,
            questionHi: 'पत्तियां सूर्य के प्रकाश और ________ की सहायता से पौधे के लिए भोजन बनाती हैं।',
            questionTarget: 'ᱥᱟᱠᱟᱢ ᱫᱚ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱟᱨ ________ ᱛᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾',
            answerKeyHi: 'जल / पानी (Mundari: Daag / ᱫᱟᱜ)',
            learningOutcome: 'LO-E305: प्रकाश संश्लेषण की समझ'
          },
          {
            number: 3,
            type: 'SHORT_ANSWER',
            marks: 3,
            questionHi: 'गाँव में महुआ और साल के वृक्ष किस प्रकार उपयोगी हैं? दो कारण लिखिए।',
            questionTarget: 'ᱦᱟᱛᱩ ᱨᱮ ᱢᱟᱛᱠᱚᱢ ᱟᱨ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱩ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱞᱟᱜᱟᱜ-ᱟ? ᱵᱟᱨᱭᱟ ᱚᱞ ᱢᱮ᱾',
            answerKeyHi: '1. शुद्ध प्राणवायु व छाया। 2. महुआ फूल व फल पोषण देते हैं।',
            learningOutcome: 'LO-E308: वनस्पतियों का स्थानीय महत्व'
          }
        ];
      } else if (targetLanguage === 'en') {
        return [
          {
            number: 1,
            type: 'MCQ',
            marks: 1,
            questionHi: 'पौधे का कौन सा अंग जमीन के अंदर रहकर पानी सोखता है?',
            questionTarget: 'Which botanical organ of a plant stays subterranean to absorb moisture?',
            options: [
              { hi: 'पत्ती (Leaf)', target: 'Leaf' },
              { hi: 'जड़ (Root)', target: 'Root' },
              { hi: 'फूल (Flower)', target: 'Flower' },
              { hi: 'फल (Fruit)', target: 'Fruit' }
            ],
            answerKeyHi: 'Option B) Root (जड़)',
            learningOutcome: 'LO-E304: Plant organs and functions'
          },
          {
            number: 2,
            type: 'FILL_BLANK',
            marks: 2,
            questionHi: 'पत्तियां सूर्य के प्रकाश और ________ की सहायता से भोजन बनाती हैं।',
            questionTarget: 'Green leaves synthesize food with sunlight and ________ through photosynthesis.',
            answerKeyHi: 'Water / H2O (जल)',
            learningOutcome: 'LO-E305: Basic Photosynthesis'
          },
          {
            number: 3,
            type: 'SHORT_ANSWER',
            marks: 3,
            questionHi: 'साल और महुआ के पेड़ हमारे पर्यावरण के लिए क्यों उपयोगी हैं? दो कारण लिखिए।',
            questionTarget: 'Why are Sal and Mahua trees ecologically indispensable in Jharkhand? State 2 reasons.',
            answerKeyHi: '1. Deep root anchoring prevents soil erosion. 2. Provides forest canopy and food resources.',
            learningOutcome: 'LO-E308: Indigenous Flora & Environmental Conservation'
          }
        ];
      } else if (targetLanguage === 'hi') {
        return [
          {
            number: 1,
            type: 'MCQ',
            marks: 1,
            questionHi: 'पौधे का कौन सा अंग जमीन के अंदर रहकर पानी सोखता है?',
            questionTarget: 'पौधे का कौन सा अंग जमीन के अंदर रहकर जल व खनिज लवण सोखता है?',
            options: [
              { hi: 'पत्ती (Leaf)', target: 'पत्ती (Leaf)' },
              { hi: 'जड़ (Root)', target: 'जड़ (Root)' },
              { hi: 'फूल (Flower)', target: 'फूल (Flower)' },
              { hi: 'फल (Fruit)', target: 'फल (Fruit)' }
            ],
            answerKeyHi: 'ख) जड़ (Root)',
            learningOutcome: 'LO-E304: पौधे के अंगों और उनके कार्यों की पहचान'
          },
          {
            number: 2,
            type: 'FILL_BLANK',
            marks: 2,
            questionHi: 'पत्तियां सूर्य के प्रकाश और ________ की सहायता से पौधे के लिए भोजन बनाती हैं।',
            questionTarget: 'पत्तियां सूर्य के प्रकाश और ________ की सहायता से पौधे के लिए भोजन बनाती हैं।',
            answerKeyHi: 'जल / पानी',
            learningOutcome: 'LO-E305: प्रकाश संश्लेषण की बुनियादी अवधारणा'
          },
          {
            number: 3,
            type: 'SHORT_ANSWER',
            marks: 3,
            questionHi: 'गाँव में साल (सरजोम) और महुआ के पेड़ हमारे दैनिक जीवन में किस प्रकार उपयोगी हैं? दो कारण लिखिए।',
            questionTarget: 'गाँव में साल (सरजोम) और महुआ के पेड़ हमारे दैनिक जीवन में किस प्रकार उपयोगी हैं? दो कारण लिखिए।',
            answerKeyHi: '1. शीतल छाया एवं शुद्ध वायु प्रदान करना। 2. महुआ के फल व फूल खाद्य सामग्री व औषध में उपयोगी।',
            learningOutcome: 'LO-E308: स्थानीय वनस्पतियों का सांस्कृतिक व पर्यावरणीय महत्व'
          }
        ];
      } else {
        // Santhali (sat)
        return [
          {
            number: 1,
            type: 'MCQ',
            marks: 1,
            questionHi: 'पौधे का कौन सा अंग जमीन के अंदर रहकर पानी सोखता है?',
            questionTarget: 'ᱫᱟᱨᱮ ᱨᱮᱭᱟᱜ ᱚᱠᱟ ᱦᱟᱹᱴᱤᱧ ᱦᱟᱥᱟ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱛᱟᱦᱮᱸ ᱠᱟᱛᱮ ᱫᱟᱜ ᱮ ᱚᱨ-ᱟ?',
            options: [
              { hi: 'पत्ती (Leaf)', target: 'ᱥᱟᱠᱟᱢ' },
              { hi: 'जड़ (Root)', target: 'ᱨᱮᱦᱮᱫ' },
              { hi: 'फूल (Flower)', target: 'ᱵᱟᱦᱟ' },
              { hi: 'फल (Fruit)', target: 'ᱡᱚ' }
            ],
            answerKeyHi: 'ख) जड़ (ᱨᱮᱦᱮᱫ)',
            learningOutcome: 'LO-E304: पौधे के अंगों और उनके कार्यों की पहचान'
          },
          {
            number: 2,
            type: 'FILL_BLANK',
            marks: 2,
            questionHi: 'पत्तियां सूर्य के प्रकाश और ________ की सहायता से पौधे के लिए भोजन बनाती हैं।',
            questionTarget: 'ᱥᱟᱠᱟᱢ ᱫᱚ ᱥᱤᱧ ᱪᱟᱸᱫᱚ ᱟᱨ ________ ᱜᱚᱲᱚ ᱛᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾',
            answerKeyHi: 'जल / पानी (ᱫᱟᱜ)',
            learningOutcome: 'LO-E305: प्रकाश संश्लेषण की बुनियादी अवधारणा'
          },
          {
            number: 3,
            type: 'SHORT_ANSWER',
            marks: 3,
            questionHi: 'गाँव में साल (सरजोम) और महुआ के पेड़ हमारे दैनिक जीवन में किस प्रकार उपयोगी हैं? दो कारण लिखिए।',
            questionTarget: 'ᱟᱹᱛᱩ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱟᱨ ᱢᱟᱛᱠᱚᱢ ᱫᱟᱨᱮ ᱟᱵᱚᱣᱟᱜ ᱫᱤᱱᱟᱹᱢ ᱡᱤᱭᱚᱱ ᱨᱮ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱞᱟᱜᱟᱜ-ᱟ? ᱵᱟᱨᱭᱟ ᱚᱡᱮ ᱚᱞ ᱢᱮ᱾',
            answerKeyHi: '1. छाया एवं शुद्ध वायु प्रदान करना। 2. महुआ के फल व फूल खाद्य सामग्री व औषध में उपयोगी।',
            learningOutcome: 'LO-E308: स्थानीय वनस्पतियों का सांस्कृतिक व पर्यावरणीय महत्व'
          }
        ];
      }
    }

    // Default: Mathematics (Fractions / Numbers)
    if (targetLanguage === 'hoc') {
      return [
        {
          number: 1,
          type: 'MCQ',
          marks: 1,
          questionHi: 'यदि एक गोल रोटी को दो बराबर टुकड़ों में काटा जाए, तो प्रत्येक टुकड़े को क्या कहेंगे?',
          questionTarget: 'ᱢᱤ ᱨᱩᱴᱤ ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱜᱮᱫ ᱞᱮᱠᱷᱟᱱ ᱢᱤ ᱦᱟᱹᱴᱤᱧ ᱫᱚ ᱪᱮᱫ ᱠᱚ ᱢᱮᱱᱟ?',
          options: [
            { hi: 'एक चौथाई (1/4)', target: 'ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ (1/4)' },
            { hi: 'आधा (1/2)', target: 'ᱛᱟᱞᱟ / आधा (1/2)' },
            { hi: 'पूरा (1)', target: 'ᱯᱩᱨᱟᱹ (1)' },
            { hi: 'तीन चौथाई (3/4)', target: 'ᱯᱮ ᱦᱟᱹᱴᱤᱧ (3/4)' }
          ],
          answerKeyHi: 'ख) आधा (1/2) / Ho: Tala / ᱛᱟᱞᱟ',
          learningOutcome: 'LO-M402: भिन्न की अवधारणा एवं दैनिक जीवन में विभाजन'
        },
        {
          number: 2,
          type: 'FILL_BLANK',
          marks: 2,
          questionHi: 'भिन्न 3/5 में ऊपर वाली संख्या 3 को ________ और नीचे वाली संख्या 5 को ________ कहते हैं।',
          questionTarget: 'ᱦᱟᱹᱴᱤᱧ 3/5 ᱨᱮ ᱪᱮᱛᱟᱱ ᱮᱞ 3 ᱫᱚ ________ ᱟᱨ ᱞᱟᱛᱟᱨ ᱮᱞ 5 ᱫᱚ ________ ᱠᱚ ᱢᱮᱱᱟ᱾',
          answerKeyHi: 'अंश (Numerator) और हर (Denominator)',
          learningOutcome: 'LO-M403: अंश और हर की समझ'
        },
        {
          number: 3,
          type: 'SHORT_ANSWER',
          marks: 3,
          questionHi: 'अपने गाँव से कोई ऐसा उदाहरण लिखिए जहाँ 4 बच्चों में कोई चीज़ बराबर बांटी जाती है। भिन्न के रूप में व्यक्त करें।',
          questionTarget: 'ᱟᱢᱟᱜ ᱦᱟᱛᱩ ᱠᱷᱚᱱ ᱢᱤ ᱫᱟᱹᱭᱠᱟᱹ ᱚᱞ ᱢᱮ ᱡᱟᱦᱟᱸᱨᱮ ᱯᱩᱱ ᱦᱚᱲ ᱛᱟᱞᱟ ᱨᱮ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱦᱩᱭᱩᱜ-ᱟ (Ho):',
          answerKeyHi: '1 अमरूद को 4 बच्चों में बराबर बांटना = प्रत्येक को 1/4 हिस्सा।',
          learningOutcome: 'LO-M405: स्थानीय परिवेश से जोड़कर भिन्न की व्याख्या'
        }
      ];
    } else if (targetLanguage === 'unr') {
      return [
        {
          number: 1,
          type: 'MCQ',
          marks: 1,
          questionHi: 'यदि एक गोल रोटी को दो बराबर टुकड़ों में काटा जाए, तो प्रत्येक टुकड़े को क्या कहेंगे?',
          questionTarget: 'ᱢᱤᱫᱴᱟᱝ ᱨᱩᱴᱤ ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱠᱮᱪᱟᱜ ᱞᱮᱠᱷᱟᱱ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ?',
          options: [
            { hi: 'एक चौथाई (1/4)', target: '1/4 (एक चौथाई)' },
            { hi: 'आधा (1/2)', target: 'ᱛᱟᱞᱟ / आधा (1/2)' },
            { hi: 'पूरा (1)', target: 'ᱯᱩᱨᱟᱹ (1)' },
            { hi: 'तीन चौथाई (3/4)', target: '3/4' }
          ],
          answerKeyHi: 'ख) आधा (1/2) / Mundari: Tala / ᱛᱟᱞᱟ',
          learningOutcome: 'LO-M402: भिन्न की अवधारणा'
        },
        {
          number: 2,
          type: 'FILL_BLANK',
          marks: 2,
          questionHi: 'भिन्न 3/5 में ऊपर वाली संख्या 3 को ________ और नीचे वाली 5 को ________ कहते हैं।',
          questionTarget: 'ᱦᱟᱹᱴᱤᱧ 3/5 ᱨᱮ ᱪᱮᱛᱟᱱ ᱮᱞ 3 ᱫᱚ ________ ᱟᱨ ᱞᱟᱛᱟᱨ 5 ᱫᱚ ________ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾',
          answerKeyHi: 'अंश (Cetan el) और हर (Latar el)',
          learningOutcome: 'LO-M403: अंश और हर'
        },
        {
          number: 3,
          type: 'SHORT_ANSWER',
          marks: 3,
          questionHi: 'गाँव में चीज़ों को बराबर बांटने का एक उदाहरण लिखें:',
          questionTarget: 'ᱦᱟᱛᱩ ᱨᱮ ᱡᱤᱱᱤᱥ ᱵᱟᱨᱟᱵᱟᱹᱨᱤ ᱦᱟᱹᱴᱤᱧ ᱨᱮᱭᱟᱜ ᱢᱤᱫ ᱫᱟᱹᱭᱠᱟᱹ ᱚᱞ ᱢᱮ (Mundari):',
          answerKeyHi: 'खेत की जुताई या फल बांटना = प्रत्येक को बराबर भिन्न हिस्सा।',
          learningOutcome: 'LO-M405: स्थानीय संदर्भ में भिन्न'
        }
      ];
    } else if (targetLanguage === 'en') {
      return [
        {
          number: 1,
          type: 'MCQ',
          marks: 1,
          questionHi: 'यदि एक गोल रोटी को दो बराबर टुकड़ों में काटा जाए, तो प्रत्येक टुकड़े को क्या कहेंगे?',
          questionTarget: 'If a circular disk or flatbread is divided into two congruent halves, each part represents:',
          options: [
            { hi: 'एक चौथाई (1/4)', target: 'One quarter (1/4)' },
            { hi: 'आधा (1/2)', target: 'One half (1/2)' },
            { hi: 'पूरा (1)', target: 'Whole unit (1)' },
            { hi: 'तीन चौथाई (3/4)', target: 'Three quarters (3/4)' }
          ],
          answerKeyHi: 'Option B) One half (1/2)',
          learningOutcome: 'LO-M402: Fraction partitioning concepts'
        },
        {
          number: 2,
          type: 'FILL_BLANK',
          marks: 2,
          questionHi: 'भिन्न 3/5 में ऊपर वाली संख्या 3 को ________ और नीचे वाली संख्या 5 को ________ कहते हैं।',
          questionTarget: 'In fraction 3/5, the top number 3 is termed ________ and the bottom number 5 is termed ________.',
          answerKeyHi: 'Numerator and Denominator',
          learningOutcome: 'LO-M403: Numerator & Denominator identification'
        },
        {
          number: 3,
          type: 'SHORT_ANSWER',
          marks: 3,
          questionHi: 'अपने परिवेश से कोई ऐसा उदाहरण लिखिए जहाँ 4 बच्चों में कोई चीज़ बराबर बांटी जाती है।',
          questionTarget: 'Provide one authentic community example where a resource is partitioned equally among four peers. Express in fraction notation.',
          answerKeyHi: 'Dividing 1 fruit among 4 children = 1/4 fraction share each.',
          learningOutcome: 'LO-M405: Contextual applied fractions'
        }
      ];
    } else if (targetLanguage === 'hi') {
      return [
        {
          number: 1,
          type: 'MCQ',
          marks: 1,
          questionHi: 'यदि एक गोल रोटी को दो बराबर टुकड़ों में काटा जाए, तो प्रत्येक टुकड़े को क्या कहेंगे?',
          questionTarget: 'यदि एक गोल रोटी को दो बराबर टुकड़ों में काटा जाए, तो प्रत्येक टुकड़े को क्या कहेंगे?',
          options: [
            { hi: 'एक चौथाई (1/4)', target: 'एक चौथाई (1/4)' },
            { hi: 'आधा (1/2)', target: 'आधा (1/2)' },
            { hi: 'पूरा (1)', target: 'पूरा (1)' },
            { hi: 'तीन चौथाई (3/4)', target: 'तीन चौथाई (3/4)' }
          ],
          answerKeyHi: 'ख) आधा (1/2)',
          learningOutcome: 'LO-M402: भिन्न की अवधारणा एवं दैनिक जीवन में विभाजन'
        },
        {
          number: 2,
          type: 'FILL_BLANK',
          marks: 2,
          questionHi: 'भिन्न 3/5 में ऊपर वाली संख्या 3 को ________ और नीचे वाली संख्या 5 को ________ कहते हैं।',
          questionTarget: 'भिन्न 3/5 में ऊपर वाली संख्या 3 को ________ और नीचे वाली संख्या 5 को ________ कहते हैं।',
          answerKeyHi: 'अंश (Numerator) और हर (Denominator)',
          learningOutcome: 'LO-M403: अंश और हर की समझ'
        },
        {
          number: 3,
          type: 'SHORT_ANSWER',
          marks: 3,
          questionHi: 'अपने गाँव या घर से कोई ऐसा उदाहरण लिखिए जहाँ 4 बच्चों में कोई चीज़ बराबर बांटी जाती है। भिन्न के रूप में व्यक्त करें।',
          questionTarget: 'अपने गाँव या घर से कोई ऐसा उदाहरण लिखिए जहाँ 4 बच्चों में कोई चीज़ बराबर बांटी जाती है। भिन्न के रूप में व्यक्त करें।',
          answerKeyHi: '1 अमरूद को 4 बच्चों में बांटना = प्रत्येक को 1/4 हिस्सा।',
          learningOutcome: 'LO-M405: स्थानीय परिवेश से जोड़कर भिन्न की व्याख्या'
        }
      ];
    }

    // Default: Santhali (sat)
    return [
      {
        number: 1,
        type: 'MCQ',
        marks: 1,
        questionHi: 'यदि एक गोल रोटी को दो बराबर टुकड़ों में काटा जाए, तो प्रत्येक टुकड़े को क्या कहेंगे?',
        questionTarget: 'ᱢᱤᱫᱴᱟᱝ ᱜᱩᱞᱟᱹᱭ ᱨᱩᱴᱤ ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱜᱮᱫ ᱞᱮᱠᱷᱟᱱ ᱢᱤᱫ ᱦᱟᱹᱴᱤᱧ ᱫᱚ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ?',
        options: [
          { hi: 'एक चौथाई (1/4)', target: 'ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮᱭᱟᱜ ᱢᱤᱫ' },
          { hi: 'आधा (1/2)', target: 'ᱛᱟᱞᱟ / ᱟᱫᱷᱟ' },
          { hi: 'पूरा (1)', target: 'ᱯᱩᱨᱟᱹ' },
          { hi: 'तीन चौथाई (3/4)', target: 'ᱯᱮ ᱦᱟᱹᱴᱤᱧ' }
        ],
        answerKeyHi: 'ख) आधा (1/2) / संथाली: ᱛᱟᱞᱟ',
        learningOutcome: 'LO-M402: भिन्न की अवधारणा एवं दैनिक जीवन में विभाजन'
      },
      {
        number: 2,
        type: 'FILL_BLANK',
        marks: 2,
        questionHi: 'भिन्न 3/5 में ऊपर वाली संख्या 3 को ________ और नीचे वाली संख्या 5 को ________ कहते हैं।',
        questionTarget: 'ᱦᱟᱹᱴᱤᱧ ᱓/᱕ ᱨᱮ ᱪᱮᱛᱟᱱ ᱮᱞ ᱓ ᱫᱚ ________ ᱟᱨ ᱞᱟᱛᱟᱨ ᱮᱞ ᱕ ᱫᱚ ________ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾',
        answerKeyHi: 'अंश (Numerator) और हर (Denominator)',
        learningOutcome: 'LO-M403: अंश और हर की समझ'
      },
      {
        number: 3,
        type: 'SHORT_ANSWER',
        marks: 3,
        questionHi: 'अपने गाँव या घर से कोई ऐसा उदाहरण लिखिए जहाँ 4 बच्चों में कोई चीज़ बराबर बांटी जाती है। भिन्न के रूप में व्यक्त करें।',
        questionTarget: 'ᱟᱢᱟᱜ ᱟᱹᱛᱩ ᱥᱮ ᱚᱲᱟᱜ ᱠᱷᱚᱱ ᱢᱤᱫᱴᱟᱝ ᱫᱟᱹᱭᱠᱟᱹ ᱚᱞ ᱢᱮ ᱡᱟᱦᱟᱸᱨᱮ ᱯᱩᱱ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱟᱞᱟ ᱨᱮ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱦᱩᱭᱩᱜ-ᱟ᱾',
        answerKeyHi: '1 अमरूद को 4 बच्चों में बांटना = प्रत्येक को 1/4 हिस्सा।',
        learningOutcome: 'LO-M405: स्थानीय परिवेश से जोड़कर भिन्न की व्याख्या'
      }
    ];
  };

  const questions = getQuestionsForLanguage();
  const totalMarks = questions.reduce((acc, q) => acc + q.marks, 0);

  return (
    <div>
      {/* Header */}
      <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.6rem' }}>📑</span>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>
              NEP 2020 द्विभाषी मूल्यांकन एवं परीक्षा पत्र निर्माता (Bilingual Exam Builder)
            </h1>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            झारखंड JCERT पाठ्यक्रमानुसार स्वतः तैयार मुद्रण-योग्य द्विभाषी परीक्षा पत्र — {targetLanguageName} एवं उत्तर कुंजी सहित।
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setShowAnswerKey(!showAnswerKey)} className="btn btn-secondary">
            <span>{showAnswerKey ? 'उत्तर कुंजी छिपाएं' : 'उत्तर कुंजी देखें'}</span>
          </button>
          <button onClick={() => window.print()} className="btn btn-primary">
            <Printer size={16} />
            <span>परीक्षा पत्र प्रिंट करें (Print)</span>
          </button>
        </div>
      </div>

      {/* Controls Card (Hidden during print) */}
      <div className="card no-print" style={{ marginBottom: '24px', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">कक्षा (Grade)</label>
            <select
              className="form-select"
              value={selectedGrade}
              onChange={e => {
                const g = parseInt(e.target.value, 10);
                setSelectedGrade(g);
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => (
                <option key={g} value={g}>
                  कक्षा {g} {g <= 2 ? '(बुनियादी - भाषा व गणित)' : g <= 5 ? '(तैयारी चरण)' : '(उच्च प्राथमिक)'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">विषय (Subject - JCERT)</label>
            <select
              className="form-select"
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
            >
              {availableSubjects.map(sub => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">परीक्षा प्रकार (Exam Type)</label>
            <select className="form-select" value={examType} onChange={e => setExamType(e.target.value as any)}>
              <option value="WEEKLY">साप्ताहिक मूल्यांकन (Weekly Test - 10 अंक)</option>
              <option value="UNIT">मासिक इकाई परीक्षा (Unit Test - 25 अंक)</option>
              <option value="TERM">सत्रांत परीक्षा (Term Exam - 50 अंक)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Printable Exam Paper Document */}
      <div
        className="card print-paper"
        style={{
          background: '#FFFFFF',
          color: '#0F172A',
          border: '1px solid #CBD5E1',
          padding: '36px',
          maxWidth: '820px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        {/* Official JCERT State Exam Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #0F172A', paddingBottom: '14px', marginBottom: '18px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            झारखंड शैक्षिक अनुसंधान एवं प्रशिक्षण परिषद (JCERT), राँची
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '6px 0 2px' }}>
            {examType === 'WEEKLY' ? 'साप्ताहिक दक्षता मूल्यांकन परीक्षा' : examType === 'UNIT' ? 'मासिक इकाई मूल्यांकन परीक्षा' : 'सत्रांत योगात्मक परीक्षा'}
          </h2>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#475569' }}>
            कक्षा: {selectedGrade} • विषय: {selectedSubject} • लक्षित मातृभाषा: {targetLanguageName} ({targetScript})
          </div>
        </div>

        {/* Student Credential Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', borderBottom: '1px solid #94A3B8', paddingBottom: '12px', marginBottom: '20px', fontSize: '0.88rem' }}>
          <div><strong>विद्यार्थी का नाम:</strong> __________________</div>
          <div><strong>अनुक्रमांक (Roll No):</strong> _______</div>
          <div style={{ textAlign: 'right' }}><strong>पूर्णांक (Total Marks):</strong> {totalMarks}</div>
          <div><strong>विद्यालय:</strong> उत्क्रमित म.वि. खूंटी</div>
          <div><strong>दिनांक:</strong> {new Date().toLocaleDateString('hi-IN')}</div>
          <div style={{ textAlign: 'right' }}><strong>समय:</strong> 45 मिनट</div>
        </div>

        {/* Instructions */}
        <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '4px', borderLeft: '4px solid #0F172A', marginBottom: '24px', fontSize: '0.82rem' }}>
          <strong>सामान्य निर्देश:</strong> सभी प्रश्न अनिवार्य हैं। प्रत्येक प्रश्न का हिंदी और {targetLanguageName} दोनों में अध्ययन करें। उत्तर निर्धारित स्थान में लिखें।
        </div>

        {/* Exam Questions Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {questions.map((q) => (
            <div key={q.number} style={{ paddingBottom: '16px', borderBottom: '1px dashed #CBD5E1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0F172A', flex: 1 }}>
                  प्रश्न {q.number}. {q.questionHi}
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, marginLeft: '12px', background: '#F1F5F9', padding: '2px 8px', borderRadius: '3px' }}>
                  [{q.marks} अंक]
                </span>
              </div>

              {/* Vernacular Translation */}
              <div style={{ marginLeft: '24px', marginBottom: '10px', color: '#1E3A8A' }}>
                <VernacularText text={q.questionTarget} size="md" color="#1E3A8A" />
              </div>

              {/* Multiple Choice Options */}
              {q.type === 'MCQ' && q.options && (
                <div style={{ marginLeft: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '18px', height: '18px', border: '1px solid #64748B', borderRadius: '50%', display: 'inline-block' }} />
                      <span>{opt.hi} / <VernacularText text={opt.target} size="xs" style={{ display: 'inline' }} /></span>
                    </div>
                  ))}
                </div>
              )}

              {/* Short Answer Space */}
              {q.type === 'SHORT_ANSWER' && (
                <div style={{ marginLeft: '24px', marginTop: '10px' }}>
                  <div style={{ borderBottom: '1px dotted #94A3B8', height: '24px' }} />
                  <div style={{ borderBottom: '1px dotted #94A3B8', height: '24px' }} />
                  <div style={{ borderBottom: '1px dotted #94A3B8', height: '24px' }} />
                </div>
              )}

              {/* Fill in the blank underline */}
              {q.type === 'FILL_BLANK' && (
                <div style={{ marginLeft: '24px', marginTop: '8px' }}>
                  <span style={{ fontSize: '0.84rem', color: '#64748B' }}>उत्तर: ____________________________________</span>
                </div>
              )}

              {/* Teacher Answer Key (Conditionally visible) */}
              {showAnswerKey && (
                <div className="no-print" style={{ marginTop: '10px', background: '#ECFDF5', padding: '8px 12px', borderRadius: '4px', border: '1px solid #10B981', fontSize: '0.82rem' }}>
                  <strong style={{ color: '#065F46' }}>✓ उत्तर कुंजी (Answer Key):</strong> {q.answerKeyHi}
                  <div style={{ fontSize: '0.74rem', color: '#047857', marginTop: '2px' }}>दक्षता: {q.learningOutcome}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Seal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', paddingTop: '16px', borderTop: '1px solid #94A3B8', fontSize: '0.8rem' }}>
          <div>हस्ताक्षर वीक्षक (Invigilator)</div>
          <div>हस्ताक्षर मूल्यांकनकर्ता (Evaluator)</div>
          <div>मुहर: उत्क्रमित मध्य विद्यालय</div>
        </div>
      </div>
    </div>
  );
};
