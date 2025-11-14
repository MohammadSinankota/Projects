import React, { useState } from 'react';

const CompanyCard = ({ company }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  
  // Generate a random color for the company avatar
  const getColorForName = (name) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-red-100 text-red-800',
      'bg-teal-100 text-teal-800'
    ];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const badgeColor = getColorForName(company.name);
  const initials = company.name.split(' ').map(word => word[0]).join('').substring(0, 2);

  // Format employee count with commas
  const formatEmployeeCount = (count) => {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Close modal with animation
  const closeModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsModalClosing(false);
    }, 300); // Match the exit animation duration
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <div className="card-hover bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 border border-gray-100">
        <div className="p-3 sm:p-4 flex-grow">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${badgeColor} font-bold text-base sm:text-lg shadow`}>
              {initials}
            </div>
            <div className="badge-secondary flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {company.location}
            </div>
          </div>
          
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-primary-700 transition-colors duration-300">{company.name}</h3>
          
          <div className="mt-2 sm:mt-3">
            <span className={`badge-primary ${badgeColor} px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs sm:text-sm font-semibold`}>
              {company.industry}
            </span>
          </div>
        </div>
        
        <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="text-[10px] sm:text-xs text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {formatEmployeeCount(company.employees)} employees
            </div>
            <button 
              className="text-primary-600 hover:text-primary-800 text-[10px] sm:text-xs font-semibold flex items-center transition-colors duration-200 group"
              onClick={() => setIsModalOpen(true)}
            >
              View details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-0.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-1 sm:p-2 md:p-4 backdrop-blur-sm"
          onClick={handleOutsideClick}
        >
          <div className={`bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-[90vw] sm:max-w-xs md:max-w-md overflow-hidden ${isModalClosing ? 'modal-exit' : 'modal-enter'}`}>
            <div className="p-3 sm:p-4 md:p-5">
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${badgeColor} font-bold text-base sm:text-lg shadow`}>
                  {initials}
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">{company.name}</h2>
              
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <span className={`badge-primary ${badgeColor} px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs sm:text-sm font-semibold`}>
                  {company.industry}
                </span>
                <span className="badge-secondary flex items-center px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs sm:text-sm font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {company.location}
                </span>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center pb-1.5 sm:pb-2 border-b border-gray-100">
                  <span className="text-gray-600 text-[10px] sm:text-xs font-medium">Company ID</span>
                  <span className="font-semibold text-gray-900 text-[10px] sm:text-xs">#{company.id.toString().padStart(3, '0')}</span>
                </div>
                
                <div className="flex justify-between items-center pb-1.5 sm:pb-2 border-b border-gray-100">
                  <span className="text-gray-600 text-[10px] sm:text-xs font-medium">Employees</span>
                  <span className="font-semibold text-gray-900 text-[10px] sm:text-xs">{formatEmployeeCount(company.employees)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-1.5 sm:pb-2 border-b border-gray-100">
                  <span className="text-gray-600 text-[10px] sm:text-xs font-medium">Industry</span>
                  <span className="font-semibold text-gray-900 text-[10px] sm:text-xs">{company.industry}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-[10px] sm:text-xs font-medium">Location</span>
                  <span className="font-semibold text-gray-900 text-[10px] sm:text-xs">{company.location}</span>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="btn-primary px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyCard;