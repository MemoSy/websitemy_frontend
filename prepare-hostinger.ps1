# سكريبت تجهيز الملفات للرفع على Hostinger
Write-Host "بدء تجهيز الملفات للرفع على Hostinger..." -ForegroundColor Cyan

# 1. Build المشروع
Write-Host "`nجاري بناء المشروع..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "فشل البناء! تحقق من الاخطاء اعلاه." -ForegroundColor Red
    exit 1
}

Write-Host "تم بناء المشروع بنجاح!" -ForegroundColor Green

# 2. نسخ .htaccess إلى dist
Write-Host "`n📄 نسخ ملف .htaccess..." -ForegroundColor Yellow
Copy-Item -Path ".htaccess" -Destination "dist\.htaccess" -Force

if (Test-Path "dist\.htaccess") {
    Write-Host "✅ تم نسخ .htaccess بنجاح!" -ForegroundColor Green
} else {
    Write-Host "⚠️ تحذير: لم يتم نسخ .htaccess" -ForegroundColor Yellow
}

# 3. عرض محتويات dist
Write-Host "`n📂 محتويات مجلد dist:" -ForegroundColor Cyan
Get-ChildItem -Path "dist" -Recurse -Depth 1 | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize

# 4. فحص الملفات المطلوبة
Write-Host "`n🔍 فحص الملفات الأساسية:" -ForegroundColor Yellow

$requiredFiles = @(
    "dist\index.html",
    "dist\.htaccess",
    "dist\_redirects",
    "dist\robots.txt",
    "dist\sitemap.xml"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file موجود" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ $file مفقود" -ForegroundColor Yellow
    }
}

# 5. حساب حجم المشروع
Write-Host "`n📊 حجم المشروع:" -ForegroundColor Cyan
$size = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "  إجمالي الحجم: $([math]::Round($size, 2)) MB" -ForegroundColor White

# 6. إنشاء ملف ZIP للرفع (اختياري)
Write-Host "`n📦 هل تريد إنشاء ملف ZIP للرفع؟ (y/n):" -ForegroundColor Yellow
$createZip = Read-Host

if ($createZip -eq 'y' -or $createZip -eq 'Y') {
    $zipPath = "dist-hostinger.zip"
    
    if (Test-Path $zipPath) {
        Remove-Item $zipPath -Force
    }
    
    Compress-Archive -Path "dist\*" -DestinationPath $zipPath -Force
    Write-Host "✅ تم إنشاء $zipPath بنجاح!" -ForegroundColor Green
    Write-Host "  يمكنك رفعه مباشرة عبر File Manager في Hostinger" -ForegroundColor Cyan
}

# 7. تعليمات الرفع
Write-Host "`n" -NoNewline
Write-Host "============================================" -ForegroundColor Magenta
Write-Host "          تعليمات الرفع على Hostinger         " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Magenta

Write-Host "`n📝 خطوات الرفع:" -ForegroundColor Yellow
Write-Host "  1. اذهب إلى: Hostinger → File Manager" -ForegroundColor White
Write-Host "  2. افتح مجلد: public_html" -ForegroundColor White
Write-Host "  3. احذف جميع الملفات القديمة من public_html" -ForegroundColor White
Write-Host "  4. ارفع جميع ملفات من مجلد dist\" -ForegroundColor White
Write-Host "  5. تأكد من رفع .htaccess و _redirects" -ForegroundColor White

Write-Host "`n🌐 DNS Settings:" -ForegroundColor Yellow
Write-Host "  - تأكد من حذف سجلات Vercel القديمة" -ForegroundColor White
Write-Host "  - أضف IP أو Nameservers من Hostinger" -ForegroundColor White
Write-Host "  - انتظر 10-60 دقيقة للتحديث" -ForegroundColor White

Write-Host "`n✅ الملفات جاهزة في: $PWD\dist" -ForegroundColor Green
Write-Host "============================================`n" -ForegroundColor Magenta

# 8. فتح مجلد dist
Write-Host "هل تريد فتح مجلد dist؟ (y/n):" -ForegroundColor Yellow
$openFolder = Read-Host

if ($openFolder -eq 'y' -or $openFolder -eq 'Y') {
    Invoke-Item "dist"
}

Write-Host "`n🎉 انتهى! حظاً موفقاً في الرفع." -ForegroundColor Green
