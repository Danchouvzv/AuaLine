# AuaLine - Air-to-Ink Marketplace

AuaLine is an innovative eco-friendly marketplace that transforms air pollution into sustainable ink products.

## Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS + shadcn/ui, Framer Motion v11, Three.js
- **BaaS / Backend**: Firebase v10 (Auth, Firestore, Storage, Functions, App Check, Messaging)
- **Additional Services**: Stripe Payments, Algolia Search, SendGrid, Cloudflare CDN, Google Analytics 4, Gemini 1.5 Pro

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

## Project Structure

The project follows Next.js App Router structure with route groups:

- `(marketing)` - Landing pages, about, impact calculator
- `(shop)` - Product catalog, product details, cart, checkout
- `(blog)` - Blog posts and listings
- `(account)` - User account, orders, settings
- `admin` - Admin panel (protected by RBAC)

## Features

- **3D Animations**: Interactive product displays using Three.js
- **Eco Impact Calculator**: Calculate environmental savings
- **Secure Auth**: Firebase Authentication with role-based access
- **Responsive Design**: Mobile-first approach with dark/light mode
- **Real-time Updates**: Live inventory and order tracking

## License

Private - All rights reserved 