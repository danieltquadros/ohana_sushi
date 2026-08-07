# 🛒 Ohana Sushi — Customer Storefront

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel)](https://www.ohanasushidelivery.com.br)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Customer-facing e-commerce for the Ohana Sushi delivery system.
> Built with Next.js, styled-components, Ant Design, and Redux.

**Status:** 🟢 Production — Live at [ohanasushidelivery.com.br](https://www.ohanasushidelivery.com.br)

---

## 📋 Table of Contents

- [About](#-about)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#%EF%B8%8F-project-structure)
- [Available Scripts](#-available-scripts)
- [Deployment](#%EF%B8%8F-deployment)
- [License](#-license)

---

## 🎯 About

This repository is part of the **Ohana Sushi** project — a full-stack delivery system currently in active commercial use.

The full project consists of three integrated applications:

- 🛒 **[ohana_sushi](https://github.com/danieltquadros/ohana_sushi)** — Customer storefront (this repository) — Next.js
- ⚙️ **[ohana-api](https://github.com/danieltquadros/ohana-api)** — REST API backend — NestJS
- 🎛️ **[ohana-admin](https://github.com/danieltquadros/ohana-admin)** — Admin panel — Angular

This frontend renders the public-facing menu, handles cart logic, and orchestrates the customer ordering flow.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) + React
- **Language:** TypeScript
- **Styling:** styled-components + Ant Design
- **State management:** Redux Toolkit
- **HTTP client:** fetch with custom hooks
- **Deploy:** Vercel (CI/CD via GitHub Actions)

## ✨ Features

- 📱 Responsive product catalog with dynamic categories
- 🛒 Cart with persistent state across sessions
- Phone-based guest checkout with Pix payment (QR code + copy-paste)
- 🍣 Combo customization (when applicable)
- 💬 WhatsApp integration for order placement
- ⚡ SSR/SSG with Next.js for performance and SEO

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm / pnpm / yarn

### Installation

```bash
git clone https://github.com/danieltquadros/ohana_sushi.git
cd ohana_sushi
npm install
```

### Running locally

```bash
npm run dev
```

App will be available at [http://localhost:3000](http://localhost:3000).

## 🌐 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://<api-url>/api
```

For production, point to the production API:
`https://ohana-api-prd.onrender.com/api`

## 🏗️ Project Structure

```
src/
├── app/             # Next.js App Router pages and layouts
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── store/           # Redux slices and store config
├── styles/          # Global styles
└── utils/           # Helpers and constants
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## ☁️ Deployment

- **Production:** Vercel (auto-deploy on push to `master`)
- **Preview:** Vercel (auto-deploy on push to `development`)
- **Domain:** Custom domain via Hostinger DNS (CNAME → Vercel)

## 📄 License

MIT
