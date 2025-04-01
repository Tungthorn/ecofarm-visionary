
import { useLatestSensorData, useLatestWeatherData } from "@/hooks/useEnvironmentalData";
import EnvironmentalCard from "./EnvironmentalCard";
import { Thermometer, CloudRain, Leaf, Calendar } from "lucide-react";
import { format } from "date-fns";

const SensorDataDisplay = () => {
  const { 
    data: sensorData, 
    isLoading: isLoadingSensor,
    isError: isSensorError 
  } = useLatestSensorData();
  
  const { 
    data: weatherData, 
    isLoading: isLoadingWeather,
    isError: isWeatherError 
  } = useLatestWeatherData();

  // Format timestamp to be more readable
  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), "MMM d, yyyy • h:mm a");
    } catch (e) {
      console.error("Error formatting date:", e);
      return timestamp;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <EnvironmentalCard
        title="Temperature"
        value={isLoadingSensor ? "..." : sensorData?.data.temp || 0}
        unit="°C"
        icon={<Thermometer />}
        gradientClass="bg-gradient-to-r from-orange-400 to-red-500"
        isLoading={isLoadingSensor}
      />
      
      <EnvironmentalCard
        title="Humidity"
        value={isLoadingSensor ? "..." : sensorData?.data.humi || 0}
        unit="%"
        icon={<CloudRain />}
        gradientClass="water-gradient"
        isLoading={isLoadingSensor}
      />
      
      <EnvironmentalCard
        title="Soil Moisture"
        value={isLoadingSensor ? "..." : sensorData?.data.moist || 0}
        unit="%"
        icon={<Leaf />}
        gradientClass="soil-gradient"
        isLoading={isLoadingSensor}
      />
      
      <EnvironmentalCard
        title="Last Update"
        value={isLoadingSensor ? "..." : formatTimestamp(sensorData?.data.timestamp || "")}
        unit=""
        icon={<Calendar />}
        gradientClass="bg-gradient-to-r from-gray-400 to-gray-500"
        isLoading={isLoadingSensor}
      />
      
      {isSensorError && (
        <div className="col-span-full p-4 bg-red-100 text-red-800 rounded-md">
          Error loading sensor data. Please try again later.
        </div>
      )}
      
      {isWeatherError && (
        <div className="col-span-full p-4 bg-red-100 text-red-800 rounded-md">
          Error loading weather data. Please try again later.
        </div>
      )}
    </div>
  );
};

export default SensorDataDisplay;
