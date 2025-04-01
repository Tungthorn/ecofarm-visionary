
import { useEffect, useState } from "react";
import { useLatestSensorData } from "@/hooks/useEnvironmentalData";
import { getRecommendedCrops } from "@/utils/cropRecommendations";
import CropList from "@/components/CropRecommendation/CropList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorData, Crop } from "@/types/types";

const CropRecommendations = () => {
  const { data: latestSensorData, isLoading } = useLatestSensorData();
  const [recommendedCrops, setRecommendedCrops] = useState<Crop[]>([]);

  useEffect(() => {
    if (latestSensorData?.data) {
      const crops = getRecommendedCrops(latestSensorData.data, undefined, 10);
      setRecommendedCrops(crops);
    }
  }, [latestSensorData]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-16 sm:mb-0">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Crop Recommendations</h1>
          <p className="text-muted-foreground">
            Get personalized crop recommendations based on your current environmental conditions
          </p>
        </div>

        {/* Current Conditions Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Current Environmental Conditions</CardTitle>
            <CardDescription>
              Your recommendations are based on these values
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground text-sm">Temperature</p>
                <p className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="inline-block w-12 h-8 bg-gray-200 animate-pulse rounded" />
                  ) : (
                    `${latestSensorData?.data.temp || 0}°C`
                  )}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground text-sm">Humidity</p>
                <p className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="inline-block w-12 h-8 bg-gray-200 animate-pulse rounded" />
                  ) : (
                    `${latestSensorData?.data.humi || 0}%`
                  )}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground text-sm">Soil Moisture</p>
                <p className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="inline-block w-12 h-8 bg-gray-200 animate-pulse rounded" />
                  ) : (
                    `${latestSensorData?.data.moist || 0}%`
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendation Explanation */}
        <Card>
          <CardHeader>
            <CardTitle>How Recommendations Work</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our recommendations are based on comparing your current environmental conditions 
              to each crop's ideal growing parameters. Each crop receives a suitability score from 0-100%, 
              where a higher score indicates better alignment with current conditions. Crops are then ranked 
              by their suitability score to help you make informed planting decisions.
            </p>
          </CardContent>
        </Card>

        {/* Crop Recommendations */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Recommended Crops</h2>
          <p className="text-muted-foreground">
            Crops are sorted by their suitability to your current environmental conditions
          </p>
          <CropList 
            crops={recommendedCrops} 
            isLoading={isLoading} 
          />
        </section>
      </div>
    </div>
  );
};

export default CropRecommendations;
