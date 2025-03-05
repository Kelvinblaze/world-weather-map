
# 🌍 Weather Map with Dark Mode

A React application that displays weather information for a selected location using **Leaflet** maps and the **OpenWeather API**. It supports **dark mode** and allows users to search for locations or click on the map to fetch weather details.

---

## 🚀 Setup & Running the Project Locally

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/kelvinblaze/weather-map.git
cd weather-map
```

### 2️⃣ **Install Dependencies**
```bash
npm install
# or
yarn install
```

### 3️⃣ **Set Up API Keys**
- Create a **`.env`** file in the root directory and add your **Google Maps API Key** and **OpenWeather API Key**:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_OPEN_WEATHER_API_KEY=your_openweather_api_key
```
- Replace `your_google_maps_api_key` and `your_openweather_api_key` with your actual API keys.

### 4️⃣ **Run the Application**
```bash
npm run dev
# or
yarn dev
```
- The project should now be running at `http://localhost:3000`.

---

## 📚 Libraries & Tools Used

| Library/Tool | Description |
|-------------|------------|
| **React** | Frontend framework used to build the UI |
| **Leaflet & React-Leaflet** | Interactive map integration |
| **OpenWeather API** | Fetches weather data based on selected coordinates |
| **React Google Autocomplete** | Allows users to search for locations |
| **Tailwind CSS** | Utility-based styling framework |
| **React Icons** | Provides icons for UI enhancements |
| **Toastify** | Displays notifications for errors and updates |

---

## 🎯 Features
✅ Click on the map to fetch weather data  
✅ Search for locations using Google Autocomplete  
✅ View **temperature, weather conditions, humidity, and wind speed**  
✅ **Dark Mode Support** that automatically changes map styles  
✅ Persists dark mode settings across sessions  

---

## 🔍 Assumptions Made During Development

1. The user has **valid API keys** for **Google Maps** and **OpenWeather API**.
2. **Leaflet map** should support **dark mode**, so we use **CartoDB Dark Matter** tiles for a better UI experience.
3. Clicking on the map **automatically fetches weather data** without requiring an additional button.
4. **Markers remain visible** when switching between light and dark modes.
5. The application defaults to **global coordinates** (`20, 0`) on the first load.

---

## 💡 Future Improvements
- Add **temperature unit toggle** (Celsius ↔ Fahrenheit).
- Improve **UI animations** for dark mode transitions.
- Allow users to **save favorite locations**.

---

## 📌 Author
**Kelvin Ossai**  
Frontend Developer | Vue.js | Nuxt.js | React.js  

---

## 📜 License
This project is open-source and available under the **MIT License**.
