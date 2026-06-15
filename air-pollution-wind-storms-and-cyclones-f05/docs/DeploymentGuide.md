# Deployment Guide

This guide outlines how to deploy the **Atmosphere Explorer** simulation locally or host it on the web.

---

## 1. Running Locally (No Server Required)
Because Atmosphere Explorer is built entirely with pure HTML5, CSS3, and Vanilla JS, it has no compile steps and doesn't require complex node servers.

### Double-Click Launch
1. Navigate to the project root directory.
2. Double-click the `index.html` file to open it directly in any modern web browser (Chrome, Firefox, Edge, Safari).

### Using a Simple Local Server (Recommended for Developers)
For local development, running a lightweight server is recommended to avoid CORS-like constraints in certain browsers:
* **Python 3**:
  ```bash
  python -m http.server 8000
  ```
  Open `http://localhost:8000` in your browser.
* **Node.js (http-server)**:
  ```bash
  npx http-server -p 8000
  ```
  Open `http://localhost:8000` in your browser.
* **VS Code Live Server**: Right-click `index.html` and select **"Open with Live Server"**.

---

## 2. Deploying to GitHub Pages (Free Hosting)
GitHub Pages is the easiest way to share this simulation with high school students.

### Deployment Steps
1. Create a public repository on GitHub.
2. Initialize Git in your local project folder and push the code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Atmosphere Explorer"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/atmosphere-explorer.git
   git push -u origin main
   ```
3. On GitHub, navigate to your repository's **Settings** tab.
4. Select **Pages** from the left-hand sidebar menu.
5. Under **Build and deployment**, set the source to **Deploy from a branch**.
6. Set the branch to `main` (or `master`) and the folder to `/ (root)`.
7. Click **Save**.
8. Within 1-2 minutes, your site will be live at `https://YOUR_USERNAME.github.io/atmosphere-explorer/`.

---

## 3. Deploying to Vercel / Netlify
Vercel and Netlify offer continuous deployment from GitHub.

### Vercel Deployment
1. Install the Vercel CLI (`npm i -g vercel`) or sign up at [vercel.com](https://vercel.com).
2. Run `vercel` in the project root.
3. Follow the interactive prompts (select default options, no build commands needed).
4. The site will deploy instantly and provide a production URL (e.g. `atmosphere-explorer.vercel.app`).

### Netlify Deployment
1. Sign in to [netlify.com](https://netlify.com).
2. Drag and drop the project folder directly into the Netlify web dashboard upload zone, or link your GitHub repository.
3. The site will publish automatically.
