import React from "react";
import { useAuthStore } from "../../../store/authStore";

import DeviceCard from "../components/DeviceCard";

const mockDevices = [
  {
    deviceId: "device_01",
    temperature: 32.5,
    timestamp: "2025-09-13T12:30:00Z",
    status: "ok",
  },
  {
    deviceId: "device_02",
    temperature: null,
    timestamp: "2025-09-13T12:30:00Z",
    status: "missing",
  },
  {
    deviceId: "device_03",
    temperature: 31.9,
    timestamp: "2025-09-13T12:30:00Z",
    status: "ok",
  },
];

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>
        Signed in as: <strong>{user?.email}</strong>
      </p>
      <p className="mt-4">This is a minimal dashboard page for testing.</p>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockDevices.map((device) => (
          <DeviceCard
            key={device.deviceId}
            deviceId={device.deviceId}
            temperature={device.temperature}
            timestamp={device.timestamp}
            status={device.status}
          />
        ))}
      </div>
    </div>
  );
}
