import { useState, useRef } from "react";
import Autocomplete from "react-google-autocomplete";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBox = ({ onPlaceSelected, apiKey }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // Handle place selection
  const handlePlaceSelect = (place) => {
    if (place && place.geometry) {
      setInputValue(place.formatted_address);
      onPlaceSelected(place);
    }
  };

  // Clear input field
  const handleClear = () => {
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="tw-relative tw-w-full tw-flex tw-items-center tw-border tw-rounded-lg tw-overflow-hidden tw-bg-white dark:tw-bg-gray-800">
      {/* Search Icon */}
      <span className="tw-absolute tw-left-3 tw-text-gray-500 dark:tw-text-gray-300">
        <FiSearch size={20} />
      </span>

      {/* Autocomplete Input */}
      <Autocomplete
        className="tw-w-full tw-pl-10 tw-pr-10 tw-p-3 tw-text-gray-700 dark:tw-text-gray-200 tw-bg-white dark:tw-bg-gray-800 tw-outline-none"
        placeholder="Search City/Place"
        apiKey={apiKey}
        onPlaceSelected={handlePlaceSelect}
        ref={inputRef}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* Clear (X) Icon */}
      {inputValue && (
        <button
          className="tw-absolute tw-right-3 tw-text-gray-500 dark:tw-text-gray-300 hover:tw-text-gray-700 dark:hover:tw-text-gray-400"
          onClick={handleClear}
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBox;
