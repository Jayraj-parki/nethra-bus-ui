"use client";

import Select from "react-select";
import PropTypes from "prop-types";

const CustomSelect = ({ options, value, onChange, placeholder, isSearchable = false }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.75rem",
      borderColor: "#ececec",
      boxShadow: "none",
      fontSize: "1rem",
      background: "#f8f8fb",
      padding: "0.1rem 0.25rem",
      minHeight: "3.1rem",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "1rem",
      marginTop: "0.5rem",
      padding: "0.6rem 0",
      fontSize: "1rem",
      boxShadow: "0 2px 16px rgba(80, 80, 120, 0.12)",
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: "0.65rem",
      padding: "0.85rem 1.3rem",
      backgroundColor: state.isSelected
        ? "#e42d7b"
        : state.isFocused
        ? "rgba(228,45,123,0.1)"
        : "#fff",
      color: state.isSelected ? "#fff" : "#222",
      fontWeight: state.isSelected ? 600 : 500,
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#222",
      fontWeight: 500,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#888",
      padding: "0.3rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#b0b0b4",
      fontSize: "1.03rem",
    }),
  };

  return (
    <Select
      instanceId="departure-select"
      options={options}
      value={options.find((opt) => opt.value === value) || null}
      onChange={(option) => onChange(option ? option.value : "")}
      placeholder={placeholder}
      styles={customStyles}
      classNamePrefix="customSelect"
      isSearchable={isSearchable}
    />
  );
};

CustomSelect.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isSearchable: PropTypes.bool,
};

export default CustomSelect;
