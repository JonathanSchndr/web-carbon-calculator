# Web Carbon Calculator

A modern, Nuxt 4-based application to calculate and visualize the carbon footprint of websites.

![Eco Grade A+](https://img.shields.io/badge/Eco_Grade-A%2B-emerald?style=flat-square)
![Nuxt 4](https://img.shields.io/badge/Nuxt-4-00DC82?style=flat-square&logo=nuxt.js)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

## Features

- **Carbon Analysis**: Calculates CO2 emissions per page view using the Sustainable Web Design (SWD) model.
- **Energy Estimation**: Estimates energy consumption in kWh.
- **Green Hosting Check**: Verifies if the site is hosted on green energy via The Green Web Foundation API.
- **Eco Grading**: Assigns a grade from A+ to F based on emissions.
- **Actionable Recommendations**: Provides tips to improve your site's eco-friendliness.
- **Deeplinking**: Share reports via URL (e.g., `/?url=example.com`).
- **Swiss Design**: Minimalist, clean interface built with Tailwind CSS.

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com) (Compatibility Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Icons**: [Lucide Vue](https://lucide.dev)
- **Carbon Calculation**: [`@tgwf/co2`](https://github.com/thegreenwebfoundation/co2.js)
- **Linting/Formatting**: Oxlint, Prettier

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/web-carbon-calculator.git
   cd web-carbon-calculator
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `pnpm run dev`: Start development server
- `pnpm run build`: Build for production
- `pnpm run start`: Start production server
- `pnpm run lint`: Lint code with Oxlint
- `pnpm run format`: Format code with Prettier

## Deployment

This project is configured for deployment on any Node.js-compatible hosting platform (Vercel, Netlify, Railway, etc.).

**Note on GitHub Pages**: The included GitHub Pages workflow (`deploy.yml`) will deploy the frontend, but the server-side API routes (`/api/analyze`) **will not work** on GitHub Pages as it only supports static hosting. For full functionality, please use a provider that supports server-side rendering or serverless functions.

## Methodology

We use the [Sustainable Web Design (SWD)](https://sustainablewebdesign.org/) model v4 for carbon calculations and [The Green Web Foundation](https://www.thegreenwebfoundation.org/) for hosting verification.

## License

MIT
