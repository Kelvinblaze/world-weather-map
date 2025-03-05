import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import WeatherInfo from "./WeatherInfo";

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const LIGHT_TILE = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const DARK_TILE =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

const WorldMap = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Reference to the Leaflet map instance
  const mapRef = useRef(null);

  // Detect dark mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains("tw-dark"));
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Function to fetch weather data
  const fetchWeatherData = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      toast.error(
        `Error fetching weather data: ${
          error.response?.data?.message || error.message
        }`
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Custom hook to handle map click events
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        let normalizedLng = lng < 0 ? lng + 360 : lng;
        setSelectedPosition([lat, normalizedLng]);
        fetchWeatherData(lat, normalizedLng); // Fetch weather on click
      },
    });
    return null;
  };

  // Function to center map and fetch weather from search results
  const handleLocationFromSearch = (location) => {
    const { latitude, longitude } = location;

    // Center the map to the searched location
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], 8); // Zoom level 8 for better visibility
    }

    // Set the new selected position and fetch weather data
    setSelectedPosition([latitude, longitude]);
    fetchWeatherData(latitude, longitude);
  };

  return (
    <div>
      {/* Map Section */}
      <div className="tw-w-full tw-h-screen">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          {/* Dynamic Tile Layer (Switches Based on Dark Mode) */}
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url={darkMode ? DARK_TILE : LIGHT_TILE}
          />

          <MapClickHandler />

          {selectedPosition && (
            <Marker position={selectedPosition}>
              <Popup>
                <b>Selected Location:</b> <br />
                Latitude: {selectedPosition[0]}, <br />
                Longitude: {selectedPosition[1]}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Weather Info Sidebar */}
      <WeatherInfo
        weatherData={weatherData}
        loading={loading}
        location={handleLocationFromSearch} // Pass function to child component
      />
    </div>
  );
};

export default WorldMap;
