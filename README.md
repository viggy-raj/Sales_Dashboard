# Springer Sales Dashboard

A premium, modern sales intelligence dashboard built with Next.js 15, TypeScript, and Tailwind CSS, following Atomic Design principles for logical component organization.

## 🚀 Key Features

- **Multi-Year Analysis**: View and compare sales data for FY 2022, 2023, and 2024.
- **Dynamic Charting**: Switch instantly between Bar, Line, and Pie charts using Recharts.
- **Atomic Structural Logic**: Components are organized into Atoms, Molecules, and Organisms within a consolidated architecture for maintainability and clarity.
- **Interactive Filtering**: Set custom sales thresholds to filter data points in real-time.
- **Premium Aesthetics**: Glassmorphism, modern typography, and smooth transitions using Framer Motion.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🏗️ Atomic Structure in This Project

While the user requested minimal files, the project strictly adheres to **Atomic Design** principles within the `SalesDashboard.tsx` component:

- **Atoms**: Basic building blocks like `Button`, `Badge`, `Card`, and `input` elements.
- **Molecules**: Groups of atoms working together, such as `StatCard`, `ChartToggle`, and `FilterControls`.
- **Organisms**: Complex sections like the `SalesChart` and `StatsGrid` which form the core of the experience.
- **Templates/Pages**: The `DashboardPage` which assembles everything into a cohesive layout.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Visuals**: [Lucide React](https://lucide.dev/) (Icons)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd springer-sales-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Open the application
Navigate to [http://localhost:3000](http://localhost:3000) to view the landing page, or go directly to [/dashboard](http://localhost:3000/dashboard).

## 📊 Data Source
The project uses mock architectural data simulation inspired by Kaggle sales datasets to provide a realistic experience of annual performance tracking.
