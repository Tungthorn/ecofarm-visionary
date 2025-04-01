
import { Crop } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf } from "lucide-react";

interface CropListProps {
  crops: Crop[];
  isLoading: boolean;
}

const CropList: React.FC<CropListProps> = ({ crops, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2 space-y-0">
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full mt-4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!crops.length) {
    return (
      <div className="text-center py-8">
        <Leaf className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No crop recommendations</h3>
        <p className="mt-1 text-sm text-gray-500">
          We couldn't generate recommendations based on the current environmental data.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {crops.map((crop) => (
        <Card key={crop.name} className="overflow-hidden">
          <div className="h-2 eco-gradient" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-ecofarm-green-dark" />
              {crop.name}
            </CardTitle>
            <CardDescription>
              {crop.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">
                    Suitability Score
                  </span>
                  <span className="text-sm font-medium">
                    {crop.suitabilityScore}%
                  </span>
                </div>
                <Progress 
                  value={crop.suitabilityScore || 0} 
                  className="h-2"
                />
              </div>
              
              <div className="text-sm grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">Temperature</p>
                  <p className="font-medium">{crop.idealTemperature[0]}-{crop.idealTemperature[1]}°C</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">Humidity</p>
                  <p className="font-medium">{crop.idealHumidity[0]}-{crop.idealHumidity[1]}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">Moisture</p>
                  <p className="font-medium">{crop.idealMoisture[0]}-{crop.idealMoisture[1]}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CropList;
