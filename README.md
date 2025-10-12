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
```


---


## Key product sizes & pricing (USD)


- **2x2 without border** → $2.60
- **2x2 with border** → same $2.60; *text* +$1.00 per photo
- **3.5w x 4h (Polaroid frame)** → $3.60; *text* +$1.50 per photo
- **4w x 5.3h** → $5.00; with text total $7.00 per photo
- **4w x 5.5 with border** → $5.50; text +$2.00 per photo


Currency: **USD**


Assumptions made:
- "Text" is an optional field the user can request to add to the magnet; price additions listed above apply per photo.
- The project includes a cart (users can add multiple items).


---


## How to use this template


1. Copy these files into a new GitHub repository named `clarisa-creaciones`.
2. Create a `.env` from `.env.example` and fill in keys (Stripe secret, Cloudinary). Do not commit secrets.
3. `npm install` then `npm run dev` to test locally.
4. Push to GitHub and connect the repo to Vercel for automatic deployment.


---
