Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " Publishing PALASH MITRA to GitHub" -ForegroundColor Cyan
Write-Host " Repository: git@github.com:imxd12/Palash-Mitra.git" -ForegroundColor Yellow
Write-Host " Branch: main" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

Set-Location "c:\SIH\PALASH MITRA"

# Ensure Git User Identity is configured
$userName = git config user.name
if (-not $userName) {
    Write-Host "[Config] Setting Git User Name..." -ForegroundColor Gray
    git config user.name "Imad Kha"
}

$userEmail = git config user.email
if (-not $userEmail) {
    Write-Host "[Config] Setting Git User Email..." -ForegroundColor Gray
    git config user.email "imxd12@users.noreply.github.com"
}

Write-Host "`n[1/4] Staging files..." -ForegroundColor Green
git add .

Write-Host "`n[2/4] Committing codebase..." -ForegroundColor Green
git commit -m "feat: initial release of PALASH MITRA - AI-Powered Vernacular Pedagogy OS (SIH 2026 PS-26042)"

Write-Host "`n[3/4] Ensuring branch is main..." -ForegroundColor Green
git branch -M main

Write-Host "`n[4/4] Pushing to GitHub (SSH)..." -ForegroundColor Green
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n========================================================" -ForegroundColor Yellow
    Write-Host " SSH push failed. Attempting HTTPS push fallback..." -ForegroundColor Yellow
    Write-Host "========================================================" -ForegroundColor Yellow
    git remote set-url origin https://github.com/imxd12/Palash-Mitra.git
    Write-Host "Pushing via HTTPS (https://github.com/imxd12/Palash-Mitra.git)..." -ForegroundColor White
    git push -u origin main
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n========================================================" -ForegroundColor Green
    Write-Host " SUCCESS: PALASH MITRA published to GitHub!" -ForegroundColor Green
    Write-Host " URL: https://github.com/imxd12/Palash-Mitra" -ForegroundColor Green
    Write-Host "========================================================" -ForegroundColor Green
} else {
    Write-Host "`n========================================================" -ForegroundColor Red
    Write-Host " FAILED: Could not push to GitHub." -ForegroundColor Red
    Write-Host " Please check if you are logged in or have access to https://github.com/imxd12/Palash-Mitra" -ForegroundColor Red
    Write-Host "========================================================" -ForegroundColor Red
}
