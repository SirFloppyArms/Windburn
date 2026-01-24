#!/bin/bash
# Windburn Development Server Launcher
# This script starts a local development server for testing

cd "$(dirname "$0")"

echo "🏊 Windburn Multi-Sport Academy - Development Server"
echo "=================================================="
echo ""
echo "Starting local server..."
echo "📱 Visit: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8000
