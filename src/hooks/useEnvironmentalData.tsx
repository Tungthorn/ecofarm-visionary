
import { useQuery } from "@tanstack/react-query";
import { 
  SensorDataResponse, 
  HistoricalDataResponse, 
  WeatherDataResponse,
  DateRange
} from "../types/types";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "http://127.0.0.1:8000";

// Mock data for when API calls fail
const MOCK_SENSOR_DATA: SensorDataResponse = {
  data: {
    id: 1,
    humi: 65,
    temp: 25,
    moist: 45,
    timestamp: new Date().toISOString()
  }
};

const MOCK_WEATHER_DATA: WeatherDataResponse = {
  data: {
    id: 1,
    timestamp: new Date().toISOString(),
    temp: 24,
    humi: 60,
    temp_min: 22,
    temp_max: 26,
    wind_speed: 5,
    weather: "Clear",
    weather_description: "Clear sky",
    lat: 13.83,
    long: 100.57,
    place: "Demo Location"
  }
};

const MOCK_HISTORICAL_DATA: HistoricalDataResponse = {
  data: Array(12).fill(null).map((_, i) => ({
    id: i + 1,
    humi: 60 + Math.floor(Math.random() * 20),
    temp: 22 + Math.floor(Math.random() * 10),
    moist: 40 + Math.floor(Math.random() * 30),
    timestamp: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString()
  }))
};

// Function to fetch the latest sensor data
const fetchLatestSensorData = async (): Promise<SensorDataResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/data/latest/sensor`);
    if (!response.ok) {
      throw new Error("Failed to fetch latest sensor data");
    }
    return response.json();
  } catch (error) {
    console.error("Sensor data fetch failed:", error);
    // In a development environment, you might want to use mock data
    if (process.env.NODE_ENV === 'development') {
      console.log("Using mock sensor data");
      return MOCK_SENSOR_DATA;
    }
    throw error;
  }
};

// Function to fetch the latest weather data
const fetchLatestWeatherData = async (): Promise<WeatherDataResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/data/latest/weather`);
    if (!response.ok) {
      throw new Error("Failed to fetch latest weather data");
    }
    return response.json();
  } catch (error) {
    console.error("Weather data fetch failed:", error);
    // In a development environment, you might want to use mock data
    if (process.env.NODE_ENV === 'development') {
      console.log("Using mock weather data");
      return MOCK_WEATHER_DATA;
    }
    throw error;
  }
};

// Function to fetch historical data
const fetchHistoricalData = async (): Promise<HistoricalDataResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/data`);
    if (!response.ok) {
      throw new Error("Failed to fetch historical data");
    }
    return response.json();
  } catch (error) {
    console.error("Historical data fetch failed:", error);
    // In a development environment, you might want to use mock data
    if (process.env.NODE_ENV === 'development') {
      console.log("Using mock historical data");
      return MOCK_HISTORICAL_DATA;
    }
    throw error;
  }
};

// Hook for fetching latest sensor data
export const useLatestSensorData = () => {
  return useQuery({
    queryKey: ["latestSensorData"],
    queryFn: fetchLatestSensorData,
    refetchInterval: 60000, // Refetch every minute
    retry: 2,
    meta: {
      onError: (error: Error) => {
        console.error("Failed to fetch sensor data:", error);
      }
    }
  });
};

// Hook for fetching latest weather data
export const useLatestWeatherData = () => {
  return useQuery({
    queryKey: ["latestWeatherData"],
    queryFn: fetchLatestWeatherData,
    refetchInterval: 300000, // Refetch every 5 minutes
    retry: 2,
    meta: {
      onError: (error: Error) => {
        console.error("Failed to fetch weather data:", error);
      }
    }
  });
};

// Hook for fetching historical data
export const useHistoricalData = () => {
  return useQuery({
    queryKey: ["historicalData"],
    queryFn: fetchHistoricalData,
    refetchInterval: 3600000, // Refetch every hour
    retry: 2,
    meta: {
      onError: (error: Error) => {
        console.error("Failed to fetch historical data:", error);
      }
    }
  });
};

// Filter historical data by date range
export const filterDataByDateRange = (
  data: HistoricalDataResponse | undefined,
  dateRange: DateRange
) => {
  if (!data || !data.data) {
    return [];
  }

  const { startDate, endDate } = dateRange;
  
  return data.data.filter((item) => {
    const itemDate = new Date(item.timestamp);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

// Calculate average values from historical data
export const calculateAverages = (
  data: HistoricalDataResponse | undefined
) => {
  if (!data || !data.data || data.data.length === 0) {
    return {
      avgTemperature: 0,
      avgHumidity: 0,
      avgMoisture: 0,
    };
  }

  const sum = data.data.reduce(
    (acc, item) => {
      return {
        temp: acc.temp + item.temp,
        humi: acc.humi + item.humi,
        moist: acc.moist + (item.moist || 0), // Handle potential undefined values
      };
    },
    { temp: 0, humi: 0, moist: 0 }
  );

  const count = data.data.length;

  return {
    avgTemperature: +(sum.temp / count).toFixed(1),
    avgHumidity: +(sum.humi / count).toFixed(1),
    avgMoisture: +(sum.moist / count).toFixed(1),
  };
};
