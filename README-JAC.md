# JAC Billing Management System

A modern Next.js application for managing billing and foreign worker data.

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (redirects to payment-status)
│   ├── payment-status/    # Payment status pages
│   └── foreign-worker/    # Foreign worker pages
├── components/
│   ├── auth/              # Authentication components
│   │   ├── auth-wrapper.tsx
│   │   ├── login-form.tsx
│   │   └── index.ts
│   ├── layout/            # Layout components
│   │   ├── app-sidebar.tsx
│   │   ├── nav-main.tsx
│   │   ├── nav-user.tsx
│   │   ├── team-switcher.tsx
│   │   └── index.ts
│   ├── ui/                # Shadcn UI components
│   └── theme-provider.tsx
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions
```

## Features

- 🔐 **Authentication**: AWS Amplify authentication with custom login form
- 🎨 **Theming**: Light/Dark/System theme support with persistence
- 📱 **Responsive**: Modern responsive design using Tailwind CSS
- 🎯 **Navigation**: Active page highlighting in sidebar navigation
- 🛡️ **Type Safety**: Full TypeScript support
- 📦 **Component Library**: Shadcn UI components
- 🏗️ **Modern Stack**: Next.js 15, React 18, Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm start` - Start production server

## Authentication

The app uses AWS Amplify for authentication. Users can log in with email and password. The logout functionality is available in the user dropdown menu in the sidebar.

## Theme Management

Theme switching is integrated into the user dropdown menu with options for Light, Dark, and System themes. The theme preference is automatically persisted across sessions.
