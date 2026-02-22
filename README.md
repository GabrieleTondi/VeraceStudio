# VeraceStudio 🎨

Welcome to the **VeraceStudio** repository! This is a modern, dynamic, and responsive web application built with **Next.js**, designed to showcase art, events, and projects in an engaging way.

## 🚀 Overview

VeraceStudio ("exposing art") is built with a focus on premium aesthetics and smooth user experiences. The application utilizes a mobile-first approach, featuring custom animations and interactive components to create a memorable impression right from the first visit.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Drei](https://github.com/pmndrs/drei)
- **Icons:** [Tabler Icons](https://tabler-icons.io/)

## ✨ Key Features

- **Mobile First Hero:** A dedicated mobile-only video introduction (`MobileHero`) that plays seamlessly on the first visit of the session, fading out smoothly to reveal the main content.
- **Interactive Navigation:** Floating dock navigation for quick access to different sections (Events, Projects, About, JamSession).
- **Smooth Animations:** Integrated Framer Motion for highly polished entry animations and interactive UI elements like the Animated Tooltip.
- **Premium Aesthetics:** Clean typography, deliberate use of space, and dynamic components geared towards an artistic portfolio.

## 📂 Project Structure

- `/app`: Next.js App Router endpoints and core pages (e.g., `page.tsx` for Home).
- `/components`: Reusable UI components including:
  - `MobileHero`: Session-controlled animated mobile video intro.
  - `FloatingNavBar` / `DockCard`: Interactive floating menu.
  - `ui/animated-tooltip`: Dynamic user/profile tooltip cards.
- `/public`: Static assets, images, and videos (e.g., `tiktok_media.mp4`).

## 💻 Getting Started

First, make sure you have installed the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Editing the Project

You can start editing the main page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
Global styles and Tailwind directives are located in `app/globals.css`.

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
