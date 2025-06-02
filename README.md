# Color Typhoon Game

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Tests](https://img.shields.io/badge/tests-17%20passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-91.15%25-brightgreen)

An interactive educational card game built with modern JavaScript ES6 modules, featuring clean architecture, accessibility compliance, and production-ready code structure.

## ✨ Features

- **🎮 Interactive Gameplay**: Click cards to flip between colors and points
- **🎯 Smart Randomization**: Balanced point distribution following game rules
- **♿ Accessibility First**: WCAG 2.1 AA compliant with proper contrast and focus management
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🧪 Comprehensive Testing**: 91.15% test coverage with Jest
- **🏗️ Modern Architecture**: Clean ES6 modules with separation of concerns

## 🚀 Quick Start

### Development Mode

```bash
pnpm install
pnpm run dev
```

Open http://localhost:3000

### Production Build

```bash
pnpm run build
pnpm start
```

### Run Tests

```bash
pnpm test
pnpm run test:watch    # Watch mode
pnpm run test:coverage # Coverage report
```

### Code Quality

```bash
pnpm run lint         # Check code style
pnpm run lint:fix     # Fix code style issues
pnpm run validate     # Run linting + tests
```

## 🐳 Docker Deployment

### Prerequisites

- Docker installed on your machine
- Docker Compose (included with Docker Desktop)

### Running with Docker

1. Build and start the container:

   ```bash
   docker-compose up -d
   ```

2. Access the game:
   - Local: http://localhost:8080
   - Network: http://YOUR_COMPUTER_IP:8080

### Finding Your IP Address

On macOS:

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### Stop the Container

```bash
docker-compose down
```

## 📱 Playing on Mobile/Tablet

1. Connect your device to the same WiFi network
2. Open browser and navigate to: http://YOUR_COMPUTER_IP:3000 (dev) or :8080 (Docker)
3. For iPad: Add to Home Screen for full-screen experience

## 🎮 Game Rules

- Each card shows a color with its name
- Click cards to flip and reveal point values
- Only one card has 10 points
- Only one card has "No Points"
- Use "Randomize" to shuffle colors and points
- Use "Show Points" to reveal all values at once
- Toggle "Color Names" to hide/show color text for increased difficulty

## 🏗️ Project Structure

```
├── src/
│   ├── app.js              # Main application entry
│   ├── components/         # Reusable components
│   ├── modules/           # Core game logic
│   ├── utils/             # Helper functions
│   └── styles/            # Modular CSS
├── config/                # Game configuration
└── tests/                 # Jest test suite
```

## 🔧 Development

This project uses modern ES6 modules with a clean, modular architecture. Key development commands:

- `pnpm run dev` - Start development server with live reload
- `pnpm test` - Run comprehensive test suite (91.15% coverage)
- `pnpm run test:watch` - Run tests in watch mode
- `docker-compose up -d` - Run in production Docker container
