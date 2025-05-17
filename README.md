# AuaLine - Air-to-Ink Marketplace

AuaLine is an innovative eco-friendly marketplace that transforms air pollution into sustainable ink products. This Next.js application provides a modern, responsive platform for showcasing and selling our unique products while highlighting their environmental impact.

## 🌟 Features

- **Authentication System**
  - Email/Password authentication
  - Google Sign-in integration
  - Protected routes
  - User profile management

- **Shopping Experience**
  - Product catalog with filtering and search
  - Shopping cart functionality
  - Real-time inventory updates
  - Secure checkout process
  - Order history and tracking

- **Environmental Impact Dashboard**
  - Real-time pollution reduction metrics
  - Personal impact statistics
  - Community contribution tracking
  - Environmental achievement badges

- **Blog and Content**
  - Educational articles
  - Process transparency
  - Environmental news
  - Community stories

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **File Storage**: Firebase Storage
- **Analytics**: Firebase Analytics
- **Payment Processing**: Stripe (coming soon)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Git

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Danchouvzv/AuaLine.git
   cd AuaLine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Firebase and other service credentials

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable the following services:
   - Authentication (Email/Password and Google provider)
   - Firestore Database
   - Storage
   - Analytics
3. Add your Firebase configuration to `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   # ... other Firebase variables
   ```

### Stripe Setup (Coming Soon)

1. Create a Stripe account
2. Add your Stripe keys to `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
   STRIPE_SECRET_KEY=your_secret_key
   ```

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/         # Reusable React components
│   ├── blog/          # Blog-related components
│   ├── cart/          # Shopping cart components
│   ├── header/        # Header and navigation
│   ├── hero/          # Hero section components
│   ├── impact/        # Environmental impact components
│   ├── layout/        # Layout components
│   ├── sections/      # Various page sections
│   └── shop/          # Shop-related components
├── contexts/          # React Context providers
├── lib/              # Utility functions and hooks
│   ├── firebase/     # Firebase configuration
│   ├── hooks/        # Custom React hooks
│   └── utils/        # Helper functions
└── types/            # TypeScript type definitions
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Run all tests with coverage
npm run test:coverage
```

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🔒 Security

- All Firebase rules are properly configured
- Environment variables are properly handled
- Authentication state is managed securely
- API routes are protected
- Data validation is implemented

## 🚀 Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
- Follow platform-specific deployment guides
- Ensure environment variables are properly set
- Configure build settings appropriately

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Danial - Lead Developer & Project Owner
- [Add team members here]

## 📞 Support

For support, email [support@aualine.com](mailto:support@aualine.com) or join our Slack channel.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org)
- [Vercel](https://vercel.com)
- [Firebase](https://firebase.google.com)
- [Tailwind CSS](https://tailwindcss.com)
- All our contributors and supporters

---

Made with ❤️ by the AuaLine Team 