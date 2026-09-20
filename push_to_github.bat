@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo  Publishing PALASH MITRA to GitHub
echo  Repository: git@github.com:imxd12/Palash-Mitra.git
echo  Branch: main
echo ========================================================
cd /d "c:\SIH\PALASH MITRA"

:: 1. Ensure Git User Identity is configured
git config user.name >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [Config] Setting Git User Name...
    git config user.name "Imad Kha"
)

git config user.email >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [Config] Setting Git User Email...
    git config user.email "imxd12@users.noreply.github.com"
)

echo.
echo [1/4] Staging files...
git add .

echo.
echo [2/4] Committing codebase...
git commit -m "feat: initial release of PALASH MITRA - AI-Powered Vernacular Pedagogy OS (SIH 2026 PS-26042)"

echo.
echo [3/4] Ensuring branch is main...
git branch -M main

echo.
echo [4/4] Pushing to GitHub (SSH: git@github.com:imxd12/Palash-Mitra.git)...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================================
    echo  SSH push failed. Attempting HTTPS push fallback...
    echo ========================================================
    git remote set-url origin https://github.com/imxd12/Palash-Mitra.git
    echo Pushing via HTTPS (https://github.com/imxd12/Palash-Mitra.git)...
    git push -u origin main
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo  SUCCESS: PALASH MITRA published to GitHub!
    echo  URL: https://github.com/imxd12/Palash-Mitra
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo  FAILED: Could not push to GitHub.
    echo  Please check if your GitHub credentials are authenticated
    echo  or if the repository exists at https://github.com/imxd12/Palash-Mitra
    echo ========================================================
)

pause
