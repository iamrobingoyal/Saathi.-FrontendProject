# Saathi (साथी) 🤝

**"Always by your side."**

Saathi is a multilingual digital banking companion designed to make financial services simple, safe, and accessible for first-time digital users and older generations. It bridges the digital divide by offering a hands-free voice assistant, interactive learning modules, safety quizzes, and highly accessible user interfaces.

---

## 🏆 Hackathon & Team Credits

This project was built during the **frontend-based hackathon challenge** conducted within the university by the **codetochill** club.

- **Team Name**: Komagata Maru
- **Developers**:
  - **Robin Goyal**
  - **Surbhi**

---

## 🌟 Key Features

### 🗣️ Multilingual & Voice Guided
* **Supported Languages**: English, Hindi (हिंदी), Punjabi (ਪੰਜਾਬੀ), Tamil (தமிழ்), Bengali (বাংলা), and Marathi (ਮਰਾठी).
* **Hands-Free Voice Assistant**: Navigate the app using natural speech commands (e.g., *"Check my balance"*, *"How do I stay safe?"*) built using the Web Speech API.

### 🛡️ Safety Center & Scam Education
* **Scam Recognition**: Learn how to spot fake calls, OTP scams, QR code scams, and lottery fraud.
* **Interactive Safety Quizzes**: Practice scenario-based quizzes to test scam-detection skills.

### 📚 Jargon-Free Financial Education
* **Lessons**: Short, guided explanations of core banking concepts (UPI, ATM, PIN, OTP, Interest, Loans, and Insurance) with voice narration.
* **Knowledge Check**: Quick quizzes to reinforce learning and track progress.

### 🗺️ Nearby Banking & Assistance
* **ATM & Bank Locator**: Search and locate nearby ATMs, banks, CSCs (Common Service Centres), and Post Offices.
* **Interactive Maps**: Built using Leaflet with visual distance and direction guides.

### 💳 Simulation Environment
* **Balance Inquiry**: Check simulated savings account details and transaction history.
* **Guided Transfers**: A 4-step wizard that coaches the user on how to safely transfer funds.

---

## 🎨 Premium Accessibility & UX

Designed to prioritize user confidence and ease of use:
* **Dynamic Contrast Modes**: High contrast mode and font scaling (smaller/larger text sizes) for visually impaired users.
* **Sensory Feedback**: Clean sound cues, toast notifications, and screen-reader accessibility tags.
* **Beautiful Visuals**: Powered by React Three Fiber / Three.js and GSAP for interactive particle effects and smooth scroll reveal transitions.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React + Vite** | Build tool and UI library |
| **Tailwind CSS v4** | Modern styling and high-performance utility classes |
| **Framer Motion & GSAP** | Rich UI micro-interactions and transitions |
| **Three.js & React Three Fiber** | Immersive 3D background visual experiences |
| **Zustand** | Light, high-performance state management |
| **i18next** | Multilingual localization (EN, HI, PA, TA, BN, MR) |
| **Leaflet / React Leaflet** | Interactive map searching for nearby banks |
| **Web Speech API** | Voice recognition and speech synthesis |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iamrobingoyal/Saathi.-FrontendProject.git
   cd Saathi.-FrontendProject
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
├── assets/         # App icons and illustrations
├── components/     # Reusable UI widgets (Layout, Navbar, Footer, Particle effects)
├── data/           # Mock transaction and contact lists
├── hooks/          # Custom utility React hooks
├── i18n/           # Translation dictionary locales
├── pages/          # Individual screen containers (Dashboard, Transfer, Safety, Learn, Voice)
├── routes/         # Router logic and Protected Routes
├── services/       # Mock service APIs and helpers
├── store/          # Zustand global states (auth, settings)
└── utils/          # Helper modules
```
