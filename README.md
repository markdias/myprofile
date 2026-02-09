# Professional Portfolio Website

A modern, professional portfolio website built with React, TypeScript, Ant Design, and Firebase.

## Features

- 🎨 **Professional Design**: Sophisticated UI with smooth animations and premium aesthetics
- 🔥 **Firebase Integration**: Authentication, Firestore database, Storage, and Hosting
- 🎯 **Dynamic Section Builder**: Create custom sections with configurable components through admin panel
- 📱 **Fully Responsive**: Beautiful on all devices
- 🛡️ **TypeScript**: Type-safe development
- ⚡ **Vite**: Lightning-fast development and build

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Library**: Ant Design 5.x
- **Build Tool**: Vite
- **Backend**: Firebase (Auth, Firestore, Storage, Hosting)
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Enable Firebase Storage
   - Copy your Firebase config

4. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
   Then fill in your Firebase configuration values.

5. Start the development server:
   ```bash
   npm run dev
   ```

### Firebase Setup

1. **Authentication**: Enable Email/Password authentication in Firebase Console
2. **Firestore**: Create the following collections:
   - `projects` - Portfolio projects
   - `sections` - Custom sections
   - `messages` - Contact form submissions

3. **Storage**: Create folders for:
   - `projects/` - Project images
   - `sections/` - Section component images

### Deployment

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase Hosting:
   ```bash
   firebase init hosting
   ```

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Admin/          # Admin panel components
│   ├── DynamicSection/ # Dynamic section system
│   ├── Layout/         # Header, Footer
│   ├── Hero/           # Hero section
│   ├── Portfolio/      # Portfolio components
│   ├── About/          # About section
│   └── Contact/        # Contact form
├── pages/              # Page components
├── firebase/           # Firebase configuration
├── styles/             # Global styles
├── types/              # TypeScript types
└── theme/              # Ant Design theme

```

## Admin Panel

Access the admin panel at `/admin` to:
- Manage portfolio projects
- Create custom sections with dynamic components
- Configure site settings

## Available Component Types

The section builder includes:
- Text Block (rich text)
- Image Gallery
- Video Embed
- Stats Counter
- Timeline
- Skills Grid
- Testimonials Carousel
- CTA Buttons
- Dividers
- Custom HTML

## License

MIT

## Author

Your Name
