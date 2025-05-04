import React from 'react';

function Cantfind() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-red-500 mb-4">Oops! Page Not Found</h1>
        <p className="text-gray-700 text-lg">The path you entered is invalid. Please check the URL or return to the home page.</p>
        <div className="mt-6">
          <a 
            href="/home" 
            className="text-blue-500 hover:underline text-lg"
          >
            Go to Sign In Page
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cantfind;
