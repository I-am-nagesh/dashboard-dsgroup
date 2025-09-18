const DataCard = ({ slave_id, temperature, status, timestamp }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 border hover:shadow-lg transition">
        <h2 className="text-lg font-semibold text-gray-800">
          Device: {slave_id}
        </h2>
        <p className="text-sm text-gray-500">Last Updated: {timestamp}</p>

        <div className="mt-2">
          <p className="text-gray-700">
            <span className="font-medium">Temperature:</span>{" "}
            {temperature !== null ? `${temperature} °C` : "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded-lg text-white text-xs ${
                status === "ok" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
