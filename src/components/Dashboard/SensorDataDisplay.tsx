
import { useLatestSensorData, useLatestWeatherData } from "@/hooks/useEnvironmentalData";
import EnvironmentalCard from "./EnvironmentalCard";
import { Thermometer, CloudRain, Leaf, Calendar, AlertTriangle } from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const SensorDataDisplay = () => {
  const { 
    data: sensorData, 
    isLoading: isLoadingSensor,
    isError: isSensorError,
    error: sensorError
  } = useLatestSensorData();
  
  const { 
    data: weatherData, 
    isLoading: isLoadingWeather,
    isError: isWeatherError,
    error: weatherError
  } = useLatestWeatherData();

  // Format timestamp to be more readable
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = parseISO(timestamp);
      if (!isValid(date)) {
        return "Invalid date";
      }
      return format(date, "MMM d, yyyy • h:mm a");
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Date unavailable";
    }
  };

  return (
    <div className="space-y-4">
      {/* Error alerts - displayed only when there are errors */}
      {isSensorError && (
        <Alert variant="destructive" className="animate-in fade-in-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error loading sensor data</AlertTitle>
          <AlertDescription>
            {sensorError instanceof Error 
              ? `${sensorError.message}` 
              : 'Please check your connection to the backend server or verify that the server is running at http://127.0.0.1:8000'}
          </AlertDescription>
        </Alert>
      )}
      
      {isWeatherError && !isSensorError && (
        <Alert variant="destructive" className="animate-in fade-in-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error loading weather data</AlertTitle>
          <AlertDescription>
            {weatherError instanceof Error 
              ? `${weatherError.message}` 
              : 'Please check your connection to the backend server or verify that the server is running at http://127.0.0.1:8000'}
          </AlertDescription>
        </Alert>
      )}

      {/* Sensor cards grid */}
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
      </div>
    </div>
  );
};

export default SensorDataDisplay;
