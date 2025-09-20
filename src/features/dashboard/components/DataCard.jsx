import React from 'react';

const DataCard = ({ device, onSetLocation , onSetAlerts}) => {
  const { slave_id, temperature, status, timestamp, location, alerts } = device;

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Device: {slave_id}</h2>
        <p className="text-xs text-gray-500 mt-1">Last Updated: {new Date(timestamp).toLocaleString('en-IN')}</p>
      </div>
      <div className="mt-4 space-y-3 pt-4 border-t border-gray-200/80 flex-grow">
        <p className="flex justify-between items-center text-gray-700">
          <span className="font-medium">Temperature:</span>
          <span className="font-bold text-lg text-gray-900">{temperature !== null ? `${temperature.toFixed(1)} °C` : "N/A"}</span>
        </p>
        <p className="flex justify-between items-center text-gray-700">
          <span className="font-medium">Status:</span>
          <span className={`px-2.5 py-0.5 rounded-full text-white text-xs font-semibold ${status === "ok" ? "bg-green-500" : "bg-red-500"}`}>{status}</span>
        </p>
        <div className="flex justify-between items-start text-gray-700">
          <span className="font-medium pt-1">Location:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900 text-right">{location || 'Not Set'}</span>
            <button
              onClick={() => onSetLocation(device)}
              className="p-1.5 text-gray-500 rounded-full hover:bg-gray-200/70 hover:text-blue-600 transition-colors"
              title="Set Location"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
            </button>
          </div>
        </div>
             <div className="flex justify-between items-start text-gray-700">
          <span className="font-medium pt-1">Alerts:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900 text-right">
              {alerts ? `${alerts.min ?? 'N/A'} / ${alerts.max ?? 'N/A'}` : 'Not Set'}
            </span>
            <button
              onClick={() => onSetAlerts(device)}
              className="p-1.5 text-gray-500 rounded-full hover:bg-gray-200/70 hover:text-orange-600 transition-colors"
              title="Set Alerts"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
