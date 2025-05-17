# 🌍 AuaLine | Transforming Air Pollution into Art

<div align="center">
  <img src="https://i.imgur.com/5ZLUrCn.png" alt="AuaLine Logo" width="400"/>
  
  <p><em>From pollution to creation: Sustainable ink products for a cleaner future</em></p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28)](https://firebase.google.com/)
</div>

---

## 📌 Overview

**AuaLine** is pioneering the revolution in sustainable products by transforming air pollution into premium ink. Our marketplace connects eco-conscious consumers with artisanal products created through our proprietary air-to-ink technology.

> *"We don't just remove pollution; we transform it into something beautiful."*

<details>
<summary>💨 ➡️ 🖋️ How Our Technology Works</summary>
<br>
Our patented process captures particulate matter (PM2.5) from urban air pollution, separating carbon particles that would have entered our lungs. These purified carbon particles are processed through a series of environmentally-friendly steps and transformed into high-quality, non-toxic ink products.

This process not only cleans the air but gives pollution a second life as a creative medium, completing a beautiful circular economy model.
</details>

---

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3 align="center">🔐 Authentication System</h3>
      <ul>
        <li>Secure email/password authentication</li>
        <li>Single-click Google Sign-in</li>
        <li>Role-based access control</li>
        <li>Personalized user dashboards</li>
        <li>Account recovery workflows</li>
        <li>Session management & security</li>
      </ul>
    </td>
    <td width="50%">
      <h3 align="center">🛒 Shopping Experience</h3>
      <ul>
        <li>Advanced filtering and search capabilities</li>
        <li>Responsive cart with persistent storage</li>
        <li>Real-time inventory management</li>
        <li>Secure Stripe payment integration</li>
        <li>Order tracking & history</li>
        <li>Wishlist functionality</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">📊 Environmental Impact</h3>
      <ul>
        <li>Real-time impact visualization</li>
        <li>Personal environmental savings calculator</li>
        <li>Community contribution tracking</li>
        <li>Achievement badges & gamification</li>
        <li>Carbon offset metrics</li>
        <li>Regional pollution reduction maps</li>
      </ul>
    </td>
    <td width="50%">
      <h3 align="center">📚 Content & Education</h3>
      <ul>
        <li>Interactive educational resources</li>
        <li>Behind-the-scenes manufacturing journey</li>
        <li>Environmental news & updates</li>
        <li>Community stories & testimonials</li>
        <li>Creative inspiration gallery</li>
        <li>Sustainable living guides</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🔥 Live Demo

Experience the AuaLine marketplace: [aualine.com](https://aualine.com) (coming soon)

<div align="center">
  <img src="https://i.imgur.com/QfYYsL1.png" alt="AuaLine Application Screenshot" width="800"/>
</div>

---

## 🚀 Technology Stack

Our application leverages cutting-edge technologies to deliver a seamless user experience:

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) with App Router for optimized routing & SSR
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and developer experience
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **State Management**: React Context API with custom hooks
- **3D Visualization**: Three.js for interactive product displays
- **Animations**: Framer Motion for fluid UI transitions

### Backend & Infrastructure
- **Authentication**: Firebase Authentication with multi-provider support
- **Database**: Firebase Firestore for real-time data synchronization
- **Storage**: Firebase Storage for media assets
- **Serverless Functions**: Firebase Cloud Functions
- **Analytics**: Firebase Analytics & Google Analytics 4
- **Payment Processing**: Stripe with secure checkout flow
- **Search**: Algolia for lightning-fast product search (planned)
- **Email**: SendGrid for transactional emails (planned)
- **CDN**: Cloudflare for global content delivery (planned)

---

## 📋 Prerequisites

Before diving into AuaLine development, ensure you have:

- **Node.js**: v18.0.0+ ([download](https://nodejs.org/))
- **npm**: v9.0.0+ (comes with Node.js)
- **Git**: Latest version ([download](https://git-scm.com/))
- **Code Editor**: We recommend [VS Code](https://code.visualstudio.com/) with these extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Firebase Explorer

---

## 🛠️ Getting Started

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/Danchouvzv/AuaLine.git

# Navigate to project directory
cd AuaLine

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Create .env.local file from example
cp .env.local.example .env.local

# Open and edit .env.local with your credentials
```

### 3. Firebase Configuration

1. Create a project in the [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password and Google providers)
3. Create Firestore Database in production mode
4. Enable Storage
5. Copy your Firebase config to `.env.local`

<details>
<summary>View detailed Firebase setup instructions</summary>

1. Navigate to [Firebase Console](https://console.firebase.google.com) and click "Add Project"
2. Name your project "AuaLine" (or your preferred name)
3. Configure Google Analytics (optional)
4. Click "Create Project"
5. From the project overview, click the web icon (</>) to add a web app
6. Register your app with nickname "AuaLine Web" and check "Firebase Hosting"
7. Copy the provided firebaseConfig object
8. Add each value to your `.env.local` file with the NEXT_PUBLIC_FIREBASE_* prefix

For Authentication:
1. Go to Authentication > Sign-in method
2. Enable Email/Password and Google providers

For Firestore:
1. Go to Firestore Database > Create database
2. Start in production mode
3. Choose a location nearest to your target users
4. Set up security rules as needed

</details>

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application running.

---

## 📂 Project Structure

```
AuaLine/
├── public/               # Static assets
│   ├── images/           # Image assets
│   ├── fonts/            # Custom fonts
│   └── icons/            # Favicon and app icons
│
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (marketing)/  # Marketing route group
│   │   ├── (shop)/       # Shop route group
│   │   ├── (blog)/       # Blog route group
│   │   ├── (account)/    # User account route group
│   │   └── admin/        # Admin section
│   │
│   ├── components/       # Reusable UI components
│   │   ├── blog/         # Blog components
│   │   ├── cart/         # Shopping cart components
│   │   ├── header/       # Navigation & header components
│   │   ├── hero/         # Hero section components
│   │   ├── impact/       # Environmental impact visualizations
│   │   ├── layout/       # Layout components
│   │   ├── sections/     # Page section components
│   │   ├── shop/         # Shop & product components
│   │   └── ui/           # Basic UI components
│   │
│   ├── contexts/         # React Context providers
│   │
│   ├── lib/              # Utility functions & services
│   │   ├── firebase/     # Firebase service configurations
│   │   ├── hooks/        # Custom React hooks
│   │   ├── stripe/       # Stripe integration utilities
│   │   └── utils/        # Helper functions
│   │
│   └── types/            # TypeScript type definitions
│
├── .env.local.example    # Example environment variables
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies & scripts
```

---

## 🧪 Development & Testing

### Available Scripts

```bash
# Development server
npm run dev

# Build production version
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Format code with Prettier
npm run format

# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Run all tests with coverage
npm run test:coverage
```

### Design System

AuaLine follows a comprehensive design system with:

- **Color Palette**: 
  - Primary: #3A9561 (Forest Green)
  - Secondary: #1D3A29 (Deep Forest)
  - Accent: #F5A623 (Amber)
  - Error: #E53935 (Red)
  - Background light: #F9FAFB
  - Background dark: #1F2937

- **Typography**:
  - Headings: Montserrat (var(--font-montserrat))
  - Body: Inter (var(--font-inter))

- **Component Library**: shadcn/ui extended with custom components
- **Dark Mode**: Full support with automatic system preference detection

---

## 📱 Responsive Design

AuaLine is built with a mobile-first approach, ensuring perfect usability across:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Screens**: > 1280px

Key responsive features include:
- Adaptive navigation (hamburger menu on smaller screens)
- Fluid typography and spacing
- Optimized images for different screen sizes
- Touch-friendly interaction patterns

<div align="center">
  <img src="https://i.imgur.com/6ZRMc9q.png" alt="Responsive Design Showcase" width="800"/>
</div>

---

## 🔒 Security

Security is paramount in our implementation:

- **Authentication**: Secure Firebase JWT-based auth with automatic session refresh
- **Data Protection**: Field-level Firestore security rules
- **API Security**: Protected API routes with proper authentication checks
- **Payment Security**: Stripe's secure elements for PCI compliance
- **Input Validation**: Comprehensive client and server-side validation
- **CSRF Protection**: Built-in protection for API routes
- **Environment Variables**: Proper management of secrets and configurations
- **Regular Updates**: Dependency monitoring and updates

---

## 🚢 Deployment

### Recommended: Vercel

For the smoothest deployment experience:

```bash
# Login to Vercel
vercel login

# Deploy
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Other Deployment Options

- **Firebase Hosting**: 
  ```bash
  npm run build
  firebase deploy
  ```

- **Netlify**:
  ```bash
  npm run build
  netlify deploy
  ```

- **AWS Amplify**:
  Connect your repository for automatic CI/CD deployment

---

## 🔄 CI/CD Pipeline

Our continuous integration pipeline includes:

1. **Code Linting & Type Checking**
2. **Automated Tests**
3. **Preview Deployments**
4. **Production Deployment**

GitHub Actions workflow is configured for automated testing and deployment.

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get involved:

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Commit** your changes: `git commit -m 'Add amazing feature'`
5. **Push** to the branch: `git push origin feature/amazing-feature`
6. Submit a **Pull Request**

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

### Code Style & Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: AirBnB configuration with custom rules
- **Prettier**: Consistent code formatting
- **Component Structure**: Atomic design principles
- **Comments**: JSDoc style for functions and components

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 The Team

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/Danchouvzv">
          <img src="https://github.com/Danchouvzv.png" width="100px;" alt="Danial" style="border-radius:50%"/>
          <br />
          <sub><b>Danial</b></sub>
        </a>
        <br />
        <sub>Lead Developer</sub>
      </td>
      <!-- Add more team members here -->
    </tr>
  </table>
</div>

---

## 📞 Support & Contact

- **Email**: [support@aualine.com](mailto:support@aualine.com)
- **Twitter**: [@AuaLine](https://twitter.com/AuaLine)
- **Discord**: [Join our community](https://discord.gg/aualine)

---

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org) for the incredible framework
- [Vercel](https://vercel.com) for deployment infrastructure
- [Firebase](https://firebase.google.com) for backend services
- [Tailwind CSS](https://tailwindcss.com) for styling utilities
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- All our early adopters and supporters

---

<div align="center">
  <img src="https://i.imgur.com/Zhvz1dA.png" alt="AuaLine Environmental Impact" width="400"/>
  <p><strong>Every product purchased with AuaLine helps purify 1m³ of air.</strong></p>
  <br/>
  <p>Made with 🖤 and clean air by the AuaLine Team</p>
</div> 