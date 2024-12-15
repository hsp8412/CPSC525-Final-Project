#!/bin/bash

# Step 1: Create a Python virtual environment at the root
echo "Creating Python virtual environment..."
python3 -m venv venv

# Step 2: Activate the virtual environment and install Python packages
echo "Activating virtual environment and installing Python dependencies..."
source venv/bin/activate
pip install -r requirements.txt

# Step 3: Navigate to the frontend folder and install Node.js packages
echo "Installing Node.js dependencies in the frontend folder..."
(cd frontend; npm install)

# Step 4: Success message
echo "Setup completed successfully!"

# Step 5: Run vulnerable page
./run_macos.sh
