import { createApp } from './app';
import { config } from './config';

const app = createApp();

app.listen(config.port, () => {
  console.log(`================================================================`);
  console.log(`🌺 PALASH MITRA API Server running on port ${config.port}`);
  console.log(`🌺 Environment: ${config.nodeEnv} | API Prefix: ${config.apiPrefix}`);
  console.log(`🌺 SIH PS-26042: Mother-Tongue Learning & Vernacular Pedagogy`);
  console.log(`================================================================`);
});
