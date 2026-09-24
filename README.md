# ZENIT Studio — Independent Digital Studio

> **ZENIT Studio** is a premium, high-converting digital agency website built to showcase custom web design and development services for clients, businesses, and creators worldwide.

---

## 🚀 Overview

ZENIT Studio delivers bespoke web experiences, digital products, and creative direction for ambitious brands. This website serves as a live digital storefront for clients seeking high-end web development, e-commerce solutions, SaaS dashboards, and interactive brand experiences.

---

## ✨ Features

- **⚡ Staggered Page Entrance**: Smooth GSAP entrance sequence revealing hero title, metadata, interactive visuals, and CTA buttons on load.
- **🎨 Selected Work Portfolio**: Showcase of real-world client web projects (SaaS platforms, e-commerce stores, creative agency sites, and healthcare portals) complete with live preview cards and tech tags.
- **🔄 Bidirectional Scroll Animations**: GSAP ScrollTrigger animations that react gracefully whether scrolling **downward OR upward**.
- **🧭 Smart Header Navigation**: Auto-hides on downward scroll for max content focus, and smoothly slides down when scrolling back up.
- **📱 Fully Responsive Design**: Carefully crafted CSS breakpoints for seamless viewing across smartphones, tablets, laptops, and 4K displays.
- **🎯 Interactive Custom Cursor & Controls**: Floating cursor follower with contextual hover labels (`VIEW`, `CLOSE`, `MENU`).
- **⚡ SEO & Performance Optimized**: Semantic HTML5 structure, structured metadata tags, accessible ARIA roles, and 60fps hardware-accelerated animations.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Animation Engine**: [GSAP 3](https://greensock.com/gsap/) (ScrollTrigger)
- **Styling**: Modern Vanilla CSS3 with CSS Custom Properties (Design Tokens)
- **Icons & Typography**: Google Fonts (`Space Grotesk`, `DM Mono`)

---

## 📁 Project Structure

```
ZENIT/
├── public/                # Static assets & SVG favicon
├── src/
│   ├── app/
│   │   └── App.jsx        # Main App container & GSAP animation orchestration
│   ├── components/
│   │   ├── Button.jsx     # Reusable magnetic CTA button
│   │   ├── Cursor.jsx     # Custom floating cursor follower
│   │   ├── HeroVisual.jsx # Interactive hero graphic radar visual
│   │   ├── Loader.jsx     # Animated 0 → 100 entrance loader screen
│   │   ├── Playground.jsx # Interactive brand visual playground
│   │   ├── ProjectRow.jsx # Individual project row with hover preview
│   │   └── ProjectVisual.jsx # Art thumbnail graphics for projects
│   ├── config/
│   │   └── site.js        # Global site configuration & studio metadata
│   ├── App.css            # Complete design system & responsive styling
│   ├── index.css          # Reset & base CSS styles
│   └── main.jsx           # Application entry point
├── index.html             # HTML5 entry document & meta tags
├── package.json           # Node.js dependencies & scripts
└── README.md              # Project documentation
```

---

## ⚡ Quick Start

### Prerequisites

Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AmulyaPeddisetty/Zenit.git
   cd Zenit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📄 License

Created with ❤️ by **ZENIT Studio**. Distributed for commercial & client project use.
