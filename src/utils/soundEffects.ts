// Sound Effects Utility - Using Web Audio API
// أصوات خفيفة وقصيرة للأزرار المهمة

class SoundEffects {
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;

  // تهيئة AudioContext (يجب أن يتم بعد تفاعل المستخدم)
  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // صوت نقرة خفيفة للأزرار
  playClick() {
    if (!this.isEnabled) return;
    
    try {
      const ctx = this.initAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // نغمة قصيرة وخفيفة
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
      
      oscillator.type = 'sine';
      
      // صوت منخفض جداً
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.08);
    } catch {
      // تجاهل الأخطاء بصمت
    }
  }

  // صوت فتح Modal (pop خفيف)
  playPop() {
    if (!this.isEnabled) return;
    
    try {
      const ctx = this.initAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // نغمة صاعدة قصيرة
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.06);
      
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch {
      // تجاهل الأخطاء بصمت
    }
  }

  // صوت إرسال (whoosh خفيف)
  playSend() {
    if (!this.isEnabled) return;
    
    try {
      const ctx = this.initAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // نغمة صاعدة سريعة
      oscillator.frequency.setValueAtTime(300, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
      
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch {
      // تجاهل الأخطاء بصمت
    }
  }

  // صوت انتقال بين الخطوات
  playSlide() {
    if (!this.isEnabled) return;
    
    try {
      const ctx = this.initAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(500, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.08);
      
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch {
      // تجاهل الأخطاء بصمت
    }
  }

  // تفعيل/إيقاف الصوت
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  isAudioEnabled() {
    return this.isEnabled;
  }
}

// إنشاء instance واحد للاستخدام في كل التطبيق
export const soundEffects = new SoundEffects();
