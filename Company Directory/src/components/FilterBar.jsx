import React, { useState, useRef, useEffect } from 'react';

const SearchableDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  
  // Show all options when dropdown is open, otherwise filter based on search term
  const filteredOptions = isOpen 
    ? options 
    : options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
  const selectedOption = options.find(option => option.value === value) || { label: placeholder, value: '' };
  const displayText = selectedOption ? selectedOption.label : placeholder;
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);
  
  // Handle input focus and filtering
  const handleInputFocus = () => {
    setIsOpen(true);
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);
    
    // If there's exactly one match, select it automatically
    if (value && filteredOptions.length === 1) {
      // Don't auto-select, let user choose
    }
  };
  
  // Handle option selection
  const handleOptionSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm(optionValue ? options.find(opt => opt.value === optionValue)?.label || '' : '');
  };
  
  // Handle clear
  const handleClear = () => {
    onChange('');
    setSearchTerm('');
    setIsOpen(false);
  };
  
  // Handle key events for navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isOpen && filteredOptions.length > 0) {
      // If there's a search term and matching options, select the first one
      if (searchTerm && filteredOptions.length > 0) {
        handleOptionSelect(filteredOptions[0].value);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' && isOpen) {
      // TODO: Implement arrow key navigation
    } else if (e.key === 'ArrowUp' && isOpen) {
      // TODO: Implement arrow key navigation
    }
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-[10px] sm:text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <div 
        className="input-primary w-full flex items-center justify-between cursor-pointer text-xs sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-900 font-medium" : "text-gray-500"}>{displayText}</span>
        <svg 
          className={`h-3 w-3 sm:h-4 sm:w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md sm:rounded-lg py-1 border border-gray-200 max-h-32 sm:max-h-40 overflow-auto dropdown-fade">
          {filteredOptions.map((option) => (
            <div 
              key={option.value}
              className={`px-2 py-1.5 sm:px-3 sm:py-2 text-gray-900 hover:bg-primary-50 cursor-pointer transition-colors duration-150 rounded mx-1 font-medium text-xs sm:text-sm ${value === option.value ? 'bg-primary-100 border-l-2 border-primary-500' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SimpleDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-[10px] sm:text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <div 
        className="input-primary w-full flex items-center justify-between cursor-pointer text-xs sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-900 font-medium" : "text-gray-500"}>{displayText}</span>
        <svg 
          className={`h-3 w-3 sm:h-4 sm:w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md sm:rounded-lg py-1 border border-gray-200 max-h-32 sm:max-h-40 overflow-auto dropdown-fade">
          {options.map((option) => (
            <div 
              key={option.value}
              className={`px-2 py-1.5 sm:px-3 sm:py-2 text-gray-900 hover:bg-primary-50 cursor-pointer transition-colors duration-150 rounded mx-1 font-medium text-xs sm:text-sm ${value === option.value ? 'bg-primary-100 border-l-2 border-primary-500' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  industryFilter, 
  setIndustryFilter, 
  locationFilter, 
  setLocationFilter, 
  sortOption, 
  setSortOption, 
  industries, 
  locations
}) => {
  // Convert industries and locations to options format
  const industryOptions = industries.map(industry => ({ label: industry, value: industry }));
  const locationOptions = locations.map(location => ({ label: location, value: location }));
  const sortOptions = [
    { label: 'A - Z', value: 'name-asc' },
    { label: 'Z - A', value: 'name-desc' }
  ];
  
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 md:p-4 mb-3 sm:mb-4 transition-all duration-300 hover:shadow-lg border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1.5 sm:gap-2 md:gap-3">
        {/* Search Input with enhanced design */}
        <div className="sm:col-span-2">
          <label htmlFor="search" className="block text-[10px] sm:text-xs font-semibold text-gray-700 mb-1">Search Companies</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              placeholder="Search by company name..."
              className="input-primary w-full pl-7 text-xs sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Industry Filter with searchable dropdown */}
        <div>
          <SearchableDropdown
            label="Industry"
            options={industryOptions}
            value={industryFilter}
            onChange={setIndustryFilter}
            placeholder="All Industries"
          />
        </div>

        {/* Location Filter with searchable dropdown */}
        <div>
          <SearchableDropdown
            label="Location"
            options={locationOptions}
            value={locationFilter}
            onChange={setLocationFilter}
            placeholder="All Locations"
          />
        </div>

        {/* Sort Options with simple dropdown */}
        <div>
          <SimpleDropdown
            label="Sort By"
            options={sortOptions}
            value={sortOption}
            onChange={setSortOption}
            placeholder="A - Z"
          />
        </div>
      </div>
      
      {/* Clear Filters Button */}
      {(searchTerm || industryFilter || locationFilter) && (
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => {
              setSearchTerm('');
              setIndustryFilter('');
              setLocationFilter('');
            }}
            className="text-[10px] sm:text-xs text-gray-500 hover:text-gray-700 flex items-center transition-colors duration-200 hover:underline font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;