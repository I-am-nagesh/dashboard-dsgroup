
const DeviceCard = ({ slave_id, temperature, timestamp, status }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-64 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700">
        Device: {slave_id}
      </h3>
      <p className="text-2xl font-bold text-blue-600 mt-2">
        {temperature !== null ? `${temperature} °C` : "No Data"}
      </p>
      <p className="text-sm text-gray-500 mt-1">
        {timestamp ? new Date(timestamp).toLocaleString() : "No Timestamp"}
      </p>
      <span
        className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
          status === "ok"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {status || "unknown"}
      </span>
    </div>
  );
};

export default DeviceCard;
