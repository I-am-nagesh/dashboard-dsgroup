import React, { useState, useEffect } from "react";
import { connectToAwsIot, getAwsCredentials } from "../../../utils/awsMqtt";
import { useAuthStore } from "../../../store/authStore";
import DataCard from "../components/DataCard";
import SetLocationModal from "../components/SetLocationModal";
import SetAlertsModal from "../components/SetAlertsModal";

function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [devices, setDevices] = useState({});
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [deviceToLocate, setDeviceToLocate] = useState(null);
  const [deviceToAlert, setDeviceToAlert] = useState(null);

  useEffect(() => {
    let disconnect = () => {};

    const connect = async () => {
      if (!user?.idToken) return;

      try {
        const creds = await getAwsCredentials(user.idToken);
        disconnect = await connectToAwsIot(creds, ({ topic, message }) => {
          try {
            const parsed = JSON.parse(message);
            setDevices((prevDevices) => {
              const updated = { ...prevDevices };
              parsed.slaves.forEach((device) => {
                const existingDevice = prevDevices[device.slave_id] || {};
                updated[device.slave_id] = {
                  ...existingDevice,
                  ...device,
                  timestamp: parsed.timestamp,
                  topic,
                };
              });
              return updated;
            });
          } catch (err) {
            console.error("❌ Failed to parse message:", err, message);
            setError("Error processing incoming data.");
          }
        });
        setConnected(true);
      } catch (err) {
        console.error("❌ Failed to connect to AWS IoT:", err);
        setError("Failed to connect to the device server.");
      }
    };

    connect();

    return () => {
      if (typeof disconnect === "function") {
        disconnect();
      }
    };
  }, [user]);
  const handleOpenLocationModal = (device) => {
    setDeviceToLocate(device);
  };
  const handleSaveLocation = (deviceId, newLocation) => {
    setDevices((prevDevices) => ({
      ...prevDevices,
      [deviceId]: { ...prevDevices[deviceId], location: newLocation },
    }));
    setDeviceToLocate(null);
  };
  const handleOpenAlertsModal = (device) => {
    setDeviceToAlert(device);
  };
  const handleSaveAlerts = (deviceId, newAlerts) => {
    setDevices((prev) => ({
      ...prev,
      [deviceId]: { ...prev[deviceId], alerts: newAlerts },
    }));
    setDeviceToAlert(null);
  };

  const deviceList = Object.values(devices);

  const renderContent = () => {
    if (error) {
      return (
        <StatusDisplay icon="error" title="Connection Failed" message={error} />
      );
    }
    if (!user?.idToken) {
      return (
        <StatusDisplay
          icon="login"
          title="Please Login"
          message="You need to be logged in to view the dashboard."
        />
      );
    }
    if (!connected && deviceList.length === 0) {
      return (
        <StatusDisplay
          icon="loading"
          title="Connecting to Server..."
          message="Establishing a secure connection to your devices."
        />
      );
    }
    if (connected && deviceList.length === 0) {
      return (
        <StatusDisplay
          icon="no-data"
          title="Awaiting Data"
          message="Connected successfully. Waiting for signals from your devices."
        />
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {deviceList.map((device) => (
          <DataCard
            key={device.slave_id}
            device={device}
            onSetLocation={handleOpenLocationModal}
            onSetAlerts={handleOpenAlertsModal}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-sky-200 to-indigo-200 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[36rem] h-[36rem] bg-gradient-to-tr from-purple-200 via-pink-200 to-orange-200 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 opacity-60"></div>
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-700">
            Real-Time Device Status
          </h1>
          <p className="mt-2 text-gray-500">
            Live data from your installed IoT devices, updated automatically.
          </p>
        </div>
        {renderContent()}
      </main>
      {deviceToLocate && (
        <SetLocationModal
          device={deviceToLocate}
          onSave={handleSaveLocation}
          onCancel={() => setDeviceToLocate(null)}
        />
      )}
      {deviceToAlert && (
        <SetAlertsModal
          device={deviceToAlert}
          onSave={handleSaveAlerts}
          onCancel={() => setDeviceToAlert(null)}
        />
      )}
    </div>
  );
}
const StatusDisplay = ({ icon, title, message }) => {
  const icons = {
    loading: (
      <svg
        className="animate-spin h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    ),
    "no-data": (
      <svg
        className="h-10 w-10 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      </svg>
    ),
    error: (
      <svg
        className="h-10 w-10 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    login: (
      <svg
        className="h-10 w-10 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
    ),
  };

  return (
    <div className="text-center py-20 bg-white/60 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
      <div className="mx-auto mb-4 flex justify-center">{icons[icon]}</div>
      <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      <p className="text-gray-500 mt-1">{message}</p>
    </div>
  );
};

export default DashboardPage;
