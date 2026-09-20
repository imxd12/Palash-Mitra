import { Request, Response } from 'express';
import { db } from '../../core/database/db';

export const resetAllData = (req: Request, res: Response): void => {
  try {
    db.resetApplicationData();
    res.json({
      success: true,
      message: 'PALASH MITRA का संपूर्ण डेटा (छात्र, उपस्थिति, प्रगति, कार्यपत्रक) सफलतापूर्वक मिटा दिया गया है।',
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('System reset error:', err);
    res.status(500).json({
      success: false,
      message: 'डेटा रीसेट करने में त्रुटि उत्पन्न हुई: ' + (err.message || 'अज्ञात त्रुटि')
    });
  }
};
