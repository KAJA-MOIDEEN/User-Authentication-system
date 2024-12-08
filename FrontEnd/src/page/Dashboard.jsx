import React from 'react';
import Navbar from '../component/Navbar';

const Dashboard = () => {
  return (<>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="flex flex-col items-center justify-center h-full py-10 px-5">
        {/* Thank You message */}
        <h1 className="text-4xl font-semibold text-center mb-6">
          Thank You for Giving Me This Opportunity!
        </h1>
        <p className="text-lg text-center mb-10">I'm excited to contribute and grow with this amazing team.</p>

        {/* Links Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <div className="flex flex-col items-center gap-6">
            {/* Resume Link */}
            <a
              href="https://drive.google.com/file/d/1y9tSdLl7fgyRIOV71GDxl4Df8Ck0KuuK/view?usp=sharing" // Replace with your actual resume link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              View My Resume
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/kaja-moideen/" // Replace with your LinkedIn profile link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition duration-300 ease-in-out"
            >
              Visit My LinkedIn
            </a>

            {/* GitHub Link */}
            <a
              href="https://github.com/KAJA-MOIDEEN" // Replace with your GitHub profile link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition duration-300 ease-in-out"
            >
              Check My GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
  