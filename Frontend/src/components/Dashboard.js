import React from 'react';
import { Link } from 'react-router-dom';

const tabs = [
  { name: "Competitions", path: "/competitions" },
  { name: "Teams", path: "/teams" },
  { name: "Schedules", path: "/schedules" },
  { name: "Standings", path: "/standings" }
];

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sports Competitions</h1>
        <div>
          <button
            className="bg-white text-blue-600 py-2 px-4 rounded"
            onClick={() => {
              localStorage.removeItem('isAuthenticated');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="bg-gray-100 w-64 p-4">
          <ul>
            {tabs.map((tab, index) => (
              <li key={index} className="mb-4">
                <Link to={tab.path} className="text-blue-600 font-bold">{tab.name}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-4">
          {/* Route components will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
