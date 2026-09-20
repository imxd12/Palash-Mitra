// HTML5 Web Audio API Waveform Visualizer for Oral Reading Fluency

export class AudioWaveformVisualizer {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private stream: MediaStream | null = null;
  private animationId: number | null = null;
  private isSimulated: boolean = false;

  public async start(canvas: HTMLCanvasElement, isDark: boolean = false): Promise<void> {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      if (typeof window !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
        const source = this.audioCtx.createMediaStreamSource(this.stream);
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 64;
        source.connect(this.analyser);
      } else {
        this.isSimulated = true;
      }
    } catch (err) {
      console.warn('Microphone access for visualizer not granted, using simulated audio waveform:', err);
      this.isSimulated = true;
    }

    const bufferLength = this.analyser ? this.analyser.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);

    let phase = 0;
    const renderFrame = () => {
      this.animationId = requestAnimationFrame(renderFrame);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (this.analyser && !this.isSimulated) {
        this.analyser.getByteFrequencyData(dataArray);
      } else {
        // Simulated responsive waveform
        phase += 0.1;
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.floor(60 + 50 * Math.sin(phase + i * 0.3) + 20 * Math.random());
        }
      }

      const barWidth = (canvas.width / bufferLength) * 1.5;
      let barHeight: number;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.85;

        // Accent waveform styling
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${0.4 + (dataArray[i] / 255) * 0.6})`
          : `rgba(15, 23, 42, ${0.4 + (dataArray[i] / 255) * 0.6})`;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, canvas.height / 2 - barHeight / 2, barWidth - 2, barHeight, 4);
        } else {
          ctx.rect(x, canvas.height / 2 - barHeight / 2, barWidth - 2, barHeight);
        }
        ctx.fill();

        x += barWidth + 2;
        if (x > canvas.width) break;
      }
    };

    renderFrame();
  }

  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
    this.analyser = null;
  }
}
