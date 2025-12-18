
# Sanctuary of Sleep - VM Setup Guide

This guide details how to set up, build, and run the `sanctuary-of-sleep` application on a Linux Virtual Machine (e.g., Ubuntu/Debian).

## 1. Prerequisites
Ensure your VM has **Node.js** installed (Version 18+ recommended).

### Install Node.js (Ubuntu/Debian)
```bash
# Update package list
sudo apt update

# Install curl
sudo apt install -y curl

# Setup Node.js 20.x repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node -v
npm -v
```

## 2. Transfer Project
You can clone your git repository or upload the files directly.
```bash
# Example: Clone if you have a remote
git clone <YOUR_GIT_REPO_URL> sanctuary-of-sleep
cd sanctuary-of-sleep
```

## 3. Install Dependencies
Install the required project libraries.
```bash
npm install
```

## 4. Environment Configuration
The application requires your Google Gemini API Key.
1. Create a `.env.local` file in the project root:
   ```bash
   nano .env.local
   ```
2. Paste your API key inside:
   ```bash
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Save and exit (Ctrl+O, Enter, Ctrl+X).

## 5. Build the Application
Compile the project for production.
```bash
npm run build
```
This creates a `dist/` directory containing the optimized static files.

## 6. Run the Application
There are two ways to run the app:

### Option A: Preview (Quick Test)
Uses Vite's preview server. Good for quick verification.
```bash
npm run preview -- --host --port 3000
```
- Access at `http://<VM_IP>:3000`

### Option B: Serve (Recommended for simple deployment)
Use a static file server to keep it running.
1. Install `serve` globally:
   ```bash
   sudo npm install -g serve
   ```
2. Run the server:
   ```bash
   serve -s dist -l 3000
   ```
- Access at `http://<VM_IP>:3000`

### Option C: Background Service (Keep running after logout)
Use `pm2` to keep the app running in the background.
```bash
# Install pm2
sudo npm install -g pm2

# Start the server with pm2
pm2 start "serve -s dist -l 3000" --name sanctuary

# Save the process list
pm2 save

# Setup startup script (copy the command output by this)
pm2 startup
```

## 7. Firewall (Important)
Ensure port 3000 is open on your VM's firewall.
```bash
# If using UFW
sudo ufw allow 3000
```
