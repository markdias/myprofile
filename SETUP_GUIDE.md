# Setup Guide - Professional Portfolio Website

## ⚠️ IMPORTANT: Fix NPM Permission Issue First

Before proceeding, you need to fix the npm cache permission issue:

```bash
sudo chown -R $(whoami) ~/.npm
```

After running this command, install dependencies:

```bash
cd /Users/mdias9/myprojects/myprofile
npm install
```

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "my-portfolio")
4. Follow the setup wizard

### 2. Enable Firebase Services

#### Authentication
1. Go to Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Click "Save"

#### Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in **production mode**
4. Choose a location closest to you

#### Storage
1. Go to Storage
2. Click "Get started"
3. Start in **production mode**

### 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click the web icon (`</>`)
4. Register your app with a nickname
5. Copy the `firebaseConfig` object

### 4. Configure Environment Variables

Create `.env` file:

```bash
cp .env.example .env
```

Fill in your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=my-portfolio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-portfolio
VITE_FIREBASE_STORAGE_BUCKET=my-portfolio.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 5. Create Admin User

1. Go to Firebase Console > Authentication > Users
2. Click "Add user"
3. Enter your email and a secure password
4. This will be your admin login

### 6. Set Up Security Rules

#### Firestore Rules

Go to Firestore Database > Rules and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{project} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /sections/{section} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /contacts/{contact} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Storage Rules

Go to Storage > Rules and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Running the Application

```bash
# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## First Steps

1. **Visit the site**: `http://localhost:5173`
2. **Login to admin**: `http://localhost:5173/admin/login`
3. **Add your first project**: Go to Portfolio Projects tab
4. **Create custom sections**: Go to Section Builder tab

## Deployment (Optional)

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login
firebase login

# Initialize hosting
firebase init hosting
# Choose your project
# Set public directory to: dist
# Configure as single-page app: Yes
# Set up automatic builds: No

# Build and deploy
npm run build
firebase deploy
```

Your site will be live at `https://your-project-id.web.app`

## Troubleshooting

### NPM Install Fails
- Run: `sudo chown -R $(whoami) ~/.npm`
- Clear cache: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

### Firebase Connection Errors
- Check `.env` file exists and has correct values
- Verify Firebase services are enabled
- Check browser console for specific errors

### Admin Login Fails
- Verify user exists in Firebase Console > Authentication
- Check email and password are correct
- Ensure Authentication is enabled

### Images Not Uploading
- Check Storage is enabled in Firebase
- Verify Storage rules are set correctly
- Check file size (max 5MB recommended)

## Next Steps

1. Customize the Hero section with your information
2. Add your portfolio projects through the admin panel
3. Create custom sections for services, testimonials, etc.
4. Update the About section with your bio
5. Test the contact form
6. Deploy to Firebase Hosting
