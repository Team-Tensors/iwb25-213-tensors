# Personal Finance Management System

A full-stack personal finance management application built with React TypeScript frontend and backend services.

## 🏗️ Project Structure

```
├── frontend/          # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/    # UI components (charts, dashboards, lists)
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   └── services/      # API service layer
│   └── ...
└── services/          # Backend services
```

## 🚀 Getting Started

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Key Features

- 📊 Interactive expense and net worth charts
- 📋 Multiple list views for financial data
- 🤖 AI assistant panel for financial insights
- 📱 Responsive dashboard with financial statistics

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Custom UI components

**Styling:**
- Tailwind CSS with custom configuration
- CSS custom properties for theming
- Responsive design patterns

## 📝 Development

- Hot module replacement (HMR) enabled
- ESLint configuration for code quality
- TypeScript for type safety
- Path aliases configured (`@/` → `src/`)

## 🔧 Configuration

- **Vite Config:** [`frontend/vite.config.ts`](frontend/vite.config.ts)
- **Tailwind Config:** [`frontend/tailwind.config.ts`](frontend/tailwind.config.ts)
- **TypeScript Config:** [`frontend/tsconfig.json`](frontend/tsconfig.json)