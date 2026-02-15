import React, { useEffect, useState } from 'react';
import adminService from '../../../services/adminService';
import { formatDistanceToNow } from 'date-fns'; // Recommended library for dates

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await adminService.getAuditLogs();
      setLogs(data); // Assuming backend returns an array
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to color-code actions
  const getActionBadge = (action) => {
    const styles = {
      USER_BAN: 'bg-red-100 text-red-800',
      DELETE_USER: 'bg-red-100 text-red-800',
      SETTINGS_UPDATE: 'bg-yellow-100 text-yellow-800',
      DEFAULT: 'bg-blue-100 text-blue-800'
    };
    return styles[action] || styles.DEFAULT;
  };

  if (loading) return <div>Loading Security Logs...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">🛡️ Security Audit Logs</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-600">Admin</th>
              <th className="px-4 py-3 font-semibold text-gray-600">Action</th>
              <th className="px-4 py-3 font-semibold text-gray-600">Target ID</th>
              <th className="px-4 py-3 font-semibold text-gray-600">Details</th>
              <th className="px-4 py-3 font-semibold text-gray-600">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log) => (
              <tr key={log._id} className="hover:bg-gray-50 transition">
                
                {/* 1. Who did it? */}
                <td className="px-4 py-3 text-gray-700 font-medium">
                  {log.adminId?.email || 'Unknown System'}
                </td>

                {/* 2. What did they do? */}
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getActionBadge(log.action)}`}>
                    {log.action}
                  </span>
                </td>

                {/* 3. Who was affected? */}
                <td className="px-4 py-3 font-mono text-xs text-gray-500">
                  {log.targetId || '-'}
                </td>

                {/* 4. Technical Details (truncated) */}
                <td className="px-4 py-3 text-gray-500 truncate max-w-xs">
                  {JSON.stringify(log.details)}
                </td>

                {/* 5. When? */}
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;