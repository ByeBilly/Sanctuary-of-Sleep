# Sanctuary of Sleep - Deployment Guide

## 1. Local Development

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Create a `.env` file in the root directory:
    ```
    VITE_GEMINI_API_KEY=AIzaSy...
    ```

3.  **Run Dev Server:**
    ```bash
    npm run dev
    ```

## 2. Production Build

To build the static files:

```bash
npm run build
```
This creates a `dist/` folder.

To preview the production build locally:
```bash
npm run preview -- --host 0.0.0.0 --port 4173
```

## 3. Deployment (VM / Docker)

### Option A: Docker (Recommended)

1.  **Build the Image:**
    ```bash
    docker build -t sanctuary-app .
    ```

2.  **Run the Container:**
    You must pass the API key at build time or ensure it's baked into the vite build. *Note: Vite variables are embedded during build.*
    
    If using `.env` during build:
    ```bash
    docker run -d -p 80:80 sanctuary-app
    ```

### Option B: Nginx on VM

1.  Run `npm run build` on your CI/CD or local machine.
2.  Copy `dist/` contents to `/var/www/html` on your VM.
3.  Configure Nginx to handle Single Page App routing:

    ```nginx
    server {
        listen 80;
        server_name sanctuaryofsleep.com;
        root /var/www/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
    ```
