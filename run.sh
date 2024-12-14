#!/bin/bash

# Open Python Backend
echo "Run Python Backend..."
gnome-terminal -- bash -c "source venv/bin/activate && python3 app.py; exec bash"

# Open Next.js Frontend
echo "Run Frontend..."
gnome-terminal -- bash -c "cd ./frontend && npm run dev; exec bash"

# Sleep until page is ready
echo "Waiting for Frontend Setup"
sleep 5

# Open browser directing to the page
echo "Open Browser to the Vulnerable Page"
xdg-open http://localhost:3000

