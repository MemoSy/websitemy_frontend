# Image Optimization Script for WebSiteMy
# Converts images to WebP and creates responsive versions

Write-Host "🖼️  Image Optimization Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if FFmpeg is installed (includes cwebp)
$ffmpegExists = Get-Command ffmpeg -ErrorAction SilentlyContinue

if (-not $ffmpegExists) {
    Write-Host "❌ FFmpeg is not installed!" -ForegroundColor Red
    Write-Host "Please install FFmpeg first (it includes image conversion tools)" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ FFmpeg found!" -ForegroundColor Green
Write-Host ""

# Directories to optimize
$imageDirs = @(
    "..\public\images\projects",
    "..\public\images\testimonials",
    "..\public\images"
)

$totalOriginalSize = 0
$totalOptimizedSize = 0
$filesProcessed = 0

foreach ($dir in $imageDirs) {
    if (Test-Path $dir) {
        Write-Host "📁 Processing directory: $dir" -ForegroundColor Cyan
        
        # Find all JPG and PNG files
        $images = Get-ChildItem -Path $dir -Include *.jpg,*.jpeg,*.png -Recurse
        
        foreach ($image in $images) {
            # Skip if already WebP
            if ($image.Extension -eq ".webp") {
                continue
            }
            
            # Skip hero-poster (already optimized)
            if ($image.Name -eq "hero-poster.jpg") {
                continue
            }
            
            $originalSize = $image.Length / 1KB
            $webpPath = $image.FullName -replace '\.(jpg|jpeg|png)$', '.webp'
            
            # Convert to WebP
            Write-Host "   Converting: $($image.Name)..." -ForegroundColor White
            
            ffmpeg -i $image.FullName `
                -c:v libwebp `
                -quality 85 `
                -preset picture `
                $webpPath `
                -y `
                -loglevel error
            
            if (Test-Path $webpPath) {
                $webpSize = (Get-Item $webpPath).Length / 1KB
                $reduction = [math]::Round((($originalSize - $webpSize) / $originalSize) * 100, 1)
                
                Write-Host "      ✅ Saved $reduction% ($([math]::Round($originalSize, 1))KB → $([math]::Round($webpSize, 1))KB)" -ForegroundColor Green
                
                $totalOriginalSize += $originalSize
                $totalOptimizedSize += $webpSize
                $filesProcessed++
            }
        }
        
        Write-Host ""
    }
}

if ($filesProcessed -gt 0) {
    $totalReduction = [math]::Round((($totalOriginalSize - $totalOptimizedSize) / $totalOriginalSize) * 100, 1)
    
    Write-Host "✅ Optimization complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Summary:" -ForegroundColor Cyan
    Write-Host "   Files processed: $filesProcessed" -ForegroundColor White
    Write-Host "   Original size:   $([math]::Round($totalOriginalSize / 1024, 2)) MB" -ForegroundColor White
    Write-Host "   Optimized size:  $([math]::Round($totalOptimizedSize / 1024, 2)) MB" -ForegroundColor White
    Write-Host "   Total reduction: $totalReduction%" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎯 Next: Update image paths in code to use .webp format" -ForegroundColor Yellow
} else {
    Write-Host "ℹ️  No images found to optimize" -ForegroundColor Yellow
}
