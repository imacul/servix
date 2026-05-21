# Servix

A modern artisan mobile app demo built with Expo, React Native, and TypeScript.

## 🚀 Overview

Servix is a demonstration React Native application showcasing best practices for building cross-platform mobile applications. Built with the latest tools and frameworks, it provides a solid foundation for artisan-focused mobile development.

## 📱 Features

- **Cross-platform support** - iOS, Android, and Web
- **TypeScript** - Full type safety and modern development experience
- **Expo Router** - File-based routing for React Native
- **Vector Icons** - Comprehensive icon library with @expo/vector-icons
- **Gradient Support** - Beautiful gradient backgrounds with expo-linear-gradient
- **React 19** - Latest React features and improvements
- **Safe Area Handling** - Proper handling of notches and safe areas
- **Modern Architecture** - Built with Expo's New Architecture enabled

## 🛠️ Tech Stack

- **Framework**: React Native 0.81.5
- **Build Tool**: Expo 54.0.32
- **Language**: TypeScript 5.9.2
- **Routing**: Expo Router 6.0.22
- **UI Framework**: React 19.1.0
- **Additional Libraries**:
  - expo-linear-gradient - Gradient components
  - expo-status-bar - Status bar management
  - react-native-screens - Performance optimizations
  - react-native-safe-area-context - Safe area management
  - @expo/vector-icons - Icon library

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (install via `npm install -g expo-cli`)

## 🎯 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/imacul/servix.git
cd servix
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the app in development mode:

```bash
# Start the development server
npm start

# Run on iOS (requires macOS)
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

The app will open in Expo Go (on physical device or emulator) or your default browser for web.

## 📁 Project Structure

```
servix/
├── app/                    # Application screens and navigation
├── components/             # Reusable React components
├── context/                # React Context for state management
├── data/                   # Data files and utilities
├── assets/                 # Static assets (icons, images)
├── theme/                  # Theme configuration and styles
├── scripts/                # Build and utility scripts
├── App.tsx                 # Root application component
├── index.ts                # Application entry point
├── app.json                # Expo configuration
├── eas.json                # EAS build configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🎨 App Configuration

The app is configured via `app.json` with the following key settings:

- **App Name**: Servix
- **Slug**: servix
- **Version**: 1.0.0
- **Orientation**: Portrait
- **Color Theme**: #1E4D7B (Dark Blue)
- **Package**: com.servix (Android)
- **Platforms**: iOS, Android, Web

### Build Configuration

EAS (Expo Application Services) is configured for simplified building and distribution. See `eas.json` for build profiles.

## 📦 Build & Deployment

### Local Build

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

### EAS Build

```bash
# Build for production
eas build --platform ios
eas build --platform android

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

## 🔧 Available Scripts

- `npm start` - Start the development server
- `npm run ios` - Launch on iOS simulator
- `npm run android` - Launch on Android emulator
- `npm run web` - Launch in web browser

## 🚀 Development Tips

- **Hot Reload**: Enabled by default in Expo development server
- **Fast Refresh**: Automatic component reload on code changes
- **TypeScript**: Strict type checking enabled by default
- **Vector Icons**: Browse available icons at [Expo Icons](https://icons.expo.fyi/)

## 📄 License

MIT

## 👤 Author

[imacul](https://github.com/imacul)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please create an issue on [GitHub](https://github.com/imacul/servix/issues).

---

**Status**: Active Development  
**Created**: March 2026  
**Last Updated**: 2026
