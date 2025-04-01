
import { Crop, SensorData, WeatherData } from "../types/types";

// Define crop database with ideal conditions
export const cropDatabase: Crop[] = [
  {
    name: "Rice",
    description: "Staple grain crop that thrives in wet, warm conditions.",
    idealTemperature: [20, 35],
    idealHumidity: [60, 90],
    idealMoisture: [70, 100],
  },
  {
    name: "Corn (Maize)",
    description: "Versatile grain crop that prefers moderate moisture and warm temperatures.",
    idealTemperature: [18, 32],
    idealHumidity: [50, 80],
    idealMoisture: [50, 75],
  },
  {
    name: "Wheat",
    description: "Cereal grain that grows well in cooler, drier conditions.",
    idealTemperature: [15, 24],
    idealHumidity: [40, 70],
    idealMoisture: [40, 65],
  },
  {
    name: "Soybeans",
    description: "Legume crop that fixes nitrogen and prefers moderate conditions.",
    idealTemperature: [20, 30],
    idealHumidity: [50, 80],
    idealMoisture: [50, 70],
  },
  {
    name: "Tomatoes",
    description: "Warm-season fruit vegetable that prefers consistent moisture.",
    idealTemperature: [20, 30],
    idealHumidity: [50, 70],
    idealMoisture: [50, 75],
  },
  {
    name: "Lettuce",
    description: "Leafy green that prefers cooler temperatures and consistent moisture.",
    idealTemperature: [10, 22],
    idealHumidity: [50, 70],
    idealMoisture: [60, 80],
  },
  {
    name: "Carrots",
    description: "Root vegetable that prefers cooler temperatures and well-drained soil.",
    idealTemperature: [15, 25],
    idealHumidity: [45, 65],
    idealMoisture: [50, 70],
  },
  {
    name: "Potatoes",
    description: "Tuber crop that grows best in cool to moderate temperatures.",
    idealTemperature: [15, 25],
    idealHumidity: [60, 80],
    idealMoisture: [60, 80],
  },
  {
    name: "Cotton",
    description: "Fiber crop that thrives in hot, relatively dry conditions.",
    idealTemperature: [25, 35],
    idealHumidity: [40, 60],
    idealMoisture: [40, 65],
  },
  {
    name: "Coffee",
    description: "Tropical perennial crop that prefers consistent temperature and humidity.",
    idealTemperature: [18, 26],
    idealHumidity: [60, 85],
    idealMoisture: [60, 80],
  },
];

// Calculate suitability score (0-100) for each crop based on current conditions
const calculateSuitabilityScore = (
  crop: Crop,
  temp: number,
  humi: number,
  moist: number
): number => {
  // For each parameter, calculate how close current conditions are to ideal range
  // 100 = perfect match, 0 = completely outside ideal range
  
  const tempScore = calculateParameterScore(temp, crop.idealTemperature[0], crop.idealTemperature[1]);
  const humiScore = calculateParameterScore(humi, crop.idealHumidity[0], crop.idealHumidity[1]);
  const moistScore = calculateParameterScore(moist, crop.idealMoisture[0], crop.idealMoisture[1]);
  
  // Calculate weighted average (can adjust weights based on importance)
  return Math.round((tempScore * 0.35 + humiScore * 0.35 + moistScore * 0.3));
};

// Helper function to calculate score for a single parameter
const calculateParameterScore = (
  currentValue: number,
  min: number,
  max: number
): number => {
  if (currentValue >= min && currentValue <= max) {
    // Within ideal range = 100%
    return 100;
  } else {
    // Outside range - calculate distance penalty
    const midpoint = (min + max) / 2;
    const rangeWidth = max - min;
    
    // Distance from ideal range as percentage of range width
    const distance = currentValue < min ? min - currentValue : currentValue - max;
    const penalty = (distance / (rangeWidth / 2)) * 100;
    
    // Limit penalty to max 100%
    return Math.max(0, 100 - Math.min(100, penalty));
  }
};

// Get recommended crops based on current environmental conditions
export const getRecommendedCrops = (
  sensorData?: SensorData,
  weatherData?: WeatherData,
  limit: number = 5
): Crop[] => {
  if (!sensorData) {
    return [];
  }
  
  // Default values if sensor data is missing
  const temperature = sensorData.temp;
  const humidity = sensorData.humi;
  const moisture = sensorData.moist || 0; // Default to 0 if undefined
  
  // Calculate suitability scores for all crops
  const scoredCrops = cropDatabase.map((crop) => {
    return {
      ...crop,
      suitabilityScore: calculateSuitabilityScore(crop, temperature, humidity, moisture),
    };
  });
  
  // Sort by suitability score (highest first) and take top 'limit' crops
  return scoredCrops
    .sort((a, b) => (b.suitabilityScore || 0) - (a.suitabilityScore || 0))
    .slice(0, limit);
};
