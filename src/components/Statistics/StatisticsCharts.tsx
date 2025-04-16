
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorStats, WeatherStats } from '@/types/types';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface StatisticsChartsProps {
  sensorStats: SensorStats;
  weatherStats: WeatherStats;
}

const StatisticsCharts = ({ sensorStats, weatherStats }: StatisticsChartsProps) => {
  // Prepare data for the temperature histogram
  const tempData = [
    { name: 'Sensor Min', value: sensorStats.min_temp },
    { name: 'Sensor Avg', value: sensorStats.avg_temp },
    { name: 'Sensor Max', value: sensorStats.max_temp },
    { name: 'Weather Min', value: weatherStats.w_min_temp },
    { name: 'Weather Avg', value: weatherStats.w_avg_temp },
    { name: 'Weather Max', value: weatherStats.w_max_temp },
  ];

  // Prepare data for the humidity histogram
  const humiData = [
    { name: 'Sensor Min', value: sensorStats.min_humi },
    { name: 'Sensor Avg', value: sensorStats.avg_humi },
    { name: 'Sensor Max', value: sensorStats.max_humi },
    { name: 'Weather Min', value: weatherStats.w_min_humi },
    { name: 'Weather Avg', value: weatherStats.w_avg_humi },
    { name: 'Weather Max', value: weatherStats.w_max_humi },
  ];

  // Prepare data for the moisture histogram
  const moistData = [
    { name: 'Min', value: sensorStats.min_moist },
    { name: 'Avg', value: sensorStats.avg_moist },
    { name: 'Max', value: sensorStats.max_moist },
  ];

  // Chart configurations
  const tempChartConfig: ChartConfig = {
    temperature: {
      label: "Temperature (°C)",
      color: "#22c55e"
    }
  };

  const humiChartConfig: ChartConfig = {
    humidity: {
      label: "Humidity (%)",
      color: "#3b82f6"
    }
  };

  const moistChartConfig: ChartConfig = {
    moisture: {
      label: "Moisture (%)",
      color: "#eab308"
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Temperature Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={tempChartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#22c55e" name="Temperature (°C)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Humidity Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={humiChartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={humiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#3b82f6" name="Humidity (%)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Soil Moisture Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={moistChartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moistData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#eab308" name="Moisture (%)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCharts;
