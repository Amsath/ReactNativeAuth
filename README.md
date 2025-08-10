# React Native Authentication App 

A React Native app built from scratch that implements **Login**, **Signup**, and **Authentication** state management using **React Context API**. The app also uses **React Navigation** for screen management and **AsyncStorage** for persisting user sessions.

---

## 📱 Features

- **Authentication Context** using React Context API
- **Login / Signup Flow**
- Form validation with inline error messages
- Password visibility toggle with `react-native-vector-icons`
- Persistent authentication with AsyncStorage
- Navigation between Login, Signup, and Home
- TypeScript support for type-safe development

---

## 🛠 Tech Stack

- **React Native CLI** 
- **TypeScript**
- **React Context API**
- **React Navigation v6**
- **AsyncStorage** (`@react-native-async-storage/async-storage`)
- **React Native Vector Icons** (Feather)
- **@react-native-community/masked-view**
- **react-native-gesture-handler**  
- **react-native-reanimated**

---

## 📂 Folder Structure
📦 ReactNativeAuth
├── 📁 src
│ ├── 📁 contexts
│ │ └── AuthContext.tsx      # Authentication state & methods
│ ├── 📁 screens
│ │ ├── LoginScreen.tsx      # Login form with email & password
│ │ ├── SignupScreen.tsx     # Signup form with name, email & password
│ │ └── HomeScreen.tsx       # Shows user info & logout
│ ├── 📁 navigation
│ │ └── AppNavigator.tsx     # Stack navigation for auth & app flow
│ ├── 📁 components
│ │ └── PrimaryButton.tsx
| | └── FormInput.tsx 
| ├── 📁 utils/
│    └── validators.ts       # Email & password validation helpers
├── App.tsx
├── package.json
├── tsconfig.json
└── README.md

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/ReactNativeAuth.git
cd ReactNativeAuth

### 2️⃣ Install Dependencies
```bash
yarn install

### 3️⃣ Install Pods (iOS Only)
```bash
cd ios && pod install && cd ..

### 4️⃣ Link Vector Icons (RN 0.70+ auto-links, but check if needed)
```gradle
// android/app/build.gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

### 5️⃣ Run the App
```bash
# Android
yarn android

# iOS
yarn ios

## 📸 Screenshots
![alt text](ReactNativeAuth3.png) ![alt text](ReactNativeAuth2.png) ![alt text](ReactNativeAuth1.png)

📌 License
This project is licensed under the MIT License - feel free to use it in your own projects.