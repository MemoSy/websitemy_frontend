# Hostinger Deployment Script
Write-Host "Starting build..." -ForegroundColor Cyan

# Build project
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful!" -ForegroundColor Green
    
    # Copy .htaccess to dist
    Copy-Item -Path ".htaccess" -Destination "dist\.htaccess" -Force
    Write-Host "Copied .htaccess to dist/" -ForegroundColor Green
    
    # Show dist contents
    Write-Host "`nDist folder contents:" -ForegroundColor Cyan
    Get-ChildItem -Path "dist" | Select-Object Name
    
    Write-Host "`nFiles ready for upload!" -ForegroundColor Green
    Write-Host "Upload all files from 'dist' folder to 'public_html' on Hostinger" -ForegroundColor Yellow
} else {
    Write-Host "Build failed!" -ForegroundColor Red
}
