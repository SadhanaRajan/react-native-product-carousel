# 🛒 React Native Product Carousel
A compact, animated product browser built with **React Native** and **Expo Router**. It fetches products, animates between cards, and lets you mark favorites with a springy heart.

---

## 🚀 Features
- Animated card transitions: coordinated slide + fade between current and incoming cards.
- Favorite toggle with bounce: heart scales on tap and state is tracked per-product.
- Loading + offline resilience: activity indicator while fetching, sample fallback data on failure, and a retry control.
- Stable layout: SafeArea-friendly, fixed-height cards, and 4-line descriptions to avoid layout jank.
- Cross-platform: runs on iOS, Android, and web via Expo.

---

## 🧭 App Structure
- `app/_layout.tsx` — root stack and theme provider.
- `app/(tabs)/_layout.tsx` — tab navigator.
- `app/(tabs)/index.tsx` — home tab rendering the carousel.
- `app/(tabs)/components/Carousel.js` — animation, navigation controls, and empty/error states.
- `app/(tabs)/components/CardContent.js` — product card layout and favorite heart.
- `app/(tabs)/data/useProducts.js` — fetches products with fallback data and retry logic.

---

## 🖥️ Run Locally
Requirements: Node (LTS), npm or yarn. Expo CLI installs via `npm install`.

```sh
git clone https://github.com/<your-username>/react-native-product-carousel.git
cd react-native-product-carousel
npm install           # or: yarn
npm run start         # opens Expo Dev Tools
```

Common shortcuts from the Expo CLI prompt:
- Press `i` to launch the iOS simulator (macOS + Xcode required).
- Press `a` to launch the Android emulator (Android Studio + running emulator).
- Press `w` to open the web build in your browser.

---

## 📱 View on a Physical Device
1) Install **Expo Go** from the App Store (iOS) or Play Store (Android).  
2) Run `npm run start` locally.  
3) Scan the QR code in the terminal or Expo Dev Tools with your device’s camera (or the scanner inside Expo Go on Android).  
4) The app bundles over your LAN and opens in Expo Go.

If your device and computer are on different networks, switch the connection mode in Expo Dev Tools to “Tunnel” so the QR works over the internet (slower but reliable).

---

## 🛠️ Scripts
- `npm run start` — start the Expo dev server.
- `npm run android` — start and open on Android.
- `npm run ios` — start and open on iOS.
- `npm run web` — start the web build.
- `npm run lint` — run ESLint (Expo config).

---

## 📸 Demo
`./assets/demo.gif`.
