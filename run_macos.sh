#!/bin/bash

# Open Python Backend
echo "Run Python Backend..."
osascript <<EOF
tell application "Terminal"
    do script "cd $(pwd) && source venv/bin/activate && python3 app.py"
end tell
EOF

# Open Next.js Frontend
echo "Run Frontend..."
osascript <<EOF
tell application "Terminal"
    do script "cd $(pwd)/frontend && npm run dev"
end tell
EOF

# Sleep until page is ready
echo "Waiting for Frontend Setup"
sleep 5

# Open browser directing to the page
echo "Open Browser to the Vulnerable Page"
open http://localhost:3000
