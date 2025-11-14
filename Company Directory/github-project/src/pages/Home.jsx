import React, { useState, useEffect, useRef } from 'react';
import CompanyCard from '../components/CompanyCard';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';
import companiesData from '../data/companies.json';

const Home = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  
  // Animation states
  const [isFiltering, setIsFiltering] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 6;
  
  // Refs
  const companyRefs = useRef({});
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Load companies data
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Use the imported data directly
        setCompanies(companiesData);
        setFilteredCompanies(companiesData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load companies data. Please try again.');
        setLoading(false);
      }
    };
    
    loadCompanies();
  }, []);
  
  // Extract unique industries and locations for filter dropdowns
  const industries = [...new Set(companies.map(company => company.industry))];
  const locations = [...new Set(companies.map(company => company.location))];
  
  // Calculate total employees
  const totalEmployees = companies.reduce((sum, company) => sum + company.employees, 0);
  
  // Format employee count with commas
  const formatEmployeeCount = (count) => {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Apply filters and sorting with animation
  useEffect(() => {
    // Only process if we have companies data
    if (companies.length === 0) return;
    
    // Show filtering animation
    setIsFiltering(true);
    
    // Use a timeout to simulate processing time and show animation
    const filterTimer = setTimeout(() => {
      let result = [...companies];
      
      // Apply search filter
      if (searchTerm) {
        result = result.filter(company => 
          company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply industry filter
      if (industryFilter) {
        result = result.filter(company => company.industry === industryFilter);
      }
      
      // Apply location filter
      if (locationFilter) {
        result = result.filter(company => company.location === locationFilter);
      }
      
      // Apply sorting
      if (sortOption === 'name-asc') {
        result.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOption === 'name-desc') {
        result.sort((a, b) => b.name.localeCompare(a.name));
      }
      
      setFilteredCompanies(result);
      // Only reset to first page when filters actually change, not on initial load
      if (searchTerm || industryFilter || locationFilter) {
        setCurrentPage(1);
      }
      
      // End filtering animation
      setIsFiltering(false);
    }, 300); // 300ms delay to show filtering animation
    
    return () => clearTimeout(filterTimer);
  }, [companies, searchTerm, industryFilter, locationFilter, sortOption]);
  
  // Auto-scroll to first matching company when search term changes
  useEffect(() => {
    if (searchTerm && filteredCompanies.length > 0) {
      // Find the first company that starts with the search term
      const firstMatch = filteredCompanies.find(company => 
        company.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      
      // If we have a match, scroll to it
      if (firstMatch) {
        // Find which page this company is on
        const indexOfTarget = filteredCompanies.indexOf(firstMatch);
        const targetPage = Math.floor(indexOfTarget / companiesPerPage) + 1;
        
        // Set the current page to the target page
        if (targetPage !== currentPage) {
          setIsPageChanging(true);
          setCurrentPage(targetPage);
          
          // After a short delay to allow rendering, scroll to the company
          setTimeout(() => {
            const companyElement = companyRefs.current[firstMatch.id];
            if (companyElement && containerRef.current) {
              companyElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center'
              });
              
              // Add a temporary highlight effect
              companyElement.classList.add('ring-4', 'ring-blue-400', 'rounded-2xl');
              setTimeout(() => {
                companyElement.classList.remove('ring-4', 'ring-blue-400', 'rounded-2xl');
              }, 2000);
            }
            setIsPageChanging(false);
          }, 300);
        } else {
          // If on the same page, scroll immediately after a short delay to ensure rendering
          setTimeout(() => {
            const companyElement = companyRefs.current[firstMatch.id];
            if (companyElement && containerRef.current) {
              companyElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center'
              });
              
              // Add a temporary highlight effect
              companyElement.classList.add('ring-4', 'ring-blue-400', 'rounded-2xl');
              setTimeout(() => {
                companyElement.classList.remove('ring-4', 'ring-blue-400', 'rounded-2xl');
              }, 2000);
            }
          }, 50);
        }
      }
    }
  }, [searchTerm, filteredCompanies, companiesPerPage, currentPage]);
  
  // Get current companies for pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
  
  // Handle pagination with animation
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      setIsPageChanging(true);
      setTimeout(() => {
        setCurrentPage(pageNumber);
        setIsPageChanging(false);
        
        // Scroll to top of company grid after page change
        setTimeout(() => {
          if (containerRef.current) {
            const gridElement = containerRef.current.querySelector('.grid');
            if (gridElement) {
              const gridTop = gridElement.getBoundingClientRect().top;
              const absoluteTop = gridTop + window.pageYOffset - 100;
              window.scrollTo({
                top: absoluteTop,
                behavior: 'smooth'
              });
            }
          }
        }, 100);
      }, 150);
    }
  };
  
  if (loading) return <Loader />;
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4">
        <div className="text-center py-8 bg-white rounded-xl shadow-lg">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary flex items-center justify-center mx-auto px-4 py-2 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry Loading
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4" ref={containerRef}>
      {/* Header with gradient text */}
      <div className="text-center mb-3 mt-1 sm:mb-4 sm:mt-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-1 sm:mb-2">
          <span className="text-gradient">Companies Directory</span>
        </h1>
        <p className="text-gray-600 max-w-md mx-auto text-xs sm:text-sm">
          Discover and explore companies by industry and location
        </p>
      </div>
      
      {/* Stats Bar with enhanced design */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 md:p-4 mb-3 sm:mb-4 transition-all duration-300 hover:shadow-lg border border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
          <div className="group">
            <div className="flex items-center space-x-1.5 sm:space-x-2 p-1.5 sm:p-2 md:p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md sm:rounded-lg transition-all duration-300 hover:from-blue-100 hover:to-blue-200 hover:scale-[1.01] cursor-pointer border border-blue-200">
              <div className="bg-blue-100 p-1 sm:p-1.5 rounded-md transition-all duration-300 group-hover:bg-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] sm:text-xs font-medium transition-colors duration-300 group-hover:text-blue-700">Total Companies</p>
                <p className="text-xs sm:text-sm md:text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-800">{companies.length}</p>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div className="flex items-center space-x-1.5 sm:space-x-2 p-1.5 sm:p-2 md:p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-md sm:rounded-lg transition-all duration-300 hover:from-green-100 hover:to-green-200 hover:scale-[1.01] cursor-pointer border border-green-200">
              <div className="bg-green-100 p-1 sm:p-1.5 rounded-md transition-all duration-300 group-hover:bg-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] sm:text-xs font-medium transition-colors duration-300 group-hover:text-green-700">Industries</p>
                <p className="text-xs sm:text-sm md:text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-800">{industries.length}</p>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div className="flex items-center space-x-1.5 sm:space-x-2 p-1.5 sm:p-2 md:p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-md sm:rounded-lg transition-all duration-300 hover:from-purple-100 hover:to-purple-200 hover:scale-[1.01] cursor-pointer border border-purple-200">
              <div className="bg-purple-100 p-1 sm:p-1.5 rounded-md transition-all duration-300 group-hover:bg-purple-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] sm:text-xs font-medium transition-colors duration-300 group-hover:text-purple-700">Locations</p>
                <p className="text-xs sm:text-sm md:text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-800">{locations.length}</p>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div className="flex items-center space-x-1.5 sm:space-x-2 p-1.5 sm:p-2 md:p-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-md sm:rounded-lg transition-all duration-300 hover:from-amber-100 hover:to-amber-200 hover:scale-[1.01] cursor-pointer border border-amber-200">
              <div className="bg-amber-100 p-1 sm:p-1.5 rounded-md transition-all duration-300 group-hover:bg-amber-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] sm:text-xs font-medium transition-colors duration-300 group-hover:text-amber-700">Total Employees</p>
                <p className="text-xs sm:text-sm md:text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-800">{formatEmployeeCount(totalEmployees)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Bar */}
      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        industryFilter={industryFilter}
        setIndustryFilter={setIndustryFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        industries={industries}
        locations={locations}
      />
      
      {/* Results Info */}
      <div className="mb-2 sm:mb-3 flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1 sm:gap-2">
        <p className="text-gray-700 text-[10px] sm:text-xs">
          Showing <span className="font-bold text-gray-900">{currentCompanies.length}</span> of{' '}
          <span className="font-bold text-gray-900">{filteredCompanies.length}</span> companies
        </p>
        {filteredCompanies.length > 0 && (
          <div className="flex items-center text-[10px] text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Real-time filtering
          </div>
        )}
      </div>
      
      {/* Companies Grid */}
      {(filteredCompanies.length === 0 && (searchTerm || industryFilter || locationFilter)) ? (
        <div className="text-center py-6 sm:py-8 bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">No Companies Found</h3>
          <p className="text-gray-600 mb-1 text-xs sm:text-sm max-w-md mx-auto">We couldn't find any companies matching your criteria</p>
          <p className="text-gray-500 max-w-md mx-auto mb-3 text-[10px] sm:text-xs">
            Try adjusting your search or filter parameters
          </p>
          <div className="flex flex-col xs:flex-row items-center justify-center gap-2">
            <button 
              onClick={() => {
                setSearchTerm('');
                setIndustryFilter('');
                setLocationFilter('');
              }}
              className="btn-primary px-3 py-1.5 text-xs"
            >
              Clear all filters
            </button>
            <button 
              onClick={() => searchInputRef.current?.focus()}
              className="btn-secondary px-3 py-1.5 text-xs"
            >
              Try a different search
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={`grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4 transition-opacity duration-300 ${isFiltering || isPageChanging ? 'opacity-50' : 'opacity-100'}`}>
            {currentCompanies.map((company, index) => (
              <div 
                key={company.id} 
                className={`fade-in scale-in ${isFiltering || isPageChanging ? 'animate-pulse' : ''}`} 
                style={{ animationDelay: `${index * 0.1}s` }}
                ref={el => companyRefs.current[company.id] = el}
              >
                <CompanyCard company={company} />
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`pagination-btn ${currentPage === 1 ? 'opacity-50' : ''} text-[10px] sm:text-xs`}
              >
                Previous
              </button>
              
              {[...Array(totalPages).keys()].map(number => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`pagination-btn ${currentPage === number + 1 ? 'active' : ''} text-[10px] sm:text-xs min-w-[1.25rem] sm:min-w-[1.5rem]`}
                >
                  {number + 1}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`pagination-btn ${currentPage === totalPages ? 'opacity-50' : ''} text-[10px] sm:text-xs`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;