import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-xs sm:max-w-md w-full mx-2 sm:mx-4">
        <div className="relative mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full pulse-animation"></div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Loading Companies</h3>
          <p className="text-gray-600 font-medium text-sm sm:text-base">Please wait while we fetch the data</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">This usually takes just a moment</p>
        </div>
        <div className="mt-6 sm:mt-8 w-full max-w-[100px] sm:max-w-xs h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;