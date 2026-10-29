@echo off
setlocal
cd /d "%~dp0"
title Online Learning REST API

echo ============================================
echo    ONLINE LEARNING REST API - QUICK START
 echo ============================================
echo.
where node >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not found. Install Node.js and restart Windows/VS Code.
    pause
    exit /b 1
)
echo Step 1/3: Installing project packages...
call npm.cmd install --no-audit --no-fund
if errorlevel 1 (
    echo ERROR: npm install failed. Please check your internet connection.
    pause
    exit /b 1
)
echo.
echo Step 2/3: Preparing local configuration...
node scripts\init-env.js
if errorlevel 1 (
    echo ERROR: Could not create local settings.
    pause
    exit /b 1
)
echo.
echo Step 3/3: Starting API at http://localhost:5000
 echo Leave this window OPEN while using Postman.
echo To stop the server, press Ctrl+C.
echo.
node server.js
if errorlevel 1 (
    echo ERROR: Server stopped with an error. Check the message above.
    pause
)
