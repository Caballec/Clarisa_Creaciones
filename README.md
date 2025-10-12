# Clarisa Creaciones — Next.js + TypeScript GitHub Template


A ready-to-push GitHub project template for **Clarisa Creaciones**: a personal site + photo-magnet shop with client-side image upload & preview, size selection, live price calculation, and a Stripe-ready checkout skeleton.


**Tech choices**
- **Next.js** (App Router + TypeScript)
- **Tailwind CSS** for styling
- **react-easy-crop** for image cropping/preview
- **Stripe** skeleton (server API route ready; add your secret key)
- Image uploads demo using **Cloudinary** (instructions included)
- Deploy to **Vercel** from GitHub


---


## Project structure


```
clarisa-creaciones/
├─ .github/workflows/ci.yml
├─ public/
│ └─ favicon.ico
├─ src/
│ ├─ app/
│ │ ├─ layout.tsx
│ │ ├─ page.tsx # home
│ │ └─ shop/
│ │ ├─ page.tsx # shop listing
│ │ └─ customize/[id]/page.tsx # customization UI
│ ├─ components/
│ │ ├─ Header.tsx
│ │ ├─ PriceBadge.tsx
│ │ └─ ImageUploader.tsx
│ ├─ lib/
│ │ ├─ prices.ts
│ │ └─ cloudinary.ts
│ └─ styles/globals.css
├─ .env.example
├─ package.json
├─ tsconfig.json
├─ next.config.js
├─ tailwind.config.js
└─ README.md
