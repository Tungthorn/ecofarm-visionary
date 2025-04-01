
import { useQuery } from "@tanstack/react-query";
import { 
  SensorDataResponse, 
  HistoricalDataResponse, 
  WeatherDataResponse,
  DateRange
} from "../types/types";

const API_BASE_URL = "http://127.0.0.1:8000";

// Function to fetch the latest sensor data
const fetchLatestSensorData = async (): Promise<SensorDataResponse> => {
  const response = await fetch(`${API_BASE_URL}/data/latest/sensor`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest sensor data");
  }
  return response.json();
};

// Function to fetch the latest weather data
const fetchLatestWeatherData = async (): Promise<WeatherDataResponse> => {
  const response = await fetch(`${API_BASE_URL}/data/latest/weather`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest weather data");
  }
  return response.json();
};

// Function to fetch historical data
const fetchHistoricalData = async (): Promise<HistoricalDataResponse> => {
  const response = await fetch(`${API_BASE_URL}/data`);
  if (!response.ok) {
    throw new Error("Failed to fetch historical data");
  }
  return response.json();
};

// Hook for fetching latest sensor data
export const useLatestSensorData = () => {
  return useQuery({
    queryKey: ["latestSensorData"],
    queryFn: fetchLatestSensorData,
    refetchInterval: 60000, // Refetch every minute
  });
};

// Hook for fetching latest weather data
export const useLatestWeatherData = () => {
  return useQuery({
    queryKey: ["latestWeatherData"],
    queryFn: fetchLatestWeatherData,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

// Hook for fetching historical data
export const useHistoricalData = () => {
  return useQuery({
    queryKey: ["historicalData"],
    queryFn: fetchHistoricalData,
    refetchInterval: 3600000, // Refetch every hour
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
