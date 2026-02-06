# Supercharger Network Explorer ⚡🚗

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Angular](https://img.shields.io/badge/Angular-16%2B-dd0031.svg)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)

**Supercharger Network Explorer** is an intelligent route planning web application designed for EV drivers. It allows users to explore Supercharger locations across the US, filter by amenities and power output, and plan trips with estimated charging stops.

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **Interactive Map**: Explore Superchargers on a responsive Leaflet map with OpenStreetMap tiles.
- **Real-Time Filtering**: Filter stations by:
    - **Power Output** (72kW, 150kW, 250kW)
    - **Amenities** (Wi-Fi, Coffee, Dining, Shopping, Restrooms)
    - **Availability** (Show only available stalls)
- **Trip Planner**: Calculate routes between cities with estimated charging stops (Mock implementation).
- **Rich Data**: View detailed station info including stall availability, busy hours, and onsite amenities.
- **Custom Visuals**: Custom location markers for easy identification.
- **PWA Ready**: Configured with Service Workers for offline capabilities.

---

## 🏗 Architecture & Tech Stack

The project follows a modular Angular architecture emphasizing scalability and clean code.

### Tech Stack
- **Frontend**: Angular v16+
- **State Management**: NgRx (Store, Effects)
- **Mapping**: Leaflet + OpenStreetMap
- **Reactive Programming**: RxJS
- **Styling**: SCSS (Vanilla CSS architecture)

### Directory Structure
```
src/
├── app/
│   ├── core/           # Singleton services, models, guards
│   ├── features/       # Lazy-loaded feature modules
│   │   ├── map/        # Map visualization and filtering
│   │   └── trip/       # Trip planning logic and forms
│   ├── shared/         # Reusable components (MapView, etc.)
│   └── state/          # Global NgRx state definition
├── assets/             # Images, icons, and static data
└── styles.scss         # Global styles and theme variables
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v14.20.x or higher
- **npm**: v6.x or higher
- **Angular CLI**: `npm install -g @angular/cli`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/supercharge.git
   cd supercharge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`.

### Quick Start
Once running, you will see the map of the United States.
- **Zoom/Pan**: Use mouse or touch to navigate.
- **Filter**: Open the side panel to toggle "Coffee" or "250kW" filters.
- **Trip**: Click "Trip Planner" in the header (if enabled) or navigate to `/trip` to plan a route.

---

## ⚙ Configuration

### Map Tiles
By default, the app uses **OpenStreetMap**. To use Mapbox or another provider, update `src/app/shared/components/map-view/map-view.component.ts`:

```typescript
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', { ... });
```

### Mock Data
The app currently generates mock data for demonstration. To connect to a real API, update `SuperchargerService` in `src/app/core/services/supercharger.service.ts` to fetch from your backend endpoint.

---

## 📦 Deployment

This project is configured for easy deployment on **Vercel**.

1. **Build the project**
   ```bash
   npm run build
   ```
   Output will be in `dist/supercharge`.

2. **Vercel Configuration**
   The repository includes a `vercel.json` to handle SPA routing:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

3. **Deploy**
   - Push to GitHub/GitLab.
   - Import project in Vercel.
   - Set **Output Directory** to `dist/supercharge`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ❓ FAQ or Troubleshooting

**Q: The map markers aren't showing up?**
A: Ensure `assets/icons/location-icon.png` exists. If using default Leaflet markers, check `angular.json` assets configuration.

**Q: "Property 'customIcon' does not exist"?**
A: Ensure you have pulled the latest changes where the `customIcon` property was added to `MapViewComponent`.

---

**Authors**: Built with ❤️ by [Your Name]
