# 🎯 Snipe – Darts Score Tracker

A modern web-based darts score tracker designed to help players manage matches, track scores, and monitor game progress. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+  
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AroNicolas/snipe.git

# Navigate to the project folder
cd snipe

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Features

✅ **Score Tracking** – Keep track of player scores during matches  
✅ **Match Management** – Configure players and game settings  
✅ **Real-Time Updates** – Scores update instantly during play  
✅ **Game Progress** – Follow rounds, turns, and match status  
✅ **Responsive Interface** – Optimized for desktop and tablet use  
✅ **Smooth UI Experience** – Animations and transitions for a polished feel  

## 📝 Usage

1. **Create a Match** – Configure players and scoring settings  
2. **Track Scores** – Enter dart results after each turn  
3. **Monitor Progress** – Follow the current score and match status  
4. **Complete the Match** – View the final result when the game ends  

> Snipe is a score management tool. It does not simulate dart throws or provide a full virtual dartboard game.

## 📁 Project Structure

```text
src/
├── components/            # Reusable UI components
│   ├── scoreboard/        # Score tracking and display
│   ├── game/              # Match-related components
│   ├── modals/            # Setup and result dialogs
│   ├── home/              # Home page components
│   ├── howToPlay/         # Help/tutorial components
│   ├── Navbar.tsx         # Navigation bar
│   ├── Footer.tsx         # Footer
│   └── LoadingScreen.tsx  # Loading screen
│
├── pages/                 # Application pages
│   ├── Home.tsx           # Landing page
│   ├── HowToPlay.tsx      # Instructions page
│   └── Scoreboard.tsx     # Main scoring page
│
├── store/                 # Zustand state management
│   └── gameStore.ts       # Match and score state
│
├── types/                 # TypeScript definitions
├── utils/                 # Helper functions
└── App.tsx                # Root application component
```

## 🛠️ Tech Stack

- **React 19** – UI framework
- **TypeScript** – Type safety
- **React Router v7** – Navigation
- **Zustand** – State management
- **Tailwind CSS 4** – Styling
- **Vite** – Build tool
- **ESLint** – Code quality

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

## 🧪 Development

### Code Style

This project uses ESLint with TypeScript and React best practices.

Run linting before committing:

```bash
npm run lint
```

## 🤝 Support

Found a bug or have a suggestion?

Open an issue or start a discussion in the repository:

- Issues: https://github.com/AroNicolas/snipe/issues
- Discussions: https://github.com/AroNicolas/snipe/discussions

---

Built with ❤️ for darts players who want a simple and reliable way to track their scores. 🎯
