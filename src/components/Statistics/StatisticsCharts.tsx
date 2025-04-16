
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorStats, WeatherStats } from '@/types/types';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, ResponsiveContainer, Legend, Tooltip 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBarIcon, TrendingUpIcon } from "lucide-react";

interface StatisticsChartsProps {
  sensorStats: SensorStats;
  weatherStats: WeatherStats;
}

const StatisticsCharts = ({ sensorStats, weatherStats }: StatisticsChartsProps) => {
  // Prepare data for the temperature comparison
  const tempData = [
    { name: 'Sensor Min', value: sensorStats.min_temp, category: 'Sensor' },
    { name: 'Sensor Avg', value: sensorStats.avg_temp, category: 'Sensor' },
    { name: 'Sensor Max', value: sensorStats.max_temp, category: 'Sensor' },
    { name: 'Weather Min', value: weatherStats.w_min_temp, category: 'Weather' },
    { name: 'Weather Avg', value: weatherStats.w_avg_temp, category: 'Weather' },
    { name: 'Weather Max', value: weatherStats.w_max_temp, category: 'Weather' },
  ];

  // Prepare data for the humidity comparison
  const humiData = [
    { name: 'Sensor Min', value: sensorStats.min_humi, category: 'Sensor' },
    { name: 'Sensor Avg', value: sensorStats.avg_humi, category: 'Sensor' },
    { name: 'Sensor Max', value: sensorStats.max_humi, category: 'Sensor' },
    { name: 'Weather Min', value: weatherStats.w_min_humi, category: 'Weather' },
    { name: 'Weather Avg', value: weatherStats.w_avg_humi, category: 'Weather' },
    { name: 'Weather Max', value: weatherStats.w_max_humi, category: 'Weather' },
  ];

  // Prepare data for the moisture histogram
  const moistData = [
    { name: 'Min', value: sensorStats.min_moist },
    { name: 'Avg', value: sensorStats.avg_moist },
    { name: 'Max', value: sensorStats.max_moist },
  ];

  // Chart configurations with improved colors
  const tempChartConfig: ChartConfig = {
    temperature: {
      label: "Temperature (°C)",
      color: "#F97316" // Bright orange for temperature
    }
  };

  const humiChartConfig: ChartConfig = {
    humidity: {
      label: "Humidity (%)",
      color: "#0EA5E9" // Ocean blue for humidity
    }
  };

  const moistChartConfig: ChartConfig = {
    moisture: {
      label: "Moisture (%)",
      color: "#8B5CF6" // Vivid purple for moisture
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Temperature Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <Tabs defaultValue="line">
            <TabsList className="mb-2">
              <TabsTrigger value="line" className="flex items-center gap-1">
                <TrendingUpIcon className="h-4 w-4" />
                <span>Line</span>
              </TabsTrigger>
              <TabsTrigger value="bar" className="flex items-center gap-1">
                <ChartBarIcon className="h-4 w-4" />
                <span>Bar</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="line">
              <ChartContainer config={tempChartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tempData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#F97316" 
                      name="Temperature (°C)"
                      dot={{ fill: '#F97316', r: 4 }}
                      activeDot={{ r: 6 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="bar">
              <ChartContainer config={tempChartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tempData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      fill="#F97316" 
                      name="Temperature (°C)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Humidity Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <Tabs defaultValue="line">
            <TabsList className="mb-2">
              <TabsTrigger value="line" className="flex items-center gap-1">
                <TrendingUpIcon className="h-4 w-4" />
                <span>Line</span>
              </TabsTrigger>
              <TabsTrigger value="bar" className="flex items-center gap-1">
                <ChartBarIcon className="h-4 w-4" />
                <span>Bar</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="line">
              <ChartContainer config={humiChartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={humiData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0EA5E9" 
                      name="Humidity (%)"
                      dot={{ fill: '#0EA5E9', r: 4 }}
                      activeDot={{ r: 6 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="bar">
              <ChartContainer config={humiChartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={humiData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      fill="#0EA5E9" 
                      name="Humidity (%)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Soil Moisture Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <Tabs defaultValue="line">
            <TabsList className="mb-2">
              <TabsTrigger value="line" className="flex items-center gap-1">
                <TrendingUpIcon className="h-4 w-4" />
                <span>Line</span>
              </TabsTrigger>
              <TabsTrigger value="bar" className="flex items-center gap-1">
                <ChartBarIcon className="h-4 w-4" />
                <span>Bar</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="line">
              <ChartContainer config={moistChartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moistData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8B5CF6" 
                      name="Moisture (%)"
                      dot={{ fill: '#8B5CF6', r: 4 }}
                      activeDot={{ r: 6 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="bar">
              <ChartContainer config={moistChartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moistData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      fill="#8B5CF6" 
                      name="Moisture (%)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCharts;
