import React, { useState, useEffect } from "react";
import { connectToAwsIot, getAwsCredentials } from "../../../utils/awsMqtt";
import { useAuthStore } from "../../../store/authStore";
import DataCard from "../components/DataCard";

function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [devices, setDevices] = useState({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connect = async () => {
      if (!user?.idToken || connected) return;

      try {
        const creds = await getAwsCredentials(user.idToken);
        await connectToAwsIot(creds, ({ topic, message }) => {
          try {
            const parsed = JSON.parse(message);

            setDevices((prevDevices) => {
              const updated = { ...prevDevices };
              parsed.slaves.forEach((device) => {
                updated[device.slave_id] = {
                  ...device,
                  timestamp: parsed.timestamp,
                  topic,
                };
              });
              return updated;
            });
          } catch (err) {
            console.error("❌ Failed to parse message:", err, message);
          }
        });

        setConnected(true);
      } catch (err) {
        console.error("❌ Failed to connect to AWS IoT:", err);
      }
    };

    connect();
  }, [user, connected]);

  const deviceList = Object.values(devices);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {!user?.idToken ? (
        <div>Please login to see your devices.</div>
      ) : !connected ? (
        <div>Connecting to Server</div>
      ) : deviceList.length === 0 ? (
        <div>No Data yet...</div>
      ) : (
        <div className="flex flex-wrap -m-4">
          {deviceList.map((device) => (
            <DataCard
              key={device.slave_id}
              slave_id={device.slave_id}
              temperature={device.temperature}
              status={device.status}
              timestamp={device.timestamp}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
