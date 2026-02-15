import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Debounce Logic: Only search when typing stops for 500ms
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        performSearch();
      } else {
        setResults(null); // Clear results if query is too short
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`/api/admin/global-search?query=${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(data);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mb-6">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Search users, logs, or actions (Ctrl+K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        {loading && <span className="absolute right-3 top-2.5 text-xs text-gray-500">Searching...</span>}
      </div>

      {/* Dropdown Results */}
      {results && (results.users.length > 0 || results.logs.length > 0) && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-96 overflow-y-auto">
          
          {/* USERS SECTION */}
          {results.users.length > 0 && (
            <div className="p-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase px-2 mb-1">Users</h3>
              {results.users.map(user => (
                <div key={user._id} className="p-2 hover:bg-blue-50 cursor-pointer rounded flex justify-between">
                  <span className="text-sm font-medium text-gray-700">{user.email}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${user.isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {user.isBanned ? 'Banned' : 'Active'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* LOGS SECTION */}
          {results.logs.length > 0 && (
            <div className="p-2 border-t">
              <h3 className="text-xs font-bold text-gray-400 uppercase px-2 mb-1 mt-1">Audit Logs</h3>
              {results.logs.map(log => (
                <div key={log._id} className="p-2 hover:bg-yellow-50 cursor-pointer rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-gray-200 px-1 rounded">{log.action}</span>
                    <span className="text-xs text-gray-500 truncate">ID: {log.targetId}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>
      )}
      
      {/* No Results State */}
      {results && results.count === 0 && !loading && (
        <div className="absolute z-50 w-full mt-2 bg-white p-4 text-center text-gray-500 text-sm shadow-lg rounded-lg">
          No matches found for "{query}"
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;