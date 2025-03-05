import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaTemperatureHigh,
  FaCloud,
  FaTint,
  FaWind,
} from "react-icons/fa";

// Components
import SearchBox from "./SearchBox";
import DarkModeToggle from "./DarkModeToggle";

const WeatherInfo = ({ weatherData, loading, location }) => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handlePlaceSelect = (place) => {
    if (place && place.geometry && place.geometry.location) {
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();

      //   Send Data to Parent component
      location({ latitude, longitude });
    } else {
      toast.error("Place details do not contain location data");
    }
  };

  return (
    <div>
      <div className="lg:tw-w-[500px] tw-w-full tw-divide-y tw-space-y-5 tw-p-5 tw-bg-white dark:tw-bg-gray-900 tw-rounded-lg tw-absolute lg:tw-right-0 lg:tw-top-0 tw-h-max tw-bottom-0 tw-z-[999] tw-mr-5 tw-mt-5 tw-text-gray-700 dark:tw-text-gray-200">
        <div className="tw-space-y-5">
          <DarkModeToggle />

          <SearchBox
            apiKey={GOOGLE_MAPS_API_KEY}
            onPlaceSelected={(place) => handlePlaceSelect(place)}
          />
        </div>

        <div className="tw-pt-5">
          <h2 className="tw-text-lg tw-font-semibold tw-mb-2">Weather Info</h2>
          {loading ? (
            <p>Loading...</p>
          ) : weatherData ? (
            <div className="tw-space-y-3">
              <div className="tw-flex tw-items-center tw-space-x-2">
                <FaMapMarkerAlt className="tw-text-red-500 dark:tw-text-red-400 tw-mr-2" />
                <span>
                  <strong>Location:</strong> {weatherData.name || "Unknown"},{" "}
                  {weatherData.sys.country}
                </span>
              </div>
              <div className="tw-flex tw-items-center tw-space-x-2">
                <FaTemperatureHigh className="tw-text-orange-500 dark:tw-text-orange-400 tw-mr-2" />
                <span>
                  <strong>Temperature:</strong> {weatherData.main.temp}°C
                </span>
              </div>
              <div className="tw-flex tw-items-center tw-space-x-2">
                <FaCloud className="tw-text-gray-500 dark:tw-text-gray-300 tw-mr-2" />
                <span>
                  <strong>Weather:</strong> {weatherData.weather[0].description}
                </span>
              </div>
              <div className="tw-flex tw-items-center tw-space-x-2">
                <FaTint className="tw-text-blue-400 dark:tw-text-blue-300 tw-mr-2" />
                <span>
                  <strong>Humidity:</strong> {weatherData.main.humidity}%
                </span>
              </div>
              <div className="tw-flex tw-items-center tw-space-x-2">
                <FaWind className="tw-text-green-500 dark:tw-text-green-300 tw-mr-2" />
                <span>
                  <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
                </span>
              </div>
            </div>
          ) : (
            <p>Click or Search on the map to get weather details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
