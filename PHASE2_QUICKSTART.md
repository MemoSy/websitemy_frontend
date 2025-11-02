# ⚡ دليل سريع - المرحلة 2

## 🎯 الهدف: تقليل حجم الفيديو والصور بنسبة 70%

---

## ✅ الخطوات (10 دقائق):

### 1️⃣ تثبيت FFmpeg (مرة واحدة)

```powershell
# افتح PowerShell كـ Administrator وشغّل:
choco install ffmpeg -y

# تحقق من التثبيت:
ffmpeg -version
```

**ليس لديك Chocolatey؟**
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

---

### 2️⃣ ضغط الفيديو (دقيقتين)

```powershell
cd D:\websitemy\frontend
npm run compress-video
```

**النتيجة المتوقعة:**
- ✅ الفيديو سينخفض من **25MB** إلى **~6MB**
- ✅ النسخة الأصلية محفوظة كـ `hero-intro-original.mp4`
- ✅ الجودة المرئية ممتازة

---

### 3️⃣ تحسين الصور (دقيقة واحدة)

```powershell
npm run optimize-images
```

**النتيجة المتوقعة:**
- ✅ تحويل كل الصور إلى WebP
- ✅ تقليل الحجم بنسبة **25-35%**
- ✅ الصور الأصلية تبقى كـ fallback

---

### 4️⃣ اختبار و Deploy

```powershell
# اختبار محلي
npm run dev
# افتح: http://localhost:5173
# تأكد من أن الفيديو والصور تعمل

# Build
npm run build

# Deploy
vercel --prod
```

---

## 📊 النتائج المتوقعة:

| المقياس | قبل | بعد | التحسن |
|---------|-----|-----|--------|
| **حجم الفيديو** | 25 MB | **6 MB** | -76% ⬇️ |
| **حجم الصور** | ~2.4 MB | **~1.6 MB** | -33% ⬇️ |
| **Total Page Size** | ~30 MB | **~8 MB** | -73% ⬇️ |
| **Performance (Mobile)** | 66-75 | **80-88** | +15-18% 📈 |
| **Performance (Desktop)** | 80-85 | **90-95** | +10-15% 📈 |
| **LCP** | جيد | **ممتاز** | ⭐ |

---

## 🎯 الأمر السريع الواحد:

```powershell
cd D:\websitemy\frontend; npm run compress-video; npm run optimize-images; npm run build
```

---

## ⚠️ إذا واجهت مشاكل:

### ❌ FFmpeg not found:
```powershell
# قم بتثبيته يدوياً من:
# https://www.gyan.dev/ffmpeg/builds/
```

### ❌ الفيديو لا يعمل بعد الضغط:
```powershell
# الرجوع للنسخة الأصلية:
cd D:\websitemy\frontend\public\videos
rm hero-intro.mp4
ren hero-intro-original.mp4 hero-intro.mp4
```

---

## ✅ Checklist:

- [ ] تثبيت FFmpeg
- [ ] ضغط الفيديو (`npm run compress-video`)
- [ ] تحسين الصور (`npm run optimize-images`)
- [ ] اختبار محلي (`npm run dev`)
- [ ] Build (`npm run build`)
- [ ] Deploy (`vercel --prod`)
- [ ] اختبار PageSpeed

---

**جاهز؟ ابدأ الآن!** 🚀

```powershell
cd D:\websitemy\frontend
npm run compress-video
```
