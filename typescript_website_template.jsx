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
│  └─ favicon.ico
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx            # home
│  │  └─ shop/
│  │     ├─ page.tsx         # shop listing
│  │     └─ customize/[id]/page.tsx  # customization UI
│  ├─ components/
│  │  ├─ Header.tsx
│  │  ├─ PriceBadge.tsx
│  │  └─ ImageUploader.tsx
│  ├─ lib/
│  │  ├─ prices.ts
│  │  └─ cloudinary.ts
│  └─ styles/globals.css
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

## Files — copy into repo

### package.json

```json
{
  "name": "clarisa-creaciones",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-easy-crop": "4.6.0",
    "axios": "1.5.0",
    "stripe": "12.13.0"
  },
  "devDependencies": {
    "@types/react": "18.2.21",
    "@types/node": "20.5.1",
    "typescript": "5.6.2",
    "tailwindcss": "4.3.1",
    "autoprefixer": "10.4.14",
    "postcss": "8.4.28"
  }
}
```

### .env.example

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  }
}
module.exports = nextConfig
```

### tailwind.config.js

```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "lib": ["DOM", "ES2021"],
    "module": "ESNext",
    "moduleResolution": "Node",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### src/styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #__next { height: 100%; }
body { @apply bg-slate-50 text-slate-900; }
```

### src/lib/prices.ts

```ts
export type SizeKey = '2x2_nb' | '2x2_b' | 'polaroid' | '4x5_3' | '4x5_5b'

export const PRICES: Record<SizeKey, { base: number; textAddon: number }> = {
  // 2x2 without border
  '2x2_nb': { base: 2.6, textAddon: 1.0 },
  // 2x2 with border
  '2x2_b': { base: 2.6, textAddon: 1.0 },
  // 3.5w x 4h Polaroid
  'polaroid': { base: 3.6, textAddon: 1.5 },
  // 4w x 5.3h
  '4x5_3': { base: 5.0, textAddon: 2.0 },
  // 4w x 5.5 with border
  '4x5_5b': { base: 5.5, textAddon: 2.0 }
}
```

### src/lib/cloudinary.ts

```ts
// Simple helper to create an unsigned upload URL for Cloudinary (or use your own signed server)
export function buildUploadUrl() {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  return `https://api.cloudinary.com/v1_1/${cloud}/image/upload`
}
```

### src/components/Header.tsx

```tsx
import Link from 'next/link'
export default function Header(){
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold">Clarisa Creaciones</a>
        </Link>
        <nav>
          <Link href="/shop"><a className="ml-4">Shop</a></Link>
        </nav>
      </div>
    </header>
  )
}
```

### src/components/PriceBadge.tsx

```tsx
import React from 'react'
export default function PriceBadge({price}:{price:number}){
  return <span className="inline-block bg-gray-800 text-white py-1 px-3 rounded">${price.toFixed(2)}</span>
}
```

### src/components/ImageUploader.tsx

```tsx
import React, {useState, useCallback} from 'react'
import Cropper from 'react-easy-crop'

export default function ImageUploader({onImage}: {onImage: (blob:Blob, previewUrl:string)=>void}){
  const [file, setFile] = useState<File| null>(null)
  const [crop, setCrop] = useState({x:0,y:0})
  const [zoom, setZoom] = useState(1)

  const onSelect = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const f = e.target.files?.[0]
    if(!f) return
    setFile(f)
  }

  const createPreview = useCallback(async ()=>{
    if(!file) return
    const img = await file.arrayBuffer()
    const blob = new Blob([img], {type: file.type})
    const url = URL.createObjectURL(blob)
    // For simplicity we send original blob and preview URL; server can perform crop if desired
    onImage(blob, url)
  }, [file, onImage])

  return (
    <div>
      <input type="file" accept="image/*" onChange={onSelect} />
      {file && (
        <div className="mt-4">
          <div style={{position:'relative', width:300, height:300}}>
            <Cropper
              image={URL.createObjectURL(file)}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
            />
          </div>
          <div className="mt-2">
            <button onClick={createPreview} className="btn">Use this image</button>
          </div>
        </div>
      )}
    </div>
  )
}
```

### src/app/layout.tsx

```tsx
import './styles/globals.css'
import Header from '../components/Header'

export const metadata = { title: 'Clarisa Creaciones' }

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
```

### src/app/page.tsx (Home)

```tsx
export default function Home(){
  return (
    <div>
      <h1 className="text-3xl font-bold">Clarisa Creaciones</h1>
      <p className="mt-4">Handmade photo magnets — upload, customize, and order.</p>
    </div>
  )
}
```

### src/app/shop/page.tsx (Shop listing)

```tsx
import Link from 'next/link'
import PriceBadge from '../../components/PriceBadge'
import { PRICES } from '../../lib/prices'

const PRODUCTS = [
  { id: '2x2_nb', title: '2x2 (no border)', key: '2x2_nb' },
  { id: '2x2_b', title: '2x2 (with border)', key: '2x2_b' },
  { id: 'polaroid', title: 'Polaroid 3.5x4', key: 'polaroid' },
  { id: '4x5_3', title: '4 x 5.3', key: '4x5_3' },
  { id: '4x5_5b', title: '4 x 5.5 (border)', key: '4x5_5b' }
]

export default function Shop(){
  return (
    <div>
      <h2 className="text-2xl font-semibold">Shop</h2>
      <ul className="grid grid-cols-1 gap-4 mt-4">
        {PRODUCTS.map(p=> (
          <li key={p.id} className="p-4 bg-white rounded shadow-sm flex items-center justify-between">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-slate-500">Sample magnet</div>
            </div>
            <div className="flex items-center gap-3">
              <PriceBadge price={PRICES[p.key as any].base} />
              <Link href={`/shop/customize/${p.id}`}><a className="btn">Customize</a></Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### src/app/shop/customize/[id]/page.tsx (Customization page)

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from '../../../../components/ImageUploader'
import { PRICES } from '../../../../lib/prices'

export default function Customize({ params }:{params:{id:string}}){
  const { id } = params
  const product = PRICES[id as any]
  const [hasText, setHasText] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [preview, setPreview] = useState<string| null>(null)
  const router = useRouter()

  const handleImage = (blob:Blob, previewUrl:string)=>{
    setPreview(previewUrl)
    // TODO: upload to server or cloudinary
  }

  const computePrice = ()=>{
    if(!product) return 0
    const base = product.base
    const addon = hasText ? product.textAddon : 0
    return (base + addon) * quantity
  }

  const handleCheckout = async ()=>{
    // Create order on your server and redirect to Stripe Checkout
    alert('This template includes a Stripe skeleton. Add server secret key and implement checkout API.')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Customize</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ImageUploader onImage={handleImage} />
          {preview && <img src={preview} alt="preview" className="mt-3 max-w-full border rounded" />}
        </div>
        <div>
          <div className="mb-3">Options</div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={hasText} onChange={(e)=>setHasText(e.target.checked)} /> Add text (+${product?.textAddon?.toFixed(2)})</label>
          <div className="mt-3">Quantity <input type="number" value={quantity} min={1} onChange={(e)=>setQuantity(Number(e.target.value))} className="ml-2 border rounded px-2" /></div>
          <div className="mt-4">Total: <strong>${computePrice().toFixed(2)}</strong></div>
          <div className="mt-4">
            <button onClick={handleCheckout} className="btn">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Server API skeleton — src/app/api/checkout/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-11-01' })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // body should contain items, images, shipping info, etc.
    // Build line_items from body.items

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: body.items || [],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`
    })

    return NextResponse.json({ url: session.url })
  } catch (err:any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
```

> Note: Add `NEXT_PUBLIC_BASE_URL` to your `.env` (e.g. `https://your-site.vercel.app`).

---

## GitHub Actions CI (simple build)

### .github/workflows/ci.yml

```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
```

---

## Next steps & recommendations

1. **Stripe:** Add your Stripe secret key to `.env` and implement `body.items` mapping to Stripe `line_items` in `src/app/api/checkout/route.ts`.
2. **Cloudinary / Storage:** Implement a signed upload endpoint on the server or use client unsigned preset (Cloudinary docs). `src/lib/cloudinary.ts` includes a helper.
3. **Persistence:** Add a small DB (Supabase/Postgres) to store orders and image metadata.
4. **Admin:** Add an admin page for viewing orders and printing instructions.
5. **Security:** Never commit `.env`.

---

If you want, I can now (pick one):

- **A)** Create a ZIP of this project for download; OR
- **B)** Provide the exact `git` commands to create a GitHub repo, push these files, and enable Vercel deploy; OR
- **C)** I can push this to a GitHub repo for you (I will give you the shell commands you can run locally to finish the push). 

Choose A, B, or C and I will continue. If you want any changes to prices, labels, or UX before I generate the ZIP / push commands, tell me and I’ll include them automatically.
