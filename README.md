# HyeAero.AI Frontend

A modern, professional customer dashboard for **HyeAero.AI — The Aircraft Research & Valuation Consultant Platform**. Built with Next.js, TypeScript, and TailwindCSS, this SaaS platform provides real-time AI-powered aircraft research, market analysis, and valuation services.

## 🎯 Mission

HyeAero.AI is a real-time AI assistant that helps users and internal brokers research aircraft models, compare values, and assess acquisition opportunities using Hye Aero's proprietary market data, resale history, and performance analytics. The platform emphasizes recent, real-time data updates to provide the most accurate market insights.

## 🛠️ Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Icons**: Heroicons
- **State Management**: React Context API (AuthContext)
- **Storage**: localStorage (for demo/auth state)

## 📁 Project Structure

```
frontend/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with Navigation & Footer
│   ├── page.tsx             # Home/Landing page
│   ├── globals.css          # Global styles & Tailwind imports
│   ├── not-found.tsx         # Custom 404 page
│   ├── signup/              # Signup page
│   ├── login/               # Login page
│   ├── onboard/             # Multi-step onboarding flow
│   ├── research/            # Research dashboard with tabs
│   ├── market-data/         # Market data & analytics
│   ├── about/               # About page
│   ├── pricing/             # Pricing plans (Free & Pro)
│   ├── documentation/       # Documentation
│   ├── contact/             # Contact page
│   ├── get-started/         # Get started guide
│   └── profile/             # User profile (protected)
├── components/              # Reusable React components
│   ├── Navigation.tsx       # Main navigation bar
│   ├── Footer.tsx           # Site footer
│   └── Logo.tsx             # HyeAero.AI logo component
├── contexts/                # React Context providers
│   └── AuthContext.tsx      # Authentication state management
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.mjs       # PostCSS configuration
└── next.config.mjs          # Next.js configuration
```

## 📄 Page Architecture

### Public Pages

#### 1. **Home Page** (`/`)
- **Purpose**: Landing page introducing the platform
- **Features**:
  - Hero section with platform value proposition
  - Real-time data highlight
  - Purpose and workflow explanation
  - Call-to-action buttons (redirect to `/signup`)
- **Access**: Public

#### 2. **Signup Page** (`/signup`)
- **Purpose**: User registration
- **Fields**:
  - Full Name (required)
  - Email (required)
  - Password (required, min 8 chars)
  - Country (optional)
- **Features**:
  - Email/password signup
  - OAuth placeholders (Google, Microsoft)
  - Redirects to `/onboard` after signup
- **Access**: Public

#### 3. **Login Page** (`/login`)
- **Purpose**: User authentication
- **Fields**:
  - Email (required)
  - Password (required)
- **Features**:
  - Email/password login
  - OAuth placeholders
  - "Remember me" checkbox
  - Redirects to `/research` after login
- **Access**: Public

#### 4. **Onboarding Page** (`/onboard`)
- **Purpose**: Multi-step user onboarding flow
- **Steps**:
  1. **Role Selection** (required)
     - Aircraft Buyer, Broker, Operator, Investor/Lessor, Just researching
  2. **Aircraft Interest** (optional)
     - Multi-select from 15 popular aircraft models
     - Skip option available
  3. **Region Focus** (optional)
     - North America, Europe, Middle East, Asia-Pacific, Global
     - Skip option available
  4. **Completion**
     - Summary of preferences
     - Redirects to `/research` dashboard
- **Features**:
  - Progress indicator (step X of 4, percentage)
  - Previous/Next navigation buttons
  - Skip functionality (clears selections)
  - Data validation
- **Access**: Authenticated users only (redirects to `/signup` if not logged in)

#### 5. **About Page** (`/about`)
- **Purpose**: Platform information and mission
- **Access**: Public

#### 6. **Pricing Page** (`/pricing`)
- **Purpose**: Display subscription plans
- **Plans**:
  - **Free Plan**: Basic features, limited usage
  - **Pro Plan**: Unlimited features, advanced ML, reports
- **Features**:
  - Feature comparison
  - Clear differentiation between plans
  - CTAs redirect to `/signup`
- **Access**: Public

#### 7. **Documentation Page** (`/documentation`)
- **Purpose**: User guides and resources
- **Access**: Public

#### 8. **Contact Page** (`/contact`)
- **Purpose**: Contact form and information
- **Access**: Public

#### 9. **Get Started Page** (`/get-started`)
- **Purpose**: Onboarding guide for new users
- **Features**:
  - Step-by-step instructions
  - Redirects authenticated users to `/research`
- **Access**: Public (redirects authenticated users)

### Protected Pages

#### 10. **Research Dashboard** (`/research`)
- **Purpose**: Main research tools and AI consultant
- **Tabs**:
  1. **Ask Consultant** (AI Chat)
     - Redirects guests to `/signup`
     - Available for authenticated users only
  2. **Market Comparison**
  3. **Price Estimator**
  4. **Resale Advisory**
- **Features**:
  - Tab-based navigation
  - Protected chat interface
- **Access**: Authenticated users only

#### 11. **Market Data Page** (`/market-data`)
- **Purpose**: Aggregated market analytics and charts
- **Features**:
  - Market trends visualization
  - Price distribution charts
  - Aggregated data only (no per-source toggles)
  - No raw timestamps or logs
- **Access**: Authenticated users only

#### 12. **Profile Page** (`/profile`)
- **Purpose**: User account management
- **Tabs**:
  1. **Subscription**: Plan status, upgrade options
  2. **Usage Limits**: Research queries, data access, downloads
  3. **Download History**: Past report downloads
  4. **Billing**: Payment methods, billing history
- **Security**: Shows 404 page if accessed without authentication
- **Access**: Authenticated users only

### Error Pages

#### 13. **404 Page** (`/not-found` or any non-existent route)
- **Purpose**: Custom 404 error page
- **Features**:
  - Professional design matching brand
  - "Go to Home" and "Go Back" buttons
  - Contact support link
- **Access**: Public (automatically shown for invalid routes)

## 🔐 Authentication & Authorization

### Auth Flow

1. **Guest User**:
   - Can browse public pages (Home, About, Pricing, etc.)
   - Cannot access protected pages (Research, Market Data, Profile)
   - Redirected to `/signup` when trying to use chat or access protected routes

2. **Signup Flow**:
   - User signs up → `/signup`
   - Redirects to `/onboard` (multi-step onboarding)
   - Completes onboarding → `/research` dashboard

3. **Login Flow**:
   - User logs in → `/login`
   - Redirects to `/research` dashboard

4. **Logout**:
   - Clears user data and onboarding data from localStorage
   - Redirects to home page

### Protected Routes

- `/research` - Requires authentication
- `/market-data` - Requires authentication
- `/profile` - Requires authentication (shows 404 if not authenticated)

### Route Protection

- **Profile Page**: Shows custom 404 page if accessed without authentication (security best practice)
- **Research Page**: Chat interface redirects guests to signup
- **Onboarding Page**: Redirects to signup if not authenticated, prevents revisiting if already completed

## 🎨 Design System

### Colors

- **Primary**: Blue shades (`primary-50` to `primary-900`)
- **Accent**: Complementary colors for highlights
- **Neutral**: Gray scale for text and backgrounds

### Typography

- **Font Family**: Inter, system-ui, sans-serif
- **Modern, clean typography** for professional appearance

### Components

- **Logo**: Custom aircraft icon with "HyeAero.AI" branding
- **Navigation**: Sticky top navigation with mobile menu
- **Footer**: Multi-column footer with links and branding

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

Currently uses localStorage for authentication state. In production, this should be replaced with:
- Backend API integration
- JWT tokens or session management
- Secure cookie storage

## 📝 Key Features

### User Experience

- **Low-friction signup**: Simple email/password registration
- **Guided onboarding**: Multi-step flow to capture user preferences
- **Protected content**: Secure access to research tools and data
- **Mobile responsive**: Works on all device sizes
- **Professional UI**: Modern, clean design with aviation theme

### Security

- **Route protection**: Protected pages show 404 instead of revealing route existence
- **Auth state management**: Centralized authentication context
- **Data clearing**: Proper cleanup on logout

### Data Management

- **Onboarding data**: Stored in localStorage (should be moved to backend)
- **User preferences**: Role, aircraft interests, region
- **Skip functionality**: Properly clears selections when skipping optional steps

## 🔄 State Management

### AuthContext

- **User state**: Email, plan (free/pro)
- **Authentication status**: `isAuthenticated` boolean
- **Methods**: `login()`, `logout()`, `signup()`
- **Storage**: localStorage (temporary, should use backend)

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real authentication with JWT tokens
- [ ] Database integration for user preferences
- [ ] AI chat implementation
- [ ] Real-time market data integration
- [ ] Report generation and download
- [ ] Payment processing for Pro subscriptions
- [ ] Email verification flow
- [ ] Password reset functionality

## 📚 Notes

- This is a **customer-facing dashboard**, not an admin panel
- No scraper controls, raw data views, or ML training options are exposed
- Focus on user experience and data presentation
- All sensitive operations should be handled server-side

## 🤝 Contributing

This is a proprietary project for HyeAero.AI. For internal development guidelines, please refer to the project documentation.

---

**Built with ❤️ for HyeAero.AI**
