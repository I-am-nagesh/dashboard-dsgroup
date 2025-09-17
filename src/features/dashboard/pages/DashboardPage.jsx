import React, { useState } from "react";
import { connectToAwsIot, getAwsCredentials } from "../../../utils/awsMqtt";
import { useAuthStore } from "../../../store/authStore";

function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    if (!user?.idToken) {
      console.warn("⚠️ No IdToken found");
      return;
    }

    try {
      // console.log("👤 Logged-in User:", user);
      const creds = await getAwsCredentials(user.idToken);
      await connectToAwsIot(creds, ({ topic, message }) => {
        setMessages((prev) => [...prev, { topic, message }]);
      });

      setConnected(true);
    } catch (err) {
      console.error("❌ Failed to connect to AWS IoT:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      {!connected ? (
        <button
          className="font-black border-amber-600 bg-amber-300 p-2"
          onClick={handleConnect}
        >
          Connect to AWS IoT
        </button>
      ) : (
        <div style={{ marginTop: 30 }}>
          <h2>Live Messages:</h2>
          <div
            style={{
              maxHeight: 400,
              overflowY: "auto",
              border: "1px solid #ccc",
              padding: 10,
            }}
          >
            {messages.map((m, idx) => (
              <div key={idx}>
                <strong>{m.topic}:</strong> {m.message}
              </div>
            ))}
            {messages.length === 0 && <div>No messages yet...</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
