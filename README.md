# Anish Rana - Developer Portfolio

A highly advanced, visually stunning developer portfolio website featuring a Three.js animated 3D background, GSAP scroll animations, Lenis smooth scrolling, and an interactive AI Chatbot.

## 🚀 Features

- **Interactive 3D Hero:** Custom Three.js particle system and rotating futuristic geometry that reacts to mouse movement.
- **Glassmorphism UI:** Premium aesthetic using blurred backgrounds and semi-transparent layers.
- **Dark & Light Mode:** Seamlessly toggle between dark and light themes.
- **GSAP Reveal Animations:** Scroll-triggered element reveals for a dynamic feeling.
- **Smooth Scrolling:** Integrated with Lenis for an ultra-smooth vertical scrolling experience.
- **3D Tech Sphere:** An interactive rotating sphere of technologies built with TagCloud.js.
- **3D Hover Cards:** Project, Service, and Pricing cards that tilt based on mouse position using vanilla-tilt.js.
- **Interactive AI Chatbot:** A built-in floating chat interface that can answer basic questions.
- **Performance Optimized:** Uses native JavaScript and efficient CSS variables, no heavy frameworks.

## 🛠️ Tech Stack

- **HTML5:** Semantic document structure
- **CSS3:** Native variables, Flexbox/Grid, Animations, Glassmorphism
- **Vanilla JavaScript:** Core logic and interaction
- **Three.js:** 3D rendering in the hero section
- **GSAP & ScrollTrigger:** Scroll-based animations
- **Lenis:** Smooth scrolling
- **Vanilla-Tilt:** 3D card tilt effects
- **TagCloud.js:** 3D text sphere

## 📂 Project Structure

\`\`\`text
/portfolio
  ├── index.html        # Main HTML skeleton
  ├── style.css         # Main stylesheet (Themes, layout, styles)
  ├── script.js         # Core logic (Lenis, GSAP, Cursor, Chatbot)
  ├── /js
  │   └── three-hero.js # Three.js initialization and animation loop
  ├── /images           # (Create this array for project images)
  ├── /assets           # (For additional assets like icons/fonts)
  └── README.md
\`\`\`

## 🌐 How to Deploy to GitHub Pages

1. **Create a GitHub Repository:**
   - Go to [GitHub](https://github.com) and create a new repository (e.g., `anish-portfolio`).
   
2. **Push the Code:**
   Open your terminal in the project folder and run:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit of portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   \`\`\`

3. **Enable GitHub Pages:**
   - In your repository on GitHub, go to **Settings** > **Pages**.
   - Under "Build and deployment" > "Source", select **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` folder, then click **Save**.
   
4. **View your Site:**
   - Within a few minutes, your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.
