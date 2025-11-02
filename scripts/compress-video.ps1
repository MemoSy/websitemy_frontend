# Video Compression Script for WebSiteMy
# This script compresses the hero video from 25MB to ~6MB

Write-Host "🎬 Video Compression Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if FFmpeg is installed
$ffmpegExists = Get-Command ffmpeg -ErrorAction SilentlyContinue

if (-not $ffmpegExists) {
    Write-Host "❌ FFmpeg is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 Install FFmpeg:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip" -ForegroundColor White
    Write-Host "2. Extract to C:\ffmpeg" -ForegroundColor White
    Write-Host "3. Add C:\ffmpeg\bin to PATH" -ForegroundColor White
    Write-Host ""
    Write-Host "Or use Chocolatey: choco install ffmpeg" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "✅ FFmpeg found!" -ForegroundColor Green
Write-Host ""

$inputVideo = "..\public\videos\hero-intro.mp4"
$outputVideo = "..\public\videos\hero-intro-compressed.mp4"
$backupVideo = "..\public\videos\hero-intro-original.mp4"

# Check if input file exists
if (-not (Test-Path $inputVideo)) {
    Write-Host "❌ Video file not found: $inputVideo" -ForegroundColor Red
    exit 1
}

# Get original file size
$originalSize = (Get-Item $inputVideo).Length / 1MB
Write-Host "📊 Original video size: $([math]::Round($originalSize, 2)) MB" -ForegroundColor Yellow

# Backup original video
if (-not (Test-Path $backupVideo)) {
    Write-Host "💾 Creating backup..." -ForegroundColor Cyan
    Copy-Item $inputVideo $backupVideo
    Write-Host "✅ Backup created: hero-intro-original.mp4" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔄 Compressing video..." -ForegroundColor Cyan
Write-Host "This may take 2-5 minutes..." -ForegroundColor Yellow
Write-Host ""

# Compress video with optimal settings for web
# CRF 28 = good quality with 70-80% size reduction
# Scale to max 1920px width for performance
# Remove audio (not needed for hero video)
ffmpeg -i $inputVideo `
    -vcodec libx264 `
    -crf 28 `
    -preset medium `
    -vf "scale='min(1920,iw)':-2" `
    -an `
    -movflags +faststart `
    $outputVideo `
    -y

if (Test-Path $outputVideo) {
    $compressedSize = (Get-Item $outputVideo).Length / 1MB
    $reduction = [math]::Round((($originalSize - $compressedSize) / $originalSize) * 100, 1)
    
    Write-Host ""
    Write-Host "✅ Compression complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Results:" -ForegroundColor Cyan
    Write-Host "   Original:   $([math]::Round($originalSize, 2)) MB" -ForegroundColor White
    Write-Host "   Compressed: $([math]::Round($compressedSize, 2)) MB" -ForegroundColor White
    Write-Host "   Reduction:  $reduction%" -ForegroundColor Green
    Write-Host ""
    
    # Replace original with compressed version
    Write-Host "🔄 Replacing original video with compressed version..." -ForegroundColor Cyan
    Remove-Item $inputVideo
    Rename-Item $outputVideo "hero-intro.mp4"
    
    Write-Host "✅ Video replaced successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Note: Original video backed up as 'hero-intro-original.mp4'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🎯 Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Test video playback in browser" -ForegroundColor White
    Write-Host "   2. Run: npm run build" -ForegroundColor White
    Write-Host "   3. Deploy to Vercel" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "❌ Compression failed!" -ForegroundColor Red
    exit 1
}
