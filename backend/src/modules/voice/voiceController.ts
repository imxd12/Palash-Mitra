import { Request, Response } from 'express';
import { speechService, VoiceClassroomRequest } from '../../core/speech/SpeechService';

export const processVoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: VoiceClassroomRequest = {
      audioBase64: req.body.audioBase64,
      transcriptText: req.body.transcriptText,
      speaker: req.body.speaker || 'TEACHER',
      sourceLanguage: req.body.sourceLanguage || (req.body.speaker === 'STUDENT' ? 'sat' : 'hi'),
      targetLanguage: req.body.targetLanguage || (req.body.speaker === 'STUDENT' ? 'hi' : 'sat'),
      clientSttLatencyMs: req.body.clientSttLatencyMs ? parseInt(req.body.clientSttLatencyMs, 10) : undefined
    };

    const response = await speechService.processVoiceClassroom(payload);
    res.json({ success: true, ...response });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Speech processing error', error: err.message });
  }
};

export const getPronunciation = (req: Request, res: Response): void => {
  const word = req.query.word as string;
  const lang = (req.query.lang as string) || 'sat';

  if (!word) {
    res.status(400).json({ success: false, message: 'Word query parameter is required' });
    return;
  }

  const guide = speechService.getPronunciationGuide(word, lang);
  res.json({ success: true, guide });
};

export const audioStream = (req: Request, res: Response): void => {
  // Returns synthesized audio header / wav tone or metadata for client WebAudio synthesis
  const text = req.query.text as string;
  const lang = req.query.lang as string;

  res.setHeader('Content-Type', 'application/json');
  res.json({
    audioSynthesized: true,
    text,
    language: lang,
    sampleRate: 24000,
    note: 'Native browser WebSpeech TTS or pre-cached offline PCM buffer'
  });
};
